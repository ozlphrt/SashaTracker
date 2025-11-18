interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-white/20 text-white',
    success: 'bg-green-500/30 text-green-300',
    warning: 'bg-yellow-500/30 text-yellow-300',
    danger: 'bg-red-500/30 text-red-300'
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

