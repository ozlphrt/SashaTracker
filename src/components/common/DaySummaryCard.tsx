import { DailyEntry } from '../../data/models';
import LedIndicator from './LedIndicator';

interface DaySummaryCardProps {
  dayIndex?: number;
  entry: DailyEntry;
  onClick: () => void;
}

export default function DaySummaryCard({ entry, onClick }: DaySummaryCardProps) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(entry.date);
  const dayName = dayNames[date.getDay()];

  const getWoundStatusColor = () => {
    switch (entry.woundStatus) {
      case 'improving':
        return 'bg-success/20 text-success border-success/30';
      case 'worse':
        return 'bg-danger/20 text-danger border-danger/30';
      default:
        return 'bg-white/10 text-white/70 border-white/10';
    }
  };

  const getWoundStatusIcon = () => {
    switch (entry.woundStatus) {
      case 'improving':
        return '↗';
      case 'worse':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full glass rounded-2xl p-4 text-left hover:bg-white/5 transition-colors tap-target"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">{dayName}</span>
          <span className="text-sm text-white/50">{date.getDate()}</span>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs border ${getWoundStatusColor()}`}>
          {getWoundStatusIcon()} {entry.woundStatus}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <LedIndicator status={entry.dietCompliance ? 'on' : 'off'} size="sm" />
          <span className="text-xs text-white/60">Diet</span>
        </div>
        <div className="flex items-center gap-1">
          <LedIndicator status={entry.antibioticsTaken ? 'on' : 'off'} size="sm" />
          <span className="text-xs text-white/60">Antibiotic</span>
        </div>
        <div className="flex items-center gap-1">
          <LedIndicator status={entry.bathApplied ? 'on' : 'off'} size="sm" />
          <span className="text-xs text-white/60">Bath</span>
        </div>
        <div className="flex items-center gap-1">
          <LedIndicator status={entry.earTreatment ? 'on' : 'off'} size="sm" />
          <span className="text-xs text-white/60">Ear</span>
        </div>
        {entry.itchingLevel > 0 && (
          <div className="ml-auto flex items-center gap-1">
            <span className="text-xs text-white/60">Itch:</span>
            <span className="text-sm font-medium text-warning">{entry.itchingLevel}</span>
          </div>
        )}
      </div>
    </button>
  );
}

