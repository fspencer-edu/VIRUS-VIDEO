import type {ReactNode} from "react";

import {
  Circle,
  Highlight,
  Underline,
} from "@remotion/rough-notation";

import {
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

type BaseProps = {
  children: ReactNode;
  startFrame?: number;
  durationInFrames?: number;
  color: string;
};

const progressFor = (
  frame: number,
  startFrame: number,
  durationInFrames: number
) => interpolate(
  frame,
  [startFrame, startFrame + durationInFrames],
  [0, 1],
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 0.61, 0.36, 1),
  }
);

export const RoughCircleAccent = ({
  children,
  startFrame = 0,
  durationInFrames = 28,
  color,
}: BaseProps) => {
  const frame = useCurrentFrame();
  const progress = progressFor(frame, startFrame, durationInFrames);

  return (
    <Circle
      progress={progress}
      color={color}
      strokeWidth={7}
      iterations={2}
      roughness={1.7}
      padding={{left: 12, right: 12, top: 8, bottom: 8}}
      box="around"
    >
      {children}
    </Circle>
  );
};

export const RoughUnderlineAccent = ({
  children,
  startFrame = 0,
  durationInFrames = 24,
  color,
}: BaseProps) => {
  const frame = useCurrentFrame();
  const progress = progressFor(frame, startFrame, durationInFrames);

  return (
    <Underline
      progress={progress}
      color={color}
      strokeWidth={7}
      iterations={2}
      roughness={1.4}
      padding={{top: 8}}
    >
      {children}
    </Underline>
  );
};

export const RoughHighlightAccent = ({
  children,
  startFrame = 0,
  durationInFrames = 26,
  color,
}: BaseProps) => {
  const frame = useCurrentFrame();
  const progress = progressFor(frame, startFrame, durationInFrames);

  return (
    <Highlight
      progress={progress}
      color={color}
      iterations={2}
      roughness={1.7}
      maxRandomnessOffset={7}
      padding={{left: 10, right: 10, top: 2, bottom: 2}}
      bowing={0.4}
    >
      {children}
    </Highlight>
  );
};
