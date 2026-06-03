import { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);

function getSessionId() {
  let id = localStorage.getItem("yazed_session_id");
  if (!id) {
    id = Math.random().toString(36).substring(2, 15);
    localStorage.setItem("yazed_session_id", id);
  }
  return id;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => getSessionId());

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`/api/cart/${sessionId}`);
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (product, quantity = 1) => {
    const item = {
      product_id: product.id,
      quantity,
      title: product.title,
      price: product.price,
      image: product.images[0],
    };
    try {
      const res = await fetch(`/api/cart/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
        setIsOpen(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [sessionId]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const res = await fetch(`/api/cart/${sessionId}/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [sessionId]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await fetch(`/api/cart/${sessionId}/${productId}?quantity=${quantity}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [sessionId]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
