import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import BookMenu from "./components/BookMenu";
import Testimonials from "./components/Testimonials";
import AdvancedGallery from "./components/AdvancedGallery";
import AdvancedContact from "./components/AdvancedContact";
import Footer from "./components/Footer";
import AdvancedTestimonials from "./components/AdvancedTestimonials";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum loading time for better UX
    const minLoadingTime = 2500; // 2.5 seconds
    const startTime = Date.now();
    
    // Check if all critical resources are loaded
    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    // Preload critical images
    const criticalImages = [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop&auto=format'
    ];

    let loadedImages = 0;
    const totalImages = criticalImages.length;

    const preloadImages = () => {
      criticalImages.forEach(src => {
        const img = new Image();
        img.onload = () => {
          loadedImages++;
          if (loadedImages === totalImages && document.readyState === 'complete') {
            handleLoad();
          }
        };
        img.onerror = () => {
          loadedImages++;
          if (loadedImages === totalImages && document.readyState === 'complete') {
            handleLoad();
          }
        };
        img.src = src;
      });
    };

    if (document.readyState === 'complete') {
      preloadImages();
    } else {
      window.addEventListener('load', () => {
        preloadImages();
      });
    }

    // Fallback timer
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Maximum 5 seconds

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={handleLoadingComplete}
      />
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Navigation />
          <main>
            <Hero />
            <About />
            <BookMenu />
            <AdvancedTestimonials />
            <AdvancedGallery />
            <AdvancedContact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
