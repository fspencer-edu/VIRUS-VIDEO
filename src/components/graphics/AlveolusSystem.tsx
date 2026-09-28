import {useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

export const AlveolusSystem = ({
  width = 840,
  leak = 0,
}: {
  width?: number;
  leak?: number;
}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 15) * 0.02;

  return (
    <svg viewBox="0 0 900 570" width={width} style={{overflow: "visible"}}>
      <g transform={`translate(440 265) scale(${pulse}) translate(-440 -265)`}>
        <circle cx="340" cy="245" r="120" fill="#FFE0DF" stroke={theme.colors.coralDark} strokeWidth="5"/>
        <circle cx="487" cy="235" r="112" fill="#FFE7E6" stroke={theme.colors.coralDark} strokeWidth="5"/>
        <circle cx="405" cy="355" r="112" fill="#FFE2E1" stroke={theme.colors.coralDark} strokeWidth="5"/>
      </g>

      <path
        d="M70 455 C170 280 315 500 455 335 C570 200 695 234 826 390"
        fill="none"
        stroke={theme.colors.vessel}
        strokeWidth="54"
        strokeLinecap="round"
      />
      <path
        d="M70 455 C170 280 315 500 455 335 C570 200 695 234 826 390"
        fill="none"
        stroke="#9C383F"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {Array.from({length: 13}, (_, i) => {
        const t = ((frame * 2.4 + i * 70) % 760) / 760;
        const x = 76 + t * 740;
        const y = 430 - Math.sin(t * Math.PI * 3.2) * 105;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="17"
            ry="10"
            fill="#BE3A42"
            opacity=".9"
          />
        );
      })}

      {Array.from({length: 16}, (_, i) => {
        const x = 300 + (i % 4) * 62;
        const y = 270 + Math.floor(i / 4) * 42 + leak * 85;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={5 + (i % 3) * 2}
            fill={theme.colors.fluid}
            opacity={leak * 0.75}
          />
        );
      })}

      {Array.from({length: 12}, (_, i) => {
        const progress = ((frame * 1.4 + i * 45) % 350) / 350;
        const x = 315 + progress * 230;
        const y = 170 + (i % 3) * 28 + progress * 145;
        const alpha = (1 - leak * 0.75) * 0.75;
        return (
          <circle key={i} cx={x} cy={y} r="7" fill={theme.colors.oxygen} opacity={alpha}/>
        );
      })}
    </svg>
  );
};
