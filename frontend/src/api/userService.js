import axios from "axios";

const API_URL = "api/user";

export const getGroups = async () => {
  try {
    const res = await axios.get(`${API_URL}/groupslist`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    return res.data.groups;
  } catch (err) {
    console.error(err);
    return [];
  }
};
