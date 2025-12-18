import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <ShoppingCart className="w-8 h-8 text-primary-600" />
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                Dream Shop
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your one-stop shop for all your needs. Quality products at great prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Customer Service
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600 dark:text-gray-400">About Us</li>
                            <li className="text-gray-600 dark:text-gray-400">Contact</li>
                            <li className="text-gray-600 dark:text-gray-400">Shipping Info</li>
                            <li className="text-gray-600 dark:text-gray-400">Returns</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span>support@dreamshop.com</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span>+216 52 877 229</span>
                            </li>
                            <li className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>hammam sousse,sousse</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Dream Shop. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
