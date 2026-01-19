import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div
      className={`
        grid
        grid-cols-2 md:grid-cols-4
        gap-3 md:gap-4
        auto-rows-[minmax(180px,auto)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'glass' | 'accent';
}

export function BentoTile({
  children,
  className = '',
  size = 'sm',
  variant = 'default',
}: BentoTileProps) {
  const sizeClasses = {
    sm: 'col-span-1',
    md: 'col-span-2',
    lg: 'col-span-2 row-span-2',
    xl: 'col-span-4',
  };

  const variantClasses = {
    default: 'bg-[var(--surface)] border border-[var(--border-color)]',
    glass: 'glass-card backdrop-blur-xl',
    accent: 'bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] text-white',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-2xl
        overflow-hidden
        transition-all duration-300 ease-out
        hover:scale-[1.02]
        hover:shadow-lg
        ${className}
      `}
      style={{
        boxShadow: variant === 'default' ? '0 4px 20px rgba(0,0,0,0.08)' : undefined
      }}
    >
      {children}
    </div>
  );
}
