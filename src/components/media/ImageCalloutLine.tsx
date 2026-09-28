import {interpolate, useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

type Props = {
  width?: number;
  height?: number;
  color?: string;
  reverse?: boolean;
};

export const ImageCalloutLine = ({
  width = 320,
  height = 120,
  color = theme.colors.sky,
  reverse = false,
}: Props) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      <path
        d={reverse
          ? `M${width - 5} 18 C${width * .7} 18 ${width * .7} ${height - 18} 5 ${height - 18}`
          : `M5 18 C${width * .3} 18 ${width * .3} ${height - 18} ${width - 5} ${height - 18}`}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="560"
        strokeDashoffset={560 * (1 - progress)}
      />
    </svg>
  );
};
