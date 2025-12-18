import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrderDetail from './pages/admin/AdminOrderDetail';

import './index.css';

function App() {
    return (
        <ErrorBoundary>
            <AppContext>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/products" element={<ProductsPage />} />
                                <Route path="/products/:id" element={<ProductDetailPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/cart"
                                    element={
                                        <ProtectedRoute>
                                            <CartPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <ProtectedRoute>
                                            <OrdersPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/checkout"
                                    element={
                                        <ProtectedRoute>
                                            <CheckoutPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/order-confirmation/:orderId"
                                    element={
                                        <ProtectedRoute>
                                            <OrderConfirmationPage />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Admin Routes */}
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute adminOnly={true}>
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/orders/:orderId"
                                    element={
                                        <ProtectedRoute adminOnly={true}>
                                            <AdminOrderDetail />
                                        </ProtectedRoute>
                                    }
                                />

                                {/* 404 */}
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </AppContext>
        </ErrorBoundary>
    );
}

export default App;
