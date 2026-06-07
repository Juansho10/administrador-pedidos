import { useState } from 'react'
import { Link } from 'react-router-dom'
import KanbanBoard from '../components/KanbanBoard'
import CrearPedidoModal from '../components/CrearPedidoModal'

function Inicio() {
  const [mostrarModal, setMostrarModal] = useState(false)

  return (
    <div>
      <div className="hero">
        <h1>Sistema de Gestión de Pedidos</h1>
        <p>
          Aplicación web para la administración sencilla de pedidos en pequeños negocios.
          Permite registrar, consultar, actualizar y eliminar pedidos de forma rápida y eficiente.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-success" onClick={() => setMostrarModal(true)}>
            Crear Pedido
          </button>
          <Link to="/pedidos" className="btn btn-primary">
            Ver Pedidos
          </Link>
        </div>
      </div>

      <KanbanBoard />

      <div className="features">
        <div className="feature-card">
          <h3>Registrar</h3>
          <p>Agrega nuevos pedidos con cliente, producto y cantidad.</p>
        </div>
        <div className="feature-card">
          <h3>Gestionar</h3>
          <p>Arrastra y suelta pedidos entre columnas para cambiar su estado.</p>
        </div>
        <div className="feature-card">
          <h3>Eliminar</h3>
          <p>Elimina pedidos cuando ya no sean necesarios desde la tabla.</p>
        </div>
      </div>

      {mostrarModal && (
        <CrearPedidoModal onClose={() => setMostrarModal(false)} />
      )}
    </div>
  )
}

export default Inicio
