import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import { orderService } from '../services/orderService';
import { formatCurrency, formatDate } from '../utils/helpers';
import Loader from '../components/common/Loader';

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await orderService.getOrderById(orderId);
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Order not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Thank you for your purchase. Your order has been received.
                    </p>
                </div>

                <div className="card p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Order Number</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{order.orderNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Order Date</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {formatDate(order.createdAt)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(order.totalAmount)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Shipping Address
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            {order.shippingAddress.fullName}<br />
                            {order.shippingAddress.address}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                            {order.shippingAddress.phone}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Order Items
                        </h3>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item._id} className="flex items-center space-x-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {formatCurrency(item.price * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <Link to="/orders" className="btn btn-primary inline-flex items-center space-x-2">
                        <Package className="w-5 h-5" />
                        <span>View All Orders</span>
                    </Link>
                    <Link to="/products" className="btn btn-secondary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
