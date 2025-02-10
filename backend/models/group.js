const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const Group = sequelize.define("group", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Group;
