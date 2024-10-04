import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const removeCartItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.movie.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, removeCartItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};