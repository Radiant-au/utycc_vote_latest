import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ArrowLeft, Heart, Quote, GraduationCap } from 'lucide-react';
import { getCandidateById } from '@/data/candidates';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

import 'swiper/css';
import 'swiper/css/pagination';

const CandidateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get('category');

  const candidate = getCandidateById(id || '');

  if (!candidate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Candidate not found</p>
      </div>
    );
  }

  const handleVote = () => {
    toast({
      title: 'Vote Recorded!',
      description: `You voted for ${candidate.name}`,
    });
    navigate(`/vote/${category}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Photo Gallery */}
      <div className="relative">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="aspect-[3/4] max-h-[60vh]"
        >
          {candidate.photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <img
                src={photo}
                alt={`${candidate.name} photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Photo Counter */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
          <span className="text-xs font-medium text-foreground">{candidate.photos.length} Photos</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 -mt-16 relative z-10 px-4 pb-28">
        <div className="bg-card rounded-3xl shadow-card p-6 animate-fade-in-up">
          {/* Name & Class */}
          <div className="text-center mb-6">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">{candidate.name}</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{candidate.class}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="relative bg-muted/50 rounded-2xl p-5">
            <Quote className="absolute -top-3 -left-2 w-8 h-8 text-primary/20" />
            <p className="text-foreground leading-relaxed italic">"{candidate.bio}"</p>
          </div>

          {/* Stats or badges could go here */}
          <div className="mt-6 flex justify-center gap-3">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">
                {candidate.category === 'king-queen' ? 'Senior' : 'Junior'} Candidate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Vote Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={handleVote}
            className="w-full h-14 text-lg font-bold gradient-gold text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-glow rounded-2xl"
          >
            <Heart className="w-5 h-5 mr-2" />
            Vote for {candidate.name.split(' ')[0]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;
