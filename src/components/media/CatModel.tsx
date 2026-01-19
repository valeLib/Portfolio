import { useEffect, useRef, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group, Mesh, SkinnedMesh, LoopRepeat } from 'three';

interface CatModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function CatModel({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CatModelProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);


  // Debug: log all objects in the scene with their types
  useEffect(() => {
    console.log('Model loaded. Available animations:', names);
    console.log('=== All objects in scene ===');
    scene.traverse((child) => {
      console.log(`Name: "${child.name}", Type: ${child.type}, Visible: ${child.visible}`);
      if (child instanceof Mesh) {
        const geo = child.geometry;
        console.log(`  -> Geometry: ${geo.type}, Vertices: ${geo.attributes.position?.count || 0}`);
      }
    });
    console.log('=== End of scene objects ===');
  }, [names, scene]);

  useEffect(() => {
    if (!actions || names.length === 0) return;

    // Find the idle animation (case-insensitive) or fallback to first animation
    const idleClipName =
    names.find((n) => n.toLowerCase().includes("idle")) ?? names[0];

  const action = actions[idleClipName];
  if (!action) return;

  action.reset();
  action.setLoop(LoopRepeat, Infinity);
  action.clampWhenFinished = false;
  action.fadeIn(0.2);
  action.play();

  return () => {
    action.fadeOut(0.2);
    action.stop();
  };
}, [actions, names]);

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model to avoid loading delays
CatModel.preload = (url: string) => {
  useGLTF.preload(url);
};
