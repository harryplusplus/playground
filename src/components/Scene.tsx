"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Rabbit from "./Rabbit";
import ChatBubble from "./ChatBubble";
import KeyboardControls from "./KeyboardControls";
// import DebugCamera from "./DebugCamera";
import Grid from "./Grid";
import Title from "./Title";
import ChatInput from "./ChatInput";

export default function Scene() {
  return (
    <KeyboardControls>
      <Canvas
        camera={{ position: [0, 5, 50], fov: 90 }}
        style={{ width: "100vw", height: "100vh", background: "#000000" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[-5, 5, 5]} intensity={2} />
        <Environment preset="city" />
        {/* <DebugCamera /> */}
        <Title />
        <ChatBubble message="Nice to meet you. Feel free to ask me about Harry." />
        <Rabbit scale={1.6} position={[0, 0, 30]} />
        <ChatInput position={[0, -1, 40]} />
        <Grid />
      </Canvas>
    </KeyboardControls>
  );
}
