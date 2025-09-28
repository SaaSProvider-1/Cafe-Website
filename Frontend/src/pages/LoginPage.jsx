import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Coffee,
  ArrowLeft,
  Heart,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleGoogleCallback = useCallback(async (response) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          credential: response.credential,
          clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setSuccess("Google login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || 'Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError('An error occurred during Google login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setIsLoading, setError, setSuccess]);

  // Handle OAuth callback
  useEffect(() => {
    const token = searchParams.get("token");
    const authError = searchParams.get("error");

    if (token) {
      localStorage.setItem("token", token);
      setSuccess("Successfully logged in with Google!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }

    if (authError) {
      setError(decodeURIComponent(authError));
    }

    // Initialize Google Sign-In
    if (window.google && !document.querySelector('.google-signin-initialized')) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
        auto_select: false,
      });

      const googleButtonElement = document.getElementById("google-signin-div");
      if (googleButtonElement) {
        window.google.accounts.id.renderButton(
          googleButtonElement,
          {
            theme: "filled_blue",
            size: "large",
            width: "100%",
            text: "signin_with",
            shape: "rounded",
            logo_alignment: "left"
          }
        );
        googleButtonElement.classList.add('google-signin-initialized');
      }
    }
  }, [searchParams, navigate, handleGoogleCallback]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        setSuccess("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 via-cream-50 to-amber-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-coffee-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cream-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-md mx-auto">
        {/* Back to Home Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="absolute -top-16 left-0 flex items-center space-x-2 text-coffee-600 hover:text-coffee-800 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </motion.button>

        {/* Login Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {/* Coffee bean decorations */}
          <div className="absolute top-4 right-4 w-6 h-6 bg-coffee-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 bg-amber-300 rounded-full opacity-30"></div>
          <div className="absolute top-1/2 right-8 w-3 h-3 bg-coffee-300 rounded-full opacity-25"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-coffee-500 to-coffee-700 rounded-2xl shadow-lg mb-4"
            >
              <Coffee className="text-white" size={28} />
            </motion.div>

            <h1 className="font-display text-3xl font-bold text-coffee-900 mb-2">
              Welcome Back!
            </h1>
            <p className="text-coffee-600">
              Sign in to your account and continue your coffee journey
            </p>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2"
              >
                <AlertCircle className="text-red-500" size={20} />
                <span className="text-red-700 text-sm">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2"
              >
                <CheckCircle className="text-green-500" size={20} />
                <span className="text-green-700 text-sm">{success}</span>
              </motion.div>
            )}
          </div>

          {/* Social Login */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Google Button */}
              <div id="google-signin-div" className="col-span-3"></div>

              {/* Facebook Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.button>

              {/* Apple Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C6.624 0 2.248 4.377 2.248 9.77c0 2.346.832 4.504 2.219 6.193.386.471.832.832 1.316 1.109.554.316 1.154.539 1.787.668.633.13 1.302.129 1.936 0 .633-.129 1.233-.352 1.787-.668.484-.277.93-.638 1.316-1.109 1.387-1.689 2.219-3.847 2.219-6.193C21.828 4.377 17.451 0 12.017 0zm-6.624 9.77c0-3.66 2.964-6.624 6.624-6.624s6.624 2.964 6.624 6.624c0 1.109-.277 2.155-.762 3.07-.258.486-.602.915-1.016 1.271-.415.356-.901.63-1.438.806-.537.176-1.109.176-1.646 0-.537-.176-1.023-.45-1.438-.806-.414-.356-.758-.785-1.016-1.271-.485-.915-.762-1.961-.762-3.07z" />
                </svg>
              </motion.button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-coffee-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-coffee-500 font-medium">
                  or continue with email
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400 transition-colors duration-200"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400 transition-colors duration-200"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                required
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-400 hover:text-coffee-600 transition-colors duration-200 p-1 rounded-full hover:bg-coffee-50"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-coffee-600 bg-white border-coffee-300 rounded focus:ring-coffee-500 transition-all"
                />
                <span className="text-coffee-600 font-medium">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-coffee-600 hover:text-coffee-800 font-medium underline transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-coffee-600 to-coffee-700 hover:from-coffee-700 hover:to-coffee-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <Heart size={20} />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-coffee-100">
              <p className="text-coffee-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-coffee-700 font-semibold hover:text-coffee-900 transition-colors underline"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
