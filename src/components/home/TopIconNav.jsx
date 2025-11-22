import { NavLink } from "react-router";
import { useEffect, useRef, useState } from "react";

// Sub-component to handle individual image loading
const NavItem = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <NavLink
      to={item.path}
      className="group flex flex-col items-center shrink-0"
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden rounded-full border-2 border-transparent group-hover:border-red-500 group-hover:shadow-md transition-colors duration-300"
        style={{
          height: "calc(4rem * (1 - var(--scroll-progress)))",
          width: "calc(4rem * (1 - var(--scroll-progress)))",
          opacity: "calc(1 - (var(--scroll-progress) * 1.5))",
          marginBottom: "calc(0.5rem * (1 - var(--scroll-progress)))",
          transform: "scale(calc(1 - (var(--scroll-progress) * 0.2)))",
        }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
        )}

        <img
          src={item.img}
          alt={item.name}
          className={`h-full w-full object-cover group-hover:scale-110 transition-all duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setIsLoaded(true);
            e.target.style.display = "none";
            e.target.parentNode.style.backgroundColor = "#e5e7eb";
          }}
        />
      </div>

      {/* Label */}
      <span
        className="font-bold text-gray-700 group-hover:text-red-600 whitespace-nowrap transition-colors duration-200"
        style={{
          fontSize: "calc(0.875rem - (var(--scroll-progress) * 0.125rem))",
          lineHeight: "1",
        }}
      >
        {item.name}
      </span>
    </NavLink>
  );
};

const TopIconNav = ({ data }) => {
  const navRef = useRef(null);
  
  // Refs to track scroll values without re-rendering
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Just update the TARGET. Don't animate yet.
      targetScroll.current = window.scrollY;
    };

    // Animation Loop
    let rafId;
    const updateAnimation = () => {
      if (!navRef.current) return;

      // LERP: Linear Interpolation
      // Move 'current' 10% of the way towards 'target' every frame.
      // This smooths out the "jumps" from mouse wheels.
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.1;

      const range = 120; // Slightly increased range for mouse wheel feel
      let progress = currentScroll.current / range;

      // Precision clamp to prevent micro-jitters near 0 or 1
      if (progress > 0.99) progress = 1;
      if (progress < 0.01) progress = 0;

      // Only update DOM if values changed significantly (optimization)
      // or if we haven't hit the bounds yet
      navRef.current.style.setProperty("--scroll-progress", progress);

      rafId = requestAnimationFrame(updateAnimation);
    };

    window.addEventListener("scroll", handleScroll);
    // Start the loop
    updateAnimation();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!data) return null;

  return (
    <div
      ref={navRef}
      className="sticky top-[70px] z-40 overflow-hidden transition-shadow duration-200 bg-gray-50"
      style={{
        "--scroll-progress": 0,
        backgroundColor: "rgba(255, 255, 255, var(--scroll-progress))",
        backdropFilter: "blur(8px)",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, calc(var(--scroll-progress) * 0.1))",
        borderBottom:
          "1px solid rgba(0,0,0, calc(var(--scroll-progress) * 0.05))",
      }}
    >
      <div
        className="container mx-auto ps-2 md:px-4"
        style={{
          paddingTop: "calc(1rem - (var(--scroll-progress) * 0.5rem))",
          paddingBottom: "calc(1rem - (var(--scroll-progress) * 0.5rem))",
        }}
      >
        <div className="flex gap-6 overflow-x-auto md:flex-wrap md:justify-center md:overflow-hidden no-scrollbar items-end">
          {data.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopIconNav;