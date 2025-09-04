import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  return (
    <div className="flex items-center justify-between px-8 py-4 absolute top-0 left-0 w-full z-20 bg-black/60 backdrop-blur-md shadow-md">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="flex items-center text-white text-3xl font-bold cursor-pointer tracking-wide hover:scale-105 transition-transform duration-300 ease-in-out text-glow"
      >
        <img
          src="/images/logo-cf.png"
          alt="logo"
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        CareerForge
      </h1>

      {/* Middle Links */}
      <div className="flex flex-1 justify-center gap-6">
        {["Home", "About", "Services", "Features", "FAQ", "Contact"].map(
          (item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-lg"
            >
              {item}
            </Link>
          )
        )}

        {/* Role-based links */}
        {role === "employer" && (
          <Link
            to="/employer-dashboard"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Employer Dashboard
          </Link>
        )}

        {role === "job_seeker" && (
          <Link
            to="/jobseeker-dashboard"
            className="text-green-400 font-semibold hover:underline"
          >
            Jobseeker Dashboard
          </Link>
        )}
      </div>

      {/* Right side (Auth section) */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-white font-medium">
              Welcome, {user.fullname || user.email} ({role})
            </span>
            <button
              onClick={logout}
              className="text-white font-semibold py-2 px-5 border border-red-500 rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-white font-semibold py-2 px-5 border border-gray-500 rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-white font-semibold py-2 px-5 border border-gray-500 rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-lg"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};
