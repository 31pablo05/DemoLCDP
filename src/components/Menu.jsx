import { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

// Datos de productos - movidos fuera del componente para evitar recreación
const productos = [
  // Pata Muslo
  {
    id: 'pata-muslo-1',
    nombre: 'Pata Muslo Fresco',
    descripcion: 'Pata muslo de pollo fresco, ideal para guisos, al horno o parrilla. Producto de primera calidad.',
    precio: 2800,
    unidad: 'kg',
    categoria: 'pata-muslo',
    imagen: '/imagenes/heladera2.jpg',
    enPromocion: false
  },

  // Pechugas
  {
    id: 'pechuga-1',
    nombre: 'Pechuga Sin Hueso',
    descripcion: 'Pechuga de pollo sin hueso, perfecta para milanesas, al horno o plancha. Corte premium.',
    precio: 4200,
    unidad: 'kg',
    categoria: 'pechugas',
    imagen: '/imagenes/pechuga.jpg',
    enPromocion: false
  },

  // Hamburguesas
  {
    id: 'hamburguesa-1',
    nombre: 'Hamburguesas de Pollo',
    descripcion: 'Hamburguesas caseras de pollo, hechas con carne fresca y condimentos especiales.',
    precio: 800,
    unidad: 'unidad',
    categoria: 'hamburguesas',
    imagen: '/imagenes/heladera7.jpg',
    sabores: ['Clásica', 'Especiada', 'Con Hierbas', 'Criolla'],
    enPromocion: true
  },

  // Arrollados
  {
    id: 'arrollado-1',
    nombre: 'Arrollados de Pollo',
    descripcion: 'Arrollados de pollo rellenos, preparados artesanalmente con ingredientes frescos.',
    precio: 2200,
    unidad: 'unidad',
    categoria: 'arrollados',
    imagen: '/imagenes/heladera3.jpg',
    sabores: ['Jamón y Queso', 'Ciruela', 'Verdeo y Queso', 'Ananá', 'Jamón Crudo y Rúcula'],
    enPromocion: false
  },

  // Nuggets
  {
    id: 'nuggets-1',
    nombre: 'Nuggets Caseros',
    descripcion: 'Nuggets de pollo caseros, rebozados y listos para freír. Ideales para chicos y grandes.',
    precio: 3600,
    unidad: 'kg',
    categoria: 'nuggets',
    imagen: '/imagenes/nuggets.jpg',
    enPromocion: false
  },

  // Pollos Parrilleros
  {
    id: 'pollo-parrillero-1',
    nombre: 'Pollo Parrillero Entero',
    descripcion: 'Pollo parrillero entero, fresco y listo para cocinar. Peso aproximado 2-2.5kg.',
    precio: 6500,
    unidad: 'unidad',
    categoria: 'parrilleros',
    imagen: '/imagenes/pollo-entero.jpg',
    enPromocion: false
  },

  // Milanesas Rellenas
  {
    id: 'milanesa-rellena-1',
    nombre: 'Milanesas Rellenas',
    descripcion: 'Milanesas de pollo rellenas con jamón y queso, rebozadas y listas para cocinar.',
    precio: 4800,
    unidad: 'kg',
    categoria: 'milanesas-rellenas',
    imagen: '/imagenes/heladera8.jpg',
    tipos: ['Jamón y Queso', 'Verdura', 'Caprese'],
    enPromocion: false
  },

  // Milanesas Clásicas
  {
    id: 'milanesa-clasica-1',
    nombre: 'Milanesas Clásicas',
    descripcion: 'Milanesas de pollo clásicas, rebozadas con pan rallado o avena según tu preferencia.',
    precio: 4200,
    unidad: 'kg',
    categoria: 'milanesas-clasicas',
    imagen: '/imagenes/heladera6.jpg',
    tipos: ['Pata Muslo', 'Pechuga'],
    sabores: ['Pan Rallado', 'Avena y Semillas'],
    enPromocion: false
  },

  // Combos
  {
    id: 'combo-1',
    nombre: 'Combo Familiar',
    descripcion: 'Combo perfecto para la familia: pollo entero + 2kg pata muslo + 1kg milanesas.',
    precio: 15990,
    unidad: 'combo',
    categoria: 'combos',
    imagen: '/imagenes/combo-familiar.jpg',
    enPromocion: true
  },

  {
    id: 'combo-2',
    nombre: 'Combo Parrilla',
    descripcion: 'Para tu asado: 3kg pata muslo + 2kg pechuga + chorizo de pollo.',
    precio: 18500,
    unidad: 'combo',
    categoria: 'combos',
    imagen: '/imagenes/combo-parrilla.jpg',
    enPromocion: false
  }
];

// Categorías para el filtro - movidas fuera del componente
const categorias = [
  { id: 'todos', nombre: 'Todos los Productos', icono: '🍗' },
  { id: 'pata-muslo', nombre: 'Pata Muslo', icono: '🍖' },
  { id: 'pechugas', nombre: 'Pechugas', icono: '🥩' },
  { id: 'hamburguesas', nombre: 'Hamburguesas', icono: '🍔' },
  { id: 'arrollados', nombre: 'Arrollados', icono: '🌯' },
  { id: 'nuggets', nombre: 'Nuggets', icono: '🍿' },
  { id: 'parrilleros', nombre: 'Pollos Parrilleros', icono: '🐔' },
  { id: 'milanesas-rellenas', nombre: 'Milanesas Rellenas', icono: '🥪' },
  { id: 'milanesas-clasicas', nombre: 'Milanesas Clásicas', icono: '🍽️' },
  { id: 'combos', nombre: 'Combos Especiales', icono: '📦' }
];

const Menu = () => {
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Filtrar productos por categoría
  const productosFiltrados = categoriaActiva === 'todos' 
    ? productos 
    : productos.filter(producto => producto.categoria === categoriaActiva);

  const handleProductClick = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  return (
    <section id="menu" className="py-16 bg-gradient-to-br from-neutral-dark to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🍗 Nuestro Menú
          </h2>
          <p className="text-lg md:text-xl text-neutral-cream max-w-3xl mx-auto">
            Productos frescos y de la mejor calidad. Todos nuestros productos son preparados diariamente 
            con los más altos estándares de higiene y frescura.
          </p>
        </div>

        {/* Filtros de categorías */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaActiva(categoria.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  categoriaActiva === categoria.id
                    ? 'bg-primary-red text-white shadow-lg shadow-primary-red/25'
                    : 'bg-white bg-opacity-10 text-neutral-cream border border-neutral-cream border-opacity-30 hover:bg-primary-red hover:text-white hover:border-primary-red'
                }`}
              >
                <span className="mr-2">{categoria.icono}</span>
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Información importante */}
        <div className="bg-gradient-to-r from-primary-red to-primary-orange rounded-2xl p-6 mb-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">✅</span>
              <h3 className="font-semibold text-white">Productos Frescos</h3>
              <p className="text-sm text-neutral-cream opacity-90">Preparados diariamente con la mejor calidad</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">🏠</span>
              <h3 className="font-semibold text-white">Hecho como en Casa</h3>
              <p className="text-sm text-neutral-cream opacity-90">Productos artesanales con recetas tradicionales</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">🚚</span>
              <h3 className="font-semibold text-white">Delivery Disponible</h3>
              <p className="text-sm text-neutral-cream opacity-90">Llevamos tu pedido a tu casa</p>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onProductClick={handleProductClick}
            />
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {productosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-cream text-lg">
              No hay productos disponibles en esta categoría
            </p>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-orange to-primary-red text-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">🔥 ¿No encontrás lo que buscás?</h3>
            <p className="text-lg mb-6 text-neutral-cream">
              Contamos con más productos y cortes especiales. ¡Consultanos por WhatsApp!
            </p>
            <button
              onClick={() => window.open('https://wa.me/5492804123456?text=Hola! Me gustaría consultar por productos especiales', '_blank')}
              className="bg-white text-primary-red font-bold py-3 px-8 rounded-full hover:bg-neutral-cream transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Consultar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Modal de producto */}
      <ProductModal
        producto={productoSeleccionado}
        isOpen={modalAbierto}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Menu;