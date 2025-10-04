
import { Station } from "@/types/metro";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useMetro } from "@/contexts/MetroContext";

interface StationInfoHeaderProps {
  station: Station;
}

const StationInfoHeader = ({ station }: StationInfoHeaderProps) => {
  const { getLocalizedText } = useMetro();
  const detailedInfo = station.detailedInfo;
  
  if (!detailedInfo) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white">{station.name}</h1>
        <div className="mt-2">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{station.name}</h1>
        <Badge 
          className={`
            ${detailedInfo.serviceStatus === "Normal Service" ? 
              "bg-green-500 text-white" : 
              "bg-amber-500 text-white"}
          `}
        >
          {getLocalizedText(detailedInfo.serviceStatus)}
        </Badge>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center mt-3">
        <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
          {detailedInfo.line}
        </Badge>
        <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
          {getLocalizedText(station.isUnderground ? "Underground" : "Elevated")}
        </Badge>
        <span className="text-xs text-white/80 ml-auto">
          {format(new Date(), "EEEE, d MMMM")}
        </span>
      </div>
    </div>
  );
};

export default StationInfoHeader;
