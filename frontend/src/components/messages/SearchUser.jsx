// src/components/SearchUser.jsx
import React from "react";

const SearchUser = ({
  searchQuery,
  setSearchQuery,
  filteredUser,
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
        {!filteredUser ? (
          <li className="text-sm text-gray-500">No user found.</li>
        ) : (
          <li
            key={filteredUser.id}
            className="flex items-center justify-between my-2 p-2 bg-base-100 rounded shadow"
          >
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt={filteredUser.name}
                  />
                </div>
              </div>
              <span>
                {filteredUser.name} <small>({filteredUser.phone})</small>
              </span>
            </div>
            {!filteredUser.isMember ? (
              <button
                onClick={() => addMember(filteredUser)}
                className="btn btn-primary btn-xs"
              >
                Add
              </button>
            ) : (
              <span className="text-base-300 text-xs font-semibold">
                Already added
              </span>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default SearchUser;
