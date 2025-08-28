import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Mock navigate function

// Mock form validation
const useForm = ({ resolver }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = (name) => ({
    name,
    onChange: (e) => {
      setValues({ ...values, [name]: e.target.value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: null });
      }
    },
    value: values[name] || ""
  });

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock validation
    const newErrors = {};
    if (!values.otp) newErrors.otp = { message: "OTP is required" };
    else if (values.otp.length !== 6) newErrors.otp = { message: "OTP must be 6 digits" };

    if (!values.newPassword) newErrors.newPassword = { message: "New password is required" };
    else if (values.newPassword.length < 6) newErrors.newPassword = { message: "Password must be at least 6 characters" };

    if (!values.confirmPassword) newErrors.confirmPassword = { message: "Please confirm your password" };
    else if (values.newPassword !== values.confirmPassword) newErrors.confirmPassword = { message: "Passwords don't match" };

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Mock API call
    setTimeout(() => {
      onSubmit(values);
      setIsSubmitting(false);
    }, 1500);
  };

  const reset = () => {
    setValues({});
    setErrors({});
  };

  return {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  };
};

// Mock API function
const resetPassword = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, message: "Password reset successfully" };
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: null,
  });

  const onSubmit = async (data) => {
    try {
      setError("");
      setSuccess("");
      const response = await resetPassword(data);

      console.log("Reset successful:", response);
      setSuccess("Password reset successfully! Redirecting to login...");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      reset();
    } catch (error) {
      console.error("Reset failed:", error);
      setError(error.message || "Reset failed. Please try again.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
    // Mock resend OTP logic
    alert("OTP sent to your email!");
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      {/* Background Image */}
      <motion.img
        src="/images/login-page.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover blur-sm scale-105 animate-pulse"
        style={{
          animation: "pulse 8s ease-in-out infinite"
        }}
      />
      
      {/* Enhanced Background with subtle animation */}
      <div className="absolute w-full h-full bg-gradient-to-br from-emerald-900/30 via-gray-900/50 to-teal-900/40 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-emerald-900/50" />

      {/* Glassmorphic Form */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl backdrop-brightness-75">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            Reset Password
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-sky-400 text-base mt-2 font-medium">
              Almost there! Set your new password 🔐
            </span>
          </h2>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm text-center">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/40 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {/* OTP Field */}
        <div className="mb-4">
          <label className="block text-white/90 text-sm mb-2" htmlFor="otp">
            Verification Code (OTP)
          </label>
          <input
            id="otp"
            type="text"
            maxLength="6"
            {...register("otp")}
            placeholder="Enter 6-digit OTP"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-center text-lg tracking-widest"
          />
          {errors.otp && (
            <p className="text-red-400 text-sm mt-1" role="alert">
              {errors.otp.message}
            </p>
          )}
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-xs text-emerald-300 hover:text-emerald-200 mt-2 transition-colors"
          >
            Didn't receive OTP? Resend
          </button>
        </div>

        {/* New Password Field */}
        <div className="mb-4 relative">
          <label className="block text-white/90 text-sm mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            {...register("newPassword")}
            placeholder="Enter your new password"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-4 top-9 text-white/70 hover:text-emerald-300 text-sm transition-colors"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
          >
            {showNewPassword ? "Hide" : "Show"}
          </button>
          {errors.newPassword && (
            <p className="text-red-400 text-sm mt-1" role="alert">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6 relative">
          <label className="block text-white/90 text-sm mb-2" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            placeholder="Confirm your new password"
            className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-9 text-white/70 hover:text-emerald-300 text-sm transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1" role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Reset Password Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none shadow-lg mb-6"
        >
          {isSubmitting ? "Resetting Password..." : "Reset Password"}
        </button>

        {/* Footer Links */}
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