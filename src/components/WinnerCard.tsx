import { Trophy, Star } from "lucide-react";

interface WinnerCardProps {
  category: "King" | "Queen" | "Prince" | "Princess" | "PopularMale" | "PopularFemale";
  name: string;
  photo: string;
  votes: number;
  teacher_score?: number;
  commitee_score?: number;
  delay?: number;
}

const categoryEmoji: Record<WinnerCardProps["category"], string> = {
  King: "👑",
  Queen: "👸",
  Prince: "🤴",
  Princess: "👑",
  PopularMale: "🌟",
  PopularFemale: "⭐",
};

const categoryLabel: Record<WinnerCardProps["category"], string> = {
  King: "King",
  Queen: "Queen",
  Prince: "Prince",
  Princess: "Princess",
  PopularMale: "Popular King",
  PopularFemale: "Popular Queen",
};

export const WinnerCard = ({ category, name, photo, votes, teacher_score, commitee_score, delay = 0 }: WinnerCardProps) => {
  return (
    <div 
      className="relative overflow-hidden rounded-xl sm:rounded-2xl gold-shadow border border-gold-light/30 bg-card hover:gold-glow transition-all duration-500 hover:-translate-y-1 group opacity-0 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer pointer-events-none z-10 opacity-50" />
      
      {/* Content */}
      <div className="relative z-20 p-3 sm:p-6">
        {/* Category badge - responsive */}
        <div className="flex items-center justify-center gap-1 bg-gold/20 backdrop-blur-sm px-2 py-1 sm:px-3 rounded-full mb-3 sm:mb-4 w-fit mx-auto">
          <span className="text-sm sm:text-lg">{categoryEmoji[category]}</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gold-dark uppercase tracking-wider">
            {categoryLabel[category]}
          </span>
        </div>

        {/* Photo container - responsive */}
        <div className="relative mx-auto w-16 h-16 sm:w-28 md:w-32 sm:h-28 md:h-32 mb-3 sm:mb-4">
          <div className="absolute inset-[-3px] sm:inset-[-4px] rounded-full gradient-gold opacity-60" />
          <img
            src={photo}
            alt={name}
            className="relative w-full h-full object-cover rounded-full border-2 sm:border-4 border-gold-light"
          />
          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-10 sm:h-10 bg-gold rounded-full flex items-center justify-center gold-shadow">
            <Trophy className="w-3 h-3 sm:w-5 sm:h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Name - responsive */}
        <h3 className="font-display text-sm sm:text-xl md:text-2xl font-bold text-center text-foreground mb-1 sm:mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Winner label - responsive */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gold fill-gold" />
          <span className="text-[10px] sm:text-sm font-semibold text-gold uppercase tracking-wider">
            Winner
          </span>
          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-gold fill-gold" />
        </div>

        {/* Votes count - responsive and stacked on mobile */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-2 justify-center items-center">
          <span className="inline-flex items-center gap-1 sm:gap-2 bg-gold/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">  
            <span className="text-[10px] sm:text-sm text-muted-foreground">Votes:</span>
            <span className="text-xs sm:text-base font-bold text-gold">{votes}</span>
          </span>
          {teacher_score && (
            <span className="inline-flex items-center gap-1 sm:gap-2 bg-gold/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <span className="text-[10px] sm:text-sm text-muted-foreground">Teacher:</span>
              <span className="text-xs sm:text-base font-bold text-gold">{teacher_score} %</span>
            </span>
          )}
          {commitee_score && (
            <span className="inline-flex items-center gap-1 sm:gap-2 bg-gold/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <span className="text-[10px] sm:text-sm text-muted-foreground">Committee:</span>
              <span className="text-xs sm:text-base font-bold text-gold">{commitee_score} %</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};