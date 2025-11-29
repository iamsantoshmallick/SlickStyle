// src/components/shared/Breadcrumbs.jsx
import { Link, useLocation } from "react-router";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = ({ customCrumbs }) => {
  const location = useLocation();

  // Helper: Capitalize "t-shirts" -> "T-Shirts"
  const formatName = (str) =>
    decodeURIComponent(str)
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  let crumbs = [];

  if (customCrumbs) {
    // MODE 1: Manual Data (Passed from parent)
    crumbs = customCrumbs;
  } else {
    // MODE 2: Auto-generate from URL
    // Remove query params and empty strings
    const pathnames = location.pathname.split("/").filter((x) => x);

    // Build the crumb objects
    crumbs = pathnames.map((value, index) => {
      // Reconstruct the path: /men, then /men/t-shirts
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      return {
        label: formatName(value),
        path: to,
      };
    });
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs md:text-sm text-gray-500 py-3"
    >
      <ol className="flex items-center flex-wrap gap-1">
        {/* Always show Home Icon first */}
        <li className="flex items-center hover:text-black transition-colors">
          <Link to="/">
            <Home size={14} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <li key={crumb.path || index} className="flex items-center">
              <ChevronRight size={14} className="mx-1 text-gray-400" />

              {isLast || !crumb.path ? (
                <span className="font-semibold text-gray-900 truncate max-w-[150px] md:max-w-xs">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="hover:text-black hover:underline underline-offset-4 transition-colors capitalize"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
