

export default function BlogCards() {
  const articles = [
    {
      id: 1,
      category: 'Tecnología',
      categoryColor: 'cyan',
      title: 'El Futuro de la IA: Más Allá de los Modelos de Lenguaje',
      description: 'Un análisis profundo de cómo los modelos de IA están evolucionando más allá del procesamiento de texto.',
      image: '/images/transfer.jpg',
      author: 'Ana Torres',
      authorAvatar: 'https://placehold.co/40x40/E2E8F0/333333?text=A1',
      time: 'Hace 2 días'
    },
    {
      id: 2,
      category: 'Diseño',
      categoryColor: 'purple',
      title: 'Los 5 Principios del Diseño UI que No Puedes Ignorar',
      description: 'Descubre los pilares fundamentales del diseño de interfaces que separan una app buena de una genial.',
      image: 'https://placehold.co/600x400/7C3AED/FFFFFF?text=Diseño',
      author: 'Marcos Reyes',
      authorAvatar: 'https://placehold.co/40x40/E2E8F0/333333?text=M2',
      time: 'Hace 1 semana'
    },
    {
      id: 3,
      category: 'Viajes',
      categoryColor: 'green',
      title: 'Guía Definitiva para tu Aventura en la Patagonia',
      description: 'Todo lo que necesitas saber para planificar tu viaje al fin del mundo. Equipamiento, rutas y fotografía.',
      image: 'https://placehold.co/600x400/059669/FFFFFF?text=Viajes',
      author: 'Carla Gómez',
      authorAvatar: 'https://placehold.co/40x40/E2E8F0/333333?text=C3',
      time: 'Hace 3 horas'
    }
  ];

  const getCategoryColors = (color) => {
    const colors = {
      cyan: {
        text: 'text-cyan-600 dark:text-cyan-400',
        hover: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400'
      },
      purple: {
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
      },
      green: {
        text: 'text-green-600 dark:text-green-400',
        hover: 'group-hover:text-green-600 dark:group-hover:text-green-400'
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-16">
          {articles.map((article) => {
            const colors = getCategoryColors(article.categoryColor);
            
            return (
              <div key={article.id} className="group relative">
                <a
                  href="#"
                  className="absolute -top-24 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] z-10"
                  aria-label={`Leer artículo sobre ${article.title}`}
                >
                  <img
                    src={article.image}
                    alt=""
                    className="w-full h-48 object-cover rounded-2xl shadow-xl transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-2"
                  />
                </a>

                <a
                  href="#"
                  className="block bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 transition-shadow duration-300 shadow-md group-hover:shadow-2xl"
                >
                  <div className="p-6 pt-32 text-center">
                    <span className={`text-xs font-semibold uppercase ${colors.text} mb-2 block`}>
                      {article.category}
                    </span>

                    <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300 ${colors.hover}`}>
                      {article.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-center space-x-2 mt-4">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={article.authorAvatar}
                        alt="Avatar del autor"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {article.author}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {article.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}