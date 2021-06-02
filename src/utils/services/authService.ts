function isAuthenticated() {
  return !!window.localStorage.jwtToken
}

function logout() {
  window.localStorage.removeItem("jwtToken")
  window.localStorage.removeItem("userId")
  window.localStorage.removeItem("userType")
}

function getCurrentUserId() {
  return String(window.localStorage.userId)
}

function getCurrentUserType() {
  return String(window.localStorage.userType)
}

export default { logout, isAuthenticated, getCurrentUserId, getCurrentUserType }
