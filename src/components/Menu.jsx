import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { coffeeMenu, categories } from "../data/menuData";
import { Plus, Star, Zap, Filter, Search, Grid, List } from "lucide-react";
import { FloatingCoffeeBeans } from "./LottieAnimations";
import AdvancedMenuCard from "./AdvancedMenuCard";
import AdvancedParticles from "./AdvancedParticles";
import { AdvancedCounter } from "./AdvancedEffects";
import { StretchableH2, StretchableH3, StretchableSpan } from "./StretchableText";

const Menu = () => {
  const [ref, isInView] = useScrollAnimation(0.1);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredMenu =
    activeCategory === "all"
      ? coffeeMenu
      : coffeeMenu.filter((item) => item.category === activeCategory);

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
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const getCaffeineColor = (level) => {
    switch (level) {
      case "High":
        return "text-red-500 bg-red-100";
      case "Medium":
        return "text-orange-500 bg-orange-100";
      case "Low":
        return "text-green-500 bg-green-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <section
      id="menu"
      className="section-padding bg-gradient-to-b from-white via-cream-50 to-coffee-50 relative overflow-hidden"
    >
      {/* Floating Coffee Beans Animation */}
      <FloatingCoffeeBeans className="opacity-30" />

      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-coffee-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-cream-300 rounded-full opacity-15"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-coffee-600 font-semibold text-lg tracking-wider uppercase mb-4 block">
            Our Menu
          </span>
          <StretchableH2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-coffee-900 mb-6"
            animationType="stretch"
            intensity="high"
          >
            Discover Your Perfect
            <StretchableSpan className="block gradient-text" animationType="glow" intensity="high">Coffee Experience</StretchableSpan>
          </StretchableH2>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto leading-relaxed">
            From single-origin pour-overs to signature lattes, each cup is
            crafted with precision and passion.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-coffee-600 text-white shadow-lg"
                  : "bg-white text-coffee-600 hover:bg-coffee-50 border border-coffee-200"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star size={14} />
                      <span>Featured</span>
                    </div>
                  )}

                  {/* Caffeine Level */}
                  <div
                    className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getCaffeineColor(
                      item.caffeine
                    )}`}
                  >
                    <Zap size={12} />
                    <span>{item.caffeine}</span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-coffee-900 px-3 py-1 rounded-full font-bold text-lg">
                    ${item.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <StretchableH3 
                    className="font-display text-xl font-bold text-coffee-900 mb-2 group-hover:text-coffee-700 transition-colors duration-300"
                    animationType="bounce"
                    intensity="medium"
                  >
                    {item.name}
                  </StretchableH3>
                  <p className="text-coffee-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.ingredients.slice(0, 3).map((ingredient, i) => (
                      <span
                        key={i}
                        className="text-xs bg-coffee-100 text-coffee-700 px-2 py-1 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className="text-xs text-coffee-500">
                        +{item.ingredients.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-coffee-600 hover:bg-coffee-700 text-white py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <Plus
                      size={18}
                      className="group-hover:rotate-90 transition-transform duration-300"
                    />
                    <span>Add to Order</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-coffee-600 to-coffee-700 rounded-2xl p-8 md:p-12 text-white">
            <StretchableH3 
              className="font-display text-3xl md:text-4xl font-bold mb-4"
              animationType="bounce"
              intensity="high"
            >
              Can't Decide? Try Our Tasting Flight!
            </StretchableH3>
            <p className="text-xl text-coffee-100 mb-8 max-w-2xl mx-auto">
              Sample our three most popular coffees in smaller portions. Perfect
              for discovering your new favorite.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-coffee-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-coffee-50 transition-colors duration-300"
            >
              Order Tasting Flight - $12
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden rounded-t-2xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-coffee-900 hover:bg-white transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-coffee-900 mb-2">
                  {selectedItem.name}
                </h3>
                <p className="text-coffee-600 mb-4">
                  {selectedItem.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-coffee-900 mb-2">
                      Ingredients:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map((ingredient, i) => (
                        <span
                          key={i}
                          className="text-sm bg-coffee-100 text-coffee-700 px-3 py-1 rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-coffee-100">
                    <div className="text-2xl font-bold text-coffee-900">
                      ${selectedItem.price}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                    >
                      Add to Order
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Menu;
