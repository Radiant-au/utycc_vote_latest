import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, Crown, Sparkles, Users } from "lucide-react";
import CandidateCard from "@/components/CandidateCard";
import { Selection, submitVote, getToken, Status } from "@/api";
import { toast } from "@/hooks/use-toast";

import "swiper/css";
import "swiper/css/pagination";
import { usePinCodeStatus, useVotingStatus } from "@/hooks/useStatus";
import { useSelections } from "@/hooks/useSelections";

const VotingPage = () => {
  const { category } = useParams<{ category: Selection["category"] }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"male" | "female">("male");
  const [selectedMaleId, setSelectedMaleId] = useState<number | null>(null);
  const [selectedFemaleId, setSelectedFemaleId] = useState<number | null>(null);


  useEffect(() => {
    if (!getToken()) {
      navigate("/");
    }
  }, [navigate]);

  const { data: selections, isLoading, isError } = useSelections();
  const { data: voteStatus } = usePinCodeStatus();
  const { data: appStatus } = useVotingStatus();
  const isVotingOpen = (appStatus as Status)?.status === "OPEN";


  const categoryTitle = category === "prince-princess" ? "Prince & Princess" : "King & Queen";
  const CategoryIcon = category === "prince-princess" ? Sparkles : Crown;

  const candidates = useMemo(() => {
    if (!selections || !category) return [];
    return selections.filter((c) => c.category === category);
  }, [selections, category]);

  const maleCandidates = candidates.filter((c) => c.gender === "male");
  const femaleCandidates = candidates.filter((c) => c.gender === "female");

  const alreadyVoted = useMemo(() => {
    if (!voteStatus || !category) return false;
    return category === "king-queen" ? !!voteStatus.hasVotedSenior : !!voteStatus.hasVotedJunior;
  }, [voteStatus, category]);

  const voteMutation = useMutation({
    mutationFn: () => {
      if (!category || selectedMaleId == null || selectedFemaleId == null) {
        throw new Error("Please select one candidate for each gender.");
      }
      return submitVote(category, selectedMaleId, selectedFemaleId);
    },
    onSuccess: () => {
      toast({
        title: "Vote submitted!",
        description: "Thank you for voting. Your ballot is recorded.",
      });
      navigate("/");
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Vote failed";
      toast({
        title: "Could not submit vote",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    voteMutation.mutate();
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Invalid category.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading candidates...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <p className="text-muted-foreground">
          Unable to load candidates. Please check your connection or log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <button
            onClick={() => navigate("/categories")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CategoryIcon className="w-5 h-5 text-primary" />
              <h1 className="font-display text-xl font-bold text-foreground">{categoryTitle}</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Select one male and one female candidate, then submit your vote.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 pb-4">
          <div className="bg-muted rounded-2xl p-1 flex gap-1">
            <button
              onClick={() => setActiveTab("male")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "male" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              {category === "king-queen" ? "Kings" : "Princes"}
            </button>
            <button
              onClick={() => setActiveTab("female")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "female" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              {category === "king-queen" ? "Queens" : "Princesses"}
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
          onSlideChange={(swiper) => setActiveTab(swiper.activeIndex === 0 ? "male" : "female")}
          initialSlide={activeTab === "male" ? 0 : 1}
          key={activeTab}
        >
          {/* Male Candidates */}
          <SwiperSlide>
            <div className="h-full overflow-y-auto px-4 pb-8">
              <div className="grid grid-cols-2 gap-4 pt-4">
                {maleCandidates.map((candidate, index) => (
                  <div key={candidate.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <CandidateCard
                      candidate={candidate}
                      category={category}
                      onSelect={(c) => setSelectedMaleId(c.id)}
                      isSelected={selectedMaleId === candidate.id}
                      isDisabled={selectedMaleId !== null && selectedMaleId !== candidate.id}
                    />
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
                  <div key={candidate.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <CandidateCard
                      candidate={candidate}
                      category={category}
                      onSelect={(c) => setSelectedFemaleId(c.id)}
                      isSelected={selectedFemaleId === candidate.id}
                      isDisabled={selectedFemaleId !== null && selectedFemaleId !== candidate.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Submit bar */}
      <div className="py-3 px-4 bg-muted/50 border-t border-border">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {alreadyVoted
              ? "You have already voted in this category."
              : selectedMaleId && selectedFemaleId
              ? "Ready to submit your vote."
              : "Pick one male and one female candidate to enable voting."}
          </div>
          <button
            onClick={handleSubmit}
            disabled={
              !isVotingOpen ||
              voteMutation.isPending ||
              alreadyVoted ||
              selectedMaleId == null ||
              selectedFemaleId == null
            }
            className="w-full sm:w-auto px-6 py-3 rounded-2xl text-sm font-semibold gradient-gold text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
          >
            {!isVotingOpen
              ? "Voting Not Open"
              : alreadyVoted
              ? "Already Voted"
              : voteMutation.isPending
              ? "Submitting..."
              : "Submit Vote"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
