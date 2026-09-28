import {useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

type Props = {
  scale?: number;
  sick?: number;
  seated?: boolean;
};

export const HumanCharacter = ({
  scale = 1,
  sick = 0,
  seated = false,
}: Props) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame / 18) * 2;
  const tilt = sick * 5;

  return (
    <svg
      viewBox="0 0 270 560"
      width={270 * scale}
      height={560 * scale}
      style={{overflow: "visible", transform: `rotate(${tilt}deg)`}}
    >
      <circle cx="135" cy="87" r="61" fill="#C98239" stroke={theme.colors.navy} strokeWidth="5"/>
      <path d="M75 80 C82 20 192 18 202 90 C185 60 164 49 135 49 C108 49 91 61 75 80Z" fill={theme.colors.navy}/>
      <circle cx="113" cy="85" r="6" fill={theme.colors.black}/>
      <circle cx="158" cy="85" r="6" fill={theme.colors.black}/>
      <path d="M118 111 Q136 124 157 110" stroke={theme.colors.coralDark} strokeWidth="5" fill="none" strokeLinecap="round"/>
      {sick > 0.3 ? <circle cx="176" cy="94" r="18" fill={theme.colors.coral} opacity={0.25 + sick * 0.45}/> : null}
      <path
        d={`M135 151 C92 151 77 197 78 ${329 + breathe} L85 423 C89 456 107 474 135 474 C164 474 182 456 186 423 L193 ${329 + breathe} C194 198 180 151 135 151Z`}
        fill={theme.colors.teal}
        stroke={theme.colors.navy}
        strokeWidth="5"
      />
      <path d="M91 222 L42 351" stroke="#C98239" strokeWidth="28" strokeLinecap="round"/>
      <path d="M179 222 L228 351" stroke="#C98239" strokeWidth="28" strokeLinecap="round"/>
      {seated ? (
        <>
          <path d="M112 455 L57 520" stroke={theme.colors.navy} strokeWidth="34" strokeLinecap="round"/>
          <path d="M158 455 L205 522" stroke={theme.colors.navy} strokeWidth="34" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <path d="M116 469 L100 548" stroke={theme.colors.navy} strokeWidth="34" strokeLinecap="round"/>
          <path d="M156 469 L171 548" stroke={theme.colors.navy} strokeWidth="34" strokeLinecap="round"/>
        </>
      )}
    </svg>
  );
};
