import { Html } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { useState } from "react";

type Props = { position: Vector3 };

export default function ChatInput({ position }: Props) {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const inputContainerStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "15px",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const inputStyle: React.CSSProperties = {
    width: "300px",
    padding: "8px 12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontFamily: "sans-serif",
    textAlign: "left",
  };

  return (
    <Html position={position} transform wrapperClass="html-input-wrapper">
      <div style={inputContainerStyle}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Please enter your question for Harry..."
          style={inputStyle}
        />
      </div>
    </Html>
  );
}
