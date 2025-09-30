import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { QrCode, Smartphone, Menu as MenuIcon, Download } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const QRCodeMenu = () => {
  const [ref, isInView] = useScrollAnimation(0.2);
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    // Get the current domain and create URL for QR menu page
    const currentDomain = "https://cafe-website-gules.vercel.app";
    const menuUrl = `${currentDomain}/qr-menu`;
    setQrValue(menuUrl);
  }, []);

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "cafe-elite-menu-qr.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <section
      id="qr-menu"
      className="py-16 md:py-20 bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-40 h-40 border-2 border-coffee-400/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-32 h-32 border-2 border-coffee-300/20 rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-coffee-300 font-semibold text-lg tracking-wider uppercase mb-4 block">
            Quick Access
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Scan & Browse
            <span className="block text-coffee-300">Our Menu</span>
          </h2>
          <p className="text-xl text-coffee-200 max-w-3xl mx-auto leading-relaxed">
            Scan the QR code below with your smartphone to instantly access our
            mobile-optimized menu and place your order directly from your phone
            - no app needed!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full">
              <div className="text-center mb-6">
                <QrCode className="h-8 w-8 text-coffee-600 mx-auto mb-3" />
                <h3 className="font-display text-2xl font-bold text-coffee-900 mb-2">
                  Menu QR Code
                </h3>
                <p className="text-coffee-600 text-sm">
                  Point your camera at the code below
                </p>
              </div>

              {qrValue && (
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-xl border-2 border-coffee-100">
                    <QRCode
                      id="qr-code"
                      value={qrValue}
                      size={200}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      viewBox="0 0 256 256"
                      bgColor="#ffffff"
                      fgColor="#8B4513"
                      level="H"
                    />
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadQR}
                className="w-full bg-coffee-600 hover:bg-coffee-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>Download QR Code</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Instructions Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-3xl font-bold text-white mb-6">
                How to Use
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: <Smartphone className="h-6 w-6" />,
                    title: "Open Your Camera",
                    description:
                      "Use your smartphone's built-in camera app or QR code scanner",
                  },
                  {
                    icon: <QrCode className="h-6 w-6" />,
                    title: "Point at QR Code",
                    description:
                      "Aim your camera at the QR code until it's recognized",
                  },
                  {
                    icon: <MenuIcon className="h-6 w-6" />,
                    title: "Browse & Order",
                    description:
                      "Browse our menu, add items to cart, and place your order instantly",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-coffee-600 rounded-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-white mb-1">
                        {step.title}
                      </h4>
                      <p className="text-coffee-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-coffee-800/50 rounded-2xl p-6 border border-coffee-600/30"
            >
              <h4 className="font-semibold text-lg text-white mb-3">
                💡 Pro Tip
              </h4>
              <p className="text-coffee-300 leading-relaxed">
                The QR menu works like KFC or McDonald's - scan once and order
                directly from your phone! No apps to download, no account
                needed. Just scan, browse, and order!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeMenu;
