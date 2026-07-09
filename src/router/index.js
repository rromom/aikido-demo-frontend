import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import MyOrders from '../views/MyOrders.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/products/:id', component: ProductDetail, props: true },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: Admin },
  { path: '/pedidos', component: MyOrders },
]

export default createRouter({
  history: createWebHistory('/aikido-demo-frontend/'),
  routes,
})
