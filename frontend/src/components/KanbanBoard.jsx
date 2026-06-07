import { DragDropContext } from '@hello-pangea/dnd'
import KanbanColumn from './KanbanColumn'
import { usePedidos } from '../context/PedidoContext'

const ESTADOS = ['Pendiente', 'En proceso', 'Entregado']

function KanbanBoard() {
  const { pedidos, actualizarPedido } = usePedidos()

  const pedidosPorEstado = (estado) =>
    pedidos.filter((p) => p.estado === estado)

  const handleDragEnd = async (result) => {
    if (!result.destination) return

    const { draggableId, destination } = result
    const nuevoEstado = destination.droppableId
    const id = Number(draggableId)

    const pedido = pedidos.find((p) => p.id === id)
    if (!pedido || pedido.estado === nuevoEstado) return

    try {
      await actualizarPedido(id, { estado: nuevoEstado })
    } catch {
      console.error('Error al actualizar estado del pedido')
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        {ESTADOS.map((estado) => (
          <KanbanColumn
            key={estado}
            titulo={estado}
            pedidos={pedidosPorEstado(estado)}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard
