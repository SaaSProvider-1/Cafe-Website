import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X,
  Star,
  Coffee,
  Leaf,
} from "lucide-react";
import { StretchableH1, StretchableH2, StretchableH3, StretchableSpan } from "./StretchableText";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { coffeeMenu, categories } from "../data/menuData";
import { MultipleButterflies } from "./ButterflyAnimation";

const BookMenu = () => {
  const [ref, isInView] = useScrollAnimation(0.2);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFlipping, setIsFlipping] = useState(false);
  const [bookOpenTime, setBookOpenTime] = useState(null);
  const [showButterflies, setShowButterflies] = useState(false);

  // Organize menu items into pages (2 items per page for book layout)
  const filteredItems =
    selectedCategory === "all"
      ? coffeeMenu
      : coffeeMenu.filter((item) => item.category === selectedCategory);

  const itemsPerPage = 2;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    const startIndex = i * itemsPerPage;
    const pageItems = filteredItems.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    pages.push(pageItems);
  }

  // Add cover and category pages
  const allPages = [
    { type: "cover", content: null },
    { type: "categories", content: categories },
    ...pages.map((items) => ({ type: "menu", content: items })),
  ];

  const flipToNextPage = () => {
    if (currentPage < allPages.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const flipToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const openBook = () => {
    setIsBookOpen(true);
    setCurrentPage(0);
    // Trigger butterfly animation after a short delay
    setTimeout(() => {
      setShowButterflies(true);
    }, 800);
  };

  const closeBook = () => {
    setIsBookOpen(false);
    setCurrentPage(0);
    setShowButterflies(false);
  };

  const goToCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(2); // Go to first menu page
  };

  // const bookVariants = {
  //   closed: {
  //     rotateY: 0,
  //     scale: 1,
  //     transition: { duration: 0.8, ease: "easeInOut" },
  //   },
  //   open: {
  //     rotateY: 0,
  //     scale: 1.1,
  //     transition: { duration: 0.8, ease: "easeInOut" },
  //   },
  // };

  const pageVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? -180 : 180,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: (direction) => ({
      rotateY: direction < 0 ? -180 : 180,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.6, ease: "easeInOut" },
    }),
  };

  return (
    <section
      id="menu"
      className="section-padding bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 border-2 border-amber-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-24 h-24 border-2 border-orange-200 rounded-full opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="text-coffee-600 font-semibold text-lg tracking-wider uppercase mb-4 block">
            Our Menu
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-coffee-900 mb-6">
            Coffee
            <span className="block gradient-text">Chronicles</span>
          </h2>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Open our menu book to discover a curated collection of artisan
            coffees, each with its own story waiting to be told.
          </p>
        </motion.div>

        {/* Book Container */}
        <div className="flex justify-center items-center min-h-[500px] perspective-1000">
          <AnimatePresence mode="wait">
            {!isBookOpen ? (
              // Closed Book
              <motion.div
                key="closed-book"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="min-h-[500px] relative cursor-pointer group"
                onClick={openBook}
              >
                <motion.div
                  className="w-[400px] h-[500px] bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-r-2xl shadow-2xl relative overflow-hidden transform-gpu"
                  whileHover={{
                    scale: 1.05,
                    rotateY: -10,
                    rotateX: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Book spine */}
                  <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-b from-amber-900 to-amber-800 shadow-inner"></div>

                  {/* Book cover design */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-8xl mb-4 text-amber-200"
                    >
                      ☕
                    </motion.div>

                    <h3 className="font-display text-4xl font-bold text-amber-100 mb-2">
                      Café Elite
                    </h3>
                    <div className="w-32 h-0.5 bg-amber-300 mb-4"></div>
                    <h4 className="font-display text-2xl text-amber-200 mb-6">
                      Menu Collection
                    </h4>

                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-2 text-amber-300"
                    >
                      <BookOpen size={20} />
                      <span className="text-sm font-medium">Click to Open</span>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 border-2 border-amber-300 rounded-full opacity-30"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-amber-300 opacity-20 transform rotate-45"></div>
                  </div>

                  {/* Book thickness effect */}
                  <div className="absolute right-0 top-2 w-2 h-92 bg-gradient-to-b from-amber-600 to-amber-800 transform translate-x-full origin-left shadow-lg"></div>
                  <div className="absolute right-0 top-4 w-1.5 h-88 bg-gradient-to-b from-amber-500 to-amber-700 transform translate-x-full origin-left shadow-md"></div>
                </motion.div>
              </motion.div>
            ) : (
              // Open Book
              <motion.div
                key="open-book"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px] w-[800px] relative">
                  {/* Left Page */}
                  <div className="w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cream-50 to-amber-50">
                      {/* Page content */}
                      <AnimatePresence mode="wait" custom={1}>
                        <motion.div
                          key={`left-${currentPage}`}
                          custom={1}
                          variants={pageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="absolute inset-0 p-8"
                        >
                          {renderPageContent(allPages[currentPage], "left")}
                        </motion.div>
                      </AnimatePresence>

                      {/* Left page binding */}
                      <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-200 to-amber-300 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Center Binding */}
                  <div className="w-4 bg-gradient-to-b from-amber-800 via-amber-700 to-amber-800 relative shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-700 opacity-50"></div>
                  </div>

                  {/* Right Page */}
                  <div className="w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cream-50 to-amber-50">
                      {/* Page content */}
                      <AnimatePresence mode="wait" custom={-1}>
                        <motion.div
                          key={`right-${currentPage}`}
                          custom={-1}
                          variants={pageVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          className="absolute inset-0 p-8 pt-5"
                        >
                          {renderPageContent(
                            allPages[currentPage + 1],
                            "right"
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Right page binding */}
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-200 to-amber-300 shadow-inner"></div>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-4">
                    <motion.button
                      onClick={flipToPrevPage}
                      disabled={currentPage <= 0 || isFlipping}
                      className="bg-amber-700 hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={20} />
                    </motion.button>
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 right-4">
                    <motion.button
                      onClick={flipToNextPage}
                      disabled={
                        currentPage >= allPages.length - 2 || isFlipping
                      }
                      className="bg-amber-700 hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    onClick={closeBook}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Butterfly Animation */}
      {showButterflies && <MultipleButterflies />}
    </section>
  );

  function renderPageContent(page, side) {
    if (!page) return null;

    switch (page.type) {
      case "cover":
        return (
          <div className="h-full flex flex-col justify-center items-center text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-6 text-amber-600"
            >
              ☕
            </motion.div>
            <StretchableH2 
              className="font-display text-3xl font-bold text-coffee-900 mb-4"
              animationType="stretch"
              intensity="medium"
            >
              Welcome to
            </StretchableH2>
            <StretchableH1 
              className="font-display text-4xl font-bold gradient-text mb-6"
              animationType="elastic"
              intensity="high"
            >
              Café Elite
            </StretchableH1>
            <div className="w-24 h-0.5 bg-amber-400 mb-6"></div>
            <p className="text-coffee-700 text-sm italic">
              "Every cup tells a story"
            </p>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 text-amber-600"
            >
              <p className="text-sm">Turn the page to explore</p>
            </motion.div>
          </div>
        );

      case "categories":
        return (
          <div className="h-full">
            <StretchableH2 
              className="font-display text-2xl font-bold text-coffee-900 mb-4 text-center"
              animationType="bounce"
              intensity="medium"
            >
              Menu Categories
            </StretchableH2>
            <div className="grid grid-cols-2 gap-4">
              {categories.slice(1).map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => goToCategory(category.id)}
                  className="bg-white hover:bg-amber-50 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl text-center mb-2">{category.icon}</div>
                  <StretchableH3 
                    className="w-[100%] mb-2 font-semibold text-coffee-800 text-center"
                    animationType="wave"
                    intensity="low"
                  >
                    {category.name}
                  </StretchableH3>
                  <p className="mb-4 text-sm text-coffee-600 text-center">
                    Discover our {category.name.toLowerCase()} collection
                  </p>
                </motion.button>
              ))}
            </div>

            <div className="mt-5 text-center">
              <motion.button
                onClick={() => goToCategory("all")}
                className="bg-coffee-800 hover:bg-coffee-900 text-white px-6 py-3 rounded-full font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Items
              </motion.button>
            </div>
          </div>
        );

      case "menu": {
        const items = page.content || [];
        const itemIndex = side === "left" ? 0 : 1;
        const item = items[itemIndex];

        if (!item) {
          return (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <div className="text-4xl mb-4 text-amber-400">📖</div>
                <p className="text-coffee-600 italic">End of menu</p>
                <p className="text-sm text-coffee-500 mt-2">
                  Thank you for browsing our collection
                </p>
              </div>
            </div>
          );
        }

        return (
          <div className="h-full">
            {/* Menu Item */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg h-full flex flex-col"
            >
              {/* Item Image */}
              <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.isSpecialty && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Specialty
                  </div>
                )}
                <div className="absolute bottom-2 left-2 bg-coffee-800 text-white px-3 py-1 rounded-full font-bold">
                  ${item.price}
                </div>
              </div>

              {/* Item Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-xl font-bold text-coffee-900">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-coffee-600">
                      {item.rating}
                    </span>
                  </div>
                </div>

                <p className="text-coffee-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Item Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Coffee className="w-3 h-3 text-coffee-500" />
                    <span className="text-coffee-600">
                      Caffeine: {item.caffeine}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.temperature === "Hot"
                          ? "bg-red-400"
                          : "bg-blue-400"
                      }`}
                    ></div>
                    <span className="text-coffee-600">{item.temperature}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <span className="text-coffee-600">{item.prepTime}min</span>
                  </div>
                  {item.origin && (
                    <div className="flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-green-500" />
                      <span className="text-coffee-600 text-xs">
                        {item.origin}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Ingredients */}
                {item.ingredients && (
                  <div className="mt-auto">
                    <h4 className="font-semibold text-coffee-800 text-xs mb-1">
                      Ingredients:
                    </h4>
                    <p className="text-xs text-coffee-600 leading-relaxed">
                      {item.ingredients.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        );
      }

      default:
        return null;
    }
  }
};

export default BookMenu;
