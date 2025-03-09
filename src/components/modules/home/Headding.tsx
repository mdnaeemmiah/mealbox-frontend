"use client"; // Ensures this runs on the client side

import { useEffect, useState } from "react";

const Heading = () => {
    const [districts, setDistricts] = useState([
        { zila: "Dhaka", food: "Biriyani, Fuchka, Kacchi" },
        { zila: "Chittagong", food: "Mezban, Panta Bhat, Shutki" },
        { zila: "Sylhet", food: "Shatkora, Pitha, Paratha" },
        { zila: "Rajshahi", food: "Mango, Chui Jhal, Roshkodom" },
        { zila: "Khulna", food: "Chingri Malai Curry, Panta Bhat" },
        { zila: "Barisal", food: "Hilsa, Panta Bhat, Coconut Sweet" },
        { zila: "Rangpur", food: "Pitha, Thekua, Chhena" },
        { zila: "Comilla", food: "Roshmalai, Chomchom, Meat Curry" },
        { zila: "Jessore", food: "Chhana Pitha, Misti" },
        { zila: "Bogra", food: "Doi, Beef Kala Bhuna" },
        { zila: "Mymensingh", food: "Tangri Kebab, Hilsa" },
        { zila: "Faridpur", food: "Misti, Roshgolla, Puli Pitha" },
        { zila: "Cox’s Bazar", food: "Seafood, Shutki, Crabs" },
        { zila: "Narayanganj", food: "Jhalmuri, Kebabs, Puri" },
        { zila: "Pabna", food: "Chana, Roshmalai, Beef Curry" },
    ]);

    // Simulating an API call (can be replaced with a real API fetch)
    useEffect(() => {
        setTimeout(() => {
            setDistricts((prev) => [
                ...prev,
                { zila: "Noakhali", food: "Shutki, Panta Bhat, Sweets" },
            ]);
        }, 3000); // New district added dynamically after 3 seconds
    }, []);

    return (
        <div className="w-full bg-gray-100 py-6 text-center">
            {/* Headline with wider underline */}
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Explore Food from Different Districts
            </h2>
            <div className="w-80 h-1 bg-green-500 mx-auto mb-4"></div>

            {/* One-line paragraph */}
            <p className="text-lg text-gray-600 mb-6">
            Discover the best traditional dishes from various regions of Bangladesh.  
    Each district has its own unique flavors, from the famous Dhaka Biriyani to the  
    mouthwatering seafood of Cox’s Bazar. Explore the diverse food culture that  
    makes Bangladesh a paradise for food lovers!
            </p>

            {/* Scrolling Districts */}
            <div className="overflow-hidden w-full">
                <div className="flex gap-6 animate-marquee whitespace-nowrap">
                    {[...districts, ...districts].map((district, index) => (
                        <div
                            key={index}
                            className="w-52 h-52 bg-white shadow-lg rounded-xl p-4 flex flex-col items-center justify-center 
                                       transition transform hover:scale-105"
                        >
                            <h1 className="text-xl font-bold text-gray-800">{district.zila}</h1>
                            <p className="text-sm text-gray-600 mt-2 text-center">{district.food}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Heading;
