import Image from "next/image";
import img1 from "../../../app/assets/img3.jpeg";

const ABanner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 p-6 md:p-12 bg-white rounded-lg shadow-md">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2">
        <Image
          src={img1}
          alt="MealBox Banner"
          width={600}
          height={400}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MealBox</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover delicious, home-cooked meals from trusted providers. Whether you are a customer looking for fresh food 
          or a meal provider sharing your passion, MealBox connects food lovers effortlessly.
        </p>
        <button className="bg-[#EF1F76] text-white py-2 px-6 rounded-lg font-semibold hover:bg-[#C51963] transition duration-300">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default ABanner;
