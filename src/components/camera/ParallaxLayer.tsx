import type {
  ReactNode,
} from "react";

import {
  interpolate,
  useCurrentFrame,
} from "remotion";

type Props = {
  children: ReactNode;
  durationInFrames: number;
  depth?: number;
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
};

export const ParallaxLayer = ({
  children,
  durationInFrames,
  depth = 1,
  x = 0,
  y = 0,
  scale = 1,
  opacity = 1,
}: Props) => {
  const frame =
    useCurrentFrame();

  const p =
    interpolate(
      frame,
      [
        0,
        Math.max(
          1,
          durationInFrames - 1
        ),
      ],
      [
        0,
        1,
      ],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  return (
    <div
      style={{
        position:
          "absolute",
        inset: 0,
        opacity,
        transform:
          `translate3d(${x * p * depth}px, ${y * p * depth}px, 0) scale(${scale})`,
        transformOrigin:
          "center",
        willChange:
          "transform",
      }}
    >
      {children}
    </div>
  );
};
