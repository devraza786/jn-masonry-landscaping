import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const LOGO_URL = "https://cdn.builder.io/api/v1/image/assets%2Fc9eb1ef2d46349c996d329a3c104d50e%2Fcd6cc39b24b34dc9be39e99c783e2a27?format=webp&width=800";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [promoHeight, setPromoHeight] = useState(44);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check if promo is visible
    const checkPromoHeight = () => {
      const computed = getComputedStyle(document.documentElement).getPropertyValue('--promo-height');
      setPromoHeight(parseInt(computed) || 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Observe changes to promo height
    const observer = new MutationObserver(checkPromoHeight);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    checkPromoHeight();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // If it's a hash link on the current page, scroll to it
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 right-0 z-50 transition-all duration-300"
      style={{ top: `${promoHeight}px` }}
    >
      <div className={`transition-all duration-300 ${
        isScrolled
          ? "bg-surface/98 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-black/40 backdrop-blur-sm"
      }`}>
        <div className="container-custom mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div>
                <img src={LOGO_URL} alt="JN Masonry & Landscaping" className="h-12 w-auto" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-heading font-semibold text-sm uppercase tracking-wider transition-colors duration-200 underline-accent ${
                    isActive(link.href)
                      ? isScrolled ? "text-primary" : "text-primary"
                      : isScrolled
                      ? "text-foreground hover:text-primary"
                      : "text-white hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
              <a
                href="tel:1-512-734-2958"
                className="btn-primary text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-background border-t border-border"
              >
                <div className="py-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-left px-4 py-3 font-heading font-semibold transition-colors ${
                        isActive(link.href)
                          ? "text-primary bg-muted"
                          : "text-foreground hover:text-primary hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <a
                    href="tel:1-512-734-2958"
                    className="block mx-4 mt-4 btn-primary text-center"
                  >
                    📞 Call Now
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
