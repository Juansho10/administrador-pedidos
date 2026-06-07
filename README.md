# Sistema Web de Gestión de Pedidos para Pequeños Negocios

Aplicación web full stack para la administración de pedidos, desarrollada como proyecto universitario para la asignatura **Desarrollo de Aplicaciones Web II**.

---

## Descripción

El sistema permite a un pequeño negocio **registrar, consultar, actualizar y eliminar pedidos** de forma sencilla. Cada pedido contiene:

- **Cliente** que realiza el pedido
- **Producto** solicitado
- **Cantidad** del producto
- **Precio** unitario del producto
- **Fecha** de creación (auto-generada)
- **Estado** del pedido (Pendiente → En proceso → Entregado)

La aplicación cuenta con un **tablero Kanban** con drag & drop para gestionar el estado de los pedidos, una **página de métricas** con gráficos de ventas y productos, y documentación Swagger de la API.

---

## Tecnologías utilizadas

### Frontend

| Tecnología | Uso |
|---|---|
| **React 18** | Biblioteca para construir la interfaz de usuario |
| **Vite** | Herramienta de construcción y servidor de desarrollo rápido |
| **React Router v6** | Navegación entre páginas (Inicio, Pedidos, Métricas) |
| **@hello-pangea/dnd** | Drag & drop en el tablero Kanban |
| **Chart.js + react-chartjs-2** | Gráficos de barras y doughnut en Métricas |
| **Axios** | Cliente HTTP para consumir la API del backend |
| **Context API** | Estado global compartido (PedidoContext) |
| **useReducer** | Gestión de acciones CRUD (agregar, actualizar, eliminar) |
| **CSS puro** | Estilos responsive sin librerías externas |

### Backend

| Tecnología | Uso |
|---|---|
| **Node.js** | Entorno de ejecución JavaScript del lado del servidor |
| **Express** | Framework web para crear la API REST |
| **Swagger (swagger-jsdoc + swagger-ui-express)** | Documentación interactiva de la API |
| **CORS** | Middleware para permitir peticiones del frontend |
| **File System (fs)** | Almacenamiento persistente en archivo JSON |

### Base de datos

No se usa MySQL ni MongoDB. En su lugar, se utiliza un **archivo JSON local** (`backend/data/db.json`) que persiste los datos entre reinicios del servidor.

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado en tu computador:

- **Node.js** (versión 18 o superior)
  - Descargar desde: [https://nodejs.org](https://nodejs.org)
- **npm** (viene incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)
- Un navegador web moderno (Chrome, Firefox, Edge)

Para verificar que Node.js y npm están instalados correctamente:

```bash
node --version
npm --version
```

---

## Instalación paso a paso

### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/tu-usuario/app_pedidos.git
cd app_pedidos
```

Si no tienes Git, descarga el ZIP desde GitHub y extráelo.

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

Abre una **nueva terminal** (sin cerrar la anterior) y ejecuta:

```bash
cd frontend
npm install
```

### 4. Ejecutar el backend

En la terminal del backend:

```bash
cd backend
npm run dev
```

El backend se iniciará en `http://localhost:4000`.

Verás este mensaje en la terminal:

```
Backend corriendo en http://localhost:4000
Documentación Swagger: http://localhost:4000/api-docs
```

### 5. Ejecutar el frontend

En la terminal del frontend:

```bash
cd frontend
npm run dev
```

El frontend se iniciará en `http://localhost:3001` y se abrirá automáticamente en tu navegador.

### 6. Abrir la aplicación

Ve a tu navegador y abre:

```
http://localhost:3001
```

### 7. Abrir la documentación Swagger

En otra pestaña del navegador:

```
http://localhost:4000/api-docs
```

---

## Estructura de carpetas (explicada)

```
app_pedidos/
│
├── backend/                        # Servidor API REST
│   ├── controllers/
│   │   └── pedidoController.js     # Lógica CRUD + métricas
│   ├── routes/
│   │   └── pedidoRoutes.js         # Definición de rutas + docs Swagger
│   ├── data/
│   │   └── db.json                 # Archivo JSON como base de datos
│   ├── swagger/
│   │   └── swagger.js              # Configuración de Swagger
│   ├── server.js                   # Punto de entrada del servidor
│   └── package.json                # Dependencias del backend
│
├── frontend/                       # Aplicación React
│   ├── public/                     # Archivos estáticos
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Barra de navegación
│   │   │   ├── PedidoForm.jsx      # Formulario de registro de pedidos
│   │   │   ├── KanbanBoard.jsx     # Tablero Kanban (DragDropContext)
│   │   │   ├── KanbanColumn.jsx    # Columna del Kanban (Droppable)
│   │   │   ├── KanbanCard.jsx      # Tarjeta del Kanban (Draggable)
│   │   │   ├── Modal.jsx           # Modal reutilizable
│   │   │   └── CrearPedidoModal.jsx # Modal con formulario de creación
│   │   ├── context/
│   │   │   └── PedidoContext.jsx   # Contexto global + Provider
│   │   ├── pages/
│   │   │   ├── Inicio.jsx          # Página de inicio (hero + kanban)
│   │   │   ├── Pedidos.jsx         # Tabla de pedidos con acciones
│   │   │   └── Metricas.jsx        # Dashboard con gráficos de ventas
│   │   ├── services/
│   │   │   └── pedidoService.js    # Llamadas Axios al backend
│   │   ├── reducer/
│   │   │   └── pedidoReducer.js    # Reducer para CRUD
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx       # Configuración de rutas
│   │   ├── App.jsx                 # Componente principal
│   │   ├── App.css                 # Estilos globales
│   │   └── main.jsx                # Punto de entrada React
│   ├── index.html                  # HTML principal
│   ├── vite.config.js              # Configuración de Vite
│   └── package.json                # Dependencias del frontend
│
├── .gitignore                      # Archivos ignorados por Git
└── README.md                       # Esta documentación
```

---

## Rutas de la aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Hero, Kanban con drag & drop, feature cards |
| `/pedidos` | Pedidos | Tabla con todos los pedidos y acciones CRUD |
| `/metricas` | Métricas | Dashboard con gráficos de ventas por mes y top productos |

---

## API REST — Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/pedidos` | Obtener todos los pedidos |
| GET | `/pedidos/metricas` | Obtener métricas (ventas del mes, producto top, ventas por mes, top 5 productos) |
| POST | `/pedidos` | Crear un nuevo pedido |
| PUT | `/pedidos/:id` | Actualizar el estado de un pedido |
| DELETE | `/pedidos/:id` | Eliminar un pedido |

Documentación interactiva disponible en `http://localhost:4000/api-docs`.

---

## Funcionalidades destacadas

### Tablero Kanban con Drag & Drop

La página de inicio muestra un tablero con tres columnas (Pendiente, En proceso, Entregado). Las tarjetas de pedidos se pueden **arrastrar y soltar** entre columnas para cambiar su estado, lo que actualiza automáticamente el backend.

### Dashboard de Métricas

La página de Métricas muestra:

- **Ventas del mes**: suma total de `cantidad × precio` de pedidos entregados en el mes actual
- **Producto más vendido**: producto con mayor cantidad total pedida
- **Total de pedidos**: cantidad total de pedidos registrados
- **Gráfico de barras**: histograma de ventas de los últimos 6 meses
- **Gráfico doughnut**: top 5 productos más vendidos

### Creación de pedidos

Desde la página de inicio, el botón **"Crear Pedido"** abre un modal con un formulario que solicita: nombre del cliente, producto, cantidad y precio unitario. El pedido se crea con estado `Pendiente` y fecha actual.

---

## Flujo de la aplicación

```
1. El usuario abre la aplicación (http://localhost:3001)
         │
2. Ve la página de Inicio: hero + Kanban + feature cards
         │
3. Puede arrastrar tarjetas entre columnas (drag & drop)
         │
4. Puede crear un pedido desde el botón "Crear Pedido" (modal)
         │
5. Navega a "Pedidos" para ver la tabla con acciones
         │
6. En la tabla: Avanzar estado / Eliminar pedido
         │
7. Navega a "Métricas" para ver gráficos de ventas
         │
8. Los datos persisten en db.json al recargar la página
```

---

## Capturas sugeridas para el informe universitario

Para tu informe, se recomienda incluir capturas de:

1. **Pantalla completa**: La aplicación funcionando con frontend y backend
2. **Página de inicio**: La vista `/` con el tablero Kanban
3. **Drag & drop**: Arrastrando una tarjeta entre columnas
4. **Modal de creación**: El formulario dentro del modal
5. **Lista de pedidos**: La tabla en `/pedidos` con precio, total y fecha
6. **Métricas**: Dashboard con gráficos de barras y doughnut
7. **Swagger**: La documentación interactiva en `http://localhost:4000/api-docs`
8. **Código del reducer**: El archivo `pedidoReducer.js`
9. **Código del contexto**: El archivo `PedidoContext.jsx`
10. **Estructura del proyecto**: El árbol de carpetas

---

## Comandos rápidos

```bash
# Iniciar backend (puerto 4000)
cd backend && npm run dev

# Iniciar frontend (puerto 3001)
cd frontend && npm run dev

# Instalar todo (desde la raíz)
cd backend && npm install
cd ../frontend && npm install
```

---

## Solución de problemas

**Error: "port 3000 already in use"**
→ Cambia el puerto en `frontend/vite.config.js`:
```javascript
server: { port: 3001, open: true }
```

**Error: "Cannot connect to backend"**
→ Verifica que el backend esté corriendo en `http://localhost:4000`

**Error: "db.json no such file"**
→ Asegúrate de ejecutar el backend desde la carpeta `backend/`

---

## Licencia

Proyecto académico - Desarrollo de Aplicaciones Web II
