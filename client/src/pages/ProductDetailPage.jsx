import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { productService } from '../services/productService';
import { reviewService } from '../services/reviewService';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../utils/helpers';
import StarRating from '../components/product/StarRating';
import Loader from '../components/common/Loader';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const [productData, reviewsData] = await Promise.all([
                    productService.getProductById(id),
                    reviewService.getProductReviews(id).catch(() => [])
                ]);
                setProduct(productData);
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        try {
            setAdding(true);
            await addToCart(product._id, quantity);
            // Show success message or redirect to cart
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return <Loader fullScreen />;
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Product not found
                    </h2>
                    <button onClick={() => navigate('/products')} className="btn btn-primary">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/products')}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Products</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center space-x-4 mb-4">
                                <StarRating rating={product.rating} size="lg" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    ({product.numReviews} avis)
                                </span>
                            </div>

                            <div className="text-4xl font-bold text-primary-600 mb-6">
                                {formatCurrency(product.price)}
                            </div>

                            <div className="mb-6">
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${product.stock > 0
                                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                    }`}>
                                    {product.stock > 0 ? `En stock (${product.stock} disponibles)` : 'Rupture de stock'}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Description
                            </h2>
                            <div className="prose dark:prose-invert max-w-none">
                                <pre className="whitespace-pre-wrap font-sans text-gray-600 dark:text-gray-400">
                                    {product.description}
                                </pre>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <label className="text-gray-700 dark:text-gray-300 font-medium">
                                    Quantité:
                                </label>
                                <select
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="input w-24"
                                    disabled={product.stock === 0}
                                >
                                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0 || adding}
                                className="btn btn-primary w-full lg:w-auto flex items-center justify-center space-x-2 text-lg py-3 px-8"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                <span>{adding ? 'Ajout en cours...' : 'Ajouter au panier'}</span>
                            </button>
                        </div>

                        {/* Product Details */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Informations produit
                            </h3>
                            <dl className="space-y-2">
                                <div className="flex justify-between">
                                    <dt className="text-gray-600 dark:text-gray-400">SKU:</dt>
                                    <dd className="font-semibold text-gray-900 dark:text-white">{product.sku}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600 dark:text-gray-400">Catégorie:</dt>
                                    <dd className="font-semibold text-gray-900 dark:text-white">
                                        {product.category?.name || 'Electronics'}
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-600 dark:text-gray-400">Disponibilité:</dt>
                                    <dd className="font-semibold text-gray-900 dark:text-white">
                                        {product.stock > 0 ? 'En stock' : 'Rupture de stock'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Avis clients ({product.numReviews})
                    </h2>

                    {reviews.length > 0 ? (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div key={review._id} className="card p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {review.user?.name || 'Anonymous'}
                                            </p>
                                            <StarRating rating={review.rating} size="sm" showNumber={false} />
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                                        </p>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            Aucun avis pour ce produit. Soyez le premier à laisser un avis!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
