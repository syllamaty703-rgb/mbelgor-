import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ProductCard } from "../ProductCard";
import { products as allProducts } from "../../data/products";
import { SEO } from "../SEO";
import { ArrowLeft } from "lucide-react";

export function Collection() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<"tout" | "homme" | "femme">("tout");

  const filteredProducts = activeCategory === "tout" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  const categories = [
    { id: "tout", label: "Tout Voir" },
    { id: "homme", label: "Homme" },
    { id: "femme", label: "Femme" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <SEO 
        title="Collection" 
        description="Explorez la collection complète MBELGOR : mocassins, escarpins, bottines et sandales artisanales pour hommes et femmes."
        keywords="collection chaussures, mocassins luxe, escarpins cuir, bottines artisanales, sandales luxe"
      />

      {/* Hero Header */}
      <section className="pt-32 pb-10 md:pt-48 md:pb-20 text-center px-6">
        <div className="max-w-7xl mx-auto flex justify-start mb-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#3F1010]/40 hover:text-[#3F1010] transition-colors group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#3F1010]/10 flex items-center justify-center transition-all group-hover:border-[#3F1010]/30 group-hover:bg-[#3F1010]/5">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Retour</span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl text-[#3F1010] mb-4 md:mb-6"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Collection
          </h1>
          <p className="text-[#111111]/60 text-[10px] md:text-sm tracking-[0.2em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Artisanat & excellence sans compromis
          </p>
        </motion.div>
      </section>

      {/* Category Tabs */}
      <section className="pb-12 md:pb-16 text-center px-4 overflow-x-auto no-scrollbar">
        <div className="inline-flex gap-6 md:gap-8 border-b border-[#3F1010]/10 pb-4 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`relative text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                activeCategory === cat.id ? "text-[#3F1010] font-bold" : "text-[#111111]/40 hover:text-[#3F1010]"
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {cat.label}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[#3F1010]"
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid - Animated Clean Layout */}
      <section className="pb-24 md:pb-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
