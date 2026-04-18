import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-[500px] bg-[#F5F1EC] z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 md:p-12 flex items-center justify-between border-b border-[#3F1010]/10">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-6 h-6 text-[#3F1010]" />
                <h2 className="text-2xl" style={{ fontFamily: 'Cinzel, serif' }}>Votre Panier</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-[#3F1010]/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[#3F1010]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="w-20 h-20 bg-[#3F1010]/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-[#3F1010]/20" />
                  </div>
                  <div>
                    <p className="text-[#3F1010] text-lg font-light mb-2">Votre panier est vide</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-[10px] uppercase font-bold tracking-widest text-[#3F1010] hover:underline"
                    >
                      Découvrir la collection
                    </button>
                  </div>
                </div>
              ) : (
                cart.map((item: any) => (
                  <div key={item.cartItemId} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-white rounded-2xl overflow-hidden relative shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-[#3F1010] uppercase tracking-wider">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="p-1 text-[#3F1010]/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#111111]/40 uppercase mt-1">Sénégal • Artisanal</p>
                        {item.size && (
                          <p className="text-[11px] text-[#3F1010] font-bold mt-1">Pointure : {item.size}</p>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-4 border border-[#3F1010]/10 rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="hover:text-[#3F1010] text-[#3F1010]/30 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="hover:text-[#3F1010] text-[#3F1010]/30 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-[#3F1010]">
                          {(parseInt(item.price.replace(/\s/g, '')) * item.quantity).toLocaleString('fr-FR')} FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 md:p-12 bg-white space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-[#111111]/40 font-bold">Total Partiel</span>
                  <span className="text-2xl text-[#3F1010]" style={{ fontFamily: 'Cinzel, serif' }}>
                    {totalPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <button 
                  onClick={async () => {
                    import("../utils/mockDb").then(async ({ createOrder, trackEvent }) => {
                      try {
                        // Record order in Supabase
                        await createOrder({
                          customer_name: "Client MBELGOR", // Could be enhanced with a form later
                          customer_email: "web@site.com",
                          total_amount: totalPrice,
                          items: cart,
                          status: 'pending'
                        });

                        // Track the conversion event
                        await trackEvent('click_whatsapp', `Commande validée : ${totalPrice} FCFA`);
                      } catch (err) {
                        console.error("Failed to record order:", err);
                      }
                      
                      const message = `Bonjour MBELGOR, je souhaite passer une commande :\n\n${cart.map(item => `• ${item.quantity}x ${item.name}${item.size ? ` (Taille: ${item.size})` : ''} - ${(parseInt(item.price.replace(/\s/g, '')) * item.quantity).toLocaleString('fr-FR')} FCFA`).join('\n')}\n\nTotal: ${totalPrice.toLocaleString('fr-FR')} FCFA`;
                      window.open(`https://wa.me/221788929538?text=${encodeURIComponent(message)}`, '_blank');
                    });
                  }}
                  className="w-full bg-[#3F1010] text-white py-6 rounded-2xl text-xs uppercase tracking-[0.3em] font-bold hover:bg-[#2A0B0B] transition-all transform hover:scale-[1.02] shadow-xl shadow-[#3F1010]/20"
                >
                  Valider la commande
                </button>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-[10px] uppercase font-bold tracking-widest text-[#111111]/40 hover:text-[#3F1010] transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
