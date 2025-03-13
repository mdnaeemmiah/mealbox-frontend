"use client";

export default function ContactForm() {
  return (
    <section className="min-h-screen bg-slate-50 px-5 max-w-6xl mx-auto pt-9">
      <div className="text-center">
        <h1 className="text-5xl text-[#3C0040] mt-16 font-bold my-5">
          Get in Touch with MealBox
        </h1>
        <p className="text-xl text-[#3C0040] my-5">
          Have questions about our meal plans or want to collaborate? Reach out!
        </p>
        <p className="text-xl text-[#3C0040] my-5">
          Whether you are a customer looking for delicious meals or a provider eager to join our platform, we are here to help.
        </p>
      </div>

      <section className="mt-12">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center underline mb-8 text-[#3C0040]">
            Contact Us
          </h2>

          <div className="flex flex-wrap -mx-6">
            {/* Left: Contact Info */}
            <div className="w-full md:w-1/2 px-6 mb-6 md:mb-0 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#3C0040]">
                Get in Touch
              </h3>
              <p className="mb-4 text-xl text-[#3C0040]">
                We did love to hear from you! Whether you have a question about our services, need help, or just want to chat, reach out anytime.
              </p>
              <ul className="mb-4">
                <li className="mb-2">
                  <strong>Address:</strong> 456 Meal Street, City 78910
                </li>
                <li className="mb-2">
                  <strong>Phone:</strong> (123) 987-6543
                </li>
                <li className="mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@mealbox.com"
                    className="text-[#EF1F76] font-semibold hover:underline"
                  >
                    naeem@mealbox.com
                  </a>
                </li>
                <li className="mb-2">
                  <strong>Hours:</strong> Mon - Fri, 9am - 7pm
                </li>
              </ul>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-[#3C0040]">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#3C0040]">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#3C0040]">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#3C0040]">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-[#3C0040]">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full md:w-1/2 px-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#3C0040]">
                Send Us a Message
              </h3>
              <form>
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963] bg-white"
                    type="text"
                    id="name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963] bg-white"
                    type="email"
                    id="email"
                    required
                  />
                </div>

                {/* Subject */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963] bg-white"
                    type="text"
                    id="subject"
                    required
                  />
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border-[1.5px] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C51963]"
                    id="message"
                    rows={4}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-[#EF1F76] mb-4 text-white py-2 px-4 rounded-md font-semibold hover:bg-[#C51963] hover:scale-105 transform transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
