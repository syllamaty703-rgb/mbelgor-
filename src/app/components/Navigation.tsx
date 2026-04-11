import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navigation() {
  const location = useLocation();
  const { setIsCartOpen, totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/collection", label: "Collection" },
    { path: "/about", label: "À Propos" },
    { path: "/gallery", label: "Galerie" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] md:w-fit rounded-full border border-white/20 shadow-2xl ${
          isScrolled 
            ? "bg-[#F5F1EC]/80 backdrop-blur-xl py-3" 
            : "bg-[#111111]/30 backdrop-blur-md py-4"
        }`}
      >
        <div className="px-6 md:px-12 flex items-center gap-12 lg:gap-20">
            {/* Logo */}
            <Link to="/" className="flex shrink-0">
              <img
                src="/logo.png"
                alt="MBELGOR Logo"
                className={`h-8 md:h-10 w-auto transition-all duration-500 ${!isScrolled ? 'brightness-0 invert' : ''}`}
              />
            </Link>

            {/* Desktop Navigation - Centered Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-14">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] tracking-[0.2em] font-medium uppercase transition-all duration-300 relative group whitespace-nowrap ${
                    location.pathname === link.path
                      ? (isScrolled ? "text-[#3F1010]" : "text-white")
                      : (isScrolled ? "text-[#111111]/60 hover:text-[#3F1010]" : "text-white/60 hover:text-white")
                  }`}
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] bg-current transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-10 shrink-0">
              <Link
                to="/login"
                className={`text-[9px] tracking-[0.2em] uppercase border h-10 px-8 flex items-center justify-center rounded-full transition-all duration-500 font-medium ${
                  !isScrolled 
                    ? 'border-white/40 text-white hover:bg-white hover:text-[#111111]' 
                    : 'border-[#3F1010]/30 text-[#3F1010] hover:bg-[#3F1010] hover:text-white'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif', paddingRight: 'calc(2rem - 0.2em)' }}
              >
                Connexion
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 hover:scale-110 border relative ${
                  !isScrolled 
                    ? 'bg-white/10 text-white border-white/20' 
                    : 'bg-[#3F1010]/5 text-[#3F1010] border-[#3F1010]/10'
                }`}
                aria-label="Panier"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-bold ${
                    !isScrolled ? 'bg-white text-[#3F1010]' : 'bg-[#3F1010] text-white'
                  }`}>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4 ml-auto">
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`w-10 h-10 flex items-center justify-center rounded-full relative ${isScrolled ? 'text-[#3F1010]' : 'text-white'}`}
                aria-label="Panier"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className={`absolute -top-0 -right-0 w-4 h-4 rounded-full text-[8px] flex items-center justify-center font-bold ${
                    !isScrolled ? 'bg-white text-[#3F1010]' : 'bg-[#3F1010] text-white'
                  }`}>
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`w-10 h-10 flex items-center justify-center transition-transform duration-300 hover:scale-110 ${isScrolled ? 'text-[#3F1010]' : 'text-white'}`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-700 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="absolute inset-0 bg-[#F5F1EC] backdrop-blur-2xl bg-opacity-95" />
        <div className="relative h-full flex flex-col items-center justify-center gap-10">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="mb-8">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
          </Link>
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-xl tracking-[0.2em] uppercase transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-[#3F1010] font-bold"
                  : "text-[#111111]/40"
              }`}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                transitionDelay: `${index * 50}ms`
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-8 text-xs tracking-[0.2em] uppercase border border-[#3F1010] px-10 py-4 rounded-full text-[#3F1010]"
          >
            Connexion
          </Link>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#3F1010] font-bold"
          >
            <ShoppingBag className="w-5 h-5" />
            Panier ({totalItems})
          </button>
        </div>
      </div>
    </>
  );
}
