import React from "react";
import { Link } from "react-router-dom";
import { Leaf, Cloud, Users, ChevronRight, Facebook, Twitter, Instagram } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url(https://static.vecteezy.com/system/resources/thumbnails/030/353/613/small_2x/natural-background-ai-generated-photo.jpg)" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative container mx-auto flex items-center justify-center h-full">
          <div className="text-center text-white p-8 bg-green-800 bg-opacity-40 rounded-lg shadow-2xl backdrop-blur-sm max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Farmers with Smart Technology
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Farmer's Friend provides real-time, data-driven advisory services to optimize crop yields and manage resources efficiently.
            </p>
            <Link to="/getdata">
              <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 flex items-center">
                Get Started
                <ChevronRight className="ml-2" size={24} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:scale-105">
            <Leaf className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Predictive Analytics</h3>
            <p className="text-gray-600">
              Optimize crop performance with AI-driven recommendations for planting, fertilization, and irrigation.
            </p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:scale-105">
            <Cloud className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Remote Accessibility</h3>
            <p className="text-gray-600">
              Access vital information and insights regardless of your location or connectivity challenges.
            </p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-2xl hover:scale-105">
            <Users className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Community Forum</h3>
            <p className="text-gray-600">
              Connect with other farmers to share experiences, strategies, and foster collaborative knowledge exchange.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-700 text-white py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Revolutionize Your Farming?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already benefiting from our cutting-edge agricultural technology.
          </p>
          <Link to="/signup">
            <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 hover:bg-green-100">
              Sign Up Now
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-2">
        <div className="container mx-auto">
          <div className="mt-3 mb-3 pt-8 border-t border-green-700 text-center">
            <p>&copy; 2023 Farmer's Friend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;