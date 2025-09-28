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
import {
  StretchableH1,
  StretchableH2,
  StretchableH3,
  StretchableSpan,
} from "./StretchableText";
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
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 md:mb-16"
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

      <div className="max-w-7xl mx-auto relative z-10 pb-4 sm:pb-6 md:pb-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 sm:mb-6 md:mb-8 px-4"
        >
          <span className="text-coffee-600 font-semibold text-xs sm:text-sm md:text-base tracking-wider uppercase mb-2 sm:mb-3 block">
            Our Menu
          </span>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-coffee-900 mb-3 sm:mb-4 md:mb-5">
            Coffee
            <span className="block gradient-text">Chronicles</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-coffee-700 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 md:mb-7 px-4">
            Open our menu book to discover a curated collection of artisan
            coffees, each with its own story waiting to be told.
          </p>
        </motion.div>

        {/* Book Container */}
        <div className="flex justify-center items-center min-h-[280px] sm:min-h-[350px] md:min-h-[450px] perspective-1000 px-4 mb-4 sm:mb-6 md:mb-8">
          <AnimatePresence mode="wait">
            {!isBookOpen ? (
              // Closed Book
              <motion.div
                key="closed-book"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                className="min-h-[300px] sm:min-h-[400px] md:min-h-[500px] relative cursor-pointer group w-full max-w-sm sm:max-w-md md:max-w-none"
                onClick={openBook}
              >
                <motion.div
                  className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[380px] h-[280px] sm:h-[350px] md:h-[450px] bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-r-xl md:rounded-r-2xl shadow-2xl relative overflow-hidden transform-gpu mx-auto"
                  whileHover={{
                    scale: window.innerWidth > 768 ? 1.05 : 1.02,
                    rotateY: window.innerWidth > 768 ? -10 : -5,
                    rotateX: window.innerWidth > 768 ? 5 : 2,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Book spine */}
                  <div className="absolute left-0 top-0 w-4 sm:w-6 md:w-8 h-full bg-gradient-to-b from-amber-900 to-amber-800 shadow-inner"></div>

                  {/* Book cover design */}
                  <div className="absolute inset-0 p-3 sm:p-4 md:p-6 flex flex-col justify-center items-center text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-3xl sm:text-4xl md:text-6xl mb-2 sm:mb-3 md:mb-4 text-amber-200"
                    >
                      ☕
                    </motion.div>

                    <h3 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-100 mb-1 sm:mb-1.5">
                      Café Elite
                    </h3>
                    <div className="w-12 sm:w-16 md:w-24 h-0.5 bg-amber-300 mb-2 sm:mb-2.5 md:mb-3"></div>
                    <h4 className="font-display text-sm sm:text-base md:text-lg lg:text-xl text-amber-200 mb-3 sm:mb-4 md:mb-5">
                      Menu Collection
                    </h4>

                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-2 text-amber-300"
                    >
                      <BookOpen
                        size={14}
                        className="sm:w-4 sm:h-4 md:w-5 md:h-5"
                      />
                      <span className="text-xs sm:text-sm font-medium">
                        Tap to Open
                      </span>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 border border-amber-300 sm:border-2 rounded-full opacity-30"></div>
                    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-4 sm:left-6 md:left-8 w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 border border-amber-300 sm:border-2 opacity-20 transform rotate-45"></div>
                  </div>

                  {/* Book thickness effect */}
                  <div className="absolute right-0 top-1 sm:top-2 w-1 sm:w-1.5 md:w-2 h-[calc(100%-8px)] sm:h-[calc(100%-16px)] bg-gradient-to-b from-amber-600 to-amber-800 transform translate-x-full origin-left shadow-lg"></div>
                  <div className="absolute right-0 top-2 sm:top-3 md:top-4 w-1 sm:w-1.5 h-[calc(100%-16px)] sm:h-[calc(100%-24px)] bg-gradient-to-b from-amber-500 to-amber-700 transform translate-x-full origin-left shadow-md"></div>
                </motion.div>
              </motion.div>
            ) : (
              // Open Book
              <motion.div
                key="open-book"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full max-w-6xl mx-auto"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex flex-col md:flex-row bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden min-h-[450px] sm:min-h-[500px] md:min-h-[450px] max-h-[85vh] md:max-h-none w-full md:w-auto md:max-w-[750px] lg:w-[750px] relative mx-auto">
                  {/* Left Page */}
                  <div className="w-full md:w-1/2 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-auto flex-1">
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
                          className="absolute inset-0 p-2 sm:p-3 md:p-4 lg:p-6 overflow-y-auto"
                        >
                          {renderPageContent(allPages[currentPage], "left")}
                        </motion.div>
                      </AnimatePresence>

                      {/* Left page binding */}
                      <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-amber-200 to-amber-300 shadow-inner md:block hidden"></div>
                      {/* Mobile bottom binding */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 to-amber-300 shadow-inner md:hidden"></div>
                    </div>
                  </div>

                  {/* Center Binding */}
                  <div className="w-full md:w-4 h-1 md:h-auto bg-gradient-to-r md:bg-gradient-to-b from-amber-800 via-amber-700 to-amber-800 relative shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-700 md:bg-gradient-to-r opacity-50"></div>
                  </div>

                  {/* Right Page */}
                  <div className="w-full md:w-1/2 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-auto flex-1">
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
                          className="absolute inset-0 p-2 sm:p-3 md:p-4 lg:p-6 overflow-y-auto"
                        >
                          {renderPageContent(
                            allPages[currentPage + 1],
                            "right"
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Right page binding */}
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-200 to-amber-300 shadow-inner md:block hidden"></div>
                      {/* Mobile top binding */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 to-amber-300 shadow-inner md:hidden"></div>
                    </div>
                  </div>

                  {/* Navigation Controls - Mobile Bottom, Desktop Sides */}
                  <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:left-2 lg:left-4 flex md:block justify-center order-first md:order-none">
                    <motion.button
                      onClick={flipToPrevPage}
                      disabled={currentPage <= 0 || isFlipping}
                      className="bg-amber-700 hover:bg-amber-600 active:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed text-white p-2 sm:p-3 rounded-full shadow-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      whileHover={{ scale: window.innerWidth > 768 ? 1.1 : 1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>

                  {/* Bottom Navigation for Mobile */}
                  <div className="flex md:hidden justify-between items-center p-2 sm:p-3 bg-amber-50 border-t border-amber-200 order-last flex-shrink-0">
                    <motion.button
                      onClick={flipToPrevPage}
                      disabled={currentPage <= 0 || isFlipping}
                      className="bg-amber-700 hover:bg-amber-600 active:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed text-white px-3 py-1.5 sm:py-2 rounded-full shadow-lg touch-manipulation min-h-[36px] sm:min-h-[40px] flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium"
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
                      <span>Previous</span>
                    </motion.button>

                    <div className="text-xs sm:text-sm text-amber-700 font-medium px-2">
                      {currentPage + 1} / {Math.ceil(allPages.length / 2)}
                    </div>

                    <motion.button
                      onClick={flipToNextPage}
                      disabled={
                        currentPage >= allPages.length - 2 || isFlipping
                      }
                      className="bg-amber-700 hover:bg-amber-600 active:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed text-white px-3 py-1.5 sm:py-2 rounded-full shadow-lg touch-manipulation min-h-[36px] sm:min-h-[40px] flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium"
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Next</span>
                      <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>

                  <div className="md:absolute md:top-1/2 md:-translate-y-1/2 md:right-2 lg:right-4 hidden md:flex">
                    <motion.button
                      onClick={flipToNextPage}
                      disabled={
                        currentPage >= allPages.length - 2 || isFlipping
                      }
                      className="bg-amber-700 hover:bg-amber-600 active:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed text-white p-2 sm:p-3 rounded-full shadow-lg touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                      whileHover={{ scale: window.innerWidth > 768 ? 1.1 : 1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>

                  {/* Close Button */}
                  <motion.button
                    onClick={closeBook}
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white p-2 sm:p-2.5 rounded-full shadow-lg z-10 touch-manipulation min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
                    whileHover={{ scale: window.innerWidth > 768 ? 1.1 : 1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={14} className="sm:w-4 sm:h-4" />
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
          <div className="h-full flex flex-col justify-center items-center text-center px-2 py-1">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3 md:mb-4 text-amber-600 flex-shrink-0"
            >
              ☕
            </motion.div>
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <StretchableH2
                className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold text-coffee-900 mb-1 sm:mb-2 md:mb-3"
                animationType="stretch"
                intensity="medium"
              >
                Welcome to
              </StretchableH2>
              <StretchableH1
                className="font-display text-base sm:text-lg md:text-xl lg:text-2xl font-bold gradient-text mb-2 sm:mb-3 md:mb-4"
                animationType="elastic"
                intensity="high"
              >
                Café Elite
              </StretchableH1>
              <div className="w-8 sm:w-10 md:w-12 lg:w-16 h-0.5 bg-amber-400 mb-2 sm:mb-3 md:mb-4 mx-auto flex-shrink-0"></div>
              <p className="text-coffee-700 text-xs sm:text-sm italic mb-3 sm:mb-4 md:mb-6 flex-shrink-0">
                "Every cup tells a story"
              </p>
            </div>

            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-amber-600 flex-shrink-0"
            >
              <p className="text-xs sm:text-sm">Turn the page to explore</p>
            </motion.div>
          </div>
        );

      case "categories":
        return (
          <div className="h-full flex flex-col">
            <StretchableH2
              className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold text-coffee-900 mb-2 sm:mb-3 text-center flex-shrink-0"
              animationType="bounce"
              intensity="medium"
            >
              Menu Categories
            </StretchableH2>
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pb-3">
                {categories.slice(1).map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => goToCategory(category.id)}
                    className="bg-white hover:bg-amber-50 active:bg-amber-100 p-2 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left touch-manipulation min-h-[65px] sm:min-h-[70px] md:min-h-[75px] flex flex-col justify-center"
                    whileHover={{
                      scale: window.innerWidth > 768 ? 1.02 : 1,
                      y: window.innerWidth > 768 ? -2 : 0,
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-lg sm:text-xl md:text-2xl text-center mb-1">
                      {category.icon}
                    </div>
                    <StretchableH3
                      className="w-full mb-1 font-semibold text-coffee-800 text-center text-xs sm:text-sm leading-tight"
                      animationType="wave"
                      intensity="low"
                    >
                      {category.name}
                    </StretchableH3>
                    <p className="text-xs text-coffee-600 text-center leading-tight">
                      Discover our {category.name.toLowerCase()} collection
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 text-center pt-2">
              <motion.button
                onClick={() => goToCategory("all")}
                className="bg-coffee-800 hover:bg-coffee-900 active:bg-coffee-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm touch-manipulation min-h-[38px] sm:min-h-[42px]"
                whileHover={{ scale: window.innerWidth > 768 ? 1.05 : 1 }}
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
            <div className="h-full flex items-center justify-center text-center p-4">
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 text-amber-400">
                  📖
                </div>
                <p className="text-coffee-600 italic text-sm sm:text-base mb-1 sm:mb-2">
                  End of menu
                </p>
                <p className="text-xs sm:text-sm text-coffee-500">
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
              className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg h-full flex flex-col overflow-hidden"
            >
              {/* Item Image */}
              <div className="relative h-24 sm:h-32 md:h-40 mb-2 sm:mb-3 md:mb-4 rounded-md sm:rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.isSpecialty && (
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-yellow-400 text-yellow-900 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">Specialty</span>
                  </div>
                )}
                <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-coffee-800 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-sm sm:text-base">
                  ${item.price}
                </div>
              </div>

              {/* Item Details */}
              <div className="flex-1 min-h-0">
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-bold text-coffee-900 leading-tight flex-1 mr-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    <span className="text-xs sm:text-sm text-coffee-600">
                      {item.rating}
                    </span>
                  </div>
                </div>

                <p className="text-coffee-600 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Item Stats */}
                <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Coffee className="w-3 h-3 text-coffee-500 flex-shrink-0" />
                    <span className="text-coffee-600 truncate">
                      {item.caffeine}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        item.temperature === "Hot"
                          ? "bg-red-400"
                          : "bg-blue-400"
                      }`}
                    ></div>
                    <span className="text-coffee-600 truncate">
                      {item.temperature}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                    <span className="text-coffee-600 truncate">
                      {item.prepTime}min
                    </span>
                  </div>
                  {item.origin && (
                    <div className="flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-green-500 flex-shrink-0" />
                      <span className="text-coffee-600 text-xs truncate">
                        {item.origin}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {item.tags && (
                  <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 md:mb-4">
                    {item.tags
                      .slice(0, window.innerWidth < 768 ? 2 : 3)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-amber-100 text-amber-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    {item.tags.length > (window.innerWidth < 768 ? 2 : 3) && (
                      <span className="text-xs text-amber-600">
                        +{item.tags.length - (window.innerWidth < 768 ? 2 : 3)}
                      </span>
                    )}
                  </div>
                )}

                {/* Ingredients */}
                {item.ingredients && (
                  <div className="mt-auto">
                    <h4 className="font-semibold text-coffee-800 text-xs mb-1">
                      Ingredients:
                    </h4>
                    <p className="text-xs text-coffee-600 leading-relaxed line-clamp-2">
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
