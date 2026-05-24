import axios from 'axios'

const API_URL = 'http://localhost:4000/pedidos'

const pedidoService = {
  obtenerTodos: async () => {
    const res = await axios.get(API_URL)
    return res.data.data
  },

  crear: async (pedido) => {
    const res = await axios.post(API_URL, pedido)
    return res.data.data
  },

  actualizar: async (id, datos) => {
    const res = await axios.put(`${API_URL}/${id}`, datos)
    return res.data.data
  },

  eliminar: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`)
    return res.data.data
  }
}

export default pedidoService
