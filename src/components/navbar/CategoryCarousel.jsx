import { useState, useRef, useEffect } from 'react'; // 1. Import useRef and useEffect
import { NavLink } from 'react-router';

// NOTE: Make sure these images are in your /public folder
const categories = [
  { name: 'Hot Merch', img: '/merch-1.png', path: '/hot-merch' },
  { name: 'Anime', img: '/merch-2.png', path: '/anime' },
  { name: 'Cult Classics', img: '/merch-3.png', path: '/cult-classics' },
  { name: 'Culture', img: '/merch-4.png', path: '/culture' },
  // Add more...
];


const CategoryCarousel = () => {
  const [isOpen, setIsOpen] = useState(true); // Default to true as it is in the menu
  const scrollContainerRef = useRef(null); // 2. Create a ref for the scrollable div

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 3. Add this useEffect to handle the wheel scroll
  useEffect(() => {
    const container = scrollContainerRef.current; // Get the DOM element

    if (container) {
      // This function will be our event listener
      const handleWheelScroll = (e) => {
        // If the user is scrolling vertically (e.deltaY is not 0)
        if (e.deltaY !== 0) {
          // 1. Prevent the default vertical scroll (stops the menu from scrolling)
          e.preventDefault();
          
          // 2. Apply the vertical scroll amount to the horizontal scrollLeft
          container.scrollLeft += e.deltaY;
        }
      };

      // Add the event listener to the carousel container
      container.addEventListener('wheel', handleWheelScroll);

      // Cleanup: Remove the event listener when the component unmounts
      return () => {
        container.removeEventListener('wheel', handleWheelScroll);
      };
    }
  }, [isOpen]); // Re-run this effect when 'isOpen' changes
  // This is important because the div with the ref is only rendered when isOpen is true.

  return (
    <section className="py-1">
      {/* Heading */}
      <div className="mb-4 flex items-center justify-between" onClick={handleDropdown}>
        <h2 className="text-xl font-bold text-gray-900">Categories</h2>
        <button>
          {isOpen ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          }
        </button>
      </div>
      {isOpen && (
        <div 
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {categories.map((cat) => (
            <NavLink 
              to={cat.path} 
              key={cat.name} 
              className="shrink-0"
            >
              <div className="w-24 text-center md:w-28">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-24 w-24 rounded-lg object-cover md:h-28 md:w-28"
                />
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  {cat.name}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryCarousel;