import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [loginStatus, setLoginStatus] = useState(null);

  // Security: Block login after 3 failed attempts for 5 minutes
  const MAX_ATTEMPTS = 3;
  const BLOCK_DURATION = 5 * 60 * 1000; // 5 minutes

  useEffect(() => {
    // Check if user is blocked
    const blockData = localStorage.getItem("adminLoginBlock");
    if (blockData) {
      const { timestamp, attempts } = JSON.parse(blockData);
      const now = Date.now();
      const timeElapsed = now - timestamp;

      if (attempts >= MAX_ATTEMPTS && timeElapsed < BLOCK_DURATION) {
        setIsBlocked(true);
        setBlockTimeLeft(BLOCK_DURATION - timeElapsed);
        setLoginAttempts(attempts);
      } else if (timeElapsed >= BLOCK_DURATION) {
        // Block expired, reset attempts
        localStorage.removeItem("adminLoginBlock");
        setLoginAttempts(0);
      } else {
        setLoginAttempts(attempts);
      }
    }
  }, []);

  useEffect(() => {
    if (isBlocked && blockTimeLeft > 0) {
      const timer = setInterval(() => {
        setBlockTimeLeft((prev) => {
          if (prev <= 1000) {
            setIsBlocked(false);
            setLoginAttempts(0);
            localStorage.removeItem("adminLoginBlock");
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeLeft]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBlocked) {
      setLoginStatus({
        type: "error",
        message: `Too many failed attempts. Please wait ${Math.ceil(
          blockTimeLeft / 60000
        )} minutes.`,
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoginStatus(null);

    try {
      const result = await login(formData);

      if (result.success) {
        setLoginStatus({
          type: "success",
          message: "Login successful! Redirecting to admin dashboard...",
        });

        // Clear any existing block data
        localStorage.removeItem("adminLoginBlock");

        // Redirect will be handled by the parent component
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1500);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        // Store failed attempt
        const blockData = {
          timestamp: Date.now(),
          attempts: newAttempts,
        };
        localStorage.setItem("adminLoginBlock", JSON.stringify(blockData));

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsBlocked(true);
          setBlockTimeLeft(BLOCK_DURATION);
          setLoginStatus({
            type: "error",
            message: `Too many failed attempts. Access blocked for ${
              BLOCK_DURATION / 60000
            } minutes.`,
          });
        } else {
          setLoginStatus({
            type: "error",
            message: `${result.error} (${
              MAX_ATTEMPTS - newAttempts
            } attempts remaining)`,
          });
        }
      }
    } catch (error) {
      setLoginStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        ></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-coffee-600 rounded-full mb-4"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-coffee-300">Secure login required</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Message */}
            <AnimatePresence>
              {loginStatus && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-lg border flex items-center space-x-3 ${
                    loginStatus.type === "success"
                      ? "bg-green-500/20 border-green-500/30 text-green-300"
                      : "bg-red-500/20 border-red-500/30 text-red-300"
                  }`}
                >
                  {loginStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{loginStatus.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Block Warning */}
            {isBlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-center"
              >
                <Lock className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="text-red-300 font-semibold">
                  Access Temporarily Blocked
                </p>
                <p className="text-red-400 text-sm mt-1">
                  Time remaining: {formatTime(blockTimeLeft)}
                </p>
              </motion.div>
            )}

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-white font-medium mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-coffee-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isBlocked || isLoading}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                    errors.username ? "border-red-500" : "border-white/30"
                  } ${
                    isBlocked || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Enter admin username"
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-white font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-coffee-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isBlocked || isLoading}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                    errors.password ? "border-red-500" : "border-white/30"
                  } ${
                    isBlocked || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isBlocked || isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-coffee-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Login Attempts Warning */}
            {loginAttempts > 0 && !isBlocked && (
              <div className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 text-sm text-center">
                  ⚠️ {loginAttempts} failed attempt
                  {loginAttempts > 1 ? "s" : ""}.{MAX_ATTEMPTS - loginAttempts}{" "}
                  remaining before temporary block.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isBlocked || isLoading}
              whileHover={{ scale: isBlocked || isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isBlocked || isLoading ? 1 : 0.98 }}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                isBlocked || isLoading
                  ? "bg-gray-600 cursor-not-allowed opacity-50"
                  : "bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 focus:ring-offset-transparent"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Secure Login</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Security Info */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <p className="text-coffee-300 text-sm">
                🔒 This is a secure admin area
              </p>
              <p className="text-coffee-400 text-xs mt-1">
                All login attempts are monitored and logged
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-coffee-400 text-sm">
            © 2025 Café Elite - Admin Portal
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
