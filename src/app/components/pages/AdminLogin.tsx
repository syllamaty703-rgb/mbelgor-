import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { SEO } from "../SEO";
import { supabase } from "../../utils/supabaseClient";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Échec de l'authentification", {
          description: error.message === "Invalid login credentials" 
            ? "Email ou mot de passe incorrect." 
            : error.message
        });
      } else if (data.session) {
        toast.success("Authentification réussie", {
          description: "Bienvenue dans l'espace administration."
        });
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
      <SEO title="Admin Login" description="Accès sécurisé à l'administration MBELGOR" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white/5 border border-white/10 p-10 backdrop-blur-xl rounded-3xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-[#3F1010]/20 rounded-2xl mb-6">
            <ShieldAlert className="w-8 h-8 text-[#D6C6B8]" />
          </div>
          <h1 className="text-3xl text-white mb-2" style={{ fontFamily: 'Cinzel, serif' }}>Administration</h1>
          <p className="text-white/40 text-sm">Accès réservé aux administrateurs MBELGOR</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-1">Email Admin</label>
            <div className="relative group">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 transition-colors group-focus-within:text-[#D6C6B8]" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-4 pl-10 pr-4 outline-none focus:border-[#D6C6B8] transition-colors text-white placeholder:text-white/10"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-1">Mot de passe</label>
            <div className="relative group">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 transition-colors group-focus-within:text-[#D6C6B8]" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-4 pl-10 pr-4 outline-none focus:border-[#D6C6B8] transition-colors text-white placeholder:text-white/10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#D6C6B8] text-[#111111] py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? "Vérification..." : "Accéder au Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-white/20 italic">
            Note : Vous devez créer votre compte dans l'onglet Authentication de Supabase avant de vous connecter.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
