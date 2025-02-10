import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { getGroups } from "../../api/userService";

const Conversations = ({ activeGroup, groups, setActiveGroup }) => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {groups.length > 0 ? (
        groups.map((group) => (
          <Conversation
            key={group.id}
            groupName={group.name}
            isActive={group.id === activeGroup?.id}
            onClick={() => {
              setActiveGroup(group);
            }}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No groups found</p>
      )}
    </div>
  );
};

export default Conversations;
