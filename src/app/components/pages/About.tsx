import { motion } from "motion/react";
import { SEO } from "../SEO";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <SEO 
        title="Notre Histoire" 
        description="Découvrez l'histoire de MBELGOR, une marque née d'une vision : célébrer l'authenticité et le savoir-faire de l'artisanat africain."
        keywords="histoire MBELGOR, artisanat africain, luxe Sénégal, chaussures fait main"
      />

      {/* Hero Image - Full Screen */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden">
        <div className="absolute top-32 left-6 md:top-48 md:left-12 z-20">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center transition-all group-hover:border-white/40 group-hover:bg-white/10 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">Retour</span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="h-full w-full"
        >
          <img
            src="/image/lifestyle-black.png"
            alt="L'esprit MBELGOR"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#F5F1EC]"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-20 md:bottom-32 left-0 right-0 text-center px-6"
        >
          <h1
            className="text-4xl md:text-7xl text-white tracking-wide mb-4"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Notre Histoire
          </h1>
          <p className="text-[10px] md:text-sm tracking-[0.3em] uppercase text-white/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Savoir-faire & authenticité
          </p>
        </motion.div>
      </section>

      {/* Story Section 1 */}
      <section className="py-20 md:py-40">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-5xl text-[#3F1010] mb-8 md:mb-12 leading-tight"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              L'Essence de<br />MBELGOR
            </h2>
            <div className="space-y-6 md:space-y-8 text-[#111111]/70 text-base md:text-xl leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <p>
                MBELGOR est née d'une vision : créer des chaussures qui célèbrent l'authenticité, l'élégance et le savoir-faire africain.
              </p>
              <p>
                Chaque paire est le fruit d'un héritage artisanal transmis de génération en génération. Nos artisans façonnent chaque modèle avec précision et passion.
              </p>
              <p>
                Du choix du cuir premium à la couture finale, chaque étape est réalisée à la main, garantissant une qualité exceptionnelle et un confort incomparable.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Width Image 1 */}
      <section className="h-[50vh] md:h-screen relative">
        <img
          src="/image/artisan-black.png"
          alt="Artisan MBELGOR au travail"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-40 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-2xl md:text-4xl text-[#3F1010] mb-6 md:mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Vision
              </h3>
              <p className="text-[#111111]/70 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Devenir la référence des chaussures artisanales africaines, alliant tradition et modernité pour offrir des créations intemporelles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-2xl md:text-4xl text-[#3F1010] mb-6 md:mb-8"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                Mission
              </h3>
              <p className="text-[#111111]/70 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Créer des chaussures d'exception qui célèbrent le savoir-faire local, offrant confort, durabilité et raffinement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-40">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl text-[#3F1010] mb-12 md:mb-20 text-center"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Nos Valeurs
          </motion.h2>

          <div className="space-y-12 md:space-y-16">
            {[
              { title: "Authenticité", description: "Nous restons fidèles à nos racines et techniques traditionnelles, tout en embrassant l'innovation." },
              { title: "Excellence", description: "Chaque détail compte. Nous ne faisons aucun compromis sur la qualité des matériaux et la précision du travail." },
              { title: "Durabilité", description: "Nos chaussures sont conçues pour durer. Nous privilégions des matériaux durables et respectueux de l'environnement." },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-[#3F1010]/20 pb-6 md:pb-8"
              >
                <h3
                  className="text-xl md:text-3xl text-[#3F1010] mb-4"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  {value.title}
                </h3>
                <p className="text-[#111111]/70 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
