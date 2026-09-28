import {interpolate, useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

export const LabSequence = ({progress = 1}: {progress?: number}) => {
  const frame = useCurrentFrame();
  const tube = interpolate(frame, [0, 90], [-180, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const wave = interpolate(frame, [70, 190], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * progress;
  const label = interpolate(frame, [190, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "relative", width: 920, height: 500}}>
      <svg viewBox="0 0 920 500" width="920" height="500" style={{position: "absolute", inset: 0}}>
        <g transform={`translate(${tube} 0)`}>
          <rect x="140" y="140" width="70" height="190" rx="18" fill="#F4F7FA" stroke={theme.colors.navy} strokeWidth="5"/>
          <rect x="150" y="242" width="50" height="76" rx="12" fill={theme.colors.coral} opacity=".6"/>
          <rect x="126" y="112" width="98" height="45" rx="10" fill={theme.colors.sky} stroke={theme.colors.navy} strokeWidth="5"/>
        </g>

        <path
          d="M330 250 C365 155 405 345 447 225 C486 110 526 340 570 214 C605 113 652 322 694 218"
          fill="none"
          stroke={theme.colors.violet}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="520"
          strokeDashoffset={520 * (1 - wave)}
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: 330,
          top: 332,
          fontFamily: theme.fonts.display,
          fontSize: 54,
          color: theme.colors.ink,
          opacity: label,
        }}
      >
        Andes virus identified
      </div>
    </div>
  );
};
