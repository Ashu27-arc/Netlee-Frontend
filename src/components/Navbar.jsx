import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-sm shadow-2xl" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-18 lg:h-20">
            {/* Logo & Navigation Links */}
            <div className="flex items-center gap-4 lg:gap-12">
              <Link 
                to="/" 
                className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent hover:from-red-500 hover:to-red-400 transition-all duration-300"
              >
                STREAMNOVA
              </Link>
              
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-all duration-200 ${
                    location.pathname === "/" 
                      ? "text-white" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/search" 
                  className={`text-sm font-medium transition-all duration-200 ${
                    location.pathname === "/search" 
                      ? "text-white" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Search
                </Link>
                {user?.isAdmin && (
                  <Link 
                    to="/admin/movies" 
                    className={`text-sm font-medium transition-all duration-200 ${
                      location.pathname.includes("/admin") 
                        ? "text-white" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center gap-3 lg:gap-6">
              {user ? (
                <>
                  <div className="hidden lg:flex items-center gap-3">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=dc2626&color=fff`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full ring-2 ring-gray-800 hover:ring-red-600 transition-all duration-300"
                    />
                    <span className="text-sm text-white font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="hidden md:flex items-center gap-2 lg:gap-2.5 px-4 lg:px-7 py-2.5 lg:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 shadow-lg hover:shadow-red-600/50 transition-all duration-300 border border-red-500/30"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="hidden md:flex items-center gap-2 lg:gap-2.5 px-4 lg:px-7 py-2.5 lg:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 shadow-lg hover:shadow-red-600/50 transition-all duration-300 border border-red-500/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white focus:outline-none p-1.5"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="absolute top-16 right-0 left-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  location.pathname === "/" 
                    ? "bg-red-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  location.pathname === "/search" 
                    ? "bg-red-600 text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Search
              </Link>
              {user?.isAdmin && (
                <Link 
                  to="/admin/movies" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    location.pathname.includes("/admin") 
                      ? "bg-red-600 text-white" 
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  Admin Panel
                </Link>
              )}
              
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg">
                    <img
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=dc2626&color=fff`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full ring-2 ring-red-600"
                    />
                    <span className="text-white font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
