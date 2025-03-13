/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define the types for the data structure
interface ContactInfo {
  phone: string;
  email: string;
  website: string;
}

interface CustomerReviews {
  rating: number;
  reviewsCount: number;
  comments: string[];
}

interface MealProvider {
  id: string;
  name: string;
  cuisineSpecialties: string[];
  availableMealOptions: string[];
  pricing: {
    priceRange: string;
    perServing: number;
  };
  experience: number;
  customerReviews: CustomerReviews;
  location: string;
  contactInfo: ContactInfo;
}

const CreateMealForm = () => {
  const [formData, setFormData] = useState<MealProvider>({
    id: '',
    name: '',
    cuisineSpecialties: [],
    availableMealOptions: [],
    pricing: {
      priceRange: '',
      perServing: 0,
    },
    experience: 0,
    customerReviews: {
      rating: 0,
      reviewsCount: 0,
      comments: [],
    },
    location: '',
    contactInfo: {
      phone: '',
      email: '',
      website: '',
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof MealProvider | keyof MealProvider['pricing'] | keyof MealProvider['contactInfo'] = ''
  ) => {
    const { name, value } = e.target;

    // Dynamically update nested fields like pricing or contactInfo
    if (name.includes('pricing') || name.includes('contactInfo')) {
      const [parent, field] = name.split('.') as [keyof MealProvider, string];
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof MealProvider,
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[key]];
      updatedArray[index] = value;
      return {
        ...prev,
        [key]: updatedArray,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/mealProvider/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Meal provider created successfully!');
      } else {
        toast.error('Failed to create meal provider: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('An error occurred while submitting the form.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Meal Provider</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">ID</label>
          <Input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Cuisine Specialties</label>
          <Input
            type="text"
            name="cuisineSpecialties"
            value={formData.cuisineSpecialties.join(', ')}
            onChange={(e) => handleArrayChange(e, 'cuisineSpecialties', 0)}
            required
            placeholder="Comma separated (e.g. Italian, Mexican)"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Available Meal Options</label>
          <Input
            type="text"
            name="availableMealOptions"
            value={formData.availableMealOptions.join(', ')}
            onChange={(e) => handleArrayChange(e, 'availableMealOptions', 0)}
            required
            placeholder="Comma separated (e.g. Lunch, Dinner)"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Price Range</label>
          <Input
            type="text"
            name="pricing.priceRange"
            value={formData.pricing.priceRange}
            onChange={(e) => handleChange(e, 'pricing')}
            required
            placeholder="e.g. $$"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Price per Serving</label>
          <Input
            type="number"
            name="pricing.perServing"
            value={formData.pricing.perServing}
            onChange={(e) => handleChange(e, 'pricing')}
            required
            placeholder="e.g. 15.99"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Experience (Years)</label>
          <Input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            placeholder="e.g. 5"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Location</label>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g. New York, NY"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <Input
            type="text"
            name="contactInfo.phone"
            value={formData.contactInfo.phone}
            onChange={(e) => handleChange(e, 'contactInfo')}
            required
            placeholder="e.g. 123-456-7890"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <Input
            type="email"
            name="contactInfo.email"
            value={formData.contactInfo.email}
            onChange={(e) => handleChange(e, 'contactInfo')}
            required
            placeholder="e.g. contact@tastybites.com"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Website</label>
          <Input
            type="url"
            name="contactInfo.website"
            value={formData.contactInfo.website}
            onChange={(e) => handleChange(e, 'contactInfo')}
            required
            placeholder="e.g. https://tastybites.com"
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
          Create Meal Provider
        </Button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateMealForm;
