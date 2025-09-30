import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Menu", href: "/menu" },
    { name: "QR Menu", href: "/#qr-menu" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("/#")) {
      // If we're not on home page, navigate to home first
      if (location.pathname !== "/") {
        window.location.href = href;
        return;
      }
      // If on home page, scroll to section
      const sectionId = href.substring(2);
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (item) => {
    if (item.href.startsWith("/#")) {
      scrollToSection(item.href);
    } else {
      setIsMobileMenuOpen(false);
    }
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
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="relative">
                <Coffee
                  className={`h-8 w-8 ${
                    isScrolled ? "text-coffee-600" : "text-white"
                  } transition-colors duration-300`}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.href.startsWith("/#") ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled
                        ? "text-coffee-700 hover:text-coffee-900"
                        : "text-white hover:text-cream-200"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`font-medium transition-all duration-300 hover:scale-105 ${
                      isScrolled
                        ? "text-coffee-700 hover:text-coffee-900"
                        : "text-white hover:text-cream-200"
                    } ${location.pathname === item.href ? "font-bold" : ""}`}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
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
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href.startsWith("/#") ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className="block w-full text-left text-coffee-700 hover:text-coffee-900 font-medium py-3 px-4 rounded-xl hover:bg-coffee-50 transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-left text-coffee-700 hover:text-coffee-900 font-medium py-3 px-4 rounded-xl hover:bg-coffee-50 transition-colors duration-200 ${
                        location.pathname === item.href
                          ? "bg-coffee-100 font-bold"
                          : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
