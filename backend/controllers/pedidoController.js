const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

let currentId = 3; // Siguiente ID disponible (inicia después de los datos de ejemplo)

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

  // POST /pedidos - Crear un nuevo pedido
  crear: (req, res) => {
    try {
      const { nombreCliente, producto, cantidad } = req.body;

      // Validar campos obligatorios
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
