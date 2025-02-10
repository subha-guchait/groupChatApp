import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";

const Conversation = ({ groupName, isActive, onClick }) => {
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-base-300 rounded p-2 py-1 cursor-pointer ${
          isActive ? "bg-base-content text-white" : ""
        }`}
        onClick={onClick}
      >
        <HiOutlineUserGroup className="w-8 h-8 rounded-full bg-base-300 p-1" />
        <div className="flex-1">
          <p className="font-bold">{groupName}</p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
