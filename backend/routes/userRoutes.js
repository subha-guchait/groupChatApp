const express = require("express");

const { signUp } = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");

const router = express.Router();

router.post("/signup", validateUser, signUp);

module.exports = router;
