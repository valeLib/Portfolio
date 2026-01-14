import { Suspense, lazy } from 'react';

const Player = lazy(() =>
  import('@lottiefiles/react-lottie-player').then((mod) => ({ default: mod.Player }))
);

interface LottieDecorProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export function LottieDecor({
  src,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieDecorProps) {
  return (
    <div className={className} aria-hidden="true">
      <Suspense fallback={null}>
        <Player
          src={src}
          loop={loop}
          autoplay={autoplay}
          speed={speed}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
}
