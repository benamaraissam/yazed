import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Marquee banner */}
      <div className="bg-coral text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-sm font-medium italic">Contactez-nous</span>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-teal/60">
          <Link to="/" className="hover:text-coral">Page d'accueil</Link>
          <span>/</span>
          <span className="text-teal">Contact</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-teal mb-8">Contactez-nous</h2>
            {submitted ? (
              <div className="bg-white border border-teal/10 rounded-lg p-6 text-center">
                <p className="text-teal font-medium mb-2">Merci pour votre message !</p>
                <p className="text-sm text-teal/70">Nous vous répondrons sous peu.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-coral hover:underline text-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-teal mb-1.5">
                    Votre nom <span className="text-coral">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Entrez votre nom"
                    className="w-full bg-white border border-teal/20 rounded px-4 py-3 text-sm text-teal placeholder:text-teal/40 focus:outline-none focus:border-coral"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal mb-1.5">
                    Votre e-mail <span className="text-coral">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Entrez votre email"
                    className="w-full bg-white border border-teal/20 rounded px-4 py-3 text-sm text-teal placeholder:text-teal/40 focus:outline-none focus:border-coral"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal mb-1.5">
                    Votre message <span className="text-coral">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Entrez votre message"
                    className="w-full bg-white border border-teal/20 rounded px-4 py-3 text-sm text-teal placeholder:text-teal/40 focus:outline-none focus:border-coral resize-y"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal text-white px-8 py-3 rounded font-medium hover:bg-teal-light transition-colors disabled:opacity-50"
                >
                  {loading ? "Envoi..." : "Envoyer un message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-teal mb-1">Adresse</h3>
                <p className="text-sm text-teal/70">250 rue Ahmed tlili-2050 hammam-lif</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-teal mb-1">Email</h3>
                <a href="mailto:contact@yazed.tn" className="text-sm text-teal/70 hover:text-coral">contact@yazed.tn</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-teal mb-1">Téléphone</h3>
                <a href="tel:+21628763842" className="text-sm text-teal/70 hover:text-coral">+216 28 763 842</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
