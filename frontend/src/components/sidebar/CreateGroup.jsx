import React, { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { createGroup } from "../../api/groupService";

const CreateGroup = ({ setGroups }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle group creation logic here
    const newGroup = await createGroup(groupName);

    if (newGroup) {
      setGroups((prevGroups) => [...prevGroups, newGroup]);
      setIsModalOpen(false);
      setGroupName("");
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary mb-4 "
      >
        <AiOutlineUsergroupAdd className="h-8 w-8" />
        Create Group
      </button>

      {/* DaisyUI Modal */}
      <dialog id="create_group_modal" className="modal" open={isModalOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Group</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Group Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter group name"
                className="input input-bordered w-full"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create Group
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreateGroup;
