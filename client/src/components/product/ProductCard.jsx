import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import StarRating from './StarRating';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [adding, setAdding] = React.useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();

        if (!isAuthenticated()) {
            window.location.href = '/login';
            return;
        }

        try {
            setAdding(true);
            await addToCart(product._id, 1);
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="card card-hover group">
            <Link to={`/products/${product._id}`}>
                <div className="relative overflow-hidden aspect-square">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Rupture de stock</span>
                        </div>
                    )}
                </div>
            </Link>

            <div className="p-4">
                <Link to={`/products/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 transition">
                        {product.name}
                    </h3>
                </Link>

                <div className="mb-3">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        ({product.numReviews} avis)
                    </span>
                </div>

                <div className="mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                        {formatCurrency(product.price)}
                    </span>
                </div>

                <div className="flex gap-2">
                    <Link
                        to={`/products/${product._id}`}
                        className="btn btn-outline flex-1 text-center text-sm"
                    >
                        Voir détails
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0 || adding}
                        className="btn btn-primary flex items-center justify-center space-x-1 flex-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{adding ? 'Ajout...' : 'Ajouter'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
