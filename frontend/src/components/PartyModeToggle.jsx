import { motion } from "framer-motion";
import { usePartyMode } from "../contexts/PartyModeContext";

export default function PartyModeToggle() {
  const { isPartyMode, setIsPartyMode } = usePartyMode();

  const handleToggle = () => {
    setIsPartyMode(prev => !prev);
    
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        relative inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200
        ${isPartyMode 
          ? 'border-purple-500 bg-purple-500 text-white shadow-lg' 
          : 'border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/40'
        }
      `}
      title={isPartyMode ? "Turn off Party Mode" : "Turn on Party Mode"}
      aria-label={isPartyMode ? "Turn off Party Mode" : "Turn on Party Mode"}
    >
      {/* Simple icon */}
      <div>
        {isPartyMode ? (
          // Party/Sparkle icon when active
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
          </svg>
        ) : (
          // Simple circle icon when inactive
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
        )}
      </div>

      {/* Text label */}
      <span className="hidden sm:inline">
        Party
      </span>
    </button>
  );
}
