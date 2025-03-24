"use client";

import React, { useEffect, useState } from "react";
import { getPostPreferenceById } from "@/service/customerService";
import Link from "next/link";
import { useParams } from "next/navigation";

interface PreferenceType {
  _id: string;
  mealSelection: string[];
  customerId: string;
  deliveryDate: string;
  dietaryPreferences: string[];
}

const PreferenceDetails = () => {
  // const params = useParams();
  // console.log({params})
  const { customerPostId } = useParams();

  console.log({customerPostId})
  const [preference, setPreference] = useState<PreferenceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (!customerPostId) {
     
      setError("Preference ID is missing");
      setLoading(false);
      return;
    }

    const fetchPreference = async () => {
      try {
        const result = await getPostPreferenceById(customerPostId as string);
        console.log("API Response:", result);
        
        if (result?.success) {
          setPreference(result.data);
        } else {
          setError(result?.error || "Failed to fetch preference details");
        }
      } catch (error) {
        console.error("Error fetching preference:", error);
        setError("An error occurred while fetching preference details");
      } finally {
        setLoading(false);
      }
    };

    fetchPreference();
  }, [customerPostId]);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading preference details...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!preference) {
    return <p className="text-red-500 text-center mt-8">Preference not found</p>;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Preference Details</h2>
      <div className="space-y-2 text-gray-600">
        <p><strong>Customer ID:</strong> {preference.customerId}</p>
        <p><strong>Meal Selection:</strong> {preference.mealSelection.join(", ")}</p>
        <p><strong>Dietary Preferences:</strong> {preference.dietaryPreferences.join(", ")}</p>
        <p><strong>Delivery Date:</strong> {formatDate(preference.deliveryDate)}</p>
      </div>
      <div className="text-center mt-6">
        <Link href="/customerPost">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PreferenceDetails;