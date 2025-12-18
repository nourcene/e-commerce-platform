import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { orderService } from '../../services/orderService';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const AdminOrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

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

    const handleStatusUpdate = async (newStatus) => {
        try {
            setUpdating(true);
            const updated = await orderService.updateOrderStatus(orderId, newStatus);
            setOrder(updated);
            alert('Statut mis à jour avec succès!');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Erreur lors de la mise à jour du statut');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">Commande introuvable</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Retour au tableau de bord</span>
                </button>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Commande #{order.orderNumber}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Info */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Informations Client
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-900 dark:text-white">
                                    <span className="font-semibold">Nom:</span> {order.user?.name}
                                </p>
                                <p className="text-gray-900 dark:text-white">
                                    <span className="font-semibold">Email:</span> {order.user?.email}
                                </p>
                                <p className="text-gray-900 dark:text-white">
                                    <span className="font-semibold">Téléphone:</span> {order.shippingAddress?.phone}
                                </p>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Adresse de Livraison
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                {order.shippingAddress?.fullName}<br />
                                {order.shippingAddress?.address}<br />
                                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
                            </p>
                        </div>

                        {/* Order Items */}
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Articles Commandés
                            </h2>
                            <div className="space-y-4">
                                {order.items?.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                                        {item.imageUrl && (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Quantité: {item.quantity} × {formatCurrency(item.price)}
                                            </p>
                                        </div>
                                        <p className="font-bold text-gray-900 dark:text-white">
                                            {formatCurrency(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="space-y-6">
                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Résumé
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {formatDate(order.createdAt)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Total:</span>
                                    <span className="font-bold text-2xl text-primary-600">
                                        {formatCurrency(order.totalAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Statut
                            </h2>
                            <select
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(e.target.value)}
                                disabled={updating}
                                className="input w-full mb-4"
                            >
                                <option value="pending">En attente</option>
                                <option value="processing">En cours</option>
                                <option value="shipped">Expédiée</option>
                                <option value="delivered">Livrée</option>
                                <option value="cancelled">Annulée</option>
                            </select>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Sélectionnez un nouveau statut pour mettre à jour la commande
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderDetail;
