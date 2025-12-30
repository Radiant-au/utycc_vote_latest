import { Crown, Sparkles } from "lucide-react";

export const ResultsHeader = () => {
  return (
    <div className="text-center mb-12 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-6 h-6 text-gold animate-pulse" />
          <span className="text-sm font-medium text-gold uppercase tracking-[0.2em]">
            Final Results
          </span>
          <Sparkles className="w-6 h-6 text-gold animate-pulse" />
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
          School Voting
          <span className="block text-gradient-gold">Results 2026</span>
        </h1>
        
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Crown className="w-5 h-5 text-gold" />
          <p className="text-lg">Celebrating our Royal Court</p>
          <Crown className="w-5 h-5 text-gold" />
        </div>
      </div>
    </div>
  );
};
