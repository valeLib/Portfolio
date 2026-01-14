interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  size?: 'sm' | 'md';
}

export function Tag({ children, variant = 'default', size = 'md' }: TagProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border';

  const variantClasses = {
    default: 'bg-dark-700/50 text-dark-300 border-dark-600/50',
    accent: 'bg-accent-500/10 text-accent-400 border-accent-500/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
