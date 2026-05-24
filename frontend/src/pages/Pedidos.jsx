import { useState, useEffect } from 'react'
import { usePedidos } from '../context/PedidoContext'
import PedidoForm from '../components/PedidoForm'

const ESTADOS = ['Pendiente', 'En proceso', 'Entregado']

function Pedidos() {
  const { pedidos, cargarPedidos, actualizarPedido, eliminarPedido } = usePedidos()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    cargarPedidos()
  }, [cargarPedidos])

  const handleCambiarEstado = async (id, estadoActual) => {
    const idx = ESTADOS.indexOf(estadoActual)
    const siguienteEstado = ESTADOS[(idx + 1) % ESTADOS.length]
    await actualizarPedido(id, { estado: siguienteEstado })
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este pedido?')) return
    await eliminarPedido(id)
    setMensaje('Pedido eliminado correctamente')
    setTimeout(() => setMensaje(''), 3000)
  }

  const badgeClass = (estado) => {
    if (estado === 'Pendiente') return 'badge badge-pendiente'
    if (estado === 'En proceso') return 'badge badge-en-proceso'
    return 'badge badge-entregado'
  }

  return (
    <div>
      <div className="toolbar">
        <h1>Pedidos</h1>
        <button
          className="btn btn-primary"
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? 'Cancelar' : 'Crear Pedido'}
        </button>
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {mostrarForm && (
        <PedidoForm onSuccess={() => setMostrarForm(false)} />
      )}

      {pedidos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', padding: '32px 0' }}>
          No hay pedidos registrados. ¡Crea el primero!
        </p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombreCliente}</td>
                  <td>{p.producto}</td>
                  <td>{p.cantidad}</td>
                  <td>
                    <span className={badgeClass(p.estado)}>{p.estado}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleCambiarEstado(p.id, p.estado)}
                      title="Cambiar estado"
                    >
                      Avanzar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(p.id)}
                      title="Eliminar pedido"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Pedidos
