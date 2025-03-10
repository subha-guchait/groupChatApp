import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";
import { logIn } from "../api/authService";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    const sucess = handleInputErrors({ email, password });

    if (!sucess) return;
    setLoading(true);

    try {
      const token = await logIn(email, password);
      localStorage.setItem("token", token);
      toast.success("Login successful");
      //context
      setAuthUser(token);
    } catch (err) {
      console.error(err);
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
