const express = require("express");

const { signUp, logIn } = require("../controllers/userController");
const validateUser = require("../middlewares/validateUser");

const router = express.Router();

router.post("/signup", validateUser, signUp);
router.post("/login", logIn);

module.exports = router;
