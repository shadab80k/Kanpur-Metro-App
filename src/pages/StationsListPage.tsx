
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMetro } from "@/contexts/MetroContext";
import AppNavbar from "@/components/AppNavbar";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const StationsListPage = () => {
  const { stations, getLocalizedText } = useMetro();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter stations based on search term
  const filteredStations = stations.filter(station => 
    station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const goToStationDetails = (stationName: string) => {
    // Format station name for URL
    const formattedName = stationName.replace(/ /g, "-").toLowerCase();
    window.scrollTo(0, 0);
    navigate(`/stations/${formattedName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-16">
      <AppNavbar />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{getLocalizedText("Station Information")}</h1>
        
        {/* Search box */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder={getLocalizedText("Search stations...")}
            className="pl-10 bg-white border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Stations count */}
        <div className="text-sm text-gray-500 mb-3">
          {filteredStations.length} {getLocalizedText("stations found")}
        </div>
        
        {/* Stations list with station numbers */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredStations.length > 0 ? (
            <div className="pb-2">
              {filteredStations.map((station, index) => (
                <div 
                  key={station.id} 
                  onClick={() => goToStationDetails(station.name)}
                  className="relative flex items-center px-4 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  {/* Station number badge */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-metro-orange text-white flex items-center justify-center font-bold text-sm mr-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-semibold text-base mb-1">{station.name}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className={`px-2 py-0.5 text-xs rounded-full ${
                        station.isUnderground 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-metro-orangeLight text-metro-orangeDark'
                      }`}>
                        {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
                      </div>
                      
                      {station.landmarks && station.landmarks.length > 0 && (
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-[200px]">{station.landmarks[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">{getLocalizedText("No stations found")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationsListPage;
