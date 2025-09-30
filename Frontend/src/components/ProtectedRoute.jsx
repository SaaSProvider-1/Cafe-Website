import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-4">
            <Shield className="h-16 w-16 text-coffee-300 mx-auto animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Verifying Access
          </h2>
          <p className="text-coffee-300">
            Please wait while we check your credentials...
          </p>
          <div className="mt-6">
            <div className="inline-flex items-center space-x-2">
              <div className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-coffee-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, redirect to admin login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  // If user is authenticated but trying to access login page, redirect to dashboard
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Access denied page for unauthorized access attempts
  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mb-6">
            <Lock className="h-20 w-20 text-red-300 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-red-200 mb-6">
            You need to be authenticated as an administrator to access this
            area.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => (window.location.href = "/admin")}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Go to Admin Login
            </button>
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-transparent border-2 border-red-400 text-red-300 hover:bg-red-400 hover:text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;
