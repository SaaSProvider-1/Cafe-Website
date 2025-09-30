import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Coffee,
  Key,
  User,
  CheckCircle,
  ArrowRight,
  UserPlus,
} from "lucide-react";

const AdminLogin = () => {
  // Step states
  const [currentStep, setCurrentStep] = useState("license"); // 'license', 'create', 'login'
  const [validatedLicenseKey, setValidatedLicenseKey] = useState("");

  // License validation
  const [licenseKey, setLicenseKey] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [licenseValidating, setLicenseValidating] = useState(false);

  // Account creation
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  // Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const { login, validateLicenseKey, createAdminAccount, requestLicenseKey } =
    useAuth();
  const navigate = useNavigate();

  // Handle license key validation
  const handleLicenseValidation = async (e) => {
    e.preventDefault();
    setLicenseError("");
    setLicenseValidating(true);

    try {
      const result = await validateLicenseKey(licenseKey);

      if (result.success) {
        setValidatedLicenseKey(licenseKey);
        setCurrentStep("create");
      } else {
        if (result.error.includes("Admin already exists")) {
          // Admin exists, go to login
          setCurrentStep("login");
        } else {
          setLicenseError(result.error);
        }
      }
    } catch {
      setLicenseError("An unexpected error occurred. Please try again.");
    } finally {
      setLicenseValidating(false);
    }
  };

  // Handle admin account creation
  const handleAccountCreation = async (e) => {
    e.preventDefault();
    setCreateError("");
    setCreating(true);

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setCreateError("All fields are required.");
      setCreating(false);
      return;
    }

    if (password !== confirmPassword) {
      setCreateError("Passwords do not match.");
      setCreating(false);
      return;
    }

    if (password.length < 8) {
      setCreateError("Password must be at least 8 characters long.");
      setCreating(false);
      return;
    }

    try {
      const result = await createAdminAccount({
        licenseKey: validatedLicenseKey,
        firstName,
        lastName,
        email,
        password,
      });

      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setCreateError(result.error);
      }
    } catch {
      setCreateError("An unexpected error occurred. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const result = await login(loginEmail, loginPassword);

      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setLoginError(result.error);
      }
    } catch {
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  // Request new license key
  const handleRequestLicense = async () => {
    const email = prompt(
      "Enter your email address to receive a new license key:"
    );
    if (email) {
      try {
        const result = await requestLicenseKey(email);
        if (result.success) {
          alert("License key sent to your email address!");
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch {
        alert("Failed to send license key. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
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
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-coffee-300">
            {currentStep === "license" &&
              "Enter your license key to get started"}
            {currentStep === "create" && "Create your admin account"}
            {currentStep === "login" && "Sign in to your account"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep === "license"
                  ? "bg-coffee-600 text-white"
                  : currentStep === "create" || currentStep === "login"
                  ? "bg-green-600 text-white"
                  : "bg-gray-400 text-gray-600"
              }`}
            >
              {currentStep === "create" || currentStep === "login" ? (
                <CheckCircle size={16} />
              ) : (
                "1"
              )}
            </div>
            <div
              className={`w-8 h-1 ${
                currentStep === "create" ? "bg-coffee-600" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                currentStep === "create"
                  ? "bg-coffee-600 text-white"
                  : currentStep === "login"
                  ? "bg-coffee-600 text-white"
                  : "bg-gray-400 text-gray-600"
              }`}
            >
              {currentStep === "login" ? (
                <User size={16} />
              ) : currentStep === "create" ? (
                <UserPlus size={16} />
              ) : (
                "2"
              )}
            </div>
          </div>
        </div>

        {/* Form Container */}
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

          <AnimatePresence mode="wait">
            {/* Step 1: License Key Validation */}
            {currentStep === "license" && (
              <motion.div
                key="license"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleLicenseValidation} className="space-y-6">
                  <div className="text-center mb-6">
                    <Key className="w-12 h-12 text-coffee-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-coffee-900 mb-2">
                      License Key Required
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter your license key to proceed
                    </p>
                  </div>

                  {licenseError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-red-700 text-sm">
                        {licenseError}
                      </span>
                    </motion.div>
                  )}

                  <div>
                    <label
                      htmlFor="licenseKey"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      License Key
                    </label>
                    <input
                      id="licenseKey"
                      type="text"
                      required
                      value={licenseKey}
                      onChange={(e) =>
                        setLicenseKey(e.target.value.toUpperCase())
                      }
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500 transition-colors duration-200 font-mono text-center"
                      placeholder="CAFE-XXXX-XXXX-XXXX-XXXX"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={licenseValidating}
                    whileHover={{ scale: licenseValidating ? 1 : 1.02 }}
                    whileTap={{ scale: licenseValidating ? 1 : 0.98 }}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                      licenseValidating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-coffee-600 hover:bg-coffee-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {licenseValidating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Validating...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>Validate License Key</span>
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    )}
                  </motion.button>

                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={handleRequestLicense}
                      className="text-coffee-600 hover:text-coffee-700 text-sm font-medium"
                    >
                      Don't have a license key? Request one
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("login")}
                      className="text-coffee-600 hover:text-coffee-700 text-sm"
                    >
                      Already have an account? Sign in
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Create Admin Account */}
            {currentStep === "create" && (
              <motion.div
                key="create"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleAccountCreation} className="space-y-4">
                  <div className="text-center mb-6">
                    <UserPlus className="w-12 h-12 text-coffee-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-coffee-900 mb-2">
                      Create Admin Account
                    </h3>
                    <p className="text-sm text-gray-600">
                      License key validated successfully
                    </p>
                  </div>

                  {createError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-red-700 text-sm">
                        {createError}
                      </span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={creating}
                    whileHover={{ scale: creating ? 1 : 1.02 }}
                    whileTap={{ scale: creating ? 1 : 0.98 }}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                      creating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-coffee-600 hover:bg-coffee-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {creating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Admin Account"
                    )}
                  </motion.button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("license")}
                      className="text-coffee-600 hover:text-coffee-700 text-sm"
                    >
                      Back to license validation
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 3: Login */}
            {currentStep === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="text-center mb-6">
                    <Shield className="w-12 h-12 text-coffee-600 mx-auto mb-3" />
                    <h3 className="text-xl font-bold text-coffee-900 mb-2">
                      Admin Sign In
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter your credentials to access the admin panel
                    </p>
                  </div>

                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{loginError}</span>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                        placeholder="admin@cafeelite.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-coffee-500"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showLoginPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loggingIn}
                    whileHover={{ scale: loggingIn ? 1 : 1.02 }}
                    whileTap={{ scale: loggingIn ? 1 : 0.98 }}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                      loggingIn
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-coffee-600 hover:bg-coffee-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {loggingIn ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      "Sign In to Dashboard"
                    )}
                  </motion.button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("license")}
                      className="text-coffee-600 hover:text-coffee-700 text-sm"
                    >
                      Need a license key?
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-coffee-300 text-sm">
            © 2024 Café Elite. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
