import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const messages = [
  "Testé dermatologiquement",
  "Satisfait ou remboursé",
  "Ton meilleur deal pour un max de confort",
  "Achetez 3 articles obtenez 23% de réduction !",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % messages.length);
  const prev = () => setIndex((i) => (i - 1 + messages.length) % messages.length);

  return (
    <div className="bg-coral text-white text-sm py-2.5 relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center relative">
        <button onClick={prev} className="absolute left-4 hover:opacity-70 transition-opacity">
          <ChevronLeft size={16} />
        </button>
        <span className="font-medium tracking-wide">{messages[index]}</span>
        <button onClick={next} className="absolute right-4 hover:opacity-70 transition-opacity">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
