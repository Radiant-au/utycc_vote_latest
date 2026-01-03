import { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, GraduationCap, Quote } from "lucide-react";
import { getToken, Selection } from "@/api";
import { useSelections } from "@/hooks/useSelections";

import "swiper/css";
import "swiper/css/pagination";

const CandidateProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") as Selection["category"] | null;

  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, [navigate]);

  const { data: selections } = useSelections();

  const candidate = useMemo(() => {
    const candidateId = id ? Number(id) : null;
    if (!selections || !candidateId) return null;
    return selections.find((s) => s.id === candidateId);
  }, [id, selections]);

  // Combine profile image with additional images
  const allImages = useMemo(() => {
    if (!candidate) return [];
    const images = [candidate.profileImg];
    if (candidate.images && candidate.images.length > 0) {
      images.push(...candidate.images);
    }
    return images.filter(Boolean) as string[];
  }, [candidate]);

  if (!candidate) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Candidate not found</p>
      </div>
    );
  }

  const handleBack = () => {
    console.log("Back button clicked", { id, category, candidate });
    if (category) {
      navigate(`/vote/${category}`);
      return;
    }
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Photo Gallery */}
      <div className="relative">
        <Swiper 
          modules={[Pagination]} 
          pagination={{ clickable: true }} 
          className="aspect-[3/4] max-h-[60vh]"
          loop={allImages.length > 1}
        >
          {allImages.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img 
                src={imageUrl} 
                alt={`${candidate.name} - Photo ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Photo Counter */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm">
          <span className="text-xs font-medium text-foreground">
            {allImages.length > 1 ? `${allImages.length} Photos` : 'Profile'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 -mt-16 relative z-10 px-4 pb-28">
        <div className="bg-card rounded-3xl shadow-card p-6 animate-fade-in-up">
          {/* Name & Class */}
          <div className="text-center mb-6">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">{candidate.name}</h1>
            {candidate.major && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{candidate.major}</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {candidate.description && (
            <div className="relative bg-muted/50 rounded-2xl p-5">
              <Quote className="absolute -top-3 -left-2 w-8 h-8 text-primary/20" />
              <p className="text-foreground leading-relaxed italic">"{candidate.description}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;