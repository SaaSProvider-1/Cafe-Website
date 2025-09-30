import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Minus,
  Star,
  Coffee,
  Clock,
  Flame,
  X,
  Check,
  MapPin,
  Phone,
  CheckCircle,
  Heart,
  Sparkles,
  Trophy,
  Home,
} from "lucide-react";
import { coffeeMenu, categories } from "../data/menuData";

const QRMenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    email: "",
    specialInstructions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const filteredMenu =
    selectedCategory === "all"
      ? coffeeMenu
      : coffeeMenu.filter((item) => item.category === selectedCategory);

  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter((cartItem) => cartItem.id !== itemId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItemQuantity = (itemId) => {
    const cartItem = cart.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!orderData.name.trim() || !orderData.phone.trim()) {
      setOrderSuccess({
        type: "error",
        message: "Please fill in your name and phone number",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://cafe-website-yv8t.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: {
            name: orderData.name,
            phone: orderData.phone,
            email: orderData.email || undefined,
          },
          items: cart,
          specialInstructions: orderData.specialInstructions || undefined,
          orderType: "pickup",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOrderSuccess(result.data);
        setCart([]);
        setShowOrderForm(false);
        setIsCartOpen(false);

        // Show success modal
        setTimeout(() => {
          setOrderSuccess({
            type: "success",
            data: result.data,
          });
        }, 500);
      } else {
        setOrderSuccess({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Order submission error:", error);
      setOrderSuccess({
        type: "error",
        message: "Failed to place order. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-coffee-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-coffee-200/30">
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Coffee className="h-6 w-6 sm:h-8 sm:w-8 text-coffee-600" />
              <div>
                <h1 className="font-display text-lg sm:text-xl font-bold text-coffee-900">
                  Café Elite
                </h1>
                <p className="text-xs sm:text-sm text-coffee-600">
                  Digital Menu
                </p>
              </div>
            </div>

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative bg-coffee-600 text-white p-2 sm:p-3 rounded-full shadow-lg"
            >
              <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center font-bold text-xs">
                  {getTotalItems()}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="px-3 sm:px-4 py-4 sm:py-6 bg-coffee-600 text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">
          Welcome to Our Digital Menu!
        </h2>
        <p className="text-sm sm:text-base text-coffee-100">
          Browse our menu and place your order directly from your phone
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 bg-white border-b">
        <div className="flex overflow-x-auto space-x-2 sm:space-x-3 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                selectedCategory === category.id
                  ? "bg-coffee-600 text-white shadow-lg"
                  : "bg-coffee-100 text-coffee-700 hover:bg-coffee-200"
              }`}
            >
              <span className="text-base sm:text-lg">{category.icon}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
        {filteredMenu.map((item) => {
          const quantity = getCartItemQuantity(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex">
                {/* Item Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base sm:text-lg text-coffee-900 line-clamp-1 pr-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center ml-1 sm:ml-2 flex-shrink-0">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                      <span className="text-xs sm:text-sm text-coffee-600 ml-1">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-coffee-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-end justify-between">
                    <div className="flex flex-col space-y-1">
                      <span className="text-lg sm:text-xl font-bold text-coffee-900">
                        ${item.price}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-coffee-500">
                        <Clock size={10} className="sm:w-3 sm:h-3" />
                        <span>{item.prepTime}min</span>
                        <Flame
                          size={10}
                          className="text-orange-500 sm:w-3 sm:h-3"
                        />
                        <span className="hidden sm:inline">
                          {item.caffeine}
                        </span>
                      </div>
                    </div>

                    {/* Add to Cart Controls */}
                    {quantity === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(item)}
                        className="bg-coffee-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm flex items-center space-x-1 flex-shrink-0"
                      >
                        <Plus size={14} className="sm:w-4 sm:h-4" />
                        <span>Add</span>
                      </motion.button>
                    ) : (
                      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item.id)}
                          className="bg-coffee-200 text-coffee-700 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                        >
                          <Minus size={14} className="sm:w-4 sm:h-4" />
                        </motion.button>
                        <span className="font-bold text-coffee-900 w-6 sm:w-8 text-center text-sm">
                          {quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(item)}
                          className="bg-coffee-600 text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                        >
                          <Plus size={14} className="sm:w-4 sm:h-4" />
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Spacing for Cart */}
      <div className="h-20 sm:h-24"></div>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b">
                <h3 className="text-lg sm:text-xl font-bold text-coffee-900">
                  Your Order
                </h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-coffee-100"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-6 sm:py-8">
                    <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-coffee-300 mx-auto mb-3 sm:mb-4" />
                    <p className="text-coffee-600 text-sm sm:text-base">
                      Your cart is empty
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 sm:space-x-3 bg-coffee-50 rounded-lg p-2 sm:p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-coffee-900 text-sm sm:text-base truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-coffee-600">
                            ${item.price} each
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeFromCart(item.id)}
                            className="bg-coffee-200 text-coffee-700 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                          >
                            <Minus size={12} className="sm:w-4 sm:h-4" />
                          </motion.button>
                          <span className="font-bold text-coffee-900 w-5 sm:w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(item)}
                            className="bg-coffee-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                          >
                            <Plus size={12} className="sm:w-4 sm:h-4" />
                          </motion.button>
                        </div>
                        <span className="font-bold text-coffee-900 text-sm sm:text-base">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t bg-white p-3 sm:p-4 space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-coffee-900">
                      Total:
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-coffee-900">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowOrderForm(true)}
                    className="w-full bg-coffee-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center space-x-2"
                  >
                    <Check size={18} className="sm:w-5 sm:h-5" />
                    <span>Place Order ({getTotalItems()} items)</span>
                  </motion.button>

                  <div className="text-center space-y-1">
                    <p className="text-xs sm:text-sm text-coffee-600 flex items-center justify-center space-x-1">
                      <MapPin size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span>Pick up at counter</span>
                    </p>
                    <p className="text-xs sm:text-sm text-coffee-600 flex items-center justify-center space-x-1">
                      <Phone size={12} className="sm:w-3.5 sm:h-3.5" />
                      <span>Call us at (555) 123-CAFE for questions</span>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Order Form Modal */}
      <AnimatePresence>
        {showOrderForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => !isSubmitting && setShowOrderForm(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl flex flex-col"
              style={{ maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Header */}
              <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                <h3 className="text-xl font-bold text-coffee-900">
                  Complete Your Order
                </h3>
                {!isSubmitting && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowOrderForm(false)}
                    className="p-2 rounded-full hover:bg-coffee-100"
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-coffee-50 border-b flex-shrink-0">
                <h4 className="font-semibold text-coffee-900 mb-2">
                  Order Summary
                </h4>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={orderData.name}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={orderData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        required
                        className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={orderData.email}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-coffee-900 mb-1">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="specialInstructions"
                        value={orderData.specialInstructions}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        rows={3}
                        className="w-full px-3 py-2 border border-coffee-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent resize-none"
                        placeholder="Any special requests or dietary restrictions..."
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Fixed Footer with Submit Button */}
              <div className="border-t bg-white p-4 flex-shrink-0">
                <div className="space-y-3">
                  <motion.button
                    type="submit"
                    onClick={handleOrderSubmit}
                    disabled={isSubmitting}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-coffee-600 hover:bg-coffee-700"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      <>
                        <Check size={20} />
                        <span>
                          Confirm Order - ${getTotalPrice().toFixed(2)}
                        </span>
                      </>
                    )}
                  </motion.button>

                  <div className="text-center space-y-1">
                    <p className="text-sm text-coffee-600 flex items-center justify-center space-x-1">
                      <MapPin size={14} />
                      <span>Pick up at counter</span>
                    </p>
                    <p className="text-sm text-coffee-600 flex items-center justify-center space-x-1">
                      <Clock size={14} />
                      <span>Estimated time: 15-20 minutes</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Success/Error Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setOrderSuccess(null)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6,
              }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success State */}
              {orderSuccess.type === "success" && (
                <>
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.1 }}
                      transition={{ delay: 0.2, duration: 1 }}
                      className="absolute -top-10 -right-10 w-40 h-40 bg-green-500 rounded-full"
                    />
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.1 }}
                      transition={{ delay: 0.4, duration: 1 }}
                      className="absolute -bottom-10 -left-10 w-32 h-32 bg-coffee-500 rounded-full"
                    />
                  </div>

                  {/* Floating Success Elements */}
                  <div className="relative">
                    {/* Success Icon with Animation */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />

                      {/* Sparkle animations */}
                      <motion.div
                        animate={{
                          rotate: 360,
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          rotate: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          scale: {
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        className="absolute -top-2 -right-2"
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>

                      <motion.div
                        animate={{
                          rotate: -360,
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          rotate: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          scale: {
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        className="absolute -bottom-2 -left-2"
                      >
                        <Heart className="w-5 h-5 text-pink-400" />
                      </motion.div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl font-bold text-gray-900 mb-2"
                    >
                      Order Placed Successfully! 🎉
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-3 mb-6"
                    >
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-lg font-semibold text-green-800">
                          Order #{orderSuccess.data?.orderNumber}
                        </p>
                        <div className="flex items-center justify-center space-x-2 mt-2 text-green-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            Estimated time: {orderSuccess.data?.estimatedTime}{" "}
                            minutes
                          </span>
                        </div>
                      </div>

                      <div className="bg-coffee-50 border border-coffee-200 rounded-lg p-3">
                        <div className="flex items-center justify-center space-x-2 text-coffee-700">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Pick up at counter
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setOrderSuccess(null);
                          // Could add order tracking functionality here
                        }}
                        className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
                      >
                        <Trophy className="w-5 h-5" />
                        <span>Track Order</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOrderSuccess(null)}
                        className="w-full bg-coffee-100 text-coffee-700 py-3 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
                      >
                        <Home className="w-5 h-5" />
                        <span>Continue Browsing</span>
                      </motion.button>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Error State */}
              {orderSuccess.type === "error" && (
                <>
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.1 }}
                      transition={{ delay: 0.2, duration: 1 }}
                      className="absolute -top-10 -right-10 w-40 h-40 bg-red-500 rounded-full"
                    />
                  </div>

                  <div className="relative">
                    {/* Error Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <X className="w-10 h-10 text-white" />
                    </motion.div>

                    {/* Error Message */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl font-bold text-gray-900 mb-2"
                    >
                      Oops! Something went wrong
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-600 mb-6"
                    >
                      {orderSuccess.message || "Please try again"}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOrderSuccess(null)}
                        className="w-full bg-red-500 text-white py-3 px-6 rounded-xl font-semibold"
                      >
                        Try Again
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOrderSuccess(null)}
                        className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold"
                      >
                        Close
                      </motion.button>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRMenuPage;
