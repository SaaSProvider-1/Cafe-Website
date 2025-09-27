import React, { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { MapPin, Phone, Mail, Clock, Send, Coffee } from "lucide-react";
import { LottieExample } from "./LottieWrapper";
import { StretchableH2, StretchableH3, StretchableH4, StretchableSpan } from "./StretchableText";

const Contact = () => {
  const [ref, isInView] = useScrollAnimation(0.1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Coffee Street", "Brew City, BC 12345"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-CAFE", "+1 (555) 123-2233"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@cafeelite.com", "orders@cafeelite.com"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Clock,
      title: "Open Hours",
      details: ["Mon-Fri: 6:00 AM - 9:00 PM", "Sat-Sun: 7:00 AM - 10:00 PM"],
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-b from-cream-50 to-coffee-100 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coffee-200 rounded-full translate-x-48 -translate-y-48 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cream-300 rounded-full -translate-x-32 translate-y-32 opacity-30"></div>

      {/* Floating Coffee Beans */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-coffee-600 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(i) * 10, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${10 + i * 10}%`,
            top: `${20 + i * 8}%`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-coffee-600 font-semibold text-lg tracking-wider uppercase mb-4 block">
            Get In Touch
          </span>
          <StretchableH2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-coffee-900 mb-6"
            animationType="stretch"
            intensity="high"
          >
            Let's Start a
            <StretchableSpan className="block gradient-text" animationType="glow" intensity="high">Conversation</StretchableSpan>
          </StretchableH2>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}
                  >
                    <info.icon size={24} />
                  </div>
                  <div>
                    <StretchableH3 className="font-display text-xl font-bold text-coffee-900 mb-2" animationType="rubber" intensity="medium">
                      {info.title}
                    </StretchableH3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-coffee-700">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="h-64 bg-coffee-200 rounded-2xl overflow-hidden shadow-lg relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-coffee-500/20 to-coffee-700/20 flex items-center justify-center">
                <div className="text-center text-coffee-800">
                  <MapPin size={48} className="mx-auto mb-4" />
                  <StretchableH3 className="font-display text-xl font-bold mb-2" animationType="wave" intensity="high">
                    Find Us
                  </StretchableH3>
                  <p>Click to view interactive map</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-coffee-500 to-coffee-600 rounded-xl flex items-center justify-center">
                <Coffee className="text-white" size={20} />
              </div>
              <StretchableH3 className="font-display text-2xl font-bold text-coffee-900" animationType="bounce" intensity="medium">
                Send us a message
              </StretchableH3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-coffee-700 font-semibold mb-2">
                    Your Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-coffee-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all duration-300 bg-white/80"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-coffee-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-coffee-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all duration-300 bg-white/80"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-coffee-700 font-semibold mb-2">
                  Subject
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-coffee-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all duration-300 bg-white/80"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-coffee-700 font-semibold mb-2">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-coffee-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all duration-300 resize-none bg-white/80"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-coffee-600 to-coffee-700 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:from-coffee-700 hover:to-coffee-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Send size={20} />
                <span>Send Message</span>
              </motion.button>
            </form>

            {/* Quick Contact Options */}
            <div className="mt-8 pt-8 border-t border-coffee-200">
              <p className="text-coffee-600 text-center mb-4">
                Prefer to reach us directly?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300"
                >
                  <Phone size={16} />
                  <span>Call Now</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300"
                >
                  <Mail size={16} />
                  <span>Email Us</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-coffee-800 to-coffee-900 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=400&fit=crop&auto=format')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10">
              <StretchableH3 className="font-display text-3xl md:text-4xl font-bold mb-4" animationType="pulse" intensity="high">
                Stay Caffeinated with Updates
              </StretchableH3>
              <p className="text-xl text-coffee-100 mb-8 max-w-2xl mx-auto">
                Get the latest news about new blends, special events, and
                exclusive offers delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-full text-coffee-900 focus:outline-none focus:ring-2 focus:ring-coffee-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-coffee-500 hover:bg-coffee-400 px-8 py-3 rounded-full font-semibold transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
