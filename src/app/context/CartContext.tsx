import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';

export interface CartItem extends Product {
  cartItemId: string; // Composite ID: productId-size
  quantity: number;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage directly to avoid race conditions
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('mbelgor_cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    }
    return [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('mbelgor_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size?: string) => {
    setCart((prev: CartItem[]) => {
      // Create a unique ID for this specific product + size combination
      const cartItemId = `${product.id}-${size || 'default'}`;
      
      const existingItemIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      
      if (existingItemIndex >= 0) {
        // Increment quantity of existing item
        const newCart = [...prev];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      }
      
      // Add new item
      return [...prev, { ...product, cartItemId, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev: CartItem[]) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev: CartItem[]) => 
      prev.map((item) => item.cartItemId === cartItemId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  
  const totalPrice = cart.reduce((sum: number, item: CartItem) => {
    const price = parseInt(item.price.replace(/\s/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems, 
      totalPrice,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
