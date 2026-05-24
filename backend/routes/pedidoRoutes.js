const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

/**
 * @openapi
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       required:
 *         - nombreCliente
 *         - producto
 *         - cantidad
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del pedido
 *         nombreCliente:
 *           type: string
 *           description: Nombre del cliente
 *         producto:
 *           type: string
 *           description: Nombre del producto
 *         cantidad:
 *           type: integer
 *           description: Cantidad del producto
 *         estado:
 *           type: string
 *           enum: [Pendiente, En proceso, Entregado]
 *           description: Estado actual del pedido
 *       example:
 *         id: 1
 *         nombreCliente: Juan Pérez
 *         producto: Hamburguesa Clásica
 *         cantidad: 2
 *         estado: Pendiente
 */

/**
 * @openapi
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de todos los pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pedido'
 */
router.get('/', pedidoController.obtenerTodos);

/**
 * @openapi
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreCliente
 *               - producto
 *               - cantidad
 *             properties:
 *               nombreCliente:
 *                 type: string
 *                 description: Nombre del cliente
 *               producto:
 *                 type: string
 *                 description: Producto solicitado
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del producto
 *             example:
 *               nombreCliente: Ana Martínez
 *               producto: Papas Fritas
 *               cantidad: 3
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Error de validación
 */
router.post('/', pedidoController.crear);

/**
 * @openapi
 * /pedidos/{id}:
 *   put:
 *     summary: Actualizar el estado de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [Pendiente, En proceso, Entregado]
 *             example:
 *               estado: Entregado
 *     responses:
 *       200:
 *         description: Pedido actualizado exitosamente
 *       404:
 *         description: Pedido no encontrado
 *       400:
 *         description: Estado inválido
 */
router.put('/:id', pedidoController.actualizar);

/**
 * @openapi
 * /pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido eliminado exitosamente
 *       404:
 *         description: Pedido no encontrado
 */
router.delete('/:id', pedidoController.eliminar);

module.exports = router;
