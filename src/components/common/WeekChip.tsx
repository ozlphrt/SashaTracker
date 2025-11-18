interface WeekChipProps {
  week: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function WeekChip({ week, isSelected, onClick }: WeekChipProps) {
  return (
    <button
      onClick={onClick}
      className={`tap-target px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isSelected
          ? 'bg-primary text-white shadow-lg shadow-primary/20'
          : 'glass text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      Week {week}
    </button>
  );
}

