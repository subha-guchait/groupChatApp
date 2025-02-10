import React, { useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    const sucess = handleInputErrors({ email, password });

    if (!sucess) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");

      //context
      setAuthUser(res.data.token);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        toast.error("Incorrect password");
        return;
      }
      if (err.response.status === 404) {
        toast.error("User not exsits please signup");
        return;
      }
      if (err.response.status === 400) {
        toast.error("All fields are required");
        return;
      }
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    toast.error("Please enter a valid email");
    return false;
  }
  return true;
}
