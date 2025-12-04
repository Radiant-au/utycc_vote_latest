import { useNavigate } from 'react-router-dom';
import { Candidate } from '@/data/candidates';
import { User, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface CandidateCardProps {
  candidate: Candidate;
  category: string;
}

const CandidateCard = ({ candidate, category }: CandidateCardProps) => {
  const navigate = useNavigate();

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: 'Vote Recorded!',
      description: `You voted for ${candidate.name}`,
    });
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/candidate/${candidate.id}?category=${category}`);
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card animate-scale-in">
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={candidate.mainPhoto}
          alt={candidate.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-xl font-bold text-white mb-1">{candidate.name}</h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <User className="w-3.5 h-3.5" />
            <span>{candidate.class}</span>
          </div>
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
        
        <Button
          onClick={handleVote}
          className="w-full h-11 text-sm font-semibold gradient-gold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Heart className="w-4 h-4 mr-2" />
          Vote
        </Button>
      </div>
    </div>
  );
};

export default CandidateCard;
