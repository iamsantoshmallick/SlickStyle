// src/pages/HomePage.jsx
import { Link } from "react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star } from "lucide-react";

// Components
import HeroCarousel from "../components/home/HeroCarousel";
import SectionCarousel from "../components/home/SectionCarousel";

// Data
import productData from "../data/productData.json";

const HomePage = () => {
  // 1. Static Slides for the Main Landing Page
  // You can move this to a JSON file later if you want it dynamic
  const landingSlides = [
    {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
      alt: "New Season Collection",
      path: "/women"
    },
    {
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      alt: "Streetwear Edits",
      path: "/men"
    }
  ];

  // 2. Data Transformation for SectionCarousel
  // We grab the first 10 products as "Trending" and map them to the format the carousel expects
  const trendingItems = productData.slice(0, 10).map((p) => ({
    id: p.id,
    img: p.images?.[0] || p.img, // Handle array vs string
    brand: p.brand,
    discount: p.discount,
    path: `/product/${p.id}`,
    // specific to carousel display
    title: p.title, 
    price: p.price
  }));

  // We grab the next 10 items for "New Drops"
  const newDropItems = productData.slice(10, 20).map((p) => ({
    id: p.id,
    img: p.images?.[0] || p.img,
    brand: p.brand,
    discount: p.discount,
    path: `/product/${p.id}`,
    title: p.title,
    price: p.price
  }));

  return (
    <div className="min-h-screen bg-white pb-12 animate-in fade-in duration-500">
      
      {/* --- HERO SECTION --- */}
      <HeroCarousel slides={landingSlides} />

      {/* --- SPLIT CATEGORY BANNER --- */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="mb-6 text-xl font-bold uppercase tracking-wider text-center md:text-2xl">
          Who are you shopping for?
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Men Card */}
          <Link to="/men" className="group relative h-64 md:h-96 overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1660891950285-71ed267bf04d" 
              alt="Shop Men" 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-md">MEN</span>
              <button className="mt-4 translate-y-4 opacity-0 bg-white text-black px-6 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Shop Now
              </button>
            </div>
          </Link>

          {/* Women Card */}
          <Link to="/women" className="group relative h-64 md:h-96 overflow-hidden rounded-lg">
            <img 
              src="https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1974&auto=format&fit=crop" 
              alt="Shop Women" 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-md">WOMEN</span>
              <button className="mt-4 translate-y-4 opacity-0 bg-white text-black px-6 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Shop Now
              </button>
            </div>
          </Link>
        </div>
      </section>

      {/* --- CAROUSEL: TRENDING --- */}
      {trendingItems.length > 0 && (
        <SectionCarousel 
          title="Trending Now" 
          items={trendingItems} 
          aspectRatio="aspect-3/4" 
        />
      )}

      {/* --- SERVICE BANNERS (TRUST SIGNALS) --- */}
      <section className="bg-gray-50 py-12 my-8 border-y border-gray-100">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <ServiceItem 
            icon={<Truck size={32} />} 
            title="Free Shipping" 
            desc="On orders above ₹999" 
          />
          <ServiceItem 
            icon={<RefreshCw size={32} />} 
            title="Easy Returns" 
            desc="15-day return policy" 
          />
          <ServiceItem 
            icon={<ShieldCheck size={32} />} 
            title="Secure Payment" 
            desc="100% secure checkout" 
          />
          <ServiceItem 
            icon={<Star size={32} />} 
            title="Top Brands" 
            desc="100% Authentic products" 
          />
        </div>
      </section>

      {/* --- CAROUSEL: NEW DROPS --- */}
      {newDropItems.length > 0 && (
        <SectionCarousel 
          title="Just Dropped" 
          items={newDropItems} 
          aspectRatio="aspect-3/4" 
        />
      )}

      {/* --- NEWSLETTER CTA --- */}
      <section className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Don't Miss Out
        </h2>
        <p className="text-gray-500 mb-8">
          Subscribe to our newsletter and get <strong>10% OFF</strong> your first purchase.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-colors"
          />
          <button className="bg-black text-white px-8 py-3 font-bold rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            SUBSCRIBE <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  );
};

// Helper Component for the Service Section
const ServiceItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center gap-3">
    <div className="text-gray-800 p-3 bg-white rounded-full shadow-sm border border-gray-100">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-900 text-sm md:text-base">{title}</h3>
      <p className="text-gray-500 text-xs md:text-sm">{desc}</p>
    </div>
  </div>
);

export default HomePage;