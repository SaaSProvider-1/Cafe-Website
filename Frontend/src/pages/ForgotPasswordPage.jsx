import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Coffee,
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          "Password reset instructions have been sent to your email address. Please check your inbox and follow the instructions to reset your password."
        );
        setEmail("");
      } else {
        setError(data.message || "Failed to send reset email");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
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
        {/* Back to Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="absolute -top-16 left-0 flex items-center space-x-2 text-coffee-600 hover:text-coffee-800 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Login</span>
        </motion.button>

        {/* Forgot Password Card */}
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
              Forgot Password?
            </h1>
            <p className="text-coffee-600">
              No worries! Enter your email address and we'll send you instructions to reset your password.
            </p>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2"
              >
                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-red-700 text-sm">{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start space-x-2"
              >
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                <span className="text-green-700 text-sm">{success}</span>
              </motion.div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400 transition-colors duration-200"
                size={20}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                required
                disabled={isLoading}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !email}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-coffee-600 to-coffee-700 hover:from-coffee-700 hover:to-coffee-800 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Reset Instructions</span>
                </>
              )}
            </motion.button>

            {/* Additional Info */}
            <div className="text-center pt-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="text-blue-700 text-sm">
                  <strong>💡 Tip:</strong> Check your spam/junk folder if you don't receive the email within a few minutes.
                </p>
              </div>

              <p className="text-coffee-600 text-sm mb-4">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-coffee-700 font-semibold hover:text-coffee-900 transition-colors underline"
                >
                  Sign in instead
                </Link>
              </p>

              <p className="text-coffee-500 text-xs">
                Need help? Contact our support team at{" "}
                <a
                  href="mailto:support@cafeelite.com"
                  className="text-coffee-600 hover:text-coffee-800 underline"
                >
                  support@cafeelite.com
                </a>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;