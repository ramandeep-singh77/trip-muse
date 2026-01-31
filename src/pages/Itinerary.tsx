import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MapPin, Clock, Utensils, Camera, Bus, 
  Compass, RefreshCw, Settings, Download, Share2,
  Map, ChevronRight, Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import BudgetBreakdown from "@/components/BudgetBreakdown";
import BottomNav from "@/components/BottomNav";

const sampleItinerary = {
  destination: "Bali, Indonesia",
  dates: "Mar 15 - Mar 20, 2024",
  days: [
    {
      day: 1,
      date: "Mar 15",
      title: "Arrival & Ubud Vibes",
      activities: [
        { time: "10:00 AM", place: "Ngurah Rai Airport", description: "Arrival & private transfer to Ubud", icon: "travel" },
        { time: "1:00 PM", place: "Locavore", description: "Farm-to-table lunch experience", icon: "food" },
        { time: "3:00 PM", place: "Tegallalang Rice Terraces", description: "Iconic green terraces with swing", icon: "sightseeing" },
        { time: "6:00 PM", place: "Ubud Palace", description: "Traditional Balinese dance performance", icon: "sightseeing" },
      ],
    },
    {
      day: 2,
      date: "Mar 16",
      title: "Temple & Waterfall Day",
      activities: [
        { time: "6:00 AM", place: "Tirta Empul Temple", description: "Sacred water purification ceremony", icon: "sightseeing" },
        { time: "10:00 AM", place: "Tegenungan Waterfall", description: "Refreshing swim in jungle waterfall", icon: "sightseeing" },
        { time: "1:00 PM", place: "Bebek Bengil", description: "Famous crispy duck restaurant", icon: "food" },
        { time: "4:00 PM", place: "Monkey Forest", description: "Walk through ancient temple forest", icon: "sightseeing" },
      ],
    },
    {
      day: 3,
      date: "Mar 17",
      title: "Beach Day in Seminyak",
      activities: [
        { time: "9:00 AM", place: "Transfer to Seminyak", description: "1-hour scenic drive to coast", icon: "travel" },
        { time: "11:00 AM", place: "Ku De Ta Beach Club", description: "Beach lounging & cocktails", icon: "food" },
        { time: "2:00 PM", place: "Seminyak Beach", description: "Surfing lesson for beginners", icon: "sightseeing" },
        { time: "6:00 PM", place: "La Lucciola", description: "Sunset dinner on the beach", icon: "food" },
      ],
    },
  ],
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "food": return Utensils;
    case "travel": return Bus;
    case "sightseeing": return Camera;
    default: return MapPin;
  }
};

const Itinerary = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'map' | 'budget'>('itinerary');

  const currentDayData = sampleItinerary.days.find(d => d.day === selectedDay);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">TripVibe</span>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Trip Header */}
      <div className="bg-gradient-to-b from-sky/30 to-background">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-1">{sampleItinerary.destination}</h1>
            <p className="text-muted-foreground">{sampleItinerary.dates}</p>
          </div>

          {/* Tab Switcher for Mobile */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {(['itinerary', 'map', 'budget'] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="rounded-full capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Day Selector - Desktop Sidebar */}
          <div className="hidden lg:block lg:w-48 shrink-0">
            <div className="sticky top-24 space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Days</h3>
              {sampleItinerary.days.map((day) => (
                <Card
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={cn(
                    "p-4 cursor-pointer transition-all rounded-xl",
                    selectedDay === day.day 
                      ? "bg-primary/10 border-primary/30" 
                      : "hover:bg-muted/50 border-border/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn(
                        "font-semibold",
                        selectedDay === day.day ? "text-primary" : "text-foreground"
                      )}>
                        Day {day.day}
                      </p>
                      <p className="text-sm text-muted-foreground">{day.date}</p>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 transition-transform",
                      selectedDay === day.day ? "text-primary translate-x-1" : "text-muted-foreground"
                    )} />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Mobile Day Selector */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {sampleItinerary.days.map((day) => (
              <Button
                key={day.day}
                variant={selectedDay === day.day ? "default" : "outline"}
                onClick={() => setSelectedDay(day.day)}
                className="rounded-full shrink-0"
              >
                Day {day.day}
              </Button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-2xl">
            {(activeTab === 'itinerary' || window.innerWidth >= 1024) && (
              <>
                {/* Day Title */}
                {currentDayData && (
                  <div className="mb-6 animate-fade-in">
                    <h2 className="text-xl font-bold text-foreground">{currentDayData.title}</h2>
                    <p className="text-muted-foreground">Day {currentDayData.day} • {currentDayData.date}</p>
                  </div>
                )}

                {/* Activities */}
                <div className="space-y-4">
                  {currentDayData?.activities.map((activity, index) => {
                    const Icon = getActivityIcon(activity.icon);
                    return (
                      <Card 
                        key={index} 
                        className="p-4 rounded-2xl border-border/50 hover:shadow-md transition-all animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex gap-4">
                          <div className="shrink-0">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              activity.icon === "food" ? "bg-orange-100 text-orange-600" :
                              activity.icon === "travel" ? "bg-blue-100 text-blue-600" :
                              "bg-primary/10 text-primary"
                            )}>
                              <Icon className="w-5 h-5" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <Clock className="w-3 h-3" />
                              {activity.time}
                            </div>
                            <h3 className="font-semibold text-foreground">{activity.place}</h3>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate Day
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Preferences
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </>
            )}

            {/* Mobile Map View */}
            {activeTab === 'map' && (
              <div className="lg:hidden animate-fade-in">
                <Card className="rounded-2xl overflow-hidden border-border/50">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <Map className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Interactive map view</p>
                      <p className="text-sm text-muted-foreground/70">Coming soon</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Mobile Budget View */}
            {activeTab === 'budget' && (
              <div className="lg:hidden animate-fade-in">
                <BudgetBreakdown />
              </div>
            )}
          </div>

          {/* Desktop Right Sidebar */}
          <div className="hidden lg:block lg:w-80 shrink-0 space-y-6">
            {/* Map Card */}
            <Card className="rounded-2xl overflow-hidden border-border/50">
              <div className="p-4 border-b border-border/50 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Route Map</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                  className="text-primary"
                >
                  {showMap ? "Hide" : "Show"}
                </Button>
              </div>
              {showMap && (
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Map integration</p>
                    <p className="text-xs text-muted-foreground/70">Coming soon</p>
                  </div>
                </div>
              )}
            </Card>

            {/* Budget Breakdown */}
            <BudgetBreakdown />
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile */}
      <BottomNav />
    </div>
  );
};

export default Itinerary;
