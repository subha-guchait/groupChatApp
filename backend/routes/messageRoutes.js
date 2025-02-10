const express = require("express");
const {
  sendMessage,
  getNewMesages,
} = require("../controllers/messageController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.post("/sendmessage", authenticate, sendMessage);
router.get("/getmessages/:groupId", authenticate, getNewMesages);

module.exports = router;
