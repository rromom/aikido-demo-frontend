<template>
  <div class="form-card card">
    <h2>Crear cuenta</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" @keyup.enter="register" />
    <button class="btn" @click="register">Crear cuenta</button>
    <p class="success-text" v-if="success">Cuenta creada. Ya puedes iniciar sesión.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api/client'

const router = useRouter()
const email = ref('')
const password = ref('')
const success = ref(false)

async function register() {
  await api.post('/auth/register', { email: email.value, password: password.value })
  success.value = true
  setTimeout(() => router.push('/login'), 900)
}
</script>
