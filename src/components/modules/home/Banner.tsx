import Image from "next/image";
import img3 from "../../../app/assets/img3.jpeg";  // Corrected import for img3
import img4 from "../../../app/assets/img4.jpeg";  // Corrected import for img4

const Banner = () => {
    return (
        <div className="p-8">
            {/* Title and Paragraph */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome to Our Food Platform
                </h1>
                <div className="w-80 h-1 bg-green-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-600">
                    Whether you are a customer craving delicious meals or a meal provider looking to expand your business, we have something for everyone. Explore the opportunities now!
                </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-6 justify-between space-y-6 md:space-y-0">
                {/* Left Section for Customers */}
                <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
                    <Image 
                        width={500} 
                        height={500}
                        src={img3} // Using img3 for the left section
                        alt="Customer Image" 
                        className="w-full h-60 object-cover rounded-lg mb-6 md:mb-0" // Added margin bottom for space between images
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">For Customers</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Discover delicious meals easily.</li>
                        <li>Get meals delivered to your door.</li>
                        <li>Choose from a wide variety of options.</li>
                    </ul>
                </div>

                {/* Right Section for Meal Providers */}
                <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6">
                    <Image 
                        width={500} 
                        height={500}
                        src={img4} // Using img4 for the right section
                        alt="Meal Provider Image" 
                        className="w-full h-60 object-cover rounded-lg mb-6 md:mb-0" // Added margin bottom for space between images
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">For Meal Providers</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Reach more customers easily.</li>
                        <li>Offer a variety of meal options.</li>
                        <li>Boost your business with an online platform.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Banner;
