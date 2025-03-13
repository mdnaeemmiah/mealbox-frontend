'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { postPreference } from '@/service/customerService';

export default function PostPreference() {
  const [formData, setFormData] = useState({
    mealSelection: '',
    dietaryPreferences: '',
    customerId: '',
    deliveryDate: '',
  });

  // const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      mealSelection: formData.mealSelection.split(',').map((item) => item.trim()), // Trim spaces
      dietaryPreferences: formData.dietaryPreferences.split(',').map((item) => item.trim()),
      customerId: formData.customerId,
      deliveryDate: formData.deliveryDate || null,
    };
  
    try {
      const response = await postPreference(orderData);
      console.log('Response from API:', response);  // Log the full response to inspect
  
      // if (!response || !response.ok) {
      //   console.error('Order submission failed:', response);
      //   alert('Order submission failed. Please try again.');
      //   return;
      // }
  
      // router.push('/FindMeals'); // Redirect on success
    } catch (error) {
      console.error('Error submitting order:', error);  // Log the error to the console
      alert('An error occurred. Please check your network and try again.');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Create Order</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Meal Selection (comma-separated)</label>
            <Input
              type="text"
              name="mealSelection"
              value={formData.mealSelection}
              onChange={handleChange}
              required
              placeholder="e.g. Pizza, Pasta"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Dietary Preferences (comma-separated)</label>
            <Input
              type="text"
              name="dietaryPreferences"
              value={formData.dietaryPreferences}
              onChange={handleChange}
              required
              placeholder="e.g. Vegan, Gluten-Free"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Customer ID</label>
            <Input
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              placeholder="e.g. C123"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600">Delivery Date (optional)</label>
            <Input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
            />
          </div>
          
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2">
            Submit Order
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Need help? <Link href="/support" className="text-indigo-600 hover:underline">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}
