const Group = require("../models/group");
const User = require("../models/user");

exports.userGroupsList = async (req, res) => {
  try {
    const groups = await Group.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: User,
          where: { id: req.user.id },
          attributes: [], // it will exclude user model attribute
          through: { attributes: [] }, // it will exclude join table attribute
        },
      ],
    });

    res.status(200).json({ groups });
  } catch (err) {
    res.status(500).json({ err: "failed to get groups list" });
  }
};
