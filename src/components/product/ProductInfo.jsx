import { Heart, ShoppingBag, Star } from "lucide-react";
import SizeSelector from "./SizeSelector";

const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  onAddToCart,
}) => {
  return (
    <div className="w-full md:w-[40%] md:sticky md:top-24 h-fit px-4 md:px-0">
      {/* Brand & Title */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wide mb-1">
          {product.brand}
        </h3>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {product.title}
        </h1>
      </div>

      {/* Price Block */}
      <div className="mb-6 flex items-baseline gap-3 border-b border-gray-100 pb-6">
        <span className="text-2xl font-bold text-gray-900">
          ₹{product.price}
        </span>
        <span className="text-lg text-gray-400 line-through">
          ₹{product.mrp}
        </span>
        <span className="text-lg font-bold text-red-500">
          {product.discount}
        </span>
      </div>

      {/* Size Selector */}
      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />

      {/* Desktop Actions */}
      <div className="hidden md:flex gap-4 mb-8">
        <button
          onClick={onAddToCart}
          className="flex-1 bg-red-600 text-white font-bold py-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag size={20} />
          ADD TO CART
        </button>
        <button className="flex-none border border-gray-300 p-4 rounded-md hover:border-gray-900 transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* Product Description Accordion style */}
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <h4 className="font-bold text-gray-900 border-b border-gray-200 pb-2">
          Product Description
        </h4>
        <p>{product.description}</p>

        <div className="grid grid-cols-2 gap-y-2 mt-4">
          {product.productDetails.map((detail, idx) => (
            <div key={idx}>
              <span className="font-semibold text-gray-900">
                {detail.label}:{" "}
              </span>
              <span>{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
