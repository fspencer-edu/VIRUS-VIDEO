import {
  evolvePath,
  getLength,
  getPointAtLength,
  getTangentAtLength,
} from "@remotion/paths";

import {
  interpolate,
  useCurrentFrame,
} from "remotion";

type Props = {
  d: string;
  viewBox: string;
  width: number;
  height: number;
  startFrame?: number;
  endFrame?: number;
  stroke: string;
  strokeWidth?: number;
  dash?: string;
  opacity?: number;
  follower?: boolean;
  followerRadius?: number;
  followerColor?: string;
  followerOutline?: string;
  rotateFollower?: boolean;
};

export const AnimatedRoute = ({
  d,
  viewBox,
  width,
  height,
  startFrame = 0,
  endFrame = 90,
  stroke,
  strokeWidth = 7,
  dash,
  opacity = 1,
  follower = true,
  followerRadius = 10,
  followerColor = stroke,
  followerOutline = "#FFF9F2",
  rotateFollower = false,
}: Props) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, endFrame],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const evolution = evolvePath(progress, d);
  const total = getLength(d);
  const sampleLength = Math.min(total, Math.max(0, total * progress));
  const point = getPointAtLength(d, sampleLength);
  const tangent = getTangentAtLength(d, sampleLength);
  const angle = tangent ? Math.atan2(tangent.y, tangent.x) * 180 / Math.PI : 0;

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      style={{overflow: "visible"}}
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dash ?? evolution.strokeDasharray}
        strokeDashoffset={dash ? undefined : evolution.strokeDashoffset}
        opacity={opacity}
      />

      {follower && point ? (
        <g
          transform={`translate(${point.x} ${point.y}) rotate(${rotateFollower ? angle : 0})`}
        >
          <circle
            r={followerRadius + 5}
            fill={followerOutline}
            opacity={0.88}
          />
          <circle
            r={followerRadius}
            fill={followerColor}
          />
        </g>
      ) : null}
    </svg>
  );
};
