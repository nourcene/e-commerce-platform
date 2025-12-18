import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
    const { updateCartItem, removeFromCart } = useCart();
    const [updating, setUpdating] = React.useState(false);

    const handleUpdateQuantity = async (newQuantity) => {
        if (newQuantity < 1) return;

        try {
            setUpdating(true);
            await updateCartItem(item._id, newQuantity);
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setUpdating(false);
        }
    };

    const handleRemove = async () => {
        try {
            console.log('Removing item from cart:', item._id);
            console.log('Full item data:', item);
            await removeFromCart(item._id);
            console.log('Item removed successfully');
        } catch (error) {
            console.error('Error removing from cart:', error);
            console.error('Error details:', error.response?.data || error.message);
            alert(`Erreur: ${error.response?.data?.message || error.message || 'Erreur inconnue'}`);
        }
    };

    return (
        <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <img
                src={item.product?.imageUrl}
                alt={item.product?.name}
                className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.product?.name}
                </h3>
                <p className="text-primary-600 font-bold">
                    {formatCurrency(item.price)}
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleUpdateQuantity(item.quantity - 1)}
                    disabled={updating || item.quantity <= 1}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">
                    {item.quantity}
                </span>
                <button
                    onClick={() => handleUpdateQuantity(item.quantity + 1)}
                    disabled={updating}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                </p>
            </div>

            <button
                onClick={handleRemove}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default CartItem;
