import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, DollarSign, Eye } from 'lucide-react';
import { orderService } from '../../services/orderService';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        deliveredOrders: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const ordersData = await orderService.getAllOrders();
                setOrders(ordersData);

                // Calculate stats
                const totalRevenue = ordersData.reduce((sum, order) => sum + order.totalAmount, 0);
                const pendingOrders = ordersData.filter(o => o.status === 'pending').length;
                const deliveredOrders = ordersData.filter(o => o.status === 'delivered').length;

                setStats({
                    totalOrders: ordersData.length,
                    totalRevenue,
                    pendingOrders,
                    deliveredOrders
                });
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    if (loading) {
        return <Loader fullScreen />;
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Tableau de bord Admin
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Commandes</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalOrders}</p>
                            </div>
                            <Package className="w-12 h-12 text-primary-600" />
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Revenu Total</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {formatCurrency(stats.totalRevenue)}
                                </p>
                            </div>
                            <DollarSign className="w-12 h-12 text-green-600" />
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">En Attente</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.pendingOrders}</p>
                            </div>
                            <ShoppingBag className="w-12 h-12 text-yellow-600" />
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Livrées</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.deliveredOrders}</p>
                            </div>
                            <Package className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Commandes Récentes
                        </h2>
                    </div>

                    {orders.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                            Aucune commande pour le moment
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">N° Commande</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Client</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Date</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Total</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Statut</th>
                                        <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                                                #{order.orderNumber}
                                            </td>
                                            <td className="py-4 px-4 text-gray-900 dark:text-white">
                                                {order.user?.name || 'N/A'}
                                                <br />
                                                <span className="text-sm text-gray-500">{order.user?.email}</span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                                                {formatDate(order.createdAt)}
                                            </td>
                                            <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                                                {formatCurrency(order.totalAmount)}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                                    {getStatusText(order.status)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Link
                                                    to={`/admin/orders/${order._id}`}
                                                    className="btn btn-outline btn-sm flex items-center space-x-2"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span>Voir</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
