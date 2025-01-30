import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="flex flex-col items-center justify-center w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
        </h1>
        <form>
          <div>
            <label htmlFor="email" className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="w-full input input-bordered h-10"
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
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block pl-1"
          >
            {"Don't"} have an account?
          </Link>
          <div>
            <button className="btn btn-primary w-full mt-4">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
