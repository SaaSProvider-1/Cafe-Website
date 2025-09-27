import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react";
import { StretchableH2, StretchableH3, StretchableSpan } from "./StretchableText";

const AdvancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Coffee Enthusiast",
      location: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&auto=format",
      rating: 5,
      date: "2 days ago",
      content:
        "The most incredible coffee experience I've ever had! The attention to detail in every cup is extraordinary. The baristas here are true artists.",
      experience: "Visited 15+ times",
      favoriteOrder: "Lavender Honey Latte",
      tags: ["Quality", "Atmosphere", "Service"],
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Local Business Owner",
      location: "Downtown",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format",
      rating: 5,
      date: "1 week ago",
      content:
        "I bring all my clients here. The ambiance is perfect for business meetings, and the coffee quality is consistently outstanding. Highly recommended!",
      experience: "Regular customer",
      favoriteOrder: "Ethiopian Single Origin",
      tags: ["Business", "Consistency", "Ambiance"],
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Food Blogger",
      location: "Los Angeles, CA",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&auto=format",
      rating: 5,
      date: "3 days ago",
      content:
        "As a food blogger, I've tried countless cafés, but this place stands out. The innovative flavors and presentation are Instagram-worthy and delicious!",
      experience: "Featured in blog",
      favoriteOrder: "Rose Gold Macchiato",
      tags: ["Innovation", "Presentation", "Flavors"],
    },
    {
      id: 4,
      name: "David Park",
      role: "Remote Worker",
      location: "Seattle, WA",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&auto=format",
      rating: 5,
      date: "5 days ago",
      content:
        "Perfect workspace environment with reliable WiFi and comfortable seating. The coffee keeps me energized throughout my work sessions. Love this place!",
      experience: "Works here daily",
      favoriteOrder: "Cold Brew Concentrate",
      tags: ["Workspace", "WiFi", "Comfort"],
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 text-white py-20 px-6 rounded-3xl overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-cream-400/10 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-coffee-400/10 rounded-full"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <StretchableH2 
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            animationType="stretch"
            intensity="high"
          >
            What Our Customers Say
          </StretchableH2>
          <p className="text-cream-200 text-lg">
            Real experiences from real coffee lovers
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Quote Icon */}
            <motion.div
              className="absolute -top-4 left-8 bg-coffee-600 rounded-full p-3"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <Quote className="w-6 h-6 text-white" />
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar & Info */}
              <div className="flex-shrink-0 text-center md:text-left">
                <motion.div
                  className="relative inline-block mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 rounded-full border-4 border-white/30 mx-auto md:mx-0"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </motion.div>

                <div className="mb-4">
                  <h3 className="font-display text-xl font-bold">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-cream-300 text-sm">
                    {currentTestimonial.role}
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                    <MapPin className="w-3 h-3 text-cream-400" />
                    <span className="text-cream-400 text-xs">
                      {currentTestimonial.location}
                    </span>
                  </div>
                </div>

                {/* Customer Stats */}
                <div className="space-y-2 text-sm">
                  <div className="bg-white/10 rounded-lg p-2">
                    <div className="text-cream-300">Experience</div>
                    <div className="font-semibold">
                      {currentTestimonial.experience}
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2">
                    <div className="text-cream-300">Favorite</div>
                    <div className="font-semibold text-xs">
                      {currentTestimonial.favoriteOrder}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            i < currentTestimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-cream-300 text-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{currentTestimonial.date}</span>
                  </div>
                </div>

                {/* Testimonial Text */}
                <motion.p
                  className="text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  "{currentTestimonial.content}"
                </motion.p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {currentTestimonial.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="bg-white/20 text-cream-200 px-3 py-1 rounded-full text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            onClick={prevTestimonial}
            className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/40"
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={nextTestimonial}
            className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Auto-play Toggle */}
        <motion.button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAutoPlaying ? "⏸️" : "▶️"}
        </motion.button>
      </div>
    </div>
  );
};

export default AdvancedTestimonials;
