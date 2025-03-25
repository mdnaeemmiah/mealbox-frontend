// "use client";

// import { getOrders } from '@/service/orderService';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';

// interface Order {
//   _id: string;
//   userEmail: string;
//   status: 'pending' | 'processing' | 'completed' | 'cancelled';
//   quantity: number;
//   createdAt: string;
//   updatedAt: string;
// }

// const OrderManageForm = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await getOrders();

//         console.log(response?.data)
//         console.log(response?.user)

//         if (response?.success) {
//           setOrders(response.data || []);
//         } else {
//           setError(response?.error || "Failed to load orders");
//         }
//       } catch (err) {
//         setError("An error occurred while fetching orders");
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
//     try {
//       // Implement your update status API call here
//       // await updateOrderStatus(orderId, newStatus);
//       setOrders(prev => prev.map(order => 
//         order._id === orderId ? { ...order, status: newStatus } : order
//       ));
//       toast.success("Order status updated successfully!");
//     } catch (err) {
//       toast.error("Failed to update order status");
//       console.error("Status update error:", err);
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   // Pagination calculations
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(orders.length / itemsPerPage);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-8">Loading orders...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-8">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 User Email
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Quantity
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Created At
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentItems.length > 0 ? (
//               currentItems.map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{order.userEmail}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{order.quantity}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <select
//                       value={order.status}
//                       onChange={(e) => handleStatusChange(order._id, e.target.value as Order['status'])}
//                       className={`px-2 py-1 rounded text-sm ${
//                         order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                         order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
//                         order.status === 'completed' ? 'bg-green-100 text-green-800' :
//                         'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="processing">Processing</option>
//                       <option value="completed">Completed</option>
//                       <option value="cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-500">
//                       {formatDate(order.createdAt)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                     <Link href='/order'>
//                     <button className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer">
//                       View
//                     </button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
//                   No orders found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         {orders.length > itemsPerPage && (
//           <div className="flex justify-center my-4">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 ${currentPage === 1 ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2 text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 ${currentPage === totalPages ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default OrderManageForm;






"use client";

import { getOrders } from '@/service/orderService';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface Product {
  product: string; // Product ID
  quantity: number;
  _id: string;
}

interface Order {
  _id: string;
  user: string; // User ID instead of email
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  products: Product[];
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
}

const OrderManageForm = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();

        console.log(response?.data); // Debugging response
        console.log(response?.user);

        if (response?.success) {
          setOrders(response.data || []);
        } else {
          setError(response?.error || "Failed to load orders");
        }
      } catch (err) {
        setError("An error occurred while fetching orders");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    try {
      // Implement your update status API call here
      // await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
      toast.success("Order status updated successfully!");
    } catch (err) {
      toast.error("Failed to update order status");
      console.error("Status update error:", err);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((order) => {
                const totalQuantity = order.products.reduce((sum, product) => sum + product.quantity, 0);

                return (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order?.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{totalQuantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value as Order['status'])}
                        className={`px-2 py-1 rounded text-sm ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href='/order'>
                        <button className="text-blue-600 hover:text-blue-900 mr-4 cursor-pointer">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {orders.length > itemsPerPage && (
          <div className="flex justify-center my-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 ${currentPage === 1 ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 ${currentPage === totalPages ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default OrderManageForm;
