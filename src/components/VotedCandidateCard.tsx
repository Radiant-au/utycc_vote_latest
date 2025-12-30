import { Crown, Heart } from "lucide-react";

interface VotedCandidateCardProps {
  category: "King" | "Queen" | "Prince" | "Princess";
  candidateName: string;
  delay?: number;
}

const categoryIcons = {
  King: "👑",
  Queen: "👸",
  Prince: "🤴",
  Princess: "👑",
};

export const VotedCandidateCard = ({ category, candidateName, delay = 0 }: VotedCandidateCardProps) => {
  return (
    <div 
      className="gradient-card rounded-2xl p-6 gold-shadow border border-gold-light/30 hover:gold-glow transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{categoryIcons[category]}</span>
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Your {category} Vote
        </span>
      </div>
      <p className="font-display text-xl font-semibold text-foreground">
        {candidateName}
      </p>
      <div className="mt-4 flex items-center gap-2 text-gold">
        <Heart className="w-4 h-4 fill-current" />
        <span className="text-xs font-medium">Voted</span>
      </div>
    </div>
  );
};
