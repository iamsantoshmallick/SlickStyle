// src/pages/CategoryPage.jsx
import { useEffect, useMemo } from "react"; // Changed import
import { useParams, Link } from "react-router";
import { useDispatch } from "react-redux";
import { setGender } from "../features/shop/shopSlice";
import { ChevronDown, SlidersHorizontal } from "lucide-react"; 

//Components
import ProductCard from "../components/shared/ProductCard";
import Breadcrumbs from "../components/shared/Breadcrumbs";

// Data
import productData from "../data/productData.json";

// Helper to normalize strings
const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "-");

const CategoryPage = () => {
  const { gender, category } = useParams();
  const dispatch = useDispatch();

  // 1. Update Global Gender State
  // This side effect is okay because it syncs URL -> Redux Store
  useEffect(() => {
    if (gender) {
      dispatch(setGender(gender));
    }
  }, [gender, dispatch]);

  // 2. Filter Logic (FIXED: Using useMemo instead of useEffect+useState)
  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const pBreadcrumbs = product.breadcrumbs || [];
      
      // Check Gender (index 1 in breadcrumbs: ["Home", "Men", ...])
      const productGender = normalize(pBreadcrumbs[1]);
      const currentGender = normalize(gender);

      // Check Category
      const matchesCategory = pBreadcrumbs.some(
        (crumb) => normalize(crumb) === category
      );

      const isNewArrival = category === "new" || category === "new-in";

      if (productGender !== currentGender) return false;
      if (isNewArrival) return true;
      
      return matchesCategory;
    });
  }, [gender, category]); // Only re-calculate when URL params change

  // Capitalize for display title
//   const displayTitle = category?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

//   return (
//     <div className="min-h-screen bg-white pb-10">
//       {/* Header / Title Bar */}
//       <div className="sticky top-64px z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-4 md:px-8">
//         <div className="flex items-center justify-between max-w-7xl mx-auto">
//           <div>
//             <div className="text-xs text-gray-500 mb-1 capitalize">
//               Home / {gender} / <span className="text-black font-medium">{displayTitle}</span>
//             </div>
//             <h1 className="text-xl md:text-2xl font-bold text-gray-900">
//               {displayTitle} <span className="text-gray-400 font-normal text-lg">({filteredProducts.length})</span>
//             </h1>
//           </div>
//           <Breadcrumbs />

//           <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-bold hover:border-black transition-colors">
//             <SlidersHorizontal size={16} />
//             Filters
//             <ChevronDown size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
//         {filteredProducts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <h2 className="text-xl font-bold text-gray-900">No products found</h2>
//             <p className="text-gray-500 mt-2">We couldn't find any items in this category.</p>
//             <Link to={`/${gender}`} className="mt-4 px-6 py-2 bg-black text-white rounded-md font-bold hover:bg-gray-800">
//               Back to {gender === 'men' ? 'Men' : 'Women'} Home
//             </Link>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
//             {filteredProducts.map((item) => (
//               <Link to={`/product/${item.id}`} key={item.id} className="group block">
//                 <div className="relative overflow-hidden rounded-md bg-gray-100 mb-3 aspect-4/5">
//                   <img
//                     src={item.images?.[0]}
//                     alt={item.title}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     onError={(e) => { e.target.style.display='none'; e.target.parentNode.classList.add('flex','items-center','justify-center'); e.target.parentNode.innerText='No Image'; }}
//                   />
//                   {item.discount && (
//                     <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 text-[10px] font-bold text-red-600 backdrop-blur-sm rounded-sm">
//                       {item.discount}
//                     </div>
//                   )}
//                 </div>

//                 <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">
//                   {item.brand}
//                 </h3>
//                 <h2 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
//                   {item.title}
//                 </h2>
//                 <div className="mt-2 flex items-baseline gap-2">
//                   <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
//                   <span className="text-xs text-gray-500 line-through">₹{item.mrp}</span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
return (
    <div className="min-h-screen bg-white pb-10">
      
      {/* HEADER SECTION */}
      <div className="sticky top-64px z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          
          {/* 1. Breadcrumbs (Auto-generated) */}
          <Breadcrumbs />

          <div className="flex items-center justify-between mt-2 pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">
              {category?.replace(/-/g, " ")}{" "}
              <span className="text-gray-400 font-normal text-lg">
                ({filteredProducts.length})
              </span>
            </h1>

            {/* Filter Button */}
            <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-bold hover:border-black transition-colors bg-white">
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filters</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* BODY SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-xl font-bold text-gray-900">No products found</h2>
            <Link to={`/${gender}`} className="mt-4 px-6 py-2 bg-black text-white rounded-md font-bold">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {/* 2. Using the Reusable Card */}
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;