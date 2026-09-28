import {useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

export const RodentIllustration = ({
  scale = 1,
}: {
  scale?: number;
}) => {
  const frame = useCurrentFrame();
  const sniff = Math.sin(frame / 5) * 2;
  const tail = Math.sin(frame / 16) * 4;
  const blink = frame % 92 > 84 ? 0.18 : 1;

  return (
    <svg
      viewBox="0 0 520 290"
      width={520 * scale}
      height={290 * scale}
      style={{overflow: "visible"}}
    >
      <path
        d={`M112 190 C30 ${193 + tail} 7 ${143 + tail} 42 116 C66 98 96 104 118 128`}
        fill="none"
        stroke="#D9939B"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <ellipse cx="267" cy="152" rx="145" ry="86" fill="#A87858" stroke="#6F4A38" strokeWidth="4"/>
      <ellipse cx="403" cy="131" rx="72" ry="61" fill="#BC8866" stroke="#6F4A38" strokeWidth="4"/>
      <circle cx="369" cy="77" r="30" fill="#D3A07D" stroke="#6F4A38" strokeWidth="4"/>
      <circle cx="445" cy="91" r="25" fill="#D3A07D" stroke="#6F4A38" strokeWidth="4"/>
      <ellipse cx="420" cy="120" rx="9" ry={9 * blink} fill={theme.colors.black}/>
      <circle cx={468 + sniff} cy="145" r="7" fill={theme.colors.coralDark}/>
      <path d="M446 143 L501 130" stroke="#6F4A38" strokeWidth="3" strokeLinecap="round"/>
      <path d="M446 149 L506 151" stroke="#6F4A38" strokeWidth="3" strokeLinecap="round"/>
      <path d="M446 155 L496 172" stroke="#6F4A38" strokeWidth="3" strokeLinecap="round"/>
      <path d="M207 214 Q187 246 166 258" stroke="#6F4A38" strokeWidth="16" strokeLinecap="round"/>
      <path d="M320 211 Q341 243 365 253" stroke="#6F4A38" strokeWidth="16" strokeLinecap="round"/>
    </svg>
  );
};
