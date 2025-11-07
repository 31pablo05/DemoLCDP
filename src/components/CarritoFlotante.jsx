import { ShoppingCart } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

const CarritoFlotante = ({ onClick }) => {
  const { carrito } = useCarrito();

  // No mostrar si el carrito está vacío
  if (carrito.cantidadItems === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-primary-red hover:bg-primary-orange-red text-white p-4 rounded-full shadow-2xl hover:shadow-primary-red/25 transition-all duration-300 transform hover:scale-110 animate-bounce-soft"
    >
      {/* Icono del carrito */}
      <ShoppingCart className="w-6 h-6" />
      
      {/* Badge con cantidad */}
      <span className="absolute -top-2 -right-2 bg-primary-orange text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
        {carrito.cantidadItems > 99 ? '99+' : carrito.cantidadItems}
      </span>
      
      {/* Badge con total */}
      <div className="absolute -bottom-2 -left-2 bg-white text-primary-red text-xs font-bold px-2 py-1 rounded-full shadow-lg">
        ${carrito.total.toLocaleString()}
      </div>
    </button>
  );
};

export default CarritoFlotante;