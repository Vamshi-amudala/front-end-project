import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Common links for all users
  const commonLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Features", path: "/features" },
    { title: "FAQ", path: "/faq" },
    { title: "Contact", path: "/contact" },
  ];

  const employerLinks = [
    { title: "Dashboard", path: "/employer-dashboard" },
    { title: "Post Job", path: "/post-job" },
    { title: "Manage Jobs", path: "/manage-jobs" },
    { title: "View Applicants", path: "/view-applicants" },
    // { title: "Profile", path: "/profile" },
  ];

  const jobSeekerLinks = [
    { title: "Dashboard", path: "/jobseeker-dashboard" },
    { title: "View Jobs", path: "/view-jobs" },
    { title: "Applications", path: "/applications" },
    { title: "Profile", path: "/job-profile" },
    { title: "Resume", path: "/resume" },
  ];

  // Determine which links to show
  const linksToRender = user
    ? role === "employer"
      ? employerLinks
      : role === "job_seeker"
      ? jobSeekerLinks
      : []
    : commonLinks;

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
       {/* <a href="/"> CareerForge</a> */}
       <Link to='/'> CareerForge</Link>
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

      {/* Links */}
      <div
        className={`flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto transition-all duration-300 ${
          menuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        {linksToRender.map((link) => (
          <NavLink
            key={link.title}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `w-full sm:w-auto py-2 sm:py-3 px-4 rounded-lg font-semibold text-center shadow-md transition-colors duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg ${
                isActive
                  ? "text-blue-400 bg-gray-800 shadow-lg" // active link styling
                  : user
                  ? role === "employer"
                    ? "text-gray-400"
                    : "text-gray-400"
                  : "text-white"
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>

      {/* Auth buttons */}
      <div
        className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-6 mt-2 sm:mt-0 ${
          menuOpen ? "block" : "hidden sm:flex"
        }`}
      >
        {user ? (
          <>
            <span className="text-white font-medium text-center">
              {user.fullname || user.email}
            </span>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
                navigate("/home")
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
              className="text-white font-semibold py-2 px-5 border  rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-lg"
            >
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
              className="text-white font-semibold py-2 px-5 border rounded-lg shadow transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-700 hover:shadow-lg"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};
