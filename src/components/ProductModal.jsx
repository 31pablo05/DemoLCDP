import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

const ProductModal = ({ producto, isOpen, onClose }) => {
  const [cantidad, setCantidad] = useState(1);
  const [saborSeleccionado, setSaborSeleccionado] = useState('');
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const { agregarProducto } = useCarrito();

  if (!isOpen || !producto) return null;

  const handleAgregar = () => {
    // Validaciones
    if (producto.sabores && producto.sabores.length > 0 && !saborSeleccionado) {
      alert('Por favor selecciona un sabor');
      return;
    }

    if (producto.tipos && producto.tipos.length > 0 && !tipoSeleccionado) {
      alert('Por favor selecciona un tipo');
      return;
    }

    const productoCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      imagen: producto.imagen,
      cantidad: cantidad,
      unidad: producto.unidad,
      precio: producto.precio,
      categoria: producto.categoria,
      sabor: saborSeleccionado || undefined,
      tipo: tipoSeleccionado || undefined,
    };

    agregarProducto(productoCarrito);
    
    // Resetear modal
    setCantidad(1);
    setSaborSeleccionado('');
    setTipoSeleccionado('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-neutral-dark">{producto.nombre}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Imagen */}
          <div className="mb-4">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-cover rounded-xl"
              onError={(e) => {
                e.target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f4f0e5"/>
                    <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#d84523" text-anchor="middle" dy=".3em">
                      ${producto.nombre}
                    </text>
                  </svg>
                `)}`;
              }}
            />
          </div>

          {/* Descripción */}
          <p className="text-gray-600 mb-4">{producto.descripcion}</p>

          {/* Precio */}
          <div className="mb-6">
            <span className="text-2xl font-bold text-primary-red">
              ${producto.precio.toLocaleString()}
            </span>
            <span className="text-gray-500 ml-2">por {producto.unidad}</span>
          </div>

          {/* Selección de sabor si aplica */}
          {producto.sabores && producto.sabores.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Sabor *
              </label>
              <div className="grid grid-cols-1 gap-2">
                {producto.sabores.map((sabor) => (
                  <button
                    key={sabor}
                    onClick={() => setSaborSeleccionado(sabor)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      saborSeleccionado === sabor
                        ? 'border-primary-red bg-primary-red bg-opacity-10 text-primary-red'
                        : 'border-gray-200 hover:border-primary-red hover:bg-gray-50'
                    }`}
                  >
                    {sabor}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selección de tipo si aplica */}
          {producto.tipos && producto.tipos.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccionar Tipo *
              </label>
              <div className="grid grid-cols-1 gap-2">
                {producto.tipos.map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setTipoSeleccionado(tipo)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      tipoSeleccionado === tipo
                        ? 'border-primary-red bg-primary-red bg-opacity-10 text-primary-red'
                        : 'border-gray-200 hover:border-primary-red hover:bg-gray-50'
                    }`}
                  >
                    {tipo}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de cantidad */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad ({producto.unidad})
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <span className="text-xl font-semibold w-12 text-center">
                {cantidad}
              </span>
              
              <button
                onClick={() => setCantidad(cantidad + 1)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 p-4 bg-neutral-cream rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Subtotal:</span>
              <span className="text-xl font-bold text-primary-red">
                ${(producto.precio * cantidad).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleAgregar}
              className="flex-1 py-3 px-4 bg-primary-red hover:bg-primary-orange-red text-white rounded-xl transition-colors font-semibold"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;