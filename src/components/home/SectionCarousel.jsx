//src/components/home/SectionCarousel.jsx

import { useState } from 'react';
import { Link } from 'react-router';
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";

// --- Helper Component for Individual Items ---
const CarouselItem = ({ item, aspectRatio }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false); 

  return (
    <Link
      to={item.path}
      // Responsive Widths
      className="shrink-0 block group/card select-none w-[40vw] sm:w-[30vw] md:w-[22vw] lg:w-[17vw] xl:w-[15vw]"
    >
      <div className="w-full">
        {/* Image Container - Use dynamic aspect ratio prop, fallback to 4/5 */}
        <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${aspectRatio || 'aspect-4/5'}`}>
          
          {hasError ? (
            // FALLBACK UI
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-gray-400 font-bold text-xl">
                {item.brand ? item.brand[0] : 'N/A'}
              </span>
            </div>
          ) : (
            <>
              {/* SKELETON LOADER */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
              )}

              <img
                src={item.img}
                alt={item.brand}
                draggable="false"
                className={`h-full w-full object-cover transition-all duration-500 group-hover/card:scale-110 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  setIsLoaded(true);
                  setHasError(true);
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-3 pt-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                <p className="text-white font-bold text-lg leading-tight drop-shadow-md truncate">
                  {item.brand}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Text */}
        <div className="mt-3 text-center">
          <span className="text-sm font-bold text-gray-900 md:text-base">
            {item.discount}
          </span>
        </div>
      </div>
    </Link>
  );
};

// --- Main Component ---
const SectionCarousel = ({ title, items, aspectRatio }) => {
  const scrollRef = useHorizontalScroll();
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!items || items.length === 0) return null;

  // --- Drag Handlers ---
  const handleMouseDown = (e) => {
    setIsDown(true);
    const slider = scrollRef.current;
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
    slider.style.scrollBehavior = 'auto'; 
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = scrollRef.current;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="my-8 border-b border-gray-100 pb-8 last:border-0">
      <div className="container mx-auto mb-4 px-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          {title}
          <span className="block mt-1 h-1 w-12 bg-red-600 rounded-full"></span>
        </h2>
        <Link to="/" className="text-sm font-semibold text-red-600 hover:text-red-700 hidden md:block">
          View All &gt;
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div
          ref={scrollRef}
          className={`flex gap-4 overflow-x-auto no-scrollbar cursor-grab ${isDown ? 'cursor-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollBehavior: isDown ? 'auto' : 'smooth' }}
        >
          {items.map((item) => (
            <CarouselItem key={item.id} item={item} aspectRatio={aspectRatio} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCarousel;