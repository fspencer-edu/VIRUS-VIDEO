import type {
  ReactNode,
} from "react";

import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

import {
  CinematicOverlay,
} from "../camera/CinematicOverlay";

import {
  PaperBackground,
} from "./PaperBackground";

import {
  SourceStrip,
} from "./SourceStrip";

type Props = {
  children: ReactNode;
  durationInFrames: number;
  timecode: string;
  sources: string[];
};

export const SceneFrame = ({
  children,
  durationInFrames,
  timecode,
  sources,
}: Props) => {
  const frame =
    useCurrentFrame();

  const opacity =
    interpolate(
      frame,
      [
        0,
        7,
        durationInFrames -
          7,
        durationInFrames,
      ],
      [
        0,
        1,
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

  return (
    <AbsoluteFill
      style={{
        opacity,
        overflow:
          "hidden",
      }}
    >
      <PaperBackground />

      {children}

      <CinematicOverlay />

      <SourceStrip
        timecode={
          timecode
        }
        sources={
          sources
        }
      />
    </AbsoluteFill>
  );
};
