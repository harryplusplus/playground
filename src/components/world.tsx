"use client";

import { Canvas } from "@react-three/fiber";
import { Grid } from "@react-three/drei";

export default function World() {
  return (
    <Canvas
      camera={{ position: [0, 10, 50], fov: 90 }}
      style={{ width: "100vw", height: "100vh", background: "#000000" }}
    >
      <Grid
        args={[300, 100]}
        position={[0, 0, 0]}
        sectionColor={0x00ff00}
        sectionThickness={1.5}
      />
    </Canvas>
  );
}
