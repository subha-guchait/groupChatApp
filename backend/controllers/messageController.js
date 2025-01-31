const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: `Message can't be empty` });
    }
    const newMessage = await Message.create({ message, userId: req.user.id });
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
