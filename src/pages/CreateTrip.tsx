import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { 
  MapPin, CalendarDays, Wallet, Heart, Compass, 
  ArrowLeft, ArrowRight, Sparkles, Mountain, 
  Utensils, TreePine, ShoppingBag, Palmtree, 
  Zap, Soup
} from "lucide-react";
import { cn } from "@/lib/utils";

const interests = [
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "culture", label: "Culture", icon: Compass },
  { id: "food", label: "Food", icon: Utensils },
  { id: "nature", label: "Nature", icon: TreePine },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
];

const vibes = [
  { id: "chill", label: "Chill", emoji: "🌴", icon: Palmtree },
  { id: "explorer", label: "Explorer", emoji: "🧭", icon: Compass },
  { id: "adventure", label: "Adventure", emoji: "⚡", icon: Zap },
  { id: "foodie", label: "Foodie", emoji: "🍜", icon: Soup },
];

const CreateTrip = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [budget, setBudget] = useState([50]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedVibe, setSelectedVibe] = useState("");

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getBudgetLabel = () => {
    if (budget[0] < 33) return "Budget-Friendly";
    if (budget[0] < 66) return "Moderate";
    return "Luxury";
  };

  const canProceed = () => {
    if (step === 1) return destination.length > 0 && dateRange?.from && dateRange?.to;
    if (step === 2) return selectedInterests.length > 0;
    if (step === 3) return selectedVibe.length > 0;
    return false;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/loading');
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">TripVibe</span>
          </div>
          <div className="w-20" />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                s === step ? "w-8 bg-primary" : s < step ? "w-8 bg-primary/50" : "w-8 bg-muted"
              )}
            />
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">Step {step} of 3</p>
      </div>

      {/* Step Content */}
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Step 1: Destination & Dates */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Where to?</h2>
              <p className="text-muted-foreground">Tell us your destination and travel dates</p>
            </div>

            <Card className="p-6 rounded-2xl border-border/50 shadow-sm">
              <div className="space-y-6">
                {/* Destination */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    Destination
                  </label>
                  <Input
                    placeholder="Search for a city or country..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="rounded-xl h-12 border-border/50 focus:border-primary"
                  />
                </div>

                {/* Date Range */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    Travel Dates
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12 rounded-xl border-border/50",
                          !dateRange?.from && "text-muted-foreground"
                        )}
                      >
                        {dateRange?.from ? (
                          dateRange?.to ? (
                            <>
                              {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM d, yyyy")
                          )
                        ) : (
                          "Select your travel dates"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Budget */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                    <Wallet className="w-4 h-4 text-primary" />
                    Budget
                  </label>
                  <div className="px-2">
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>Low</span>
                      <span className="font-medium text-primary">{getBudgetLabel()}</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">What interests you?</h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {interests.map((interest) => {
                const Icon = interest.icon;
                const isSelected = selectedInterests.includes(interest.id);
                return (
                  <Card
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={cn(
                      "p-6 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md",
                      isSelected 
                        ? "bg-primary/10 border-primary/30 shadow-sm" 
                        : "border-border/50 hover:border-primary/20"
                    )}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={cn(
                        "p-3 rounded-xl transition-colors",
                        isSelected ? "bg-primary/20" : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "w-6 h-6",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <span className={cn(
                        "font-medium text-sm",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {interest.label}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Vibe */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">What's your travel vibe?</h2>
              <p className="text-muted-foreground">This helps us craft the perfect itinerary</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {vibes.map((vibe) => {
                const Icon = vibe.icon;
                const isSelected = selectedVibe === vibe.id;
                return (
                  <Card
                    key={vibe.id}
                    onClick={() => setSelectedVibe(vibe.id)}
                    className={cn(
                      "p-6 rounded-2xl cursor-pointer transition-all duration-200 hover:shadow-md",
                      isSelected 
                        ? "bg-primary/10 border-primary/30 shadow-sm" 
                        : "border-border/50 hover:border-primary/20"
                    )}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-3xl">{vibe.emoji}</span>
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        isSelected ? "bg-primary/20" : "bg-muted"
                      )}>
                        <Icon className={cn(
                          "w-5 h-5",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                      <span className={cn(
                        "font-medium",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {vibe.label}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="mt-8 pb-8">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-14 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            {step === 3 ? (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Itinerary
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
