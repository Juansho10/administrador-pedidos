import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        Gestión de Pedidos
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/pedidos">Pedidos</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
