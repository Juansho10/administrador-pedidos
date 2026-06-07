import { Routes, Route } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import Pedidos from '../pages/Pedidos'
import Metricas from '../pages/Metricas'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/metricas" element={<Metricas />} />
    </Routes>
  )
}

export default AppRoutes
