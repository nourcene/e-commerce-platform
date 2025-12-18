import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { getErrorMessage } from '../utils/helpers';

export const useProducts = (params = {}) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getProducts(params);
                setProducts(data.products || data);
                setPagination(data.pagination || null);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [JSON.stringify(params)]);

    return { products, pagination, loading, error };
};
