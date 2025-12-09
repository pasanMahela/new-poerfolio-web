import { useEffect, useState } from "react";
import { usePartyMode } from "../contexts/PartyModeContext";

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { isPartyMode } = usePartyMode();

  useEffect(() => {
    // Only show on desktop devices that support hover
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      
      // Update CSS variables for the spotlight position
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main spotlight effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: isPartyMode ? 0.3 : 0.8,
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), transparent 0%, rgba(0, 0, 0, ${isPartyMode ? 0.2 : 0.4}) 70%)`,
        }}
      />
      
      {/* Inner bright spotlight */}
      <div 
        className="fixed inset-0 pointer-events-none z-9 mix-blend-soft-light dark:mix-blend-screen transition-opacity duration-300"
        style={{
          opacity: isPartyMode ? 0.8 : 0.6,
          background: `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, ${isPartyMode ? 0.3 : 0.1}) 0%, transparent 50%)`,
        }}
      />
    </>
  );
}
