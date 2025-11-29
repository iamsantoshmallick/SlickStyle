// src/components/shared/ProductCard.jsx
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-md bg-gray-100 mb-3 aspect-4/5">
        <img
          src={product.images?.[0] || product.img} // Handle both data structures (array vs string)
          alt={product.title || product.brand}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.classList.add("flex", "items-center", "justify-center");
            e.target.parentNode.innerHTML = '<span class="text-xs text-gray-400 font-medium">No Image</span>';
          }}
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute bottom-2 left-2 bg-white/95 px-2 py-1 text-[10px] font-bold text-red-600 backdrop-blur-sm rounded-sm shadow-sm">
            {product.discount}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide truncate">
          {product.brand}
        </h3>
        <h2 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
          {product.title}
        </h2>
        
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-sm font-bold text-gray-900">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.mrp && (
            <span className="text-xs text-gray-500 line-through">
              ₹{product.mrp?.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;