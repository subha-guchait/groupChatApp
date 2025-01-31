import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="flex flex-col items-center justify-center w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block pl-1"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
