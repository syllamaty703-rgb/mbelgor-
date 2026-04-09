import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappNumber = "+237600000000";
  const message = "Bonjour, je suis intéressé par vos chaussures artisanales.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
