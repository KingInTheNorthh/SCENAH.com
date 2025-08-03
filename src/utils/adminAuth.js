// Admin authentication utilities
export const checkAdminAuth = () => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
  const loginTime = localStorage.getItem('adminLoginTime')
  
  if (!isAuthenticated || !loginTime) {
    return false
  }

  // Check if session is still valid (24 hours)
  const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  const currentTime = Date.now()
  const loginTimestamp = parseInt(loginTime)
  
  if (currentTime - loginTimestamp > sessionDuration) {
    // Session expired, clear auth data
    logoutAdmin()
    return false
  }

  return true
}

export const logoutAdmin = () => {
  localStorage.removeItem('adminAuthenticated')
  localStorage.removeItem('adminLoginTime')
}

export const requireAuth = (navigate) => {
  if (!checkAdminAuth()) {
    navigate('/admin/login')
    return false
  }
  return true
} 