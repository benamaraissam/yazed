import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CollectionPage } from "./pages/CollectionPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CartProvider } from "./context/CartContext";

export function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="collections/:slug" element={<CollectionPage />} />
          <Route path="pages/yazed" element={<AboutPage />} />
          <Route path="pages/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
