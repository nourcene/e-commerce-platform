import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const CartSummary = ({ cart }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
            </h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(cart.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span>Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>{formatCurrency(cart.totalAmount)}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleCheckout}
                disabled={!cart.items || cart.items.length === 0}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default CartSummary;
