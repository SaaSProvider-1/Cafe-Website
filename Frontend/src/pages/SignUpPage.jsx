import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Coffee,
  ArrowLeft,
  Star,
  Shield,
} from "lucide-react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    // Handle success - redirect to home
    navigate("/");
    console.log("Sign up submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-50 via-cream-50 to-amber-50 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-coffee-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-cream-300/20 rounded-full blur-2xl"></div>
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

        {/* Sign Up Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8"
        >
          {/* Coffee bean decorations */}
          <div className="absolute top-4 right-4 w-6 h-6 bg-coffee-200 rounded-full opacity-20"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 bg-amber-300 rounded-full opacity-30"></div>
          <div className="absolute top-1/3 right-8 w-3 h-3 bg-coffee-300 rounded-full opacity-25"></div>

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
              Join Café Elite
            </h1>
            <p className="text-coffee-600">
              Create your account and become part of our coffee community
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Google Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </motion.button>

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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400"
                  size={18}
                />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-3 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400"
                  size={18}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-3 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400"
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

            {/* Phone */}
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400"
                size={20}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional)"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400"
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

            {/* Confirm Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400"
                size={20}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                required
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-400 hover:text-coffee-600 transition-colors duration-200 p-1 rounded-full hover:bg-coffee-50"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 text-coffee-600 bg-white border-coffee-300 rounded focus:ring-coffee-500 mt-0.5 transition-all"
                required
              />
              <span className="text-sm text-coffee-600 leading-5">
                I agree to the{" "}
                <span className="text-coffee-700 underline cursor-pointer font-medium hover:text-coffee-900 transition-colors">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-coffee-700 underline cursor-pointer font-medium hover:text-coffee-900 transition-colors">
                  Privacy Policy
                </span>
              </span>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Star size={20} />
                  <span>Create Account</span>
                </>
              )}
            </motion.button>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-coffee-100">
              <p className="text-coffee-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-coffee-700 font-semibold hover:text-coffee-900 transition-colors underline"
                >
                  Sign in instead
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-xs text-coffee-500 pt-2">
              <Shield size={16} />
              <span>
                Your information is protected with enterprise-grade security
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
