import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Coffee,
  ArrowLeft,
} from "lucide-react";

const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    if (!email) {
      setError("Please enter your email address.");
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/request-license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage(data.message);
        setEmail(""); // Clear the form
      } else {
        if (data.code === "ADMIN_EXISTS") {
          setError(
            "Admin account already exists. Please use the login page instead."
          );
        } else {
          setError(data.message || "Failed to request license key.");
        }
      }
    } catch (error) {
      console.error("License request error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-green-600" />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            License Key Sent!
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">{message}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Next Steps:</h3>
              <ol className="text-blue-800 text-sm space-y-1 text-left">
                <li>1. Check your email for the license key</li>
                <li>2. Open terminal/command prompt</li>
                <li>3. Navigate to the backend directory</li>
                <li>4. Run the CLI command from the email</li>
              </ol>
            </div>

            <div className="flex space-x-3">
              <Link to="/admin" className="flex-1">
                <button className="w-full px-4 py-2 bg-coffee-600 hover:bg-coffee-700 text-white rounded-lg font-semibold transition-colors">
                  Go to Login
                </button>
              </Link>
              <button
                onClick={() => {
                  setSuccess(false);
                  setMessage("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                Request Another
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Link
            to="/admin"
            className="inline-flex items-center text-coffee-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-coffee-600 rounded-full mb-4"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Request Admin Access
          </h1>
          <p className="text-coffee-300">
            Get your license key to create an admin account
          </p>
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <Coffee className="w-6 h-6 text-coffee-600 mr-2" />
            <span className="text-xl font-semibold text-coffee-900">
              Café Elite
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center"
              >
                <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                <span className="text-red-700 text-sm">{error}</span>
              </motion.div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                How it works:
              </h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Enter your email to request a license key</li>
                <li>• We'll send you a unique license key via email</li>
                <li>• Use the CLI tool to create your admin account</li>
                <li>• Only one admin account is allowed per system</li>
              </ul>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 transition-colors duration-200"
                  placeholder="your-email@example.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-coffee-600 hover:bg-coffee-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending Request...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Request License Key</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/admin"
                className="font-medium text-coffee-600 hover:text-coffee-700"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="bg-coffee-800/50 rounded-lg p-4 border border-coffee-600/30">
            <p className="text-coffee-300 text-sm">
              🔒 <strong>Secure System:</strong> License keys are single-use and
              expire after account creation.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminSignup;
