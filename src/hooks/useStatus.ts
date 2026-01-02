// src/hooks/useVotingStatus.ts
import { fetchPinCodeStatus, fetchVotingStatus, fetchWinnerStatus, PinCodeStatus, Status } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useVotingStatus = () => {
  return useQuery<Status>({
    queryKey: ['votingStatus'],
    queryFn: fetchVotingStatus,
    refetchOnWindowFocus: true, // Auto-refresh when user comes back to tab
  });
};

export const useWinnerStatus = () => {
  return useQuery<Status>({
    queryKey: ['winnerStatus'],
    queryFn: fetchWinnerStatus,
    refetchOnWindowFocus: true,
  });
};

export const usePinCodeStatus = () =>
  useQuery<PinCodeStatus>({
    queryKey: ["pinCodeStatus"],
    queryFn: fetchPinCodeStatus,
    staleTime: 60 * 1000,
});
