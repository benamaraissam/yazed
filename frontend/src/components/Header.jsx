import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const navLinks = [
  { label: "À propos", href: "/pages/yazed" },
  { label: "Shampoing & Douche Solide", href: "/collections/shampoing" },
  { label: "Accessoires", href: "/collections/accessoires" },
];

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setIsOpen } = useCart();
  const location = useLocation();

  return (
    <header className="bg-cream sticky top-0 z-50 border-b border-teal/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile menu button */}
        <button
          className="lg:hidden text-teal"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-3xl font-bold text-teal tracking-tight" style={{ fontFamily: "'Instrument Sans', cursive" }}>
            Yazed<span className="text-coral text-lg align-top">*</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-coral ${
                location.pathname === link.href ? "text-coral" : "text-teal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-teal hover:text-coral transition-colors"
          >
            <Search size={20} />
          </button>
          <Link to="/pages/contact" className="text-teal hover:text-coral transition-colors">
            <User size={20} />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="text-teal hover:text-coral transition-colors relative"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-teal/10 px-4 py-3 bg-cream">
          <div className="max-w-7xl mx-auto relative">
            <input
              type="text"
              placeholder="Entrez des mots-clés pour voir des résultats rapides"
              className="w-full bg-white border border-teal/20 rounded px-4 py-2.5 text-sm text-teal placeholder:text-teal/40 focus:outline-none focus:border-coral"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-teal/50 hover:text-teal"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-teal/10 px-4 py-4 bg-cream">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium ${
                  location.pathname === link.href ? "text-coral" : "text-teal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
