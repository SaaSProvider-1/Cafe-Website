import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";

const GoogleMap = ({
  address = "123 Coffee Street, Brew City, BC 12345",
  businessName = "Cafe Elite",
  embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019284393434!2d-122.39866668468141!3d37.79133797975836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c4b2f5c9f%3A0x6e8b6e6e6e6e6e6e!2sBlue%20Bottle%20Coffee!5e0!3m2!1sen!2sus!4v1609876543210!5m2!1sen!2sus",
  height = "h-64",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const getDirectionsUrl = () => {
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${height} bg-coffee-200 rounded-2xl overflow-hidden shadow-lg relative group ${className}`}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-300 to-coffee-400 animate-pulse rounded-2xl flex items-center justify-center">
          <div className="text-center text-coffee-700">
            <MapPin size={32} className="mx-auto mb-2 animate-bounce" />
            <p className="text-sm font-medium">Loading map...</p>
          </div>
        </div>
      )}

      {/* Google Maps Iframe */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-2xl transition-all duration-300 group-hover:brightness-110"
        title={`${businessName} Location - ${address}`}
        onLoad={handleIframeLoad}
      ></iframe>

      {/* Business Info Overlay */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="flex items-center space-x-2">
          <MapPin size={16} className="text-coffee-600" />
          <div>
            <p className="text-sm font-semibold text-coffee-900">
              {businessName}
            </p>
            <p className="text-xs text-coffee-600">{address.split(",")[0]}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex space-x-2">
        {/* Get Directions Button */}
        <motion.a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-coffee-600 hover:bg-coffee-700 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1 transition-colors duration-300"
        >
          <Navigation size={12} />
          <span>Directions</span>
        </motion.a>

        {/* View in Maps Button */}
        <motion.a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center space-x-1 transition-colors duration-300"
        >
          <ExternalLink size={12} />
          <span>View</span>
        </motion.a>
      </div>

      {/* Interactive Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"></div>
    </motion.div>
  );
};

export default GoogleMap;
