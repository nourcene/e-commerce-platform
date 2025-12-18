import { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { getErrorMessage } from '../utils/helpers';

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await orderService.getMyOrders();
            setOrders(data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, loading, error, refetch: fetchOrders };
};
