import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  AlertCircle,
  CheckCircle,
  Key,
  Mail,
  ArrowRight,
  ArrowLeft,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const { login, validateLicenseKey, createAdminAccount } = useAuth();

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState("license"); // 'license', 'login', 'create-account'
  const [licenseValidated, setLicenseValidated] = useState(false);
  const [adminExists, setAdminExists] = useState(true);

  // Form data
  const [formData, setFormData] = useState({
    licenseKey: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearErrors = () => {
    setErrors({});
    setStatus(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateLicenseStep = () => {
    const newErrors = {};

    if (!formData.licenseKey.trim()) {
      newErrors.licenseKey = "License key is required";
    } else if (formData.licenseKey.length < 10) {
      newErrors.licenseKey = "Invalid license key format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginStep = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCreateAccountStep = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLicenseValidation = async (e) => {
    e.preventDefault();

    if (!validateLicenseStep()) return;

    setIsSubmitting(true);
    clearErrors();

    try {
      const result = await validateLicenseKey(formData.licenseKey);

      if (result.success) {
        setLicenseValidated(true);
        setAdminExists(false); // No admin exists, can create account
        setStatus({
          type: "success",
          message:
            "License key validated successfully! You can now create your admin account.",
        });

        // Move to create account step since no admin exists
        setTimeout(() => {
          setCurrentStep("create-account");
          clearErrors();
        }, 1500);
      } else {
        // Check if admin already exists
        if (
          result.error.includes("Admin already exists") ||
          result.error.includes("ADMIN_EXISTS")
        ) {
          setAdminExists(true);
          setLicenseValidated(true);
          setCurrentStep("login");
          setStatus({
            type: "info",
            message:
              "Admin account already exists. Please login with your credentials.",
          });
        } else {
          setStatus({
            type: "error",
            message: result.error,
          });
        }
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLoginStep()) return;

    setIsSubmitting(true);
    clearErrors();

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Login successful! Redirecting to dashboard...",
        });

        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1500);
      } else {
        setStatus({
          type: "error",
          message: result.error,
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (!validateCreateAccountStep()) return;

    setIsSubmitting(true);
    clearErrors();

    try {
      const accountData = {
        licenseKey: formData.licenseKey,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const result = await createAdminAccount(accountData);

      if (result.success) {
        setStatus({
          type: "success",
          message:
            "Admin account created successfully! Redirecting to dashboard...",
        });

        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1500);
      } else {
        setStatus({
          type: "error",
          message: result.error,
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBackToLicense = () => {
    setCurrentStep("license");
    setLicenseValidated(false);
    clearErrors();
  };

  const switchToCreateAccount = () => {
    setCurrentStep("create-account");
    clearErrors();
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
            {currentStep === "license" && (
              <Key className="w-8 h-8 text-white" />
            )}
            {currentStep === "login" && (
              <Shield className="w-8 h-8 text-white" />
            )}
            {currentStep === "create-account" && (
              <UserPlus className="w-8 h-8 text-white" />
            )}
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {currentStep === "license" && "License Validation"}
            {currentStep === "login" && "Admin Login"}
            {currentStep === "create-account" && "Create Admin Account"}
          </h1>
          <p className="text-coffee-300">
            {currentStep === "license" && "Enter your license key to continue"}
            {currentStep === "login" && "Login to admin dashboard"}
            {currentStep === "create-account" && "Setup your admin account"}
          </p>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          {/* Status Message */}
          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-lg border flex items-center space-x-3 mb-6 ${
                  status.type === "success"
                    ? "bg-green-500/20 border-green-500/30 text-green-300"
                    : status.type === "info"
                    ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
                    : "bg-red-500/20 border-red-500/30 text-red-300"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm">{status.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* License Validation Step */}
          {currentStep === "license" && (
            <form onSubmit={handleLicenseValidation} className="space-y-6">
              <div>
                <label
                  htmlFor="licenseKey"
                  className="block text-white font-medium mb-2"
                >
                  License Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-coffee-400" />
                  </div>
                  <input
                    type="text"
                    id="licenseKey"
                    name="licenseKey"
                    value={formData.licenseKey}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                      errors.licenseKey ? "border-red-500" : "border-white/30"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="Enter your license key"
                  />
                </div>
                {errors.licenseKey && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.licenseKey}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed opacity-50"
                    : "bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Validating...</span>
                  </>
                ) : (
                  <>
                    <span>Validate License</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          )}

          {/* Login Step */}
          {currentStep === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-coffee-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                      errors.email ? "border-red-500" : "border-white/30"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="Enter admin email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

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
                    disabled={isSubmitting}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                      errors.password ? "border-red-500" : "border-white/30"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
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

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={goBackToLicense}
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold text-coffee-300 border border-coffee-400 hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed opacity-50"
                      : "bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Login</span>
                    </>
                  )}
                </motion.button>
              </div>

              {!adminExists && licenseValidated && (
                <div className="text-center pt-4 border-t border-white/20">
                  <p className="text-coffee-300 text-sm mb-2">
                    Need to create an admin account?
                  </p>
                  <button
                    type="button"
                    onClick={switchToCreateAccount}
                    disabled={isSubmitting}
                    className="text-coffee-400 hover:text-white underline text-sm"
                  >
                    Create Admin Account
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Create Account Step - Only show if no admin exists and license is validated */}
          {currentStep === "create-account" &&
            !adminExists &&
            licenseValidated && (
              <form onSubmit={handleCreateAccount} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-white font-medium mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`block w-full px-3 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                        errors.firstName ? "border-red-500" : "border-white/30"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-white font-medium mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`block w-full px-3 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                        errors.lastName ? "border-red-500" : "border-white/30"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-coffee-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                        errors.email ? "border-red-500" : "border-white/30"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="Enter email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

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
                      disabled={isSubmitting}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                        errors.password ? "border-red-500" : "border-white/30"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="Create password (min. 8 characters)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
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
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-white font-medium mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-coffee-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className={`block w-full pl-10 pr-12 py-3 border rounded-lg bg-white/10 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-white/30"
                      } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isSubmitting}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-coffee-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={goBackToLicense}
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 rounded-lg font-semibold text-coffee-300 border border-coffee-400 hover:bg-white/10 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed opacity-50"
                        : "bg-coffee-600 hover:bg-coffee-700 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Create Account</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
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
          <p className="text-coffee-500 text-xs mt-1">
            🔒 Secure license-based authentication
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
