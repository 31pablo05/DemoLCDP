import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

const Navbar = ({ onCarritoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { carrito } = useCarrito();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'promociones', label: 'Promociones' },
    { id: 'menu', label: 'Menú' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-2 group"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-red rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg md:text-xl">🐔</span>
              </div>
              <div className={`${isScrolled ? 'text-neutral-dark' : 'text-white'} transition-colors`}>
                <h1 className="text-lg md:text-xl font-bold">La Casa del Pollo</h1>
                <p className="text-xs md:text-sm opacity-80">Productos frescos</p>
              </div>
            </button>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm lg:text-base font-medium transition-all duration-200 hover:scale-105 ${
                  isScrolled 
                    ? 'text-neutral-dark hover:text-primary-red' 
                    : 'text-white hover:text-primary-orange'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Carrito y Menú Móvil */}
          <div className="flex items-center space-x-4">
            {/* Botón Carrito */}
            <button
              onClick={onCarritoClick}
              className={`relative p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                isScrolled 
                  ? 'text-neutral-dark hover:bg-neutral-cream' 
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {carrito.cantidadItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-soft">
                  {carrito.cantidadItems > 99 ? '99+' : carrito.cantidadItems}
                </span>
              )}
            </button>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-all duration-200 ${
                isScrolled 
                  ? 'text-neutral-dark hover:bg-neutral-cream' 
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-neutral-dark hover:text-primary-red hover:bg-neutral-cream rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;