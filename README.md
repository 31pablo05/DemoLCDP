# 🐔 La Casa del Pollo - Demo Web Application

Una aplicación web moderna y funcional para "La Casa del Pollo", un local gastronómico especializado en productos de pollo frescos y de calidad en Trelew, Chubut, Argentina.

## 🌟 Características Principales

### 💻 Stack Tecnológico
- **Framework**: React 18 con Vite
- **Estilos**: Tailwind CSS + CSS personalizado
- **Lenguaje**: JavaScript con JSX
- **Tipo**: Single Page Application (SPA) con navegación por scroll
- **Estado**: React Context para manejo del carrito
- **Persistencia**: localStorage para mantener el carrito
- **Iconos**: Lucide React

### 🎨 Diseño y UX
- **Responsive Design**: Optimizado para móvil, tablet y desktop
- **Paleta de colores**: Colores de marca (#d84523, #fbf7f4, #ff7d1d, #171717, #f4f0e5, #fd440e)
- **Animaciones suaves**: Transiciones y efectos hover
- **Accesibilidad**: Navegación por teclado y focus visible

## 🏗️ Estructura de Componentes

### 📱 Componentes Principales

#### `Navbar.jsx`
- Navegación fija con efecto scroll
- Logo interactivo
- Carrito con badge de cantidad
- Menú móvil responsivo

#### `Hero.jsx`
- Carrusel de imágenes/videos con auto-play
- Logo y información principal
- Call-to-action destacado
- Información de contacto rápida

#### `Promociones.jsx`
- Grid de promociones especiales
- Cards con hover effects
- Precios destacados con descuentos
- Integración directa con carrito

#### `Menu.jsx` (COMPONENTE CRÍTICO)
- Filtros por categorías de productos
- ProductCard con información detallada
- ProductModal para selección de opciones
- Manejo de variantes (sabores, tipos, cantidades)

#### `CarritoFlotante.jsx`
- Botón flotante en esquina inferior derecha
- Badge animado con cantidad y total
- Acceso rápido al carrito

#### `CarritoModal.jsx`
- Vista completa del carrito
- Modificación de cantidades
- Eliminación de productos
- Resumen detallado del pedido

#### `FormularioCliente.jsx` (COMPONENTE CRÍTICO)
- Formulario completo de datos del cliente
- Selección de tipo de entrega (retiro/delivery)
- Método de pago (efectivo/transferencia)
- Validaciones completas
- Integración con WhatsApp

### 🛒 Sistema de Carrito

#### Estado del Carrito
```javascript
{
  productos: [
    {
      id: string,
      nombre: string,
      imagen: string,
      cantidad: number,
      unidad: 'kg' | 'unidad',
      precio: number,
      categoria: string,
      sabor?: string,
      tipo?: string,
      subtotal: number
    }
  ],
  total: number,
  cantidadItems: number
}
```

#### Funcionalidades
- ✅ Agregar productos con opciones
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Persistencia en localStorage
- ✅ Cálculo automático de totales

## 📱 Integración con WhatsApp (FUNCIONALIDAD PRINCIPAL)

### Flujo de Pedido
1. **Selección de productos** → Carrito
2. **Revisión del carrito** → Formulario de cliente
3. **Datos completos** → Generación de mensaje
4. **Redirección automática** → WhatsApp

### Formato del Mensaje
```
🐔 *NUEVO PEDIDO - LA CASA DEL POLLO*

👤 *Cliente:* [Nombre del cliente]
📱 *Celular:* [Número de celular]

📦 *DETALLE DEL PEDIDO:*
━━━━━━━━━━━━━━━━
- [Cantidad] [Unidad] - [Nombre del Producto]
  [Si tiene sabor: Sabor: [sabor]]
  💰 $[subtotal]

━━━━━━━━━━━━━━━━
💵 *TOTAL: $[Total General]*

🚚 *TIPO DE ENTREGA:*
[Retiro en local / Delivery]

💳 *MÉTODO DE PAGO:*
[Efectivo / Transferencia]

━━━━━━━━━━━━━━━━
_Pedido realizado desde lacasadelpollo.com.ar_
```

## 🗂️ Categorías de Productos

### Productos Disponibles
- 🍖 **Pata Muslo** - Por kg
- 🥩 **Pechugas** - Por kg  
- 🍔 **Hamburguesas de Pollo** - Por unidad (4 sabores)
- 🌯 **Arrollados** - Por unidad (5 sabores)
- 🍿 **Nuggets** - Por kg
- 🐔 **Pollos Parrilleros** - Por unidad
- 🥪 **Milanesas Rellenas** - Por kg (3 tipos)
- 🍽️ **Milanesas Clásicas** - Por kg (tipos y rebozados)
- 📦 **Combos Especiales** - Por combo

### Opciones de Personalización
- **Sabores**: Para hamburguesas, arrollados, etc.
- **Tipos**: Para milanesas (pata muslo, pechuga)
- **Rebozados**: Pan rallado, avena y semillas
- **Cantidades**: kg, unidades según el producto

## 🏢 Información del Negocio

### Ubicaciones
- **Sucursal Centro**: Av. Yrigoyen 923, Trelew
- **Sucursal Norte**: Musters 1938, Trelew

### Horarios
- **Lunes a Viernes**: 9:00 a 21:00 hs
- **Sábados**: 9:00 a 14:00 hs
- **Domingos**: Cerrado

### Servicios
- 🏪 **Retiro en local**: Sin costo adicional
- 🚚 **Delivery propio**: Gratis en compras +$15.000
- 💵 **Efectivo**: Pago al recibir
- 💳 **Transferencia**: Datos enviados por WhatsApp

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar repositorio
git clone [URL_DEL_REPO]

# Navegar al directorio
cd DemoLCDP

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Vista previa del build
npm run lint     # Linter ESLint
```

## ⚙️ Configuración

### Número de WhatsApp
El número de WhatsApp está configurado en el contexto del carrito. Para cambiarlo:

```javascript
// En src/context/CarritoContext.jsx
const enviarPedidoWhatsApp = (datosCliente, numeroWhatsApp = "5492804123456") => {
  // Cambiar el número aquí
}
```

### Colores de Marca
Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    red: '#d84523',      // Rojo principal
    orange: '#ff7d1d',   // Naranja vibrante
    'orange-red': '#fd440e', // Naranja rojizo
  },
  neutral: {
    cream: '#fbf7f4',    // Crema claro
    beige: '#f4f0e5',    // Beige
    dark: '#171717',     // Negro oscuro
    black: '#000000',    // Negro
  }
}
```

## 📂 Estructura de Archivos

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Promociones.jsx
│   ├── Menu.jsx
│   ├── ProductCard.jsx
│   ├── ProductModal.jsx
│   ├── CarritoFlotante.jsx
│   ├── CarritoModal.jsx
│   ├── FormularioCliente.jsx
│   ├── About.jsx
│   ├── Contacto.jsx
│   └── Footer.jsx
├── context/
│   └── CarritoContext.jsx
├── App.jsx
├── main.jsx
├── index.css
└── App.css

public/
├── imagenes/
└── videos/
```

## 🎯 Funcionalidades Clave

### ✅ Implementadas
- [x] Carrito completo con persistencia
- [x] Sistema de productos con variantes
- [x] Formulario de cliente con validaciones
- [x] Integración completa con WhatsApp
- [x] Diseño responsivo
- [x] Navegación suave por scroll
- [x] Animaciones y transiciones
- [x] Información completa del negocio

### 🔄 Mejoras Futuras Posibles
- [ ] Sistema de autenticación
- [ ] Panel de administración
- [ ] Integración con API de pagos
- [ ] Sistema de notificaciones
- [ ] Analytics y métricas
- [ ] Chat en vivo
- [ ] Sistema de reviews

## 🛠️ Tecnologías y Dependencias

### Dependencias Principales
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "framer-motion": "^10.18.0",
  "lucide-react": "^0.536.0",
  "react-icons": "^4.12.0"
}
```

### Dependencias de Desarrollo
```json
{
  "@vitejs/plugin-react": "^4.4.1",
  "tailwindcss": "^3.4.18",
  "autoprefixer": "^10.4.21",
  "postcss": "^8.5.6",
  "eslint": "^9.25.0"
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Adaptaciones
- Menú hamburguesa en móvil
- Grid responsivo para productos
- Carrito flotante adaptado
- Formularios optimizados para touch

## 🔧 Personalización

### Agregar Nuevos Productos
1. Editar el array `productos` en `Menu.jsx`
2. Seguir la estructura de datos establecida
3. Agregar imágenes en `public/imagenes/`

### Modificar Estilos
1. Colores: `tailwind.config.js`
2. Estilos personalizados: `src/index.css`
3. Componentes: CSS modules o Tailwind classes

### Cambiar Textos
Todos los textos están hardcodeados en los componentes para facilitar la personalización directa.

## 📞 Información de Contacto

**La Casa del Pollo**
- 📍 Av. Yrigoyen 923, Trelew, Chubut
- 📍 Musters 1938, Trelew, Chubut  
- 📱 WhatsApp: +54 9 280 4123456
- 📧 Instagram: @lacasadelpollo_trelew

## 📄 Licencia

Este proyecto es un demo/portfolio desarrollado para fines educativos y de demostración.

## 🏷️ Tags

`#hechocomoencasa` `#casadelpollo` `#productosfrescos` `#trelew` `#chubut` `#react` `#tailwind` `#whatsapp` `#ecommerce` `#delivery`

---

**Desarrollado con ❤️ para La Casa del Pollo**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
