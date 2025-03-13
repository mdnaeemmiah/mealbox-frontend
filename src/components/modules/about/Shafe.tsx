'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import img1 from '../../../app/assets/download (5).jpeg';
import img2 from '../../../app/assets/download (6).jpeg';
import img3 from '../../../app/assets/download (10).jpeg';
import img4 from '../../../app/assets/download (8).jpeg';
import img5 from '../../../app/assets/download (9).jpeg';

const mealProviders = [
    {
        id: 1,
        name: "John Doe",
        experience: "5 Years of Experience",
        description: "Specialized in Italian cuisine, bringing you the finest pasta and pizzas.",
        image: img1,
    },
    {
        id: 2,
        name: "Emily Smith",
        experience: "3 Years of Experience",
        description: "Healthy and organic meal specialist with a focus on nutritious dishes.",
        image: img2,
    },
    {
        id: 3,
        name: "Michael Brown",
        experience: "7 Years of Experience",
        description: "BBQ and grill master, serving mouth-watering steaks and burgers.",
        image: img3,
    },
    {
        id: 4,
        name: "Sophia Lee",
        experience: "4 Years of Experience",
        description: "Authentic Asian cuisine expert, offering delicious sushi and ramen.",
        image: img4,
    },
    {
        id: 5,
        name: "David Wilson",
        experience: "6 Years of Experience",
        description: "French cuisine specialist, creating exquisite pastries and desserts.",
        image:img5,
    },
    {
        id: 6,
        name: "Olivia Martinez",
        experience: "8 Years of Experience",
        description: "Mexican food expert, serving the best tacos, burritos, and enchiladas.",
        image: img3,
    }
];

// Updated Responsive Settings (Showing 4 items at a time on large screens)
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1280 },
        items: 4, // Show 4 items at a time
        slidesToSlide: 1,
    },
    desktop: {
        breakpoint: { max: 1280, min: 1024 },
        items: 3,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        slidesToSlide: 1,
    }
};

const Shafe = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Meet Our Meal Providers</h2>
            <Carousel 
                responsive={responsive}
                infinite
                autoPlay
                autoPlaySpeed={3000}
                arrows
                showDots
                className="rounded-lg"
            >
                {mealProviders.map((provider) => (
                    <div key={provider.id} className="p-6 text-center">
                        <Image 
                            width={160} 
                            height={160}
                            src={provider.image} 
                            alt={provider.name} 
                            className="w-40 h-40 mx-auto rounded-full shadow-md border-4 border-purple-500"
                        />
                        <h3 className="text-2xl font-semibold text-gray-800 mt-4">{provider.name}</h3>
                        <p className="text-sm text-gray-500">{provider.experience}</p>
                        <p className="text-gray-700 mt-2">{provider.description}</p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Shafe;
