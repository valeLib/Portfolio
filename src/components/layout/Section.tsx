import { type ReactNode, forwardRef } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = '', id, fullWidth = false, noPadding = false }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`${noPadding ? '' : 'section-padding'} ${className}`}
      >
        {fullWidth ? (
          children
        ) : (
          <div className="container-main">{children}</div>
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';
