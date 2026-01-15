import { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

function SplineFallback() {
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent-500/20 via-dark-800 to-primary-500/20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-3 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
        <p className="text-dark-400 text-sm">Loading 3D Scene...</p>
      </div>
    </div>
  );
}

function SplineError() {
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent-500/10 via-dark-800 to-primary-500/10 border border-dark-700 flex items-center justify-center">
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-700/50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-accent-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <p className="text-dark-300 font-medium mb-1">Interactive 3D</p>
        <p className="text-dark-500 text-sm">Magic VFX Demo Scene</p>
      </div>
    </div>
  );
}

export function SplineHero() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <SplineError />;
  }

  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[400px]">
      <Suspense fallback={<SplineFallback />}>
        <Spline
           scene="https://prod.spline.design/PiAhAOk04RB2in-4/scene.splinecode"
          onError={() => setHasError(true)}
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
}
