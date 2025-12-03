// src/pages/ErrorPage.jsx

import { Link, useLocation } from "react-router";

const ErrorPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-linear-to-b from-gray-50 to-white px-4">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in duration-300">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center gap-2">
          <img
            src="/logo-black.png"
            alt="The Slick Style"
            className="h-8 w-auto opacity-80"
            onError={(e) => (e.target.style.display = "none")}
          />
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
            THE SLICK STYLE
          </span>
        </div>

        {/* Main 404 Block */}
        <div className="relative">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight text-gray-900">
            404
          </h1>
          <div className="absolute inset-x-0 -bottom-3 flex justify-center">
            <div className="h-1 w-24 rounded-full bg-red-500/80" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            This page went out of style.
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            We couldn’t find the page you were looking for. It might have been
            moved, renamed, or never existed.
          </p>

          {location?.pathname && (
            <p className="text-xs text-gray-400 mt-2">
              Requested URL:&nbsp;
              <code className="rounded bg-gray-100 px-2 py-1 text-[11px]">
                {location.pathname}
              </code>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-bold text-white tracking-wide hover:bg-gray-900 transition-colors"
          >
            Go to Home
          </Link>

          <Link
            to="/men"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-black hover:bg-gray-50 transition-colors"
          >
            Shop Men
          </Link>

          <Link
            to="/women"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:border-black hover:bg-gray-50 transition-colors"
          >
            Shop Women
          </Link>
        </div>

        {/* Tiny hint / vibe line */}
        <p className="text-[11px] text-gray-400 pt-2">
          If you typed the address manually, double-check the spelling.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
