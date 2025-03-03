const GroupMember = require("../models/groupMember");

exports.isGroupMember = async (req, res, next) => {
  const groupId = req.params.groupId;
  console.log("groupId", groupId);
  try {
    const ismember = await GroupMember.findOne({
      where: { userId: req.user.id, groupId: groupId },
    });
    console.log(ismember);

    if (!ismember) {
      return res.status(403).json({ message: "user is not a group member" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
