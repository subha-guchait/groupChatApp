const express = require("express");

const {
  createGroup,
  addUser,
  groupMember,
  removeUser,
  searchNewuser,
  exitGroup,
  deleteGroup,
} = require("../controllers/groupController");
const { getNewMesages } = require("../controllers/messageController");
const { authenticate } = require("../middlewares/auth");
const { isGroupMember } = require("../middlewares/isGroupMember");

const router = express.Router();

router.post("/creategroup", authenticate, createGroup);
router.delete("/deletegroup/:groupId", authenticate, deleteGroup);
router.post("/adduser/:groupId", authenticate, isGroupMember, addUser);
router.delete("/removeuser/:groupId", authenticate, removeUser);
router.get("/messages/:groupId", authenticate, getNewMesages);
router.get("/members/:groupId", authenticate, isGroupMember, groupMember);
router.get("/searchuser/:groupId", authenticate, isGroupMember, searchNewuser);
router.delete("/exit/:groupId", authenticate, isGroupMember, exitGroup);

module.exports = router;
