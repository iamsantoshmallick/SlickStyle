// src/components/layout/Header.jsx

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { Menu, Search, Heart, ShoppingBag, User, Mic, X } from "lucide-react";
import TopSection from "../navbar/TopSection";
import CategoryCarousel from "../navbar/CategoryCarousel";
import AccordionGrid from "../navbar/AccordionGrid";
import CartDrawer from "../cart/CartDrawer";
import AccordionData from "../../data/products.json";
import carouselData from "../../data/nav-carousel.json";
import { setGender } from "../../features/shop/shopSlice";

// Static logo assets
const logoText = "/logo.png";
const logoGhost = "/logo-black.png";

const Header = () => {
  // Main top-level nav links
  const navLinks = [
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
  ];

  // UI state: mobile sidebar menu + cart drawer
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Used to detect outside click on sidebar
  const sidebarRef = useRef(null);

  // Total cart items (safe fallback if slice isn't mounted)
  const cartItemCount = useSelector((state) => state.cart?.totalCount ?? 0);

  // Currently selected gender (from global shop state)
  const activeGender = useSelector((state) => state.shop?.gender);
  const dispatch = useDispatch();

  // Update global gender when user taps gender switch inside sidebar
  const handleCategoryChange = (category) => {
    dispatch(setGender(category));
  };

  const openMenu = () => {
    setIsCartOpen(false);
    setIsMenuOpen(true);
  };

  const openCart = () => {
    setIsMenuOpen(false);
    setIsCartOpen(true);
  };

  /**
   * Lock body scroll when sidebar menu is open
   * Prevents background scrolling on mobile & desktop
   */
  useEffect(() => {
    if (isMenuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  /**
   * Close sidebar when clicking outside it
   * Common mobile navigation behavior
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* -------------------------------------------------- */}
      {/* 1. MOBILE TOP BANNER                              */}
      {/* -------------------------------------------------- */}
      <div className="flex items-center justify-between bg-red-600 px-4 py-2 text-white md:hidden">
        <span className="text-xs font-medium">
          Download App & Get 10% Cashback
        </span>
        <button className="rounded-md border border-white px-3 py-1 text-xs font-bold">
          OPEN APP
        </button>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. MAIN HEADER BAR                                */}
      {/* -------------------------------------------------- */}
      <nav className="flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        {/* LEFT: Hamburger + Desktop Logo */}
        <div className="flex items-center gap-4">
          <button onClick={openMenu} className="text-gray-800">
            <Menu size={24} />
          </button>
          <NavLink to="/" className="hidden md:block">
            <img src={logoGhost} alt="The Slick Style" className="h-7" />
          </NavLink>
        </div>

        {/* CENTER: Mobile Logo / Desktop Nav */}
        <div className="md:hidden">
          <NavLink to="/">
            <img src={logoText} alt="The Slick Style" className="h-5" />
          </NavLink>
        </div>

        {/* Desktop category navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-bold uppercase tracking-wider ${
                  isActive
                    ? "border-b-2 border-red-600 text-black"
                    : "text-gray-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: Search / Icons / Cart */}
        <div className="flex items-center gap-4">
          {/* Desktop search input */}
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

          {/* Mobile search icon */}
          <button className="text-gray-800 md:hidden">
            <Search size={20} />
          </button>

          {/* User + Wishlist */}
          <button className="hidden text-gray-800 md:block">
            <User size={20} />
          </button>
          <button className="text-gray-800">
            <Heart size={20} />
          </button>

          {/* Cart button with badge */}
          <button className="relative text-gray-800" onClick={openCart}>
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      {/* 3. MOBILE GENDER SWITCH BAR                       */}
      {/* -------------------------------------------------- */}
      <div className="flex justify-around border-b border-gray-200 bg-white px-4 md:hidden">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `w-full py-2.5 text-center text-sm font-bold uppercase ${
                isActive
                  ? "border-b-2 border-red-600 text-black"
                  : "text-gray-500"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* -------------------------------------------------- */}
      {/* 4. MOBILE SLIDE-IN SIDEBAR NAVIGATION             */}
      {/* -------------------------------------------------- */}
      {isMenuOpen && (
        <div className="fixed left-0 top-0 h-screen w-full bg-black/50 z-50">
          <div
            ref={sidebarRef}
            className="h-full w-5/6 md:w-6/13 bg-white overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="z-10 text-gray-500 md:hidden pt-4 pr-4"
              >
                <X size={24} />
              </button>
            </div>

            {/* Gender selector section */}
            <TopSection onCategoryChange={handleCategoryChange} />

            {/* Gender-sensitive navigation (carousel + accordion grid) */}
            {activeGender && (
              <>
                <CategoryCarousel data={carouselData[activeGender]} />
                <AccordionGrid
                  key={activeGender}
                  data={AccordionData[activeGender]}
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* 5. CART DRAWER                                    */}
      {/* -------------------------------------------------- */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
