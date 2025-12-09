import { motion } from "framer-motion";
import { usePartyMode } from "../contexts/PartyModeContext";

export default function PartyBackground() {
  const { isPartyMode } = usePartyMode();

  if (!isPartyMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)",
            "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe)",
            "linear-gradient(225deg, #43e97b, #38f9d7, #667eea, #764ba2, #f093fb)",
            "linear-gradient(315deg, #ff9a56, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)",
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Pulsing overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

