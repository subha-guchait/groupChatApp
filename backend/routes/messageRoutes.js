const express = require("express");
const {
  sendMessage,
  getNewMesages,
} = require("../controllers/messageController");
const { authenticate } = require("../middlewares/auth");
const { isGroupMember } = require("../middlewares/isGroupMember");

const router = express.Router();

router.post("/sendmessage/:groupId", authenticate, isGroupMember, sendMessage);
router.get("/getmessages/:groupId", authenticate, isGroupMember, getNewMesages);

module.exports = router;
