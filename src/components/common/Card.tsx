import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'strong';
}

export default function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const glassClass = variant === 'strong' ? 'glass-strong' : 'glass';
  return (
    <div
      className={`${glassClass} rounded-3xl shadow-xl p-5 ${onClick ? 'cursor-pointer hover:bg-white/5 transition-all active:scale-[0.98]' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

