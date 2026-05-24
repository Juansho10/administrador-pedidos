// Reducer puro: solo maneja el estado, sin efectos secundarios
const pedidoReducer = (state, action) => {
  switch (action.type) {
    case 'cargar':
      return action.payload

    case 'agregar':
      return [...state, action.payload]

    case 'actualizar':
      return state.map((p) =>
        p.id === action.payload.id ? action.payload : p
      )

    case 'eliminar':
      return state.filter((p) => p.id !== action.payload)

    default:
      return state
  }
}

export default pedidoReducer
