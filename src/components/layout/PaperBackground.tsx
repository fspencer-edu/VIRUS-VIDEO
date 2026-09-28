import {theme} from "../../theme/theme";
import {pseudoRandom} from "../../utils/anim";

export const PaperBackground = () => {
  const flecks = Array.from({length: 90}, (_, i) => ({
    left: pseudoRandom(i + 1) * 100,
    top: pseudoRandom(i + 91) * 100,
    size: 1 + pseudoRandom(i + 183) * 2.3,
    alpha: 0.035 + pseudoRandom(i + 271) * 0.035,
  }));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background:
          `radial-gradient(circle at 50% 42%, ${theme.colors.background2} 0%, ${theme.colors.background} 66%, #F0E8DE 100%)`,
      }}
    >
      {flecks.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: theme.colors.ink,
            opacity: p.alpha,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 130px rgba(70,48,35,0.08)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
