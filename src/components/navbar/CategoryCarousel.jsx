import { NavLink } from "react-router";
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll.js';
const categories = [
  { name: "Hot Merch", img: "/merch-1.png", path: "/hot-merch" },
  { name: "Anime", img: "/merch-2.png", path: "/anime" },
  { name: "Cult Classics", img: "/merch-3.png", path: "/cult-classics" },
  { name: "Culture", img: "/merch-4.png", path: "/culture" },
  { name: "Hot Merch", img: "/merch-1.png", path: "/hot-merch" },
  { name: "Anime", img: "/merch-2.png", path: "/anime" },
  { name: "Cult Classics", img: "/merch-3.png", path: "/cult-classics" },
  { name: "Culture", img: "/merch-4.png", path: "/culture" },
];

const CategoryCarousel = () => {
  const scrollContainerRef = useHorizontalScroll(); 
  return (
    <section className="py-1">
      <div
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar"
      >
        {categories.map((cat, index) => (
          // Added index to key since names can repeat (as per your example data)
          <NavLink to={cat.path} key={cat.name + index} className="shrink-0">
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
    </section>
  );
};

export default CategoryCarousel;