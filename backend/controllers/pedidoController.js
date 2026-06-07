const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

function leerDB() {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function escribirDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

const pedidoController = {

  // GET /pedidos - Obtener todos los pedidos
  obtenerTodos: (req, res) => {
    try {
      const db = leerDB();
      res.json({ success: true, data: db.pedidos });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al leer los pedidos', error: error.message });
    }
  },

  // GET /pedidos/metricas - Obtener métricas
  obtenerMetricas: (req, res) => {
    try {
      const db = leerDB();
      const ahora = new Date();
      const mesActual = ahora.getMonth();
      const anioActual = ahora.getFullYear();

      const pedidosEntregados = db.pedidos.filter(p => p.estado === 'Entregado');

      // Ventas del mes (solo entregados)
      const ventasMes = pedidosEntregados
        .filter(p => {
          const f = new Date(p.fecha);
          return f.getMonth() === mesActual && f.getFullYear() === anioActual;
        })
        .reduce((sum, p) => sum + (p.cantidad * (p.precio || 0)), 0);

      // Producto más vendido por cantidad total
      const conteoProductos = {};
      db.pedidos.forEach(p => {
        conteoProductos[p.producto] = (conteoProductos[p.producto] || 0) + p.cantidad;
      });
      const topProductos = Object.entries(conteoProductos)
        .map(([producto, cantidad]) => ({ producto, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad);
      const productoTop = topProductos[0] || null;

      // Ventas por mes (últimos 6 meses)
      const ventasPorMes = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(anioActual, mesActual - i, 1);
        const mes = d.toLocaleDateString('es-ES', { month: 'short' });
        const anio = d.getFullYear();
        const total = pedidosEntregados
          .filter(p => {
            const f = new Date(p.fecha);
            return f.getMonth() === d.getMonth() && f.getFullYear() === d.getFullYear();
          })
          .reduce((sum, p) => sum + (p.cantidad * (p.precio || 0)), 0);
        ventasPorMes.push({ mes: `${mes} ${anio}`, total });
      }

      res.json({
        success: true,
        data: {
          ventasMes,
          productoTop,
          totalPedidos: db.pedidos.length,
          ventasPorMes,
          topProductos: topProductos.slice(0, 5)
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al calcular métricas', error: error.message });
    }
  },

  // POST /pedidos - Crear un nuevo pedido
  crear: (req, res) => {
    try {
      const { nombreCliente, producto, cantidad, precio } = req.body;

      if (!nombreCliente || !producto || !cantidad) {
        return res.status(400).json({
          success: false,
          message: 'Los campos nombreCliente, producto y cantidad son obligatorios'
        });
      }

      if (typeof cantidad !== 'number' || cantidad < 1) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad debe ser un número mayor a 0'
        });
      }

      const db = leerDB();
      const nuevoPedido = {
        id: db.pedidos.length > 0 ? Math.max(...db.pedidos.map(p => p.id)) + 1 : 1,
        nombreCliente,
        producto,
        cantidad,
        precio: typeof precio === 'number' && precio > 0 ? precio : 0,
        fecha: new Date().toISOString(),
        estado: 'Pendiente'
      };

      db.pedidos.push(nuevoPedido);
      escribirDB(db);

      res.status(201).json({ success: true, data: nuevoPedido });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear el pedido', error: error.message });
    }
  },

  // PUT /pedidos/:id - Actualizar estado de un pedido
  actualizar: (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      const estadosValidos = ['Pendiente', 'En proceso', 'Entregado'];

      if (!estado || !estadosValidos.includes(estado)) {
        return res.status(400).json({
          success: false,
          message: `El estado debe ser uno de: ${estadosValidos.join(', ')}`
        });
      }

      const db = leerDB();
      const index = db.pedidos.findIndex(p => p.id === parseInt(id));

      if (index === -1) {
        return res.status(404).json({ success: false, message: `Pedido con id ${id} no encontrado` });
      }

      db.pedidos[index].estado = estado;
      escribirDB(db);

      res.json({ success: true, data: db.pedidos[index] });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar el pedido', error: error.message });
    }
  },

  // DELETE /pedidos/:id - Eliminar un pedido
  eliminar: (req, res) => {
    try {
      const { id } = req.params;
      const db = leerDB();
      const index = db.pedidos.findIndex(p => p.id === parseInt(id));

      if (index === -1) {
        return res.status(404).json({ success: false, message: `Pedido con id ${id} no encontrado` });
      }

      const pedidoEliminado = db.pedidos.splice(index, 1)[0];
      escribirDB(db);

      res.json({ success: true, data: pedidoEliminado });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar el pedido', error: error.message });
    }
  }
};

module.exports = pedidoController;
