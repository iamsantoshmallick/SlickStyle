
const ShopAllGrid = () => {
  return (
    <section className="py-1">
    {/* Heading */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Shop All</h2>
        {/* You can add state logic for this accordion */}
        <button>
          {/* ChevronUp icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-x-3 gap-y-5 md:grid-cols-4 lg:grid-cols-4">
        {shopCategories.map((cat) => (
          <a href="#" key={cat.name} className="text-center">
            <img
              src={cat.img}
              alt={cat.name}
              className="h-24 w-24 rounded-md object-cover"
            />
            <p className="mt-2 text-sm font-medium text-gray-800">
              {cat.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ShopAllGrid;