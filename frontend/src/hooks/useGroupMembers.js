import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getGroupMembers,
  getQueryUser,
  addUser,
  removeUser,
} from "../api/groupService";
import { useSocket } from "../context/SocketContext";

export default function useGroupMembers(groupId, groupName, setIsMember) {
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUser, setFilterdUser] = useState(null);

  const { socket } = useSocket();

  useEffect(() => {
    if (!groupId) return;

    const fetchMembers = async () => {
      try {
        const members = await getGroupMembers(groupId);
        setGroupMembers(members);
        setIsMember(true);
      } catch (err) {
        console.error("Error fetching group members:", err);
        if (err.message == "user is not a group member") {
          setIsMember(false);
        }
      }
    };

    fetchMembers();
  }, [groupId]); // Only runs when `groupId` changes

  useEffect(() => {
    const fetchUser = async () => {
      if (
        !searchQuery ||
        (!isValidPhoneNumber(searchQuery) && !isValidEmail(searchQuery))
      ) {
        setFilterdUser(null);
        return;
      }
      try {
        if (isValidPhoneNumber(searchQuery) || isValidEmail(searchQuery)) {
          const user = await getQueryUser(groupId, searchQuery);
          setFilterdUser(user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [searchQuery]);

  const addMember = async (user) => {
    try {
      const addedUserId = user.id;
      const res = await addUser(groupId, addedUserId);
      socket.emit("add-user", { groupId, groupName, addedUserId });
      setSearchQuery("");
      if (!res || res.error) {
        if (!res || res.error) {
          throw new Error(res?.error || "Failed to add user to the group.");
        }
      }
      if (!groupMembers.find((member) => member.id === user.id)) {
        setGroupMembers((prevMembers) => [...prevMembers, user]);
      }
      setFilterdUser(null);
    } catch (err) {
      toast.error("falied to add user");
      console.log(err);
    }
  };

  const removeMember = async (userId) => {
    try {
      console.log(userId);
      const res = await removeUser(groupId, userId);

      socket.emit("remove-user", { groupId, removedUserId: userId });
      console.log(socket.id);

      setGroupMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== userId)
      );
    } catch (err) {
      toast.error(err.message || "Failed to remove user from the group");
    }
  };

  const isValidPhoneNumber = (query) => /^\d{10}$/.test(query);
  const isValidEmail = (query) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(query);

  return {
    groupMembers,
    addMember,
    removeMember,
    searchQuery,
    setSearchQuery,
    filteredUser,
  };
}
