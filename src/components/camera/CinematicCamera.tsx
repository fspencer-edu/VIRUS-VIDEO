import type {
  CSSProperties,
  ReactNode,
} from "react";

import {
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

type CameraState = {
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
};

type Props = {
  children: ReactNode;
  durationInFrames: number;
  from?: CameraState;
  to?: CameraState;
  origin?: string;
  style?: CSSProperties;
  ease?: "linear" | "cinematic";
};

export const CinematicCamera = ({
  children,
  durationInFrames,
  from = {},
  to = {},
  origin = "50% 50%",
  style,
  ease = "cinematic",
}: Props) => {
  const frame =
    useCurrentFrame();

  const easing =
    ease === "cinematic"
      ? Easing.bezier(
          0.22,
          0.61,
          0.36,
          1
        )
      : Easing.linear;

  const progress =
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
        easing,
      }
    );

  const x =
    interpolate(
      progress,
      [
        0,
        1,
      ],
      [
        from.x ?? 0,
        to.x ?? 0,
      ]
    );

  const y =
    interpolate(
      progress,
      [
        0,
        1,
      ],
      [
        from.y ?? 0,
        to.y ?? 0,
      ]
    );

  const scale =
    interpolate(
      progress,
      [
        0,
        1,
      ],
      [
        from.scale ?? 1,
        to.scale ?? 1,
      ]
    );

  const rotate =
    interpolate(
      progress,
      [
        0,
        1,
      ],
      [
        from.rotate ?? 0,
        to.rotate ?? 0,
      ]
    );

  return (
    <div
      style={{
        position:
          "absolute",
        inset: -90,
        transformOrigin:
          origin,
        transform:
          `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,
        willChange:
          "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
