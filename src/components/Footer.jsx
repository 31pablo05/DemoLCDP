import { MapPin, Phone, Clock, Instagram, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  const anioActual = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const enlacesRapidos = [
    { id: 'hero', label: 'Inicio' },
    { id: 'promociones', label: 'Promociones' },
    { id: 'menu', label: 'Menú' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'contacto', label: 'Contacto' }
  ];

  const hashtags = [
    '#hechocomoencasa',
    '#casadelpollo',
    '#productosfrescos',
    '#trelew',
    '#chubut'
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-dark to-black text-white">
      
      {/* Sección principal del footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-lg border-2 border-gray-100">
                <img 
                  src="/imagenes/logo.svg" 
                  alt="La Casa del Pollo Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-primary-red text-2xl">🐔</span>';
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">La Casa del Pollo</h3>
                <p className="text-sm text-gray-300">Productos frescos</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Los esperamos en casa, donde cada cliente es parte de nuestra familia. 
              Productos 100% frescos y de la mejor calidad para tu mesa.
            </p>
            
            {/* Hashtags */}
            <div className="flex flex-wrap gap-2">
              {hashtags.map((hashtag) => (
                <span
                  key={hashtag}
                  className="bg-primary-red bg-opacity-20 text-primary-orange text-xs px-2 py-1 rounded-full"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {enlacesRapidos.map((enlace) => (
                <li key={enlace.id}>
                  <button
                    onClick={() => scrollToSection(enlace.id)}
                    className="text-gray-300 hover:text-primary-orange transition-colors text-sm block w-full text-left"
                  >
                    {enlace.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              
              {/* Sucursales */}
              <div>
                <div className="flex items-start space-x-3 mb-2">
                  <MapPin className="w-4 h-4 text-primary-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300">Av. Yrigoyen 923, Trelew</p>
                    <p className="text-sm text-gray-300">Musters 1938, Trelew</p>
                  </div>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-orange flex-shrink-0" />
                <p className="text-sm text-gray-300">(0280) 4123456</p>
              </div>

              {/* Horarios */}
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-primary-orange mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">Lun-Vie: 9:00-21:00</p>
                  <p className="text-sm text-gray-300">Sáb: 9:00-14:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Redes sociales y servicios */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Seguinos</h4>
            
            {/* Redes sociales */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => window.open('https://instagram.com/lacasadelpollo_trelew', '_blank')}
                className="flex items-center space-x-3 text-gray-300 hover:text-primary-orange transition-colors w-full text-left"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@lacasadelpollo_trelew</span>
              </button>
              
              <button
                onClick={() => window.open('https://wa.me/5492804123456', '_blank')}
                className="flex items-center space-x-3 text-gray-300 hover:text-primary-orange transition-colors w-full text-left"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">WhatsApp Pedidos</span>
              </button>
            </div>

            {/* Servicios */}
            <div>
              <h5 className="text-sm font-semibold text-gray-200 mb-3">Nuestros Servicios</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>🏪 Retiro en local</li>
                <li>🚚 Delivery propio</li>
                <li>💵 Pago en efectivo</li>
                <li>💳 Transferencia bancaria</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-primary-red bg-opacity-10 border-t border-primary-red border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">¿Listo para hacer tu pedido?</h4>
            <p className="text-gray-300 mb-6">
              Contactanos por WhatsApp y te ayudamos con todo lo que necesites
            </p>
            <button
              onClick={() => window.open('https://wa.me/5492804123456?text=Hola! Me gustaría hacer un pedido', '_blank')}
              className="bg-primary-red hover:bg-primary-orange-red text-white font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Hacer Pedido por WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© {anioActual} La Casa del Pollo. Todos los derechos reservados.</span>
              <Heart className="w-4 h-4 text-primary-red" />
            </div>

            {/* Créditos */}
            <div className="text-sm text-gray-500">
              <span>Hecho con </span>
              <Heart className="w-4 h-4 text-primary-red inline" />
              <span> en Trelew, Chubut</span>
            </div>
          </div>

          {/* Información legal */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-500">
              La Casa del Pollo se compromete a ofrecer productos frescos y de calidad. 
              Los precios pueden variar según disponibilidad y están sujetos a cambios sin previo aviso.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;