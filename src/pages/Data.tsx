import { ResultsHeader } from "@/components/ResultsHeader";
import { VotedCandidateCard } from "@/components/VotedCandidateCard";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { WinnerCard } from "@/components/WinnerCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Unlock, Loader2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSeniorVoteCounts, useUserSVotes, useWinners } from "@/hooks/useVoteCounts";
import { useWinnerStatus } from "@/hooks/useStatus";
import { useEffect } from "react";

const Data = () => {
  const navigate = useNavigate();
  const { data: KQVotes, isLoading: isLoadingVotes, error: votesError } = useSeniorVoteCounts();
  const { data: winnerStatus, isLoading: isLoadingStatus } = useWinnerStatus();
  const { data: userVotes, isLoading: isLoadingUserVotes, error: userVotesError } = useUserSVotes();
  const { data: winners, refetch: refetchWinners, isLoading: isLoadingWinners, error: winnersError } = useWinners();

  const resultsUnlocked = winnerStatus?.status === 'OPEN';

  // Fetch winners when unlocked
  useEffect(() => {
    if (resultsUnlocked) {
      refetchWinners();
    }
  }, [resultsUnlocked, refetchWinners]);

  const handleBack = () => {
    navigate(-1);
  };

  // Transform for pie charts
  const votingData = {
    king: KQVotes?.maleVotes.map(v => ({
      name: v.selectionName,
      votes: v.voteCount
    })) || [],
    queen: KQVotes?.femaleVotes.map(v => ({
      name: v.selectionName,
      votes: v.voteCount
    })) || [],
  };

  // Loading state
  if (isLoadingVotes || isLoadingStatus || isLoadingUserVotes) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-gold mx-auto mb-4" />
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (votesError || userVotesError) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Failed to Load Results
          </h2>
          <p className="text-muted-foreground mb-6">
            {votesError?.message || userVotesError?.message || "Something went wrong. Please try again."}
          </p>
          <Button onClick={() => window.location.reload()} variant="default">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <ResultsHeader />

        {/* Your Voted Candidates Section */}
        {userVotes && (userVotes.maleName || userVotes.femaleName) && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Your Voted Candidates
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {userVotes.maleName && (
                <VotedCandidateCard
                  category="King"
                  candidateName={userVotes.maleName}
                  delay={0}
                />
              )}
              {userVotes.femaleName && (
                <VotedCandidateCard
                  category="Queen"
                  candidateName={userVotes.femaleName}
                  delay={100}
                />
              )}
            </div>
          </section>
        )}

        {/* No votes yet message */}
        {userVotes && !userVotes.maleName && !userVotes.femaleName && (
          <section className="mb-16">
            <div className="gradient-card rounded-2xl p-8 gold-shadow border border-gold-light/30 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No Votes Yet
              </h3>
              <p className="text-muted-foreground">
                You haven't cast your vote yet. Go to the voting page to select your candidates.
              </p>
              <Button 
                onClick={() => navigate('/vote')} 
                className="mt-4"
                variant="default"
              >
                Vote Now
              </Button>
            </div>
          </section>
        )}

        {/* Pie Charts Section */}
        {KQVotes && (votingData.king.length > 0 || votingData.queen.length > 0) && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Voting Distribution
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {votingData.king.length > 0 && (
                <CategoryPieChart category="King" data={votingData.king} delay={400} />
              )}
              {votingData.queen.length > 0 && (
                <CategoryPieChart category="Queen" data={votingData.queen} delay={500} />
              )}
            </div>
          </section>
        )}

        {/* No voting data yet */}
        {KQVotes && votingData.king.length === 0 && votingData.queen.length === 0 && (
          <section className="mb-16">
            <div className="gradient-card rounded-2xl p-8 gold-shadow border border-gold-light/30 text-center">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No Votes Recorded Yet
              </h3>
              <p className="text-muted-foreground">
                Voting data will appear here once votes start coming in.
              </p>
            </div>
          </section>
        )}

        {/* Winners Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
            <h2 className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
              {resultsUnlocked ? (
                <>
                  <Unlock className="w-5 h-5 text-gold" />
                  Final Winners
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 text-muted-foreground" />
                  Winners (Locked)
                </>
              )}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
          </div>

          {resultsUnlocked ? (
            <>
              {isLoadingWinners ? (
                <div className="gradient-card rounded-2xl p-12 gold-shadow border border-gold-light/30 text-center">
                  <Loader2 className="w-12 h-12 animate-spin text-gold mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading winners...</p>
                </div>
              ) : winnersError ? (
                <div className="gradient-card rounded-2xl p-12 gold-shadow border border-gold-light/30 text-center">
                  <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                  <p className="text-muted-foreground">Failed to load winners. Please try again.</p>
                </div>
              ) : winners?.maleWinner && winners?.femaleWinner ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  <WinnerCard
                    category="King"
                    name={winners.maleWinner.selectionName}
                    photo={winners.maleWinner.profileImg || '/default-avatar.jpg'}
                    votes={winners.maleWinner.voteCount}
                    delay={800}
                  />
                  <WinnerCard
                    category="Queen"
                    name={winners.femaleWinner.selectionName}
                    photo={winners.femaleWinner.profileImg || '/default-avatar.jpg'}
                    votes={winners.femaleWinner.voteCount}
                    delay={900}
                  />
                </div>
              ) : (
                <div className="gradient-card rounded-2xl p-12 gold-shadow border border-gold-light/30 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No winners data available yet.</p>
                </div>
              )}
            </>
          ) : (
            <div className="gradient-card rounded-2xl p-12 gold-shadow border border-gold-light/30 text-center">
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Results Not Yet Available
              </h3>
              <p className="text-muted-foreground">
                The final winners will be revealed once the admin unlocks the results.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-gold-light to-transparent mb-6" />
          <p className="text-sm text-muted-foreground">
            School Voting System 2024 • Made with ✨ and 💛
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Data;