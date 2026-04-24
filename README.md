# Examen 1 - Programación IV


## Cambios realizados

### Componentes base - src/components/
- `Navbar.jsx` - Barra de navegacion con links a Home y Repuestos
- `Footer.jsx` - Pie de pagina
- `Home.jsx` - Pagina de bienvenida con boton al catalogo
- `CarParts.jsx` - Catalogo de repuestos

### Routing - src/routeTree.jsx
- Rutas configuradas con TanStack Router
- Ruta `/` carga Home
- Ruta `/carparts` carga CarParts

### Consumo de API - src/components/CarParts.jsx
- Fetch a JSONBin con access key desde variable de entorno
- Muestra los articulos de `data.record.articles`
- Paginacion de 10 en 10 con boton "Ver mas"

### Busqueda - src/components/CarParts.jsx
- Filtro por nombre del repuesto con useState

### Estados de UI - src/components/CarParts.jsx
- Loading: mensaje mientras carga
- Error: mensaje y boton de reintentar
- Empty state: mensaje cuando no hay resultados

### Deploy
- Desplegado en Netlify desde la rama `feature/carparts-list`
- Variables de entorno configuradas en Netlify

## Correr localmente
```
npm install
npm run dev
```

