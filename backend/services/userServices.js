const bcrypt = require("bcrypt");

const User = require("../models/user");

const createUser = async ({ name, email, phone, password, isAccepted }) => {
  try {
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      isAccepted,
    });
    return newUser;
  } catch (err) {
    throw new Error("Failed to create a new user: " + err);
  }
};

module.exports = createUser;
