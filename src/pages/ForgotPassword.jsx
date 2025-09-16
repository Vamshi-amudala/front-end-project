import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      setIsSubmitting(true);

      // Call your backend
      const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to send reset OTP");
      }

      // If backend sends JSON
      const data = await res.json().catch(() => ({}));
      setMessage(data.message || "OTP sent to your email!");

      // After 1.5s, redirect to reset page with email in state
      setTimeout(() => {
        // After successful OTP request
        localStorage.setItem("resetEmail", email);
        navigate("/reset-pass");
      }, 1500);
    } catch (err) {
      console.error("Forgot password failed:", err);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 px-4 sm:px-6 lg:px-8 py-8">
      {/* Background Image */}
      <motion.img
        src="/images/login-page.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover blur-sm scale-105"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeInOut",repeat:Infinity, repeatType:"reverse" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-emerald-900/50" />

      {/* Glassmorphic Form - Responsive */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            Forgot Password?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-sky-400 text-sm sm:text-base mt-2 font-medium">
              Enter your email to reset it 🔑
            </span>
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/40 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-400/40 text-green-300 text-sm text-center">
            {message}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4 sm:mb-6">
          <label className="block text-white/90 text-sm mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none shadow-lg text-sm sm:text-base"
        >
          {isSubmitting ? "Sending..." : "Send Reset OTP"}
        </button>

        {/* Back to Login */}
        <div className="text-center mt-4 sm:mt-6">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}