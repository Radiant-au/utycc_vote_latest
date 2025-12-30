import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CategorySelectionPage from "./pages/CategorySelectionPage";
import VotingPage from "./pages/VotingPage";
import CandidateProfilePage from "./pages/CandidateProfilePage";
import Data from "./pages/Data";
import FoodiePage from "./pages/FoodiePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <CategorySelectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vote/:category"
              element={
                <ProtectedRoute>
                  <VotingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/data"
              element={
                <ProtectedRoute>
                  <Data />
                </ProtectedRoute>
              }
            />
            <Route
              path="/foodie"
              element={
                <ProtectedRoute>
                  <FoodiePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate/:id"
              element={
                <ProtectedRoute>
                  <CandidateProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
