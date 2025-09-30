import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LogOut,
  User,
  Shield,
  Calendar,
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Coffee,
  Settings,
  Mail,
  Clock,
} from "lucide-react";

const AdminDashboard = () => {
  const { admin, logout, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data.data);
      } else {
        throw new Error("Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setError("Failed to load dashboard data");
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={fetchDashboardData}
            className="bg-coffee-600 hover:bg-coffee-700 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Coffee className="h-8 w-8 text-coffee-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Café Elite</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {admin?.firstName} {admin?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{admin?.email}</p>
                </div>
                <div className="h-8 w-8 bg-coffee-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {admin?.firstName}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your café today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.totalUsers || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {dashboardData?.stats?.totalOrders || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${dashboardData?.stats?.totalRevenue || 0}
                </p>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  System Status
                </p>
                <p className="text-lg font-bold text-green-600">Online</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Admin Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admin Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Admin Profile
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Name:</span>
                <span className="text-sm font-medium text-gray-900">
                  {admin?.firstName} {admin?.lastName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email:</span>
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {admin?.email}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Role:</span>
                <span className="text-sm font-medium text-coffee-600 bg-coffee-100 px-2 py-1 rounded">
                  {admin?.role}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Account Created:</span>
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(dashboardData?.stats?.accountCreated)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Login:</span>
                <span className="text-sm font-medium text-gray-900 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDate(admin?.lastLogin)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-4 bg-coffee-50 hover:bg-coffee-100 rounded-lg border border-coffee-200 transition-colors">
                <div className="text-center">
                  <Coffee className="h-6 w-6 text-coffee-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-coffee-800">
                    Manage Menu
                  </span>
                </div>
              </button>

              <button className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                <div className="text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-blue-800">
                    View Users
                  </span>
                </div>
              </button>

              <button className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                <div className="text-center">
                  <ShoppingCart className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-green-800">
                    Orders
                  </span>
                </div>
              </button>

              <button className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors">
                <div className="text-center">
                  <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-purple-800">
                    Analytics
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
