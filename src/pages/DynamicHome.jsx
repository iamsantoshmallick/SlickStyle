import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setGender } from "../features/shop/shopSlice";

// Data & Components
import homeData from "../data/homeData.json";
import TopIconNav from "../components/home/TopIconNav";
import HeroCarousel from "../components/home/HeroCarousel";
import SectionCarousel from "../components/home/SectionCarousel";
import ErrorPage from "./ErrorPage";

// Allowed categories
const validCategories = ["men", "women"];

const quotesByGender = {
  men: [
    "Slick style, sharp mindset.",
    "Dress like you’re already there.",
    "Good fits. Good energy.",
    "Oversized tee, oversized confidence.",
    "Style is a silent introduction.",
  ],
  women: [
    "Your outfit is your mood in pixels.",
    "Bold fits. Soft heart.",
    "Style that speaks before you do.",
    "Comfort first, slay always.",
    "You’re the main character today.",
  ],
};

// Helper to pick a quote based on gender
const getRandomQuote = (gender) => {
  const menQuotes = quotesByGender.men;
  const womenQuotes = quotesByGender.women;

  let pool = [...menQuotes, ...womenQuotes];

  if (gender && quotesByGender[gender]) {
    pool = quotesByGender[gender];
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
};

const DynamicHome = () => {
  const { gender } = useParams();
  const dispatch = useDispatch();

  // Hooks must always be at the top, before any returns
  const [isLoading, setIsLoading] = useState(true);

  // Pick a quote once, when the component mounts / gender first resolves
  const [quote] = useState(() => getRandomQuote(gender));

  useEffect(() => {
    if (validCategories.includes(gender)) {
      dispatch(setGender(gender));
    }

    // Only async state update -> no cascading render warning
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [gender, dispatch]);

  // Validate URL & data
  const isValidCategory = validCategories.includes(gender);
  const pageData = isValidCategory ? homeData[gender] : null;

  if (!isValidCategory || !pageData) {
    // /xyz or missing data -> 404
    return <ErrorPage />;
  }

  // While loading -> shimmer skeleton + quote
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        {/* Hero skeleton */}
        <div className="w-full max-w-5xl mb-3">
          <div className="skeleton h-44 md:h-72 rounded-2xl"></div>
        </div>
       {/* Quote */}
        <p className="text-center text-gray-500 text-sm md:text-base max-w-sm italic">
          {quote}
        </p>
        {/* Carousel item skeletons */}
        <div className="w-full max-w-5xl flex gap-4 justify-center mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-24 sm:w-28 md:w-32 h-40 sm:h-44 md:h-48 rounded-xl skeleton"
            />
          ))}
        </div>
      </div>
    );
  }

  // Loaded -> fade in real content
  return (
    <div className="min-h-screen bg-white animate-fadeIn">
      <TopIconNav data={pageData.topNav} />

      <HeroCarousel slides={pageData.heroSlides} />

      <div className="mt-8 space-y-4">
        {pageData.sections?.map((section) => {
          switch (section.type) {
            case "carousel":
              return (
                <SectionCarousel
                  key={section.id}
                  title={section.title}
                  items={section.items}
                  aspectRatio={section.aspectRatio}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default DynamicHome;
