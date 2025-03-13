'use client';

import { deleteMealProvider, getMealProviders } from '@/service/providerService';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// Define the types for the data structure
interface ContactInfo {
  email: string;
  website: string;
}

interface MealProvider {
  id: string;
  contactInfo: ContactInfo;
}

const AllMealForm = () => {
  // Define the state with the proper type
  const [mealProviders, setMealProviders] = useState<MealProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch meal providers when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMealProviders();
        setMealProviders(data?.data || []); // Assuming your API response has a "data" field
      } catch (err) {
        setError('Failed to load meal providers');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle deletion of a meal provider
  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error('Invalid ID for deletion');
      return;
    }

    try {
      const result = await deleteMealProvider(id);

      if (result) {
        // Remove the deleted provider from the state
        setMealProviders((prevProviders) =>
          prevProviders.filter((provider) => provider.id !== id)
        );
        toast.success('Meal provider deleted successfully!');
      } else {
        toast.error(result.error || 'Failed to delete meal provider');
      }
    } catch (err) {
      console.error('Error deleting meal provider:', err);
      toast.error('Network error: Failed to delete meal provider');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Meals</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Website</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mealProviders.length > 0 ? (
                mealProviders.map((provider, index) => (
                  <tr key={provider.id || index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{provider.id}</td>
                    <td className="py-3 px-6">{provider.contactInfo.email}</td>
                    <td className="py-3 px-6">
                      <a
                        href={provider.contactInfo.website}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {provider.contactInfo.website}
                      </a>
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleDelete(provider.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-6 text-center text-gray-500">
                    No meal providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllMealForm;