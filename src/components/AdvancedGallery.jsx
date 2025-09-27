import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  X,
  Instagram,
  Camera,
  Heart,
  Eye,
  Download,
  Share2,
  Filter,
  Grid,
  List,
} from "lucide-react";
import LottieWrapper from "./LottieWrapper";
import AdvancedParticles from "./AdvancedParticles";

const AdvancedGallery = () => {
  const [ref, isInView] = useScrollAnimation(0.1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState("masonry");
  const [likedImages, setLikedImages] = useState(new Set());
  const [showImageDetails, setShowImageDetails] = useState(false);

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=600&fit=crop&auto=format",
      thumbnail:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=300&fit=crop&auto=format",
      alt: "Perfect latte art heart",
      category: "latte-art",
      likes: 234,
      views: 1200,
      tags: ["latte", "art", "heart", "milk", "coffee"],
      photographer: "Sarah Chen",
      location: "Main Counter",
      equipment: "Canon EOS R5, 50mm f/1.8",
      description:
        "A perfect heart crafted by our master barista during the morning rush. The contrast between the rich espresso and creamy milk creates this beautiful art.",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=500&fit=crop&auto=format",
      thumbnail:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=250&fit=crop&auto=format",
      alt: "Coffee beans roasting process",
      category: "process",
      likes: 189,
      views: 890,
      tags: ["roasting", "beans", "process", "artisan"],
      photographer: "Marcus Johnson",
      location: "Roasting Room",
      equipment: "Sony A7III, 85mm f/1.4",
      description:
        "Our carefully selected beans during the roasting process. Each batch is monitored for the perfect roast level to bring out unique flavor profiles.",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&auto=format",
      thumbnail:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop&auto=format",
      alt: "Cozy café interior atmosphere",
      category: "interior",
      likes: 342,
      views: 2100,
      tags: ["interior", "cozy", "atmosphere", "design"],
      photographer: "Emma Rodriguez",
      location: "Main Seating Area",
      equipment: "Nikon Z6, 24-70mm f/2.8",
      description:
        "The warm and inviting atmosphere of our main seating area, designed to provide the perfect environment for both work and relaxation.",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&auto=format",
      thumbnail:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&auto=format",
      alt: "Fresh pastries and desserts",
      category: "food",
      likes: 156,
      views: 650,
      tags: ["pastries", "desserts", "fresh", "bakery"],
      photographer: "David Park",
      location: "Display Counter",
      equipment: "Fuji X-T4, 35mm f/1.4",
      description:
        "Our daily selection of fresh pastries and desserts, baked in-house every morning to complement your coffee experience.",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=500&fit=crop&auto=format",
      thumbnail:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=250&fit=crop&auto=format",
      alt: "Barista crafting specialty drink",
      category: "barista",
      likes: 278,
      views: 1450,
      tags: ["barista", "craft", "specialty", "skill"],
      photographer: "Lisa Wong",
      location: "Espresso Bar",
      equipment: "Canon R6, 24-105mm f/4",
      description:
        "Our skilled barista crafting a specialty drink with precision and artistry. Every beverage is a work of art.",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=400&fit=crop&auto=format",
      thumbnail:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=250&h=200&fit=crop&auto=format",
      alt: "Steam rising from fresh coffee",
      category: "steam",
      likes: 198,
      views: 980,
      tags: ["steam", "hot", "fresh", "aroma"],
      photographer: "Alex Chen",
      location: "Brewing Station",
      equipment: "Sony A7R IV, 90mm macro",
      description:
        "Capturing the essence of fresh coffee - the aromatic steam rising from a perfectly brewed cup, promising warmth and flavor.",
    },
  ];

  const categories = [
    { id: "all", name: "All Photos", icon: "📷", count: galleryImages.length },
    {
      id: "latte-art",
      name: "Latte Art",
      icon: "☕",
      count: galleryImages.filter((img) => img.category === "latte-art").length,
    },
    {
      id: "process",
      name: "Process",
      icon: "⚙️",
      count: galleryImages.filter((img) => img.category === "process").length,
    },
    {
      id: "interior",
      name: "Interior",
      icon: "🏠",
      count: galleryImages.filter((img) => img.category === "interior").length,
    },
    {
      id: "food",
      name: "Food",
      icon: "🥐",
      count: galleryImages.filter((img) => img.category === "food").length,
    },
    {
      id: "barista",
      name: "Barista",
      icon: "👨‍🍳",
      count: galleryImages.filter((img) => img.category === "barista").length,
    },
    {
      id: "steam",
      name: "Steam",
      icon: "💨",
      count: galleryImages.filter((img) => img.category === "steam").length,
    },
  ];

  const filteredImages =
    activeFilter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  const toggleLike = (imageId) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
    }
    setLikedImages(newLikedImages);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setShowImageDetails(false);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowImageDetails(false);
  };

  // Grid layout configurations
  const getGridClass = () => {
    switch (viewMode) {
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4";
      case "grid":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";
      case "list":
        return "grid grid-cols-1 gap-6";
      default:
        return "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="gallery"
      className="section-padding bg-gradient-to-b from-coffee-50 via-white to-cream-50 relative overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <AdvancedParticles
        count={30}
        type="mixed"
        className="opacity-20"
        color="coffee"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 border border-coffee-200 rounded-full opacity-10"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            className="text-coffee-600 font-semibold text-lg tracking-wider uppercase mb-4 block"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(45deg, #8B4513, #D2691E, #8B4513)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Gallery
          </motion.span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-coffee-900 mb-6">
            Moments Worth
            <motion.span
              className="block gradient-text"
              animate={{
                textShadow: [
                  "0 0 0px rgba(139,69,19,0)",
                  "0 0 20px rgba(139,69,19,0.5)",
                  "0 0 0px rgba(139,69,19,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Sharing
            </motion.span>
          </h2>

          <p className="text-xl text-coffee-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Step into our world through the lens. From the perfect pour to the
            cozy corners, every moment at Café Elite tells a story.
          </p>

          <motion.div
            className="flex items-center justify-center space-x-2 text-coffee-600 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <Instagram size={20} />
            <span className="font-semibold">
              Follow @CafeElite for daily inspiration
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced Controls */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === category.id
                    ? "bg-coffee-800 text-white shadow-lg"
                    : "bg-white text-coffee-700 hover:bg-coffee-100 border border-coffee-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-xs bg-black/20 px-1.5 py-0.5 rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-coffee-200">
            {[
              { mode: "masonry", icon: Grid, label: "Masonry" },
              { mode: "grid", icon: Grid, label: "Grid" },
              { mode: "list", icon: List, label: "List" },
            ].map(({ mode, icon: Icon, label }) => (
              <motion.button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 rounded transition-colors ${
                  viewMode === mode
                    ? "bg-coffee-800 text-white"
                    : "text-coffee-600 hover:bg-coffee-50"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={label}
              >
                <Icon size={16} />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lottie Animation Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gradient-to-br from-cream-100 to-coffee-100 p-8 rounded-3xl shadow-xl border border-coffee-200">
            <LottieWrapper
              animationPath="/animations/coffee-beans.json"
              width={200}
              height={200}
              className="mx-auto"
            />
            <p className="text-center text-coffee-700 font-medium mt-4">
              Our Coffee Journey
            </p>
          </div>
        </motion.div>

        {/* Enhanced Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={getGridClass()}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                viewMode === "masonry"
                  ? "mb-4 break-inside-avoid"
                  : viewMode === "list"
                  ? "flex bg-white p-4"
                  : ""
              }`}
              whileHover={{ y: -5, scale: viewMode === "list" ? 1 : 1.02 }}
              onClick={() => openImageModal(image)}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  viewMode === "list"
                    ? "w-48 h-32 flex-shrink-0 rounded-lg mr-4"
                    : "w-full"
                }`}
              >
                <motion.img
                  src={viewMode === "list" ? image.thumbnail : image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  initial={false}
                >
                  <div className="flex items-center gap-4 text-white">
                    <motion.button
                      className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image.id);
                      }}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedImages.has(image.id)
                            ? "text-red-500 fill-current"
                            : "text-white"
                        }`}
                      />
                    </motion.button>

                    <motion.div
                      className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{image.views}</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Category Badge */}
                <motion.div
                  className="absolute top-3 left-3 bg-coffee-800/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {categories.find((cat) => cat.id === image.category)?.icon}{" "}
                  {image.category}
                </motion.div>
              </div>

              {/* List View Content */}
              {viewMode === "list" && (
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-coffee-900 mb-2">
                    {image.alt}
                  </h3>
                  <p className="text-coffee-600 text-sm mb-3 line-clamp-2">
                    {image.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-coffee-500">
                    <span>By {image.photographer}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {image.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {image.views}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="bg-coffee-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-coffee-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Photos
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full max-h-[70vh] object-contain bg-black"
                />

                {/* Image Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    className="bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(selectedImage.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedImages.has(selectedImage.id)
                          ? "text-red-500 fill-current"
                          : "text-white"
                      }`}
                    />
                  </motion.button>
                  <motion.button
                    className="bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>

                <motion.button
                  className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Image Details */}
              <motion.div
                className="p-6"
                animate={{ height: showImageDetails ? "auto" : "120px" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-coffee-900 mb-2">
                      {selectedImage.alt}
                    </h3>
                    <p className="text-coffee-600">
                      {selectedImage.description}
                    </p>
                  </div>

                  <motion.button
                    className="text-coffee-600 hover:text-coffee-800 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowImageDetails(!showImageDetails)}
                  >
                    {showImageDetails ? "Less" : "More"} Info
                  </motion.button>
                </div>

                <AnimatePresence>
                  {showImageDetails && (
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-coffee-100"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div>
                        <h4 className="font-semibold text-coffee-800 mb-2">
                          Photo Details
                        </h4>
                        <div className="space-y-1 text-sm text-coffee-600">
                          <p>
                            <strong>Photographer:</strong>{" "}
                            {selectedImage.photographer}
                          </p>
                          <p>
                            <strong>Location:</strong> {selectedImage.location}
                          </p>
                          <p>
                            <strong>Equipment:</strong>{" "}
                            {selectedImage.equipment}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-coffee-800 mb-2">
                          Engagement
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-coffee-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {selectedImage.likes} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {selectedImage.views} views
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {selectedImage.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-coffee-100 text-coffee-700 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdvancedGallery;
