import { Link } from "react-router";
import { motion } from "motion/react";
import { Home } from "lucide-react";
import { SEO } from "../SEO";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F1EC] flex flex-col items-center justify-center px-6 text-center">
      <SEO 
        title="Page Non Trouvée" 
        description="Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <h1 
          className="text-8xl md:text-9xl text-[#3F1010]/10 mb-4"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          404
        </h1>
        
        <h2 
          className="text-2xl md:text-3xl text-[#3F1010] mb-6 uppercase tracking-[0.2em]"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          Page Introuvable
        </h2>
        
        <p 
          className="text-[#111111]/60 text-sm md:text-base mb-12 leading-relaxed"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          L'excellence prend du temps, mais cette page semble avoir disparu. 
          Laissez-nous vous ramener vers nos collections artisanales.
        </p>

        <Link
          to="/"
          className="inline-flex items-center space-x-3 text-[10px] md:text-xs tracking-[0.2em] uppercase text-white bg-[#3F1010] px-10 py-5 hover:bg-[#3F1010]/90 transition-all duration-300 shadow-xl shadow-[#3F1010]/20"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <Home className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>
      </motion.div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <h1 
          className="absolute -bottom-20 -left-20 text-[20rem] text-[#3F1010] font-serif"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          M
        </h1>
      </div>
    </div>
  );
}
