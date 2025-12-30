import { useNavigate } from "react-router-dom";
import { Eye, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {  Selection } from "@/api";

interface CandidateCardProps {
  candidate: Selection;
  category: Selection["category"];
  onSelect?: (candidate: Selection) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
}

const CandidateCard = ({ candidate, category, onSelect, isSelected, isDisabled }: CandidateCardProps) => {
  const navigate = useNavigate();

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
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={candidate.profileImg} alt={candidate.name} className="w-full h-full object-cover" />
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
            className={`w-full h-11 text-sm font-semibold ${isSelected ? "gradient-green" : "gradient-gold"} text-primary-foreground hover:opacity-90 transition-opacity`}
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
