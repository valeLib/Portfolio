import { type ReactNode, type CSSProperties, type HTMLAttributes, forwardRef } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  style?: CSSProperties;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className = '', id, fullWidth = false, noPadding = false, style, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`${noPadding ? '' : 'section-padding'} ${className}`}
        style={style}
        {...rest}
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
