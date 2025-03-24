


"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSingleMealProvider } from "@/service/providerService";
import Link from "next/link";

interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl?: string;
}

interface ProviderType {
  _id: string;
  name: string;
  cuisineSpecialties: string[];
  availableMealOptions: string[];
  pricing: number;
  experience: number;
  customerReviews: {
    rating: number;
    reviewsCount: number;
    comments: string[];
  };
  location: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
  };
  products?: ProductType[]; // Make products optional
}

const ProviderDetails = () => {
  const { providerPostId } = useParams();
  // console.log({providerPostId})
  const [provider, setProvider] = useState<ProviderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!providerPostId) return;

    const fetchProvider = async () => {
      try {
        const result = await getSingleMealProvider(providerPostId as string);
        console.log("API Response:", result); // Log the API response
        if (result?.success && result.data) {
          setProvider(result.data);
        } else {
          setError("Failed to fetch provider details");
        }
      } catch (error) {
        console.error("Error fetching provider details:", error);
        setError("An error occurred while fetching provider details");
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [providerPostId]);


  if (loading) {
    return <p className="text-gray-500 text-center">Loading provider details...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!provider) {
    return <p className="text-red-500 text-center">Provider not found</p>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{provider.name}</h2>
      <p><strong>Cuisine Specialties:</strong> {provider.cuisineSpecialties.join(", ")}</p>
      <p><strong>Available Meals:</strong> {provider.availableMealOptions.join(", ")}</p>
      <p className="text-gray-600"><strong>Price Range:</strong> ${provider.pricing}</p>
      <p><strong>Experience:</strong> {provider.experience} years</p>
      <p><strong>Rating:</strong> {provider.customerReviews.rating} ⭐ ({provider.customerReviews.reviewsCount} reviews)</p>
      <p><strong>Reviews:</strong> {provider.customerReviews.comments.join(" | ")}</p>
      <p><strong>Location:</strong> {provider.location}</p>
      <p><strong>Contact:</strong> {provider.contactInfo.phone} | <a href={`mailto:${provider.contactInfo.email}`} className="text-blue-500 underline">{provider.contactInfo.email}</a></p>
      <p><strong>Website:</strong> <a href={provider.contactInfo.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Visit</a></p>

      {/* Add to Cart Button
   
        <Button
          onClick={() => handleAddToCart} // Safe access to the first product
          className="mt-4 w-full"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button> */}
      <div className="text-center mt-6">
      <Link href='/providerPost'>
         <button className="bg-green-400 py-1.5 px-2.5 rounded-xl cursor-pointer">Back</button>
        </Link>
      </div>
    
    </div>
  );
};

export default ProviderDetails;