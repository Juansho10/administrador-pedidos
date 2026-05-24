const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Documentación Swagger disponible en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/pedidos', pedidoRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Gestión de Pedidos',
    version: '1.0.0',
    docs: 'http://localhost:4000/api-docs'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
});
