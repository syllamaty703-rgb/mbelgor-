import { motion } from "motion/react";
import { Link } from "react-router";
import { useState } from "react";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence } from "motion/react";
import { addUserToStore } from "../../utils/mockDb";
import { SEO } from "../SEO";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        toast.success("Bon retour parmi nous !", {
          description: "Connexion réussie à votre compte MBELGOR."
        });
      } else {
        // Persist to mock DB
        addUserToStore({ name, email });
        
        toast.success("Bienvenue chez MBELGOR !", {
          description: "Votre compte a été créé avec succès."
        });
        setIsLogin(true); // Switch to login after signup
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EC] flex">
      <SEO 
        title="Connexion" 
        description="Connectez-vous à votre compte MBELGOR pour suivre vos commandes et bénéficier d'offres exclusives sur notre maroquinerie de luxe."
        keywords="connexion MBELGOR, compte client mode, luxe artisanat, suivi commande"
      />

      {/* Left Side - Artistic Visual */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-[#3F1010]">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
          src="/image/lifestyle-black.png" 
          alt="Artisanal Heritage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3F1010] to-transparent opacity-60" />
        <div className="absolute bottom-20 left-20 text-white max-w-md">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl font-light mb-6 leading-tight"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Rejoignez<br />l'Excellence
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-[#F5F1EC]/60 leading-relaxed font-light tracking-wide text-lg"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Connectez-vous pour accéder à vos commandes personnalisées and découvrir nos avant-premières exclusives.
          </motion.p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-20 relative">
        <Link to="/" className="absolute top-8 left-8 md:top-12 md:left-12 lg:left-20 flex items-center gap-2 text-[#3F1010]/60 hover:text-[#3F1010] transition-colors group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Retour</span>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12 md:mb-16">
            <h1 
              className="text-4xl text-[#3F1010] mb-4"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {isLogin ? "Connexion" : "Inscription"}
            </h1>
            <p className="text-[#111111]/40 text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {isLogin ? "Ravi de vous revoir chez MBELGOR." : "Rejoignez l'univers de l'excellence artisanale."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#111111]/40 ml-1">Nom Complet</label>
                  <div className="relative group">
                    <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3F1010]/30 transition-colors group-focus-within:text-[#3F1010]" />
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-[#3F1010]/10 py-3 md:py-4 pl-10 pr-4 outline-none focus:border-[#3F1010] transition-colors text-[#3F1010] placeholder:text-[#3F1010]/20"
                      placeholder="Votre nom"
                      required={!isLogin}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#111111]/40 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3F1010]/30 transition-colors group-focus-within:text-[#3F1010]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[#3F1010]/10 py-3 md:py-4 pl-10 pr-4 outline-none focus:border-[#3F1010] transition-colors text-[#3F1010] placeholder:text-[#3F1010]/20"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#111111]/40 ml-1">Mot de passe</label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3F1010]/30 transition-colors group-focus-within:text-[#3F1010]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#3F1010]/10 py-3 md:py-4 pl-10 pr-4 outline-none focus:border-[#3F1010] transition-colors text-[#3F1010] placeholder:text-[#3F1010]/20"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#3F1010] rounded border-[#3F1010]/20" />
                  <span className="text-[10px] text-[#111111]/60 uppercase tracking-wider font-medium">Se souvenir</span>
                </label>
                <button type="button" className="text-[10px] text-[#3F1010] font-bold uppercase tracking-wider hover:opacity-70">
                  Oublié ?
                </button>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3F1010] text-white py-5 rounded-2xl text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#2A0B0B] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#3F1010]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Chargement..." : isLogin ? "Se Connecter" : "Créer mon compte"}
            </button>
          </form>

          <p className="mt-12 text-center text-[10px] md:text-[11px] text-[#111111]/40" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"} {" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#3F1010] font-bold uppercase tracking-widest hover:underline ml-2"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
