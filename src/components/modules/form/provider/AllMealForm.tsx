


/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { deleteMealProvider, getMealProviders, updateMealProvider } from "@/service/providerService";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

interface ContactInfo {
  email: string;
  website: string;
}

interface MealProvider {
  id: string;
  name: string;
  location: string;
  specialties: string;
  contactInfo: ContactInfo;
}

const AllMealForm = () => {
  const [mealProviders, setMealProviders] = useState<MealProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<MealProvider | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    specialties: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMealProviders();
        setMealProviders(data?.data || []);
      } catch (err) {
        setError("Failed to load meal providers");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteMealProvider(id);
      setMealProviders((prev) => prev.filter((provider) => provider.id !== id));
      toast.success("Meal provider deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete meal provider");
    }
  };

  const handleUpdateClick = (provider: MealProvider) => {
    setSelectedProvider(provider);
    setFormData({
      name: provider.name,
      location: provider.location,
      specialties: provider.specialties,
      email: provider.contactInfo.email,
      website: provider.contactInfo.website,
    });
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedProvider) return;
    try {
      const updatedProvider = {
        ...selectedProvider,
        name: formData.name,
        location: formData.location,
        specialties: formData.specialties,
        contactInfo: { email: formData.email, website: formData.website },
      };
      await updateMealProvider(selectedProvider.id, updatedProvider);
      setMealProviders((prev) =>
        prev.map((provider) => (provider.id === selectedProvider.id ? updatedProvider : provider))
      );
      toast.success("Meal provider updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to update meal provider");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mealProviders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(mealProviders.length / itemsPerPage));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Available Meals</h1>
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
                <th className="py-3 px-6 text-left">Website</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((provider) => (
                <tr key={provider.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{provider.name}</td>
                  <td className="py-3 px-6">{provider.contactInfo.email}</td>
                  <td className="py-3 px-6">
                    <a href={provider.contactInfo.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                      {provider.contactInfo.website}
                    </a>
                  </td>
                  <td className="py-3 px-6">
                    <button onClick={() => handleUpdateClick(provider)} className="mr-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600">
                      Update
                    </button>
                    <button onClick={() => handleDelete(provider.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
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

export default AllMealForm;