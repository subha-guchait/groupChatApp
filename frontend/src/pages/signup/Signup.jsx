import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isAccepted: false,
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="flex flex-col items-center justify-center w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="label p-2">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              className="w-full input input-bordered h-10"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>
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
            <label htmlFor="phone" className="label p-2">
              <span className="text-base label-text">Phone No</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter Mobile No"
              className="w-full input input-bordered h-10"
              value={input.phone}
              onChange={(e) => setInput({ ...input, phone: e.target.value })}
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
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block pl-1"
          >
            Already have an account?
          </Link>
          <div className="m-2">
            <input
              type="checkbox"
              className="toggle"
              checked={isAccepted}
              onChange={(e) => {
                setIsAccepted(e.target.checked);
                setInput({ ...input, isAccepted: e.target.checked });
              }}
            />

            <span className="p-2">
              I accept{" "}
              <a
                className="text-sm hover:underline hover:text-blue-600"
                href="#"
              >
                T&C
              </a>
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
