//src/components/product/SizeSelector.jsx

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-900">Select Size</span>
        <button className="text-xs font-semibold text-red-600 hover:underline uppercase">
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {sizes.map((item) => {
          const isSelected = selectedSize === item.size;
          const isOutOfStock = !item.stock;

          return (
            <button
              key={item.size}
              onClick={() => !isOutOfStock && onSelectSize(item.size)}
              disabled={isOutOfStock}
              className={`
                relative flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition-all
                ${
                  isOutOfStock
                    ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300 decoration-gray-400" // Disabled State
                    : isSelected
                    ? "border-black bg-black text-white shadow-md" // Selected State
                    : "border-gray-300 bg-white text-gray-900 hover:border-black" // Default State
                }
              `}
            >
              {item.size}

              {/* Diagonal line for Out of Stock */}
              {isOutOfStock && (
                <div className="absolute h-full w-1px rotate-45 bg-gray-300"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Helper Text */}
      {selectedSize && (
        <p className="mt-2 text-xs text-green-600 font-medium animate-in fade-in slide-in-from-top-1">
          Size {selectedSize} is available
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
