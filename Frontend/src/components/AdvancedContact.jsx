import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
} from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import AdvancedParticles from "./AdvancedParticles";
import { StretchableH2, StretchableH3, StretchableSpan } from "./StretchableText";

const AdvancedContact = () => {
  const [ref, isInView] = useScrollAnimation(0.2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    visitDate: "",
    partySize: "1",
    preferences: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("contact");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceToggle = (preference) => {
    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter((p) => p !== preference)
        : [...prev.preferences, preference],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Café",
      details: ["123 Coffee Street", "Downtown District", "City, State 12345"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["(555) 123-CAFE", "(555) 123-2233", "Mon-Fri: 6AM-8PM"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "hello@cafeelite.com",
        "events@cafeelite.com",
        "catering@cafeelite.com",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      details: [
        "Mon-Fri: 6:00 AM - 9:00 PM",
        "Sat-Sun: 7:00 AM - 10:00 PM",
        "Holidays: 8:00 AM - 6:00 PM",
      ],
      color: "from-orange-500 to-orange-600",
    },
  ];

  const preferences = [
    "Window Seating",
    "Quiet Area",
    "WiFi Area",
    "Pet-Friendly",
    "Wheelchair Accessible",
    "Private Event Space",
  ];

  const tabs = [
    { id: "contact", label: "Contact Us", icon: Mail },
    { id: "reservation", label: "Make Reservation", icon: Calendar },
    { id: "events", label: "Private Events", icon: Star },
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 text-white relative overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <AdvancedParticles
        count={40}
        type="mixed"
        className="opacity-10"
        color="cream"
        size={4}
      />

      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-cream-400/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-coffee-400/10 rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-cream-300 font-semibold text-lg tracking-wider uppercase mb-4 block">
            Get In Touch
          </span>
          <StretchableH2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            animationType="stretch"
            intensity="high"
          >
            Let's Connect Over
            <StretchableSpan className="block gradient-text bg-gradient-to-r from-cream-200 to-yellow-200 bg-clip-text text-transparent" animationType="glow" intensity="high">
              Great Coffee
            </StretchableSpan>
          </StretchableH2>
          <p className="text-xl text-cream-200 max-w-3xl mx-auto leading-relaxed">
            Whether you want to make a reservation, plan an event, or just say
            hello, we'd love to hear from you. Your perfect coffee experience is
            just a message away.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex gap-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === id
                    ? "bg-white text-coffee-800 shadow-lg"
                    : "text-white hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                {label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-1"
          >
            <h3 className="font-display text-2xl font-bold mb-8">
              Visit Our Café
            </h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`bg-gradient-to-r ${info.color} p-3 rounded-xl flex-shrink-0`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-cream-200 text-sm mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Interactive Map Placeholder */}
            <motion.div
              variants={itemVariants}
              className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-48 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-cream-300 mx-auto mb-4" />
                <p className="text-cream-200">Interactive Map</p>
                <p className="text-cream-300 text-sm">
                  Click to view directions
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <AnimatePresence mode="wait">
                <motion.form
                  key={activeTab}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-cream-200 font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-cream-300 focus:outline-none focus:border-cream-300 focus:bg-white/30 transition-all duration-300"
                        placeholder="Your full name"
                        required
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-cream-200 font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-cream-300 focus:outline-none focus:border-cream-300 focus:bg-white/30 transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="block text-cream-200 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-cream-300 focus:outline-none focus:border-cream-300 focus:bg-white/30 transition-all duration-300"
                        placeholder="(555) 123-4567"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-cream-200 font-medium mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:border-cream-300 focus:bg-white/30 transition-all duration-300"
                      >
                        <option value="" className="text-coffee-800">
                          Select a subject
                        </option>
                        <option value="general" className="text-coffee-800">
                          General Inquiry
                        </option>
                        <option value="reservation" className="text-coffee-800">
                          Table Reservation
                        </option>
                        <option value="event" className="text-coffee-800">
                          Private Event
                        </option>
                        <option value="catering" className="text-coffee-800">
                          Catering Service
                        </option>
                        <option value="feedback" className="text-coffee-800">
                          Feedback
                        </option>
                      </select>
                    </motion.div>
                  </div>

                  {/* Reservation Specific Fields */}
                  {(activeTab === "reservation" || activeTab === "events") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div>
                        <label className="block text-cream-200 font-medium mb-2">
                          {activeTab === "events" ? "Event Date" : "Visit Date"}
                        </label>
                        <input
                          type="datetime-local"
                          name="visitDate"
                          value={formData.visitDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:border-cream-300 focus:bg-white/30 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-cream-200 font-medium mb-2">
                          {activeTab === "events"
                            ? "Expected Guests"
                            : "Party Size"}
                        </label>
                        <select
                          name="partySize"
                          value={formData.partySize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:border-cream-300 focus:bg-white/30 transition-all duration-300"
                        >
                          {[...Array(20)].map((_, i) => (
                            <option
                              key={i + 1}
                              value={i + 1}
                              className="text-coffee-800"
                            >
                              {i + 1}{" "}
                              {activeTab === "events" ? "guests" : "people"}
                            </option>
                          ))}
                          <option value="20+" className="text-coffee-800">
                            20+ {activeTab === "events" ? "guests" : "people"}
                          </option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Preferences */}
                  {(activeTab === "reservation" || activeTab === "events") && (
                    <motion.div
                      variants={itemVariants}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-cream-200 font-medium mb-3">
                        Preferences
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {preferences.map((preference) => (
                          <motion.button
                            key={preference}
                            type="button"
                            onClick={() => handlePreferenceToggle(preference)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                              formData.preferences.includes(preference)
                                ? "bg-cream-400 text-coffee-800"
                                : "bg-white/20 text-cream-200 hover:bg-white/30"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {preference}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Message */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-cream-200 font-medium mb-2">
                      {activeTab === "events" ? "Event Details" : "Message"} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-cream-300 focus:outline-none focus:border-cream-300 focus:bg-white/30 transition-all duration-300 resize-none"
                      placeholder={
                        activeTab === "events"
                          ? "Describe your event requirements, theme, special requests..."
                          : "Tell us how we can help you..."
                      }
                      required
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    className="flex justify-center"
                    variants={itemVariants}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-cream-300 to-cream-400 text-coffee-800 px-8 py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 min-w-[200px] justify-center"
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-coffee-800 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          {activeTab === "reservation"
                            ? "Make Reservation"
                            : activeTab === "events"
                            ? "Request Event Quote"
                            : "Send Message"}
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              </AnimatePresence>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
                      submitStatus === "success"
                        ? "bg-green-500/20 border border-green-500/30 text-green-300"
                        : "bg-red-500/20 border border-red-500/30 text-red-300"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>
                          Your message has been sent successfully! We'll get
                          back to you soon.
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        <span>
                          Something went wrong. Please try again later.
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-cream-200 text-lg mb-6">
            Can't wait to connect? Give us a call right now!
          </p>
          <motion.a
            href="tel:+15551234567"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-cream-300 to-cream-400 text-coffee-800 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-5 h-5" />
            (555) 123-CAFE
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvancedContact;
