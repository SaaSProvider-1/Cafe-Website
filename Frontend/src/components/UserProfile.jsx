import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Heart,
  ShoppingBag,
  CreditCard,
  MapPin,
  Bell,
  Edit3,
  Camera,
  Award,
  Coffee,
  Star,
  Calendar,
  Gift,
  LogOut,
  Shield,
} from "lucide-react";

const UserProfile = ({ user, onLogout, onClose }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@email.com",
    phone: user?.phone || "+1 (555) 123-4567",
    address: "123 Coffee Street, Bean City, BC 12345",
    bio: "Coffee enthusiast and latte art lover. Always exploring new flavors!",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const stats = [
    {
      label: "Orders Completed",
      value: "47",
      icon: Coffee,
      color: "from-amber-400 to-amber-600",
    },
    {
      label: "Loyalty Points",
      value: "2,340",
      icon: Award,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      label: "Favorite Drinks",
      value: "12",
      icon: Heart,
      color: "from-red-400 to-red-600",
    },
    {
      label: "Reviews Written",
      value: "8",
      icon: Star,
      color: "from-purple-400 to-purple-600",
    },
  ];

  const recentOrders = [
    {
      id: 1,
      date: "2024-01-15",
      items: "Cappuccino, Chocolate Croissant",
      total: "$12.50",
      status: "Completed",
    },
    {
      id: 2,
      date: "2024-01-12",
      items: "Latte, Blueberry Muffin",
      total: "$9.75",
      status: "Completed",
    },
    {
      id: 3,
      date: "2024-01-10",
      items: "Americano, Avocado Toast",
      total: "$8.25",
      status: "Completed",
    },
  ];

  const favoriteItems = [
    {
      id: 1,
      name: "Caramel Macchiato",
      category: "Hot Coffee",
      price: "$5.50",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Chocolate Croissant",
      category: "Pastry",
      price: "$3.25",
      image:
        "https://images.unsplash.com/photo-1555507036-ab794f0caa9c?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Vanilla Latte",
      category: "Hot Coffee",
      price: "$4.75",
      image:
        "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=100&h=100&fit=crop",
    },
  ];

  const renderProfileContent = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-coffee-400 via-amber-400 to-coffee-500 rounded-2xl"></div>
        <div className="absolute -bottom-12 left-6 flex items-end space-x-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white">
              {profileData.firstName[0]}
              {profileData.lastName[0]}
            </div>
            {isEditing && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-1 -right-1 p-2 bg-coffee-600 text-white rounded-full shadow-lg"
              >
                <Camera size={16} />
              </motion.button>
            )}
          </div>
        </div>
        <div className="pt-16 px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-coffee-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-coffee-600">Coffee Enthusiast</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-coffee-600 text-white rounded-lg flex items-center space-x-2 shadow-lg"
            >
              <Edit3 size={16} />
              <span>{isEditing ? "Save" : "Edit"}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-4 shadow-lg border border-coffee-100"
          >
            <div
              className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-3`}
            >
              <stat.icon size={20} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-coffee-900">
              {stat.value}
            </div>
            <div className="text-sm text-coffee-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-coffee-100">
        <h3 className="text-xl font-semibold text-coffee-900 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-50"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-coffee-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              value={profileData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 disabled:bg-gray-50 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-coffee-900">Order History</h3>
        <div className="flex space-x-2">
          <select className="px-3 py-2 border border-coffee-200 rounded-lg focus:ring-2 focus:ring-coffee-500 text-sm">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {recentOrders.map((order) => (
          <motion.div
            key={order.id}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-coffee-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Calendar className="text-coffee-600" size={20} />
                <div>
                  <div className="font-semibold text-coffee-900">
                    Order #{order.id}
                  </div>
                  <div className="text-sm text-coffee-600">{order.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-coffee-900">
                  {order.total}
                </div>
                <div className="text-sm text-green-600">{order.status}</div>
              </div>
            </div>
            <div className="text-coffee-700">{order.items}</div>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="px-4 py-2 text-coffee-600 hover:bg-coffee-50 rounded-lg transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors">
                Reorder
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderFavoritesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-coffee-900">
          Your Favorites
        </h3>
        <button className="text-coffee-600 hover:text-coffee-800 font-medium">
          Manage Favorites
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-xl p-4 shadow-lg border border-coffee-100"
          >
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-coffee-900">{item.name}</h4>
                <p className="text-sm text-coffee-600">{item.category}</p>
              </div>
              <div className="text-coffee-700 font-semibold">{item.price}</div>
            </div>
            <button className="w-full bg-coffee-600 text-white py-2 rounded-lg hover:bg-coffee-700 transition-colors">
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-coffee-900">
        Account Settings
      </h3>

      <div className="space-y-4">
        {[
          {
            icon: Bell,
            title: "Notifications",
            desc: "Manage your notification preferences",
          },
          {
            icon: Shield,
            title: "Privacy & Security",
            desc: "Control your privacy settings",
          },
          {
            icon: CreditCard,
            title: "Payment Methods",
            desc: "Manage your payment options",
          },
          {
            icon: MapPin,
            title: "Addresses",
            desc: "Manage delivery addresses",
          },
          {
            icon: Gift,
            title: "Loyalty Program",
            desc: "View your rewards and benefits",
          },
        ].map((setting, index) => (
          <motion.div
            key={setting.title}
            whileHover={{ scale: 1.01 }}
            className="bg-white rounded-xl p-4 shadow-lg border border-coffee-100 flex items-center space-x-4 cursor-pointer"
          >
            <div className="p-3 bg-coffee-100 rounded-lg">
              <setting.icon className="text-coffee-600" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-coffee-900">{setting.title}</h4>
              <p className="text-sm text-coffee-600">{setting.desc}</p>
            </div>
            <div className="text-coffee-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.01 }}
          onClick={onLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 border border-red-200"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileContent();
      case "orders":
        return renderOrdersContent();
      case "favorites":
        return renderFavoritesContent();
      case "settings":
        return renderSettingsContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-cream-50 to-amber-50 rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-coffee-200 p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-coffee-600 rounded-lg">
                <Coffee className="text-white" size={24} />
              </div>
              <div>
                <h2 className="font-bold text-coffee-900">My Account</h2>
                <p className="text-sm text-coffee-600">Café Elite</p>
              </div>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-coffee-600 text-white shadow-lg"
                      : "text-coffee-700 hover:bg-coffee-50"
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">{renderContent()}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
