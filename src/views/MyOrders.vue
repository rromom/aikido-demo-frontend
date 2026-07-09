<template>
  <div>
    <h2>Mis pedidos</h2>

    <p v-if="!currentUser" class="muted">Inicia sesión para ver tus pedidos.</p>

    <template v-else>
      <table v-if="orders.length">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Status</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td>{{ o.id }}</td>
            <td>{{ o.product_title }}</td>
            <td>{{ o.quantity }}</td>
            <td>{{ o.status }}</td>
            <td>{{ new Date(o.created_at).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="muted">Aún no tienes pedidos — ve al inicio y compra algo.</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api/client'
import { currentUser } from '../store/auth'

const orders = ref([])

async function load() {
  if (!currentUser.value) return
  // VULN: idor — this only ever sends *your own* id, but the endpoint
  // accepts any buyer_id in the query string (see backend routes_orders.py).
  const { data } = await api.get('/orders', { params: { buyer_id: currentUser.value.id } })
  orders.value = data
}

onMounted(load)
</script>
