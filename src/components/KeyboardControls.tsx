// KeyboardControl.tsx
import {
  KeyboardControls as Base,
  KeyboardControlsEntry,
} from "@react-three/drei";
import { useMemo, ReactNode } from "react";

export enum Controls {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  lookLeft = "lookLeft",
  lookRight = "lookRight",
}

type KeyboardControlProps = {
  children?: ReactNode;
};

export default function KeyboardControls({ children }: KeyboardControlProps) {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.lookLeft, keys: ["KeyQ"] },
      { name: Controls.lookRight, keys: ["KeyE"] },
    ],
    []
  );

  return <Base map={map}>{children}</Base>;
}
