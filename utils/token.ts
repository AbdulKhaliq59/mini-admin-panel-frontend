let inMemoryToken: string | null = null;

function setCookie(name: string, value: string, days = 1) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = location.protocol === "https:" ? "; Secure" : "";
  // Note: cannot set HttpOnly from client—backend should set HttpOnly cookie for maximum security.
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`;
}

export const TokenService = {
  setToken(token: string, persist = false) {
    inMemoryToken = token;
    try {
      const hasWindow = typeof window !== "undefined";
      const hasSessionStorage = hasWindow && window.sessionStorage;
      if (persist && hasSessionStorage) {
        window.sessionStorage.setItem("access_token", token);
      }
      setCookie("access_token", token, 1);
    } catch (e) {
      throw new Error("Storage error");
    }
  },
  getToken() {
    if (inMemoryToken) return inMemoryToken;
    try {
      if (typeof window !== "undefined") {
        const t = window.sessionStorage.getItem("access_token");
        if (t) {
          inMemoryToken = t;
          return t;
        }
        const m = document.cookie.match(/(^|;)\s*access_token=([^;]+)/);
        if (m) {
          const v = decodeURIComponent(m[2]);
          inMemoryToken = v;
          return v;
        }
      }
    } catch (e) { }
    return null;
  },
  clear() {
    inMemoryToken = null;
    try {
      if (typeof window !== "undefined" && window.sessionStorage) window.sessionStorage.removeItem("access_token");
      clearCookie("access_token");
    } catch (e) { }
  },
};
