import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Eye, EyeOff, Loader } from "lucide-react"; 

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
  const [showPassword, setShowPassword] = useState(false);
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
    const response = await loginUser(data);

    console.log("Login successful:", response);

    // Save user info for persistence
    localStorage.setItem("user", JSON.stringify(response));

    setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        const role = response.role?.toLowerCase(); // "job_seeker" or "employer"
        console.log("Normalized role:", role);

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
    setError(error.message || "Login failed. Please try again.");
  }
};


  // const handleGoogleAuth = () => {
  //   // Redirect to your backend Google OAuth endpoint
  //   window.location.href = "http://localhost:8080/api/auth/google";
  // };

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      <motion.img
        src="/images/login-page.jpg"
        alt="Background"
        className="absolute w-full h-full object-cover blur-sm scale-105"
        initial={{ scale: 1.3 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Enhanced Background */}
      <div className="absolute w-full h-full bg-gradient-to-br from-emerald-900/30 via-gray-900/50 to-teal-900/40 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-emerald-900/50" />

      {/* Glassmorphic Form */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl backdrop-brightness-75">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            Welcome Back
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-400 to-sky-400 text-base mt-2 font-medium">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              className="w-full px-4 py-3 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300"
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
              className="w-full px-4 py-3 pr-12 rounded-xl border border-white/30 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-9 text-white/70 hover:text-emerald-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:transform-none shadow-lg"
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

        {/* Google Auth Button */}
        {/* <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 py-3 border border-white/30 hover:bg-white/10 text-white font-medium rounded-xl transition-all duration-300 mt-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button> */}

        {/* Footer Links */}
        <div className="text-center space-y-3 mt-6">
          <Link
            to="/forgotPass"
            className="text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            Forgot Password?
          </Link>

          <p className="text-sm text-gray-300">
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
    </div>
  );
}
