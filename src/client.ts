const PAPERCLIP_URL = process.env.PAPERCLIP_URL?.replace(/\/$/, "") ?? "";
const PAPERCLIP_EMAIL = process.env.PAPERCLIP_EMAIL ?? "";
const PAPERCLIP_PASSWORD = process.env.PAPERCLIP_PASSWORD ?? "";

let sessionCookie: string | null = null;

async function login(): Promise<void> {
  const res = await fetch(`${PAPERCLIP_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: PAPERCLIP_EMAIL, password: PAPERCLIP_PASSWORD }),
  });
  if (!res.ok) {
    throw new Error(`Paperclip login failed: ${res.status} ${await res.text()}`);
  }
  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) throw new Error("No session cookie returned from login");
  sessionCookie = setCookie.split(";")[0];
}

export async function api(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<unknown> {
  if (!sessionCookie) await login();

  const doRequest = async (): Promise<Response> => {
    return fetch(`${PAPERCLIP_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: sessionCookie!,
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  };

  let res = await doRequest();

  if (res.status === 401) {
    sessionCookie = null;
    await login();
    res = await doRequest();
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Paperclip API error ${res.status}: ${text}`);
  }

  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}
