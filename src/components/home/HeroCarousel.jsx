import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';


const slides = [
  {
    image: 'src/assets/Images/HomePage-Carousel-3.avif',
    alt: 'Never Just T-Shirt',
  },
  {
    image: 'src/assets/Images/HomePage-Carousel-2.jpg',
    alt: 'Everyday Denims',
  },
];


const HeroCarousel = () => {
  return (
    <section>
      <Swiper
        // 3. Add Navigation to the modules list
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation={true} // 4. Add this prop to enable the buttons
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img 
              src={slide.image} 
              alt={slide.alt} 
              className="h-auto w-full object-cover" 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroCarousel;