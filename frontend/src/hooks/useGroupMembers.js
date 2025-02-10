// src/hooks/useGroupMembers.js
import { useState } from "react";

// Dummy available users data with phone numbers.
const dummyAvailableUsers = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://img.daisyui.com/avatars/1.jpg",
    phone: "1234567890",
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://img.daisyui.com/avatars/2.jpg",
    phone: "2345678901",
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "https://img.daisyui.com/avatars/3.jpg",
    phone: "3456789012",
  },
  {
    id: 4,
    name: "David",
    avatar: "https://img.daisyui.com/avatars/4.jpg",
    phone: "4567890123",
  },
];

export default function useGroupMembers() {
  const [groupMembers, setGroupMembers] = useState([
    dummyAvailableUsers[0],
    dummyAvailableUsers[1],
  ]); // initially empty
  const [searchQuery, setSearchQuery] = useState("");

  const addMember = (user) => {
    // Add only if not already a member.
    if (!groupMembers.find((member) => member.id === user.id)) {
      setGroupMembers([...groupMembers, user]);
      console.log(`Added ${user.name} to the group.`);
    }
  };

  const removeMember = (userId) => {
    setGroupMembers(groupMembers.filter((member) => member.id !== userId));
    console.log(`Removed member with id ${userId}`);
  };

  // Filter available users based on searchQuery matching their phone number.
  const filteredUsers = dummyAvailableUsers.filter((user) =>
    user.phone.includes(searchQuery)
  );

  return {
    groupMembers,
    addMember,
    removeMember,
    searchQuery,
    setSearchQuery,
    filteredUsers,
  };
}
