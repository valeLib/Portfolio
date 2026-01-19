import { CV_ENABLED, CV_PDF_PATH } from '../../config';

interface CvDownloadButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDisabled?: boolean;
}

export function CvDownloadButton({
  variant = 'secondary',
  size = 'md',
  className = '',
  showDisabled = false,
}: CvDownloadButtonProps) {
  // If CV is not enabled and we don't want to show disabled state, render nothing
  if (!CV_ENABLED && !showDisabled) {
    return null;
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Download icon SVG
  const DownloadIcon = () => (
    <svg
      className={iconSizes[size]}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  // If CV is disabled, show "Coming soon" button
  if (!CV_ENABLED) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        className={`
          inline-flex items-center justify-center
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          opacity-50 cursor-not-allowed
          ${className}
        `}
      >
        <DownloadIcon />
        <span>CV Coming Soon</span>
      </button>
    );
  }

  // CV is enabled - show download link
  return (
    <a
      href={CV_PDF_PATH}
      download="Valentina_LZ_CV.pdf"
      aria-label="Download CV as PDF"
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <DownloadIcon />
      <span>Download CV</span>
    </a>
  );
}
