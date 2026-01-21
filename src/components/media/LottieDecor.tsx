import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface LottieDecorProps {
  /** JSON string data for inline lottie */
  data?: string;
  /** URL path for .lottie files */
  src?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export function LottieDecor({
  data,
  src,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieDecorProps) {
  return (
    <div 
      className={className} 
      aria-hidden="true"
      style={{
        imageRendering: 'crisp-edges',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <DotLottieReact
        data={data}
        src={src}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        style={{ 
          width: '100%', 
          height: '100%',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
