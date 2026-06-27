// In-memory token store (for UI state tracking only)
// Tokens are now stored in httpOnly cookies set by the backend
// and automatically sent with each request by the browser

let accessToken: string | null = null;

export function setToken(newToken: string | null) {
    accessToken = newToken;
}

export function getToken() {
    return accessToken;
}

export function clearToken() {
    accessToken = null;
}
