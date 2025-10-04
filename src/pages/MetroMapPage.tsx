import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import MetroMap from "@/components/MetroMap";
import { Station } from "@/types/metro";

const MetroMapPage = () => {
  const { getLocalizedText } = useMetro();
  
  // Station click disabled - no action on click
  const handleStationSelect = (station: Station) => {
    // Do nothing - station clicks are disabled
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4 flex-1 relative">
        <h1 className="text-xl font-semibold mb-4 flex items-center">
          <span className="bg-metro-orange text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            M
          </span>
          {getLocalizedText("Kanpur Metro Map")}
        </h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <MetroMap 
            onStationSelect={handleStationSelect}
            highlightStations={[]}
          />
        </div>
        
        {/* Info message */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-medium">💡 Tip:</span> To view station details, go to the "Station Info" section from the navigation menu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetroMapPage;
