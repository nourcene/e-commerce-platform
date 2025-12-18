import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductList from '../components/product/ProductList';
import Loader from '../components/common/Loader';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import API from '../services/api';

const ProductsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('-createdAt');
    const [categories, setCategories] = useState([]);

    const debouncedSearch = useDebounce(searchTerm, 500);

    const { products, pagination, loading, error } = useProducts({
        search: debouncedSearch,
        category: selectedCategory,
        sort: sortBy
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await API.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                    Products
                </h1>

                {/* Filters */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input pl-10"
                        />
                    </div>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="input"
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="input"
                    >
                        <option value="-createdAt">Newest First</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="-rating">Highest Rated</option>
                    </select>
                </div>

                {/* Products */}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-center py-12">
                        <p className="text-red-600 dark:text-red-400">{error}</p>
                    </div>
                ) : (
                    <>
                        <ProductList products={products} />

                        {pagination && pagination.totalPages > 1 && (
                            <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
                                Page {pagination.page} of {pagination.totalPages}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
