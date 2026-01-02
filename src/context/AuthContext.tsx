import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginWithPin, getToken as loadToken, setToken as persistToken, clearToken as removeToken } from "@/api";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  login: (pin: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const existing = loadToken();
    if (existing) setToken(existing);
  }, []);

  const login = async (pin: string) => {
    const { token: newToken } = await loginWithPin(pin);
    setToken(newToken);
  };

  const logout = () => {
    removeToken();
    setToken(null);
  };

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return ctx;
};

