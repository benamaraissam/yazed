import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-78_a11e0245-1a0a-4ae7-a423-d2589fc12c93.jpg?v=1766744552",
    alt: "Shampoing solide Yazed",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-81_b69ad2a3-95e0-4ea0-a234-77cdbc50442b.jpg?v=1764692343",
    alt: "Produits Yazed",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-82.jpg?v=1764692382",
    alt: "Accessoires Yazed",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-15.jpg?v=1775137237",
    alt: "Shampoing & Gel douche solide",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-20.jpg?v=1775137237",
    alt: "Yazed produits naturels",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-34.jpg?v=1775137237",
    alt: "Produits éco-responsables",
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0787/3560/6019/files/Photo-2.jpg?v=1775137237",
    alt: "Yazed beauté durable",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "clamp(400px, 55vw, 650px)" }}>
      <div
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full flex-shrink-0 h-full relative">
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal p-2 rounded-full shadow transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal p-2 rounded-full shadow transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-coral" : "bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
