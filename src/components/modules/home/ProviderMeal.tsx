

"use client";

import React, { useEffect, useState } from "react";
import { getMealProviders } from "@/service/providerService";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";

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

const ProviderMeal = () => {
  const [providers, setProviders] = useState<ProviderType[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [expanded, setExpanded] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const dispatch = useAppDispatch();

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

  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchName.toLowerCase()) &&
    (searchRating ? provider.customerReviews.rating >= parseFloat(searchRating) : true) &&
    (searchPrice ? provider.pricing <= parseFloat(searchPrice) : true) &&
    provider.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const handleSeeMore = () => {
    setVisibleCount(expanded ? 8 : filteredProviders.length);
    setExpanded(!expanded);
  };

  const handleAddToCart = (provider: ProviderType) => {
    dispatch(
      addToCart({
        product: provider._id,
        name: provider.name,
        price: provider.pricing,
        quantity: 1,
        stock: provider.experience,
        imageUrl: provider.location || "/placeholder.svg",
      })
    );
    toast.success(`${provider.name} added to cart!`);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Available Meal</h2>
      
      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-gray-700">Search by Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full p-2 border rounded-lg"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Search by Rating</label>
          <input
            type="number"
            placeholder="Min Rating"
            className="w-full p-2 border rounded-lg"
            value={searchRating}
            onChange={(e) => setSearchRating(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Search by Price</label>
          <input
            type="number"
            placeholder="Max Price"
            className="w-full p-2 border rounded-lg"
            value={searchPrice}
            onChange={(e) => setSearchPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Search by Location</label>
          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-2 border rounded-lg"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {filteredProviders.slice(0, visibleCount).map((provider) => (
          <div
            key={provider._id}
            className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-100"
          >
            <p className="text-gray-600"><strong>Name:</strong> {provider.name}</p>
            <p className="text-gray-600"><strong>Cuisine Specialties:</strong> {provider.cuisineSpecialties.join(", ")}</p>
            <p className="text-gray-600"><strong>Available Meals:</strong> {provider.availableMealOptions.join(", ")}</p>
            <p className="text-gray-600"><strong>Price Range:</strong> ${provider.pricing}</p>
            <p className="text-gray-600"><strong>Experience:</strong> {provider.experience} years</p>
            <p className="text-gray-600"><strong>Rating:</strong> {provider.customerReviews.rating} ⭐ ({provider.customerReviews.reviewsCount} reviews)</p>
            <p className="text-gray-600"><strong>Location:</strong> {provider.location}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {provider.contactInfo.phone} | <a href={`mailto:${provider.contactInfo.email}`} className="text-blue-500 underline">{provider.contactInfo.email}</a></p>
           <p className="text-gray-600"><strong>Website:</strong> <a href={provider.contactInfo.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Visit</a></p>

            <Link href={`/providerPost/${provider._id}`}>
              <p className="text-green-500 font-bold underline pt-3 text-center">View Details</p>
            </Link>

            <Button onClick={() => handleAddToCart(provider)} className="mt-4 w-full">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      {filteredProviders.length > 8 && (
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSeeMore}>
            {expanded ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProviderMeal;