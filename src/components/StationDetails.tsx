
import { Station } from "@/types/metro";
import { useMetro } from "@/contexts/MetroContext";
import { Clock, MapPin, Train, Wifi, Car, Accessibility, Utensils, DoorOpen, ArrowUp, CheckCircle, XCircle } from "lucide-react";

interface StationDetailsProps {
  station: Station;
  onSelectAsSource?: () => void;
  onSelectAsDestination?: () => void;
}

export default function StationDetails({ 
  station, 
  onSelectAsSource, 
  onSelectAsDestination 
}: StationDetailsProps) {
  const { getLocalizedText } = useMetro();
  const detailedInfo = station.detailedInfo;
  
  // Check if metro is operational (6:00 AM - 10:00 PM)
  const isMetroOperational = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 22; // 6 AM to 10 PM
  };
  
  const metroOpen = isMetroOperational();
  
  return (
    <div className="space-y-4">
      {/* Station Header */}
      <div className="bg-gradient-to-r from-metro-orange to-orange-600 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{station.name}</h1>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {station.isUnderground ? "Underground" : "Elevated"}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                Orange Line
              </span>
            </div>
          </div>
          <Train className="h-12 w-12 opacity-80" />
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Timings */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <Clock className="h-5 w-5 text-metro-orange mb-2" />
          <p className="text-xs text-gray-500 mb-1">First Train</p>
          <p className="font-semibold">6:00 AM</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <Clock className="h-5 w-5 text-metro-orange mb-2" />
          <p className="text-xs text-gray-500 mb-1">Last Train</p>
          <p className="font-semibold">10:00 PM</p>
        </div>
      </div>

      {/* Platforms */}
      {detailedInfo?.platforms && detailedInfo.platforms.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-base mb-3 flex items-center">
            <Train className="h-5 w-5 text-metro-orange mr-2" />
            Platforms
          </h3>
          <div className="space-y-2">
            {detailedInfo.platforms.map((platform, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{platform.number}</p>
                  <p className="text-xs text-gray-600">{platform.towards}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Facilities */}
      {detailedInfo?.facilities && detailedInfo.facilities.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-base mb-3">All Facilities ({detailedInfo.facilities.length})</h3>
          <div className="space-y-2">
            {detailedInfo.facilities.map((facility, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-shrink-0 mt-0.5">
                  {facility.type === "Water" && <Wifi className="h-4 w-4 text-blue-500" />}
                  {facility.type === "Toilet" && <Accessibility className="h-4 w-4 text-purple-500" />}
                  {facility.type === "Food / Restaurant" && <Utensils className="h-4 w-4 text-orange-500" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold">{facility.name}</p>
                      <p className="text-[10px] text-gray-600 mt-0.5">{facility.type}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {facility.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parking */}
      {detailedInfo?.parking && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-base mb-3 flex items-center">
            <Car className="h-5 w-5 text-metro-orange mr-2" />
            Parking
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {detailedInfo.parking.car && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Car</p>
                <p className="font-semibold text-lg">{detailedInfo.parking.car.available}</p>
              </div>
            )}
            {detailedInfo.parking.bike && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Bike</p>
                <p className="font-semibold text-lg">{detailedInfo.parking.bike.available}</p>
              </div>
            )}
            {detailedInfo.parking.bicycle && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Cycle</p>
                <p className="font-semibold text-lg">{detailedInfo.parking.bicycle.available}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gates Details */}
      {detailedInfo?.gates && detailedInfo.gates.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-base mb-3 flex items-center">
            <DoorOpen className="h-5 w-5 text-metro-orange mr-2" />
            Entry Gates ({detailedInfo.gates.length})
          </h3>
          <div className="space-y-3">
            {detailedInfo.gates.map((gate, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <DoorOpen className="h-4 w-4 text-metro-orange mr-2" />
                    <span className="font-semibold text-sm">{gate.number}</span>
                  </div>
                  <div className="flex items-center">
                    {metroOpen && gate.isOpen ? (
                      <span className="flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Open
                      </span>
                    ) : (
                      <span className="flex items-center text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        <XCircle className="h-3 w-3 mr-1" />
                        Closed
                      </span>
                    )}
                  </div>
                </div>
                {gate.nearby && gate.nearby.length > 0 && (
                  <div className="mt-2">
                    <p className="text-[10px] text-gray-500 mb-1">Nearby:</p>
                    <div className="flex flex-wrap gap-1">
                      {gate.nearby.map((place, i) => (
                        <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200">
                          {place}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lifts & Escalators Details */}
      {detailedInfo?.lifts && detailedInfo.lifts.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-base mb-3 flex items-center">
            <ArrowUp className="h-5 w-5 text-metro-orange mr-2" />
            Lifts & Escalators ({detailedInfo.lifts.length})
          </h3>
          <div className="space-y-2">
            {detailedInfo.lifts.map((lift, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <ArrowUp className="h-4 w-4 text-metro-orange mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{lift.name}</p>
                      <p className="text-[10px] text-gray-600">{lift.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-white px-2 py-1 rounded border border-gray-200">
                      {lift.isInside ? "Inside" : "Outside"}
                    </span>
                    {lift.isDivyangFriendly && (
                      <Accessibility className="h-4 w-4 text-green-600" title="Accessible" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Landmarks */}
      {station.landmarks && station.landmarks.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-base mb-3 flex items-center">
            <MapPin className="h-5 w-5 text-metro-orange mr-2" />
            Nearby Places
          </h3>
          <div className="space-y-2">
            {station.landmarks.map((landmark, idx) => (
              <div key={idx} className="flex items-center p-2 bg-gray-50 rounded">
                <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <span className="text-sm">{landmark}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Action Buttons */}
      {(onSelectAsSource || onSelectAsDestination) && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {onSelectAsSource && (
            <button 
              onClick={onSelectAsSource}
              className="py-3 px-4 bg-metro-orange text-white rounded-lg font-medium shadow-md hover:bg-orange-600 transition-colors"
            >
              Set as Source
            </button>
          )}
          {onSelectAsDestination && (
            <button 
              onClick={onSelectAsDestination}
              className="py-3 px-4 bg-white text-metro-orange border-2 border-metro-orange rounded-lg font-medium hover:bg-orange-50 transition-colors"
            >
              Set as Destination
            </button>
          )}
        </div>
      )}
    </div>
  );
}
