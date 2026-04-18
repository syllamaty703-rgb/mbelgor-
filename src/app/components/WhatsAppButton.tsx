import { MessageCircle } from "lucide-react";
import { trackEvent } from "../utils/mockDb";

export function WhatsAppButton() {
  const whatsappNumber = "221788929538";
  const message = "Bonjour, je suis intéressé par vos chaussures artisanales.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('click_whatsapp', 'Contact via WhatsApp')}
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
