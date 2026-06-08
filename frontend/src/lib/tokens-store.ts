let accessToken: string | null = null;

export function setToken(newToken: string | null) {
    accessToken = newToken;
}

export function getToken() {
    return accessToken;
}
