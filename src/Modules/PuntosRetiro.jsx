import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, AlertTriangle, CheckCircle, Navigation, ArrowLeft, Calendar, DollarSign, Shield, Camera, MapPinned } from 'lucide-react';
import Header from '../components/InventoryApp/Header';
import Footer from '../components/InventoryApp/Footer';
import FloatingChatButton from '../components/InventoryApp/FloatingChatButton';

const PuntosRetiro = () => {
  const navigate = useNavigate();

  const pickupPoints = useMemo(() => [
    {
      id: 1,
      name: 'Berazategui Centro',
      address: 'Av Mitre y 14',
      schedule: '16:00 hs',
      days: 'Lunes a Viernes',
      weekendSchedule: 'NO',
      mapUrl: 'https://maps.app.goo.gl/vZYggDMLYFrYt3qv5',
      image: '/images/puntos_retiro/via_cosenza.webp',
      color: 'from-blue-600 to-cyan-500',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      security: [
        { icon: Shield, text: 'Frente a Base Policial' },
        { icon: Camera, text: 'Cámaras de Seguridad' },
        { icon: MapPinned, text: 'Punto Seguro Transitable' }
      ]
    },
    {
      id: 2,
      name: 'Cruce Florencio Varela',
      address: 'Puerta del Bingo',
      schedule: '16:30 hs',
      days: 'Lunes a Viernes',
      weekendSchedule: 'Todo el día',
      mapUrl: 'https://maps.app.goo.gl/qouSL9xAgsLR3x4EA',
      image: '/images/puntos_retiro/bz_cruce.webp',
      color: 'from-purple-600 to-pink-500',
      gradient: 'from-purple-500/20 to-pink-500/20',
      security: [
        { icon: Shield, text: 'Seguridad Municipal e Interna' },
        { icon: Camera, text: 'Cámaras de Seguridad' },
        { icon: MapPinned, text: 'Punto Seguro Transitable' }
      ]
    },
    {
      id: 3,
      name: 'Carrefour Fcio Varela',
      address: 'Patio Comida',
      schedule: 'A coordinar',
      days: 'Todos los días',
      weekendSchedule: 'Disponible',
      mapUrl: 'https://maps.app.goo.gl/2wB6dvSTKSSVPcsu9',
      image: '/images/puntos_retiro/carrefour.webp',
      color: 'from-green-600 to-emerald-500',
      gradient: 'from-green-500/20 to-emerald-500/20',
      security: [
        { icon: Shield, text: 'Seguridad del Centro Comercial' },
        { icon: Camera, text: 'Cámaras de Seguridad' },
        { icon: MapPinned, text: 'Punto Seguro Transitable' }
      ]
    }
  ], []);

  const importantRules = useMemo(() => [
    {
      icon: DollarSign,
      title: 'NO PERMUTO',
      subtitle: 'Solo efectivo o transferencia',
      description: 'Transferencias menores a $100.000 tienen recargo',
      color: 'text-red-400',
      bgColor: 'from-red-500/20 to-red-600/10',
      borderColor: 'border-red-500/40'
    },
    {
      icon: AlertTriangle,
      title: 'Pago INMEDIATO',
      subtitle: 'Sin excepciones',
      description: 'Efectivo o transferencia inmediata. No intenten estafadores, conozco todas',
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-orange-600/10',
      borderColor: 'border-orange-500/40'
    },
    {
      icon: CheckCircle,
      title: 'Venta Particular',
      subtitle: 'Sin local físico',
      description: 'NO tengo local. Sin facturas ni garantía escrita. Todo sellado, se paga antes de abrir',
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/20 to-yellow-600/10',
      borderColor: 'border-yellow-500/40'
    }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <Header 
        searchQuery=""
        onSearchChange={() => {}}
        onGoHome={() => navigate('/')}
      />

      <main className="relative overflow-hidden">
        {/* Simplified Background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

        {/* Hero Section */}
        <section className="relative py-8 sm:py-12 md:py-20 px-4 sm:px-6">
          <div className="relative max-w-7xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 bg-white/5 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-white/10 text-sm hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold">Volver</span>
            </button>

            {/* Title */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md px-4 py-2 sm:px-8 sm:py-4 rounded-full border border-blue-500/30 mb-4 sm:mb-8">
                <MapPin className="w-5 h-5 sm:w-7 sm:h-7 text-blue-400" strokeWidth={2.5} />
                <span className="text-blue-400 font-black text-sm sm:text-lg">Puntos de Retiro</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-3 sm:mb-6 leading-tight px-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ¿Dónde Retiro
                </span>
                <br />
                <span className="text-white">Mi Compra?</span>
              </h1>
              
              <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                Elegí el punto más cercano y coordiná tu entrega <span className="text-blue-400 font-bold">segura</span>
              </p>
            </div>
          </div>
        </section>

        {/* Important Rules Section */}
        <section className="py-6 sm:py-8 md:py-12 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative bg-gradient-to-br from-red-900/30 via-orange-900/20 to-red-900/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 border-2 border-red-500/40 mb-8 sm:mb-12 md:mb-16 overflow-hidden">
              
              <div className="relative">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                  <div className="bg-red-500/20 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl border border-red-500/30">
                    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white">IMPORTANTE</h2>
                    <p className="text-xs sm:text-sm text-red-300 font-semibold">Leer antes de coordinar</p>
                  </div>
                </div>
                
                <div className="grid gap-3 sm:gap-4 md:gap-6 md:grid-cols-3">
                  {importantRules.map((rule, index) => (
                    <div
                      key={index}
                      className={`relative bg-gradient-to-br ${rule.bgColor} backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 ${rule.borderColor} overflow-hidden group hover:scale-[1.02] transition-transform`}
                    >
                      {/* Icon */}
                      <div className="relative mb-3 sm:mb-4 md:mb-6">
                        <div className={`inline-flex p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-br ${rule.bgColor} border ${rule.borderColor}`}>
                          <rule.icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${rule.color}`} strokeWidth={2.5} />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1 sm:mb-2">{rule.title}</h3>
                        <p className={`text-xs sm:text-sm font-bold ${rule.color} mb-2 sm:mb-3 uppercase tracking-wide`}>{rule.subtitle}</p>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pickup Points Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
              {pickupPoints.map((point) => (
                <div
                  key={point.id}
                  className="group"
                >
                  <div className={`relative bg-gradient-to-br ${point.color} p-[2px] rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl`}>
                    <div className="relative bg-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden">
                      {/* Image with overlay */}
                      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
                        <img 
                          src={point.image} 
                          alt={point.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${point.gradient} to-gray-900/90`} />
                        
                        {/* Floating badge */}
                        <div className="absolute top-3 left-3 sm:top-6 sm:left-6">
                          <div className={`inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r ${point.color} px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-white font-black text-xs sm:text-base backdrop-blur-sm border border-white/20`}>
                            <MapPin className="w-3 h-3 sm:w-5 sm:h-5" strokeWidth={2.5} />
                            Punto {point.id}
                          </div>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2 drop-shadow-2xl">{point.name}</h3>
                          <p className="text-black text-base sm:text-xl md:text-2xl font-black drop-shadow-lg bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg inline-block">{point.address}</p>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                        {/* Security Features */}
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                          <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-green-400" strokeWidth={2.5} />
                            <h4 className="text-lg font-black text-white">Punto Seguro</h4>
                          </div>
                          <div className="grid gap-3">
                            {point.security.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-gray-300">
                                <item.icon className="w-5 h-5 text-green-400 flex-shrink-0" strokeWidth={2} />
                                <span className="font-semibold">{item.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Schedule Cards - Grid Layout */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-blue-400" strokeWidth={2.5} />
                              <div>
                                <p className="text-xs text-gray-400 mb-0.5">Días</p>
                                <p className="text-white font-black text-sm">{point.days}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-green-400" strokeWidth={2.5} />
                              <div>
                                <p className="text-xs text-gray-400 mb-0.5">Horario</p>
                                <p className="text-white font-black text-sm">{point.schedule}</p>
                              </div>
                            </div>
                          </div>
                          
                          {point.weekendSchedule && (
                            <div className={`col-span-2 ${point.weekendSchedule === 'NO' 
                              ? 'bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/30' 
                              : 'bg-gradient-to-br from-purple-500/10 to-pink-500/5 border-purple-500/30'
                            } backdrop-blur-sm rounded-xl p-4 border`}>
                              <div className="flex items-center gap-3">
                                <Calendar className={`w-5 h-5 ${point.weekendSchedule === 'NO' ? 'text-red-400' : 'text-purple-400'}`} strokeWidth={2.5} />
                                <div>
                                  <p className={`text-xs ${point.weekendSchedule === 'NO' ? 'text-red-300' : 'text-purple-300'} mb-0.5`}>Fines de Semana / Feriados</p>
                                  <p className="text-white font-black text-sm">{point.weekendSchedule}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Action Button */}
                        <a
                          href={point.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group/btn flex items-center justify-center gap-3 w-full bg-gradient-to-r ${point.color} hover:opacity-90 text-white font-black py-5 rounded-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                          <Navigation className="w-6 h-6 relative z-10" strokeWidth={2.5} />
                          <span className="relative z-10 text-lg">Ver en Google Maps</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Additional Info */}
            <div className="relative bg-gradient-to-br from-yellow-900/30 via-orange-900/20 to-yellow-900/30 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-yellow-500/40 overflow-hidden">
              <div className="relative flex flex-col sm:flex-row items-start gap-6">
                <div className="bg-yellow-500/20 backdrop-blur-sm p-5 rounded-2xl border border-yellow-500/30 flex-shrink-0">
                  <AlertTriangle className="w-10 h-10 text-yellow-400" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">Importante sobre los horarios</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-4">
                    <strong className="text-yellow-400 font-black">No viajo a otro lado</strong>, solo tengo esos horarios por falta de tiempo.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Por favor, coordiná con anticipación tu retiro para asegurar que puedas llegar en el horario establecido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default PuntosRetiro;