import { Droppable } from '@hello-pangea/dnd'
import KanbanCard from './KanbanCard'

const colorMap = {
  'Pendiente': 'kanban-col-pendiente',
  'En proceso': 'kanban-col-proceso',
  'Entregado': 'kanban-col-entregado',
}

function KanbanColumn({ titulo, pedidos }) {
  return (
    <div className={`kanban-col ${colorMap[titulo] || ''}`}>
      <div className="kanban-col-header">
        <span className="kanban-col-titulo">{titulo}</span>
        <span className="kanban-col-count">{pedidos.length}</span>
      </div>
      <Droppable droppableId={titulo}>
        {(provided, snapshot) => (
          <div
            className={`kanban-col-body ${snapshot.isDraggingOver ? 'kanban-col-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {pedidos.length === 0 && (
              <div className="kanban-col-empty">Sin pedidos</div>
            )}
            {pedidos.map((p, i) => (
              <KanbanCard key={p.id} pedido={p} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default KanbanColumn
