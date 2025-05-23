import { Grid as Base } from "@react-three/drei";

export default function Grid() {
  return (
    <Base
      args={[300, 100]}
      position={[0, 0, 0]}
      sectionColor={0x00ff00}
      sectionThickness={1.5}
    />
  );
}
