import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const logIn = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data.token;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};

export const signUp = async (name, email, phone, password, isAccepted) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      phone,
      password,
      isAccepted,
    });
    return res.data.token;
  } catch (err) {
    console.error(err);
    throw new Error(err.response.data.message);
  }
};
