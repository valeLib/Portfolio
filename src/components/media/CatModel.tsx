import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group, LoopRepeat } from 'three';
import { gsap } from 'gsap';

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

  // Zoom out animation on load
  useEffect(() => {
    if (!group.current) return;

    gsap.fromTo(
      group.current.scale,
      { x: 0.3, y: 0.3, z: 0.3 },
      {
        x: scale,
        y: scale,
        z: scale,
        duration: 1,
        ease: 'power2.out',
      }
    );
  }, [scale]);

  // Play idle animation
  useEffect(() => {
    if (!actions || names.length === 0) return;

    const idleClipName = names.find((n) => n.toLowerCase().includes('idle')) ?? names[0];
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
    <group
      ref={group}
      position={position}
      rotation={rotation}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

// Preload the model to avoid loading delays
CatModel.preload = (url: string) => {
  useGLTF.preload(url);
};
