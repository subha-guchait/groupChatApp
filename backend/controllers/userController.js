const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const createUser = require("../services/userServices");
const generateAccessToken = require("../services/generateAccessTokenService");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, phone, password, isAccepted } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone: phone }],
      },
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await createUser(req.body);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ wher: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateAccessToken(user.id, user.email);

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
