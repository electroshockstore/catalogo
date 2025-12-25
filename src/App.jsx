import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FilterProvider } from "./context/FilterContext";
import { StockProvider } from "./context/StockContext";
import { PCBuilderProvider } from "./context/PCBuilderContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ErrorNotification from "./components/ErrorNotification";
import { useErrorHandler } from "./hooks/useErrorHandler";
import SkipToContent from "./components/SEO/SkipToContent";

// Lazy load de módulos principales
const Store = lazy(() => import("./modules/Store"));
const ProductDetailPage = lazy(() => import("./Modules/ProductDetailPage"));
const PCBuilder = lazy(() => import("./Modules/PCBuilder"));
const PuntosRetiro = lazy(() => import("./Modules/PuntosRetiro"));

// Loading component simple y ligero
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Cargando...</p>
    </div>
  </div>
);

// Animaciones simplificadas para mejor rendimiento
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

function AnimatedRoutes() {
  const location = useLocation();
  
  // Solo animar transiciones entre páginas diferentes (no entre categorías)
  const getRouteKey = (pathname) => {
    if (pathname.includes('/armatupc')) {
      return 'armatupc';
    }
    if (pathname.includes('/puntos-de-retiro')) {
      return 'puntos-retiro';
    }
    if (pathname.includes('/categoria/') && pathname.split('/').length === 4) {
      return 'product-detail'; // Página de detalle de producto
    }
    return 'store'; // Página principal/categorías
  };

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={getRouteKey(location.pathname)}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Store />
              </motion.div>
            }
          />
        <Route
          path="/armatupc/:mode"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PCBuilder />
            </motion.div>
          }
        />
        {/* Ruta de Puntos de Retiro */}
        <Route
          path="/puntos-de-retiro"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PuntosRetiro />
            </motion.div>
          }
        />
        {/* Ruta legacy para compatibilidad */}
        <Route
          path="/pc-builder"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PCBuilder />
            </motion.div>
          }
        />
        <Route
          path="/categoria/:categorySlug"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Store />
            </motion.div>
          }
        />
        <Route
          path="/categoria/:categorySlug/:productSku"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProductDetailPage />
            </motion.div>
          }
        />
        {/* Ruta legacy para compatibilidad */}
        <Route
          path="/producto/:id"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ProductDetailPage />
            </motion.div>
          }
        />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

function AppContent() {
  const { networkError, resourceError, clearErrors } = useErrorHandler();
  
  const handleReload = () => {
    window.location.reload();
  };

  const currentError = networkError || resourceError;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] antialiased">
      {/* Notificación de errores */}
      <ErrorNotification 
        error={currentError}
        onClose={clearErrors}
        onReload={handleReload}
      />
      
      <main id="main-content" className="relative z-10 w-full">
        <AnimatedRoutes />
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <StockProvider>
        <FilterProvider>
          <PCBuilderProvider>
            <Router basename="/">
              <SkipToContent />
              <AppContent />
            </Router>
          </PCBuilderProvider>
        </FilterProvider>
      </StockProvider>
    </ErrorBoundary>
  );
}

export default App;
