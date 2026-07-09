<template>
  <div class="form-card card">
    <h2>Iniciar sesión</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" @keyup.enter="login" />
    <button class="btn" @click="login">Entrar</button>
    <p class="error-text" v-if="error">{{ error }}</p>
    <p class="muted">¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api/client'
import { setSession } from '../store/auth'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

async function login() {
  error.value = ''
  const { data } = await api.post('/auth/login', { email: email.value, password: password.value })
  if (data.error) {
    error.value = data.error
    return
  }
  // VULN: insecure-storage — JWT and user object stored in plaintext
  // localStorage, readable by any script (XSS-accessible, no httpOnly cookie).
  setSession(data.user, data.token)
  console.log('[DEBUG] login response:', data) // VULN: sensitive-data-logging — token logged to console
  router.push(data.user.role === 'admin' ? '/admin' : '/pedidos')
}
</script>
