import {interpolate, spring} from "remotion";

export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const inOut = (
  frame: number,
  start: number,
  end: number,
  fade = 12
) => {
  const enter = interpolate(frame, [start, start + fade], [0, 1], clamp);
  const exit = interpolate(frame, [end - fade, end], [1, 0], clamp);
  return Math.min(enter, exit);
};

export const pop = (
  frame: number,
  fps: number,
  delay = 0,
  damping = 18
) =>
  spring({
    frame: frame - delay,
    fps,
    config: {damping, stiffness: 110, mass: 0.85},
  });

export const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed * 999.91) * 43758.5453;
  return x - Math.floor(x);
};
