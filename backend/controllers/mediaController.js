const { putObjectUrl } = require("../services/awsService");

exports.uploadMediaGroupUrl = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { fileName, contentType } = req.body;
    if (!fileName || !contentType || !groupId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (
      contentType == "video/mp4" ||
      contentType == "image/jpeg" ||
      contentType == "image/png" ||
      contentType == "image/jpg"
    ) {
      console.log("valid content type");
    } else {
      return res.status(400).json({ message: "Invalid content type" });
    }

    const key = `group/${groupId}/${fileName}-${Date.now()}`; //file name

    const url = await putObjectUrl(key, contentType);

    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to get signed url" });
  }
};
