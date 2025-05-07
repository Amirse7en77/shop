export function getJwtToken() {
    return sessionStorage.getItem("accessToken")
}

export function setJwtToken(token:string) {
    sessionStorage.setItem("accessToken", token)
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
    return sessionStorage.getItem("refreshToken")
}

export function setRefreshToken(token: string) {
    sessionStorage.setItem("refreshToken", token)
}