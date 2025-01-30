const { Op } = require("sequelize");

const User = require("../models/user");
const createUser = require("../services/userServices");

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
