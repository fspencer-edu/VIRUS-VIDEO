import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  value: number;
  startFrame?: number;
  durationInFrames?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
};

export const AnimatedNumber = ({
  value,
  startFrame = 0,
  durationInFrames = 38,
  decimals = 0,
  suffix = "",
  prefix = "",
}: Props) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const springValue = spring({
    frame: frame - startFrame,
    fps,
    durationInFrames,
    config: {
      damping: 22,
      stiffness: 110,
      mass: 0.8,
    },
  });

  const current = interpolate(springValue, [0, 1], [0, value]);

  return (
    <>
      {prefix}
      {current.toFixed(decimals)}
      {suffix}
    </>
  );
};
