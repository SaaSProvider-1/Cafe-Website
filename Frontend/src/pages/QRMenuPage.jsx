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
} from "lucide-react";
import { coffeeMenu, categories } from "../data/menuData";

const QRMenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-coffee-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-coffee-200/30">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Coffee className="h-8 w-8 text-coffee-600" />
              <div>
                <h1 className="font-display text-xl font-bold text-coffee-900">
                  Café Elite
                </h1>
                <p className="text-sm text-coffee-600">Digital Menu</p>
              </div>
            </div>

            {/* Cart Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative bg-coffee-600 text-white p-3 rounded-full shadow-lg"
            >
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="px-4 py-6 bg-coffee-600 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome to Our Digital Menu!
        </h2>
        <p className="text-coffee-100">
          Browse our menu and place your order directly from your phone
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-4 bg-white border-b">
        <div className="flex overflow-x-auto space-x-3 pb-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-coffee-600 text-white shadow-lg"
                  : "bg-coffee-100 text-coffee-700 hover:bg-coffee-200"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="whitespace-nowrap">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4 space-y-4">
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
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-coffee-900 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center ml-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-coffee-600 ml-1">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-coffee-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-coffee-900">
                        ${item.price}
                      </span>
                      <div className="flex items-center space-x-2 text-xs text-coffee-500">
                        <Clock size={12} />
                        <span>{item.prepTime}min</span>
                        <Flame size={12} className="text-orange-500" />
                        <span>{item.caffeine}</span>
                      </div>
                    </div>

                    {/* Add to Cart Controls */}
                    {quantity === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(item)}
                        className="bg-coffee-600 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center space-x-1"
                      >
                        <Plus size={16} />
                        <span>Add</span>
                      </motion.button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item.id)}
                          className="bg-coffee-200 text-coffee-700 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </motion.button>
                        <span className="font-bold text-coffee-900 w-8 text-center">
                          {quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(item)}
                          className="bg-coffee-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
                        >
                          <Plus size={16} />
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
      <div className="h-24"></div>

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
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-xl font-bold text-coffee-900">
                  Your Order
                </h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-coffee-100"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-16 w-16 text-coffee-300 mx-auto mb-4" />
                    <p className="text-coffee-600">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 bg-coffee-50 rounded-lg p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-coffee-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-coffee-600">
                            ${item.price} each
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeFromCart(item.id)}
                            className="bg-coffee-200 text-coffee-700 w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            <Minus size={16} />
                          </motion.button>
                          <span className="font-bold text-coffee-900 w-8 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(item)}
                            className="bg-coffee-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
                          >
                            <Plus size={16} />
                          </motion.button>
                        </div>
                        <span className="font-bold text-coffee-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t bg-white p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-coffee-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-coffee-900">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-coffee-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2"
                  >
                    <Check size={20} />
                    <span>Place Order ({getTotalItems()} items)</span>
                  </motion.button>

                  <div className="text-center space-y-1">
                    <p className="text-sm text-coffee-600 flex items-center justify-center space-x-1">
                      <MapPin size={14} />
                      <span>Pick up at counter</span>
                    </p>
                    <p className="text-sm text-coffee-600 flex items-center justify-center space-x-1">
                      <Phone size={14} />
                      <span>Call us at (555) 123-CAFE for questions</span>
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRMenuPage;
