import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import { Controls } from "./KeyboardControls";

type Props = {
  moveSpeed?: number;
  rotationSpeed?: number;
};

export default function DebugCamera({
  moveSpeed = 0.1,
  rotationSpeed = 0.02,
}: Props) {
  const { camera } = useThree();
  const [, getKeys] = useKeyboardControls<Controls>();

  const cameraQuaternion = useRef(
    new THREE.Quaternion().copy(camera.quaternion)
  );
  const cameraEuler = useRef(
    new THREE.Euler().setFromQuaternion(cameraQuaternion.current, "YXZ")
  );

  useFrame((_state, delta) => {
    const { forward, back, left, right, lookLeft, lookRight } = getKeys();

    const actualMoveSpeed = moveSpeed * delta * 60;
    const actualRotationSpeed = rotationSpeed * delta * 60;

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, -1);
    const rightVector = new THREE.Vector3(1, 0, 0);

    frontVector.applyQuaternion(camera.quaternion);
    rightVector.applyQuaternion(camera.quaternion);

    frontVector.y = 0;
    rightVector.y = 0;
    frontVector.normalize();
    rightVector.normalize();

    if (forward) {
      direction.add(frontVector.multiplyScalar(actualMoveSpeed));
    }
    if (back) {
      direction.add(frontVector.multiplyScalar(-actualMoveSpeed));
    }
    if (left) {
      direction.add(rightVector.multiplyScalar(-actualMoveSpeed));
    }
    if (right) {
      direction.add(rightVector.multiplyScalar(actualMoveSpeed));
    }

    camera.position.add(direction);

    let rotationDeltaY = 0;
    if (lookLeft) {
      rotationDeltaY += actualRotationSpeed;
    }
    if (lookRight) {
      rotationDeltaY -= actualRotationSpeed;
    }

    if (rotationDeltaY !== 0) {
      cameraEuler.current.y += rotationDeltaY;
      camera.quaternion.setFromEuler(cameraEuler.current);
    }
  });

  return null;
}
