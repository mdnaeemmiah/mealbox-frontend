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
              {mealProviders.map((provider) => (
                <tr key={provider.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{provider.name}</td>
                  <td className="py-3 px-6">{provider.contactInfo.email}</td>
                  <td className="py-3 px-6">
                    <a href={provider.contactInfo.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                      {provider.contactInfo.website}
                    </a>
                  </td>
                  <td className="py-3 px-6">
                    <button onClick={() => handleUpdateClick(provider)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
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
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Provider</h2>
            {Object.entries(formData).map(([key, value]) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={value}
                onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                className="w-full p-2 border rounded mb-2"
              />
            ))}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
              <button onClick={handleUpdateSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Confirm</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllMealForm;
