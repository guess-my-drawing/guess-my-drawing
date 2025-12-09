import Image from "next/image";
import { Canvas } from "@/features/game/components/Canvas";
import { Timer } from "@/features/game/components/Timer";

export default function Home() {
  return (
    <>
      <Timer />
      <Canvas />
    </>
  );
}
