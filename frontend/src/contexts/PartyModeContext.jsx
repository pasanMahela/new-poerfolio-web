import { createContext, useContext, useState, useEffect } from "react";

const PartyModeContext = createContext();

export const usePartyMode = () => {
  const context = useContext(PartyModeContext);
  if (!context) {
    throw new Error("usePartyMode must be used within a PartyModeProvider");
  }
  return context;
};

export function PartyModeProvider({ children }) {
  const [isPartyMode, setIsPartyMode] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      // Ctrl+Shift+E combination
      if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        event.preventDefault();
        setIsPartyMode(prev => !prev);
        
        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(100);
        }
        
        // Show toast notification
        const toast = document.createElement('div');
        toast.textContent = isPartyMode ? 'Party Mode OFF' : 'Party Mode ON! 🎉';
        toast.className = 'fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce';
        document.body.appendChild(toast);
        
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 2000);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isPartyMode]);

  // Apply party mode styles to document
  useEffect(() => {
    if (isPartyMode) {
      document.documentElement.classList.add('party-mode');
    } else {
      document.documentElement.classList.remove('party-mode');
    }
  }, [isPartyMode]);

  return (
    <PartyModeContext.Provider value={{ isPartyMode, setIsPartyMode }}>
      {children}
    </PartyModeContext.Provider>
  );
}

