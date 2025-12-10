import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Store from "./modules/Store";
import ProductDetailPage from "./Modules/ProductDetailPage";
import { FilterProvider } from "./context/FilterContext";
import { StockProvider } from "./context/StockContext";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
  );
}

function App() {
  return (
    <StockProvider>
      <FilterProvider>
        <Router basename="/">
          <div className="min-h-screen bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1] antialiased">
            <main className="relative z-10 w-full">
              <AnimatedRoutes />
            </main>
          </div>
        </Router>
      </FilterProvider>
    </StockProvider>
  );
}

export default App;
