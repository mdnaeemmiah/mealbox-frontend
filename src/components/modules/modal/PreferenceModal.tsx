import { updatePostPreference } from '@/service/customerService';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS

interface PreferenceModalProps {
  preference: {
    _id: string;
    mealSelection: string;
    dietaryPreferences: string;
    customerId: string;
    deliveryDate: string;
  };
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onConfirm: (updatedPreference: any) => void;
}

const PreferenceModal: React.FC<PreferenceModalProps> = ({ preference, onClose }) => {
  const [updatedPreference, setUpdatedPreference] = useState(preference);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setUpdatedPreference((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  // Handle the confirmation and update the preference
  const handleConfirm = async () => {
    try {
      const result = await updatePostPreference(updatedPreference._id, updatedPreference);

      if (result) {
        // Show success toast
        toast.success('Preference updated successfully!');
        // If the update is successful, call the onConfirm prop to notify the parent
        // onConfirm(updatedPreference);
        onClose(); // Close the modal after successful update
      } else {
        // Show error toast if update fails
        toast.error('Failed to update preference. Please try again.');
      }
    } catch (error) {
      // Show error toast if there is an exception
      toast.error('Error updating preference: ' + error);
      console.error('Error updating preference:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Preference</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meal Selection</label>
            <input
              type="text"
              value={updatedPreference.mealSelection}
              onChange={(e) => handleInputChange(e, 'mealSelection')}
              className="mt-1 p-2 bg-gray-100 rounded-lg text-gray-900 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
            <textarea
              value={updatedPreference.dietaryPreferences}
              onChange={(e) => handleInputChange(e, 'dietaryPreferences')}
              className="mt-1 p-2 bg-gray-100 rounded-lg text-gray-900 w-full"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
            <input
              type="date"
              value={updatedPreference.deliveryDate}
              onChange={(e) => handleInputChange(e, 'deliveryDate')}
              className="mt-1 p-2 bg-gray-100 rounded-lg text-gray-900 w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferenceModal;
