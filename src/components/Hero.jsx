import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Phone } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos del carrusel - aquí puedes reemplazar con imágenes reales
  const slides = [
    {
      id: 1,
      tipo: 'imagen',
      src: '/imagenes/hero-pollo-1.jpg',
      alt: 'Productos frescos de pollo',
      titulo: 'Productos 100% Frescos',
      subtitulo: 'De la mejor calidad para tu mesa'
    },
    {
      id: 2,
      tipo: 'imagen', 
      src: '/imagenes/hero-promociones.jpg',
      alt: 'Promociones especiales',
      titulo: 'Promociones Especiales',
      subtitulo: 'Los mejores precios de Trelew'
    },
    {
      id: 3,
      tipo: 'imagen',
      src: '/imagenes/hero-local.jpg',
      alt: 'Nuestro local',
      titulo: 'Te Esperamos en Casa',
      subtitulo: 'Atención personalizada y familiar'
    },
    {
      id: 4,
      tipo: 'video',
      src: '/videos/presentacion-local.mp4',
      alt: 'Video del local',
      titulo: 'Conocé Nuestro Local',
      subtitulo: 'Calidad y frescura garantizada'
    }
  ];

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Carrusel */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.tipo === 'imagen' ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback a un color de fondo si la imagen no carga
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #d84523 0%, #ff7d1d 100%)';
                }}
              />
            ) : (
              <video
                src={slide.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                onError={(e) => {
                  // Fallback si el video no carga
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #d84523 0%, #ff7d1d 100%)';
                }}
              />
            )}
          </div>
        ))}

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Controles del carrusel */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-orange transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-30"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-orange transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-30"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary-orange scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo principal */}
          <div className="space-y-4 animate-fade-in">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary-red rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <span className="text-4xl md:text-5xl">🐔</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
              La Casa del Pollo
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-cream font-light">
              {slides[currentSlide]?.titulo}
            </p>
            
            <p className="text-lg md:text-xl text-white opacity-90">
              {slides[currentSlide]?.subtitulo}
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-6 animate-fade-in">
            <button
              onClick={scrollToMenu}
              className="bg-primary-red hover:bg-primary-orange-red text-white font-bold py-4 px-8 md:py-5 md:px-12 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary-red/25"
            >
              Ver Menú Completo
            </button>
            
            <p className="text-neutral-cream text-sm md:text-base">
              🏆 Los mejores productos de pollo de Trelew
            </p>
          </div>

          {/* Información de contacto rápida */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Clock className="w-6 h-6 text-primary-orange" />
              <p className="text-sm font-semibold">Horarios</p>
              <p className="text-xs opacity-90">Lun-Vie: 9:00-21:00</p>
              <p className="text-xs opacity-90">Sáb: 9:00-14:00</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <MapPin className="w-6 h-6 text-primary-orange" />
              <p className="text-sm font-semibold">Ubicaciones</p>
              <p className="text-xs opacity-90">Av. Yrigoyen 923</p>
              <p className="text-xs opacity-90">Musters 1938</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <Phone className="w-6 h-6 text-primary-orange" />
              <p className="text-sm font-semibold">Servicios</p>
              <p className="text-xs opacity-90">Retiro en local</p>
              <p className="text-xs opacity-90">Delivery propio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flecha para scroll down */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;