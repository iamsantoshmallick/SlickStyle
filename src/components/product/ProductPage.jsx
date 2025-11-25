import { useState } from "react";
import { useParams, Link } from "react-router";
import { useDispatch } from "react-redux";
import { ShoppingBag, Heart, ChevronRight } from "lucide-react";
import { addToCart } from "../../features/cart/cartSlice.js";

// Components
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import SectionCarousel from "../home/SectionCarousel";

// Data
import productData from "../../data/productData.json";

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = productData.find((p) => p.id === productId);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-gray-500">
          The product you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="rounded-md bg-black px-6 py-2 text-white hover:bg-gray-800"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price,
        img: product.images[0],
        size: selectedSize
      })
    );
  };

  // Build "You May Also Like" carousel items from productData
  const similarItems = productData
    .filter((p) => p.id !== product.id)
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      img: p.images?.[0],
      brand: p.brand,
      discount: p.discount,
      path: `/product/${p.id}`
    }));

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-10">
      {/* Breadcrumbs */}
      <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 py-4 px-4 lg:px-8">
        {product.breadcrumbs &&
          product.breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {crumb}
              {i < product.breadcrumbs.length - 1 && <ChevronRight size={12} />}
            </span>
          ))}
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12 max-w-7xl mx-auto md:px-4 lg:px-8">
        <ProductGallery images={product.images} />

        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Similar Products */}
      {similarItems.length > 0 && (
        <div className="mt-16 border-t border-gray-100 pt-8">
          <SectionCarousel title="You May Also Like" items={similarItems} />
        </div>
      )}

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 z-50 md:hidden flex gap-3 items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
          <Heart size={20} />
        </button>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-red-600 text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <ShoppingBag size={18} />
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
