
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Route, Compass, Home, Menu } from "lucide-react";
import { useMetro } from "@/contexts/MetroContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function AppNavbar() {
  const { getLocalizedText } = useMetro();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  const handleLanguageClick = () => {
    toast.info("Hindi language support coming soon! 🚧", {
      description: "We're working on adding Hindi language support.",
      duration: 3000,
    });
  };
  
  return (
    <div className="flex flex-col">
      {/* Top navbar */}
      <div className="flex items-center justify-between p-4 bg-metro-orange text-white">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2">
            <rect x="4" y="3" width="16" height="16" rx="2" />
            <path d="M4 11h16" />
            <path d="M12 3v8" />
            <path d="M8 19h8" />
          </svg>
          <h1 className="text-lg font-bold">{getLocalizedText("Welcome to Kanpur Metro")}</h1>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={handleLanguageClick}
            className="text-sm font-medium px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            EN
          </button>
        </div>
      </div>
      
      {/* Bottom navbar - simplified and more mobile responsive */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center z-10 py-2 shadow-lg">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center py-1 px-3 rounded-lg transition-all duration-200",
            isActive('/') 
              ? "bg-metro-orange/10" 
              : "hover:bg-gray-100"
          )}
        >
          <Home 
            className={cn(
              "h-6 w-6 transition-colors",
              isActive('/') ? "text-metro-orange" : "text-gray-500"
            )} 
          />
          <span 
            className={cn(
              "text-xs mt-1 font-medium transition-colors",
              isActive('/') ? "text-metro-orange" : "text-gray-500"
            )}
          >
            {getLocalizedText("Home")}
          </span>
        </Link>
        
        <Link 
          to="/journey" 
          className={cn(
            "flex flex-col items-center py-1 px-3 rounded-lg transition-all duration-200",
            isActive('/journey') 
              ? "bg-metro-orange/10" 
              : "hover:bg-gray-100"
          )}
        >
          <Route 
            className={cn(
              "h-6 w-6 transition-colors",
              isActive('/journey') ? "text-metro-orange" : "text-gray-500"
            )} 
          />
          <span 
            className={cn(
              "text-xs mt-1 font-medium transition-colors",
              isActive('/journey') ? "text-metro-orange" : "text-gray-500"
            )}
          >
            {getLocalizedText("Plan Journey")}
          </span>
        </Link>
        
        <Link 
          to="/stations" 
          className={cn(
            "flex flex-col items-center py-1 px-3 rounded-lg transition-all duration-200",
            isActive('/stations') || isActive('/map') || isActive('/info')
              ? "bg-metro-orange/10" 
              : "hover:bg-gray-100"
          )}
        >
          <Compass 
            className={cn(
              "h-6 w-6 transition-colors",
              isActive('/stations') || isActive('/map') || isActive('/info') ? "text-metro-orange" : "text-gray-500"
            )} 
          />
          <span 
            className={cn(
              "text-xs mt-1 font-medium transition-colors",
              isActive('/stations') || isActive('/map') || isActive('/info') ? "text-metro-orange" : "text-gray-500"
            )}
          >
            {getLocalizedText("Station Info")}
          </span>
        </Link>
        
        <Link 
          to="/more" 
          className={cn(
            "flex flex-col items-center py-1 px-3 rounded-lg transition-all duration-200",
            isActive('/more') || isActive('/about') || isActive('/fare-')
              ? "bg-metro-orange/10" 
              : "hover:bg-gray-100"
          )}
        >
          <Menu 
            className={cn(
              "h-6 w-6 transition-colors",
              isActive('/more') || isActive('/about') || isActive('/fare-') ? "text-metro-orange" : "text-gray-500"
            )} 
          />
          <span 
            className={cn(
              "text-xs mt-1 font-medium transition-colors",
              isActive('/more') || isActive('/about') || isActive('/fare-') ? "text-metro-orange" : "text-gray-500"
            )}
          >
            {getLocalizedText("More")}
          </span>
        </Link>
      </div>
    </div>
  );
}
