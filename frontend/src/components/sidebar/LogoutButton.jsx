import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const { setAuthUser } = useAuthContext();

  const handleLogout = () => {
    try {
      localStorage.clear();
      setAuthUser(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <button className="mt-auto" onClick={handleLogout}>
      <BiLogOutCircle className="w-6 h-6 cursor-pointer" />
    </button>
  );
};

export default LogoutButton;
