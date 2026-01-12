import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Selection } from "@/api";
import { optimizeCloudinaryImage } from "@/lib/imageOptimizer";

interface CandidateCardProps {
  candidate: Selection;
  category: Selection["category"];
  onSelect?: (candidate: Selection) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
}

const CandidateCard = ({ candidate, category, onSelect, isSelected, isDisabled }: CandidateCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // ✅ OPTIMIZE IMAGE: 400px width for cards
  const optimizedImage = optimizeCloudinaryImage(candidate.profileImg, 400, 'auto');

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect?.(candidate);
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/candidate/${candidate.id}?category=${category}`);
  };

  return (
    <div
      className={`bg-card rounded-2xl overflow-hidden shadow-card animate-scale-in border ${
        isSelected ? "border-primary shadow-glow" : "border-transparent"
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {/* ✅ LOADING SKELETON */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* ✅ OPTIMIZED IMAGE with lazy loading */}
        <img
          src={optimizedImage}
          alt={candidate.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ✅ ERROR FALLBACK */}
        {imageError && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-xl font-bold text-white mb-1">{candidate.name}</h3>
          {candidate.major && (
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <User className="w-3.5 h-3.5" />
              <span>{candidate.major}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <Button
          variant="outline"
          onClick={handleViewProfile}
          className="w-full h-11 text-sm font-medium border-2 hover:bg-muted"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Profile
        </Button>

        {onSelect && (
          <Button
            onClick={handleSelect}
            disabled={isDisabled}
            className={`w-full h-11 text-sm font-semibold ${
              isSelected ? "gradient-green" : "gradient-gold"
            } text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50`}
          >
            <Heart className="w-4 h-4 mr-2" />
            {isSelected ? "Selected" : "Select"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;