let cachedToken: string | null = null;

export function clearToken() {
  cachedToken = null;
}

export async function getToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;
  try {
    const res = await fetch("/api/token");
    if (!res.ok) return null;
    const data = await res.json();
    cachedToken = data.token ?? null;
    return cachedToken;
  } catch {
    return null;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  return fetch(`${base}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}
