//src/components/navbar/AccordionGrid.jsx

import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

// --- Sub-Accordion Component (Handles the subsections like 'Shop By Fit') ---
const SubAccordionItem = ({ subSection }) => {
  // Use a sensible default state for inner accordions
  const [isOpen, setIsOpen] = useState(false);
  
  if (!subSection || !Array.isArray(subSection.items) || subSection.items.length === 0) {
    return null;
  }
  // Only create a clickable accordion if the subheading is meaningful (i.e., not 'Categories').
  // Otherwise, just render the grid content directly below the parent.
  const showSubheadingAsAccordion =
    subSection.heading && subSection.heading !== "Categories";

  const GridContent = (
    <div className="grid grid-cols-3 gap-x-1 gap-y-6 md:grid-cols-4">
      {subSection.items.map((item) => (
        <Link to={item.path} key={item.id} className="group">
          <div className="flex flex-wrap items-center justify-center text-center">
            <div className=" mb-2 h-24 w-24 overflow-hidden rounded-md bg-gray-100">
              <ImageWithFallback
                src={item.img}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <p className="flex-1 flex justify-center text-xs font-medium text-gray-800 group-hover:text-red-600 px-1">
            {item.name}
          </p>
        </Link>
      ))}
    </div>
  );

  if (!showSubheadingAsAccordion) {
    // Render the content grid directly (e.g., for the main 'Categories' list in 'Shop All')
    return (
      <div key={subSection.id} className="pt-2">
        {GridContent}
      </div>
    );
  }

  // Render a full clickable nested accordion (e.g., for 'Shop By Fit')
  return (
    <div className="border-t border-gray-100 pt-2 first:border-t-0">
      {/* Nested Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left py-3"
      >
        <h4 className="text-md font-medium text-gray-500">
          {subSection.heading}
        </h4>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>

      {/* Nested Accordion Body */}
      {isOpen && <div className="pb-3">{GridContent}</div>}
    </div>
  );
};

// --- Main Accordion Component (Wrapper) ---
const AccordionGrid = ({ data }) => {
  if (!data) return null;

  const sections = Object.values(data || {});
  if (!sections.length) return null;

  return (
    <div className="flex flex-col gap-2 pb-20 px-5">
      {sections.map((section, index) => (
        <AccordionItem key={index} section={section} />
      ))}
    </div>
  );
};

// --- Main Accordion Item Component (Handles Shop All, Top Wear, Bottomwear) ---
const AccordionItem = ({ section }) => {
  // Initialize state based on prop value (Shop All open by default)
  const [isOpen, setIsOpen] = useState(section.heading === "Shop All");

  return (
    <div className="border-b border-gray-100 py-1 last:border-0">
      {/* 1. Main Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <h2 className="text-lg font-bold text-gray-900">{section.heading}</h2>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>

      {/* 2. Main Accordion Body (Contains Nested Sub-Accordions/Grids) */}
      {isOpen && (
        <div className="mt-2 space-y-2">
          {section.subSections.map((subSection) => (
            // Use the new SubAccordionItem for nested structure
            <SubAccordionItem key={subSection.id} subSection={subSection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionGrid;
