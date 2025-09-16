import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const useForm = () => {
  const [values, setValues] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = (name) => ({
    name,
    value: values[name] || "",
    onChange: (e) => setValues({ ...values, [name]: e.target.value }),
  });

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    callback(values, setIsSubmitting);
  };

  const reset = () => setValues({});

  return { register, values, handleSubmit, isSubmitting, setIsSubmitting, reset };
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, isSubmitting, setIsSubmitting } = useForm();

  const onSubmit = async (values) => {
    try {
      setError("");
      setSuccess("");
      setIsSubmitting(true);

      const email = localStorage.getItem("resetEmail");
      if (!email) throw new Error("Email not found. Go back to Forgot Password.");

      if (!values.otp || values.otp.length !== 6) throw new Error("OTP must be 6 digits");
      if (!values.newPassword || values.newPassword.length < 6)
        throw new Error("New password must be at least 6 characters");
      if (values.newPassword !== values.confirmPassword) throw new Error("Passwords do not match");

      const res = await axios.post(
        "http://localhost:8080/api/auth/reset-password-with-otp",
        {
          email,
          otp: values.otp,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
        { withCredentials: true }
      );

      // Backend returns plain text message
      setSuccess(res.data || "Password reset successfully! Redirecting...");
      localStorage.removeItem("resetEmail");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      // Handle backend error (could be plain text or JSON)
      let msg =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Reset failed";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => navigate("/login");
  const handleResendOTP = () => alert("OTP sent to your email!");

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 px-4 sm:px-6 lg:px-8 py-8">
      <motion.img
        src="/images/login-page.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover blur-sm scale-105 animate-pulse"
        initial={{scale:1.3}}
        animate={{scale:1}}
        transition={{duration:8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut"}}
      />
      <div className="absolute w-full h-full bg-gradient-to-br from-emerald-900/30 via-gray-900/50 to-teal-900/40 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-emerald-900/50" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-brightness-75">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            Reset Password
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-sky-400 text-sm sm:text-base mt-2 font-medium">
              Almost there! Set your new password 🔐
            </span>
          </h2>
        </div>

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/40 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* OTP */}
        <div className="mb-4">
          <label className="block text-white/90 text-sm mb-2">Verification Code (OTP)</label>
          <input
            type="text"
            maxLength="6"
            {...register("otp")}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-center text-base sm:text-lg tracking-widest"
          />
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-xs text-emerald-300 hover:text-emerald-200 mt-2 transition-colors block w-full text-center sm:text-left sm:inline"
          >
            Didn't receive OTP? Resend
          </button>
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label className="block text-white/90 text-sm mb-2">New Password</label>
          <input
            type={showNewPassword ? "text" : "password"}
            {...register("newPassword")}
            placeholder="Enter your new password"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 pr-12 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-9 text-white/70 hover:text-emerald-300 text-sm transition-colors"
          >
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 sm:mb-6 relative">
          <label className="block text-white/90 text-sm mb-2">Confirm New Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm your new password"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 pr-12 text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-9 text-white/70 hover:text-emerald-300 text-sm transition-colors"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none shadow-lg mb-4 sm:mb-6 text-sm sm:text-base"
        >
          {isSubmitting ? "Resetting Password..." : "Reset Password"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleBackToLogin}
            className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}