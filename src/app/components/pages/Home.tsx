import { Link } from "react-router";
import { Award, Users, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "../ProductCard";
import { products } from "../../data/products";
import { SEO } from "../SEO";

export function Home() {
  const featuredProducts = products.slice(0, 4);

  const stats = [
    {
      icon: <Award className="w-6 h-6" />,
      value: "10+",
      label: "Années d'Excellence",
      delay: 0.1
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: "5000+",
      label: "Ambassadeurs",
      delay: 0.2
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      value: "100%",
      label: "Cuir Véritable",
      delay: 0.3
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      value: "Artisanal",
      label: "Savoir-faire Sénégalais",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <SEO 
        title="Accueil" 
        description="MBELGOR - L'excellence de l'artisanat africain. Découvrez nos collections de chaussures et sacs en cuir véritable, faits main au Sénégal."
        keywords="chaussures luxe, artisanat sénégalais, mode africaine, MBELGOR, cuir véritable"
      />

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <img
            src="/hero-banner-final.png"
            alt="Collection MBELGOR"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <h1
            className="text-4xl md:text-7xl lg:text-8xl tracking-[0.2em] md:tracking-[0.25em] text-white mb-6 md:mb-8"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            MBELGOR
          </h1>
          <p className="text-xs md:text-base tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/90 mb-12 md:mb-16" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Chaussures Artisanales de Luxe
          </p>
          <Link
            to="/collection"
            className="group text-[10px] md:text-xs tracking-[0.2em] uppercase text-white border border-white px-8 py-4 hover:bg-white hover:text-[#3F1010] transition-all duration-300 backdrop-blur-sm"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Découvrir
          </Link>
        </motion.div>
      </section>

      {/* Stats & Values Section */}
      <section className="relative -mt-12 md:-mt-16 z-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-[#3F1010]/5 p-6 md:p-12 border border-[#3F1010]/5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-3 md:space-y-4"
              >
                <div className="text-[#3F1010]/30 bg-[#3F1010]/5 p-3 md:p-4 rounded-xl md:rounded-2xl">
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <h3 
                    className="text-xl md:text-3xl text-[#3F1010]" 
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {stat.value}
                  </h3>
                  <p 
                    className="text-[8px] md:text-xs tracking-widest uppercase text-[#111111]/40 font-bold"
                  >
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Section 1 - Image + Text */}
      <section className="py-20 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <h2
                className="text-3xl md:text-5xl lg:text-6xl text-[#3F1010] mb-6 md:mb-8 leading-tight"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                L'Excellence<br />Artisanale
              </h2>
              <p className="text-[#111111]/70 text-sm md:text-lg leading-relaxed mb-4 md:mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Chaque paire MBELGOR est le fruit d'un savoir-faire transmis de génération en génération.
              </p>
              <p className="text-[#111111]/70 text-sm md:text-lg leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Nous célébrons l'authenticité africaine à travers des créations qui allient tradition et modernité.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl">
                <img
                  src="/image/artisan-black.png"
                  alt="Artiste artisan travaillant le cuir"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid - Editorial Style */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-32"
          >
            <h2
              className="text-3xl md:text-5xl lg:text-6xl text-[#3F1010] mb-4 md:mb-6"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              Collection
            </h2>
            <p className="text-[#111111]/60 text-[10px] md:text-sm tracking-[0.2em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Savoir-faire & élégance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16 md:mt-32"
          >
            <Link
              to="/collection"
              className="inline-block text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#3F1010] border border-[#3F1010] px-8 md:px-10 py-3 md:py-4 hover:bg-[#3F1010] hover:text-white transition-all duration-300"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Voir toute la collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Editorial Section 2 - Text + Image (Inverted) */}
      <section className="py-20 md:py-40 bg-[#F5F1EC]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-xl">
                <img
                  src="/image/lifestyle-black.png"
                  alt="Style et élégance MBELGOR"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl md:text-5xl lg:text-6xl text-[#3F1010] mb-6 md:mb-8 leading-tight"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Cuir<br />Premium
              </h2>
              <p className="text-[#111111]/70 text-sm md:text-lg leading-relaxed mb-4 md:mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Nous sélectionnons les plus beaux cuirs pour garantir confort, durabilité et élégance.
              </p>
              <p className="text-[#111111]/70 text-sm md:text-lg leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Chaque matière est choisie avec soin pour sublimer nos créations artisanales.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="h-[50vh] md:h-screen relative">
        <img
          src="/image/chaussure homme/WhatsApp Image 2026-03-24 at 12.46.40.jpeg"
          alt="Détail artisanal chaussure MBELGOR"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-40 bg-[#D6C6B8]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2
            className="text-3xl md:text-5xl lg:text-6xl text-[#3F1010] mb-8 md:mb-12"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Commander
          </h2>
          <p className="text-[#111111]/70 text-sm md:text-lg leading-relaxed mb-8 md:mb-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Contactez-nous via WhatsApp pour toute commande personnalisée ou question.
          </p>
          <a
            href="https://wa.me/221788929538?text=Bonjour, je souhaite découvrir vos créations."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#3F1010] border border-[#3F1010] px-8 md:px-10 py-3 md:py-4 hover:bg-[#3F1010] hover:text-white transition-all duration-300"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Commander via WhatsApp
          </a>
        </motion.div>
      </section>
    </div>
  );
}
