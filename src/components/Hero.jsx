import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Phone } from 'lucide-react';

// Datos del carrusel - movido fuera del componente para evitar recreación
const slides = [
  {
    id: 1,
    tipo: 'imagen',
    src: '/imagenes/localyrigoyen.jpg',
    alt: 'Productos frescos de pollo',
    titulo: 'Productos 100% Frescos',
    subtitulo: 'De la mejor calidad para tu mesa'
  },
  {
    id: 2,
    tipo: 'imagen', 
    src: '/imagenes/localyrigoyen2.jpg',
    alt: 'Promociones especiales',
    titulo: 'Promociones Especiales',
    subtitulo: 'Los mejores precios de Trelew'
  },
  {
    id: 3,
    tipo: 'imagen',
    src: '/imagenes/heladera1.jpg',
    alt: 'Nuestro local',
    titulo: 'Te Esperamos en Casa',
    subtitulo: 'Atención personalizada y familiar'
  },
  {
    id: 4,
    tipo: 'video',
    src: '/videos/videolocal1.mp4',
    alt: 'Video del local',
    titulo: 'Conocé Nuestro Local',
    subtitulo: 'Calidad y frescura garantizada'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState({});
  const [scrollY, setScrollY] = useState(0);

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []); // Removida la dependencia slides.length

  // Efecto parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    console.log('Next slide clicked - current:', currentSlide);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    console.log('Prev slide clicked - current:', currentSlide);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoLoad = (slideId) => {
    setVideoLoaded(prev => ({ ...prev, [slideId]: true }));
  };

  // Efecto parallax - el fondo se mueve más lento que el scroll
  const parallaxOffset = scrollY * 0.5;

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Carrusel con efecto parallax */}
      <div 
        className="relative h-full"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
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
                className="w-full h-full object-cover scale-110"
                onError={(e) => {
                  // Fallback simple para evitar loop infinito
                  e.target.style.display = 'none';
                  e.target.parentElement.style.background = 'linear-gradient(135deg, #d84523 0%, #ff7d1d 100%)';
                }}
              />
            ) : (
              <div className="relative w-full h-full">
                {/* Preloader para video */}
                {!videoLoaded[slide.id] && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-red to-primary-orange flex items-center justify-center z-10">
                    <div className="text-center text-white">
                      <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-lg font-semibold">Cargando video...</p>
                      <p className="text-sm opacity-80">🎬 Conocé nuestro local</p>
                    </div>
                  </div>
                )}
                
                <video
                  src={slide.src}
                  className="w-full h-full object-cover scale-110"
                  autoPlay
                  muted
                  loop
                  onLoadedData={() => handleVideoLoad(slide.id)}
                  onError={(e) => {
                    // Fallback simple para evitar loop infinito
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #d84523 0%, #ff7d1d 100%)';
                  }}
                />
              </div>
            )}
          </div>
        ))}

        {/* Overlay oscuro con efecto parallax inverso */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-20 md:bg-opacity-40"
          style={{ transform: `translateY(${-parallaxOffset * 0.3}px)` }}
        ></div>
      </div>

      {/* Controles del carrusel - Fuera del parallax para que funcionen */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-orange transition-all duration-300 p-3 md:p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm z-40 border border-white border-opacity-20 hover:border-primary-orange"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary-orange transition-all duration-300 p-3 md:p-4 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 backdrop-blur-sm z-40 border border-white border-opacity-20 hover:border-primary-orange"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Indicadores - Fuera del parallax */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-primary-orange scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Contenido principal con efecto parallax sutil */}
      <div 
        className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-20"
        style={{ transform: `translateY(${-parallaxOffset * 0.2}px)` }}
      >
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
          {/* Logo principal con animación de entrada */}
          <div className="space-y-2 md:space-y-4 animate-fade-in">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl transform transition-all duration-700"
              style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
            >
              La Casa del Pollo
            </h1>
            
            <p 
              className="text-sm sm:text-base md:text-xl lg:text-2xl text-neutral-cream font-light drop-shadow-lg transform transition-all duration-700"
              style={{ transform: `translateY(${-scrollY * 0.15}px)` }}
            >
              {slides[currentSlide]?.titulo}
            </p>
            
            <p 
              className="text-xs sm:text-sm md:text-lg lg:text-xl text-white opacity-90 drop-shadow-lg transform transition-all duration-700"
              style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
            >
              {slides[currentSlide]?.subtitulo}
            </p>
          </div>

          {/* Call to Action con parallax */}
          <div 
            className="space-y-4 md:space-y-6 animate-fade-in transform transition-all duration-700"
            style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
          >
            <button
              onClick={scrollToMenu}
              className="bg-primary-red hover:bg-primary-orange-red text-white font-bold py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-12 rounded-full text-sm md:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary-red/25"
            >
              Ver Menú Completo
            </button>
          </div>

          {/* Información de contacto rápida con parallax más sutil */}
          <div 
            className="hidden md:grid md:grid-cols-3 gap-6 mt-8 lg:mt-12 text-center transform transition-all duration-700"
            style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
          >
            <div className="flex flex-col items-center space-y-2">
              <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-primary-orange" />
              <p className="text-xs lg:text-sm font-semibold">Horarios</p>
              <p className="text-xs opacity-90">Lun-Vie: 9:00-21:00</p>
              <p className="text-xs opacity-90">Sáb: 9:00-14:00</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <MapPin className="w-5 h-5 lg:w-6 lg:h-6 text-primary-orange" />
              <p className="text-xs lg:text-sm font-semibold">Ubicaciones</p>
              <p className="text-xs opacity-90">Av. Yrigoyen 923</p>
              <p className="text-xs opacity-90">Musters 1938</p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-primary-orange" />
              <p className="text-xs lg:text-sm font-semibold">Servicios</p>
              <p className="text-xs opacity-90">Retiro en local</p>
              <p className="text-xs opacity-90">Delivery propio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;