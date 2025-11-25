import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router";
import { Menu, Search, Heart, ShoppingBag, User, Mic, X } from "lucide-react";
const logoText = "/logo.png";
const logoGhost = "/logo-black.png";
import TopSection from "../navbar/TopSection";
import CategoryCarousel from "../navbar/CategoryCarousel";
import AccordionData from "../../data/products.json";
import AccordionGrid from "../navbar/AccordionGrid";
import carouselData from "../../data/nav-carousel.json";
import { setGender } from "../../features/shop/shopSlice";
import CartDrawer from "../cart/CartDrawer";

const Header = () => {
  const navLinks = [
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sidebarRef = useRef(null);

  const cartItemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // access the global gender state
  const activeGender = useSelector((state) => state.shop.gender);
  const dispatch = useDispatch();

  // Handler to dispatch the change
  const handleCategoryChange = (category) => {
    dispatch(setGender(category));
  };

  // Effect to manage body overflow
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // This runs if the component unmounts while menu is open
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  // Effect to handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the menu is open AND if the click occurred outside the referenced sidebar.
      // The 'contains' check returns false if the click target is the sidebar itself or a descendant.
      if (
        isMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    // Attach the event listener to the entire document when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: Remove the event listener when the component unmounts or menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

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
                    ? "border-b-2 border-red-600 text-black"
                    : "text-gray-600"
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
          <button className="text-gray-800 md:hidden">
            <Search size={20} />
          </button>
          <button className="hidden text-gray-800 md:block">
            <User size={20} />
          </button>
          <button className="text-gray-800">
            <Heart size={20} />
          </button>

          {/* CART BUTTON */}
          <button
            className="relative text-gray-800"
            onClick={() => setIsCartOpen(true)}
          >
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
                  ? "border-b-2 border-red-600 text-black"
                  : "text-gray-500"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* 4.OVERLAY SIDEBAR*/}
      {isMenuOpen && (
        /* Background Fixed */
        <div className="fixed left-0 top-0 h-screen w-full bg-black/50 z-50">
          <div
            ref={sidebarRef}
            className="h-full w-5/6 md:max-w-4/9 bg-white overflow-y-auto custom-scrollbar"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="z-10 text-gray-500 md:hidden"
              >
                <X size={24} />
              </button>
            </div>
            <TopSection
              onCategoryChange={handleCategoryChange} // Pass dispatch handler
            />
            {activeGender && (
              <>
                <CategoryCarousel data={carouselData[activeGender]} />
                <AccordionGrid
                  key={activeGender} // Force re-render when gender changes
                  data={AccordionData[activeGender]} // Pull data based on Redux state
                />
              </>
            )}
          </div>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
