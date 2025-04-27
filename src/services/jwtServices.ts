export function getJwtToken() {
    return sessionStorage.getItem("accessToken")
}

export function setJwtToken(token) {
    sessionStorage.setItem("accessToken", token)
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
    return sessionStorage.getItem("refreshToken")
}

export function setRefreshToken(token) {
    sessionStorage.setItem("refreshToken", token)
}