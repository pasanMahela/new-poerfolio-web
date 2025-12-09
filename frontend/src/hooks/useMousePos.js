import { useState, useEffect } from "react";

export function useMousePos(ref) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handlePointerMove = (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      setPosition({ x, y });
    };

    element.addEventListener("pointermove", handlePointerMove);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
    };
  }, [ref]);

  return position;
}

