import { Text3D } from "@react-three/drei";

export default function Title() {
  return (
    <Text3D
      position={[-3, 10, 41]}
      bevelEnabled
      bevelSize={0.1}
      bevelThickness={0.3}
      size={0.6}
      letterSpacing={0.12}
      font="/Inter_Bold.json"
    >
      {`Hello!\nI am Harry.`}
      <meshNormalMaterial />
    </Text3D>
  );
}
