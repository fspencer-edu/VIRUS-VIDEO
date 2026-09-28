import {useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

export const VirusParticle = ({
  size = 420,
  cutaway = false,
}: {
  size?: number;
  cutaway?: boolean;
}) => {
  const frame = useCurrentFrame();
  const breathe = 1 + Math.sin(frame / 9) * 0.018;
  const rotate = Math.sin(frame / 40) * 4;

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      style={{
        overflow: "visible",
        transform: `scale(${breathe}) rotate(${rotate}deg)`,
      }}
    >
      {Array.from({length: 22}, (_, i) => {
        const angle = (360 / 22) * i;
        const pulse = 1 + Math.sin((frame + i * 7) / 8) * 0.12;
        return (
          <g key={i} transform={`rotate(${angle} 250 250)`}>
            <line x1="250" y1="57" x2="250" y2={28 - pulse * 2} stroke={theme.colors.violet} strokeWidth="7" strokeLinecap="round"/>
            <circle cx="250" cy="18" r={9 * pulse} fill={theme.colors.coral}/>
          </g>
        );
      })}
      <circle cx="250" cy="250" r="190" fill={theme.colors.lavender} stroke={theme.colors.violet} strokeWidth="6"/>
      <circle
        cx="250"
        cy="250"
        r="163"
        fill={cutaway ? "#FFF8F1" : "#C9B7F0"}
        opacity=".96"
        stroke={theme.colors.violet}
        strokeWidth="3"
      />
      {cutaway ? (
        <>
          <path d="M142 188 C196 128 237 268 294 185 C341 118 376 242 345 296" fill="none" stroke={theme.colors.amber} strokeWidth="10" strokeLinecap="round"/>
          <path d="M151 267 C199 214 235 345 298 268 C334 224 367 292 348 333" fill="none" stroke={theme.colors.coral} strokeWidth="10" strokeLinecap="round"/>
          <path d="M176 335 C216 292 250 370 302 321" fill="none" stroke={theme.colors.sky} strokeWidth="10" strokeLinecap="round"/>
          <text x="210" y="208" fontFamily={theme.fonts.body} fontSize="25" fontWeight="700" fill={theme.colors.ink}>S</text>
          <text x="298" y="280" fontFamily={theme.fonts.body} fontSize="25" fontWeight="700" fill={theme.colors.ink}>M</text>
          <text x="214" y="347" fontFamily={theme.fonts.body} fontSize="25" fontWeight="700" fill={theme.colors.ink}>L</text>
        </>
      ) : null}
    </svg>
  );
};
