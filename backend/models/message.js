const Sequelize = require("sequelize");

const sequelize = require("../config/database");
const { message } = require("../validation/userSchema");

const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  media: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Message;
