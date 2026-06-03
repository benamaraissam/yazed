import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function ProductCard({ product, showQuickAdd = true }) {
  const { addToCart } = useCart();

  return (
    <div className="group">
      <Link to={`/products/${product.slug}`} className="block relative overflow-hidden rounded-lg bg-white border border-teal/10">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        {showQuickAdd && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="absolute bottom-3 left-3 right-3 bg-teal text-white text-xs font-medium py-2.5 rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            Quick add
          </button>
        )}
      </Link>
      <div className="mt-3 px-1">
        <p className="text-xs text-teal/60 mb-1">Fournisseur YAZED</p>
        <Link to={`/products/${product.slug}`} className="text-sm font-medium text-teal hover:text-coral transition-colors line-clamp-1">
          {product.title}
        </Link>
        <p className="text-sm text-teal font-semibold mt-1">{product.price_formatted}</p>
      </div>
    </div>
  );
}
