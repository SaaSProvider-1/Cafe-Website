import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import {
  Award,
  Users,
  Clock,
  Heart,
  Coffee,
  Leaf,
  Star,
  Zap,
} from "lucide-react";
import LottieWrapper from "./LottieWrapper";
import AdvancedParticles from "./AdvancedParticles";
import { AdvancedCounter, FloatingElements } from "./AdvancedEffects";
import AdvancedTestimonials from "./AdvancedTestimonials";
import { StretchableH2, StretchableH3, StretchableH4, StretchableSpan } from "./StretchableText";

const About = () => {
  const [ref, isInView] = useScrollAnimation(0.2);

  const stats = [
    {
      icon: Award,
      number: 15,
      text: "Awards Won",
      color: "from-yellow-400 to-yellow-600",
      suffix: "",
      description: "Industry recognition",
    },
    {
      icon: Users,
      number: 10000,
      text: "Happy Customers",
      color: "from-blue-400 to-blue-600",
      suffix: "+",
      description: "Served with love",
    },
    {
      icon: Clock,
      number: 8,
      text: "Years Experience",
      color: "from-green-400 to-green-600",
      suffix: "",
      description: "Crafting perfection",
    },
    {
      icon: Heart,
      number: 99,
      text: "Satisfaction Rate",
      color: "from-red-400 to-red-600",
      suffix: "%",
      description: "Customer happiness",
    },
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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-b from-cream-50 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-coffee-100 rounded-full -translate-x-32 -translate-y-32 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cream-200 rounded-full translate-x-48 translate-y-48 opacity-20"></div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="text-coffee-600 font-semibold text-lg tracking-wider uppercase mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.div variants={itemVariants}>
            <StretchableH2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-coffee-900 mb-6"
              animationType="stretch"
              intensity="high"
            >
              Crafting Perfect Coffee
              <StretchableSpan className="block gradient-text" animationType="glow" intensity="high">Since 2015</StretchableSpan>
            </StretchableH2>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-xl text-coffee-700 max-w-3xl mx-auto leading-relaxed"
          >
            What started as a small neighborhood café has grown into a beloved
            destination for coffee enthusiasts who appreciate the art of perfect
            brewing.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <StretchableH3 
                className="font-display text-3xl font-bold text-coffee-900"
                animationType="bounce"
                intensity="medium"
              >
                Our Passion for Excellence
              </StretchableH3>
              <p className="text-coffee-700 text-lg leading-relaxed">
                Every morning, our master roasters carefully select the finest
                beans from sustainable farms around the world. We believe that
                great coffee starts with great relationships - with our farmers,
                our community, and most importantly, with you.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-coffee-600 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <StretchableH4 className="font-semibold text-coffee-900 mb-2" animationType="wave" intensity="low">
                    Sustainable Sourcing
                  </StretchableH4>
                  <p className="text-coffee-700">
                    Direct trade relationships with farmers who share our
                    commitment to quality and sustainability.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-coffee-600 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <StretchableH4 className="font-semibold text-coffee-900 mb-2" animationType="wave" intensity="low">
                    Artisan Roasting
                  </StretchableH4>
                  <p className="text-coffee-700">
                    Small-batch roasting that brings out the unique
                    characteristics of each origin.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-coffee-600 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <StretchableH4 className="font-semibold text-coffee-900 mb-2" animationType="wave" intensity="low">
                    Expert Craftsmanship
                  </StretchableH4>
                  <p className="text-coffee-700">
                    Our baristas are trained in the art of coffee preparation,
                    ensuring every cup is perfect.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Visit Our Roastery
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=500&fit=crop&auto=format"
                alt="Coffee roasting process"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/20 to-transparent"></div>
            </div>

            {/* Coffee Brewing Animation */}
            <div className="absolute -top-16 -right-8 z-10">
              <LottieWrapper
                className="w-24 h-32"
                width={96}
                height={128}
                animationPath="/animations/coffee-brewing.json"
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center"
            >
              <div className="text-center">
                <div className="font-bold text-coffee-900 text-lg">100%</div>
                <div className="text-coffee-600 text-xs font-semibold">
                  ORGANIC
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-coffee-600 rounded-full shadow-lg flex items-center justify-center text-white"
            >
              <div className="text-center">
                <div className="font-bold text-2xl">8</div>
                <div className="text-sm font-semibold">YEARS</div>
                <div className="text-xs">EXPERIENCE</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statsVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group cursor-pointer"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:shadow-lg transition-all duration-300`}
              >
                <stat.icon size={24} />
              </div>
              <div className="font-display text-3xl lg:text-4xl font-bold text-coffee-900 mb-2">
                {stat.number}
              </div>
              <div className="text-coffee-600 font-medium">{stat.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
