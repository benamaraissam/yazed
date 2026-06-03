import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useEffect, useState } from "react";

export function AboutPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => setProducts(data.slice(0, 3)));
  }, []);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-78_a11e0245-1a0a-4ae7-a423-d2589fc12c93.jpg?v=1766744552"
          alt="Yazed"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-teal/60">
          <Link to="/" className="hover:text-coral">Page d'accueil</Link>
          <span>/</span>
          <span className="text-teal">YAZED</span>
        </div>
      </div>

      {/* Notre histoire */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-sm text-teal/60 uppercase tracking-wider mb-2">Notre histoire</p>
        <h2 className="text-2xl md:text-3xl font-bold text-teal mb-6">
          Yazed est né d'une idée simple
        </h2>
        <p className="text-teal font-medium mb-4">
          Offrir des soins efficaces et respectueux, qui prennent soin de vous tout en préservant la planète.
        </p>
        <p className="text-teal/80 leading-relaxed">
          Minimaliste par essence, notre shampoing & Gel douche solide réunit cheveux et corps dans un seul produit, pensé pour toute la famille. Ce choix évite le gaspillage, réduit les déchets et rend chaque routine plus durable, sans jamais renoncer au plaisir ni à l'efficacité.
        </p>
      </section>

      {/* Pourquoi Yazed */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-teal mb-8 text-center">Pourquoi Yazed ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Redonne éclat et brillance aux cheveux ternes",
            "Mousse généreuse et onctueuse, meilleure que la plupart des shampoings solides",
            "Combat efficacement les pellicules",
            "Produit 2 en 1 pour cheveux & corps, adapté à toute la famille dès 3 ans",
            "98% d'ingrédients d'origine végétale",
            "Sans plastique, sans eau, sans sulfates, sans parabens",
            "Emballage biodégradable et zéro déchet non recyclable",
            "Formule approuvée",
            "Fabriqué en Tunisie, avec passion et expertise",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-teal/10">
              <span className="text-coral mt-0.5">●</span>
              <span className="text-sm text-teal/80">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shop the look */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-xl font-bold text-teal mb-8 text-center">Shop the look</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
