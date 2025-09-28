import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee, User, LogIn, UserPlus } from "lucide-react";
import UserProfile from "./UserProfile";

const Navigation = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [user, setUser] = useState(null); // null when not logged in

  // Mock user data - replace with real authentication
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowUserProfile(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-coffee-200/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            <div className="relative">
              <Coffee
                className={`h-8 w-8 ${
                  isScrolled ? "text-coffee-600" : "text-white"
                } transition-colors duration-300`}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 bg-gradient-to-r from-coffee-400 to-coffee-600 rounded-full opacity-20"
              />
            </div>
            <span
              className={`font-display font-bold text-2xl ${
                isScrolled ? "text-coffee-900" : "text-white"
              } transition-colors duration-300`}
            >
              Café Elite
            </span>
          </motion.div>

          {/* Desktop Navigation & Auth */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "text-coffee-700 hover:text-coffee-900"
                      : "text-white hover:text-cream-200"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Authentication Section */}
            <div className="flex items-center space-x-3">
              {user ? (
                // User is logged in
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm font-medium ${
                      isScrolled ? "text-coffee-700" : "text-white"
                    }`}
                  >
                    Welcome, {user.firstName}!
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserProfile(true)}
                    className="p-2 bg-coffee-600 hover:bg-coffee-700 text-white rounded-full shadow-lg transition-colors"
                  >
                    <User size={20} />
                  </motion.button>
                </div>
              ) : (
                // User is not logged in
                <>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                        isScrolled
                          ? "text-coffee-700 hover:bg-coffee-50 border border-coffee-200"
                          : "text-white hover:bg-white/10 border border-white/20"
                      }`}
                    >
                      <LogIn size={16} />
                      <span>Sign In</span>
                    </motion.button>
                  </Link>

                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-coffee-600 hover:bg-coffee-700 text-white rounded-full font-medium shadow-lg transition-colors flex items-center space-x-2"
                    >
                      <UserPlus size={16} />
                      <span>Sign Up</span>
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled
                ? "text-coffee-700 hover:bg-coffee-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-coffee-200/30"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-coffee-700 hover:text-coffee-900 font-medium py-3 px-4 rounded-xl hover:bg-coffee-50 transition-colors duration-200"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Authentication Section */}
              <div className="pt-4 border-t border-coffee-200">
                {user ? (
                  // Mobile User Menu
                  <div className="space-y-3">
                    <div className="px-4 py-3 bg-coffee-50 rounded-xl">
                      <p className="font-semibold text-coffee-900">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm text-coffee-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowUserProfile(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-coffee-700 hover:bg-coffee-50 rounded-xl font-medium transition-colors flex items-center space-x-2"
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  // Mobile Auth Buttons
                  <div className="space-y-3">
                    <Link to="/login" className="block">
                      <button className="w-full px-4 py-3 border-2 border-coffee-600 text-coffee-600 rounded-xl font-semibold hover:bg-coffee-50 transition-colors flex items-center justify-center space-x-2">
                        <LogIn size={18} />
                        <span>Sign In</span>
                      </button>
                    </Link>
                    <Link to="/signup" className="block">
                      <button className="w-full px-4 py-3 bg-coffee-600 text-white rounded-xl font-semibold hover:bg-coffee-700 transition-colors flex items-center justify-center space-x-2">
                        <UserPlus size={18} />
                        <span>Sign Up Free</span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {showUserProfile && user && (
          <UserProfile
            user={user}
            onLogout={handleLogout}
            onClose={() => setShowUserProfile(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
