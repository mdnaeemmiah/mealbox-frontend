"use client"; // Add this since we're using useState and useEffect

import { getOrders } from '@/service/orderService';
import React, { useState, useEffect } from 'react';

interface Product {
  product: string;
  quantity: number;
  _id: string;
}

interface Transaction {
  sp_code: string;
}

interface Order {
  _id: string;
  createdAt: string;
  products: Product[];
  status: string;
  totalPrice: number;
  transaction: Transaction;
  updatedAt: string;
  user: string;
  __v: number;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data || []);
      } catch (err) {
        setError("Failed to load orders");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Orders List</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Date Created</th>
              <th className="py-2 px-4 border">Products</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Total Price</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Transaction Code</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{order._id}</td>
                <td className="py-2 px-4 border">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border">
                  {order.products.map(p => p.product).join(', ')}
                </td>
                <td className="py-2 px-4 border">
                  {order.products.reduce((sum, p) => sum + p.quantity, 0)}
                </td>
                <td className="py-2 px-4 border">${order.totalPrice.toFixed(2)}</td>
                <td className="py-2 px-4 border">{order.status || 'N/A'}</td>
                <td className="py-2 px-4 border">{order.transaction?.sp_code || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && !loading && (
        <div className="text-center py-4 text-gray-500">No orders found</div>
      )}

      {/* Pagination */}
      {orders.length > itemsPerPage && (
        <div className="flex justify-center my-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-2 ${currentPage === totalPages ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
