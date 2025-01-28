const userSchema = require("../validation/userSchema");

const validateUser = (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details,
      });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = validateUser;
