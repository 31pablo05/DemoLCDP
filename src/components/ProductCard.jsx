import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ producto, onProductClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
      onClick={() => onProductClick(producto)}
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden h-48 bg-neutral-cream">
        <img
          src={producto.imagen}
          alt={producto.nombre}
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
            <p className="font-semibold text-sm">{producto.nombre}</p>
          </div>
        </div>
        
        {/* Indicador de promoción si aplica */}
        {producto.enPromocion && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary-red text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              PROMOCIÓN
            </span>
          </div>
        )}

        {/* Overlay con botón */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button className="bg-primary-red text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-neutral-dark mb-2 line-clamp-1">
          {producto.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {producto.descripcion}
        </p>

        {/* Información de sabores/tipos si los tiene */}
        {(producto.sabores || producto.tipos) && (
          <div className="mb-3">
            {producto.sabores && (
              <p className="text-xs text-primary-red font-medium">
                Sabores: {producto.sabores.slice(0, 2).join(', ')}
                {producto.sabores.length > 2 && ` +${producto.sabores.length - 2} más`}
              </p>
            )}
            {producto.tipos && (
              <p className="text-xs text-primary-orange font-medium">
                Tipos: {producto.tipos.slice(0, 2).join(', ')}
                {producto.tipos.length > 2 && ` +${producto.tipos.length - 2} más`}
              </p>
            )}
          </div>
        )}

        {/* Precio */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary-red">
              ${producto.precio.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              por {producto.unidad}
            </span>
          </div>
          
          {/* Indicador de frescura */}
          <div className="flex flex-col items-end">
            <span className="text-xs text-green-600 font-semibold">
              ✅ Fresco
            </span>
            <span className="text-xs text-gray-500">
              Calidad garantizada
            </span>
          </div>
        </div>

        {/* Botón de acción */}
        <button className="w-full mt-4 bg-primary-red hover:bg-primary-orange-red text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
          Seleccionar Opciones
        </button>
      </div>
    </div>
  );
};

export default ProductCard;