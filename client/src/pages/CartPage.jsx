import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import Loader from '../components/common/Loader';

const CartPage = () => {
    const { cart, loading, fetchCart } = useCart();

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Add some products to get started!
                    </p>
                    <Link to="/products" className="btn btn-primary">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.items.map((item) => (
                            <CartItem key={item._id} item={item} />
                        ))}
                    </div>

                    <div>
                        <CartSummary cart={cart} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
