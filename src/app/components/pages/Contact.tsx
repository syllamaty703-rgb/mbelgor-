import { MessageCircle, Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SEO } from "../SEO";
import { useNavigate } from "react-router";

export function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Bonjour MBELGOR, je suis ${formData.name}. Email: ${formData.email}. Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/221788929538?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfos = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adresse",
      value: "PIKINE TALLY BOUBESS",
      subtitle: "Dakar, Sénégal"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "mbelgor@gmail.com",
      subtitle: "Support 24/7"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone",
      value: "+221 78 892 95 38",
      subtitle: "WhatsApp disponible"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EC]">
      <SEO 
        title="Contact" 
        description="Contactez MBELGOR pour toute question, commande personnalisée ou visite de l'atelier de maroquinerie à Dakar."
        keywords="contact MBELGOR, commander chaussures, RDV atelier Dakar, maroquinerie Sénégal"
      />

      {/* Header */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-32 text-center px-6">
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
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#3F1010]/60 font-bold mb-4 block">
            Nous Contacter
          </span>
          <h1
            className="text-5xl md:text-8xl lg:text-9xl text-[#3F1010] leading-none mb-6 md:mb-8"
            style={{ fontFamily: 'Cinzel, serif' }}
          >
            Lien Direct
          </h1>
          <p className="text-[#111111]/40 text-sm md:text-base max-w-lg mx-auto leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Une demande particulière ou l'envie de découvrir l'atelier ? Nos artisans sont à votre entière disposition.
          </p>
        </motion.div>
      </section>

      {/* Info Cards */}
      <section className="pb-20 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {contactInfos.map((info, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-center group hover:bg-[#3F1010] transition-all duration-500 shadow-sm"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#3F1010]/5 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-[#3F1010] group-hover:bg-white group-hover:text-[#3F1010] transition-colors">
                {info.icon}
              </div>
              <h3 className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-[#3F1010]/40 mb-2 group-hover:text-white/60 transition-colors">{info.title}</h3>
              <p className="text-lg md:text-xl text-[#3F1010] font-medium group-hover:text-white transition-colors" style={{ fontFamily: 'Cinzel, serif' }}>{info.value}</p>
              <p className="text-[10px] md:text-xs text-[#111111]/40 mt-4 group-hover:text-white/40 transition-colors uppercase tracking-widest">{info.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 md:py-48 px-6 bg-white rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-20">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-6xl text-[#3F1010] mb-8 md:mb-12" style={{ fontFamily: 'Cinzel, serif' }}>
              Écrivez-nous
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre Nom"
                  className="w-full bg-transparent border-b border-[#3F1010]/10 py-3 md:py-4 outline-none focus:border-[#3F1010] transition-colors text-base md:text-lg"
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre Email"
                  className="w-full bg-transparent border-b border-[#3F1010]/10 py-3 md:py-4 outline-none focus:border-[#3F1010] transition-colors text-base md:text-lg"
                  required
                />
              </div>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Comment pouvons-nous vous aider ?"
                className="w-full bg-transparent border-b border-[#3F1010]/10 py-3 md:py-4 outline-none focus:border-[#3F1010] transition-colors text-base md:text-lg min-h-[120px] md:min-h-[150px] resize-none"
                required
              />
              <button className="w-full md:w-fit flex items-center justify-center gap-4 bg-[#3F1010] text-white px-10 py-5 md:px-12 md:py-6 rounded-2xl text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#2A0B0B] transition-all transform hover:scale-[1.02]">
                <MessageCircle className="w-5 h-5" />
                Envoyer le Message
              </button>
            </form>
          </motion.div>

          {/* Business Hours / Extra Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-[#F5F1EC] p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] flex flex-col justify-between"
          >
            <div className="space-y-10 md:space-y-12">
              <div>
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-[#3F1010] mb-4 md:mb-6" />
                <h4 className="text-base md:text-lg font-bold text-[#3F1010] uppercase tracking-wider mb-4 md:mb-6">Horaires d'Atelier</h4>
                <div className="space-y-4 text-xs md:text-sm text-[#111111]/60 font-medium">
                  <div className="flex justify-between border-b border-[#3F1010]/5 pb-2">
                    <span>Lundi - Vendredi</span>
                    <span className="text-[#3F1010]">09h00 - 19h00</span>
                  </div>
                  <div className="flex justify-between border-b border-[#3F1010]/5 pb-2">
                    <span>Samedi</span>
                    <span className="text-[#3F1010]">10h00 - 17h00</span>
                  </div>
                  <div className="flex justify-between text-[#3F1010]/30">
                    <span>Dimanche</span>
                    <span>Sur RDV</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white/50 rounded-xl md:rounded-2xl border border-white">
                <p className="text-[10px] md:text-xs text-[#3F1010]/60 italic leading-relaxed">
                  "Chaque création demande du temps and de la précision. Pour une expérience optimale à l'atelier, nous vous conseillons de prendre rendez-vous."
                </p>
              </div>
            </div>

            <div className="mt-10 md:mt-12 pt-10 md:pt-12 border-t border-[#3F1010]/5">
              <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-[#3F1010]/20 mb-4">Notre Artisanat</p>
              <div className="flex gap-6">
                <span className="text-xs md:text-sm font-medium text-[#3F1010]">@mbelgor_</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
