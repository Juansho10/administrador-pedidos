import { useState } from 'react'
import { usePedidos } from '../context/PedidoContext'

const formVacio = { nombreCliente: '', producto: '', cantidad: '', precio: '' }

function PedidoForm({ onSuccess }) {
  const [form, setForm] = useState(formVacio)
  const [error, setError] = useState('')
  const { agregarPedido } = usePedidos()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'cantidad' || name === 'precio' ? (value === '' ? '' : Number(value)) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.nombreCliente.trim() || !form.producto.trim()) {
      setError('Todos los campos son obligatorios')
      return
    }

    const cantidad = Number(form.cantidad)
    if (!cantidad || cantidad < 1) {
      setError('La cantidad debe ser un número mayor a 0')
      return
    }

    const precio = Number(form.precio)
    if (!precio || precio < 1) {
      setError('El precio debe ser un número mayor a 0')
      return
    }

    try {
      await agregarPedido({
        nombreCliente: form.nombreCliente.trim(),
        producto: form.producto.trim(),
        cantidad,
        precio
      })
      setForm(formVacio)
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Error al crear el pedido:', err)
      setError(err?.response?.data?.message || 'Error al crear el pedido')
    }
  }

  return (
    <div className="form-card">
      <h2>Nuevo Pedido</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreCliente">Cliente</label>
          <input
            id="nombreCliente"
            name="nombreCliente"
            value={form.nombreCliente}
            onChange={handleChange}
            placeholder="Nombre del cliente"
          />
        </div>

        <div className="form-group">
          <label htmlFor="producto">Producto</label>
          <input
            id="producto"
            name="producto"
            value={form.producto}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            name="cantidad"
            type="number"
            min="1"
            value={form.cantidad}
            onChange={handleChange}
            placeholder="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio unitario</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="1"
            value={form.precio}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Pedido
        </button>
      </form>
    </div>
  )
}

export default PedidoForm
