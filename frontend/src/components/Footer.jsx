import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-cream border-t border-teal/10 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Address */}
          <div>
            <div className="flex items-start gap-2 text-teal text-sm mb-2">
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span>250 rue Ahmed tlili-2050 hammam-lif</span>
            </div>
            <div className="flex items-center gap-2 text-teal text-sm mb-2">
              <Mail size={16} className="flex-shrink-0" />
              <a href="mailto:contact@yazed.tn" className="underline hover:text-coral">contact@yazed.tn</a>
            </div>
            <div className="flex items-center gap-2 text-teal text-sm">
              <Phone size={16} className="flex-shrink-0" />
              <a href="tel:+21628763842" className="hover:text-coral">+216 28 763 842</a>
            </div>
          </div>

          {/* Useful links */}
          <div>
            <h4 className="text-teal font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pages/yazed" className="text-teal text-sm hover:text-coral transition-colors">
                  à propos
                </Link>
              </li>
              <li>
                <Link to="/pages/contact" className="text-teal text-sm hover:text-coral transition-colors">
                  contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-teal font-semibold mb-4">Collections</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/collections/shampoing" className="text-teal text-sm hover:text-coral transition-colors">
                  Shampoing & Gel Douche
                </Link>
              </li>
              <li>
                <Link to="/collections/accessoires" className="text-teal text-sm hover:text-coral transition-colors">
                  Accessoires
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-teal font-semibold mb-4">Inscrivez-vous à nos emails pour rester à jour.</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Merci pour votre inscription !");
              }}
              className="flex"
            >
              <input
                type="email"
                placeholder="Email"
                required
                className="flex-1 bg-white border border-teal/20 rounded-l px-3 py-2 text-sm text-teal placeholder:text-teal/40 focus:outline-none focus:border-coral"
              />
              <button
                type="submit"
                className="bg-teal text-white px-4 py-2 text-sm font-medium rounded-r hover:bg-teal-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social & copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-teal/10 gap-4">
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/yazed.tn/" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-coral transition-colors text-sm font-semibold">
              FB
            </a>
            <a href="https://www.instagram.com/yazedtn/" target="_blank" rel="noopener noreferrer" className="text-teal hover:text-coral transition-colors text-sm font-semibold">
              IG
            </a>
          </div>
          <p className="text-teal/60 text-xs">© YAZED • Customized by Pixels Trend Agency</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-teal text-xs hover:text-coral transition-colors border border-teal/20 rounded px-3 py-1.5"
          >
            Retour au sommet <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
