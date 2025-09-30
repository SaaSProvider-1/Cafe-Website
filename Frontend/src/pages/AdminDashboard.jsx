import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  Users,
  ShoppingBag,
  TrendingUp,
  Settings,
  Bell,
  Calendar,
  DollarSign,
  Coffee,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const { adminUser, logout, refreshSession } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 245,
    totalRevenue: 12850,
    activeCustomers: 89,
    menuItems: 24,
    recentOrders: [
      {
        id: 1,
        customer: "John Doe",
        items: "Espresso, Croissant",
        total: 8.5,
        time: "2 min ago",
      },
      {
        id: 2,
        customer: "Jane Smith",
        items: "Latte, Muffin",
        total: 12.0,
        time: "5 min ago",
      },
      {
        id: 3,
        customer: "Mike Johnson",
        items: "Cappuccino",
        total: 6.5,
        time: "8 min ago",
      },
      {
        id: 4,
        customer: "Sarah Wilson",
        items: "Americano, Sandwich",
        total: 15.0,
        time: "12 min ago",
      },
    ],
    popularItems: [
      { name: "Espresso", orders: 45, change: "+12%" },
      { name: "Latte", orders: 38, change: "+8%" },
      { name: "Cappuccino", orders: 32, change: "+15%" },
      { name: "Americano", orders: 28, change: "+5%" },
    ],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      window.location.href = "/";
    }
  };

  const handleRefreshSession = () => {
    refreshSession();
    // Show success message
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50";
    notification.textContent = "Session refreshed successfully!";
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const stats = [
    {
      title: "Total Orders",
      value: dashboardData.totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Revenue",
      value: `$${dashboardData.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
      change: "+18%",
    },
    {
      title: "Active Customers",
      value: dashboardData.activeCustomers,
      icon: Users,
      color: "bg-purple-500",
      change: "+5%",
    },
    {
      title: "Menu Items",
      value: dashboardData.menuItems,
      icon: Coffee,
      color: "bg-orange-500",
      change: "+2%",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Coffee className="h-8 w-8 text-coffee-600" />
                <h1 className="text-xl font-bold text-gray-900">
                  Café Elite Admin
                </h1>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              {/* Current Time */}
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleTimeString()}
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>

              {/* Refresh Session */}
              <button
                onClick={handleRefreshSession}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                title="Refresh Session"
              >
                <RefreshCw className="h-5 w-5" />
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {adminUser?.username}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="h-8 w-8 bg-coffee-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {adminUser?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {adminUser?.username}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening at Café Elite today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <span className="ml-2 text-sm font-medium text-green-600">
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-600">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${order.total}
                      </p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-coffee-600 text-white py-2 px-4 rounded-lg hover:bg-coffee-700 transition-colors">
                View All Orders
              </button>
            </div>
          </motion.div>

          {/* Popular Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Popular Items
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.popularItems.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-coffee-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-coffee-600 font-semibold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {item.orders} orders
                      </p>
                      <p className="text-sm text-green-600">{item.change}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-coffee-600 text-white py-2 px-4 rounded-lg hover:bg-coffee-700 transition-colors">
                Manage Menu
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Manage Orders",
                icon: ShoppingBag,
                color: "bg-blue-500",
              },
              {
                title: "View Analytics",
                icon: TrendingUp,
                color: "bg-green-500",
              },
              { title: "Settings", icon: Settings, color: "bg-purple-500" },
            ].map((action, index) => (
              <button
                key={action.title}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className={`${action.color} rounded-lg p-3 mr-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium text-gray-900">
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
