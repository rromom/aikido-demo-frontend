<template>
  <div>
    <h1>Marketplace (demo vulnerable)</h1>
    <input v-model="q" @keyup.enter="search" placeholder="Buscar productos..." />
    <button @click="search">Buscar</button>

    <!-- VULN: xss-reflected — search term rendered with v-html, no escaping -->
    <p v-html="resultsLabel"></p>

    <ul>
      <li v-for="p in products" :key="p.id">
        <router-link :to="`/products/${p.id}`">{{ p.title }}</router-link>
        — ${{ p.price }} ({{ p.stock }} en stock)
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../api/client'

const q = ref('')
const products = ref([])
const resultsLabel = ref('')

async function search() {
  const { data } = await api.get('/products', { params: { q: q.value } })
  products.value = data
  // VULN: xss-reflected — user input concatenated straight into HTML bound via v-html
  resultsLabel.value = `Resultados para: ${q.value}`
}

search()
</script>
