import { Heart, Award, Users, Clock } from 'lucide-react';

const About = () => {
  return (
    <section id="nosotros" className="py-16 bg-gradient-to-br from-neutral-beige to-neutral-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
            🏠 Bienvenidos a La Casa del Pollo
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Los esperamos en casa, atendemos cada necesidad para tu facilidad, solución y rapidez al momento de cocinar
          </p>
        </div>

        {/* Historia y valores principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Imagen/Contenido visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
              <div className="text-center">
                <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl overflow-hidden border-4 border-primary-red">
                  <img 
                    src="/imagenes/logo.svg" 
                    alt="La Casa del Pollo Logo"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-primary-red text-6xl">🐔</span>';
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-neutral-dark mb-4">
                  Nuestra Pasión
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Te ofrecemos productos 100% garantizados y de la mejor calidad para poner en tu mesa. 
                  Cada producto es seleccionado y preparado con el máximo cuidado y dedicación.
                </p>
              </div>
            </div>
          </div>

          {/* Contenido de texto */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-neutral-dark mb-4 flex items-center">
                <Heart className="w-7 h-7 text-primary-red mr-3" />
                Como en Familia
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Acá cada cliente es parte de nuestra familia. Te recibimos con la calidez de un hogar 
                y la dedicación que te merecés.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Cocinar, elegir, compartir. Lo de todos los días puede ser algo especial cuando se hace 
                con tiempo y con cariño.
              </p>
            </div>

            <div className="bg-primary-red text-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                #HechoComoEnCasa
              </h3>
              <p className="leading-relaxed">
                Cada producto que sale de nuestro local lleva el sello de calidad y frescura que nos caracteriza. 
                Trabajamos todos los días para ofrecerte lo mejor.
              </p>
            </div>
          </div>
        </div>

        {/* Valores destacados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary-red" />
            </div>
            <h4 className="text-lg font-bold text-neutral-dark mb-2">Calidad Garantizada</h4>
            <p className="text-gray-600 text-sm">
              Productos frescos y de primera calidad, preparados diariamente con los mejores estándares
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-orange" />
            </div>
            <h4 className="text-lg font-bold text-neutral-dark mb-2">Atención Personalizada</h4>
            <p className="text-gray-600 text-sm">
              Cada cliente recibe un trato especial y asesoramiento para elegir lo mejor para su familia
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary-red" />
            </div>
            <h4 className="text-lg font-bold text-neutral-dark mb-2">Rapidez y Eficiencia</h4>
            <p className="text-gray-600 text-sm">
              Soluciones rápidas para tu día a día, sin comprometer la calidad de nuestros productos
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍗</span>
            </div>
            <h4 className="text-lg font-bold text-neutral-dark mb-2">Variedad Completa</h4>
            <p className="text-gray-600 text-sm">
              Amplia gama de productos y cortes para satisfacer todos los gustos y necesidades
            </p>
          </div>
        </div>

        {/* Compromiso con la comunidad */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <h3 className="text-3xl font-bold text-neutral-dark mb-6">
                Nuestro Compromiso con Trelew
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌟</span>
                  <div>
                    <h4 className="font-semibold text-neutral-dark">Productos Locales</h4>
                    <p className="text-gray-600 text-sm">
                      Trabajamos con proveedores de la región para apoyar la economía local
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <h4 className="font-semibold text-neutral-dark">Delivery Propio</h4>
                    <p className="text-gray-600 text-sm">
                      Llegamos a todos los barrios de Trelew con nuestro servicio de entrega
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">💚</span>
                  <div>
                    <h4 className="font-semibold text-neutral-dark">Responsabilidad</h4>
                    <p className="text-gray-600 text-sm">
                      Cuidamos el medio ambiente y practicamos la sustentabilidad en nuestro trabajo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="inline-block bg-gradient-to-br from-primary-red to-primary-orange text-white rounded-2xl p-8">
                <h4 className="text-2xl font-bold mb-4">📱 ¿Tenés alguna consulta?</h4>
                <p className="mb-6">
                  Nuestro equipo está listo para ayudarte con lo que necesites
                </p>
                <button
                  onClick={() => window.open('https://wa.me/5492804123456?text=Hola! Tengo una consulta sobre sus productos', '_blank')}
                  className="bg-white text-primary-red font-bold py-3 px-6 rounded-full hover:bg-neutral-cream transition-colors"
                >
                  Consultanos por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hashtags y mensaje final */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {['#hechocomoencasa', '#casadelpollo', '#productosfrescos', '#trelew', '#chubut'].map((hashtag) => (
              <span
                key={hashtag}
                className="bg-primary-red text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                {hashtag}
              </span>
            ))}
          </div>
          <p className="text-gray-600 text-lg">
            <strong>La Casa del Pollo</strong> - Donde la calidad y el sabor se encuentran en casa
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;