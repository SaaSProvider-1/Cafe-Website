import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Coffee,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      setError("Invalid reset link. Please try requesting a new password reset.");
      return;
    }
    setToken(resetToken);
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
    };
  };

  const passwordValidation = validatePassword(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!passwordValidation.isValid) {
      setError("Please ensure your password meets all requirements");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-50 via-cream-50 to-amber-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Coffee className="mx-auto mb-4 text-coffee-600" size={48} />
          <p className="text-coffee-600">Loading...</p>
        </div>
      </div>
    );
  }

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

        {/* Reset Password Card */}
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
              <Shield className="text-white" size={28} />
            </motion.div>

            <h1 className="font-display text-3xl font-bold text-coffee-900 mb-2">
              Reset Password
            </h1>
            <p className="text-coffee-600">
              Enter your new password below to complete the reset process.
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
            {/* New Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400 transition-colors duration-200"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-4 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                required
                disabled={isLoading}
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

            {/* Password Requirements */}
            {formData.password && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                <div className="space-y-1">
                  <div className={`flex items-center space-x-2 text-sm ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.minLength ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>At least 6 characters</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUpperCase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.hasLowerCase ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-sm ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span>One number</span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-400 transition-colors duration-200"
                size={20}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-4 border border-coffee-200 rounded-xl focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 bg-white/80 backdrop-blur-sm text-coffee-900 placeholder-coffee-400 transition-all duration-300 hover:border-coffee-300"
                required
                disabled={isLoading}
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

            {/* Password Match Indicator */}
            {formData.confirmPassword && (
              <div className={`text-sm ${formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                {formData.password === formData.confirmPassword ? (
                  <div className="flex items-center space-x-1">
                    <CheckCircle size={16} />
                    <span>Passwords match</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <AlertCircle size={16} />
                    <span>Passwords do not match</span>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !passwordValidation.isValid || formData.password !== formData.confirmPassword}
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
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Reset Password</span>
                </>
              )}
            </motion.button>

            {/* Security Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-700 text-sm">
                <strong>🔐 Security Tip:</strong> After resetting your password, you'll be automatically logged out of all devices for your security.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;