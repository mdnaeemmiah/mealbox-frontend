"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMealProviders } from "@/service/providerService";

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
}

const HProviderMeal = () => {
    const [providers, setProviders] = useState<ProviderType[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const result = await getMealProviders();
                if (result?.success && Array.isArray(result.data)) {
                    setProviders(result.data);
                }
            } catch (error) {
                console.error("Error fetching providers:", error);
            }
        };
        fetchProviders();
    }, []);

    return (
        <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Meal Available</h2>
            <div className="w-80 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-4">Explore meal providers and their offerings.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {providers.slice(0, 8).map((provider) => (
                    <div 
                        key={provider._id} 
                        className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    >
                        <p className="text-gray-600"><strong>Name:</strong> {provider.name}</p>
                        <p className="text-gray-600"><strong>Cuisine:</strong> {provider.cuisineSpecialties.join(", ")}</p>
                        <p className="text-gray-600"><strong>Available Meals:</strong> {provider.availableMealOptions.join(", ")}</p>
                        <p className="text-gray-600"><strong>Price Range:</strong> {provider.pricing}</p>
                        <p className="text-gray-600"><strong>Experience:</strong> {provider.experience} years</p>
                        <p className="text-gray-600"><strong>Rating:</strong> {provider.customerReviews.rating} ⭐ ({provider.customerReviews.reviewsCount} reviews)</p>
                        <p className="text-gray-600"><strong>Reviews:</strong> {provider.customerReviews.comments.join(" | ")}</p>
                        <p className="text-gray-600"><strong>Location:</strong> {provider.location}</p>
                        <p className="text-gray-600"><strong>Contact:</strong> {provider.contactInfo.phone} | <a href={`mailto:${provider.contactInfo.email}`} className="text-blue-500 underline">{provider.contactInfo.email}</a></p>
                        <p className="text-gray-600"><strong>Website:</strong> <a href={provider.contactInfo.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Visit</a></p>
                    </div>
                    
                ))}
                
            </div>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => router.push("/providerPost")}
            >
                See More
            </button>
        </div>
    );
};

export default HProviderMeal;
