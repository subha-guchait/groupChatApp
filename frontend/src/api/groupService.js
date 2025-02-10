import axios from "axios";

const API_URL = "/api/group";

export const createGroup = async (groupName) => {
  try {
    const res = await axios.post(
      `${API_URL}/creategroup`,
      { name: groupName },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return res.data.group;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create new group");
  }
};
