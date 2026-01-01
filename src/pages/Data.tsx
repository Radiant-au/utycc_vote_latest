import { ResultsHeader } from "@/components/ResultsHeader";
import { VotedCandidateCard } from "@/components/VotedCandidateCard";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { WinnerCard } from "@/components/WinnerCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Unlock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data - replace with actual data from backend
const userVotes = {
  king: "Alexander Thompson",
  queen: "Isabella Martinez",
  prince: "James Wilson",
  princess: "Sophie Anderson",
};

const votingData = {
  king: [
    { name: "Alexander Thompson", votes: 245 },
    { name: "Benjamin Carter", votes: 198 },
    { name: "Christopher Davis", votes: 156 },
    { name: "Daniel Evans", votes: 134 },
    { name: "Ethan Foster", votes: 112 },
  ],
  queen: [
    { name: "Isabella Martinez", votes: 267 },
    { name: "Olivia Johnson", votes: 212 },
    { name: "Emma Williams", votes: 178 },
    { name: "Ava Brown", votes: 145 },
    { name: "Mia Garcia", votes: 98 },
  ],
};

// Mock winners data with placeholder images
const winners = {
  king: {
    name: "Alexander Thompson",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    votes: 245,
  },
  queen: {
    name: "Isabella Martinez",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    votes: 267,
  },
};

// Set to true when admin unlocks results
const resultsUnlocked = false;

const Data = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Your Voted Candidates
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <VotedCandidateCard category="King" candidateName={userVotes.king} delay={0} />
            <VotedCandidateCard category="Queen" candidateName={userVotes.queen} delay={100} />
            {/* <VotedCandidateCard category="Prince" candidateName={userVotes.prince} delay={200} />
            <VotedCandidateCard category="Princess" candidateName={userVotes.princess} delay={300} /> */}
          </div>
        </section>

        {/* Pie Charts Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Voting Distribution
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-light to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <CategoryPieChart category="King" data={votingData.king} delay={400} />
            <CategoryPieChart category="Queen" data={votingData.queen} delay={500} />
            {/* <CategoryPieChart category="Prince" data={votingData.prince} delay={600} />
            <CategoryPieChart category="Princess" data={votingData.princess} delay={700} /> */}
          </div>
        </section>

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
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <WinnerCard 
                category="King" 
                name={winners.king.name} 
                photo={winners.king.photo} 
                votes={winners.king.votes}
                delay={800}
              />
              <WinnerCard 
                category="Queen" 
                name={winners.queen.name} 
                photo={winners.queen.photo} 
                votes={winners.queen.votes}
                delay={900}
              />
              {/* <WinnerCard 
                category="Prince" 
                name={winners.prince.name} 
                photo={winners.prince.photo} 
                votes={winners.prince.votes}
                delay={1000}
              />
              <WinnerCard 
                category="Princess" 
                name={winners.princess.name} 
                photo={winners.princess.photo} 
                votes={winners.princess.votes}
                delay={1100}
              /> */}
            </div>
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
