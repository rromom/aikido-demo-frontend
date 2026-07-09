<template>
  <div>
    <h1>Marketplace</h1>
    <div class="search-bar">
      <input v-model="q" @keyup.enter="search" placeholder="Buscar productos..." />
      <button class="btn" @click="search">Buscar</button>
    </div>

    <!-- VULN: xss-reflected — search term rendered with v-html, no escaping -->
    <p class="muted" v-html="resultsLabel"></p>

    <div class="product-grid">
      <router-link v-for="p in products" :key="p.id" :to="`/products/${p.id}`" class="product-card">
        <span class="title">{{ p.title }}</span>
        <span class="price">${{ p.price }}</span>
        <span class="stock">{{ p.stock }} en stock</span>
      </router-link>
    </div>
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
