import { createContext, useContext, useReducer, useCallback } from 'react'
import pedidoService from '../services/pedidoService'
import pedidoReducer from '../reducer/pedidoReducer'

// 1. Crear el contexto
const PedidoContext = createContext()

// 2. Proveedor que envuelve la aplicación
export function PedidoProvider({ children }) {
  const [pedidos, dispatch] = useReducer(pedidoReducer, [])

  // Funciones asíncronas que llaman a la API y luego hacen dispatch
  const cargarPedidos = useCallback(async () => {
    const data = await pedidoService.obtenerTodos()
    dispatch({ type: 'cargar', payload: data })
  }, [])

  const agregarPedido = async (pedido) => {
    const nuevo = await pedidoService.crear(pedido)
    dispatch({ type: 'agregar', payload: nuevo })
  }

  const actualizarPedido = async (id, datos) => {
    const actualizado = await pedidoService.actualizar(id, datos)
    dispatch({ type: 'actualizar', payload: actualizado })
  }

  const eliminarPedido = async (id) => {
    await pedidoService.eliminar(id)
    dispatch({ type: 'eliminar', payload: id })
  }

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        dispatch,
        cargarPedidos,
        agregarPedido,
        actualizarPedido,
        eliminarPedido
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}

// 3. Hook personalizado para consumir el contexto
export function usePedidos() {
  const context = useContext(PedidoContext)
  if (!context) {
    throw new Error('usePedidos debe usarse dentro de un PedidoProvider')
  }
  return context
}
