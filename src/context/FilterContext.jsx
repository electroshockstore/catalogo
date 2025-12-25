import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useStock } from './StockContext';

const FilterContext = createContext();

export { FilterContext };

export function FilterProvider({ children }) {
  const { products } = useStock();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subFilters, setSubFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Limpiar subfiltros cuando cambia la categoría
  useEffect(() => {
    setSubFilters({});
  }, [selectedCategory]);

  // Memoizar la función de normalización para evitar recrearla
  const normalizeValue = useCallback((filterType, specValue) => {
    const valueStr = specValue.toString().toLowerCase();
    let normalizedValue = specValue;
    
    // Marca (normalizar para joystick)
    if (filterType === 'marca') {
      if (valueStr.includes('playstation') || valueStr.includes('sony')) {
        normalizedValue = 'Sony/PlayStation';
      } else if (valueStr.includes('microsoft') || valueStr.includes('xbox')) {
        normalizedValue = 'Microsoft/Xbox';
      }
    }
    // Iluminación
    else if (filterType === 'iluminacionRGB' || filterType === 'Iluminación') {
      if (valueStr.includes('rgb') || valueStr.includes('argb')) {
        normalizedValue = 'RGB';
      } else if (valueStr.includes('no') || valueStr.includes('sin') || valueStr.includes('posee')) {
        normalizedValue = 'Sin RGB';
      }
    }
    // Conexión/Conectividad
    else if (filterType === 'tipoConectividad' || filterType === 'Conectividad' || filterType === 'Tipo de conexión' || filterType === 'inalambrico') {
      if (valueStr.includes('inalámbrico') || valueStr.includes('wireless') || valueStr.includes('bluetooth') || valueStr.includes('sí') || valueStr.includes('2.4')) {
        normalizedValue = 'Inalámbrico';
      } else if (valueStr.includes('alámbrico') || valueStr.includes('cable') || valueStr.includes('usb') || valueStr.includes('3.5') || valueStr.includes('no') || valueStr.includes('gaming, cableado')) {
        normalizedValue = 'Alámbrico';
      }
    }
    // Batería (para joystick)
    else if (filterType === 'tipoBateria') {
      if (valueStr.includes('recargable') || valueStr.includes('interna') || valueStr.includes('li-ion') || valueStr.includes('litio')) {
        normalizedValue = 'Batería Interna';
      } else if (valueStr.includes('pilas aa') || valueStr.includes('aa (')) {
        normalizedValue = 'Pilas AA';
      }
    }
    // Compatibilidad (simplificado para joystick)
    else if (filterType === 'compatibilidad' || filterType === 'Compatibilidad') {
      const hasPC = valueStr.includes('pc') || valueStr.includes('windows');
      const hasConsole = valueStr.includes('ps') || valueStr.includes('xbox') || valueStr.includes('switch') || valueStr.includes('playstation');
      const hasMobile = valueStr.includes('android') || valueStr.includes('ios') || valueStr.includes('celular');
      
      if (hasPC && hasConsole && hasMobile) normalizedValue = 'PC/Consolas/Android';
      else if (hasPC && hasConsole) normalizedValue = 'PC/Consolas';
      else if (hasConsole) normalizedValue = 'Consolas';
      else if (hasPC) normalizedValue = 'PC';
    }
    // Potencia
    else if (filterType === 'Potencia') {
      const match = valueStr.match(/(\d+)\s*w/);
      if (match) normalizedValue = `${match[1]}W`;
    }
    // Certificación
    else if (filterType === 'Certificacion') {
      if (valueStr.includes('gold')) normalizedValue = '80 Plus Gold';
      else if (valueStr.includes('bronze')) normalizedValue = '80 Plus Bronze';
      else if (valueStr.includes('white')) normalizedValue = '80 Plus White';
      else if (valueStr.includes('silver')) normalizedValue = '80 Plus Silver';
      else if (valueStr.includes('sin')) normalizedValue = 'Sin certificación';
    }
    // Capacidad
    else if (filterType === 'capacidadTotal' || filterType === 'Capacidad' || filterType === 'Capacidad total') {
      const match = valueStr.match(/(\d+)\s*(gb|tb)/);
      if (match) {
        const num = match[1];
        const unit = match[2].toUpperCase();
        normalizedValue = `${num}${unit}`;
      }
    }
    // Tipo de memoria
    else if (filterType === 'tipoMemoriaRAM') {
      normalizedValue = specValue.toUpperCase();
    }
    // Arquitectura
    else if (filterType === 'Arquitectura') {
      if (valueStr.includes('mecánico')) normalizedValue = 'Mecánico';
      else if (valueStr.includes('membrana')) normalizedValue = 'Membrana';
    }
    // Sensor
    else if (filterType === 'tipoSensor') {
      if (valueStr.includes('óptico')) normalizedValue = 'Óptico';
      else if (valueStr.includes('láser')) normalizedValue = 'Láser';
    }
    // DPI
    else if (filterType === 'dpi') {
      const match = valueStr.match(/(\d+)/);
      if (match) normalizedValue = `${match[1]} DPI`;
    }
    
    return normalizedValue;
  }, []);

  useEffect(() => {
    if (!products) {
      setFilteredProducts([]);
      return;
    }

    let filtered = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query) ||
        p.model?.toLowerCase().includes(query) ||
        p.sku?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    } else {
      if (selectedCategory) {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      const activeFilters = Object.entries(subFilters).filter(([, values]) => values?.length > 0);
      
      if (activeFilters.length > 0) {
        filtered = filtered.filter(product => {
          if (!product.specifications) return false;
          
          return activeFilters.every(([filterType, selectedValues]) => {
            const specValue = product.specifications[filterType];
            if (!specValue) return false;
            
            const normalizedProductValue = normalizeValue(filterType, specValue);
            
            return selectedValues.some(selectedValue => 
              normalizedProductValue.toString().toLowerCase() === selectedValue.toLowerCase()
            );
          });
        });
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, subFilters, normalizeValue]);

  const handleSubFilterChange = useCallback((filterType, values) => {
    setSubFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSubFilters({});
  }, []);

  const clearSubFilters = useCallback(() => {
    setSubFilters({});
  }, []);

  const value = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    subFilters,
    handleSubFilterChange,
    filteredProducts,
    clearFilters,
    clearSubFilters
  }), [searchQuery, selectedCategory, subFilters, filteredProducts, handleSubFilterChange, clearFilters, clearSubFilters]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}