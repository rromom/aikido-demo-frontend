<template>
  <div>
    <h2>Panel Admin</h2>
    <!-- VULN: broken-access-control — no role/token check before rendering;
         the underlying endpoints are open to anyone anyway. -->
    <h3>Usuarios</h3>
    <ul>
      <li v-for="u in users" :key="u.id">{{ u.email }} — {{ u.role }} — pass: {{ u.password }}</li>
    </ul>

    <h3>Pedidos</h3>
    <input v-model="statusFilter" placeholder="Filtrar por status" />
    <button @click="loadOrders">Filtrar</button>
    <ul>
      <li v-for="o in orders" :key="o.id">#{{ o.id }} — buyer {{ o.buyer_id }} — {{ o.status }}</li>
    </ul>
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
