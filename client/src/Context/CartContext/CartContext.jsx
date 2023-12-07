import React, { createContext, useContext, useState } from 'react';

// Create the CartContext
const CartContext = createContext();

// Custom hook to use the CartContext
export function useCart() {
  return useContext(CartContext);
}

// CartProvider component to manage the cart state
export function CartProvider({ children }) {
  const [cart, setCart] = useState();

  // Function to update the cart state
  const updateCart = (newCart) => {
    setCart(newCart);
  };

  // Combine the cart state and update function in the context value
  const contextValue = {
    cart,
    updateCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
