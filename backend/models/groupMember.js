const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const GroupMember = sequelize.define("groupMember", {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = GroupMember;
