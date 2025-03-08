const { Op } = require("sequelize");

const Message = require("../models/message");

exports.sendMessage = async (req, res) => {
  try {
    const { message, media } = req.body;
    const groupId = req.params.groupId;
    if ((!message && !media) || !groupId) {
      return res
        .status(400)
        .json({ message: `message or media and groupId can't be empty` });
    }
    const newMessage = await Message.create({
      message,
      media,
      userName: req.user.name,
      userId: req.user.id,
      groupId: groupId,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.getNewMesages = async (req, res) => {
  const lastMessageId = req.query.lastMessageId || 0;
  const groupId = req.params.groupId;
  try {
    const newMessages = await Message.findAll({
      where: {
        groupId: groupId,
        id: { [Op.gt]: lastMessageId },
      },
    });

    res.status(200).json({ newMessages, lastmessageid: lastMessageId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getAllMessages = async (req, res) => {
//   try {
//     const messages = await Message.findAll({ order: [["createdAt", "ASC"]] }); // get all messages
//     res.status(200).json(messages);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };
