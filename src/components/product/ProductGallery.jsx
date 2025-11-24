import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ProductGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full md:w-[60%]">
      {/* --- MOBILE VIEW: Swiper Carousel --- */}
      <div className="block md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="product-gallery-swiper aspect-3/4 w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Product view ${index + 1}`}
                className="h-full w-full object-cover"
                // Fallback for missing images
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x800?text=No+Image";
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- DESKTOP VIEW: Grid Layout --- */}
      {/* This creates a 2-column grid where images scroll naturally */}
      <div className="hidden md:grid grid-cols-2 gap-4 pr-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-full aspect-3/4 bg-gray-100 overflow-hidden rounded-lg cursor-zoom-in hover:opacity-95 transition-opacity"
          >
            <img
              src={img}
              alt={`Product view ${index + 1}`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x800?text=No+Image";
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        /* Custom Swiper Dots for Product Page */
        .product-gallery-swiper .swiper-pagination-bullet {
            background: #fff;
            opacity: 0.5;
            width: 8px;
            height: 8px;
        }
        .product-gallery-swiper .swiper-pagination-bullet-active {
            background: #000;
            opacity: 1;
            width: 20px;
            border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default ProductGallery;
