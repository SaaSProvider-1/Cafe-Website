import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "../components/NavigationForMenu";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

const MenuPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Navigation />
      <main className="pt-16 lg:pt-20">
        <Menu />
      </main>
      <Footer />
    </motion.div>
  );
};

export default MenuPage;
