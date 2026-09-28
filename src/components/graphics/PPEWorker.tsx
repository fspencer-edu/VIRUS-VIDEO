import {theme} from "../../theme/theme";

export const PPEWorker = ({scale = 1}: {scale?: number}) => (
  <svg viewBox="0 0 300 560" width={300 * scale} height={560 * scale}>
    <circle cx="150" cy="85" r="56" fill="#D9A06C" stroke={theme.colors.navy} strokeWidth="5"/>
    <path d="M94 66 Q150 12 206 67 L206 109 Q150 82 94 109Z" fill="#D5E7F7" stroke={theme.colors.navy} strokeWidth="5"/>
    <rect x="106" y="90" width="88" height="48" rx="14" fill="#EDF5FA" stroke={theme.colors.navy} strokeWidth="4"/>
    <path d="M96 153 C75 192 67 290 74 420 H226 C233 290 225 192 204 153Z" fill="#BFD9ED" stroke={theme.colors.navy} strokeWidth="5"/>
    <path d="M82 218 L32 368" stroke="#BFD9ED" strokeWidth="34" strokeLinecap="round"/>
    <path d="M218 218 L268 368" stroke="#BFD9ED" strokeWidth="34" strokeLinecap="round"/>
    <circle cx="31" cy="372" r="22" fill={theme.colors.teal}/>
    <circle cx="269" cy="372" r="22" fill={theme.colors.teal}/>
    <path d="M116 420 L106 548" stroke={theme.colors.navy} strokeWidth="36" strokeLinecap="round"/>
    <path d="M184 420 L194 548" stroke={theme.colors.navy} strokeWidth="36" strokeLinecap="round"/>
  </svg>
);
