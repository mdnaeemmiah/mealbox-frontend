// "use client";

// import React, { useEffect, useState } from "react";
// import { getMealProviders } from "@/service/providerService";
// import Link from "next/link";

// interface ProviderType {
//     _id: string;
//     name: string;
//     cuisineSpecialties: string[];
//     availableMealOptions: string[];
//     pricing: number ;
//     experience: number;
//     customerReviews: {
//         rating: number;
//         reviewsCount: number;
//         comments: string[];
//     };
//     location: string;
//     contactInfo: {
//         phone: string;
//         email: string;
//         website: string;
//     };
// }

// const ProviderMeal = () => {
//     const [providers, setProviders] = useState<ProviderType[]>([]);
//     const [visibleCount, setVisibleCount] = useState(8);
//     const [expanded, setExpanded] = useState(false);

//     useEffect(() => {
//         const fetchProviders = async () => {
//             try {
//                 const result = await getMealProviders();
//                 if (result?.success && Array.isArray(result.data)) {
//                     setProviders(result.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching providers:", error);
//             }
//         };
//         fetchProviders();
//     }, []);

//     if (providers.length === 0) {
//         return <p className="text-gray-500 text-center">Loading meal providers...</p>;
//     }

//     const handleSeeMore = () => {
//         if (expanded) {
//             setVisibleCount(8);
//         } else {
//             setVisibleCount(providers.length);
//         }
//         setExpanded(!expanded);
//     };

//     return (
//         <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Available Meal</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
//                 {providers.slice(0, visibleCount).map((provider) => (
//                     <div 
//                         key={provider._id} 
//                         className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-100"
//                     >
//                         <p className="text-gray-600"><strong>Name:</strong> {provider.name}</p>
//                         <p className="text-gray-600"><strong>Cuisine Specialties:</strong> {provider.cuisineSpecialties.join(", ")}</p>
//                         <p className="text-gray-600"><strong>Available Meals:</strong> {provider.availableMealOptions.join(", ")}</p>
//                         <p className="text-gray-600"><strong>Price Range:</strong> {provider.pricing}</p>
//                         <p className="text-gray-600"><strong>Experience:</strong> {provider.experience} years</p>
//                         <p className="text-gray-600"><strong>Rating:</strong> {provider.customerReviews.rating} ⭐ ({provider.customerReviews.reviewsCount} reviews)</p>
//                         <p className="text-gray-600"><strong>Reviews:</strong> {provider.customerReviews.comments.join(" | ")}</p>
//                         <p className="text-gray-600"><strong>Location:</strong> {provider.location}</p>
//                         <p className="text-gray-600"><strong>Contact:</strong> {provider.contactInfo.phone} | <a href={`mailto:${provider.contactInfo.email}`} className="text-blue-500 underline">{provider.contactInfo.email}</a></p>
//                         <p className="text-gray-600"><strong>Website:</strong> <a href={provider.contactInfo.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Visit</a></p>
                        
//                         <Link href={`/providerPost/${provider._id}`}>
//                             <p className="text-green-500 font-bold underline pt-3 text-center">View Details</p>
//                         </Link>
                        
//                     </div>
//                 ))}
//             </div>
//             {providers.length > 8 && (
//                 <div className="mt-4">
//                     <button
//                         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                         onClick={handleSeeMore}
//                     >
//                         {expanded ? "See Less" : "See More"}
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProviderMeal;



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
  const dispatch = useAppDispatch();

  // Fetch providers on component mount
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

  // Handle "See More" / "See Less" toggle
  const handleSeeMore = () => {
    setVisibleCount(expanded ? 8 : providers.length);
    setExpanded(!expanded);
  };

  // Handle adding a provider to the cart
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

  if (providers.length === 0) {
    return <p className="text-gray-500 text-center">Loading meal providers...</p>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Available Meal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {providers.slice(0, visibleCount).map((provider) => (
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
            <p className="text-gray-600"><strong>Reviews:</strong> {provider.customerReviews.comments.join(" | ")}</p>
            <p className="text-gray-600"><strong>Location:</strong> {provider.location}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {provider.contactInfo.phone} | <a href={`mailto:${provider.contactInfo.email}`} className="text-blue-500 underline">{provider.contactInfo.email}</a></p>
            <p className="text-gray-600"><strong>Website:</strong> <a href={provider.contactInfo.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">Visit</a></p>

            {/* View Details Link */}
            <Link href={`/providerPost/${provider._id}`}>
              <p className="text-green-500 font-bold underline pt-3 text-center">View Details</p>
            </Link>

            {/* Add to Cart Button */}
            <Button
              onClick={() => handleAddToCart(provider)}
              className="mt-4 w-full"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        ))}
      </div>

      {/* See More / See Less Button */}
      {providers.length > 8 && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSeeMore}
          >
            {expanded ? "See Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProviderMeal;