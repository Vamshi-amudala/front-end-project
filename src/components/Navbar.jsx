import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 fixed top-0 left-0 w-full z-20 bg-black/60 backdrop-blur-md shadow-md">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="flex items-center text-white text-3xl font-bold cursor-pointer tracking-wide hover:scale-105 transition-transform duration-300 ease-in-out text-glow mb-2 sm:mb-0"
      >
        <img
          src="/images/logo-cf.png"
          alt="logo"
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <a href="/">CareerForge</a>
      </h1>

      {/* Hamburger for Mobile */}
      <div className="sm:hidden absolute top-4 right-4">
        <button
          onClick={toggleMenu}
          className="text-white text-3xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Middle Links */}
      <div
        className={`flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto transition-all duration-300 ${
          menuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        {["Home", "About", "Services", "Features", "FAQ", "Contact"].map(
          (item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:bg-white/20 hover:shadow-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          )
        )}

        {/* Role-based links */}
        {role === "employer" && (
          <Link
            to="/employer-dashboard"
            className="text-yellow-400 font-semibold hover:underline text-center"
            onClick={() => setMenuOpen(false)}
          >
            Employer Dashboard
          </Link>
        )}

        {role === "job_seeker" && (
          <Link
            to="/jobseeker-dashboard"
            className="text-green-400 font-semibold hover:underline text-center"
            onClick={() => setMenuOpen(false)}
          >
            Jobseeker Dashboard
          </Link>
        )}
      </div>

      {/* Right side (Auth section) */}
      <div
        className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2 sm:mt-0 ${
          menuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        {user ? (
          <>
            <span className="text-white font-medium text-center">
              Welcome, {user.fullname || user.email} ({role})
            </span>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="text-white font-semibold py-2 px-5 border border-red-500 rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-red-600 hover:shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="text-white font-semibold py-2 px-5 border border-gray-500 rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
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
