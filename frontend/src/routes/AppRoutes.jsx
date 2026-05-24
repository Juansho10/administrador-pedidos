import { Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Pedidos from '../pages/Pedidos'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/pedidos" element={<Pedidos />} />
    </Routes>
  )
}

export default AppRoutes
