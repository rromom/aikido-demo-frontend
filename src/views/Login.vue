<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Entrar</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../api/client'

const email = ref('')
const password = ref('')
const error = ref('')

async function login() {
  const { data } = await api.post('/auth/login', { email: email.value, password: password.value })
  if (data.error) {
    error.value = data.error
    return
  }
  // VULN: insecure-storage — JWT and user object stored in plaintext
  // localStorage, readable by any script (XSS-accessible, no httpOnly cookie).
  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(data.user))
  console.log('[DEBUG] login response:', data) // VULN: sensitive-data-logging — token logged to console
}
</script>
