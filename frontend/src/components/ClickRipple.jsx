import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickRipple() {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Only show on devices that support pointer events
    if (!window.PointerEvent) return;

    const handleClick = (event) => {
      // Don't show ripples on input elements or buttons
      if (['INPUT', 'BUTTON', 'A', 'TEXTAREA'].includes(event.target.tagName)) {
        return;
      }

      const rippleId = Date.now() + Math.random();
      const newRipple = {
        id: rippleId,
        x: event.clientX,
        y: event.clientY,
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
      }, 800);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-sky-400/30 bg-sky-400/10"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
            }}
            initial={{ width: 40, height: 40, opacity: 0.8 }}
            animate={{ 
              width: 120, 
              height: 120, 
              opacity: 0,
              x: -30,
              y: -30
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

