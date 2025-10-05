
import { useState, useCallback, useRef, useEffect } from "react";
import { Station } from "@/types/metro";
import { useMetro } from "@/contexts/MetroContext";
import { Search, ZoomIn, ZoomOut, Circle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MetroMapProps {
  onStationSelect?: (station: Station) => void;
  highlightStations?: Station[];
  sourceStation?: Station | null;
  destinationStation?: Station | null;
}

export default function MetroMap({ onStationSelect, highlightStations = [], sourceStation, destinationStation }: MetroMapProps) {
  const { stations, getLocalizedText, selectedSource, selectedDestination } = useMetro();
  
  // Use passed props or context values
  const actualSource = sourceStation || selectedSource;
  const actualDestination = destinationStation || selectedDestination;
  const [zoomLevel, setZoomLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const startPosition = useRef({ x: 0, y: 0, scrollX: 0, scrollY: 0 });
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };
  
  const handleStationClick = useCallback((station: Station) => {
    if (onStationSelect) {
      onStationSelect(station);
    }
  }, [onStationSelect]);
  
  const filteredStations = searchQuery 
    ? stations.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) 
    : stations;
  
  const isHighlighted = (stationId: number) => {
    return highlightStations.some(s => s.id === stationId);
  };
  
  const isSourceStation = (stationId: number) => {
    return actualSource?.id === stationId;
  };
  
  const isDestinationStation = (stationId: number) => {
    return actualDestination?.id === stationId;
  };
  
  // Mouse drag handling for map panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (mapRef.current) {
      setIsDragging(true);
      startPosition.current = {
        x: e.clientX,
        y: e.clientY,
        scrollX: mapRef.current.scrollLeft,
        scrollY: mapRef.current.scrollTop
      };
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !mapRef.current) return;
    
    const dx = e.clientX - startPosition.current.x;
    const dy = e.clientY - startPosition.current.y;
    
    mapRef.current.scrollLeft = startPosition.current.scrollX - dx;
    mapRef.current.scrollTop = startPosition.current.scrollY - dy;
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    // Reset position when zoom changes
    if (mapRef.current) {
      mapRef.current.scrollLeft = 0;
      mapRef.current.scrollTop = 0;
    }
  }, [zoomLevel]);

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
      {/* Search and Zoom Controls */}
      <div className="p-3 border-b flex justify-between items-center sticky top-0 bg-white z-10">
        <div className="relative w-full mr-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={getLocalizedText("Search stations...")}
            className="pl-9 p-2 w-full border rounded-lg text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 w-9 p-0"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 w-9 p-0"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Metro Map Container */}
      <div 
        ref={mapRef}
        className="overflow-auto h-[70vh] cursor-grab"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="relative min-h-[1200px] min-w-[100%] transition-transform duration-300 p-4 pb-20"
          style={{ 
            transform: `scale(${zoomLevel})`, 
            transformOrigin: 'center top',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Line Label - Orange Line at the top */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-metro-orange text-white font-bold px-8 py-2 rounded-full shadow-sm text-base">
              {getLocalizedText("Orange Line")}
            </div>
          </div>
          
          {/* Metro Line Track - Straight vertical line */}
          <div className="absolute left-1/2 top-20 bottom-20 transform -translate-x-1/2 w-2 bg-metro-orange"></div>
          
          {/* Station Markers */}
          {filteredStations.map((station, index) => {
            const isTerminus = index === 0 || index === stations.length - 1;
            const stationHighlighted = isHighlighted(station.id);
            const isSource = isSourceStation(station.id);
            const isDestination = isDestinationStation(station.id);
            
            // Calculate position - evenly space stations along the vertical line
            const topPosition = 100 + (index * (800 / (stations.length - 1)));
            
            // Alternate stations on left and right sides
            const isLeft = index % 2 === 0;
            
            return (
              <div 
                key={station.id} 
                className="absolute left-1/2 transform -translate-x-1/2"
                style={{ top: `${topPosition}px` }}
              >
                {/* Station marker */}
                <div 
                  onClick={() => handleStationClick(station)}
                  className="flex items-center cursor-pointer"
                  style={{
                    position: 'relative',
                    zIndex: stationHighlighted ? 20 : 10
                  }}
                >
                  {/* Left side station information */}
                  {isLeft && (
                    <div 
                      className="absolute right-8 text-right"
                      style={{ width: '150px' }}
                    >
                      <p className="font-bold text-lg">{station.name}</p>
                      <div className="mt-1 inline-block">
                        <span className={`px-3 py-1 rounded-full text-xs ${station.isUnderground ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                          {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Station Circle with Enhanced Visual for Selected Stations */}
                  {(isSource || isDestination) ? (
                    <div className="relative flex items-center justify-center z-20">
                      {/* Outer Glowing Ring */}
                      <div 
                        className={cn(
                          "absolute rounded-full animate-ping",
                          isSource
                            ? "w-12 h-12 bg-green-400 opacity-40" 
                            : "w-12 h-12 bg-red-400 opacity-40"
                        )}
                      />
                      
                      {/* Middle Ring */}
                      <div 
                        className={cn(
                          "absolute rounded-full border-4",
                          isSource
                            ? "w-10 h-10 bg-green-500 border-green-300 shadow-lg" 
                            : "w-10 h-10 bg-red-500 border-red-300 shadow-lg"
                        )}
                      />
                      
                      {/* Inner Pin Icon */}
                      <MapPin 
                        className="relative h-6 w-6 text-white z-10"
                        strokeWidth={2.5}
                      />
                    </div>
                  ) : (
                    <div 
                      className={cn(
                        "rounded-full flex items-center justify-center z-10 border-2 border-white shadow-md transition-all duration-300",
                        stationHighlighted
                          ? "w-7 h-7 bg-metro-orange animate-pulse" 
                          : "w-5 h-5 bg-metro-orange",
                      )}
                    >
                      {isTerminus && <Circle className="h-2 w-2 text-white" />}
                    </div>
                  )}
                  
                  {/* Right side station information */}
                  {!isLeft && (
                    <div 
                      className="absolute left-8 text-left"
                      style={{ width: '150px' }}
                    >
                      <p className="font-bold text-lg">{station.name}</p>
                      <div className="mt-1 inline-block">
                        <span className={`px-3 py-1 rounded-full text-xs ${station.isUnderground ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                          {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend at the bottom */}
      <div className="p-3 border-t bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
            <span>{getLocalizedText("Underground")}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
            <span>{getLocalizedText("Elevated")}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-metro-orange mr-2 flex-shrink-0"></div>
            <span>{getLocalizedText("Orange Line")}</span>
          </div>
          {actualSource && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="font-medium">Source</span>
            </div>
          )}
          {actualDestination && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
              <span className="font-medium">Destination</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
