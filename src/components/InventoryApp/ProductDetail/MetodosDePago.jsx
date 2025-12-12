import React, { useState } from 'react';
import { Banknote, CreditCard, AlertTriangle, CheckCircle2, Wifi, Shield, Sparkles } from 'lucide-react';

const MetodosDePago = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'efectivo',
      icon: Banknote,
      title: 'Efectivo',
      description: 'Pago en el momento de la entrega',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50',
      available: true
    },
    {
      id: 'transferencia',
      icon: CreditCard,
      title: 'Transferencias',
      description: 'Solo para compras mayores a $100.000',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
   
      available: true
    }
  ];

  const securityTips = [
    {
      icon: CheckCircle2,
      title: 'Verificación Bancaria',
      description: 'Checkear su cuenta bancaria y saldo con su banco antes de salir',
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Wifi,
      title: 'Conexión a Internet',
      description: 'Tener conexión a internet cuando salgan a retirar',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: AlertTriangle,
      title: 'Validación de Pago',
      description: 'No se entrega producto sin que la transferencia se impacte realmente',
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-blue-200 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-gray-700">Métodos de Pago</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Opciones de Pago
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 mt-2">
              Seguras y Confiables
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Aceptamos las siguientes formas de pago para tu comodidad
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(isSelected ? null : method.id)}
                className={`group relative cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {/* Card */}
                <div className={`relative bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl ${
                  isSelected 
                    ? 'border-blue-500 shadow-blue-200' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}>
                  {/* Gradient background decoration */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${method.bgColor} opacity-40 rounded-full blur-3xl transform translate-x-20 -translate-y-20`} />

                  {/* Content */}
                  <div className="relative p-8">
                    {/* Icon Circle */}
                    <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${method.gradient} shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-10 w-10 text-white" strokeWidth={2.5} />
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-3">
                      {method.title}
                    </h3>
                    
                    <p className="text-gray-700 font-semibold text-base mb-4">
                      {method.description}
                    </p>

                  

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="mt-5 flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${method.gradient} animate-pulse`} />
                        <span className="text-xs font-bold text-blue-600">Método Seleccionado</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom accent line */}
                  <div className={`h-2 bg-gradient-to-r ${method.gradient} transform ${isSelected ? 'scale-x-100' : 'scale-x-0'} transition-transform duration-300 origin-left`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Tips Section */}
        <div className="relative">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border-2 border-gray-200 shadow-md">
              <Shield className="h-6 w-6 text-gray-700" strokeWidth={2.5} />
              <h3 className="text-2xl font-black text-gray-900">
                Tips de Seguridad
              </h3>
            </div>
          </div>

          {/* Tips Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {securityTips.map((tip, index) => {
              const Icon = tip.icon;
              
              return (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Card */}
                  <div className={`relative bg-white rounded-2xl border-2 border-gray-200 p-7 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-xl h-full ${tip.bgColor} bg-opacity-30`}>
                    {/* Icon Circle with Gradient */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${tip.gradient} shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      {tip.title}
                    </h4>
                    
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      {tip.description}
                    </p>

                    {/* Animated Border Bottom */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tip.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border-2 border-blue-200 shadow-md">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-bold text-gray-800">
              Verifica siempre que el monto y los datos sean correctos antes de confirmar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodosDePago;