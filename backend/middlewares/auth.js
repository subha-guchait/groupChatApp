const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userDetails = await User.findOne({ where: { id: user.userId } });

    if (!userDetails) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userDetails;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
