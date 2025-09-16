import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../services/api";
import { motion } from "framer-motion";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const schema = yup.object().shape({
  fullName: yup.string().required("Fullname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: yup.string().required("Role is required"),
});

export const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // 🚀 Extra guard against double submit
      if (isSubmitting) return;

      const response = await registerUser(data);

      console.log("Register successful:", response);

      localStorage.setItem(
        "registeredUser",
        JSON.stringify({
          email: response.email,
          role: response.role,
        })
      );

      alert("Registration successful! Please login.");
      navigate("/login");
      reset();
    } catch (error) {
      console.error("Register failed", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleGoogleAuth = () => {
    alert("Google Auth Coming Soon ✨");
  };

  return (
    <div className="relative w-screen min-h-screen flex justify-center items-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8">
      {/* Background */}
      <motion.img
        src="/images/login-page.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover blur-sm scale-105"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-emerald-900/40" />

      {/* Glassmorphic Form - Responsive */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-brightness-75 mt-4 sm:mt-6 lg:mt-10"
      >
        {/* Header */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-white drop-shadow-lg">
          Create your account
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-500 to-sky-500 animate-pulse text-sm sm:text-md lg:text-lg">
            Begin your new journey with us!
          </span>
        </h2>

        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* Fullname */}
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-white/80 text-sm mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("fullName")}
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-all duration-300 text-sm sm:text-base"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-white/80 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-all duration-300 text-sm sm:text-base"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative sm:col-span-2 md:col-span-1">
            <label className="block text-white/80 text-sm mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-3 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-all duration-300 pr-12 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-white/70 hover:text-emerald-300 text-sm transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="sm:col-span-2 md:col-span-1">
            <label className="block text-white/80 text-sm mb-2">Role</label>
            <select
              {...register("role")}
              className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-300 transition-all duration-300 text-sm sm:text-base"
            >
              <option value="" disabled selected hidden>
                Select Role
              </option>
              <option value="EMPLOYER" className="text-black">
                Employer
              </option>
              <option value="JOB_SEEKER" className="text-black">
                Jobseeker
              </option>
            </select>
            {errors.role && (
              <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button - Responsive */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-3 rounded-xl transition-transform transform hover:scale-105 disabled:opacity-50 shadow-lg text-sm sm:text-base"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        {/* Google Auth - Responsive */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-2 py-3 mt-4 border border-white/30 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 text-sm sm:text-base"
        >
          <FcGoogle className="text-lg sm:text-xl" /> 
          <span className="hidden xs:inline">Continue with </span>Google
        </button>

        {/* Footer - Responsive */}
        <p className="text-center text-xs sm:text-sm text-gray-300 mt-4 sm:mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};