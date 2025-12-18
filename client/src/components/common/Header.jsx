import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Sun, Moon, Search, LogOut, Package, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { ThemeContext } from '../../context/ThemeContext';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const { getCartItemCount } = useCart();
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setUserMenuOpen(false);
    };

    const cartItemCount = getCartItemCount();

    return (
        <header className="sticky top-0 z-40 glass border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <ShoppingCart className="w-8 h-8 text-primary-600" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            Dream Shop
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                            Home
                        </Link>
                        <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                            Products
                        </Link>
                        {isAuthenticated() && (
                            <Link to="/orders" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                                Orders
                            </Link>
                        )}
                        {isAdmin() && (
                            <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition">
                                Admin
                            </Link>
                        )}
                    </nav>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                            <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {isAuthenticated() ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                    <span className="hidden md:block text-gray-700 dark:text-gray-300">
                                        {user?.name}
                                    </span>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                                        <Link
                                            to="/profile"
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <User className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <Package className="w-4 h-4" />
                                            <span>Orders</span>
                                        </Link>
                                        {isAdmin() && (
                                            <Link
                                                to="/admin"
                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span>Admin</span>
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
                        <nav className="flex flex-col space-y-2">
                            <Link
                                to="/"
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/products"
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                            {isAuthenticated() && (
                                <Link
                                    to="/orders"
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Orders
                                </Link>
                            )}
                            {isAdmin() && (
                                <Link
                                    to="/admin"
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Admin
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
