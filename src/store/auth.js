import { ref } from 'vue'

const storedUser = localStorage.getItem('user')
export const currentUser = ref(storedUser ? JSON.parse(storedUser) : null)

// VULN: insecure-storage — JWT and user object persisted in plaintext
// localStorage (no httpOnly cookie), readable by any script on the page.
export function setSession(user, token) {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
  currentUser.value = user
}

export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  currentUser.value = null
}
