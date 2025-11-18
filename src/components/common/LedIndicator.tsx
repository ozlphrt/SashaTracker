interface LedIndicatorProps {
  status: 'on' | 'off' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export default function LedIndicator({ status, size = 'md' }: LedIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const glowStyles = {
    on: {
      boxShadow: '0 0 8px rgba(34, 197, 94, 0.8), 0 0 12px rgba(34, 197, 94, 0.6), 0 0 16px rgba(34, 197, 94, 0.4)',
      backgroundColor: 'rgb(34, 197, 94)'
    },
    off: {
      boxShadow: '0 0 8px rgba(239, 68, 68, 0.8), 0 0 12px rgba(239, 68, 68, 0.6), 0 0 16px rgba(239, 68, 68, 0.4)',
      backgroundColor: 'rgb(239, 68, 68)'
    },
    warning: {
      boxShadow: '0 0 8px rgba(234, 179, 8, 0.8), 0 0 12px rgba(234, 179, 8, 0.6), 0 0 16px rgba(234, 179, 8, 0.4)',
      backgroundColor: 'rgb(234, 179, 8)'
    }
  };

  return (
    <div className="relative">
      {/* Haze/glow wrapper */}
      <div
        className={`${sizeClasses[size]} rounded-full absolute blur-sm opacity-60 ${
          status === 'on' ? 'bg-green-500' : status === 'off' ? 'bg-red-500' : 'bg-yellow-500'
        }`}
        style={{
          transform: 'scale(1.5)',
        }}
      />
      {/* LED core */}
      <div
        className={`${sizeClasses[size]} rounded-full relative z-10 ${
          status === 'on' ? 'animate-pulse' : ''
        }`}
        style={glowStyles[status]}
      />
    </div>
  );
}

