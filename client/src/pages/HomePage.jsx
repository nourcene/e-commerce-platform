import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Shield, Star } from 'lucide-react';
import { productService } from '../services/productService';
import ProductList from '../components/product/ProductList';
import Loader from '../components/common/Loader';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await productService.getFeaturedProducts();
                setFeaturedProducts(data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
                            Welcome to Dream Shop
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-primary-100">
                            Discover amazing products at unbeatable prices
                        </p>
                        <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center space-x-2">
                            <span>Shop Now</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                                <Truck className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Free shipping on all orders
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                                <Shield className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                100% secure payment processing
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                                <Star className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Only the best quality products
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Featured Products
                        </h2>
                        <Link to="/products" className="text-primary-600 hover:text-primary-700 flex items-center space-x-2">
                            <span>View All</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <ProductList products={featuredProducts} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
