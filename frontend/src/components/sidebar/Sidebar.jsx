import React, { useState, useEffect } from "react";

import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import CreateGroup from "./CreateGroup";
import { getGroups } from "../../api/userService";

const Sidebar = ({ setActiveGroup }) => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchGroups = async () => {
    const groupsList = await getGroups();
    setGroups(groupsList);
  };

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
        setActiveGroup={setActiveGroup}
      />

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
