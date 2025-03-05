const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authorization token is missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return next(new Error("Invalid or expired token"));
    }

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();
  } catch (err) {
    console.log(err);
    next(new Error("Internal server error"));
  }
};
