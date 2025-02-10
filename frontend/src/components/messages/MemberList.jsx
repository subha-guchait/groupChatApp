// src/components/MemberList.jsx
import React from "react";

const MemberList = ({ members, removeMember }) => {
  return (
    <ul>
      {members.length === 0 ? (
        <li className="text-sm text-gray-500">No members in the group.</li>
      ) : (
        members.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between my-2 p-2 bg-base-100 rounded shadow"
          >
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt={member.name}
                  />
                </div>
              </div>
              <span>{member.name}</span>
            </div>
            <button
              onClick={() => removeMember(member.id)}
              className="btn btn-error btn-xs"
            >
              Remove
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

export default MemberList;
