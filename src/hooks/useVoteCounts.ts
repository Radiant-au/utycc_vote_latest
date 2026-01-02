// src/hooks/useVoteCounts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchSeniorVoteCounts, fetchUserVotes, fetchWinner, GetWinners, VoteCountsResponse, VoteResponse } from '@/api';

export const useSeniorVoteCounts = () => {
  return useQuery<VoteCountsResponse>({
    queryKey: ['seniorVoteCounts'],
    queryFn: fetchSeniorVoteCounts,
    refetchInterval: false,
    refetchOnWindowFocus: true,
  });
};

export const useWinners = () => {
  return useQuery<GetWinners>({
    queryKey: ['Winners'],
    queryFn: fetchWinner,
    enabled: false, // Only fetch when winners are unlocked
  });
};

export const useUserSVotes = () => {
  return useQuery<Partial<VoteResponse>>({
    queryKey: ['userSeniorVotes'],
    queryFn: fetchUserVotes,
  });
};