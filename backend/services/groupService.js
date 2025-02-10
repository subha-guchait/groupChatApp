const GroupMember = require("../models/groupMember");
const Group = require("../models/group");
const { Op } = require("sequelize");
const User = require("../models/user");

const removeUserFromGroup = async (userId, groupId) => {
  try {
    const removedUser = await GroupMember.destroy({
      where: {
        userId: userId,
        groupId: groupId,
      },
    });

    return removedUser;
  } catch (err) {
    throw new Error("Error removing User:", err);
  }
};

const existingMember = async (userId, groupId) => {
  try {
    if (!userId || !groupId) {
      throw new Error("userID and groupId required");
    }

    const userExists = await GroupMember.findOne({
      where: { userId: userId, groupId: groupId },
    });

    if (!userExists) {
      return false;
    }

    return true;
  } catch (err) {
    throw new Error("err: ", err);
  }
};

const checkAdmin = async (userId, groupId) => {
  try {
    if (!userId || !groupId) {
      throw new Error("userId and groupId required");
    }

    const isAdmin = await GroupMember.findOne({
      where: { userId: userId, groupId: groupId, isAdmin: true },
    });

    return isAdmin;
  } catch (err) {
    throw new Error("Error has been occured: ", err);
  }
};

const findGroup = async (groupId) => {
  try {
    if (!groupId) {
      throw new Error("groupId required");
    }

    const group = Group.findByPk(groupId);
    return group;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteGroup = async (groupId) => {
  try {
    if (!groupId) {
      throw new Error("groupId required");
    }
    const deletedGroup = Group.destroy({ where: { id: groupId } });
    return deletedGroup;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  removeUserFromGroup,
  existingMember,
  checkAdmin,
  findGroup,
  deleteGroup,
};
