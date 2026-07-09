<template>
  <div>
    <h2>Registro</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Crear cuenta</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../api/client'

const email = ref('')
const password = ref('')

async function register() {
  await api.post('/auth/register', { email: email.value, password: password.value })
}
</script>
