import { useNavigate } from "react-router-dom";
import AppNavbar from "@/components/AppNavbar";
import { useMetro } from "@/contexts/MetroContext";
import { 
  Languages, 
  Moon, 
  Trash2, 
  Calculator, 
  Phone, 
  MessageSquare, 
  Info,
  ChevronRight
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

const MorePage = () => {
  const navigate = useNavigate();
  const { language, switchLanguage, clearRecentRoutes } = useMetro();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearSearches = () => {
    clearRecentRoutes();
    setShowClearDialog(false);
    toast.success("Recent searches cleared successfully");
  };

  const handleFeedback = () => {
    // Open email client with pre-filled subject
    window.location.href = "mailto:feedback@kanpurmetro.org?subject=Kanpur Metro App Feedback";
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:0512-2246200";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1">
        <h1 className="text-2xl font-bold mb-6">More Options</h1>
        
        {/* Settings Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Settings</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {/* Language Setting */}
            <button
              onClick={switchLanguage}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <Languages className="h-5 w-5 text-metro-orange" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Language</p>
                <p className="text-sm text-gray-500">{language}</p>
              </div>
              <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                हिं
              </div>
            </button>

            {/* Dark Mode */}
            <div className="p-4 flex items-center opacity-60 cursor-not-allowed">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                <Moon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-700">Dark Mode</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
              <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
            </div>

            {/* Clear Recent Searches */}
            <button
              onClick={() => setShowClearDialog(true)}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Clear Recent Searches</p>
                <p className="text-sm text-gray-500">Remove all recent search history</p>
              </div>
              <span className="text-sm text-metro-orange font-medium">Clear</span>
            </button>
          </div>
        </div>

        {/* Tools & Utilities Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Tools & Utilities</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => navigate("/fare-calculator")}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Calculator className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Fare Calculator</p>
                <p className="text-sm text-gray-500">Calculate metro fare between stations</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Help & Support Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Help & Support</h2>
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {/* Emergency Helpline */}
            <button
              onClick={handleEmergencyCall}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Emergency Helpline</p>
                <p className="text-sm text-gray-500">24/7 customer support</p>
                <p className="text-sm font-semibold text-red-600 mt-1">0512-2246200</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>

            {/* Send Feedback */}
            <button
              onClick={handleFeedback}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">Send Feedback</p>
                <p className="text-sm text-gray-500">Help us improve the app</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <div className="bg-white rounded-lg shadow-sm">
            <button
              onClick={() => navigate("/about")}
              className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Info className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">About Kanpur Metro</p>
                <p className="text-sm text-gray-500">App information and credits</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Version 1.0.0</p>
          <p className="mt-1">Made with ❤️ for Kanpur Metro</p>
        </div>
      </div>

      {/* Clear Recent Searches Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Recent Searches?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all your recent journey records. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleClearSearches}
              className="bg-red-600 hover:bg-red-700"
            >
              Clear History
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MorePage;
