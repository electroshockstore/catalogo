import { Calendar, Clock } from 'lucide-react';

const ScheduleGrid = ({ days, schedule, weekendSchedule }) => {
  return (
    <div className="space-y-4">
      {/* Grid 2 columnas - Apple style */}
      <div className="grid grid-cols-2 gap-4">
        {/* Días */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 overflow-hidden group hover:bg-white/[0.07] transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-400/30">
              <Calendar className="w-5 h-5 text-blue-400" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Días</p>
              <p className="text-sm font-semibold text-white">{days}</p>
            </div>
          </div>
        </div>

        {/* Horario */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 overflow-hidden group hover:bg-white/[0.07] transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-xl flex items-center justify-center border border-cyan-400/30">
              <Clock className="w-5 h-5 text-cyan-400" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">Horario</p>
              <p className="text-sm font-semibold text-white">{schedule}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fines de semana - Full width */}
      {weekendSchedule && (
        <div className={`relative backdrop-blur-xl rounded-2xl border overflow-hidden ${
          weekendSchedule === 'NO' 
            ? 'bg-red-500/5 border-red-500/20' 
            : 'bg-purple-500/5 border-purple-500/20'
        }`}>
          <div className="flex items-center gap-4 p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              weekendSchedule === 'NO'
                ? 'bg-gradient-to-br from-red-400/20 to-red-600/20 border-red-400/30'
                : 'bg-gradient-to-br from-purple-400/20 to-purple-600/20 border-purple-400/30'
            }`}>
              <Calendar className={`w-5 h-5 ${weekendSchedule === 'NO' ? 'text-red-400' : 'text-purple-400'}`} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium mb-1">Fines de Semana / Feriados</p>
              <p className={`text-sm font-semibold ${weekendSchedule === 'NO' ? 'text-red-400' : 'text-purple-400'}`}>
                {weekendSchedule}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleGrid;
