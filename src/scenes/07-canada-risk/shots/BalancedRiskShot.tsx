import {interpolate, useCurrentFrame} from "remotion";

import {theme} from "../../../theme/theme";

const BulletCard = ({
  title,
  items,
  color,
  accent,
  x,
  active,
}: {
  title: string;
  items: string[];
  color: string;
  accent: string;
  x: number;
  active: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: 222,
      width: 760,
      height: 560,
      borderRadius: 34,
      background: "rgba(255,255,255,.93)",
      border: `2px solid ${color}`,
      boxShadow: "0 20px 48px rgba(52,42,35,.09)",
      padding: "28px 34px",
      opacity: 0.35 + active * 0.65,
      transform: `translateY(${(1 - active) * 12}px) scale(${0.97 + active * 0.03})`,
    }}
  >
    <div style={{display: "inline-block", padding: "10px 16px", borderRadius: 999, background: accent, fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color}}>
      {title}
    </div>
    <div style={{marginTop: 30, display: "grid", gap: 24}}>
      {items.map((item) => (
        <div key={item} style={{display: "flex", gap: 16, alignItems: "flex-start"}}>
          <div style={{width: 18, height: 18, marginTop: 8, borderRadius: "50%", background: color, flexShrink: 0, boxShadow: `0 0 0 6px ${accent}`}} />
          <div style={{fontFamily: theme.fonts.body, fontSize: 28, lineHeight: 1.35, color: theme.colors.ink}}>{item}</div>
        </div>
      ))}
    </div>
  </div>
);

export const BalancedRiskShot = () => {
  const frame = useCurrentFrame();
  const leftActive = interpolate(frame, [0, 48], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const rightActive = interpolate(frame, [52, 104], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 88, top: 86, width: 920}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Risk in Canada is a balance between reasons for concern and reasons the threat remains limited.
        </div>
      </div>

      <BulletCard
        title="Factors that increase concern"
        color={theme.colors.coralDark}
        accent="rgba(233,111,106,.14)"
        x={84}
        active={leftActive}
        items={[
          "International travel",
          "Severe disease",
          "Possible person-to-person transmission",
        ]}
      />

      <BulletCard
        title="Factors that limit risk"
        color={theme.colors.tealDark}
        accent="rgba(53,166,161,.14)"
        x={1074}
        active={rightActive}
        items={[
          "Close and prolonged contact usually required",
          "Outbreak spread declining",
          "Andes virus mainly associated with South America",
          "Isolation, testing and contact tracing in place",
        ]}
      />
    </div>
  );
};
