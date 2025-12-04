import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ArrowLeft, Crown, Sparkles, Users } from 'lucide-react';
import { getCandidatesByCategory } from '@/data/candidates';
import CandidateCard from '@/components/CandidateCard';

import 'swiper/css';
import 'swiper/css/pagination';

const VotingPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'male' | 'female'>('male');

  const candidates = useMemo(() => {
    return getCandidatesByCategory(category as 'king-queen' | 'prince-princess');
  }, [category]);

  const maleCandidates = candidates.filter((c) => c.gender === 'male');
  const femaleCandidates = candidates.filter((c) => c.gender === 'female');

  const categoryTitle = category === 'king-queen' ? 'King & Queen' : 'Prince & Princess';
  const CategoryIcon = category === 'king-queen' ? Crown : Sparkles;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => navigate('/categories')}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CategoryIcon className="w-5 h-5 text-primary" />
              <h1 className="font-display text-xl font-bold text-foreground">{categoryTitle}</h1>
            </div>
            <p className="text-sm text-muted-foreground">Select your candidate</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pb-4">
          <div className="bg-muted rounded-2xl p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('male')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'male'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              <Users className="w-4 h-4" />
              {category === 'king-queen' ? 'Kings' : 'Princes'}
            </button>
            <button
              onClick={() => setActiveTab('female')}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'female'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              <Users className="w-4 h-4" />
              {category === 'king-queen' ? 'Queens' : 'Princesses'}
            </button>
          </div>
        </div>
      </header>

      {/* Swipeable Content */}
      <div className="flex-1 overflow-hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="h-full"
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex === 0 ? 'male' : 'female')}
          initialSlide={activeTab === 'male' ? 0 : 1}
          key={activeTab} // Force re-render when tab changes
        >
          {/* Male Candidates */}
          <SwiperSlide>
            <div className="h-full overflow-y-auto px-4 pb-8">
              <div className="grid grid-cols-2 gap-4 pt-4">
                {maleCandidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CandidateCard candidate={candidate} category={category || ''} />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>

          {/* Female Candidates */}
          <SwiperSlide>
            <div className="h-full overflow-y-auto px-4 pb-8">
              <div className="grid grid-cols-2 gap-4 pt-4">
                {femaleCandidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CandidateCard candidate={candidate} category={category || ''} />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Swipe Hint */}
      <div className="py-3 text-center bg-muted/50">
        <p className="text-xs text-muted-foreground">← Swipe to switch tabs →</p>
      </div>
    </div>
  );
};

export default VotingPage;
