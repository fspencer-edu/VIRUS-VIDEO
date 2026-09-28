import {theme} from "../../theme/theme";

export const CruiseShipIllustration = ({width = 640}: {width?: number}) => (
  <svg viewBox="0 0 900 390" width={width} style={{overflow: "visible"}}>
    <path d="M126 230 H816 L750 316 H220 Z" fill="#F4F0EA" stroke={theme.colors.navy} strokeWidth="5" />
    <path d="M220 137 H692 V231 H220 Z" fill="#D9E4ED" stroke={theme.colors.navy} strokeWidth="5" />
    <path d="M310 86 H610 V137 H310 Z" fill="#EFF5FA" stroke={theme.colors.navy} strokeWidth="5" />
    <rect x="576" y="39" width="38" height="50" rx="6" fill={theme.colors.coral} stroke={theme.colors.navy} strokeWidth="5"/>
    {Array.from({length: 9}, (_, i) => (
      <rect
        key={i}
        x={250 + i * 49}
        y="164"
        width="25"
        height="22"
        rx="4"
        fill={theme.colors.sky}
        stroke={theme.colors.navy}
        strokeWidth="3"
      />
    ))}
    <path d="M218 316 H752" stroke={theme.colors.coral} strokeWidth="14" strokeLinecap="round"/>
    <path d="M616 55 C660 52 685 66 712 88" fill="none" stroke={theme.colors.muted} strokeWidth="10" strokeLinecap="round" opacity=".28"/>
  </svg>
);
