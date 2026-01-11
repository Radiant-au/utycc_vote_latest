import { useQuery } from "@tanstack/react-query";
import { fetchSelections } from "@/api";

export const useSelections = () =>
  useQuery({
    queryKey: ["selections"],
    queryFn: fetchSelections,
    staleTime: Infinity,
  });

