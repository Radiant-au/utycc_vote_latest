import { useQuery } from "@tanstack/react-query";
import { fetchVoteStatus, VoteStatus } from "@/api";

export const useVoteStatus = () =>
  useQuery<VoteStatus>({
    queryKey: ["voteStatus"],
    queryFn: fetchVoteStatus,
    staleTime: 60 * 1000,
  });
