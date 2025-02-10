const { where, Transaction } = require("sequelize");
const Group = require("../models/group");
const User = require("../models/user");
const GroupMember = require("../models/groupMember");
const sequelize = require("../config/database");
const {
  removeUserFromGroup,
  existingMember,
  checkAdmin,
  findGroup,
  deleteGroup,
} = require("../services/groupService");
const { searchUser, findUser } = require("../services/userService");

exports.createGroup = async (req, res) => {
  const t = await sequelize.transaction();
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ error: "Group name is required" });
    }

    const newGroup = await Group.create(
      { name: name, createdBy: req.user.id },
      { transaction: t }
    );

    await newGroup.addUser(req.user, {
      through: { isAdmin: true },
      transaction: t,
    });

    await t.commit();

    res.status(201).json({ group: { id: newGroup.id, name: newGroup.name } });
  } catch (err) {
    await t.rollback();
    console.log("error creating group: ", err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

exports.deleteGroup = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    if (!groupId) {
      return res.status(400).json({ err: "groupId is required" });
    }

    const group = await findGroup(groupId);
    if (!group) {
      return res
        .status(404)
        .json({ err: "group not exists or already deleted" });
    }

    const isAdmin = await checkAdmin(req.user.id, groupId);
    if (!isAdmin) {
      return res.status(403).json({ err: "only admin can delete a group" });
    }

    const deletedGroup = await deleteGroup(groupId);

    res.status(200).json({ message: "group deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ error: err || "Internal server error" });
  }
};

exports.addUser = async (req, res) => {
  const groupId = req.params.groupId;
  const { userId } = req.body;
  try {
    const group = await findGroup(groupId);
    if (!group) {
      return res.status(404).json({ eror: "Group not exists" });
    }

    const user = await findUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not exists" });
    }

    const existingMembership = await existingMember(userId, groupId);
    if (existingMembership) {
      return res
        .status(400)
        .json({ error: "User is already a member of the group." });
    }

    await group.addUser(user);

    res.status(201).json({ message: "user added to the group sucessfully" });
  } catch (err) {
    console.error("Error adding user to group:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.removeUser = async (req, res) => {
  const groupId = req.params.groupId;
  const { userId } = req.body;
  try {
    if (!groupId) {
      return res.status(400).json({ err: "groupId is required" });
    } else if (!userId) {
      return res.status(400).json({ err: "userId is required" });
    }

    const group = await findGroup(groupId);
    if (!group) {
      return res.status(400).json({ err: "Group doesnot exists" });
    }

    const adminUser = await checkAdmin(req.user.id, groupId);

    if (!adminUser) {
      return res
        .status(403)
        .json({ error: "only admin can perform this task" });
    }

    const result = await removeUserFromGroup(userId, groupId);

    if (result == 0) {
      return res.status(404).json({ error: "User is not part of this group" });
    }

    res
      .status(200)
      .json({ message: "User removed from the group successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

exports.groupMember = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const group = await Group.findByPk(groupId, {
      include: {
        model: User,
        attributes: ["id", "name", "email"],
        through: { attributes: ["isAdmin"] },
      },
    });

    if (!group) {
      return res.status(404).json({ error: "group not exists" });
    }

    res.status(200).json({ members: group.users });
  } catch (err) {
    console.error("Error fetching group members:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchNewuser = async (req, res) => {
  const { query } = req.query;
  const groupId = req.params.groupId;
  try {
    if (!query) {
      return res.status(400).json({ error: "search query is required" });
    } else if (!groupId) {
      return res.status(400).json({ error: "groupId is required" });
    }

    //validation to check valid email id or mobile no
    if (!(/^\d{10}$/.test(query) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query))) {
      return res.status(400).json({
        error: "Enter a valid 10-digit mobile number or full email ID",
      });
    }

    const reqUserAccess = await existingMember(req.user.id, groupId);

    if (!reqUserAccess) {
      return res.status(403).json({ error: "You are not part of the group" });
    }

    const user = await searchUser(query);

    const userExists = await existingMember(user.id, groupId);

    res.status(200).json({ ...user, isMember: userExists });
  } catch (err) {
    res.status(500).json({ error: err || "Internal Server Error" });
  }
};

exports.exitGroup = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const removedUser = await removeUserFromGroup(req.user.id, groupId);

    if (removedUser == 0) {
      return res.status(404).json({ err: "you are not a part of the group" });
    }

    res.status(200).json({ message: "successfully exited the group" });
  } catch (err) {
    res.status(500).json({ error: err || "Internal Server error" });
  }
};
