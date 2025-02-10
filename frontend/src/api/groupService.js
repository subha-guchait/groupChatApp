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

export const getGroupMembers = async (groupId) => {
  try {
    const res = await axios.get(`${API_URL}/members/${groupId}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    return res.data.members;
  } catch (err) {
    throw new Error("Failed to fetch member");
  }
};

export const getQueryUser = async (groupId, query) => {
  try {
    const res = await axios.get(
      `${API_URL}/searchuser/${groupId}?query=${query}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.error);
  }
};

export const addUser = async (groupId, userId) => {
  try {
    const res = await axios.post(
      `${API_URL}/adduser/${groupId}`,
      { userId: userId },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error(err);
  }
};
export const removeUser = async (groupId, userId) => {
  try {
    const res = await axios.delete(
      `${API_URL}/removeuser/${groupId}?userId=${userId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
