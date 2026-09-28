import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {theme} from "../../../theme/theme";

export const SealBuildingShot = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const patchIn = spring({frame: frame - 20, fps, config: {damping: 170, stiffness: 100}});
  const ratOut = interpolate(frame, [0, 85], [1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const checkIn = interpolate(frame, [85, 125], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 92, top: 84, width: 760}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Prevention starts by keeping rodents out.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.45, color: theme.colors.muted}}>
          Seal openings around buildings so rodents have fewer ways to enter indoor spaces.
        </div>
      </div>

      <div style={{position: "absolute", right: 110, top: 176, width: 930, height: 650, borderRadius: 42, background: "rgba(255,255,255,.90)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 50px rgba(52,42,35,.08)", overflow: "hidden"}}>
        <svg viewBox="0 0 930 650" width="930" height="650">
          <rect x="0" y="486" width="930" height="164" fill="#DCCEBE" />
          <rect x="144" y="174" width="500" height="318" rx="18" fill="#F4E6D3" stroke="#D6C4AF" strokeWidth="6" />
          <polygon points="118,195 394,64 675,195" fill="#D97B63" />
          <rect x="210" y="270" width="98" height="92" rx="10" fill="#EAF3FA" stroke="#9ABFE4" strokeWidth="5" />
          <rect x="360" y="250" width="146" height="242" rx="12" fill="#E6D3BC" stroke="#D0BAA2" strokeWidth="5" />
          <rect x="548" y="276" width="62" height="116" rx="6" fill="#EAF3FA" stroke="#9ABFE4" strokeWidth="5" />
          <path d="M144 430 L644 430" stroke="#D3BFA8" strokeWidth="6" />

          <ellipse cx={672 - (1 - ratOut) * 52} cy={474} rx="42" ry="24" fill="#7A6558" opacity={ratOut} />
          <circle cx={711 - (1 - ratOut) * 52} cy={463} r="15" fill="#7A6558" opacity={ratOut} />
          <circle cx={718 - (1 - ratOut) * 52} cy={454} r="4" fill="#F7D8C9" opacity={ratOut} />
          <path d={`M641 ${470 - (1-ratOut)*4} C 624 462, 610 448, 602 426`} fill="none" stroke="#7A6558" strokeWidth="4" opacity={ratOut} />

          <rect x={644 - patchIn * 72} y={417} width={86} height={72} rx={12} fill="#7FB7DD" stroke="#4F86A8" strokeWidth="6" opacity={0.18 + patchIn * 0.82} />
          <path d="M668 452 L684 468 L710 440" fill="none" stroke={theme.colors.green} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity={checkIn} />
          <circle cx="694" cy="454" r={24 + checkIn * 8} fill="none" stroke={theme.colors.green} strokeWidth="4" opacity={checkIn * 0.65} />
        </svg>
      </div>
    </div>
  );
};
