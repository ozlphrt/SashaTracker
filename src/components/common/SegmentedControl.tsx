interface SegmentedControlProps {
  value: string;
  options: { value: string; label: string; icon?: string }[];
  onChange: (value: string) => void;
}

export default function SegmentedControl({ value, options, onChange }: SegmentedControlProps) {
  return (
    <div className="flex gap-2 p-1 glass rounded-xl">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-1 tap-target py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            value === option.value
              ? 'bg-primary text-white shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          {option.icon && <span className="mr-1">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  );
}

