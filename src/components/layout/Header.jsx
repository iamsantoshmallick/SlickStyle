import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { Menu, Search, Heart, ShoppingBag, User, Mic, X } from 'lucide-react';
import ShopAllGrid from '../navbar/ShopAllGrid';
import CategoryCarousel from '../navbar/CategoryCarousel';

// Asset paths (update if you move them from /public)
const logoText = '/logo.png';
const logoGhost = '/logo-black.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use selector to get total quantity from the cart state
  const cartItemCount = useSelector((state) => 
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Add this useEffect to lock the body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function:
    // This runs if the component unmounts while menu is open
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]); 
  // This effect runs every time isMenuOpen changes

  const navLinks = [
    { name: 'MEN', path: '/men' },
    { name: 'WOMEN', path: '/women' },
    { name: 'SNEAKERS', path: '/sneakers' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* 1. TOP BANNER (Mobile Only) */}
      <div className="flex items-center justify-between bg-red-600 px-4 py-2 text-white md:hidden">
        <span className="text-xs font-medium">
          Download Our App & Get 10% Additional Cashback On All Orders
        </span>
        <button className="rounded-md border border-white px-3 py-1 text-xs font-bold">
          OPEN APP
        </button>
      </div>

      {/* 2. MAIN HEADER */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* --- LEFT SIDE (Mobile: Menu | Desktop: Menu + Logo) --- */}
        <div className="flex items-center gap-4">
          <button onClick={() => setIsMenuOpen(true)} className="text-gray-800">
            <Menu size={24} />
          </button>
          <NavLink to="/" className="hidden md:block">
            <img src={logoGhost} alt="The Slick Style" className="h-7" />
          </NavLink>
        </div>

        {/* --- CENTER (Mobile: Logo | Desktop: Nav Links) --- */}
        <div className="md:hidden">
          {/* Mobile Center: Text Logo */}
          <NavLink to="/">
            <img src={logoText} alt="The Souled Store" className="h-5" />
          </NavLink>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          {/* Desktop Center: Nav Links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-wider ${
                  isActive
                    ? 'border-b-2 border-red-600 text-black'
                    : 'text-gray-600'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* --- RIGHT SIDE (Mobile: Icons | Desktop: Search + Icons) --- */}
        <div className="flex items-center gap-4">
          {/* Desktop Search Bar */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-64 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Mic size={16} />
            </button>
          </div>

          {/* Icons (Shared) */}
          <button className="text-gray-800 md:hidden"> {/* Search only on mobile icon bar */}
            <Search size={20} />
          </button>
          <button className="hidden text-gray-800 md:block"> {/* User only on desktop */}
            <User size={20} />
          </button>
          <button className="text-gray-800">
            <Heart size={20} />
          </button>
          <button className="relative text-gray-800">
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 3. SUB-NAV (Mobile Only) */}
      <div className="flex justify-around border-b border-gray-200 bg-white px-4 md:hidden">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `w-full py-2.5 text-center text-sm font-bold uppercase ${
                isActive
                  ? 'border-b-2 border-red-600 text-black'
                  : 'text-gray-500'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      
      {/* 4. MOBILE MENU OVERLAY SIDEBAR*/} 
      {isMenuOpen && (
        <div className="fixed left-0 top-0 h-screen w-full bg-black/50 z-50"> {/* Use 'fixed' */}
          
          {/* Make the menu panel itself scrollable */}
          <div className="h-full w-3/4 max-w-sm bg-white p-6 overflow-y-auto custom-scrollbar">
            
            <button onClick={() => setIsMenuOpen(false)} className="mb-6">
              <X size={24} />
            </button>
            
            {/* Your scrollable content */}
            <CategoryCarousel /> {/* This is the "Hot Merch" scroll */}
            <ShopAllGrid /> {/* This is the "Shop All" grid */}
            
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;