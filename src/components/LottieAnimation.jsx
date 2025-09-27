import React from "react";
import Lottie from "lottie-react";

// Since we can't load external Lottie files easily, I'll create animated components using motion
// But let me show you how to use Lottie when you have JSON files
const LottieAnimation = ({
  animationData,
  className = "",
  loop = true,
  autoplay = true,
  ...props
}) => {
  // For demo purposes, I'll create a fallback animation using CSS
  if (!animationData) {
    return (
      <div className={`inline-block ${className}`} {...props}>
        {/* Fallback coffee animation using pure CSS */}
        <div className="relative">
          <div className="w-16 h-20 bg-white border-4 border-coffee-400 rounded-b-3xl relative">
            {/* Coffee liquid */}
            <div className="absolute bottom-2 left-2 right-2 h-12 bg-gradient-to-t from-coffee-800 to-coffee-600 rounded-b-2xl animate-pulse"></div>
            {/* Handle */}
            <div className="absolute right-0 top-4 w-4 h-8 border-4 border-coffee-400 rounded-r-lg border-l-0"></div>
          </div>

          {/* Steam animation */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-12 bg-gradient-to-t from-white/60 to-transparent rounded-full animate-bounce opacity-60"></div>
            <div className="absolute left-2 w-1 h-10 bg-gradient-to-t from-white/40 to-transparent rounded-full animate-bounce delay-100 opacity-40"></div>
            <div className="absolute left-4 w-1 h-8 bg-gradient-to-t from-white/50 to-transparent rounded-full animate-bounce delay-200 opacity-50"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Lottie
      animationData={animationData}
      className={className}
      loop={loop}
      autoPlay={autoplay}
      {...props}
    />
  );
};

export default LottieAnimation;
