import {interpolate, useCurrentFrame} from "remotion";

import {theme} from "../../../theme/theme";

export const LowRiskConclusionShot = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 40], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const card = interpolate(frame, [35, 85], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #F6F2EA 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 42%, rgba(53,166,161,.12) 0%, transparent 26%), radial-gradient(circle at 50% 42%, rgba(111,163,107,.10) 0%, transparent 38%)", opacity: reveal}} />

      <div style={{position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", opacity: reveal}}>
        <div style={{fontFamily: theme.fonts.body, fontSize: 24, textTransform: "uppercase", letterSpacing: 3, color: theme.colors.muted}}>
          Canadian general population
        </div>
        <div style={{marginTop: 10, fontFamily: theme.fonts.display, fontSize: 106, lineHeight: 1.02, color: theme.colors.ink, textAlign: "center"}}>
          Overall risk to the Canadian general population:
        </div>
        <div style={{marginTop: 14, fontFamily: theme.fonts.display, fontSize: 148, lineHeight: 1, color: theme.colors.green, textAlign: "center", textTransform: "uppercase"}}>
          Low
        </div>
      </div>

      <div style={{position: "absolute", left: 392, bottom: 110, width: 1136, padding: "24px 30px", borderRadius: 28, background: "rgba(255,255,255,.95)", border: `2px solid ${theme.colors.green}`, boxShadow: "0 18px 44px rgba(52,42,35,.10)", opacity: card, transform: `translateY(${(1 - card) * 12}px) scale(${0.96 + card * 0.04})`}}>
        <div style={{fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.45, color: theme.colors.ink, textAlign: "center"}}>
          The outbreak mattered because Andes virus is severe and can rarely spread between people, but the evidence supports a limited Canadian risk: transmission usually needs close, prolonged contact, the outbreak was declining, and public-health controls were already active.
        </div>
      </div>
    </div>
  );
};
