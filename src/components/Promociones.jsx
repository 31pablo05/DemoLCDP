import { Star, ShoppingCart, Clock } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

const Promociones = () => {
  const { agregarProducto } = useCarrito();

  // Datos de ejemplo de promociones
  const promociones = [
    {
      id: 'promo-1',
      nombre: 'Combo Familiar Completo',
      descripcion: 'Pollo parrillero + 2kg pata muslo + 1kg milanesas',
      precio: 15990,
      precioOriginal: 18500,
      imagen: '/imagenes/combo-familiar.jpg',
      etiqueta: 'MÁS VENDIDO',
      descuento: '15%',
      unidad: 'combo',
      categoria: 'combos'
    },
    {
      id: 'promo-2',
      nombre: 'Pack Milanesas Premium',
      descripcion: '3kg milanesas rebozadas con avena y semillas',
      precio: 12800,
      precioOriginal: 15000,
      imagen: '/imagenes/milanesas-premium.jpg',
      etiqueta: 'PROMOCIÓN',
      descuento: '15%',
      unidad: 'pack',
      categoria: 'milanesas'
    },
    {
      id: 'promo-3',
      nombre: 'Arrollados Mix',
      descripcion: '4 arrollados: 2 jamón y queso + 2 ciruela',
      precio: 8990,
      precioOriginal: 10500,
      imagen: '/imagenes/arrollados-mix.jpg',
      etiqueta: 'OFERTA',
      descuento: '15%',
      unidad: 'pack',
      categoria: 'arrollados'
    },
    {
      id: 'promo-4',
      nombre: 'Super Pack Nuggets',
      descripcion: '2kg nuggets caseros premium para toda la familia',
      precio: 7200,
      precioOriginal: 8500,
      imagen: '/imagenes/nuggets-pack.jpg',
      etiqueta: 'ESPECIAL',
      descuento: '15%',
      unidad: 'pack',
      categoria: 'nuggets'
    }
  ];

  const handleAgregarAlCarrito = (promocion) => {
    const producto = {
      id: promocion.id,
      nombre: promocion.nombre,
      imagen: promocion.imagen,
      cantidad: 1,
      unidad: promocion.unidad,
      precio: promocion.precio,
      categoria: promocion.categoria,
      esPromocion: true
    };

    agregarProducto(producto);
    
    // Mostrar notificación (opcional)
    // Puedes agregar una notificación toast aquí
  };

  return (
    <section id="promociones" className="py-16 bg-gradient-to-br from-neutral-cream to-neutral-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            🔥 Promociones Especiales
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Los mejores combos y ofertas para que disfrutes productos frescos y de calidad al mejor precio
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Clock className="w-5 h-5 text-primary-red" />
            <span className="text-primary-red font-semibold">Promociones válidas por tiempo limitado</span>
          </div>
        </div>

        {/* Grid de promociones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {promociones.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Imagen del producto */}
              <div className="relative overflow-hidden">
                <img
                  src={promo.imagen}
                  alt={promo.nombre}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#f4f0e5"/>
                        <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#d84523" text-anchor="middle" dy=".3em">
                          ${promo.nombre}
                        </text>
                      </svg>
                    `)}`;
                  }}
                />
                
                {/* Etiqueta de promoción */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary-red text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    {promo.etiqueta}
                  </span>
                </div>

                {/* Descuento */}
                <div className="absolute top-3 right-3">
                  <span className="bg-primary-orange text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg">
                    -{promo.descuento}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-neutral-dark mb-2">
                  {promo.nombre}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {promo.descripcion}
                </p>

                {/* Precios */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-primary-red">
                      ${promo.precio.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${promo.precioOriginal.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">por {promo.unidad}</p>
                    <p className="text-xs text-green-600 font-semibold">
                      Ahorrás ${(promo.precioOriginal - promo.precio).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Botón agregar al carrito */}
                <button
                  onClick={() => handleAgregarAlCarrito(promo)}
                  className="w-full bg-primary-red hover:bg-primary-orange-red text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Agregar al Carrito</span>
                </button>

                {/* Información adicional */}
                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-500">
                    ✅ Producto fresco • 🚚 Delivery disponible
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action para ver más */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              const menuElement = document.getElementById('menu');
              if (menuElement) {
                menuElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-to-r from-primary-red to-primary-orange text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary-red/25"
          >
            Ver Menú Completo
          </button>
          <p className="text-gray-600 mt-4">
            Descubrí todos nuestros productos frescos y de calidad
          </p>
        </div>
      </div>
    </section>
  );
};

export default Promociones;