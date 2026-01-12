import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Crown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const couples = [
  {
    id: 1,
    title: "Information Science",
    image: "https://res.cloudinary.com/dw7kk0lvp/image/upload/w_800,q_auto,f_auto/v1767904064/TZP06662_onkxps.jpg",
  },
  {
    id: 2,
    title: "Computer Engineering",
    image: "https://res.cloudinary.com/dw7kk0lvp/image/upload/w_800,q_auto,f_auto/v1767904058/TZP06672_bmrq6z.jpg",
  },
  {
    id: 3,
    title: "Electronic Engineering",
    image: "https://res.cloudinary.com/dw7kk0lvp/image/upload/w_800,q_auto,f_auto/v1767904059/TZP06688_zihg3k.jpg",
  },
  {
    id: 4,
    title: "Precision Engineering",
    image: "https://res.cloudinary.com/dw7kk0lvp/image/upload/w_800,q_auto,f_auto/v1767904060/TZP06706_et23cp.jpg",
  },
  {
    id: 5,
    title: "Advanced Material Engineering",
    image: "https://res.cloudinary.com/dw7kk0lvp/image/upload/w_800,q_auto,f_auto/v1767904060/TZP06717_kevdty.jpg",
  },
];

// Thumbnail images with smaller size
const thumbnailImages = couples.map(c => ({
  ...c,
  thumbnail: c.image.replace('w_800', 'w_200')
}));

const WelcomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % couples.length;
        setLoadedImages(prev => new Set([...prev, next]));
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  const visibleSlides = useMemo(() => {
    const prev = (currentSlide - 1 + couples.length) % couples.length;
    const next = (currentSlide + 1) % couples.length;
    return new Set([prev, currentSlide, next]);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50 relative overflow-hidden">
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-pulse">
          <Sparkles className="w-6 h-6 text-amber-400/60" />
        </div>
        <div className="absolute top-20 right-16 animate-pulse" style={{ animationDelay: '300ms' }}>
          <Heart className="w-5 h-5 text-rose-400/60" />
        </div>
        <div className="absolute bottom-32 left-8 animate-pulse" style={{ animationDelay: '500ms' }}>
          <Crown className="w-7 h-7 text-purple-400/60" />
        </div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 flex flex-col min-h-screen px-4 py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm mb-4">
            <Crown className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">School Election 2026</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-3">
            UTYCC
          </h1>
          <p className="text-gray-600 text-lg">Choose Your Representatives</p>
        </div>

        {/* Couples Gallery */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-lg mx-auto w-full">
          {/* Main Image Carousel */}
          <div className="relative w-full aspect-[4/5] max-h-[50vh] mb-6 rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
            {couples.map((couple, index) => {
              if (!visibleSlides.has(index) && !loadedImages.has(index)) {
                return null;
              }

              return (
                <div
                  key={couple.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 scale-100 z-10' 
                      : 'opacity-0 scale-105 z-0'
                  }`}
                  style={{ willChange: index === currentSlide ? 'opacity, transform' : 'auto' }}
                >
                  <img
                    src={couple.image}
                    alt={couple.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/90">
                      <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                      <span className="text-lg font-semibold">{couple.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Decorative frame */}
            <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none z-20" />
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mb-6">
            {couples.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide 
                    ? 'w-8 h-2 bg-gradient-to-r from-rose-500 to-purple-500' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 px-2 max-w-full">
            {thumbnailImages.map((couple, index) => (
              <button
                key={couple.id}
                onClick={() => handleSlideChange(index)}
                className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-2 ring-rose-500 ring-offset-2 scale-110' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={couple.thumbnail}
                  alt={couple.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
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
              Cast your vote for the King, Queen of our school. 
              Your voice matters – make it count!
            </p>
          </div>

          <Button
            onClick={() => navigate("/login")}
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