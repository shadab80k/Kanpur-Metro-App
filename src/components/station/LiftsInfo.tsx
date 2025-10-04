
import { Lift } from "@/types/metro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMetro } from "@/contexts/MetroContext";

interface LiftsInfoProps {
  lifts?: Lift[];
}

const LiftsInfo = ({ lifts }: LiftsInfoProps) => {
  const { getLocalizedText } = useMetro();
  
  if (!lifts || lifts.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{getLocalizedText("Lifts & Escalators")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="sticky top-0 bg-white z-10 w-[100px]">{getLocalizedText("Name")}</TableHead>
                  <TableHead className="sticky top-0 bg-white z-10 w-[140px]">{getLocalizedText("Location")}</TableHead>
                  <TableHead className="sticky top-0 bg-white z-10 w-[80px]">{getLocalizedText("Position")}</TableHead>
                  <TableHead className="sticky top-0 bg-white z-10 w-[100px] text-center">{getLocalizedText("Access")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lifts.map((lift, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium p-3">
                      <div className="flex items-center">
                        <ArrowUp className="w-4 h-4 mr-1 text-metro-orange flex-shrink-0" />
                        <span className="text-xs whitespace-nowrap">{lift.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs p-3">
                      <div className="max-w-[140px]">{lift.location}</div>
                    </TableCell>
                    <TableCell className="text-xs p-3">{lift.isInside ? getLocalizedText("Inside") : getLocalizedText("Outside")}</TableCell>
                    <TableCell className="p-3 text-center">
                      {lift.isDivyangFriendly ? (
                        <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium w-full max-w-[80px]">
                          <span>✓</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium w-full max-w-[80px]">
                          <span>✗</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiftsInfo;
