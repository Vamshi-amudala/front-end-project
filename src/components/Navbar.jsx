import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-8 py-4 absolute top-0 left-0 w-full z-20 bg-black/60 backdrop-blur-md shadow-md">
     <h1 className="flex items-center text-white text-3xl font-bold cursor-pointer tracking-wide hover:scale-105 transition-transform duration-300 ease-in-out text-glow ">
  {/* Round logo */}
  <img 
    src="/images/logo-cf.png" 
    alt="logo" 
    className="w-12 h-12 rounded-full object-cover mr-3"
  />
  <a href="/" className="mb-2">CareerForge</a>
</h1>



      <div className="flex flex-1 justify-center gap-6">
        {["Home", "About", "Services", "Features", "FAQ", "Contact"].map(
          (item, index) => (
            <Link
              key={index}
              to={`/${item}`}
              className="text-white font-medium py-2 px-4 rounded-lg relative overflow-hidden
                         transition-all duration-300 ease-in-out 
                         hover:scale-105 hover:bg-white/20 hover:shadow-lg"
            >
              {item}
            </Link>
          )
        )}
      </div>

      <div className="flex gap-4">
        <button onClick={() => navigate("/login")}
         className="text-white font-semibold py-2 px-5 border border-gray-500 rounded-lg 
                           shadow transition-all duration-300 ease-in-out 
                           hover:scale-105 hover:bg-gray-700 hover:shadow-lg">
          Login
        </button>
        <button  onClick={() => navigate("/register")}
        className="text-white font-semibold py-2 px-5 border border-gray-500 rounded-lg 
                           shadow transition-all duration-300 ease-in-out 
                           hover:scale-105 hover:bg-gray-700 hover:shadow-lg">
          Register
        </button>
      </div>
    </div>
  );
};
