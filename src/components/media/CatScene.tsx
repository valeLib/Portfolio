import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Bounds } from '@react-three/drei';
import { CatModel } from './CatModel';
import { CAT_MODEL_URL } from '../../config';

function SceneFallback() {
  return (
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent-500/20 via-dark-800 to-primary-500/20 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-3 border-2 border-accent-500/30 border-t-accent-500 rounded-full animate-spin" />
        <p className="text-dark-400 text-sm">Loading 3D Scene...</p>
      </div>
    </div>
  );
}

function SceneError() {
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
        <p className="text-dark-500 text-sm">Cat Model Scene</p>
      </div>
    </div>
  );
}

// Error boundary for Three.js/R3F errors
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />

      <Environment preset="city" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.25}>
          <CatModel
            url={CAT_MODEL_URL}
            scale={0.9}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </Bounds>
      </Suspense>

      {/* <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2} far={4} /> */}
      <OrbitControls enableZoom={false} enablePan={false}/>

    </>
  );
}

export function CatScene() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <SceneError />;
  }

  return (
    <div className="w-full h-full min-h-[300px] lg:min-h-[400px]">
      <Suspense fallback={<SceneFallback />}>
        <Canvas
          camera={{ position: [0, 1, 10], fov: 45, near: 0.01, far: 2000 }}
          shadows
          dpr={[1, 2]}
          onError={() => setHasError(true)}
          style={{ background: 'transparent'}}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}

// Preload the model
CatModel.preload(CAT_MODEL_URL);
