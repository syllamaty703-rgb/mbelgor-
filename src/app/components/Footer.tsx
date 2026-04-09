import { Link } from "react-router";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3F1010] text-[#F5F1EC] pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          {/* Column 1: La Marque */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
              La Marque
            </h3>
            <p className="text-[#F5F1EC]/70 text-sm leading-relaxed max-w-xs" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              MBELGOR est une marque de chaussures et sacs artisanaux qui fusionne savoir-faire traditionnel et design contemporain pour un style et un confort exceptionnels.
            </p>
            <img
              src="/logo.png"
              alt="MBELGOR Logo"
              className="h-12 w-auto brightness-0 invert opacity-90 mt-4"
            />
          </div>

          {/* Column 2: Liens utiles */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
              Liens utiles
            </h3>
            <ul className="space-y-4">
              {["Conditions Générales", "Politiques de confidentialité", "Livraisons & Retours", "Mentions Légales"].map((text) => (
                <li key={text}>
                  <Link
                    to="#"
                    className="text-sm text-[#F5F1EC]/70 hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: À Propos */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
              À Propos
            </h3>
            <ul className="space-y-4">
              {["Hommes", "Femmes", "Notre Histoire"].map((text) => (
                <li key={text}>
                  <Link
                    to="#"
                    className="text-sm text-[#F5F1EC]/70 hover:text-white transition-colors duration-300"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold tracking-wide" style={{ fontFamily: 'Cinzel, serif' }}>
              Contact
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#F5F1EC]/60 shrink-0 mt-0.5" />
                <span className="text-sm text-[#F5F1EC]/70 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  PIKINE TALLY BOUBESS
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#F5F1EC]/60 shrink-0" />
                <a
                  href="mailto:mbelgorsylla@gmail.com"
                  className="text-sm text-[#F5F1EC]/70 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  mbelgorsylla@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#F5F1EC]/60 shrink-0" />
                <a
                  href="tel:+221788929538"
                  className="text-sm text-[#F5F1EC]/70 hover:text-white transition-colors duration-300"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  +221 78 892 95 38
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Socials & Rights */}
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/share/1Dvjg5pwCz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/mbelgor?igsh=MXI0NHlxOG9pdngwaw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@mbelgor_?_r=1&_t=ZS-94xrUwXCQTs" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
              </svg>
            </a>
            <a href="https://wa.me/221788929538" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-xs text-[#F5F1EC]/40" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              © {currentYear}, MBELGOR. Designed by <span className="text-[#F5F1EC]/60">MBELGOR</span>
            </p>
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="bg-white/10 p-2 rounded">
              <svg width="32" height="20" viewBox="0 0 32 20" fill="currentColor">
                <path d="M12.39 3l-3.23 10.61c-.13.43-.3.59-.72.59H3.77L6.87 3h5.52zM21.29 3h-4.43c-.85 0-1.4.45-1.55 1.14L13.1 14.12c.4 0 .84-.13 1-.36.16-.23 1.83-6.2 1.83-6.2.22-.88.94-1.46 1.83-1.46h3.42c.45 0 .82.37.82.82 0 .04 0 .08-.01.12l-.99 4.67c-.08.37.16.73.53.81.04 0 .08.01.12.01h2.21c.85 0 1.55-.7 1.55-1.55V4.55C25.41 3.7 23.55 3 21.29 3z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
