// "use client";

// import React, { useEffect, useState } from "react";
// import { getPostPreferences } from "@/service/customerService";
// import Link from "next/link";

// interface PreferenceType {
//     _id: string;
//     mealSelection: string[];
//     customerId: string;
//     deliveryDate: string;
//     dietaryPreferences: string[];
// }

// const Preference = () => {
//     const [preferences, setPreferences] = useState<PreferenceType[]>([]);
//     const [visibleCount, setVisibleCount] = useState(12);
//     const [expanded, setExpanded] = useState(false);

//     useEffect(() => {
//         const fetchPreferences = async () => {
//             try {
//                 const result = await getPostPreferences();
//                 if (result?.success && Array.isArray(result.data)) {
//                     setPreferences(result.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching preferences:", error);
//             }
//         };
//         fetchPreferences();
//     }, []);

//     if (preferences.length === 0) {
//         return <p className="text-gray-500 text-center">Loading preferences...</p>;
//     }

//     const handleSeeMore = () => {
//         if (expanded) {
//             setVisibleCount(12);
//         } else {
//             setVisibleCount(preferences.length);
//         }
//         setExpanded(!expanded);
//     };

//     return (
//         <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Meal Preferences</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
//                 {preferences.slice(0, visibleCount).map((pref) => (
//                     <div 
//                         key={pref._id} 
//                         className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
//                     >
//                         <p className="text-gray-600"><strong>Customer ID:</strong> {pref.customerId}</p>
//                         <p className="text-gray-600"><strong>Meal Selection:</strong> {pref.mealSelection.join(", ")}</p>
//                         <p className="text-gray-600"><strong>Dietary Preferences:</strong> {pref.dietaryPreferences.join(", ")}</p>
//                         <p className="text-gray-600"><strong>Delivery Date:</strong> {pref.deliveryDate}</p>
//                         <Link href={`/customerPost/${}`}>
//                            <p className="text-green-500 font-bold underline pt-3 text-center">View Details</p>
//                          </Link>
//                     </div>
//                 ))}
//             </div>
//             {preferences.length > 4 && (
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

// export default Preference;








"use client";

import React, { useEffect, useState } from "react";
import { getPostPreferences } from "@/service/customerService";
import Link from "next/link";

interface PreferenceType {
    _id: string;
    mealSelection: string[];
    customerId: string;
    deliveryDate: string;
    dietaryPreferences: string[];
}

const Preference = () => {
    const [preferences, setPreferences] = useState<PreferenceType[]>([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const result = await getPostPreferences();
                if (result?.success && Array.isArray(result.data)) {
                    setPreferences(result.data);
                }
            } catch (error) {
                console.error("Error fetching preferences:", error);
            }
        };
        fetchPreferences();
    }, []);

    if (preferences.length === 0) {
        return <p className="text-gray-500 text-center">Loading preferences...</p>;
    }

    const handleSeeMore = () => {
        if (expanded) {
            setVisibleCount(12);
        } else {
            setVisibleCount(preferences.length);
        }
        setExpanded(!expanded);
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Meal Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {preferences.slice(0, visibleCount).map((pref) => (
                    <div 
                        key={pref._id} 
                        className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    >
                        <p className="text-gray-600"><strong>Customer ID:</strong> {pref.customerId}</p>
                        <p className="text-gray-600"><strong>Meal Selection:</strong> {pref.mealSelection.join(", ")}</p>
                        <p className="text-gray-600"><strong>Dietary Preferences:</strong> {pref.dietaryPreferences.join(", ")}</p>
                        <p className="text-gray-600"><strong>Delivery Date:</strong> {pref.deliveryDate}</p>
                        <Link href={`/customerPost/${pref._id}`}>
                           <p className="text-green-500 font-bold underline pt-3 text-center">View Details</p>
                         </Link>
                    </div>
                ))}
            </div>
            {preferences.length > 4 && (
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

export default Preference;
