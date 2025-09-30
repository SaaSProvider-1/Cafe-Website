import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../utils/AuthContext";
import {
  FaUsers,
  FaChartLine,
  FaClipboardList,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaPlus,
  FaEye,
  FaDollarSign,
  FaCoffee,
} from "react-icons/fa";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const response_data = await response.json();
      setDashboardData(response_data.data);
    } catch (err) {
      setError(err.message);
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {change && (
            <p
              className={`text-sm ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change > 0 ? "+" : ""}
              {change}% from last month
            </p>
          )}
        </div>
        <Icon className="text-3xl text-gray-400" />
      </div>
    </motion.div>
  );

  const QuickActionButton = ({ icon: Icon, title, onClick, color }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${color} text-white px-6 py-3 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200`}
    >
      <Icon />
      <span>{title}</span>
    </motion.button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
        />
        <span className="ml-4 text-xl text-gray-700">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Café Elite Admin
              </h1>
              <p className="text-gray-600">
                Welcome back, {dashboardData?.admin?.name || "Admin"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FaBell className="text-xl" />
                  {dashboardData?.notifications?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {dashboardData.notifications.length}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50"
                    >
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-900">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {dashboardData?.notifications?.length > 0 ? (
                          dashboardData.notifications.map((notif, index) => (
                            <div
                              key={index}
                              className="p-3 border-b hover:bg-gray-50"
                            >
                              <p className="text-sm text-gray-800">
                                {notif.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notif.time}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No new notifications
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {dashboardData?.admin?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {dashboardData?.admin?.role || "Administrator"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: FaChartLine },
              { id: "users", label: "Users", icon: FaUsers },
              { id: "orders", label: "Orders", icon: FaClipboardList },
              { id: "settings", label: "Settings", icon: FaCog },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === id
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                }`}
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={FaUsers}
                title="Total Users"
                value={dashboardData?.stats?.totalUsers || 0}
                change={12}
                color="border-blue-500"
              />
              <StatCard
                icon={FaClipboardList}
                title="Total Orders"
                value={dashboardData?.stats?.totalOrders || 0}
                change={8}
                color="border-green-500"
              />
              <StatCard
                icon={FaEnvelope}
                title="Messages"
                value={dashboardData?.stats?.totalMessages || 0}
                change={-3}
                color="border-purple-500"
              />
              <StatCard
                icon={FaDollarSign}
                title="Revenue"
                value={`$${dashboardData?.stats?.totalRevenue || 0}`}
                change={15}
                color="border-amber-500"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionButton
                  icon={FaPlus}
                  title="Add Menu Item"
                  color="bg-green-500 hover:bg-green-600"
                  onClick={() => console.log("Add menu item")}
                />
                <QuickActionButton
                  icon={FaEye}
                  title="View Orders"
                  color="bg-blue-500 hover:bg-blue-600"
                  onClick={() => setActiveTab("orders")}
                />
                <QuickActionButton
                  icon={FaUsers}
                  title="Manage Users"
                  color="bg-purple-500 hover:bg-purple-600"
                  onClick={() => setActiveTab("users")}
                />
                <QuickActionButton
                  icon={FaCog}
                  title="Settings"
                  color="bg-gray-500 hover:bg-gray-600"
                  onClick={() => setActiveTab("settings")}
                />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {dashboardData?.recentActivity?.length > 0 ? (
                  dashboardData.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="text-gray-800">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.type === "order"
                            ? "bg-green-100 text-green-800"
                            : activity.type === "user"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {activity.type}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No recent activity
                  </p>
                )}
              </div>
            </div>

            {/* Admin Info Card */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Admin Account Information
                  </h3>
                  <div className="space-y-1 text-amber-100">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {dashboardData?.admin?.email || "admin@example.com"}
                    </p>
                    <p>
                      <span className="font-medium">Role:</span>{" "}
                      {dashboardData?.admin?.role || "Administrator"}
                    </p>
                    <p>
                      <span className="font-medium">License Key:</span>{" "}
                      {dashboardData?.admin?.licenseKey || "Not available"}
                    </p>
                    <p>
                      <span className="font-medium">Last Login:</span>{" "}
                      {dashboardData?.admin?.lastLogin || "Never"}
                    </p>
                  </div>
                </div>
                <div className="text-6xl opacity-20">
                  <FaCoffee />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                User Management
              </h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="text-center py-12 text-gray-500">
              <FaUsers className="text-4xl mx-auto mb-4" />
              <p>User management functionality coming soon</p>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Order Management
              </h3>
              <button
                onClick={fetchDashboardData}
                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors flex items-center space-x-2"
              >
                <FaRefresh />
                <span>Refresh</span>
              </button>
            </div>

            {dashboardData?.recentActivity?.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Recent Orders
                </h4>
                {dashboardData.recentActivity
                  .filter((activity) => activity.type === "order")
                  .map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {activity.description}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                          View
                        </button>
                        <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                          Update Status
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FaClipboardList className="text-4xl mx-auto mb-4" />
                <p>
                  No orders yet. Orders will appear here when customers place
                  them.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                System Settings
              </h3>
              <div className="text-center py-12 text-gray-500">
                <FaCog className="text-4xl mx-auto mb-4" />
                <p>Settings panel coming soon</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
