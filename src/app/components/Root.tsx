import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { CartProvider } from "../context/CartContext";
import { Cart } from "./Cart";
import { ScrollToTop } from "./ScrollToTop";

export function Root() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <ScrollToTop />
        <Cart />
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
