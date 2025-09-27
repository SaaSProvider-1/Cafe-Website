import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Coffee,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Send,
  Star,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const footerLinks = [
    {
      title: "Menu",
      links: [
        { name: "Coffee", href: "#menu" },
        { name: "Espresso", href: "#menu" },
        { name: "Cold Brew", href: "#menu" },
        { name: "Pastries", href: "#menu" },
        { name: "Seasonal", href: "#menu" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "Our Story", href: "#about" },
        { name: "Team", href: "#about" },
        { name: "Sustainability", href: "#about" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "#contact" },
        { name: "FAQ", href: "#" },
        { name: "Orders", href: "#" },
        { name: "Loyalty Program", href: "#" },
        { name: "Gift Cards", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { icon: Youtube, href: "#", color: "hover:text-red-400" },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-coffee-900 via-coffee-950 to-black text-white relative overflow-hidden">
      {/* Advanced Background Pattern with Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        />
        
        {/* Animated Coffee Bean Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-3 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-2 bg-amber-800 rounded-full" />
          </motion.div>
        ))}

        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cream-400/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-l from-coffee-600/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Coffee className="h-10 w-10 text-cream-400" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-cream-400 rounded-full opacity-20"
                />
              </motion.div>
              <h3 className="font-display font-bold text-3xl text-white">
                Café Elite
              </h3>
            </div>

            <p className="text-coffee-200 text-lg leading-relaxed max-w-md">
              Crafting exceptional coffee experiences since 2015. Where passion
              meets perfection in every cup.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-coffee-200">
                <MapPin size={18} className="text-cream-400 flex-shrink-0" />
                <span>123 Coffee Street, Brew City, BC 12345</span>
              </div>
              <div className="flex items-center space-x-3 text-coffee-200">
                <Phone size={18} className="text-cream-400 flex-shrink-0" />
                <span>+1 (555) 123-CAFE</span>
              </div>
              <div className="flex items-center space-x-3 text-coffee-200">
                <Mail size={18} className="text-cream-400 flex-shrink-0" />
                <span>hello@cafeelite.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 bg-coffee-800 hover:bg-coffee-700 rounded-full flex items-center justify-center text-coffee-200 ${social.color} transition-all duration-300`}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-display font-bold text-xl text-white mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => scrollToSection(link.href)}
                        className="text-coffee-200 hover:text-cream-400 transition-colors duration-300 cursor-pointer text-left"
                      >
                        {link.name}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Newsletter Signup - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-coffee-800 pt-12 mb-12 relative"
        >
          {/* Newsletter Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream-400/5 to-transparent rounded-lg" />
          
          <div className="text-center max-w-2xl mx-auto relative z-10">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-cream-400 to-cream-600 rounded-full flex items-center justify-center mx-auto">
                <Mail className="text-coffee-900" size={24} />
              </div>
            </motion.div>
            
            <h4 className="font-display text-2xl font-bold text-white mb-4">
              Stay Updated with Our Latest Blends
            </h4>
            <p className="text-coffee-200 mb-8">
              Get exclusive access to new products, special offers, and coffee
              brewing tips.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-3 rounded-full bg-coffee-800/80 backdrop-blur border border-coffee-700 text-white placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent transition-all duration-300"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cream-500 to-cream-600 hover:from-cream-400 hover:to-cream-500 text-coffee-900 px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Subscribe</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Send size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                </motion.div>
              </motion.button>
            </form>
            
            {/* Success Message */}
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg backdrop-blur"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Star className="text-green-400" size={20} />
                  <span className="text-green-300">Thanks for subscribing! ☕</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Bottom Bar - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-coffee-800 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-coffee-200 mb-4 md:mb-0">
            <span>&copy; 2024 Café Elite. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-2 text-coffee-200">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart size={16} className="text-red-400 fill-current" />
            </motion.div>
            <span>and lots of coffee</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cream-500 to-cream-600 hover:from-cream-400 hover:to-cream-500 text-coffee-900 rounded-full shadow-xl z-50 flex items-center justify-center group"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.div>
      </motion.button>

      {/* Enhanced Floating Coffee Steam */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-12 bg-gradient-to-t from-cream-400/30 to-transparent rounded-full"
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.8, 0.2],
            x: [0, Math.sin(i) * 8, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
          style={{
            bottom: `${10 + Math.random() * 20}%`,
            left: `${10 + i * 10}%`,
          }}
        />
      ))}

      {/* Sparkling Stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-cream-300 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </footer>
  );
};

export default Footer;
