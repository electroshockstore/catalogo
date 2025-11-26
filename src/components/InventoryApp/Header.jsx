// Header negro con buscador centrado - Responsive
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search, FileText, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStock } from '../../context/StockContext';

const Header = ({ searchQuery, onSearchChange }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const { products } = useStock();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim().length >= 3) {
      const query = searchQuery.toLowerCase();
      const results = products
        .filter(product =>
          product.name?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.model?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query)
        )
        .slice(0, 5);
      setSearchResults(results);
      setIsSearchOpen(results.length > 0);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/producto/${productId}`);
    onSearchChange('');
    setIsSearchOpen(false);
  };

  const handleClearSearch = () => {
    onSearchChange('');
    setIsSearchOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800">
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4">
        {/* Layout mobile: vertical */}
        <div className="flex flex-col gap-3 sm:hidden">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img 
                src="/logotipo.png" 
                alt="Shock-Store Logo" 
                className="h-14 w-auto object-contain"
              />
              <div>
                <h1 className="text-lg font-black text-white leading-tight">Shock-Store</h1>
                <h2 className="text-xs font-semibold text-blue-400">Catálogo</h2>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="p-2.5 bg-gray-900 hover:bg-gray-800 
                         border border-gray-700 hover:border-blue-500
                         rounded-full text-white
                         transition-all duration-200"
                aria-label="Condiciones de Venta"
              >
                <FileText className="h-4 w-4" strokeWidth={2.5} />
              </button>
              
              <button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 
                         rounded-full text-white
                         transition-all duration-200"
                aria-label="Puntos de Retiro"
              >
                <MapPin className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full h-10 pl-10 pr-10 text-sm
                       bg-gray-900 border border-gray-800 rounded-full 
                       text-white placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            <AnimatePresence>
              {isSearchOpen && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {searchResults.map((product) => (
                    <motion.button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-800 transition-colors text-left"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : null}
                        {!product.image && (
                          <Package className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.brand}</p>
                      </div>
                      <div className="text-sm font-bold text-green-400">
                        ${product.price.toLocaleString()}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Layout desktop: horizontal */}
        <div className="hidden sm:flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img 
              src="/logotipo.png" 
              alt="Shock-Store Logo" 
              className="h-12 w-auto object-contain"
            />
            <div>
              <h1 className="text-2xl font-black text-white leading-tight">Shock-Store</h1>
              <h2 className="text-sm font-semibold text-blue-400">Catálogo</h2>
            </div>
          </div>

          {/* Buscador centrado */}
          <div className="flex-1 max-w-2xl" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos, marcas o categorías..."
                className="w-full h-12 pl-12 pr-12 
                         bg-gray-900 border border-gray-800 rounded-full 
                         text-white placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              
              <AnimatePresence>
                {isSearchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    {searchResults.map((product) => (
                      <motion.button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-800 transition-colors text-left border-b border-gray-800 last:border-b-0"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-16 h-16 bg-gray-800 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : null}
                          {!product.image && (
                            <Package className="w-8 h-8 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-white truncate">{product.name}</p>
                          <p className="text-sm text-gray-400">{product.brand} • {product.category}</p>
                        </div>
                        <div className="text-lg font-bold text-green-400">
                          ${product.price.toLocaleString()}
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2.5 
                       bg-gray-900 hover:bg-gray-800 
                       border border-gray-700 hover:border-blue-500
                       rounded-full text-white font-semibold text-sm
                       transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <FileText className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden lg:inline">Condiciones de Venta</span>
            </button>
            
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="flex items-center gap-2 px-4 py-2.5 
                       bg-blue-600 hover:bg-blue-700 
                       rounded-full text-white font-semibold text-sm
                       transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <MapPin className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden lg:inline">Puntos de Retiro</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
