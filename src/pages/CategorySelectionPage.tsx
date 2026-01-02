import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Crown,
  Sparkles,
  LogOut,
  ChevronRight,
  Lollipop,
  Notebook,
} from "lucide-react";
import { getToken } from "@/api";
import { useVotingStatus } from "@/hooks/useStatus";
import { useAuthContext } from "@/context/AuthContext";

const CategorySelectionPage = () => {
  const navigate = useNavigate();
  const { data: votingStatus } = useVotingStatus();
  const { logout } = useAuthContext();
  const isVotingOpen = votingStatus?.status === "OPEN";

  useEffect(() => {
    if (!getToken()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const categories = [
    {
      id: "king-queen",
      title: "King & Queen",
      subtitle: "Senior Royalty",
      description: "Vote for king&queen",
      icon: Crown,
      gradient: "gradient-gold",
      delay: "0ms",
    },
    // {
    //   id: "prince-princess",
    //   title: "Prince & Princess",
    //   subtitle: "Junior Royalty",
    //   description: "Vote for prince&princess",
    //   icon: Sparkles,
    //   gradient: "gradient-purple",
    //   delay: "100ms",
    // },
    {
      id: "data",
      title: "Check Data",
      subtitle: "The overview of votes",
      description: "Check for winner",
      icon: Notebook,
      gradient: "gradient-coral",
      delay: "100ms",
    },
    {
      id: "foodie",
      title: "Foodie Cupon",
      subtitle: "Pay with this QR Code",
      description: "Go to the event shop and buy anything",
      icon: Lollipop,
      gradient: "gradient-teal",
      delay: "100ms",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-8">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-48 h-48 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center pt-8 pb-10 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-between w-full items-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-gold shadow-glow">
                <Crown className="w-8 h-8 text-primary-foreground" />
              </div>
              <button
                className="group relative px-6 py-3 rounded-lg font-medium text-slate-900 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 hover:from-amber-300 hover:via-yellow-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
                onClick={() => {
                  logout();
                  navigate("/", { replace: true });
                }}
              >
                <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Logout</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Choose Your Vote
          </h1>
          <p className="text-muted-foreground">
            Select a category to cast your ballot
          </p>
        </div>

        <div
          className="mb-5 text-center animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
            <div
              className={`w-2 h-2 rounded-full ${
                isVotingOpen ? "bg-green-500" : "bg-red-500"
              } animate-pulse`}
            />
            <span
              className={`${
                isVotingOpen ? "text-green-500" : "text-red-500"
              } animate-pulse font-bold`}
            >
              {isVotingOpen ? "Voting is open" : "Voting is Closed"}
            </span>
          </div>
        </div>

        {/* Category Cards */}
        <div className="space-y-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const handleClick = () => {
              if (
                category.id === "king-queen" ||
                category.id === "prince-princess"
              ) {
                navigate(`/vote/${category.id}`);
              } else if (category.id === "data") {
                navigate("/data");
              } else if (category.id === "foodie") {
                navigate("/foodie");
              }
            };
            return (
              <button
                key={category.id}
                onClick={handleClick}
                className="w-full animate-fade-in-up"
                style={{ animationDelay: category.delay }}
              >
                <div
                  className={`${category.gradient} rounded-3xl p-6 shadow-card relative overflow-hidden group transition-transform duration-300 active:scale-[0.98]`}
                >
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />

                  <div className="relative z-10 flex items-center gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <p className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wider mb-1">
                        {category.subtitle}
                      </p>
                      <h2 className="font-display text-2xl font-bold text-primary-foreground mb-1">
                        {category.title}
                      </h2>
                      <p className="text-primary-foreground/80 text-sm">
                        {category.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ChevronRight className="w-5 h-5 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySelectionPage;
