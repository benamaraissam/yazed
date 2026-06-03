import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeroSlider } from "../components/HeroSlider";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { Minus, Plus, ShieldCheck, Truck, RotateCcw, Weight } from "lucide-react";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const mainProduct = products.find((p) => p.slug === "shampoing-gel-douche-solide");
  const accessories = products.filter((p) => p.collection === "accessoires");

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* YAZED Title */}
      <section className="py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal tracking-wide">YAZED</h2>
      </section>

      {/* Featured Product */}
      {mainProduct && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="grid grid-cols-2 gap-3">
              {mainProduct.images.slice(0, 4).map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-lg bg-white border border-teal/10">
                  <img
                    src={img}
                    alt={mainProduct.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-teal/60 uppercase tracking-wider mb-2">YAZED</p>
              <h2 className="text-2xl md:text-3xl font-bold text-teal mb-4">{mainProduct.title}</h2>
              <p className="text-2xl font-bold text-teal mb-6">{mainProduct.price_formatted}</p>

              <div className="mb-6">
                <label className="text-sm text-teal font-medium block mb-2">Quantité:</label>
                <div className="flex items-center border border-teal/20 rounded w-fit">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-teal hover:bg-teal/5">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 text-teal font-medium">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-teal hover:bg-teal/5">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => addToCart(mainProduct, qty)}
                className="w-full bg-teal text-white py-3 rounded font-medium hover:bg-teal-light transition-colors mb-4"
              >
                Ajouter au panier
              </button>

              <Link
                to={`/products/${mainProduct.slug}`}
                className="block text-center text-sm text-coral hover:underline"
              >
                Passer à l'information de produit
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Accessories */}
      {accessories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-teal">Accessoires</h2>
            <Link to="/collections/accessoires" className="text-sm text-coral hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessories.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Shop the look */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold text-teal mb-8 text-center">Shop the look</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-15.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-16_1f8adcda-5031-4460-934c-69dab7d23fe8.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-20.jpg?v=1775137237",
            "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-34.jpg?v=1775137237",
          ].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg">
              <img src={img} alt={`Look ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* How to use */}
      {mainProduct && mainProduct.steps && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-teal mb-8 text-center">Comment l'utiliser ?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mainProduct.steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-teal text-white flex items-center justify-center text-xl font-bold">
                  {step.num}
                </div>
                <h3 className="font-semibold text-teal mb-1">{step.title}</h3>
                <p className="text-sm text-teal/70">{step.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Info section */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold text-teal mb-8 text-center">Section pratique (Infos & Garantie)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-lg border border-teal/10">
            <Weight size={28} className="mx-auto mb-3 text-coral" />
            <h3 className="font-semibold text-teal mb-1">Poids</h3>
            <p className="text-sm text-teal/70">70 g</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-teal/10">
            <ShieldCheck size={28} className="mx-auto mb-3 text-coral" />
            <h3 className="font-semibold text-teal mb-1">Testé dermatologiquement</h3>
            <p className="text-sm text-teal/70">Approuvé pour un respect total.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-teal/10">
            <Truck size={28} className="mx-auto mb-3 text-coral" />
            <h3 className="font-semibold text-teal mb-1">Livraison rapide</h3>
            <p className="text-sm text-teal/70">24-48h en Tunisie, avec paiement à la livraison</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg border border-teal/10">
            <RotateCcw size={28} className="mx-auto mb-3 text-coral" />
            <h3 className="font-semibold text-teal mb-1">Satisfait ou remboursé</h3>
            <p className="text-sm text-teal/70">Vous disposez de 15 jours pour changer d'avis.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
