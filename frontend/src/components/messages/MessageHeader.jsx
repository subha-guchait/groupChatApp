// src/components/MessageHeader.jsx
import React, { useState } from "react";
import MemberModal from "./MemberModal";
import useGroupMembers from "../../hooks/useGroupMembers";

const MessageHeader = ({ activeGroup, setIsMember }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    groupMembers,
    addMember,
    removeMember,
    searchQuery,
    setSearchQuery,
    filteredUser,
  } = useGroupMembers(activeGroup?.id, activeGroup?.name, setIsMember);

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col bg-slate-300 px-4 py-2 mb-2">
        <span className="label-text font-bold">{activeGroup.name}</span>
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
        filteredUser={filteredUser}
      />
    </div>
  );
};

export default MessageHeader;
