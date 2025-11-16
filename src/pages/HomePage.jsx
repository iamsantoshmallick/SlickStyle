import HeroCarousel from '../components/home/HeroCarousel';
import CategoryCarousel from '../components/navbar/CategoryCarousel';
import ShopAllGrid from '../components/navbar/ShopAllGrid';

const HomePage = () => {
  return (
    <div>
      <HeroCarousel />
      <h2 className="px-4 pt-6 text-xl font-bold text-gray-900 md:px-6 lg:px-8">
        NEW ARRIVALS
      </h2>
    </div>
  );
};

export default HomePage;