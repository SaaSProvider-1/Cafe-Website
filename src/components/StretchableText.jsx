import React from "react";
import { motion } from "framer-motion";

const StretchableText = ({ 
  children, 
  className = "", 
  tag = "span",
  animationType = "stretch",
  duration = 0.6,
  intensity = "medium",
  ...props 
}) => {
  const getAnimationVariants = () => {
    const intensityValues = {
      low: { scale: 1.05, scaleX: 1.08, y: -2 },
      medium: { scale: 1.1, scaleX: 1.15, y: -4 },
      high: { scale: 1.15, scaleX: 1.2, y: -6 }
    };

    const values = intensityValues[intensity] || intensityValues.medium;

    switch (animationType) {
      case "stretch":
        return {
          rest: { 
            scaleX: 1, 
            scaleY: 1,
            y: 0,
            rotateX: 0,
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            scaleX: values.scaleX, 
            scaleY: 0.95,
            y: values.y,
            rotateX: 2,
            textShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            transition: { 
              type: "spring", 
              stiffness: 300, 
              damping: 15 
            }
          }
        };

      case "elastic":
        return {
          rest: { 
            scale: 1, 
            rotate: 0,
            y: 0,
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            scale: [1, values.scale, 1],
            rotate: [0, 2, -1, 0],
            y: [0, values.y, 0],
            textShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "0px 6px 12px rgba(0,0,0,0.15)",
              "0px 0px 0px rgba(0,0,0,0)"
            ],
            transition: { 
              duration: duration,
              times: [0, 0.5, 1],
              ease: "easeInOut"
            }
          }
        };

      case "bounce":
        return {
          rest: { 
            y: 0, 
            scale: 1,
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            y: [0, values.y * -1.5, values.y, 0],
            scale: [1, values.scale, 1, 1],
            textShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "0px 8px 16px rgba(0,0,0,0.2)",
              "0px 4px 8px rgba(0,0,0,0.1)",
              "0px 0px 0px rgba(0,0,0,0)"
            ],
            transition: { 
              duration: duration,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut"
            }
          }
        };

      case "wave":
        return {
          rest: { 
            rotateX: 0, 
            rotateY: 0, 
            z: 0,
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            rotateX: [0, 15, -5, 0],
            rotateY: [0, 5, -3, 0],
            z: [0, 20, 0],
            textShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "0px 10px 20px rgba(0,0,0,0.25)",
              "0px 0px 0px rgba(0,0,0,0)"
            ],
            transition: { 
              duration: duration,
              times: [0, 0.5, 0.8, 1],
              ease: "easeInOut"
            }
          }
        };

      case "glow":
        return {
          rest: { 
            scale: 1,
            filter: "brightness(1) contrast(1)",
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            scale: values.scale,
            filter: "brightness(1.1) contrast(1.1)",
            textShadow: `0px 0px 20px rgba(251, 191, 36, 0.5), 0px 0px 40px rgba(251, 191, 36, 0.3)`,
            transition: { 
              duration: duration,
              ease: "easeInOut"
            }
          }
        };

      case "rubber":
        return {
          rest: { 
            scaleX: 1, 
            scaleY: 1,
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            scaleX: [1, values.scaleX * 1.2, values.scaleX * 0.8, values.scaleX],
            scaleY: [1, 0.8, 1.2, 1],
            textShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "0px 5px 15px rgba(0,0,0,0.15)",
              "0px 8px 20px rgba(0,0,0,0.2)",
              "0px 0px 0px rgba(0,0,0,0)"
            ],
            transition: { 
              duration: duration * 1.2,
              times: [0, 0.4, 0.7, 1],
              ease: "easeInOut"
            }
          }
        };

      case "shake":
        return {
          rest: { 
            x: 0, 
            rotate: 0,
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            x: [0, -3, 3, -2, 2, 0],
            rotate: [0, -1, 1, -0.5, 0.5, 0],
            textShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "2px 2px 4px rgba(0,0,0,0.1)",
              "-2px 2px 4px rgba(0,0,0,0.1)",
              "2px -2px 4px rgba(0,0,0,0.1)",
              "-2px -2px 4px rgba(0,0,0,0.1)",
              "0px 0px 0px rgba(0,0,0,0)"
            ],
            transition: { 
              duration: duration * 0.8,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              ease: "easeInOut"
            }
          }
        };

      case "pulse":
        return {
          rest: { 
            scale: 1,
            opacity: 1,
            textShadow: "0px 0px 0px rgba(0,0,0,0)"
          },
          hover: { 
            scale: [1, values.scale * 1.1, values.scale, values.scale * 1.05, values.scale],
            opacity: [1, 0.9, 1, 0.95, 1],
            textShadow: [
              "0px 0px 0px rgba(0,0,0,0)",
              "0px 0px 15px rgba(139, 69, 19, 0.3)",
              "0px 0px 25px rgba(139, 69, 19, 0.4)",
              "0px 0px 20px rgba(139, 69, 19, 0.3)",
              "0px 0px 0px rgba(0,0,0,0)"
            ],
            transition: { 
              duration: duration * 1.5,
              times: [0, 0.25, 0.5, 0.75, 1],
              ease: "easeInOut",
              repeat: 2
            }
          }
        };

      default:
        return {
          rest: { scale: 1 },
          hover: { scale: values.scale }
        };
    }
  };

  const variants = getAnimationVariants();
  const MotionTag = motion[tag] || motion.span;

  return (
    <MotionTag
      className={`inline-block cursor-default ${className}`}
      variants={variants}
      initial="rest"
      whileHover="hover"
      style={{ 
        transformOrigin: "center",
        transformStyle: "preserve-3d"
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

// Pre-configured components for common use cases
export const StretchableH1 = (props) => (
  <StretchableText tag="h1" animationType="elastic" intensity="high" {...props} />
);

export const StretchableH2 = (props) => (
  <StretchableText tag="h2" animationType="stretch" intensity="medium" {...props} />
);

export const StretchableH3 = (props) => (
  <StretchableText tag="h3" animationType="bounce" intensity="medium" {...props} />
);

export const StretchableH4 = (props) => (
  <StretchableText tag="h4" animationType="wave" intensity="low" {...props} />
);

export const StretchableH5 = (props) => (
  <StretchableText tag="h5" animationType="rubber" intensity="medium" {...props} />
);

export const StretchableH6 = (props) => (
  <StretchableText tag="h6" animationType="shake" intensity="low" {...props} />
);

export const StretchableSpan = (props) => (
  <StretchableText tag="span" animationType="glow" intensity="low" {...props} />
);

export const StretchablePulse = (props) => (
  <StretchableText tag="span" animationType="pulse" intensity="medium" {...props} />
);

export const StretchableRubber = (props) => (
  <StretchableText tag="span" animationType="rubber" intensity="high" {...props} />
);

export const StretchableShake = (props) => (
  <StretchableText tag="span" animationType="shake" intensity="medium" {...props} />
);

export default StretchableText;