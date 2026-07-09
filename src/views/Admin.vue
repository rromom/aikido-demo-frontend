<template>
  <div>
    <h2>Panel Admin</h2>
    <!-- VULN: broken-access-control — no role/token check before rendering;
         the underlying endpoints are open to anyone anyway. -->
    <p class="banner">
      ⚠ Esta vista no valida sesión ni rol — vulnerabilidad intencional (broken access control) para la demo de Aikido.
    </p>

    <h3 class="section-title">Usuarios</h3>
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>Rol</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.email }}</td>
          <td><span class="badge" :class="u.role">{{ u.role }}</span></td>
          <td>{{ u.password }}</td>
        </tr>
      </tbody>
    </table>

    <h3 class="section-title">Pedidos</h3>
    <div class="search-bar">
      <input v-model="statusFilter" placeholder="Filtrar por status" />
      <button class="btn" @click="loadOrders">Filtrar</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Comprador</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.id">
          <td>{{ o.id }}</td>
          <td>{{ o.buyer_id }}</td>
          <td>{{ o.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api/client'

const users = ref([])
const orders = ref([])
const statusFilter = ref('')

async function loadUsers() {
  const { data } = await api.get('/admin/users')
  users.value = data
}

async function loadOrders() {
  const { data } = await api.get('/admin/orders', { params: { status: statusFilter.value } })
  orders.value = data
}

onMounted(() => {
  loadUsers()
  loadOrders()
})
</script>
