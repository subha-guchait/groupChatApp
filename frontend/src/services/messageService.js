import axios from "axios";

const API_URL = "/api/message";

export const getMessages = async (lastMessageId) => {
  try {
    const response = await axios.get(
      `${API_URL}/getmessages?lastMessageId=${lastMessageId}`,
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return response.data.newMessages;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(
      `${API_URL}/sendmessage`,
      { message },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
