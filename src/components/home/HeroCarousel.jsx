import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';

// Accept slides as a PROP
const HeroCarousel = ({ slides }) => {
  
  // Safety check
  if (!slides || slides.length === 0) return null;

  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full">
               {/* Responsive Aspect Ratio:
                 Mobile: Square-ish or 4:5 
                 Desktop: Wide 16:9 or 21:9 
               */}
               <img 
                 src={slide.image} 
                 alt={slide.alt} 
                 className="h-[400px] w-full object-cover md:h-[500px] lg:h-[600px]" 
               />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;