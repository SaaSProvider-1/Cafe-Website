import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Clock, Zap, Thermometer, Droplets } from "lucide-react";
import { StretchableH3, StretchableSpan } from "./StretchableText";

const AdvancedMenuCard = ({ item, onSelect, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getCaffeineIcon = (level) => {
    switch (level) {
      case "High":
        return <Zap className="w-4 h-4 text-red-500" />;
      case "Medium":
        return <Zap className="w-4 h-4 text-orange-500" />;
      case "Low":
        return <Zap className="w-4 h-4 text-green-500" />;
      default:
        return <Zap className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTemperatureIcon = (temp) => {
    if (temp === "Hot") return <Thermometer className="w-4 h-4 text-red-500" />;
    if (temp === "Iced") return <Droplets className="w-4 h-4 text-blue-500" />;
    return <Thermometer className="w-4 h-4 text-gray-500" />;
  };

  const cardVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: { duration: 0.3 },
    },
    selected: {
      scale: 1.1,
      rotateY: 0,
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      transition: { duration: 0.4 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="relative group cursor-pointer"
      variants={cardVariants}
      initial="initial"
      animate={isSelected ? "selected" : isHovered ? "hover" : "initial"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(item)}
    >
      {/* Main Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-coffee-100">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Floating Badges */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute top-4 right-4 space-y-2"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  variants={badgeVariants}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center gap-1"
                >
                  {getCaffeineIcon(item.caffeine)}
                  <span className="text-xs font-medium">{item.caffeine}</span>
                </motion.div>

                <motion.div
                  variants={badgeVariants}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center gap-1"
                >
                  {getTemperatureIcon(item.temperature)}
                  <span className="text-xs font-medium">
                    {item.temperature}
                  </span>
                </motion.div>

                <motion.div
                  variants={badgeVariants}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center gap-1"
                >
                  <Clock className="w-4 h-4 text-coffee-500" />
                  <span className="text-xs font-medium">
                    {item.prepTime}min
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Price Tag */}
          <motion.div
            className="absolute bottom-4 left-4 bg-coffee-800 text-white px-3 py-1 rounded-full font-bold"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? -5 : 0,
            }}
          >
            ${item.price}
          </motion.div>

          {/* Specialty Badge */}
          {item.isSpecialty && (
            <motion.div
              className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
              animate={{
                y: isHovered ? -5 : 0,
                rotate: isHovered ? 5 : 0,
              }}
            >
              <Star className="w-3 h-3" />
              Specialty
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-lg font-bold text-coffee-900">
              {item.name}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-coffee-600">{item.rating}</span>
            </div>
          </div>

          <p className="text-coffee-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          {/* Interactive Features */}
          <motion.div
            className="flex justify-between items-center"
            animate={{
              y: isHovered ? -2 : 0,
            }}
          >
            <div className="flex gap-2">
              {item.tags?.slice(0, 2).map((tag, index) => (
                <motion.span
                  key={tag}
                  className="text-xs bg-coffee-100 text-coffee-700 px-2 py-1 rounded-full"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <motion.button
              className="text-red-500 hover:text-red-700 transition-colors"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle favorite toggle
              }}
            >
              <Heart className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Detailed Overlay */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="absolute inset-0 bg-white rounded-2xl p-4 shadow-2xl z-10 border-2 border-coffee-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <StretchableH3 
                  className="font-display text-xl font-bold text-coffee-900 mb-2"
                  animationType="bounce"
                  intensity="medium"
                >
                  {item.name}
                </StretchableH3>
                <p className="text-coffee-600 mb-4">{item.description}</p>

                {/* Detailed Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {getCaffeineIcon(item.caffeine)}
                    <span className="text-sm">Caffeine: {item.caffeine}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-coffee-500" />
                    <span className="text-sm">Prep: {item.prepTime}min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTemperatureIcon(item.temperature)}
                    <span className="text-sm">{item.temperature}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Rating: {item.rating}</span>
                  </div>
                </div>

                {/* Ingredients */}
                {item.ingredients && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-coffee-800 mb-2">
                      Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {item.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="text-xs bg-cream-200 text-coffee-700 px-2 py-1 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  className="flex-1 bg-coffee-800 text-white py-2 rounded-lg font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  className="px-4 py-2 border border-coffee-300 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Toggle Button */}
      <motion.button
        className="absolute bottom-2 right-2 bg-coffee-600 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          setShowDetails(!showDetails);
        }}
      >
        <motion.div
          animate={{ rotate: showDetails ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

export default AdvancedMenuCard;
