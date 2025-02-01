const jwt = require("jsonwebtoken");

const generateAccessToken = (id, name, email) => {
  return jwt.sign(
    { userId: id, name: name, email: email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateAccessToken;
