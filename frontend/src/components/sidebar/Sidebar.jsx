import React, { useState, useEffect } from "react";

import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import CreateGroup from "./CreateGroup";
import { getGroups } from "../../api/userService";
import { useSocket } from "../../context/SocketContext";

const Sidebar = ({ activeGroup, setActiveGroup }) => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { socket } = useSocket();

  const fetchGroups = async () => {
    const groupsList = await getGroups();
    setGroups(groupsList);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("added-group", ({ groupId, groupName }) => {
      setGroups((prev) => {
        //checking if the group exists
        if (prev.some((group) => group.id === groupId)) {
          return prev;
        }
        return [{ id: groupId, name: groupName }, ...prev];
      });
    });

    return () => socket.off("added-group");
  }, [socket]);

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="border-r  p-4 flex flex-col ">
      <CreateGroup setGroups={setGroups} />
      <SearchInput
        groups={groups}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilteredGroups={setFilteredGroups}
      />
      <div className="divider px-3"></div>

      <Conversations
        groups={searchTerm ? filteredGroups : groups}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
      />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
