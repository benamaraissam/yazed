import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";
import { Minus, Plus, Check, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [showAdded, setShowAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setCurrentImage(0);
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => {
        setRelated(data.filter((p) => p.slug !== slug).slice(0, 2));
      });
  }, [slug]);

  const handleAdd = () => {
    if (product) {
      addToCart(product, qty);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-96 bg-teal/10 rounded-lg" />
          <div className="h-8 bg-teal/10 rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!product || product.error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-teal mb-4">Produit non trouvé</h2>
        <Link to="/collections/all" className="text-coral hover:underline">
          Voir tous les produits
        </Link>
      </div>
    );
  }

  const nextImg = () => setCurrentImage((c) => (c + 1) % product.images.length);
  const prevImg = () => setCurrentImage((c) => (c - 1 + product.images.length) % product.images.length);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-teal/60">
          <Link to="/" className="hover:text-coral">Page d'accueil</Link>
          <span>/</span>
          <Link to={`/collections/${product.collection}`} className="hover:text-coral capitalize">{product.collection}</Link>
          <span>/</span>
          <span className="text-teal">{product.title}</span>
        </div>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-teal/10 mb-3">
              <img
                src={product.images[currentImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal p-2 rounded-full shadow">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal p-2 rounded-full shadow">
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-teal/70 bg-white/80 px-3 py-1 rounded-full">
                {currentImage + 1} / {product.images.length}
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === currentImage ? "border-coral" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs text-teal/60 uppercase tracking-wider mb-2">Fournisseur YAZED</p>
            <h1 className="text-2xl md:text-3xl font-bold text-teal mb-4">{product.title}</h1>
            <p className="text-2xl font-bold text-teal mb-4">{product.price_formatted}</p>

            {product.in_stock > 0 && (
              <div className="flex items-center gap-2 text-sm text-teal mb-6">
                <Check size={16} className="text-green-600" />
                <span>In stock: {product.in_stock}</span>
              </div>
            )}

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
              onClick={handleAdd}
              className="w-full bg-teal text-white py-3 rounded font-medium hover:bg-teal-light transition-colors mb-4"
            >
              {showAdded ? "Produit ajouté !" : "Ajouter au panier"}
            </button>

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-semibold text-teal mb-2">Description</h3>
              <p className="text-sm text-teal/80 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && (
              <div className="mt-8">
                <h3 className="font-semibold text-teal mb-3">Points clés</h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal/80">
                      <span className="text-coral mt-0.5">●</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Details */}
            {product.details && (
              <div className="mt-8">
                <h3 className="font-semibold text-teal mb-3">Détails du produit</h3>
                <ul className="space-y-2">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-teal/80">
                      <span className="text-coral mt-0.5">●</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {product.benefits && (
              <div className="mt-8">
                <h3 className="font-semibold text-teal mb-3">Ingrédients & Bienfaits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-teal/10">
                      <h4 className="font-semibold text-teal text-sm mb-1">{b.title}</h4>
                      <p className="text-xs text-teal/70">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {product.testimonials && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-teal mb-8 text-center">Témoignages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-teal/10 text-center">
                <p className="font-semibold text-teal mb-2">{t.name}</p>
                <p className="text-sm text-teal/80 italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-teal mb-8 text-center">Explorez la Beauté Durable</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/collections/all" className="inline-block bg-teal text-white px-8 py-3 rounded font-medium hover:bg-teal-light transition-colors">
              Commander maintenant
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
