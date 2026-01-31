import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

const loadingMessages = [
  "Understanding your travel vibe…",
  "Discovering hidden gems…",
  "Optimizing routes…",
  "Balancing budget and time…",
  "Crafting your perfect itinerary…",
];

const Loading = () => {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    // Navigate after loading
    const timeout = setTimeout(() => {
      navigate('/itinerary');
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-6 max-w-md">
        {/* Animated Map SVG */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background circle */}
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              fill="none" 
              stroke="hsl(var(--muted))" 
              strokeWidth="2"
            />
            
            {/* Animated path */}
            <path
              d="M 40 100 Q 70 60, 100 80 T 160 100 Q 140 140, 100 120 T 40 100"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="500"
              className="animate-draw-line"
            />
            
            {/* Location pins */}
            <g className="animate-pulse-soft">
              <circle cx="60" cy="85" r="8" fill="hsl(var(--primary))" />
              <circle cx="60" cy="85" r="4" fill="hsl(var(--primary-foreground))" />
            </g>
            <g className="animate-pulse-soft" style={{ animationDelay: '0.5s' }}>
              <circle cx="100" cy="100" r="8" fill="hsl(var(--teal))" />
              <circle cx="100" cy="100" r="4" fill="hsl(var(--primary-foreground))" />
            </g>
            <g className="animate-pulse-soft" style={{ animationDelay: '1s' }}>
              <circle cx="145" cy="95" r="8" fill="hsl(var(--ocean))" />
              <circle cx="145" cy="95" r="4" fill="hsl(var(--primary-foreground))" />
            </g>
          </svg>

          {/* Center compass */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 rounded-full bg-card shadow-lg">
              <Compass className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>

        {/* Loading message */}
        <p className="text-xl font-medium text-foreground mb-4 h-8 transition-all duration-300">
          {loadingMessages[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Reassuring text */}
        <p className="text-sm text-muted-foreground mt-6">
          Our AI is working its magic ✨
        </p>
      </div>
    </div>
  );
};

export default Loading;
