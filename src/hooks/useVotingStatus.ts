// src/hooks/useVotingStatus.ts
import { fetchVotingStatus, VotingStatus } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useVotingStatus = () => {
  return useQuery<VotingStatus>({
    queryKey: ['votingStatus'],
    queryFn: fetchVotingStatus,
    refetchOnWindowFocus: true, // Auto-refresh when user comes back to tab
  });
};