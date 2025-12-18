import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { orderService } from '../services/orderService';
import { validateCheckoutForm } from '../utils/validation';
import { formatCurrency } from '../utils/helpers';
import Loader from '../components/common/Loader';

const CheckoutPage = () => {
    const { cart, fetchCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateCheckoutForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            const orderData = {
                items: cart.items.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity
                })),
                shippingAddress: formData
            };

            const order = await orderService.createOrder(orderData);
            await clearCart();
            navigate(`/order-confirmation/${order._id}`);
        } catch (error) {
            setErrors({ general: error.message || 'Failed to place order' });
        } finally {
            setLoading(false);
        }
    };

    if (!cart.items || cart.items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Checkout
                </h1>

                {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400">{errors.general}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Shipping Information
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                        {errors.city && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                        {errors.state && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.state}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Zip Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                        {errors.zipCode && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full mt-6"
                                >
                                    {loading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div>
                        <div className="card p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-3 mb-6">
                                {cart.items.map((item) => (
                                    <div key={item._id} className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {item.product.name} x {item.quantity}
                                        </span>
                                        <span className="font-semibold">
                                            {formatCurrency(item.price * item.quantity)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                                    <span>Total</span>
                                    <span>{formatCurrency(cart.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
