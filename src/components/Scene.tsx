"use client";

import { Canvas } from "@react-three/fiber";
import { Grid, Text3D } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 10, 50], fov: 90 }}
      style={{ width: "100vw", height: "100vh", background: "#000000" }}
    >
      <Text3D
        position={[-3, 12, 42]}
        bevelEnabled
        bevelSize={0.1}
        bevelThickness={0.3}
        size={0.6}
        font="/Inter_Bold.json"
      >
        {`Hello!\nI am Harry.`}
        <meshNormalMaterial />
      </Text3D>
      <Grid
        args={[300, 100]}
        position={[0, 0, 0]}
        sectionColor={0x00ff00}
        sectionThickness={1.5}
      />
    </Canvas>
  );
}
