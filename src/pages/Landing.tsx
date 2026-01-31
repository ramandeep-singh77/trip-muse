import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";
import { MapPin, Compass, Plane } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
            <div className="p-3 rounded-full bg-primary/10 backdrop-blur-sm">
              <Compass className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-semibold text-foreground">TripVibe</span>
          </div>

          {/* Decorative Icons */}
          <div className="flex justify-center gap-6 mb-8 opacity-60">
            <MapPin className="w-5 h-5 text-teal animate-pulse-soft" />
            <Plane className="w-5 h-5 text-ocean" style={{ animationDelay: '0.5s' }} />
            <MapPin className="w-5 h-5 text-teal animate-pulse-soft" style={{ animationDelay: '1s' }} />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Plan your perfect trip
            <br />
            <span className="text-primary">in minutes</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            AI-powered itinerary planning based on your vibe.
            <br className="hidden md:block" />
            No clutter, no stress — just your perfect adventure.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              onClick={() => navigate('/create')}
              className="px-8 py-6 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              Create My Trip
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/sample')}
              className="px-8 py-6 text-lg rounded-2xl border-2 hover:bg-accent transition-all"
            >
              View Sample Itinerary
            </Button>
          </div>

          {/* Trust Indicator */}
          <p className="mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.8s' }}>
            ✨ Free to use • No account required • Powered by AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
