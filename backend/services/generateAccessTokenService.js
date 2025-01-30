const jwt = require("jsonwebtoken");

const generateAccessToken = (id, name) => {
  return jwt.sign({ userId: id, name: name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateAccessToken;
