import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ name, email, phone, password, isAccepted }) => {
    const sucess = handleInputErrors({
      name,
      email,
      phone,
      password,
      isAccepted,
    });
    if (!sucess) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        phone,
        password,
        isAccepted,
      });

      toast.success("Signup successful");
      localStorage.setItem("token", res.data.token);

      //context
      setAuthUser(res.data.token);
    } catch (err) {
      console.error(err);
      if (err.response.status === 409) {
        toast.error("Email or phone number already exists");
        return;
      }
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ name, email, phone, password, isAccepted }) {
  if (!name || !email || !phone || !password) {
    toast.error("All fields are required");
    return false;
  }
  if (name.length < 2) {
    toast.error("Name must be atleast 2 characters long");
    return false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    toast.error("Invalid email");
    return false;
  }
  if (phone.length !== 10) {
    toast.error("Phone number must be 10 digits long");
    return false;
  }
  if (password.length < 8) {
    toast.error("Password must be atleast 8 characters long");
    return false;
  }
  if (!isAccepted) {
    toast.error("Please accept the terms and conditions");
    return false;
  }

  return true;
}
