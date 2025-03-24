/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getUsers,updateUser, deleteUser } from "@/service/userService";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const CustomerManageForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data?.data || []);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user deletion by id
  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUser(id);
      if (result) {
        // Remove the deleted user from the state
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("User deleted successfully!");
      } else {
        toast.error(result.error || "Failed to delete user");
      }
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleUpdateUser = async (userId: string, newStatus: string) => {
    try {
      const result = await updateUser(userId, { status: newStatus });
      if (result) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: newStatus } : user
          )
        );
        toast.success("User status updated successfully!");
      } else {
        toast.error(result.error || "Failed to update user status");
      }
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(users.length / itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Customer Management</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.role}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(user._id)} // Call deleteUser with the correct id
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CustomerManageForm;
