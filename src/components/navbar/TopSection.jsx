const TopSection = ({ activeCategory, onCategoryChange }) => {
  
  // Helper for consistent tab styling based on props
  const getLinkClass = (category) => {
    const isActive = activeCategory === category;
    
    const baseClass = "flex-1 py-3.5 text-center text-sm font-bold tracking-wider border-b-4 transition-colors cursor-pointer";
    const activeClass = "border-[#1d8c84] text-[#1d8c84]";
    const inactiveClass = "border-transparent text-gray-500 hover:text-gray-700";
    
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
                e.target.style.display='none'; 
                e.target.nextSibling.style.display='block';
            }}
          />
          <div className="hidden h-5 w-5 rounded bg-linear-to-br from-green-400 to-blue-500"></div>
        </div>
      </div>

      {/* Tab Switchers (Buttons instead of Links) */}
      <div className="flex w-full border-b border-gray-200 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onCategoryChange('men')} 
          className={getLinkClass('men')}
        >
          MEN
        </button>
        
        <button 
          onClick={() => onCategoryChange('women')} 
          className={getLinkClass('women')}
        >
          WOMEN
        </button>
      </div>
    </div>
  );
};

export default TopSection;