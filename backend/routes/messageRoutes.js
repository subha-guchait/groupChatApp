const express = require("express");
const { sendMessage } = require("../controllers/messageController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/sendmessage", authenticate, sendMessage);

module.exports = router;
