// src/components/SearchUser.jsx
import React from "react";

const SearchUser = ({
  searchQuery,
  setSearchQuery,
  filteredUsers,
  addMember,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search by phone number"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered w-full"
      />
      <ul>
        {filteredUsers.length === 0 ? (
          <li className="text-sm text-gray-500">No user found.</li>
        ) : (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between my-2 p-2 bg-base-100 rounded shadow"
            >
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt={user.name}
                    />
                  </div>
                </div>
                <span>
                  {user.name} <small>({user.phone})</small>
                </span>
              </div>
              <button
                onClick={() => addMember(user)}
                className="btn btn-primary btn-xs"
              >
                Add
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchUser;
