import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, AlertCircle, CreditCard, MapPin, Clock, Package, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    icon: AlertCircle,
    title: "IMPORTANTE",
    items: [
      { text: "NO PERMUTO. Transferencias menores a $100.000 tienen recargo.", highlight: true },
      { text: "Efectivo o Transferencias inmediatas, ni lo intenten estafadores conozco todas.", highlight: false }
    ],
    bgGradient: "from-red-600 via-red-700 to-rose-900"
  },
  {
     id: 2,
    icon: Package,
    title: "CONDICIONES DE VENTA",
    items: [
      { text: "NO TENGO LOCAL SOY PARTICULAR", highlight: true },
         { text: "No hago facturas ni tengo garantía escrita.", highlight: true },
            { text: "Todos los productos estan sellados de fabrica. Por Cierre de local", highlight: true },
      { text: "Si se quiere abrir producto , se paga antes por seguridad", highlight: true }
    ],
    bgGradient: "from-orange-600 to-orange-800"
  },
  {
    id: 3,
    icon: MapPin,
    title: "RETIRO Y HORARIOS",
    items: [
      { text: "Punto de retiro:  Berazategui : AV Mitre y AV 14 , 16:00hs ", highlight: false },
       { text: "Punto de retiro:  Cruce Florencio Varela : Puerta Bingo (bz cruce) 16:30hs.", highlight: false },
      { text: "Fines de semana: Solo en zonas Florencio Varela todo el día.", highlight: false },
      { text: "No viajo a otro lado, solo tengo esos horarios por falta de tiempo.", highlight: true }
    ],
    bgGradient: "from-blue-600 via-blue-700 to-indigo-900"
  },
  {
    id: 4,
    icon: CreditCard,
    title: "FORMAS DE PAGO",
    items: [
      { text: "Transferencias bancarias EN EL MOMENTO DE IMPACTO (recargo en montos menores a $100.000)", highlight: false },
      { text: "Efectivo contra entrega", highlight: false },
      { text: "Se revisa producto se paga y se entrega.", highlight: false }
    ],
    bgGradient: "from-green-600 via-emerald-700 to-teal-900"
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const current = slides[currentSlide];
  const Icon = current.icon;

  return (
    <div className="w-full mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8">
      {/* Logo Section with Enhanced Animation */}
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }}
        className="flex justify-center mb-8 sm:mb-12 relative"
      >
        <div className="relative group">
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src="/logotipo.png" 
              alt="Electro Shock Logo" 
              className="h-28 sm:h-36 md:h-44 lg:h-52 object-contain drop-shadow-2xl relative z-10"
            />
          </motion.div>
          
          {/* Glow effect behind logo */}
          <motion.div
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-blue-500 blur-3xl opacity-50 -z-10"
          />
        </div>
      </motion.div>

      <div 
        className="relative overflow-hidden rounded-3xl shadow-2xl"
        onMouseEnter={() => {
          setIsPaused(true);
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsHovering(false);
        }}
      >
        {/* Enhanced background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95" />
        
        <div className="relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 250, damping: 25 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              className={`bg-gradient-to-br ${current.bgGradient}`}
            >
              {/* Animated mesh gradient overlay */}
              <motion.div 
                className="absolute inset-0"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              {/* Modern geometric pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full">
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 text-white">
                {/* Enhanced Title with Icon - Compact Version */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(255,255,255,0.3)',
                        '0 0 40px rgba(255,255,255,0.5)',
                        '0 0 20px rgba(255,255,255,0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-white/25 backdrop-blur-md p-2 sm:p-3 rounded-xl shadow-2xl border border-white/20"
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                  </motion.div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-200 drop-shadow-2xl">
                      {current.title}
                    </span>
                  </h2>
                </motion.div>

                {/* Enhanced Content Card */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/98 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 w-full max-w-4xl shadow-2xl border border-white/20 relative overflow-hidden"
                >
                  <ul className="space-y-2 sm:space-y-2.5 relative z-10">
                    {current.items.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                          stiffness: 120
                        }}
                        whileHover={{ 
                          x: 8,
                          transition: { duration: 0.2 }
                        }}
                        className={`flex items-start gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg transition-all duration-300 ${
                          item.highlight 
                            ? 'bg-red-50 border-2 border-red-200 text-red-800 font-bold shadow-md' 
                            : 'bg-gray-50 border border-gray-200 text-gray-800 font-semibold hover:bg-blue-50 hover:border-blue-200'
                        }`}
                      >
                        <motion.span 
                          animate={item.highlight ? { 
                            scale: [1, 1.15, 1],
                            rotate: [0, 5, -5, 0]
                          } : {}}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                          className={`text-xl sm:text-2xl flex-shrink-0 ${
                            item.highlight ? 'text-red-600' : 'text-emerald-600'
                          }`}
                        >
                          {item.highlight ? '⚠️' : '✓'}
                        </motion.span>
                        <span className={`leading-snug text-xs sm:text-sm md:text-base ${
                          item.highlight ? 'font-bold' : 'font-semibold'
                        }`}>
                          {item.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.15, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-md p-3 sm:p-4 rounded-full transition-all duration-300 z-20 shadow-2xl border border-white/30 group"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-100" strokeWidth={3} />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.15, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/60 backdrop-blur-md p-3 sm:p-4 rounded-full transition-all duration-300 z-20 shadow-2xl border border-white/30 group"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-gray-100" strokeWidth={3} />
        </motion.button>

        {/* Enhanced Dots Indicator */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-md px-3 py-2 rounded-full border border-white/20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              className={`transition-all duration-300 rounded-full shadow-lg ${
                index === currentSlide
                  ? 'bg-white w-8 sm:w-10 h-3 sm:h-3.5'
                  : 'bg-white/50 w-3 sm:w-3.5 h-3 sm:h-3.5 hover:bg-white/75'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-white/80"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? `${(currentSlide / slides.length) * 100}%` : "100%" }}
          transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
          key={currentSlide}
        />
      </div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 sm:mt-14 text-center px-4"
      >
        <motion.h3 
          className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 relative inline-block"
          whileHover={{ scale: 1.05 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            ¡Explorá Nuestros Productos!
          </span>
          <motion.div
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
          />
        </motion.h3>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto">
          Seleccioná una categoría arriba para ver nuestro catálogo completo
        </p>
      </motion.div>
    </div>
  );
};

export default HeroCarousel;