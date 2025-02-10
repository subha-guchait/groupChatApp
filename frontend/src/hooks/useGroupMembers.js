import { useState, useEffect } from "react";
import {
  getGroupMembers,
  getQueryUser,
  addUser,
  removeUser,
} from "../api/groupService";

export default function useGroupMembers(groupId) {
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUser, setFilterdUser] = useState(null);

  useEffect(() => {
    if (!groupId) return;

    const fetchMembers = async () => {
      try {
        const members = await getGroupMembers(groupId);
        setGroupMembers(members);
      } catch (error) {
        console.error("Error fetching group members:", error);
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
      const res = await addUser(groupId, user.id);
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
      const res = removeUser(groupId, userId);
      if (!res || res.error) {
        throw new Error("failed to remove user");
      }
      setGroupMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== userId)
      );
    } catch (err) {
      console.log(err);
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
