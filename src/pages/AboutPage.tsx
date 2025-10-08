import { useNavigate } from "react-router-dom";
import { ArrowLeft, Train, MapPin, Clock, Users } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      {/* Header */}
      <div className="bg-metro-orange text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center">
          <button 
            onClick={() => navigate("/more")}
            className="mr-3"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">About Kanpur Metro</h1>
        </div>
      </div>
      
      <div className="p-4 flex-1">
        {/* Metro Logo/Icon Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-metro-orangeLight flex items-center justify-center mx-auto mb-4">
            <Train className="h-10 w-10 text-metro-orange" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Kanpur Metro</h2>
          <p className="text-gray-600">Orange Line</p>
        </div>

        {/* Metro Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Metro Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3 flex-shrink-0">
                <MapPin className="h-5 w-5 text-metro-orange" />
              </div>
              <div>
                <p className="font-medium">Network Length</p>
                <p className="text-sm text-gray-600">16 km Orange Line</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Train className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Total Stations</p>
                <p className="text-sm text-gray-600">14 Stations (9 Elevated + 5 Underground)</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Operating Hours</p>
                <p className="text-sm text-gray-600">6:00 AM - 10:00 PM (Daily)</p>
                <p className="text-sm text-gray-600">Peak Frequency: Every 5 minutes</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Daily Commuters</p>
                <p className="text-sm text-gray-600">30,000+ passengers daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Orange Line Route</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-metro-orange mr-3"></div>
              <p className="text-sm text-gray-700">IIT Kanpur (West Terminus)</p>
            </div>
            <div className="ml-1.5 border-l-2 border-gray-300 h-6"></div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-400 mr-3"></div>
              <p className="text-sm text-gray-700">12 Intermediate Stations</p>
            </div>
            <div className="ml-1.5 border-l-2 border-gray-300 h-6"></div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-metro-orange mr-3"></div>
              <p className="text-sm text-gray-700">Kanpur Central (East Terminus)</p>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">App Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium">January 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Developer</span>
              <span className="font-medium">Mohd Shadab</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">App Features</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-metro-orange mr-2">•</span>
              <span className="text-sm text-gray-700">Real-time journey planning</span>
            </li>
            <li className="flex items-start">
              <span className="text-metro-orange mr-2">•</span>
              <span className="text-sm text-gray-700">Accurate fare calculation</span>
            </li>
            <li className="flex items-start">
              <span className="text-metro-orange mr-2">•</span>
              <span className="text-sm text-gray-700">Detailed station information</span>
            </li>
            <li className="flex items-start">
              <span className="text-metro-orange mr-2">•</span>
              <span className="text-sm text-gray-700">Interactive metro map</span>
            </li>
            <li className="flex items-start">
              <span className="text-metro-orange mr-2">•</span>
              <span className="text-sm text-gray-700">Recent journey history</span>
            </li>
            <li className="flex items-start">
              <span className="text-metro-orange mr-2">•</span>
              <span className="text-sm text-gray-700">Fully offline friendly</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p className="mb-2">Made with ❤️ for Kanpur Metro</p>
          <p className="text-xs">© 2025 Kanpur Metro Rail Corporation Ltd.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
