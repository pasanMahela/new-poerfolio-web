import { useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMousePos } from "../hooks/useMousePos";

export default function ParallaxImage({ 
  src, 
  alt, 
  strength = 15, 
  disabled = false,
  className = "",
  ...props 
}) {
  const ref = useRef(null);
  const { x, y } = useMousePos(ref);
  
  // Create smooth spring animations for the transform values
  const springConfig = { damping: 20, stiffness: 300 };
  const xSpring = useSpring(0, springConfig);
  const ySpring = useSpring(0, springConfig);
  
  // Transform mouse position to parallax offset
  const xRange = useTransform(xSpring, (value) => 
    disabled ? 0 : (value - 0.5) * strength
  );
  const yRange = useTransform(ySpring, (value) => 
    disabled ? 0 : (value - 0.5) * strength
  );

  const handleMouseEnter = () => {
    if (disabled || !ref.current) return;
    
    // Check if device supports hover (not touch device)
    if (window.matchMedia("(hover: hover)").matches) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      xSpring.set(centerX / rect.width);
      ySpring.set(centerY / rect.height);
    }
  };

  const handleMouseMove = (event) => {
    if (disabled || !ref.current) return;
    
    // Only apply parallax on devices that support hover
    if (window.matchMedia("(hover: hover)").matches) {
      const rect = ref.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      
      xSpring.set(x);
      ySpring.set(y);
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    
    xSpring.set(0.5);
    ySpring.set(0.5);
  };

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          x: xRange,
          y: yRange,
        }}
        className="h-full w-full object-cover"
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </div>
  );
}

