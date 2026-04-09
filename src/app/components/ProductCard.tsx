import { Link } from "react-router";
import { motion } from "motion/react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#F5F1EC] mb-6 shadow-sm border border-[#3F1010]/5 group">
        <Link to={`/product/${product.id}`} className="block h-full">
          {/* Main Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105 ${
              product.images.length > 1 ? "group-hover:opacity-0" : ""
            }`}
          />
          
          {/* Secondary Image on Hover */}
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={`${product.name} - detail`}
              className="absolute inset-0 w-full h-full object-contain p-2 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
            />
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/90 backdrop-blur-sm text-[#3F1010] px-6 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              Découvrir
            </span>
          </div>
        </Link>

        {/* Quick Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-4 right-4 p-4 rounded-2xl bg-white text-[#3F1010] shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#3F1010] hover:text-white"
          aria-label="Ajouter au Panier"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>

        <div className="flex justify-between items-start px-1">
          <div className="space-y-1">
            <h3
              className="text-lg md:text-xl text-[#3F1010] group-hover:text-[#3F1010]/70 transition-colors"
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {product.name}
            </h3>
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#111111]/40" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              MBELGOR Artisanal
            </p>
          </div>
          <p className="text-sm font-medium text-[#3F1010]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {product.price} <span className="text-[10px] opacity-60">FCFA</span>
          </p>
        </div>
    </motion.div>
  );
}
