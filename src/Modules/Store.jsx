import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/InventoryApp/Header';
import CategoryFilter from '../components/InventoryApp/CategoryFilter';
import ViewToggleButton from '../components/InventoryApp/ViewToggleButton';
import ProductGrid from '../components/InventoryApp/ProductGrid';
import SidebarFilters from '../components/InventoryApp/SidebarFilters';
import Footer from '../components/InventoryApp/Footer';
import ScrollButton from '../components/InventoryApp/ScrollButton';
import HeroCarousel from '../components/InventoryApp/HeroCarousel';
import PCBuilderSection from '../components/InventoryApp/PCBuilderSection';
import CategoryGrid from '../components/InventoryApp/CategoryGrid';
import FloatingChatButton from '../components/InventoryApp/FloatingChatButton';
import { useFilter } from '../context/FilterContext';
import { getCategoryFromSlug, getSlugFromCategory, generateSKU } from '../utils/slugify';
import { useCategorySEO, useSEO } from '../hooks/useSEO';

const Store = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    subFilters,
    handleSubFilterChange,
    filteredProducts,
    clearSubFilters
  } = useFilter();

  const [viewMode, setViewMode] = useState('grid');

  if (selectedCategory && selectedCategory !== 'Todos') {
    useCategorySEO(selectedCategory, filteredProducts.length);
  } else {
    useSEO({
      title: 'Shock-Store | Catálogo de Venta - Tecnología y Componentes PC',
      description: 'Catálogo completo de productos Shock-Store...',
      keywords: 'shock-store, componentes pc, hardware, gaming',
      type: 'website'
    });
  }

  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryFromSlug(categorySlug);
      if (category && category !== selectedCategory) {
        setSelectedCategory(category);
      }
    }
  }, [categorySlug]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const openProductDetail = (product) => {
    const categorySlug = getSlugFromCategory(product.category);
    const productSku = generateSKU(product.name, product.brand);
    navigate(`/categoria/${categorySlug}/${productSku}`, { state: { productId: product.id } });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      const slug = getSlugFromCategory(category);
      navigate(`/categoria/${slug}`);
    } else {
      navigate('/');
    }
  };

  const showSidebar = selectedCategory && selectedCategory !== 'Todos';

  const handleGoHome = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    clearSubFilters();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Gradiente abstracto moderno - Tonos oscuros elegantes */}
      {!selectedCategory && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Fondo base negro profundo */}
          <div className="absolute inset-0 bg-[#0a0a0f]"></div>
          
          {/* Gradiente abstracto con formas orgánicas */}
          <div className="absolute inset-0">
            {/* Forma 1: Azul oscuro profundo - Superior izquierda */}
            <div 
              className="absolute"
              style={{
                width: '60vw',
                height: '60vh',
                maxWidth: '1000px',
                background: 'radial-gradient(ellipse at top left, rgba(30, 58, 138, 0.25) 0%, rgba(30, 58, 138, 0.1) 40%, transparent 70%)',
                filter: 'blur(100px)',
                animation: 'lavaMove1 25s ease-in-out infinite',
                top: '-20%',
                left: '-15%'
              }}
            />
            
            {/* Forma 2: Púrpura oscuro - Centro derecha */}
            <div 
              className="absolute"
              style={{
                width: '50vw',
                height: '50vh',
                maxWidth: '800px',
                background: 'radial-gradient(circle at center, rgba(88, 28, 135, 0.2) 0%, rgba(88, 28, 135, 0.08) 50%, transparent 70%)',
                filter: 'blur(120px)',
                animation: 'lavaMove2 30s ease-in-out infinite',
                top: '30%',
                right: '-10%'
              }}
            />
            
            {/* Forma 3: Slate con toque azul - Inferior */}
            <div 
              className="absolute"
              style={{
                width: '70vw',
                height: '40vh',
                maxWidth: '1100px',
                background: 'radial-gradient(ellipse at bottom, rgba(51, 65, 85, 0.3) 0%, rgba(30, 41, 59, 0.15) 50%, transparent 70%)',
                filter: 'blur(110px)',
                animation: 'lavaMove3 22s ease-in-out infinite',
                bottom: '-15%',
                left: '20%'
              }}
            />
            
            {/* Forma 4: Índigo muy oscuro - Centro */}
            <div 
              className="absolute"
              style={{
                width: '45vw',
                height: '45vh',
                maxWidth: '700px',
                background: 'radial-gradient(circle at center, rgba(49, 46, 129, 0.18) 0%, rgba(49, 46, 129, 0.06) 50%, transparent 70%)',
                filter: 'blur(90px)',
                animation: 'lavaMove4 28s ease-in-out infinite',
                top: '40%',
                left: '35%'
              }}
            />
          </div>
          
          {/* Overlay de gradiente para profundidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
          
          {/* Textura sutil de ruido */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
          }}></div>
        </div>
      )}
      
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full flex flex-col relative">
        {/* CategoryFilter con glowing gradient - Sin fondo oscuro */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 relative z-20">
          <div className="relative group">
            {/* Capa de resplandor 1 - Animada */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
            
            {/* Capa de resplandor 2 - Pulsante */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-[2.5rem] opacity-20 blur-xl animate-pulse"></div>
            
            {/* Borde brillante */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-[2.2rem] opacity-50 blur-sm"></div>
            
            {/* Contenedor del CategoryFilter - Sin fondo oscuro */}
            <div className="relative">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        
        {!selectedCategory ? (
          <div className="w-full flex-1 flex flex-col px-2 sm:px-4">
            {/* HeroCarousel */}
            <div className="mb-6">
              <HeroCarousel />
            </div>

            {/* PC Builder Section */}
            <div className="mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <PCBuilderSection />
              </div>
            </div>

            {/* CategoryGrid */}
            <div className="mb-10">
              <CategoryGrid onCategoryClick={handleCategoryChange} />
            </div>
          </div>
        ) : (
          /* Vista de productos con categoría seleccionada */
          <>
            {filteredProducts.length > 0 && (
              <div className="px-4 sm:px-6 pb-4 flex justify-end">
                <ViewToggleButton 
                  viewMode={viewMode}
                  toggleViewMode={toggleViewMode}
                />
              </div>
            )}

            <div className="flex flex-col lg:flex-row gap-6 min-h-[60vh] px-4 sm:px-6">
              {showSidebar && (
                <aside className="lg:flex-shrink-0">
                  <SidebarFilters
                    selectedCategory={selectedCategory}
                    filters={subFilters}
                    onFilterChange={handleSubFilterChange}
                    onClearFilters={clearSubFilters}
                  />
                </aside>
              )}
              
              <div className="flex-1 min-w-0">
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl border border-gray-700/50 max-w-md">
                      <div className="bg-blue-500/20 backdrop-blur-sm p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        No hay productos disponibles
                      </h3>
                      <p className="text-gray-400 mb-6">
                        No encontramos productos que coincidan con los filtros seleccionados.
                      </p>
                      <button
                        onClick={() => {
                          clearSubFilters();
                          setSelectedCategory(null);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                      >
                        Ver todas las categorías
                      </button>
                    </div>
                  </div>
                ) : (
                  <ProductGrid 
                    products={filteredProducts}
                    viewMode={viewMode}
                    openModal={openProductDetail}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
      <ScrollButton />
      <FloatingChatButton />
    </div>
  );
};

export default Store;