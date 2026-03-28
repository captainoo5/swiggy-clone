import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-orders`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                setError(response.data.message || "Failed to fetch orders");
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("An error occurred while fetching orders");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const deleteOrder = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete-order/${id}`, {
                headers: {
                    Authorization: token
                }
            });
            fetchOrders();
        } catch (err) {
            console.error("Error deleting order:", err);
            alert("Failed to delete order");
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-600 font-medium animate-pulse">Loading orders...</div>;
    if (error) return (
        <div className="p-8 text-center">
            <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block border border-red-100">
                {error}
            </div>
            <button onClick={fetchOrders} className="ml-4 text-blue-600 hover:underline font-medium">Retry</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Order Management</h1>
                        <p className="text-gray-500 text-sm mt-1">Review and manage incoming customer orders</p>
                    </div>
                    <span className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold border border-orange-100">
                        {orders.length} Active Orders
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-gray-600 text-xs uppercase font-bold tracking-widest border-b border-gray-100">Order ID</th>
                                <th className="px-6 py-4 text-gray-600 text-xs uppercase font-bold tracking-widest border-b border-gray-100">Delivery Address</th>
                                <th className="px-6 py-4 text-gray-600 text-xs uppercase font-bold tracking-widest border-b border-gray-100">Items</th>
                                <th className="px-6 py-4 text-gray-600 text-xs uppercase font-bold tracking-widest border-b border-gray-100 text-right">Amount</th>
                                <th className="px-6 py-4 text-gray-600 text-xs uppercase font-bold tracking-widest border-b border-gray-100 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center text-gray-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            <span className="text-lg font-medium">No orders found</span>
                                            <p className="text-sm">Orders will appear here once customers start placing them.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-all duration-200 group">
                                        <td className="px-6 py-5">
                                            <span className="font-mono text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded select-all">
                                                #{order._id.slice(-8).toUpperCase()}
                                            </span>
                                            <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">ID: {order._id}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm text-gray-700 font-medium leading-relaxed max-w-xs truncate" title={order.deliveryAddress}>
                                                {order.deliveryAddress}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-1">
                                                {order.items.slice(0, 2).map((item, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-md font-medium">
                                                        {item.name} (×{item.qty})
                                                    </span>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <span className="text-[10px] text-indigo-500 font-bold px-1">
                                                        +{order.items.length - 2} more
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right font-bold text-gray-900">
                                            ₦{order.amountDetails?.grandTotal?.toLocaleString() || '0'}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => deleteOrder(order._id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                                                    title="Delete Order"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Orders;