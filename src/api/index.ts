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

export type VoteResponse = {
  pinCode: string;
  maleName: string;
  femaleName: string;
};

export type VoteStatus = {
  hasVotedSenior?: boolean;
  hasVotedJunior?: boolean;
};

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

export async function fetchVoteStatus(): Promise<VoteStatus> {
  // Adjust the endpoint/shape if your backend differs
  return apiFetch<VoteStatus>("/pinCode/status", { method: "GET" });
}
// export function buildImageUrl(profileImg?: string | null) {
//   if (!profileImg) return "/placeholder.svg";
//   return `${API_URL}/${profileImg}`;
// }

export { getToken, setToken, clearToken, API_URL };

