import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import VotingPinInput from "@/components/VotingPinInput";
import { useAuthContext } from "@/context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/categories");
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    toast({
      title: "Welcome!",
      description: "PIN verified. You can now vote.",
    });
    navigate("/categories");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-accent/10 blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm animate-fade-in-up">
        {/* Ticket Header */}
        <div className="gradient-gold rounded-t-3xl p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card/20 backdrop-blur-sm mb-4">
              <Crown className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-primary-foreground">Royal Vote</h1>
            <p className="text-primary-foreground/80 text-sm mt-1">School Election 2024</p>
          </div>
          
          {/* Decorative sparkles */}
          <Sparkles className="absolute top-4 right-4 w-5 h-5 text-primary-foreground/50 animate-pulse" />
          <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-primary-foreground/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Ticket Perforations */}
        <div className="relative h-4 bg-card">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-background rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-background rounded-full" />
          <div className="absolute inset-x-8 top-1/2 border-t-2 border-dashed border-muted" />
        </div>

        {/* Ticket Body */}
        <div className="bg-card rounded-b-3xl p-6 shadow-card">
          <div className="text-center mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">Enter Your PIN</h2>
            <p className="text-muted-foreground text-sm">Use your unique voting access code</p>
          </div>

          <div className="space-y-4">
            <VotingPinInput onSuccess={handleSuccess} />
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Your vote is private and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
