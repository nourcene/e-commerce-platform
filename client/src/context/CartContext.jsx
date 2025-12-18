import React, { createContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { getErrorMessage } from '../utils/helpers';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], totalAmount: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await cartService.getCart();
            setCart(data);
        } catch (err) {
            // If not authenticated, just set empty cart
            setCart({ items: [], totalAmount: 0 });
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            setError(null);
            const data = await cartService.addToCart(productId, quantity);
            setCart(data);
            return data;
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        try {
            setError(null);
            const data = await cartService.updateCartItem(itemId, quantity);
            setCart(data);
            return data;
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setError(null);
            const data = await cartService.removeFromCart(itemId);
            setCart(data);
            return data;
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const clearCart = async () => {
        try {
            setError(null);
            const data = await cartService.clearCart();
            setCart(data);
            return data;
        } catch (err) {
            const errorMsg = getErrorMessage(err);
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const getCartItemCount = () => {
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    const value = {
        cart,
        loading,
        error,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartItemCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
