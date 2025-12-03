//src/components/navbar/TopSection.jsx

import { NavLink } from "react-router";

const TopSection = ({ onCategoryChange }) => {
  // Helper for consistent tab styling
  // We now pass the boolean 'isActive' directly from NavLink
  const getLinkClass = (isActive) => {
    const baseClass =
      "flex-1 py-3.5 text-center text-sm font-bold tracking-wider border-b-4 transition-colors cursor-pointer";
    const activeClass = "border-[#1d8c84] text-[#1d8c84]";
    const inactiveClass =
      "border-transparent text-gray-500 hover:text-gray-700";

    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <div>
      {/* Top Bar with Logo */}
      <div className="flex items-center justify-between px-4 py-3">
        <img
          src="/logo.png"
          alt="The Slick Style"
          className="h-12 w-auto object-contain"
        />
        <button className="rounded border border-gray-400 bg-white px-5 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-50">
          Log In/Register
        </button>
      </div>

      {/* Green Banner */}
      <div className="flex items-center justify-between bg-[#1d8c84] px-4 py-2 mx-0.5 text-white">
        <span className="text-xs font-semibold">
          Earn 10% Cashback on Every App Order
        </span>

        <div className="flex gap-2">
          <img
            src="/play-store-icon.png"
            alt="Play Store"
            className="h-5 w-auto rounded opacity-90"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <div className="hidden h-5 w-5 rounded bg-linear-to-br from-green-400 to-blue-500"></div>
        </div>
      </div>

      {/* Tab Switchers (NavLinks) */}
      <div className="flex w-full border-b border-gray-200 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <NavLink
          to="/men"
          className={({ isActive }) => getLinkClass(isActive)}
          onClick={() => onCategoryChange?.("men")}
        >
          MEN
        </NavLink>

        <NavLink
          to="/women"
          className={({ isActive }) => getLinkClass(isActive)}
          onClick={() => onCategoryChange?.("women")}
        >
          WOMEN
        </NavLink>
      </div>
    </div>
  );
};

export default TopSection;
