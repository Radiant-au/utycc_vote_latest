import { useQuery } from "@tanstack/react-query";
import { fetchSelections } from "@/api";

export const useSelections = () =>
  useQuery({
    queryKey: ["selections"],
    queryFn: fetchSelections,
    staleTime: 5 * 60 * 1000,
  });

