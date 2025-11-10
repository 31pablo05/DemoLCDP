import { MapPin, Clock, Phone, Instagram, MessageCircle } from 'lucide-react';

const Contacto = () => {
  const sucursales = [
    {
      id: 1,
      nombre: 'Sucursal Centro',
      direccion: 'Av. Yrigoyen 923',
      ciudad: 'Trelew, Chubut',
      telefono: '(0280) 4123456',
      horarios: {
        lunesViernes: '9:00 - 21:00 hs',
        sabado: '9:00 - 14:00 hs',
        domingo: 'Cerrado'
      },
      maps: 'https://maps.google.com/?q=Av.+Yrigoyen+923,+Trelew',
      destacada: true
    },
    {
      id: 2,
      nombre: 'Sucursal Norte',
      direccion: 'Musters 1938',
      ciudad: 'Trelew, Chubut',
      telefono: '(0280) 4789012',
      horarios: {
        lunesViernes: '9:00 - 21:00 hs',
        sabado: '9:00 - 14:00 hs',
        domingo: 'Cerrado'
      },
      maps: 'https://maps.google.com/?q=Musters+1938,+Trelew',
      destacada: false
    }
  ];

  const redesSociales = [
    {
      nombre: 'Instagram',
      usuario: '@casadelpolloar',
      url: 'https://www.instagram.com/casadelpolloar/',
      icono: Instagram,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      nombre: 'WhatsApp',
      usuario: 'Pedidos y consultas',
      url: 'https://wa.me/5492804123456',
      icono: MessageCircle,
      color: 'bg-green-500'
    }
  ];

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
            📍 ¿Dónde nos encontrás?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Visitanos en cualquiera de nuestras dos sucursales en Trelew. Te esperamos con los mejores productos frescos.
          </p>
        </div>

        {/* Sucursales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {sucursales.map((sucursal) => (
            <div
              key={sucursal.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                sucursal.destacada ? 'ring-2 ring-primary-red' : ''
              }`}
            >
              {sucursal.destacada && (
                <div className="bg-primary-red text-white text-center py-2 text-sm font-semibold">
                  ⭐ SUCURSAL PRINCIPAL
                </div>
              )}
              
              <div className="p-8">
                {/* Header de la sucursal */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-dark mb-2">
                      {sucursal.nombre}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-2 text-primary-red" />
                      <span>{sucursal.direccion}</span>
                    </div>
                    <p className="text-gray-500 ml-7">{sucursal.ciudad}</p>
                  </div>
                  
                  <button
                    onClick={() => window.open(sucursal.maps, '_blank')}
                    className="bg-primary-red hover:bg-primary-orange-red text-white p-3 rounded-full transition-colors shadow-lg"
                  >
                    <MapPin className="w-6 h-6" />
                  </button>
                </div>

                {/* Información de contacto */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary-orange" />
                    <span className="text-gray-700">{sucursal.telefono}</span>
                  </div>
                </div>

                {/* Horarios */}
                <div className="bg-neutral-cream rounded-xl p-4">
                  <h4 className="font-semibold text-neutral-dark mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary-red" />
                    Horarios de Atención
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lunes a Viernes:</span>
                      <span className="font-semibold text-neutral-dark">{sucursal.horarios.lunesViernes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sábados:</span>
                      <span className="font-semibold text-neutral-dark">{sucursal.horarios.sabado}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Domingos:</span>
                      <span className="font-semibold text-red-600">{sucursal.horarios.domingo}</span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => window.open(sucursal.maps, '_blank')}
                    className="flex-1 bg-primary-red hover:bg-primary-orange-red text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Ver en Mapa
                  </button>
                  <button
                    onClick={() => window.open(`tel:${sucursal.telefono}`, '_self')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors"
                  >
                    Llamar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mapa integrado */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-dark text-center mb-8">
            📍 Nuestras Ubicaciones
          </h3>
          
          {/* Mapa de Google Maps embebido */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2944.7234567890123!2d-65.3058!3d-43.2481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzUzLjIiUyA2NcKwMTgnMjEuMCJX!5e0!3m2!1ses!2sar!4v1699999999999!5m2!1ses!2sar"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de La Casa del Pollo - Trelew"
              className="w-full"
            ></iframe>
          </div>

          {/* Botones para direcciones específicas */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <button
              onClick={() => window.open('https://maps.google.com/?q=Av.+Yrigoyen+923,+Trelew', '_blank')}
              className="bg-primary-red text-white px-6 py-3 rounded-full hover:bg-primary-orange-red transition-colors font-semibold shadow-lg"
            >
              📍 Ver Sucursal Centro - Av. Yrigoyen 923
            </button>
            <button
              onClick={() => window.open('https://maps.google.com/?q=Musters+1938,+Trelew', '_blank')}
              className="bg-primary-orange text-white px-6 py-3 rounded-full hover:bg-primary-orange-red transition-colors font-semibold shadow-lg"
            >
              📍 Ver Sucursal Norte - Musters 1938
            </button>
          </div>
        </div>

        {/* Reseñas de Google */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-neutral-dark text-center mb-8">
            ⭐ Lo que dicen nuestros clientes
          </h3>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src="/imagenes/logo.svg" 
                  alt="La Casa del Pollo"
                  className="w-16 h-16 rounded-full border-2 border-primary-orange mr-4"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-16 h-16 bg-primary-red rounded-full flex items-center justify-center text-white text-2xl font-bold hidden">
                  🐔
                </div>
                <div>
                  <h4 className="text-xl font-bold text-neutral-dark">La Casa del Pollo</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">⭐</span>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">Evaluanos en Google</span>
                  </div>
                  <p className="text-gray-500 text-sm">Pollería · Av. Yrigoyen 923, Trelew</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <a
                  href="https://share.google/bw3gMsjRCBltTFhC9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-semibold"
                >
                  Ver todas las reseñas en Google
                </a>
                <button
                  onClick={() => window.open('https://g.page/r/CQlKJ8Xh5kAGEB0/review', '_blank')}
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors font-semibold"
                >
                  Escribir una reseña
                </button>
              </div>
            </div>

            {/* Reseñas destacadas - Placeholder para reseñas reales */}
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
              <div className="text-6xl mb-4">⭐</div>
              <h4 className="text-xl font-bold text-neutral-dark mb-3">
                Próximamente: Reseñas de Clientes Reales
              </h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Estamos recopilando las mejores reseñas de nuestros clientes para mostrarlas aquí. 
                ¡Tu opinión es muy importante para nosotros!
              </p>
              <a
                href="https://g.page/r/CQlKJ8Xh5kAGEB0/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-red text-white px-6 py-3 rounded-full hover:bg-primary-orange-red transition-colors font-semibold inline-flex items-center gap-2"
              >
                <span>⭐</span>
                Dejá tu reseña en Google
              </a>
            </div>

            {/* Estadísticas de reseñas - Actualizables */}
            <div className="mt-8 bg-gradient-to-r from-primary-red to-primary-orange text-white rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="text-2xl font-bold block">--</span>
                  <span className="text-sm opacity-90">Calificación promedio</span>
                </div>
                <div>
                  <span className="text-2xl font-bold block">--</span>
                  <span className="text-sm opacity-90">Reseñas totales</span>
                </div>
                <div>
                  <span className="text-2xl font-bold block">100%</span>
                  <span className="text-sm opacity-90">Compromiso calidad</span>
                </div>
                <div>
                  <span className="text-2xl font-bold block">12+</span>
                  <span className="text-sm opacity-90">Años de experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Redes sociales y contacto rápido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Redes sociales */}
          <div className="bg-gradient-to-br from-neutral-cream to-neutral-beige rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-dark mb-6 text-center">
              🌟 Seguinos en Redes
            </h3>
            <div className="space-y-4">
              {redesSociales.map((red) => (
                <button
                  key={red.nombre}
                  onClick={() => window.open(red.url, '_blank')}
                  className={`w-full ${red.color} text-white p-4 rounded-xl flex items-center space-x-4 hover:scale-105 transition-transform shadow-lg`}
                >
                  <red.icono className="w-8 h-8" />
                  <div className="text-left">
                    <h4 className="font-semibold">{red.nombre}</h4>
                    <p className="text-sm opacity-90">{red.usuario}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contacto rápido */}
          <div className="bg-primary-red text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              💬 Contacto Rápido
            </h3>
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Para Pedidos y Consultas</h4>
                <p className="text-sm opacity-90 mb-4">
                  Nuestro equipo está listo para atenderte de Lunes a Sábado
                </p>
                <button
                  onClick={() => window.open('https://wa.me/5492804123456?text=Hola! Me gustaría hacer un pedido', '_blank')}
                  className="bg-white text-primary-red font-bold py-3 px-6 rounded-full hover:bg-neutral-cream transition-colors flex items-center space-x-2 mx-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Hacer Pedido por WhatsApp</span>
                </button>
              </div>

              <div className="border-t border-white border-opacity-20 pt-6">
                <h4 className="font-semibold mb-4 text-center">Servicios Disponibles</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <span className="text-xl block mb-1">🏪</span>
                    <span>Retiro en Local</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl block mb-1">🚚</span>
                    <span>Delivery</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl block mb-1">💵</span>
                    <span>Efectivo</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xl block mb-1">💳</span>
                    <span>Transferencia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-neutral-beige rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-neutral-dark mb-4">
            🚚 Información de Delivery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-neutral-dark mb-2">Zona de Cobertura</h4>
              <p className="text-gray-600 text-sm">
                Llegamos a todos los barrios de Trelew y alrededores
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-dark mb-2">Tiempo de Entrega</h4>
              <p className="text-gray-600 text-sm">
                45-60 minutos aproximadamente desde la confirmación del pedido
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-dark mb-2">Envío Gratis</h4>
              <p className="text-gray-600 text-sm">
                En compras superiores a $15.000. Consultar otras zonas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;