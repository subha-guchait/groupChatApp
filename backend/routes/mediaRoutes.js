const express = require("express");

const { uploadMediaGroupUrl } = require("../controllers/mediaController");
const { authenticate } = require("../middlewares/auth");
const { isGroupMember } = require("../middlewares/isGroupMember");

const router = express.Router();

router.post(
  "/uploadmedia/:groupId",
  authenticate,
  isGroupMember,
  uploadMediaGroupUrl
);

module.exports = router;
