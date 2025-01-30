import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div
      className="p-4 h-screen flex items-center justify-center"
      data-theme="silk"
    >
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
