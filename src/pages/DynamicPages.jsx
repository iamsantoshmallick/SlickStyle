import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch} from "react-redux";
import { setGender } from "../features/shop/shopSlice";

// Data & Components
import homeData from "../data/homeData.json";
import TopIconNav from "../components/home/TopIconNav";
import HeroCarousel from "../components/home/HeroCarousel";

const validCategories = ["men", "women"];

const DynamicHome = () => {
  const { gender } = useParams(); // 1. Grab 'men' or 'women' from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 2. Validate URL param. If user types /robots, default to men
  const activeCategory = validCategories.includes(gender) ? gender : "men";

  // 3. Sync URL with Redux Store
  useEffect(() => {
    if (gender && validCategories.includes(gender)) {
      dispatch(setGender(gender));
    } else if (!gender) {
        // If no param is present (e.g. home page), redirect to /men
        navigate('/men', { replace: true });
    }
  }, [gender, dispatch, navigate]);

  // 4. Fetch data based on the ACTIVE category
  const pageData = homeData[activeCategory];

  return (
    <div className="min-h-screen bg-white">  
      <TopIconNav data={pageData.topNav} />
      
      <HeroCarousel slides={pageData.heroSlides} />
      
      <h2 className="px-4 pt-8 text-center text-2xl font-bold text-gray-900 md:px-6 lg:px-8 uppercase tracking-wider">
        {activeCategory === 'men' ? 'Men\'s' : 'Women\'s'} Best Sellers
      </h2>
      
      {/* You can add product grids here later */}
    </div>
  );
};

export default DynamicHome;