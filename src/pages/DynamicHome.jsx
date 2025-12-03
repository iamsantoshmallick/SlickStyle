// src/pages/DynamicHome.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setGender } from "../features/shop/shopSlice";

// Data & Components
import homeData from "../data/homeData.json";
import productData from "../data/productData.json";
import TopIconNav from "../components/home/TopIconNav";
import HeroCarousel from "../components/home/HeroCarousel";
import SectionCarousel from "../components/home/SectionCarousel";
import ErrorPage from "./ErrorPage";

const validCategories = ["men", "women"];

const quotesByGender = {
  men: [
    "Slick style, sharp mindset.",
    "Dress like you’re already there.",
    "Good fits. Good energy.",
    "Oversized tee, oversized confidence.",
    "Style is a silent introduction."
  ],
  women: [
    "Your outfit is your mood in pixels.",
    "Bold fits. Soft heart.",
    "Style that speaks before you do.",
    "Comfort first, slay always.",
    "You’re the main character today."
  ]
};

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

// Build a product lookup map once (outside component)
const productMap = productData.reduce((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {});

// Helper to turn section.productIds into SectionCarousel items
const buildCarouselItems = (section) => {
  if (section.type !== "productCarousel" || !Array.isArray(section.productIds)) {
    return [];
  }

  return section.productIds
    .map((id) => productMap[id])
    .filter(Boolean)
    .map((p) => ({
      id: p.id,
      img: p.images?.[0],
      brand: p.brand,
      discount: p.discount,
      path: `/product/${p.id}`
    }));
};

const DynamicHome = () => {
  const { gender } = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [quote] = useState(() => getRandomQuote(gender));

  useEffect(() => {
    if (validCategories.includes(gender)) {
      dispatch(setGender(gender));
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [gender, dispatch]);

  const isValidCategory = validCategories.includes(gender);
  const pageData = isValidCategory ? homeData[gender] : null;

  if (!isValidCategory || !pageData) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <div className="md:min-h-screen flex flex-col items-center justify-center bg-white px-1 py-3">
        {/* Hero skeleton */}
        <div className="w-full max-w-5xl">
          <div className="skeleton h-44 md:h-66 rounded-2xl"></div>
        </div>
              {/* Quote */}
        <p className="text-center my-6 text-gray-500 text-sm md:text-base max-w-sm italic">
          {quote}
        </p>
        {/* Carousel item skeletons */}
        <div className="w-full max-w-5xl flex gap-4 justify-center">
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

  return (
    <div className="min-h-screen bg-white fade-in">
      <TopIconNav data={pageData.topNav} />
      <HeroCarousel slides={pageData.heroSlides} />

      <div className="mt-8 space-y-4">
        {pageData.sections?.map((section) => {
          if (section.type === "productCarousel") {
            const items = buildCarouselItems(section);
            if (!items.length) return null;

            return (
              <SectionCarousel
                key={section.id}
                title={section.title}
                items={items}
                aspectRatio={section.aspectRatio}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default DynamicHome;
