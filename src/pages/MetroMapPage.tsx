import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import MetroMap from "@/components/MetroMap";
import { Station } from "@/types/metro";
import { MapPin } from "lucide-react";

const MetroMapPage = () => {
  const { getLocalizedText, selectedSource, selectedDestination } = useMetro();
  
  // Create array of stations to highlight
  const highlightedStations = [
    selectedSource,
    selectedDestination
  ].filter(Boolean) as Station[];
  
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
            highlightStations={highlightedStations}
          />
        </div>
        
        {/* Journey Info - Show if stations are selected */}
        {highlightedStations.length > 0 && (
          <div className="mt-4 bg-gradient-to-r from-metro-orange/10 to-orange-100 border border-metro-orange/30 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-metro-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-metro-orange mb-2">Selected Stations:</p>
                <div className="space-y-1">
                  {selectedSource && (
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="font-medium">Source:</span>
                      <span className="ml-1">{selectedSource.name}</span>
                    </div>
                  )}
                  {selectedDestination && (
                    <div className="flex items-center text-sm text-gray-700">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      <span className="font-medium">Destination:</span>
                      <span className="ml-1">{selectedDestination.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
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
