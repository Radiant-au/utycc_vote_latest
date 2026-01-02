import { useState } from "react";
import PinInput from "react-pin-input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useAuthContext } from "@/context/AuthContext";

type VotingPinInputProps = {
  onSuccess?: () => void;
};

const VotingPinInput = ({ onSuccess }: VotingPinInputProps) => {
  const [hasError, setHasError] = useState(false);
  const { login } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: (code: string) => login(code),
    onSuccess: () => {
      setHasError(false);
      toast({
        title: "Welcome!",
        description: "PIN verified. You can now vote.",
      });
      onSuccess?.();
    },
    onError: () => {
      setHasError(true);
      toast({
        title: "Invalid PpIN",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    },
  });

  const handleComplete = (value: string) => {
    if (value.length !== 6) return;
    loginMutation.mutate(value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold text-foreground">Enter Your PIN</h2>
      <PinInput
        length={6}
        initialValue=""
        type="custom"
        inputMode="text"
        style={{ display: "flex", justifyContent: "center", gap: "8px" }}
        inputStyle={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "#d1a453", // gold tone
          borderRadius: "10px",
          width: "44px",
          height: "52px",
          fontSize: "22px",
          textAlign: "center" as const,
          backgroundColor: "var(--card)",
          color: "var(--foreground)",
          outline: "none",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        inputFocusStyle={{
          borderColor: "#b8860b", // deeper gold on focus
          boxShadow: "0 0 0 2px rgba(184,134,11,0.15)",
        }}
        onComplete={handleComplete}
      />
      {hasError && <p className="text-red-500 text-sm">Invalid PIN</p>}
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        Clear PIN
      </button>
    </div>
  );
};

export default VotingPinInput;

