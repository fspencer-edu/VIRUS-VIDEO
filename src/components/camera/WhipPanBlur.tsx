import {
  interpolate,
  useCurrentFrame,
} from "remotion";

type Props = {
  durationInFrames: number;
  direction?: "left" | "right";
};

export const WhipPanBlur = ({
  durationInFrames,
  direction = "left",
}: Props) => {
  const frame =
    useCurrentFrame();

  const progress =
    interpolate(
      frame,
      [
        0,
        durationInFrames / 2,
        durationInFrames,
      ],
      [
        0,
        1,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const sign =
    direction === "left"
      ? -1
      : 1;

  return (
    <div
      style={{
        position:
          "absolute",
        inset: 0,
        zIndex: 92,
        pointerEvents:
          "none",
        opacity:
          progress * 0.2,
        transform:
          `translateX(${sign * progress * 34}px)`,
        backdropFilter:
          `blur(${progress * 8}px)`,
        background:
          "rgba(255,255,255,.08)",
      }}
    />
  );
};
