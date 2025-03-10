import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "react-use";
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
  const [filteredUser, setFilteredUser] = useState(null);

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
        if (err.message === "user is not a group member") {
          setIsMember(false);
        }
      }
    };

    fetchMembers();
  }, [groupId]);

  // debounce function
  useDebounce(
    () => {
      if (
        !searchQuery ||
        (!isValidPhoneNumber(searchQuery) && !isValidEmail(searchQuery))
      ) {
        setFilteredUser(null);
        return;
      }

      const fetchUser = async () => {
        try {
          const user = await getQueryUser(groupId, searchQuery);
          setFilteredUser(user);
        } catch (err) {
          console.error("Error fetching user:", err);
          setFilteredUser(null);
        }
      };

      fetchUser();
    },
    500,
    [searchQuery] // Runs only when `searchQuery` changes
  );

  const addMember = async (user) => {
    try {
      const addedUserId = user.id;
      const res = await addUser(groupId, addedUserId);
      socket.emit("add-user", { groupId, groupName, addedUserId });
      setSearchQuery(""); // Clear search query on success

      if (!res || res.error) {
        throw new Error(res?.error || "Failed to add user to the group.");
      }

      if (!groupMembers.find((member) => member.id === user.id)) {
        setGroupMembers((prevMembers) => [...prevMembers, user]);
      }

      setFilteredUser(null);
    } catch (err) {
      toast.error("Failed to add user");
      console.error(err);
    }
  };

  const removeMember = async (userId) => {
    try {
      const res = await removeUser(groupId, userId);
      socket.emit("remove-user", { groupId, removedUserId: userId });

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
