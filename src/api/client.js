import axios from 'axios'

// TODO: confirmar con Render la URL final del servicio (puede llevar sufijo
// si "aikido-backend-demo" estaba tomado) y actualizar aquí.
const API_BASE_URL = 'https://aikido-backend-demo.onrender.com'

export const api = axios.create({ baseURL: API_BASE_URL })
