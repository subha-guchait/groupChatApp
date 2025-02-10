const express = require("express");

const { userGroupsList } = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");

const router = express.Router();

router.get("/groupslist", authenticate, userGroupsList);

module.exports = router;
