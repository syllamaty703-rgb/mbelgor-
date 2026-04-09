import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { SEO } from "../SEO";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");

  const product = products.find(p => p.id === id) || products[0];
  const sizes = ["39", "40", "41", "42", "43", "44", "45"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppOrder = () => {
    const message = `Bonjour MBELGOR, je souhaite commander le modèle ${product.name} en taille ${selectedSize || "à définir"}.`;
    const whatsappUrl = `https://wa.me/221788929538?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une pointure avant d'ajouter cet article au panier.");
      return;
    }
    addToCart(product, selectedSize);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <SEO 
        title={product.name} 
        description={product.description}
        keywords={`${product.name}, chaussure artisanale, cuir premium, MBELGOR, mode Dakar`}
      />

      {/* Hero Gallery Area */}
      <section className="h-[60vh] md:h-screen relative overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={product.images[currentImageIndex]}
            alt={product.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full object-contain p-4 md:p-8"
          />
        </AnimatePresence>

        {/* Navigation Dots - Premium Overlay Style */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4 z-20">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="group relative py-3 md:py-4"
            >
              <div className={`h-[2px] transition-all duration-500 rounded-full ${
                currentImageIndex === index ? "w-8 md:w-12 bg-white" : "w-4 md:w-6 bg-white/40 group-hover:bg-white/60"
              }`} />
            </button>
          ))}
        </div>

        {/* Side Controls (Desktop) */}
        <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-4 md:px-12 pointer-events-none">
          <button 
            onClick={() => setCurrentImageIndex((prev: number) => (prev > 0 ? prev - 1 : product.images.length - 1))}
            className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all text-sm"
          >
            ←
          </button>
          <button 
            onClick={() => setCurrentImageIndex((prev: number) => (prev < product.images.length - 1 ? prev + 1 : 0))}
            className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all text-sm"
          >
            →
          </button>
        </div>
      </section>

      {/* Product Details - Redesigned for Premium Look */}
      <section className="py-16 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#3F1010]/40 hover:text-[#3F1010] transition-colors group mb-12 md:mb-20"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#3F1010]/10 flex items-center justify-center transition-all group-hover:border-[#3F1010]/30 group-hover:bg-[#3F1010]/5">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Retour</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 md:space-y-12"
            >
              <div className="space-y-2 md:space-y-4">
                <p className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#3F1010]/60 font-bold">
                  Collection Exclusive MBELGOR
                </p>
                <h1
                  className="text-4xl md:text-6xl text-[#3F1010] leading-tight"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {product.name}
                </h1>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#111111]/40 font-bold">
                  Description
                </h3>
                <p className="text-[#111111]/70 text-base md:text-lg leading-relaxed max-w-xl">
                  {product.description}
                </p>
                <p className="text-[#111111]/70 text-sm md:text-base leading-relaxed max-w-xl">
                  {product.details}
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#111111]/40 font-bold">
                  Détails Techniques
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {product.materials.map((material, index) => (
                    <li key={index} className="flex items-center gap-3 text-xs md:text-sm text-[#111111]/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3F1010]/30" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Pricing & Purchase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#F5F1EC] p-8 md:p-12 rounded-[2rem] border border-[#3F1010]/5 space-y-8 md:space-y-12"
            >
              <div className="flex justify-between items-center">
                <p className="text-3xl md:text-4xl text-[#3F1010] font-light">
                  {product.price} <span className="text-base md:text-lg opacity-40">FCFA</span>
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#111111]/40 font-bold">
                    Sélectionner la Taille
                  </h3>
                  <button className="text-[8px] md:text-[10px] underline tracking-widest text-[#111111]/40 hover:text-[#3F1010] transition-colors">
                    GUIDE DES TAILLES
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl border transition-all duration-300 text-sm font-medium ${
                        selectedSize === size
                          ? "border-[#3F1010] bg-[#3F1010] text-white shadow-lg shadow-[#3F1010]/20"
                          : "border-[#3F1010]/10 text-[#111111] bg-white hover:border-[#3F1010]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#3F1010] text-white text-[10px] md:text-xs tracking-[0.25em] uppercase px-8 md:px-10 py-5 md:py-6 rounded-2xl hover:bg-[#3F1010]/90 transition-all duration-300 shadow-xl shadow-[#3F1010]/10 transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Ajouter au Panier
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full border border-[#3F1010] text-[#3F1010] text-[10px] md:text-xs tracking-[0.25em] uppercase px-8 md:px-10 py-5 md:py-6 rounded-2xl hover:bg-[#3F1010] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  Commander via WhatsApp
                </button>
                <p className="text-[8px] md:text-[10px] text-center text-[#111111]/40 tracking-wider">
                  PAIEMENT À LA LIVRAISON DISPONIBLE
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="pb-24 md:pb-40 px-6">
         <div className="max-w-7xl mx-auto border-t border-[#3F1010]/10 pt-16 md:pt-20">
            <h2 className="text-center text-2xl md:text-3xl text-[#3F1010] mb-12 md:mb-20" style={{ fontFamily: 'Cinzel, serif' }}>
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
               {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                 <Link key={p.id} to={`/product/${p.id}`} className="group block space-y-4">
                   <div className="aspect-square rounded-2xl overflow-hidden bg-white">
                     <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <p className="text-xs md:text-sm font-bold text-[#3F1010] truncate tracking-wide">{p.name}</p>
                 </Link>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
