import { Shield } from 'lucide-react';
import RuleCard from './RuleCard';

const ImportantRulesSection = ({ rules }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 border border-white/10 mb-8 sm:mb-12 md:mb-16 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="relative">
        {/* Header minimalista */}
        <div className="flex items-center gap-4 mb-8 sm:mb-10 md:mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 p-3 sm:p-4 rounded-2xl border border-blue-400/30">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Condiciones Importantes</h2>
            <p className="text-sm sm:text-base text-gray-400 font-medium">Leé antes de coordinar tu retiro</p>
          </div>
        </div>
        
        {/* Grid de reglas */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 md:grid-cols-3">
          {rules.map((rule, index) => (
            <RuleCard key={index} rule={rule} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImportantRulesSection;
