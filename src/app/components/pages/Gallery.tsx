import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { SEO } from "../SEO";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export function Gallery() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const lookbookImages = [
    { url: "/image/hero-black-premium.png", title: "L'Essence", subtitle: "Artisanat Pur", size: "col-span-2 row-span-2" },
    { url: "/image/chaussure homme/WhatsApp Image 2026-03-24 at 12.46.40.jpeg", title: "Précision", subtitle: "Coutures Main" },
    { url: "/image/artisan-black.png", title: "Le Geste", subtitle: "Héritage", size: "col-span-1 row-span-2" },
    { url: "/image/chaussure femme/WhatsApp Image 2026-04-03 at 12.40.24.jpeg", title: "Élégance", subtitle: "Finition" },
    { url: "/image/chaussure homme/WhatsApp Image 2026-04-03 at 12.40.24 (2).jpeg", title: "Mouvement", subtitle: "Confort" },
    { url: "/image/lifestyle-black.png", title: "Allure", subtitle: "Signature", size: "col-span-2" },
    { url: "/image/chaussure femme/WhatsApp Image 2026-04-03 at 12.40.26.jpeg", title: "Détail", subtitle: "Perfection" },
    { url: "/image/chaussure homme/WhatsApp Image 2026-04-03 at 12.40.24 (3).jpeg", title: "Luxe", subtitle: "Matière" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EC]" ref={containerRef}>
      <SEO 
        title="Galerie" 
        description="Plongez dans l'univers visuel de MBELGOR. Un lookbook explorant l'artisanat sénégalais, le luxe and le détail de nos créations."
        keywords="lookbook chaussures, galerie artisanat, photos luxe Sénégal, maroquinerie d'art"
      />

      {/* Editorial Header */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-20 flex flex-col items-center justify-center text-center px-6 border-b border-[#3F1010]/5">
        <div className="max-w-7xl w-full mx-auto flex justify-start mb-12">
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-4 md:space-y-6"
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#3F1010]/60 font-bold">
            Le Lookbook MBELGOR
          </span>
          <h1
            className="text-5xl md:text-8xl lg:text-9xl text-[#3F1010] leading-none"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Vision
          </h1>
          <p className="text-[#111111]/40 text-xs md:text-base max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Exploration visuelle de l'artisanat sénégalais, capturée dans son état le plus pur.
          </p>
        </motion.div>
      </section>

      {/* Modern Masonry Grid */}
      <section className="py-16 md:py-32 px-4 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 auto-rows-[300px] md:auto-rows-[400px]">
          {lookbookImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white ${image.size || ""}`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 md:group-hover:scale-110"
              />
              
              {/* Artistic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F1010]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[8px] md:text-[10px] tracking-widest uppercase mb-1 md:mb-2 opacity-80">{image.subtitle}</p>
                  <h3 className="text-2xl md:text-3xl font-light" style={{ fontFamily: 'Cinzel, serif' }}>{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 md:py-60 px-6 text-center overflow-hidden">
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="max-w-4xl mx-auto space-y-8 md:space-y-12"
        >
          <h2 className="text-2xl md:text-6xl text-[#3F1010] leading-tight" style={{ fontFamily: 'Cinzel, serif' }}>
            "Chaque pas est une œuvre d'art, chaque couture une promesse."
          </h2>
          <div className="w-16 md:w-20 h-[1px] bg-[#3F1010]/20 mx-auto" />
          <p className="text-[#111111]/60 tracking-[0.2em] text-[10px] md:text-xs uppercase font-bold">
            Signature MBELGOR
          </p>
        </motion.div>
      </section>
    </div>
  );
}
