import React from "react";
import Lottie from "lottie-react";

/* 
  HOW TO USE LOTTIE ANIMATIONS:
  
  1. Download Lottie JSON files from:
     - LottieFiles.com
     - After Effects export
     - Custom animations
  
  2. Save them in src/assets/animations/
  
  3. Import and use like this:
*/

// Example usage with a Lottie file:
const LottieExample = () => {
  // Uncomment and modify these lines when you have Lottie JSON files:

  // import coffeeAnimation from '../assets/animations/coffee-brewing.json';
  // import loadingAnimation from '../assets/animations/loading.json';

  // return (
  //   <Lottie
  //     animationData={coffeeAnimation}
  //     loop={true}
  //     autoplay={true}
  //     style={{ width: 200, height: 200 }}
  //   />
  // );

  return (
    <div className="text-center p-8 bg-coffee-50 rounded-lg">
      <h3 className="text-xl font-display font-bold text-coffee-900 mb-4">
        🎨 Ready for Lottie Animations!
      </h3>
      <p className="text-coffee-700 mb-4">
        Your website is now set up with Lottie React. Here's how to add
        animations:
      </p>
      <div className="text-left bg-white p-4 rounded-lg shadow-sm">
        <ol className="list-decimal list-inside space-y-2 text-sm text-coffee-800">
          <li>Download animations from LottieFiles.com</li>
          <li>Save JSON files in src/assets/animations/</li>
          <li>
            Import:{" "}
            <code className="bg-coffee-100 px-1 rounded">
              import animation from './path/to/animation.json'
            </code>
          </li>
          <li>
            Use:{" "}
            <code className="bg-coffee-100 px-1 rounded">
              &lt;Lottie animationData={animation} /&gt;
            </code>
          </li>
        </ol>
      </div>
      <div className="mt-4 p-3 bg-cream-100 rounded-lg">
        <p className="text-sm text-coffee-700">
          <strong>Popular coffee animations to search for:</strong>
          <br />
          "coffee brewing", "steam animation", "coffee beans", "drip coffee",
          "espresso machine"
        </p>
      </div>
    </div>
  );
};

// Ready-to-use Lottie wrapper component with JSON loading
const LottieWrapper = ({
  animationPath = "/animations/coffee-brewing.json",
  className = "",
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  speed = 1,
  fallback = null,
}) => {
  const [animationData, setAnimationData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch(animationPath);
        if (!response.ok) {
          throw new Error("Failed to load animation");
        }
        const data = await response.json();
        setAnimationData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading Lottie animation:", err);
        setError(true);
        setLoading(false);
      }
    };

    loadAnimation();
  }, [animationPath]);

  if (loading) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2 animate-bounce">☕</div>
          <div className="text-coffee-700 font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !animationData) {
    return fallback || <LottieExample />;
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        style={{ width, height }}
      />
    </div>
  );
};

export default LottieWrapper;
export { LottieExample };
