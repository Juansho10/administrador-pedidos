import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import pedidoService from '../services/pedidoService'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

function formatearPrecio(n) {
  return '$' + (n || 0).toLocaleString('es-CO')
}

function Metricas() {
  const [metricas, setMetricas] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    pedidoService.obtenerMetricas()
      .then(setMetricas)
      .catch(() => setError('Error al cargar métricas'))
  }, [])

  if (error) return <div className="alert alert-error">{error}</div>
  if (!metricas) return <p style={{ textAlign: 'center', padding: 48, color: '#888' }}>Cargando métricas...</p>

  const dataVentas = {
    labels: metricas.ventasPorMes.map(v => v.mes),
    datasets: [{
      label: 'Ventas',
      data: metricas.ventasPorMes.map(v => v.total),
      backgroundColor: ['#ffc107', '#17a2b8', '#28a745', '#1a73e8', '#dc3545', '#6f42c1'],
      borderRadius: 6,
    }]
  }

  const dataProductos = {
    labels: metricas.topProductos.map(p => p.producto),
    datasets: [{
      data: metricas.topProductos.map(p => p.cantidad),
      backgroundColor: ['#ffc107', '#17a2b8', '#28a745', '#dc3545', '#6f42c1'],
      borderWidth: 0,
    }]
  }

  return (
    <div>
      <h1>Métricas</h1>

      <div className="metricas-cards">
        <div className="metrica-card metrica-card-ventas">
          <span className="metrica-label">Ventas del mes</span>
          <span className="metrica-valor">{formatearPrecio(metricas.ventasMes)}</span>
        </div>
        <div className="metrica-card metrica-card-top">
          <span className="metrica-label">Producto más vendido</span>
          <span className="metrica-valor">{metricas.productoTop?.producto || '-'}</span>
          <span className="metrica-sub">{metricas.productoTop?.cantidad || 0} ud(s)</span>
        </div>
        <div className="metrica-card metrica-card-total">
          <span className="metrica-label">Total pedidos</span>
          <span className="metrica-valor">{metricas.totalPedidos}</span>
        </div>
      </div>

      <div className="metricas-charts">
        <div className="metrica-chart-box">
          <h2>Ventas por mes</h2>
          <Bar
            data={dataVentas}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { callback: v => '$' + v.toLocaleString('es-CO') }
                }
              }
            }}
          />
        </div>
        <div className="metrica-chart-box">
          <h2>Productos más vendidos</h2>
          <div style={{ maxWidth: 320, margin: '0 auto' }}>
            <Doughnut
              data={dataProductos}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { padding: 16 }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Metricas
