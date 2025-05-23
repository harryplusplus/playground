import { Billboard, RoundedBox, Text } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  message: string;
};

export default function ChatBubble({ message }: Props) {
  const textRef = useRef<THREE.Object3D>(null);
  const [textSize, setTextSize] = useState<THREE.Vector2>(new THREE.Vector2());

  const paddingX = 0.8;
  const paddingY = 0.7;

  const bubbleWidth = textSize.x + paddingX;
  const bubbleHeight = textSize.y + paddingY;

  const onTextSync = () => {
    if (textRef.current) {
      const box = new THREE.Box3().setFromObject(textRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      setTextSize(new THREE.Vector2(size.x, size.y));
    }
  };

  return (
    <Billboard position={[0, 7, 40]}>
      <RoundedBox
        args={[bubbleWidth, bubbleHeight, 0.7]}
        position={[0, 0, -0.5]}
        radius={0.4}
        smoothness={12}
      >
        <meshStandardMaterial color={"#008e85"} />
      </RoundedBox>
      <Text
        ref={textRef}
        fontSize={0.5}
        color={"white"}
        anchorX="center"
        anchorY="middle"
        maxWidth={7}
        lineHeight={1.2}
        onSync={onTextSync}
        overflowWrap="break-word"
        font="/Poppins-Bold.ttf"
      >
        {message}
      </Text>
    </Billboard>
  );
}
