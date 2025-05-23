import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function Rabbit() {
  const { scene, animations } = useGLTF("/Rabbit.glb");
  const { actions, mixer } = useAnimations(animations, scene);

  const wave =
    actions["CharacterArmature|CharacterArmature|CharacterArmature|Wave"]!;
  wave.setLoop(THREE.LoopOnce, 1);
  wave.clampWhenFinished = true;

  const idle =
    actions["CharacterArmature|CharacterArmature|CharacterArmature|Idle"]!;
  idle.setLoop(THREE.LoopRepeat, Infinity);

  const [currentAction, setCurrentAction] = useState(idle);

  useEffect(() => {
    const onFinished = (e: THREE.Event) => {
      if (
        "action" in e &&
        e.action instanceof THREE.AnimationAction &&
        e.action === wave
      ) {
        setCurrentAction(idle);
      }
    };
    mixer.addEventListener("finished", onFinished);

    setCurrentAction(wave);
    return () => {
      mixer.removeEventListener("finished", onFinished);
    };
  }, [actions, mixer, wave, idle]);

  useEffect(() => {
    currentAction.reset().fadeIn(0.3).play();
    return () => {
      currentAction.fadeOut(0.3);
    };
  }, [currentAction]);

  return <primitive object={scene} scale={1.5} position={[0, 0, 35]} />;
}
