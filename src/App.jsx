import { useState } from 'react';
import { CarritoProvider } from './context/CarritoContext';

// Componentes
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Promociones from './components/Promociones';
import Menu from './components/Menu';
import About from './components/About';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

// Componentes del carrito
import CarritoFlotante from './components/CarritoFlotante';
import CarritoModal from './components/CarritoModal';
import FormularioCliente from './components/FormularioCliente';

function App() {
  // Estados para controlar los modales
  const [carritoModalAbierto, setCarritoModalAbierto] = useState(false);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  // Funciones para manejar la navegación entre modales
  const handleAbrirCarrito = () => {
    setCarritoModalAbierto(true);
  };

  const handleCerrarCarrito = () => {
    setCarritoModalAbierto(false);
  };

  const handleContinuarPedido = () => {
    setCarritoModalAbierto(false);
    setFormularioAbierto(true);
  };

  const handleVolverAlCarrito = () => {
    setFormularioAbierto(false);
    setCarritoModalAbierto(true);
  };

  const handleCerrarFormulario = () => {
    setFormularioAbierto(false);
  };

  return (
    <CarritoProvider>
      <div className="App">
        {/* Navegación */}
        <Navbar onCarritoClick={handleAbrirCarrito} />

        {/* Contenido principal */}
        <main>
          <Hero />
          <Promociones />
          <Menu />
          <About />
          <Contacto />
        </main>

        {/* Footer */}
        <Footer />

        {/* Carrito flotante */}
        <CarritoFlotante onClick={handleAbrirCarrito} />

        {/* Modales */}
        <CarritoModal
          isOpen={carritoModalAbierto}
          onClose={handleCerrarCarrito}
          onContinuar={handleContinuarPedido}
        />

        <FormularioCliente
          isOpen={formularioAbierto}
          onClose={handleCerrarFormulario}
          onVolver={handleVolverAlCarrito}
        />
      </div>
    </CarritoProvider>
  );
}

export default App;
