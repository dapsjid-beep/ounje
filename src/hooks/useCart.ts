
import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  specialInstructions?: string;
  spiceLevel?: string;
}

const CART_STORAGE_KEY = 'nigerian-restaurant-cart-v3';

// Global cart state for immediate updates
let globalCartItems: CartItem[] = [];
const cartUpdateCallbacks: Array<(items: CartItem[]) => void> = [];

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Register callback for cart updates
  useEffect(() => {
    const updateCallback = (items: CartItem[]) => {
      setCartItems(items);
    };

    cartUpdateCallbacks.push(updateCallback);

    return () => {
      const index = cartUpdateCallbacks.indexOf(updateCallback);
      if (index > -1) {
        cartUpdateCallbacks.splice(index, 1);
      }
    };
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      console.log('Loading cart from localStorage:', savedCart);
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          console.log('Setting cart items from localStorage:', parsedCart);
          globalCartItems = parsedCart;
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      localStorage.removeItem(CART_STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded && cartItems.length !== globalCartItems.length) {
      console.log('Saving cart to localStorage:', cartItems);
      if (cartItems.length > 0) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } else {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
      globalCartItems = cartItems;
    }
  }, [cartItems, isLoaded]);

  const notifyCartUpdate = (newItems: CartItem[]) => {
    globalCartItems = newItems;
    
    // Update localStorage immediately
    if (newItems.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newItems));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }

    // Notify all components
    cartUpdateCallbacks.forEach(callback => callback(newItems));
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: newItems }));
  };

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity: number = 1, specialInstructions?: string) => {
    console.log('Adding to cart:', item, quantity, specialInstructions);
    
    const existingItemIndex = globalCartItems.findIndex(cartItem => 
      cartItem.id === item.id && 
      cartItem.spiceLevel === item.spiceLevel &&
      cartItem.specialInstructions === specialInstructions
    );
    
    let newItems;
    if (existingItemIndex >= 0) {
      // Update existing item
      newItems = [...globalCartItems];
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + quantity
      };
    } else {
      // Add new item
      newItems = [...globalCartItems, { 
        ...item, 
        quantity, 
        specialInstructions: specialInstructions || '',
        spiceLevel: item.spiceLevel || 'Medium'
      }];
    }
    
    console.log('New cart items:', newItems);
    notifyCartUpdate(newItems);
  }, []);

  const removeFromCart = useCallback((id: number, spiceLevel?: string, specialInstructions?: string) => {
    const newItems = globalCartItems.filter(item => 
      !(item.id === id && 
        item.spiceLevel === spiceLevel && 
        item.specialInstructions === specialInstructions)
    );
    
    notifyCartUpdate(newItems);
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number, spiceLevel?: string, specialInstructions?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, spiceLevel, specialInstructions);
      return;
    }
    
    const newItems = globalCartItems.map(item =>
      item.id === id && 
      item.spiceLevel === spiceLevel && 
      item.specialInstructions === specialInstructions
        ? { ...item, quantity } 
        : item
    );
    
    notifyCartUpdate(newItems);
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    notifyCartUpdate([]);
  }, []);

  const getTotalItems = useCallback(() => {
    const total = cartItems.reduce((total, item) => total + item.quantity, 0);
    console.log('Total items in cart:', total, cartItems);
    return total;
  }, [cartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoaded
  };
}
