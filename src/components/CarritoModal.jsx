import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

const CarritoModal = ({ isOpen, onClose, onContinuar }) => {
  const { carrito, actualizarCantidad, eliminarProducto, limpiarCarrito } = useCarrito();

  if (!isOpen) return null;

  const handleCantidadChange = (producto, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarProducto(producto);
    } else {
      actualizarCantidad(producto, nuevaCantidad);
    }
  };

  const handleEliminarProducto = (producto) => {
    eliminarProducto(producto);
  };

  const handleContinuar = () => {
    onContinuar();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-neutral-cream">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-red rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-dark">Tu Carrito</h2>
                <p className="text-sm text-gray-600">
                  {carrito.cantidadItems} {carrito.cantidadItems === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {carrito.productos.length === 0 ? (
            // Carrito vacío
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 mb-6">Agregá productos frescos y deliciosos de nuestro menú</p>
              <button
                onClick={() => {
                  onClose();
                  const menuElement = document.getElementById('menu');
                  if (menuElement) {
                    menuElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-primary-red text-white font-semibold py-2 px-6 rounded-xl hover:bg-primary-orange-red transition-colors"
              >
                Ver Menú
              </button>
            </div>
          ) : (
            // Lista de productos
            <div className="p-6 space-y-4">
              {carrito.productos.map((producto, index) => (
                <div
                  key={`${producto.id}-${producto.sabor}-${producto.tipo}-${index}`}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {/* Imagen del producto */}
                  <div className="flex-shrink-0">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#f4f0e5"/>
                            <text x="50%" y="50%" font-family="Arial" font-size="8" fill="#d84523" text-anchor="middle" dy=".3em">
                              ${producto.nombre.slice(0, 10)}
                            </text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-neutral-dark truncate">
                      {producto.nombre}
                    </h4>
                    
                    {/* Mostrar sabor y tipo si existen */}
                    {(producto.sabor || producto.tipo) && (
                      <div className="text-xs text-gray-600 mt-1">
                        {producto.sabor && <span>Sabor: {producto.sabor}</span>}
                        {producto.sabor && producto.tipo && <span> • </span>}
                        {producto.tipo && <span>Tipo: {producto.tipo}</span>}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-600">
                        ${producto.precio.toLocaleString()} / {producto.unidad}
                      </span>
                      <span className="text-sm font-semibold text-primary-red">
                        ${producto.subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCantidadChange(producto, producto.cantidad - 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-8 text-center font-semibold">
                      {producto.cantidad}
                    </span>
                    
                    <button
                      onClick={() => handleCantidadChange(producto, producto.cantidad + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => handleEliminarProducto(producto)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con resumen y acciones */}
        {carrito.productos.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-white">
            {/* Resumen del pedido */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${carrito.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-primary-red">
                <span>Total:</span>
                <span>${carrito.total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                * Los precios pueden variar según disponibilidad
              </p>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <button
                onClick={handleContinuar}
                className="w-full bg-primary-red hover:bg-primary-orange-red text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Continuar con el Pedido</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Seguir Comprando
                </button>
                
                <button
                  onClick={() => {
                    if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
                      limpiarCarrito();
                    }
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>

            {/* Información adicional */}
            <div className="mt-4 p-3 bg-neutral-cream rounded-xl">
              <p className="text-xs text-center text-gray-600">
                🔒 Datos seguros • 🚚 Delivery gratis en pedidos +$15.000 • 📱 Pagá al recibir
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoModal;