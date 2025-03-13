"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPostPreferences } from "@/service/customerService";

interface PreferenceType {
    _id: string;
    mealSelection: string[];
    customerId: string;
    deliveryDate: string;
    dietaryPreferences: string[];
}

const HPreference = () => {
    const [preferences, setPreferences] = useState<PreferenceType[]>([]);
    const router = useRouter();

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

    return (
        <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-200 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Meal Preferences</h2>
            <div className="w-80 h-1 bg-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600 mb-4">Here you can find customer meal preferences and dietary choices.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                {preferences.slice(0, 8).map((pref) => (
                    <div
                        key={pref._id}
                        className="p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    >
                        <p className="text-gray-600"><strong>Customer ID:</strong> {pref.customerId}</p>
                        <p className="text-gray-600"><strong>Meal Selection:</strong> {pref.mealSelection.join(", ")}</p>
                        <p className="text-gray-600"><strong>Dietary Preferences:</strong> {pref.dietaryPreferences.join(", ")}</p>
                        <p className="text-gray-600"><strong>Delivery Date:</strong> {pref.deliveryDate}</p>
                    </div>
                ))}
            </div>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => router.push("/customerPost")}
            >
                See More
            </button>
        </div>
    );
};

export default HPreference;
