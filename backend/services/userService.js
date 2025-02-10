const { Op } = require("sequelize");
const User = require("../models/user");

const searchUser = async (query) => {
  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ phone: query }, { email: query }] },
      attributes: ["id", "name", "email", "phone"],
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  } catch (err) {
    throw new Error("error searching user: ", err);
  }
};

const findUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required");
    }
    const user = await User.findByPk(userId);

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { searchUser, findUser };
