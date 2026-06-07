import { Draggable } from '@hello-pangea/dnd'

function KanbanCard({ pedido, index }) {
  return (
    <Draggable draggableId={String(pedido.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`kanban-card ${snapshot.isDragging ? 'kanban-card-dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="kanban-card-cliente">{pedido.nombreCliente}</div>
          <div className="kanban-card-producto">{pedido.producto}</div>
          <div className="kanban-card-cantidad">{pedido.cantidad} ud(s)</div>
        </div>
      )}
    </Draggable>
  )
}

export default KanbanCard
