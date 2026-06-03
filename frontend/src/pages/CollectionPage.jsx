import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";

export function CollectionPage() {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("featured");
  const [cols, setCols] = useState(3);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/collections/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setCollection(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const sortedProducts = collection?.products ? [...collection.products] : [];
  if (sort === "price-asc") sortedProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") sortedProducts.sort((a, b) => b.price - a.price);
  if (sort === "name") sortedProducts.sort((a, b) => a.title.localeCompare(b.title));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-64 bg-teal/10 rounded-lg" />
          <div className="h-8 bg-teal/10 rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  if (!collection || collection.error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-teal mb-4">Collection non trouvée</h2>
        <Link to="/collections/all" className="text-coral hover:underline">
          Voir tous les produits
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Collection hero */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src={collection.products[0]?.images[0] || "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-78_a11e0245-1a0a-4ae7-a423-d2589fc12c93.jpg?v=1766744552"}
          alt={collection.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-teal/30 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{collection.title}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-teal/60">
          <Link to="/" className="hover:text-coral">Page d'accueil</Link>
          <span>/</span>
          <Link to="/collections/all" className="hover:text-coral">Collections</Link>
          <span>/</span>
          <span className="text-teal">{collection.title}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-teal/10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-sm text-teal hover:text-coral transition-colors"
            >
              <SlidersHorizontal size={16} />
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => setCols(3)} className={`p-1.5 rounded ${cols === 3 ? "text-coral" : "text-teal/40"}`}>
                <LayoutGrid size={18} />
              </button>
              <button onClick={() => setCols(2)} className={`p-1.5 rounded ${cols === 2 ? "text-coral" : "text-teal/40"}`}>
                <List size={18} />
              </button>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-teal/20 rounded px-3 py-1.5 text-sm text-teal focus:outline-none focus:border-coral"
            >
              <option value="featured">En vedette</option>
              <option value="name">Alphabétique</option>
              <option value="price-asc">Prix: faible à élevé</option>
              <option value="price-desc">Prix: élevé à faible</option>
            </select>
          </div>
        </div>

        {showFilter && (
          <div className="py-4 border-b border-teal/10">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-teal cursor-pointer">
                <input type="checkbox" className="accent-coral" />
                In stock only
              </label>
            </div>
          </div>
        )}

        <p className="text-sm text-teal/60 mt-4">{collection.title} ({sortedProducts.length} produit{sortedProducts.length > 1 ? "s" : ""})</p>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"} gap-6`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-teal/60">Aucun produit dans cette collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
