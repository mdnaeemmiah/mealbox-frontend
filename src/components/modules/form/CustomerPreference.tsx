'use client';

import { getPostPreferences, deletePostPreference } from '@/service/customerService';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import PreferenceModal from '../modal/PreferenceModal';


interface CustomerPreference {
  _id: string;
  mealSelection: string;
  dietaryPreferences: string;
  customerId: string;
  deliveryDate: string;
}

const CustomerPreference = () => {
  const [preferences, setPreferences] = useState<CustomerPreference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPreference, setSelectedPreference] = useState<CustomerPreference | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostPreferences();
        console.log('Fetched Data:', data);
        setPreferences(data?.data); // Assuming data has _id
      } catch (err) {
        console.error('Error fetching customer preferences:', err);
        setError('Failed to load customer preferences');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (_id: string) => {
    console.log('Deleting preference with _id:', _id); // Log the _id being passed

    if (!_id) {
      console.error('Invalid _id for deletion');
      return;
    }

    const result = await deletePostPreference(_id);

    // Log the result to ensure we have a proper response
    console.log('Result from deletePostPreference:', result);

    if (result) {
      setPreferences((prevPreferences) => prevPreferences.filter((preference) => preference._id !== _id));
      toast.success('Preference deleted successfully!');
    } else {
      console.error('Error deleting preference:', result.error);
      toast.error(result.error || 'Error deleting preference');
    }
  };

  const handleUpdate = (preference: CustomerPreference) => {
    setSelectedPreference(preference);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPreference(null);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = preferences.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(preferences.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Preferences</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-6 text-left">Customer ID</th>
                <th className="py-3 px-6 text-left">Meal Selection</th>
                <th className="py-3 px-6 text-left">Dietary Preferences</th>
                <th className="py-3 px-6 text-left">Delivery Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((preference) => (
                  <tr key={preference._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6">{preference.customerId}</td>
                    <td className="py-3 px-6">{preference.mealSelection}</td>
                    <td className="py-3 px-6">{preference.dietaryPreferences}</td>
                    <td className="py-3 px-6">{preference.deliveryDate || 'N/A'}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleUpdate(preference)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(preference._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-3 px-6 text-center text-gray-500">
                    No preferences found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-lg"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />

      {isModalOpen && selectedPreference && (
        <PreferenceModal
    preference={selectedPreference}
    onClose={closeModal}
    onConfirm={(updatedData) => {
      // Update the preference list after confirmation
      setPreferences((prevPreferences) =>
        prevPreferences.map((pref) =>
          pref._id === updatedData._id ? updatedData : pref
        )
      );
      closeModal();
      toast.success('Preference updated successfully!');
    }}
  />
)}
    </div>
  );
};

export default CustomerPreference;