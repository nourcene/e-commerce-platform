import React from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { ThemeProvider } from './ThemeContext';

export const AppContext = ({ children }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};
