import React, { useMemo } from "react";

type Props = { amplitude: number; roughness: number };
export default function Waves({ amplitude }: Props) {
  const amp = Math.max(0, Math.min(1, amplitude));
  const A = 6 + amp * 16; // px height

  const d = useMemo(() => {
    const width = 800;
    const step = 40;
    let path = `M 0 60 `;
    for (let x = 0; x <= width; x += step) {
      const cx = x + step / 2;
      const y = 60 + (Math.sin(x / 60) * A);
      const cy = 60 + (Math.sin(cx / 60) * A);
      path += `Q ${x + step / 2} ${cy} ${x + step} ${y} `;
    }
    path += `L 800 120 L 0 120 Z`;
    return path;
  }, [A]);

  return (
    <svg aria-hidden viewBox="0 0 800 120"
         style={{ position: "absolute", left:0, right:0, bottom:0 }}>
      <path d={d} fill="currentColor" opacity={0.15}/>
      <path d={d} fill="currentColor" opacity={0.10} transform="translate(0,6)"/>
      <path d={d} fill="currentColor" opacity={0.08} transform="translate(0,12)"/>
    </svg>
  );
}
