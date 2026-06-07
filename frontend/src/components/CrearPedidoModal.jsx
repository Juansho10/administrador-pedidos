import Modal from './Modal'
import PedidoForm from './PedidoForm'

function CrearPedidoModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <PedidoForm onSuccess={onClose} />
    </Modal>
  )
}

export default CrearPedidoModal
