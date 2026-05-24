import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div className="hero">
      <h1>Sistema de Gestión de Pedidos</h1>
      <p>
        Aplicación web para la administración sencilla de pedidos en pequeños negocios.
        Permite registrar, consultar, actualizar y eliminar pedidos de forma rápida y eficiente.
      </p>
      <Link to="/pedidos" className="btn btn-primary">
        Ver Pedidos
      </Link>

      <div className="features">
        <div className="feature-card">
          <h3>Registrar</h3>
          <p>Agrega nuevos pedidos con cliente, producto y cantidad.</p>
        </div>
        <div className="feature-card">
          <h3>Gestionar</h3>
          <p>Actualiza el estado de cada pedido: Pendiente, En proceso o Entregado.</p>
        </div>
        <div className="feature-card">
          <h3>Eliminar</h3>
          <p>Elimina pedidos cuando ya no sean necesarios.</p>
        </div>
      </div>
    </div>
  )
}

export default Inicio
