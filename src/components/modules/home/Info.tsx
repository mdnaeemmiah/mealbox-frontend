import img1 from "../../../app/assets/img2.avif";

const Info = () => {
    return (
        <div 
            className="relative h-[600px] flex items-center justify-center bg-cover rounded-2xl bg-center my-4" 
            style={{ backgroundImage: `url(${img1.src})` }} // ✅ Use .src
        >
            <div className="absolute inset-0 bg-opacity-50"></div>

            <div className="relative text-center text-white px-6 max-w-2xl">
                <h1 className="text-5xl font-bold mb-4">MealBox</h1>
                <p className="text-lg mb-6">
                    Discover delicious meals tailored to your taste.  
                    Fresh ingredients, expertly crafted recipes, and  
                    convenient delivery – all in one place.
                </p>

                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                        Get Started
                    </button>
                    <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Info;
