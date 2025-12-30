const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token: string) => localStorage.setItem("token", token);
export const clearToken = () => localStorage.removeItem("token");

// console.log("API URL:", API_URL);

type ApiFetchOptions = RequestInit & { skipAuth?: boolean };

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { skipAuth, headers, ...rest } = options;
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && !skipAuth ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...rest,
  });

  // Automatic logout + redirect when token expired or missing
  if (response.status === 401) {
    clearToken();
    window.location.href = "/";
    return Promise.reject("Unauthorized");
  }

  const contentType = response.headers.get("content-type");
  const hasJson = contentType?.includes("application/json");
  const data = hasJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = data?.message || response.statusText || "Request failed";
    throw new Error(message);
  }

  return data as T;
}


export { API_URL };

