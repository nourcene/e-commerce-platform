import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { formatCurrency, formatDate } from '../utils/helpers';
import Loader from '../components/common/Loader';

const OrdersPage = () => {
    const { orders, loading, error } = useOrders();

    if (loading) {
        return <Loader fullScreen />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <Link to="/" className="btn btn-primary">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Aucune commande
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Vous n'avez pas encore passé de commande.
                    </p>
                    <Link to="/products" className="btn btn-primary">
                        Parcourir les produits
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
            processing: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
            shipped: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
            delivered: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
            cancelled: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        };
        return colors[status] || colors.pending;
    };

    const getStatusText = (status) => {
        const texts = {
            pending: 'En attente',
            processing: 'En cours',
            shipped: 'Expédiée',
            delivered: 'Livrée',
            cancelled: 'Annulée'
        };
        return texts[status] || status;
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Mes commandes
                </h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="card p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        Commande #{order.orderNumber}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Passée le {formatDate(order.createdAt)}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </span>
                                    <Link
                                        to={`/order-confirmation/${order._id}`}
                                        className="btn btn-outline flex items-center space-x-2"
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>Détails</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(order.totalAmount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Articles</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {order.items?.length || 0} produit(s)
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Livraison</p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {order.shippingAddress?.city}, {order.shippingAddress?.state}
                                        </p>
                                    </div>
                                </div>

                                {/* Order Items Preview */}
                                <div className="space-y-2">
                                    {order.items?.slice(0, 3).map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 text-sm">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0">
                                                {item.imageUrl && (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-900 dark:text-white font-medium">
                                                    {item.name}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    Qté: {item.quantity} × {formatCurrency(item.price)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {order.items?.length > 3 && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 pl-15">
                                            + {order.items.length - 3} autre(s) produit(s)
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
