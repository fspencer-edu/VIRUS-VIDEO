import {useCurrentFrame} from "remotion";
import {pseudoRandom} from "../../utils/anim";
import {theme} from "../../theme/theme";

type Props = {
  count?: number;
  width?: number;
  height?: number;
  startX?: number;
  startY?: number;
  direction?: "right" | "up-right";
  progress?: number;
};

export const AerosolField = ({
  count = 42,
  width = 700,
  height = 360,
  startX = 0,
  startY = 0,
  direction = "right",
  progress = 1,
}: Props) => {
  const frame = useCurrentFrame();

  const particles = Array.from({length: count}, (_, i) => {
    const speed = 0.55 + pseudoRandom(i + 11) * 1.2;
    const amp = 16 + pseudoRandom(i + 31) * 54;
    const baseY = pseudoRandom(i + 53) * height;
    const size = 5 + pseudoRandom(i + 73) * 15;
    const blur = pseudoRandom(i + 101) * 3.5;
    const phase = pseudoRandom(i + 131) * Math.PI * 2;
    const raw = ((frame * speed + pseudoRandom(i + 151) * width) % width);
    const x = startX + raw * progress;
    const drift = Math.sin(frame / (12 + i % 8) + phase) * amp;
    const y =
      direction === "up-right"
        ? startY + baseY - raw * 0.22 + drift
        : startY + baseY + drift;

    return {x, y, size, blur, alpha: 0.25 + pseudoRandom(i + 191) * 0.55};
  });

  return (
    <>
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: i % 5 === 0 ? theme.colors.violet : theme.colors.coral,
            opacity: p.alpha,
            filter: `blur(${p.blur}px)`,
            boxShadow: i % 6 === 0 ? "0 0 16px rgba(156,114,212,.28)" : undefined,
          }}
        />
      ))}
    </>
  );
};
