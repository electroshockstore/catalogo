import { Banknote, CreditCard, AlertTriangle, CheckCircle2, Wifi, Shield, Sparkles } from 'lucide-react';

const MetodosDePago = () => {

  const paymentMethods = [
    {
      id: 'efectivo',
      icon: Banknote,
      title: 'Efectivo',
      description: 'En el momento', 
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50',
      available: true
    },
    {
      id: 'transferencia',
      icon: CreditCard,
      title: 'Transferencia',
      description: 'Mayores a $100.000', // Texto mejorado
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      available: true
    }
  ];

  // Consejos de seguridad ultra-sintetizados
  const securityTips = [
    {
      icon: CheckCircle2,
      title: 'Verificación Bancaria',
      description: 'Confirme su saldo y el estado de la cuenta inmediatamente antes de la transferencia.',
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Wifi,
      title: 'Conexión a Internet',
      description: 'Disponga de una conexión a Internet estable y segura durante la entrega/retiro.',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: AlertTriangle,
      title: 'Validación de Pago',
      description: 'La entrega se efectúa solo cuando la transferencia esté acreditada en nuestra cuenta.', // Usando la versión más concisa
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 h-32 sm:w-72 sm:h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-emerald-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white rounded-full border-2 border-blue-200 shadow-sm mb-4 sm:mb-6">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-bold text-gray-700">Métodos de Pago</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6 px-4">
            Opciones de Pago
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mt-1 sm:mt-2 pb-1 sm:pb-2">
              Seguras y Confiables
            </span>
          </h2>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            
            return (
              <div
                key={method.id}
                className="group relative"
              >
                {/* Card */}
                <div className={`relative bg-white rounded-3xl border-2 overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.25)] ${method.id === 'efectivo' ? 'border-emerald-300' : 'border-blue-300'} backdrop-blur-sm`}>
                  
                  {/* Background image for efectivo method */}
                  {method.id === 'efectivo' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: 'url(/images/cash.png)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right'
                      }}
                    />
                  )}
                  
                  {/* Background image for transferencia method */}
                  {method.id === 'transferencia' && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: 'url(/images/transfer.png)',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right'
                      }}
                    />
                  )}
                  
                  {/* Gradient background decoration */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${method.bgColor} opacity-40 rounded-full blur-3xl transform translate-x-20 -translate-y-20`} />

                  {/* Content */}
                  <div className="relative p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6">
                    {/* Icon Circle */}
                    <div className={`inline-flex p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-br ${method.gradient} shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:shadow-[0_15px_50px_rgba(0,0,0,0.4)] mb-4 sm:mb-6`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" strokeWidth={2.5} />
                    </div>

                    {/* TÍTULO MEJORADO (MODERNO) */}
                    <h3 className={`
                        text-2xl sm:text-xl lg:text-5xl
                        font-extrabold 
                        tracking-tight 
                        leading-snug 
                        mb-1 sm:mb-2
                        ${method.id === 'efectivo' ? 'text-emerald-700' : 'text-blue-700'}
                    `}>
                      {method.title}
                    </h3>
                    
                    <p className={`font-semibold text-sm sm:text-base mb-0 ${method.id === 'efectivo' ? 'text-emerald-700' : 'text-blue-700'}`}>
                      {method.description}
                    </p>
                  </div>

                  {/* Bottom accent line - always visible */}
                  <div className={`h-2 bg-gradient-to-r ${method.gradient}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Tips Section */}
        <div className="relative">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-xl sm:rounded-2xl border-2 border-gray-200 shadow-md">
              <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-gray-700" strokeWidth={2.5} />
              <h3 className="text-lg sm:text-2xl font-black text-gray-900">
                Tips de Seguridad
              </h3>
            </div>
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {securityTips.map((tip, index) => {
              const Icon = tip.icon;
              
              return (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Card */}
                  <div className={`relative bg-white rounded-xl sm:rounded-2xl border-2 border-gray-200 p-4 sm:p-6 lg:p-7 hover:border-gray-300 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] h-full ${tip.bgColor} bg-opacity-30`}>
                    {/* Icon Circle with Gradient */}
                    <div className={`inline-flex p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${tip.gradient} shadow-lg mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-white" strokeWidth={2.5} />
                    </div>

                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 tracking-tight">
                      {tip.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-gray-700 font-normal leading-relaxed tracking-wide">
                      {tip.description}
                    </p>

                    {/* Bottom Border - always visible */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tip.gradient} rounded-b-2xl`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 sm:mt-12 text-center px-4">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-md">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-gray-800 text-center">
              Verifica siempre que el monto y los datos sean correctos antes de confirmar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodosDePago;