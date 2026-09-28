import {interpolate, useCurrentFrame} from "remotion";
import {theme} from "../../../theme/theme";

export const FoodStorageShot = () => {
  const frame = useCurrentFrame();
  const lidDown = interpolate(frame, [22, 86], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const grainsFade = interpolate(frame, [0, 40], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const ratFade = interpolate(frame, [0, 92], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 92, top: 84, width: 760}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Store food in closed containers.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.45, color: theme.colors.muted}}>
          Limiting access to food helps reduce rodent activity around homes, cabins, and storage areas.
        </div>
      </div>

      <div style={{position: "absolute", right: 126, top: 170, width: 880, height: 660, borderRadius: 42, background: "rgba(255,255,255,.90)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 50px rgba(52,42,35,.08)", overflow: "hidden"}}>
        <svg viewBox="0 0 880 660" width="880" height="660">
          <rect x="0" y="530" width="880" height="130" fill="#D6C8B8" />
          <rect x="224" y="180" width="300" height="270" rx="24" fill="#FDFBF9" stroke="#8FB1D1" strokeWidth="7" />
          <rect x="242" y={108 + lidDown * 72} width="264" height="58" rx="18" fill="#9FC3E7" stroke="#6288AD" strokeWidth="7" />
          <rect x="278" y="205" width="192" height="205" rx="12" fill="rgba(245,225,170,.35)" stroke="rgba(255,255,255,.0)" />
          {Array.from({length: 32}, (_, i) => (
            <circle key={i} cx={300 + (i % 8) * 22} cy={244 + Math.floor(i / 8) * 34 + (i % 2) * 7} r="6" fill="#EAB84C" opacity={grainsFade * 0.95} />
          ))}
          <ellipse cx="650" cy="492" rx="42" ry="24" fill="#7A6558" opacity={ratFade} />
          <circle cx="689" cy="481" r="15" fill="#7A6558" opacity={ratFade} />
          <path d="M621 486 C 598 478, 580 456, 573 432" fill="none" stroke="#7A6558" strokeWidth="4" opacity={ratFade} />
          <line x1="724" y1="475" x2="794" y2="442" stroke={theme.colors.red} strokeWidth="7" strokeLinecap="round" opacity={lidDown} />
          <line x1="794" y1="475" x2="724" y2="442" stroke={theme.colors.red} strokeWidth="7" strokeLinecap="round" opacity={lidDown} />
          <circle cx="759" cy="459" r={20 + lidDown * 12} fill="none" stroke={theme.colors.red} strokeWidth="4" opacity={lidDown * 0.7} />
        </svg>
      </div>
    </div>
  );
};
