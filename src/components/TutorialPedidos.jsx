import { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  UserCheck, 
  MessageCircle, 
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';

const TutorialPedidos = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      id: 1,
      icon: <Search className="w-8 h-8 text-primary-orange" />,
      title: "1. Explorá nuestro menú",
      description: "Navegá por nuestras categorías: Pollos, Milanesas, Empanadas y más.",
      details: "Usá los filtros para encontrar rápidamente lo que buscás. Cada producto tiene descripción completa y precio actualizado.",
      tip: "💡 Tip: Mirá las promociones especiales en la sección destacada"
    },
    {
      id: 2,
      icon: <Plus className="w-8 h-8 text-primary-orange" />,
      title: "2. Agregá productos al carrito",
      description: "Hacé click en cualquier producto para ver detalles y agregarlo a tu pedido.",
      details: "Podés elegir cantidad, agregar observaciones especiales y ver el total automáticamente.",
      tip: "💡 Tip: El carrito se actualiza en tiempo real con cada producto que agregues"
    },
    {
      id: 3,
      icon: <ShoppingCart className="w-8 h-8 text-primary-orange" />,
      title: "3. Revisá tu pedido",
      description: "En el carrito flotante podés ver todos tus productos, cantidades y total.",
      details: "Modificá cantidades, eliminá productos o agregá observaciones antes de continuar.",
      tip: "💡 Tip: El carrito está siempre visible para que no pierdas el control de tu pedido"
    },
    {
      id: 4,
      icon: <UserCheck className="w-8 h-8 text-primary-orange" />,
      title: "4. Completá tus datos",
      description: "Agregá tu información de contacto y dirección de entrega.",
      details: "Solo necesitamos: nombre, teléfono, dirección y forma de pago preferida.",
      tip: "💡 Tip: Todos tus datos están seguros y solo se usan para el pedido"
    },
    {
      id: 5,
      icon: <MessageCircle className="w-8 h-8 text-primary-orange" />,
      title: "5. Enviá por WhatsApp",
      description: "Tu pedido se formatea automáticamente y se abre WhatsApp.",
      details: "El mensaje incluye todos los productos, cantidades, total, tus datos y forma de pago. ¡Solo envialo!",
      tip: "💡 Tip: Podés revisar el mensaje antes de enviarlo y agregar comentarios adicionales"
    },
    {
      id: 6,
      icon: <CheckCircle className="w-8 h-8 text-primary-green" />,
      title: "6. ¡Confirmación y entrega!",
      description: "Nuestro equipo confirma tu pedido y coordina la entrega.",
      details: "Te contactamos para confirmar detalles, tiempo de entrega y cualquier consulta adicional.",
      tip: "🚀 ¡Listo! Ahora solo queda disfrutar de nuestros productos frescos"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section id="tutorial" className="bg-gradient-to-br from-neutral-light to-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Header del tutorial */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">
            ¿Cómo hacer tu pedido? 🛒
          </h2>
          <p className="text-lg md:text-xl text-neutral-medium max-w-3xl mx-auto">
            Te explicamos paso a paso cómo usar nuestro sistema de pedidos online. 
            <span className="text-primary-red font-semibold"> ¡Es súper fácil y rápido!</span>
          </p>
        </div>

        {/* Vista compacta */}
        {!isExpanded && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-neutral-dark mb-3">
                  Sistema de pedidos inteligente
                </h3>
                <p className="text-neutral-medium mb-4">
                  Navegá por el menú, armá tu carrito, completá tus datos y enviá todo por WhatsApp automáticamente. 
                  <span className="text-primary-red font-semibold"> ¡Sin complicaciones!</span>
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                  <span className="bg-primary-red text-white px-3 py-1 rounded-full text-sm">
                    🔍 Menú interactivo
                  </span>
                  <span className="bg-primary-orange text-white px-3 py-1 rounded-full text-sm">
                    🛒 Carrito inteligente
                  </span>
                  <span className="bg-primary-green text-white px-3 py-1 rounded-full text-sm">
                    📱 WhatsApp directo
                  </span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="bg-gradient-to-r from-primary-red to-primary-orange text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  Ver tutorial completo
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Vista expandida - Tutorial paso a paso */}
        {isExpanded && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Header del tutorial expandido */}
            <div className="bg-gradient-to-r from-primary-red to-primary-orange text-white p-6 md:p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Tutorial paso a paso
                  </h3>
                  <p className="opacity-90">
                    Paso {currentStep + 1} de {steps.length}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white hover:text-primary-orange transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Barra de progreso */}
              <div className="mt-6">
                <div className="bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Contenido del paso actual */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Contenido principal del paso */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-br from-primary-red to-primary-orange p-3 rounded-full">
                      {steps[currentStep].icon}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold text-neutral-dark">
                      {steps[currentStep].title}
                    </h4>
                  </div>
                  
                  <p className="text-lg md:text-xl text-neutral-medium mb-4">
                    {steps[currentStep].description}
                  </p>
                  
                  <p className="text-neutral-medium mb-6 leading-relaxed">
                    {steps[currentStep].details}
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary-orange to-primary-red bg-opacity-10 border-l-4 border-primary-orange p-4 rounded-r-lg">
                    <p className="text-neutral-dark font-medium">
                      {steps[currentStep].tip}
                    </p>
                  </div>
                </div>

                {/* Navegación lateral */}
                <div className="lg:w-80">
                  <h5 className="font-bold text-neutral-dark mb-4">Todos los pasos:</h5>
                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => setCurrentStep(index)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 border-2 ${
                          index === currentStep
                            ? 'bg-gradient-to-r from-primary-red to-primary-orange text-white border-transparent shadow-lg'
                            : index < currentStep
                            ? 'bg-primary-green bg-opacity-10 text-primary-green border-primary-green'
                            : 'bg-gray-50 text-neutral-medium border-gray-200 hover:border-primary-orange'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex-shrink-0 ${
                            index === currentStep ? 'text-white' : 
                            index < currentStep ? 'text-primary-green' : 'text-neutral-medium'
                          }`}>
                            {index < currentStep ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              step.icon
                            )}
                          </div>
                          <span className="font-medium text-sm">
                            {step.title}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controles de navegación */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 text-neutral-medium hover:text-primary-red transition-colors"
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>
                
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep 
                          ? 'bg-primary-red scale-125' 
                          : 'bg-gray-300 hover:bg-primary-orange'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 text-neutral-medium hover:text-primary-red transition-colors"
                  disabled={currentStep === steps.length - 1}
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Call to action final */}
            {currentStep === steps.length - 1 && (
              <div className="bg-gradient-to-r from-primary-green to-primary-orange p-6 md:p-8 text-white text-center">
                <h5 className="text-xl md:text-2xl font-bold mb-3">
                  ¡Perfecto! Ya conocés todo el proceso 🎉
                </h5>
                <p className="mb-6 opacity-90">
                  Ahora podés hacer tu pedido con total confianza. ¡Es súper fácil y rápido!
                </p>
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white text-primary-red font-bold py-3 px-8 rounded-full hover:bg-primary-orange hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  ¡Empezar a pedir ahora! 🛒
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TutorialPedidos;