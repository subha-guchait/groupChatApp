const { Op } = require("sequelize");

const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: `Message can't be empty` });
    }
    const newMessage = await Message.create({
      message,
      userName: req.user.name,
      userId: req.user.id,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getNewMesages = async (req, res, next) => {
  try {
    const lastMessageId = req.query.lastMessageId || 0;
    const newMessages = await Message.findAll({
      where: {
        id: { [Op.gt]: lastMessageId },
      },
    });

    res.status(200).json({ newMessages, lastmessageid: lastMessageId });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [["createdAt", "ASC"]] }); // get all messages
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
