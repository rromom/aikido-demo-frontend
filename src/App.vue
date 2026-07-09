<template>
  <header class="navbar">
    <router-link to="/" class="brand">Vulnerable Marketplace</router-link>
    <nav>
      <router-link to="/">Inicio</router-link>
      <!-- Solo se oculta el link para clientes logueados; el endpoint sigue
           sin ningún guard real (broken-access-control intencional) — ver
           VULNERABILITIES.md. Escribiendo /admin en la URL, o llamando la
           API directo, cualquiera entra igual. -->
      <router-link v-if="!currentUser || currentUser.role === 'admin'" to="/admin">Admin</router-link>
      <router-link v-if="currentUser" to="/pedidos">Mis pedidos</router-link>

      <div class="session" v-if="currentUser">
        <span class="badge" :class="currentUser.role">{{ currentUser.role }}</span>
        <span class="muted">{{ currentUser.email }}</span>
        <button class="btn secondary" @click="handleLogout">Cerrar sesión</button>
      </div>
      <div class="session" v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Registro</router-link>
      </div>
    </nav>
  </header>

  <main class="container">
    <router-view />
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { currentUser, clearSession } from './store/auth'

const router = useRouter()

function handleLogout() {
  clearSession()
  router.push('/')
}
</script>
