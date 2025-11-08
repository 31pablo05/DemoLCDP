import { Star, ShoppingCart, Clock } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

// Datos de ejemplo de promociones - movido fuera del componente para evitar recreación
const promociones = [
  {
    id: 'promo-1',
    nombre: 'Promo Hamburguesas Parrilleras',
    descripcion: '10 hamburguesas parrilleras por solo $13.999',
    precio: 13999,
    precioOriginal: 16000,
    imagen: '/imagenes/promo1.jpg',
    etiqueta: 'SUPER PROMO',
    descuento: '13%',
    unidad: 'pack 10u',
    categoria: 'hamburguesas'
  },
  {
    id: 'promo-2',
    nombre: 'Promo Pata Muslo',
    descripcion: '3kg de pata muslo fresco por solo $10.999',
    precio: 10999,
    precioOriginal: 12600,
    imagen: '/imagenes/promo2.jpg',
    etiqueta: 'OFERTA',
    descuento: '13%',
    unidad: 'pack 3kg',
    categoria: 'pata-muslo'
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

const Promociones = () => {
  const { agregarProducto } = useCarrito();

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
          <div className="relative overflow-hidden h-48 bg-neutral-cream">
            <img
              src={promo.imagen}
              alt={promo.nombre}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            {/* Placeholder cuando falla la imagen */}
            <div className="w-full h-48 bg-neutral-cream flex items-center justify-center text-neutral-dark hidden">
              <div className="text-center">
                <span className="text-4xl mb-2 block">🐔</span>
                <p className="font-semibold text-sm">{promo.nombre}</p>
              </div>
            </div>                {/* Etiqueta de promoción */}
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

        {/* Sección de formas de pago y descuentos */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/imagenes/publi7.png" 
                alt="Descuentos especiales"
                className="w-12 h-12 md:w-16 md:h-16 object-contain mr-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'inline';
                }}
              />
              <span className="text-4xl hidden">💰</span>
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-dark">
                ¡Más Descuentos para Vos!
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elegí tu forma de pago favorita y ahorrá aún más en todos nuestros productos
            </p>
          </div>

          {/* Grid de formas de pago */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Efectivo - 10% */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600">
                <img
                  src="/imagenes/ahorro1.jpg"
                  alt="Descuento 10% en efectivo - Todos los días abona en efectivo y llevate un 10% de ahorro en tu compra"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Placeholder cuando falla la imagen */}
                <div className="w-full h-80 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white hidden">
                  <div className="text-center p-8">
                    <span className="text-8xl mb-6 block">💵</span>
                    <h4 className="text-3xl font-bold mb-4">10% OFF</h4>
                    <p className="text-lg">Todos los días</p>
                    <p className="text-lg">Abona en efectivo</p>
                    <p className="text-lg">y llevate un 10% de ahorro</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transferencia - 5% */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600">
                <img
                  src="/imagenes/ahorro2.jpg"
                  alt="Descuento 5% transferencia - Abona via transferencia y llevate 5% de ahorro en tu compra"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Placeholder cuando falla la imagen */}
                <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white hidden">
                  <div className="text-center p-8">
                    <span className="text-8xl mb-6 block">💳</span>
                    <h4 className="text-3xl font-bold mb-4">5% OFF</h4>
                    <p className="text-lg">Abona via transferencia</p>
                    <p className="text-lg">y llevate 5% de ahorro</p>
                    <p className="text-lg">en tu compra</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jubilados - 15% */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border-2 border-primary-orange">
              <div className="relative overflow-hidden bg-gradient-to-br from-primary-orange to-primary-red">
                <img
                  src="/imagenes/ahorro3.jpg"
                  alt="Descuento 15% jubilados - Jubilados y pensionados todos los dias 15% descuento en efectivo"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                {/* Placeholder cuando falla la imagen */}
                <div className="w-full h-80 bg-gradient-to-br from-primary-orange to-primary-red flex items-center justify-center text-white hidden">
                  <div className="text-center p-8">
                    <span className="text-8xl mb-6 block">👴</span>
                    <h4 className="text-3xl font-bold mb-4">15% OFF</h4>
                    <p className="text-lg">Jubilados y pensionados</p>
                    <p className="text-lg">todos los días</p>
                    <p className="text-lg">15% descuento en efectivo</p>
                  </div>
                </div>

                {/* Badge especial destacado */}
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-black text-sm font-bold px-3 py-2 rounded-full shadow-lg animate-bounce">
                    ⭐ ESPECIAL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional sobre descuentos */}
          <div className="mt-8 bg-gradient-to-r from-neutral-dark to-black text-white rounded-2xl p-6">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-3">📋 Información Importante sobre Descuentos</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="block font-semibold text-primary-orange mb-1">💡 Acumulables</span>
                  <span className="text-neutral-cream">Los descuentos NO se acumulan entre sí</span>
                </div>
                <div>
                  <span className="block font-semibold text-primary-orange mb-1">🕒 Vigencia</span>
                  <span className="text-neutral-cream">Válidos todos los días de atención</span>
                </div>
                <div>
                  <span className="block font-semibold text-primary-orange mb-1">📞 Consultas</span>
                  <span className="text-neutral-cream">Preguntá por descuentos especiales</span>
                </div>
              </div>
            </div>
          </div>
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