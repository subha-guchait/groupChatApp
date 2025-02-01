const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/sendmessage", authenticate, sendMessage);
router.get("/getmessages", getMessages);

module.exports = router;
