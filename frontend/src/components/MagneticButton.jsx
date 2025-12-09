import { useRef, useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

// Replace with React Bits MagneticButton when available – same props

export default function MagneticButton({ 
  children, 
  as = "button", 
  href, 
  className = "",
  ...props 
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring animations for smooth magnetic effect
  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrame;

    const handleMouseMove = (event) => {
      if (!isHovered) return;
      
      // Only apply magnetic effect on devices that support hover
      if (!window.matchMedia("(hover: hover)").matches) return;

      cancelAnimationFrame(animationFrame);
      
      animationFrame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        
        // Limit the magnetic pull to a reasonable distance
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.min(rect.width, rect.height) * 0.8;
        
        if (distance < maxDistance) {
          const strength = Math.min(distance / maxDistance, 1);
          const pullX = (deltaX / distance) * strength * 8;
          const pullY = (deltaY / distance) * strength * 8;
          
          x.set(pullX);
          y.set(pullY);
        }
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      cancelAnimationFrame(animationFrame);
      x.set(0);
      y.set(0);
    };

    // Attach global mouse move listener for smooth tracking
    document.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered, x, y]);

  const Component = as;
  const componentProps = {
    ref,
    className,
    ...(href && as === "a" ? { href } : {}),
    ...props
  };

  return (
    <Component {...componentProps}>
      <motion.span
        style={{ x, y }}
        className="inline-block"
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      >
        {children}
      </motion.span>
    </Component>
  );
}

