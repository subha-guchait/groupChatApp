const cron = require("node-cron");

const ArchiveMessage = require("../models/archiveMessage");
const Message = require("../models/message");
const { Op } = require("sequelize");
const sequelize = require("../config/database");

const archiveOldMessages = async () => {
  const t = await sequelize.transaction();
  try {
    const previousDate = new Date();
    previousDate.setDate(previousDate.getDate() - 1);

    const oldMessages = await Message.findAll({
      where: { createdAt: { [Op.lt]: previousDate } },
      transaction: t,
    });

    if (oldMessages.length === 0) {
      //when no old messages
      await t.commit();
      return;
    }

    await ArchiveMessage.bulkCreate(
      oldMessages.map((msg) => ({
        id: msg.id,
        message: msg.message,
        media: msg.media,
        userName: msg.userName,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
        userId: msg.userId,
        groupId: msg.groupId,
      })),
      { transaction: t }
    );

    await Message.destroy({
      where: { createdAt: { [Op.lt]: previousDate } },
      transaction: t,
    });

    await t.commit();
  } catch (err) {
    await t.rollback();
    console.log("error archieving messages: ", err);
  }
};

cron.schedule("0 1 * * *", archiveOldMessages, { timezone: "Asia/Kolkata" }); // runs at 1:00 AM IST every day

module.exports = archiveOldMessages;
