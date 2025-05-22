import { Billboard, RoundedBox, Text } from "@react-three/drei";
import { useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  message: string;
  position: THREE.Vector3;
};

export default function ChatBubble({ message, position }: Props) {
  const textRef = useRef<THREE.Object3D & { sync: (fn: () => void) => void }>(
    null
  );
  const [textSize, setTextSize] = useState<THREE.Vector2>(new THREE.Vector2());

  useLayoutEffect(() => {
    if (textRef.current) {
      console.log("@3", textRef.current);
      console.log("@4", typeof textRef.current.sync === "function");
      textRef.current.sync(() => {
        console.log("@5");
        if (textRef.current) {
          const box = new THREE.Box3().setFromObject(textRef.current);
          const size = new THREE.Vector3();
          box.getSize(size);
          console.log("@@", size);
          setTextSize(new THREE.Vector2(size.x, size.y));
        } else {
          console.log("@1");
        }
      });
      console.log("@6");
    } else {
      console.log("@2");
    }
  }, [message]);

  const paddingX = 0.4;
  const paddingY = 0.3;

  const bubbleWidth = textSize.x + paddingX;
  const bubbleHeight = textSize.y + paddingY;

  return (
    <Billboard position={position}>
      <RoundedBox
        args={[bubbleWidth, bubbleHeight, 0.1]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, -0.01]}
      >
        <meshStandardMaterial color={"#f556e5"} />
      </RoundedBox>
      <Text
        ref={textRef}
        fontSize={0.5}
        color={"white"}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        lineHeight={1.2}
      >
        {message}
      </Text>
    </Billboard>
  );
}
