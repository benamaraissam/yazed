import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col animate-fade-in">
        <div className="flex items-center justify-between p-5 border-b border-teal/10">
          <h2 className="text-lg font-semibold text-teal">Panier</h2>
          <button onClick={() => setIsOpen(false)} className="text-teal hover:text-coral">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-teal/60 mb-4">Votre panier est vide</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-coral hover:underline text-sm"
              >
                Continuer d'acheter &gt;
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <div key={item.product_id} className="flex gap-4 bg-white rounded-lg p-3 border border-teal/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.product_id === 1 ? 'shampoing-gel-douche-solide' : item.product_id === 2 ? 'porte-savon-magnetique-mural' : 'sac-a-savon-eponge-de-luffa'}`}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-teal hover:text-coral truncate block"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-teal/70 mt-1">
                      {(item.price / 100).toFixed(3)} DT
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-teal/20 rounded">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="px-2 py-1 text-teal hover:bg-teal/5"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm text-teal font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="px-2 py-1 text-teal hover:bg-teal/5"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-teal/40 hover:text-coral transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-teal/10 p-5 space-y-4">
            <div className="flex justify-between text-teal font-semibold">
              <span>Total</span>
              <span>{(cartTotal / 100).toFixed(3)} DT</span>
            </div>
            <button
              onClick={() => alert("Passage à la caisse – fonctionnalité en cours de développement")}
              className="w-full bg-teal text-white py-3 rounded font-medium hover:bg-teal-light transition-colors"
            >
              Vérifier
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
