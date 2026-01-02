import { apiFetch, setToken, API_URL, getToken, clearToken } from "./client";

export type Selection = {
  id: number;
  name: string;
  gender: "male" | "female";
  category: "king-queen" | "prince-princess";
  profileImg?: string | null;
  major?: string | null;
  description?: string | null;
};

export interface VoteCount {
  selectionId: number;
  selectionName: string;
  voteCount: number;
}

export interface VoteCountsResponse {
  maleVotes: VoteCount[];
  femaleVotes: VoteCount[];
}

export interface UserVotesResponse {
  pinCode: string;
  maleName: string;
  femaleName: string;
}

export type VoteResponse = {
  pinCode: string;
  maleName: string;
  femaleName: string;
};

export type Status = {
  status: 'OPEN' | 'CLOSED';
};

export type PinCodeStatus = {
  hasVotedSenior?: boolean;
  hasVotedJunior?: boolean;
};

export interface Winner{
    selectionId: number;
    selectionName: string;
    voteCount: number;
    profileImg: string;
}

export interface GetWinners{
    maleWinner: Winner;
    femaleWinner: Winner;
}

export async function loginWithPin(pincode: string) {
  const result = await apiFetch<{ token: string }>("/auth/Plogin", {
    method: "POST",
    body: JSON.stringify({ Rcode: pincode }),
    skipAuth: true,
  });
  setToken(result.token);
  return result;
}

export async function fetchSelections(): Promise<Selection[]> {
  const selections = await apiFetch<Array<Selection & { gender: string }>>("/selection");
  return selections.map((s) => ({
    ...s,
    gender: (s.gender || "").toLowerCase() === "female" ? "female" : "male",
    category: (s.category as Selection["category"]) || "king-queen",
  }));
}

export async function submitVote(
  category: Selection["category"],
  maleId: number,
  femaleId: number
): Promise<VoteResponse> {
  const path = category === "king-queen" ? "/vote/senior" : "/vote/junior";
  return apiFetch<VoteResponse>(path, {
    method: "POST",
    body: JSON.stringify({ maleId, femaleId }),
  });
}

export async function fetchPinCodeStatus(): Promise<PinCodeStatus> {
  // Adjust the endpoint/shape if your backend differs
  return apiFetch<PinCodeStatus>("/pinCode/status", { method: "GET" });
}
// export function buildImageUrl(profileImg?: string | null) {
//   if (!profileImg) return "/placeholder.svg";
//   return `${API_URL}/${profileImg}`;
// }
export async function fetchVotingStatus(){
  return apiFetch<Status>("/appStatus/app" , {method: "GET"})
}

export async function fetchWinnerStatus(){
  return apiFetch<Status>("/appStatus/winner" , {method: "GET"})
}

// Fetch vote counts for Senior category (King & Queen)
export const fetchSeniorVoteCounts = async (): Promise<VoteCountsResponse> => {
  const response = await apiFetch<VoteCountsResponse>('/vote/senior/pin');
  return response;
};

export const fetchWinner = async (): Promise<GetWinners> => {
  const response = await apiFetch<GetWinners>('/vote/kqwinner');
  return response;
};

export const fetchUserVotes = async (): Promise<Partial<VoteResponse>> => {
  const response = await apiFetch<Partial<VoteResponse>>('/vote/user');
  return response;
};

export { getToken, setToken, clearToken, API_URL };

