"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Grid, Text3D } from "@react-three/drei";
import Rabbit from "./Rabbit";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 50], fov: 90 }}
      style={{ width: "100vw", height: "100vh", background: "#000000" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, 5]} intensity={2} />
      <Environment preset="city" />
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
      <Rabbit />
      <Grid
        args={[300, 100]}
        position={[0, 0, 0]}
        sectionColor={0x00ff00}
        sectionThickness={1.5}
      />
    </Canvas>
  );
}
