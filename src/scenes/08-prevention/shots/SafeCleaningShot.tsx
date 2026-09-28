import {interpolate, useCurrentFrame} from "remotion";
import {AerosolField} from "../../../components/graphics/AerosolField";
import {theme} from "../../../theme/theme";

export const SafeCleaningShot = () => {
  const frame = useCurrentFrame();
  const spray = interpolate(frame, [10, 55], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const wipe = interpolate(frame, [58, 120], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const forbid = interpolate(frame, [78, 135], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 92, top: 84, width: 760}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Wet and disinfect droppings instead of sweeping.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.45, color: theme.colors.muted}}>
          Moistening contaminated material helps keep infectious particles from becoming airborne.
        </div>
      </div>

      <div style={{position: "absolute", right: 110, top: 168, width: 930, height: 664, borderRadius: 42, background: "rgba(255,255,255,.90)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 50px rgba(52,42,35,.08)", overflow: "hidden"}}>
        <svg viewBox="0 0 930 664" width="930" height="664">
          <rect x="0" y="520" width="930" height="144" fill="#DCCEBE" />
          <rect x="205" y="470" width="465" height="86" rx="16" fill="#C7B9A8" />
          {Array.from({length: 8}, (_, i) => (
            <ellipse key={i} cx={320 + i * 36} cy={514 + (i % 2) * 8} rx="12" ry="7" fill="#6D4F3D" opacity={1 - wipe * 0.95} />
          ))}
          <rect x="118" y="245" width="126" height="176" rx="16" fill="#F2F5FA" stroke="#B9C8D7" strokeWidth="6" />
          <rect x="140" y="212" width="84" height="46" rx="14" fill="#A9C9EA" stroke="#729CC5" strokeWidth="6" />
          <path d={`M240 300 C 300 ${290 - spray*15}, 332 ${330 - spray*8}, 410 ${362 - spray*10}`} fill="none" stroke="#6FAFE5" strokeWidth="10" strokeLinecap="round" opacity={spray} />
          <rect x={408 + wipe * 150} y="424" width="132" height="42" rx="14" fill="#79B7DA" stroke="#4A84A8" strokeWidth="6" />
          <rect x={515 + wipe * 150} y="432" width="154" height="24" rx="8" fill="#FFFDF7" stroke="#D8D0C2" strokeWidth="3" />
          <line x1="718" y1="232" x2="836" y2="350" stroke={theme.colors.red} strokeWidth="8" strokeLinecap="round" opacity={forbid} />
          <line x1="836" y1="232" x2="718" y2="350" stroke={theme.colors.red} strokeWidth="8" strokeLinecap="round" opacity={forbid} />
          <rect x="722" y="202" width="112" height="168" rx="18" fill="#E6DCCF" stroke="#CBBBA8" strokeWidth="6" opacity={forbid} />
          <rect x="746" y="248" width="68" height="98" rx="6" fill="#C9B89C" opacity={forbid} />
        </svg>

        {spray > 0.05 ? <AerosolField count={18} width={190} height={110} startX={290} startY={300} progress={spray * 0.45} direction="up-right" /> : null}
      </div>
    </div>
  );
};
