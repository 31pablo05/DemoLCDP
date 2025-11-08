import { useState } from 'react';
import { CarritoProvider } from './context/CarritoContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Promociones from './components/Promociones';
import TutorialPedidos from './components/TutorialPedidos';
import Menu from './components/Menu';
import About from './components/About';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import CarritoModal from './components/CarritoModal';
import CarritoFlotante from './components/CarritoFlotante';
import FormularioCliente from './components/FormularioCliente';

function App() {
  const [carritoModalOpen, setCarritoModalOpen] = useState(false);
  const [formularioClienteOpen, setFormularioClienteOpen] = useState(false);

  const handleAbrirCarrito = () => {
    setCarritoModalOpen(true);
  };

  const handleCerrarCarrito = () => {
    setCarritoModalOpen(false);
  };

  const handleContinuarCompra = () => {
    setCarritoModalOpen(false);
    setFormularioClienteOpen(true);
  };

  const handleCerrarFormulario = () => {
    setFormularioClienteOpen(false);
  };

  return (
    <CarritoProvider>
      <div className="App">
        <Navbar onCarritoClick={handleAbrirCarrito} />
        <Hero />
        <Promociones />
        <TutorialPedidos />
        <Menu />
        <About />
        <Contacto />
        <Footer />
        
        {/* Carrito flotante */}
        <CarritoFlotante onClick={handleAbrirCarrito} />
        
        {/* Modales */}
        <CarritoModal 
          isOpen={carritoModalOpen}
          onClose={handleCerrarCarrito}
          onContinuar={handleContinuarCompra}
        />
        
        <FormularioCliente
          isOpen={formularioClienteOpen}
          onClose={handleCerrarFormulario}
        />
      </div>
    </CarritoProvider>
  );
}

export default App;
