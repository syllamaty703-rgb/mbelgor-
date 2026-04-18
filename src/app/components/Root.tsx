import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { Cart } from "./Cart";
import { ScrollToTop } from "./ScrollToTop";
import { Toaster } from "sonner";
import { VisitorTracker } from "./VisitorTracker";

export function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <VisitorTracker />
          <ScrollToTop />
          <Cart />
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-center" expand={true} richColors />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
