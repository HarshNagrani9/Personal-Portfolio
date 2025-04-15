import { useState, useEffect } from "react";

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [previousPosition, setPreviousPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      if (position > previousPosition) {
        setDirection("down");
      } else if (position < previousPosition) {
        setDirection("up");
      }
      
      setPreviousPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [previousPosition]);

  return { scrollPosition, direction };
}
