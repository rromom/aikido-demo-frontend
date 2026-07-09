<template>
  <div>
    <router-link to="/" class="muted">&larr; Volver</router-link>
    <h2>{{ product.title }}</h2>
    <p class="muted">{{ product.description }}</p>
    <p style="font-size: 1.2rem; font-weight: 700; color: var(--color-primary)">${{ product.price }}</p>

    <h3 class="section-title">Comentarios</h3>
    <div v-for="c in comments" :key="c.id" class="comment">
      <!-- VULN: xss-stored — comment body rendered with v-html, no sanitization -->
      <div v-html="c.body"></div>
    </div>

    <div class="card" style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px">
      <textarea v-model="newComment" placeholder="Escribe un comentario..." rows="3"></textarea>
      <button class="btn" style="align-self: flex-start" @click="postComment">Comentar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../api/client'

const props = defineProps({ id: String })
const product = ref({})
const comments = ref([])
const newComment = ref('')

async function load() {
  const { data: p } = await api.get(`/products/${props.id}`)
  product.value = p
  const { data: c } = await api.get(`/products/${props.id}/comments`)
  comments.value = c
}

async function postComment() {
  await api.post(`/products/${props.id}/comments`, {
    author_id: JSON.parse(localStorage.getItem('user') || '{}').id,
    body: newComment.value,
  })
  newComment.value = ''
  load()
}

onMounted(load)
</script>
