<template>
  <div>
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p>Precio: ${{ product.price }}</p>

    <h3>Comentarios</h3>
    <ul>
      <li v-for="c in comments" :key="c.id">
        <!-- VULN: xss-stored — comment body rendered with v-html, no sanitization -->
        <div v-html="c.body"></div>
      </li>
    </ul>

    <textarea v-model="newComment" placeholder="Escribe un comentario..."></textarea>
    <button @click="postComment">Comentar</button>
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
