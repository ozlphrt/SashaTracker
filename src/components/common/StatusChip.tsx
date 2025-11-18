interface StatusChipProps {
  variant: 'success' | 'warning' | 'danger' | 'default';
  children: React.ReactNode;
  className?: string;
}

export default function StatusChip({ variant, children, className = '' }: StatusChipProps) {
  const variants = {
    success: 'bg-success/20 text-success border-success/30',
    warning: 'bg-warning/20 text-warning border-warning/30',
    danger: 'bg-danger/20 text-danger border-danger/30',
    default: 'bg-white/10 text-white/70 border-white/10'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

