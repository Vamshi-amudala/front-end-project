import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Eye, EyeOff, Loader } from "lucide-react"; 
import { useAuth } from "../context/AuthContext"; 
import { useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

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
    value: values[name] || "",
  });

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock validation
    const newErrors = {};
    if (!values.email) newErrors.email = { message: "Email is required" };
    else if (!/\S+@\S+\.\S+/.test(values.email))
      newErrors.email = { message: "Invalid email" };

    if (!values.password) newErrors.password = { message: "Password is required" };
    else if (values.password.length < 6)
      newErrors.password = { message: "Password must be at least 6 characters" };

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Mock API call
    setTimeout(() => {
      onSubmit(values);
      setIsSubmitting(false);
    }, 1000);
  };

  const reset = () => {
    setValues({});
    setErrors({});
  };

  return {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  };
};

const loginUser = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message || "Login failed");
    } else {
      throw new Error("Network error");
    }
  }
};

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Redirect already logged-in users to the correct dashboard
    if (user) {
      const role = user.role?.toLowerCase();
      if (role === "employer") navigate("/employer-dashboard");
      else if (role === "job_seeker" || role === "jobseeker") navigate("/jobseeker-dashboard");
      else navigate("/dashboard");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: null,
  });

  const onSubmit = async (data) => {
    let toastId;
    try {
      setError("");
      setSuccess("");

      // Show spinner toast
      toastId = toast.loading("Signing you in...", {
        position: "top-center",
        className: "!z-[10050]"
      });

      const response = await loginUser(data);

      login(response);

      toast.update(toastId, {
        render: "Login successful! Redirecting...",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        position: "top-center"
      });

      setTimeout(() => {
        const role = response.role?.toLowerCase();
        if (role === "employer") {
          navigate("/employer-dashboard");
        } else if (role === "job_seeker" || role === "jobseeker") {
          navigate("/jobseeker-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1200);

      reset();
    } catch (error) {
      console.error("Login failed:", error);

      toast.update(toastId, {
        render: error.message || "Login failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        position: "top-center"
      });

      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 px-4 sm:px-6 lg:px-8">
      <motion.img
        src="/images/login-page.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover blur-sm scale-105"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Enhanced Background */}
      <div className="absolute w-full h-full bg-gradient-to-br from-emerald-900/30 via-gray-900/50 to-teal-900/40 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-emerald-900/50" />

      {/* Glassmorphic Form - Responsive */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-brightness-75 my-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            Welcome Back
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-sky-400 text-sm sm:text-base mt-2 font-medium">
              Ready to continue your journey? ✨
            </span>
          </h2>
        </div>

        {/* Success & Error Messages */}
        {success && (
          <div
            className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-400/40 text-green-300 text-sm text-center font-medium"
            aria-live="polite"
          >
            {success}
          </div>
        )}
        {error && (
          <div
            className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-400/40 text-red-300 text-sm text-center"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-white/90 text-sm mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              className="block text-white/90 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-3 pr-12 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-white/70 hover:text-emerald-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none shadow-lg text-sm sm:text-base"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin w-4 h-4" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer Links - Responsive spacing */}
        <div className="text-center space-y-3 mt-4 sm:mt-6">
          <Link
            to="/forgotPass"
            className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            Forgot Password?
          </Link>

          <p className="text-xs sm:text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-400 font-semibold hover:underline transition-all"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Toast Container with enhanced styling */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!z-[10050] !bg-gray-800/90 !backdrop-blur-md !border !border-white/20 !text-white"
        bodyClassName="!text-white"
        progressClassName="!bg-gradient-to-r !from-emerald-400 !to-teal-500"
      />
    </div>
  );
}