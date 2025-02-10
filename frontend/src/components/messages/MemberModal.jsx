// src/components/MemberModal.jsx
import React, { useState } from "react";
import MemberList from "./MemberList";
import SearchUser from "./SearchUser";

const MemberModal = ({
  isOpen,
  onClose,
  groupMembers,
  addMember,
  removeMember,
  searchQuery,
  setSearchQuery,
  filteredUser,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">Group Members</h3>

        {/* Add User Section on Top */}
        <div className="mb-4">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="btn btn-secondary mb-2 w-full"
          >
            {showSearch ? "Close Search" : "Add User"}
          </button>
          {showSearch && (
            <SearchUser
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredUser={filteredUser}
              addMember={addMember}
            />
          )}
        </div>

        {/* Divider and Member List */}
        <div className="divider">Current Members</div>
        <MemberList members={groupMembers} removeMember={removeMember} />
      </div>
    </div>
  );
};

export default MemberModal;
