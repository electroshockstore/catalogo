import { MapPin, Navigation } from 'lucide-react';
import SecurityFeatures from './SecurityFeatures';
import ScheduleGrid from './ScheduleGrid';

const PickupPointCard = ({ point }) => {
  return (
    <div className="group">
      {/* Apple-style card con glassmorphism */}
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-500 shadow-2xl hover:shadow-emerald-500/20">
        {/* Subtle mesh gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-blue-500/20" />
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }} />
        </div>

        {/* Image header con overlay sofisticado */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={point.image} 
            alt={point.name}
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            loading="lazy"
          />
          {/* Apple-style gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Floating badge - minimalista */}
          <div className="absolute top-6 left-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold text-sm">Punto {point.id}</span>
            </div>
          </div>

          {/* Title - Apple typography */}
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">{point.name}</h3>
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-2xl shadow-xl">
              <MapPin className="w-4 h-4 text-gray-600" strokeWidth={2} />
              <p className="text-sm font-medium text-gray-900">{point.address}</p>
            </div>
          </div>
        </div>

        {/* Content - espaciado Apple */}
        <div className="relative p-8 space-y-6">
          <SecurityFeatures security={point.security} />
          <ScheduleGrid 
            days={point.days}
            schedule={point.schedule}
            weekendSchedule={point.weekendSchedule}
          />

          {/* Apple-style CTA button */}
          <a
            href={point.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-3 w-full bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
          >
            <Navigation className="w-5 h-5" strokeWidth={2} />
            <span className="text-base">Abrir en Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PickupPointCard;
