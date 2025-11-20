import { NavLink } from "react-router";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll.js";

// 1. Accept 'data' as a prop
const CategoryCarousel = ({ data }) => {
  const scrollContainerRef = useHorizontalScroll();

  // Safety check: if data is undefined or empty, don't render anything
  if (!data || data.length === 0) return null;

  return (
    <section className="py-5 px-5">
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {/* 2. Map directly over the passed 'data' prop */}
        {data.map((cat, index) => (
          <NavLink
            to={cat.path}
            key={`${cat.name}-${index}`}
            className="shrink-0"
          >
            <div className="w-24 text-center md:w-28">
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML =
                      '<span class="text-xs text-gray-400">No Img</span>';
                    e.target.parentNode.classList.add(
                      "flex",
                      "items-center",
                      "justify-center"
                    );
                  }}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-gray-800 truncate">
                {cat.name}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default CategoryCarousel;
