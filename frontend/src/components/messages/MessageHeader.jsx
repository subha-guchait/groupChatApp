// src/components/MessageHeader.jsx
import React, { useState } from "react";
import MemberModal from "./MemberModal";
import useGroupMembers from "../../hooks/useGroupMembers";

const MessageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    groupMembers,
    addMember,
    removeMember,
    searchQuery,
    setSearchQuery,
    filteredUsers,
  } = useGroupMembers();

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col bg-slate-300 px-4 py-2 mb-2">
        <span className="label-text font-bold">Funny group</span>
        <button onClick={handleToggleModal} className="btn btn-primary mt-2">
          Members
        </button>
      </div>

      {/* Member Modal */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={handleToggleModal}
        groupMembers={groupMembers}
        addMember={addMember}
        removeMember={removeMember}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredUsers={filteredUsers}
      />
    </div>
  );
};

export default MessageHeader;
