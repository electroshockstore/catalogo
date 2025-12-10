import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

const FloatingChatButton = () => {
  const handleClick = () => {
    window.open('https://www.facebook.com/marketplace/item/1354113302740084', '_blank');
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50"
    >
      {/* Main Button - MÁS GRANDE */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="group relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden"
      >
        {/* Animated background shine */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: '50%' }}
        />

        {/* Pulse ring effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 rounded-2xl border-4 border-blue-400"
        />

        {/* Button content - MÁS GRANDE */}
        <div className="relative flex items-center gap-3 px-5 py-4 sm:gap-5 sm:px-10 sm:py-6">
          {/* Icon container with animation */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <MessageCircle className="w-6 h-6 sm:w-9 sm:h-9" strokeWidth={2.5} />
            </div>
            
            {/* Online indicator */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-lg"
            />
          </motion.div>

          {/* Text content */}
          <div className="flex flex-col items-start">
            <span className="text-xs sm:text-base font-semibold text-blue-100 uppercase tracking-wide leading-tight">
              ¿Necesitás ayuda?
            </span>
            <span className="text-sm sm:text-xl font-black text-white leading-tight">
              Chatear con Representante
            </span>
          </div>

          {/* Arrow icon */}
          <motion.div
            animate={{
              x: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="hidden sm:block"
          >
            <Send className="w-6 h-6 text-white/80" strokeWidth={2.5} />
          </motion.div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          animate={{
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </motion.button>

      {/* Floating particles effect */}
      <motion.div
        animate={{
          y: [-20, -40, -20],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-8 right-8 w-2 h-2 bg-blue-400 rounded-full"
      />
      <motion.div
        animate={{
          y: [-15, -35, -15],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute -top-6 right-16 w-1.5 h-1.5 bg-indigo-400 rounded-full"
      />
    </motion.div>
  );
};

export default FloatingChatButton;
