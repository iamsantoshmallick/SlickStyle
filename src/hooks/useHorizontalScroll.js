import { useEffect, useRef } from "react";

/**
 * Custom hook to enable horizontal scrolling on a DOM element when the
 * user uses the vertical mouse wheel over it.
 * * @returns {object} A ref object to be attached to the scrollable container.
 */
export const useHorizontalScroll = () => {
  // Create a ref for the scrollable div
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (container) {
      // Define the wheel scroll handler
      const handleWheelScroll = (e) => {
        // Check for vertical scroll movement
        if (e.deltaY !== 0) {
          // 1. Prevent the default vertical scroll of the window/menu
          e.preventDefault();

          // 2. Apply the vertical scroll amount to the horizontal scrollLeft
          // We use Math.abs(e.deltaY) to determine the scroll magnitude,
          // and Math.sign(e.deltaY) to determine direction.
          // Note: If you want scrolling to feel faster, multiply e.deltaY by a factor (e.g., * 2).
          container.scrollLeft += e.deltaY;
        }
      };

      // Add the event listener to the carousel container
      container.addEventListener("wheel", handleWheelScroll);

      // Cleanup: Remove the event listener when the component unmounts
      return () => {
        container.removeEventListener("wheel", handleWheelScroll);
      };
    }
  }, []); // Empty dependency array ensures it runs only once after mount

  return scrollRef;
};