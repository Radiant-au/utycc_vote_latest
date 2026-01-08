import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Crown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const couples = [
  {
    id: 1,
    title: "King & Queen",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  },
  {
    id: 2,
    title: "Royal Pair",
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80",
  },
  {
    id: 3,
    title: "Dream Team",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  },
  {
    id: 4,
    title: "Perfect Match",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
  },
  {
    id: 5,
    title: "Golden Duo",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80",
  },
];

const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % couples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-pulse">
          <Sparkles className="w-6 h-6 text-amber-400/60" />
        </div>
        <div className="absolute top-20 right-16 animate-pulse delay-300">
          <Heart className="w-5 h-5 text-rose-400/60" />
        </div>
        <div className="absolute bottom-32 left-8 animate-pulse delay-500">
          <Crown className="w-7 h-7 text-purple-400/60" />
        </div>
        <div className="absolute top-1/3 right-8 animate-pulse delay-700">
          <Sparkles className="w-4 h-4 text-rose-300/60" />
        </div>
        <div className="absolute bottom-48 right-12 animate-pulse delay-1000">
          <Heart className="w-6 h-6 text-amber-300/60" />
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 flex flex-col min-h-screen px-4 py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm mb-4">
            <Crown className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">School Election 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-3">
            Royal Court
          </h1>
          <p className="text-gray-600 text-lg">Choose Your Representatives</p>
        </div>

        {/* Couples Gallery */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
          {/* Main Image Carousel */}
          <div className="relative w-full aspect-[4/5] max-h-[50vh] mb-6 rounded-3xl overflow-hidden shadow-2xl">
            {couples.map((couple, index) => (
              <div
                key={couple.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={couple.image}
                  alt={couple.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white/90">
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                    <span className="text-lg font-semibold">{couple.title}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Decorative frame */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none" />
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mb-6">
            {couples.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-2 bg-gradient-to-r from-rose-500 to-purple-500' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 px-2 max-w-full">
            {couples.map((couple, index) => (
              <button
                key={couple.id}
                onClick={() => setCurrentSlide(index)}
                className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-2 ring-rose-500 ring-offset-2 scale-110' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={couple.image}
                  alt={couple.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Welcome Message & CTA */}
        <div className="text-center mt-6 space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome to the Election! 🎉
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cast your vote for the King, Queen, Prince & Princess of our school. 
              Your voice matters – make it count!
            </p>
          </div>

          <Button
            onClick={() => navigate("/pincode-login")}
            size="lg"
            className="w-full max-w-md mx-auto bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 hover:from-rose-600 hover:via-purple-600 hover:to-amber-600 text-white font-semibold py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="flex items-center gap-2">
              Start Voting
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          <p className="text-xs text-gray-500">
            Secure • Anonymous • Fair
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
