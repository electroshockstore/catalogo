import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={location}>
        <Route path="/" element={<div className="page-transition"><Store /></div>} />
        <Route path="/armatupc/:mode" element={<div className="page-transition"><PCBuilder /></div>} />
        <Route path="/puntos-de-retiro" element={<div className="page-transition"><PuntosRetiro /></div>} />
        <Route path="/pc-builder" element={<div className="page-transition"><PCBuilder /></div>} />
        <Route path="/categoria/:categorySlug" element={<div className="page-transition"><Store /></div>} />
        <Route path="/categoria/:categorySlug/:productSku" element={<div className="page-transition"><ProductDetailPage /></div>} />
        <Route path="/producto/:id" element={<div className="page-transition"><ProductDetailPage /></div>} />
      </Routes>
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
