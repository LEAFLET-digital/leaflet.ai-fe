import Logo from "../../../public/Images/logo.png";
import { Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthModal, UserButton } from "./auth";
import { Button } from "./ui";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const userId = user ? user.user_id : null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");

  const navigationItems = [
    { name: "Our approach", href: "/our-approach" },
    { name: "Research", href: "/research" },
    { name: "Docs", href: "#" },
    { name: "Models", href: "/models" },
    { name: "Blog", href: "#" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="glass-effect fixed top-0 w-full z-50 border-b border-white/10"
      style={{ height: "100px" }}
    >
      <div className="container mx-auto px-4 md:px-6 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 md:gap-3 text-white font-bold text-lg md:text-xl no-underline hover:text-blue-300 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                <img
                  src={Logo}
                  alt="Leaflet Logo"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg shadow-lg"
                />
              </div>
              <span className="glow-text text-xl md:text-2xl font-semibold tracking-wide">
                <span className="hidden sm:inline">LEAFLET.ai</span>
                <span className="sm:hidden">LEAFLET</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          {!location.pathname.startsWith("/dashboard") && (
            <div className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-8">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 font-medium relative group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Authentication - Desktop */}
            <div className="hidden sm:flex items-center gap-2 md:gap-4">
              {!isAuthenticated ? (
                <>
                  <button 
                    onClick={() => {
                      setAuthModalMode("login");
                      setShowAuthModal(true);
                    }}
                    className="glass-effect text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium border border-white/20 hover:border-white/40 text-sm md:text-base"
                  >
                    Log in
                  </button>
                  <button 
                  onClick={() => {
                    setAuthModalMode("signup");
                    setShowAuthModal(true);
                  }}
                  className="modern-btn text-white font-semibold px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base"
                >
                  Get Started
                </button>
                  
                </>
              ) : (
                <>
                  {location.pathname.startsWith("/dashboard") ? (
                    <button
                      onClick={() => navigate("/")}
                      className="glass-effect text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium border border-white/20 hover:border-white/40 text-sm md:text-base"
                    >
                      Home
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/dashboard/${userId}`)}
                      className="glass-effect text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium border border-white/20 hover:border-white/40 text-sm md:text-base"
                    >
                      Dashboard
                    </button>
                  )}
                  <UserButton />
                </>
              )}

            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
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

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen text-white opacity-100 py-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 mt-4 border border-white/20 shadow-2xl">
            {/* Mobile Navigation */}
            {location.pathname === "/dashboard" && (
              <div className="mb-6">
                <ul className="space-y-3">
                  {navigationItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="block text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mobile Authentication */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setAuthModalMode("login");
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full glass-effect text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium border border-white/20 hover:border-white/40"
                  >
                    Log in
                  </button>
                  
                  <button
                    onClick={() => {
                      setAuthModalMode("signup");
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full modern-btn text-white font-semibold py-3"
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  {location.pathname.startsWith("/dashboard") ? (
                    <button
                      onClick={() => {
                        navigate("/");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full glass-effect text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium border border-white/20 hover:border-white/40"
                    >
                      Back to Home
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        navigate(`/dashboard/${userId}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full glass-effect text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 font-medium border border-white/20 hover:border-white/40"
                    >
                      Go to Dashboard
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authModalMode}
      />
    </nav>
  );
};

export default Navbar;
