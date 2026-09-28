import type {ReactNode} from "react";

import {CameraMotionBlur} from "@remotion/motion-blur";
import {AbsoluteFill} from "remotion";

type Props = {
  children: ReactNode;
  shutterAngle?: number;
  samples?: number;
};

export const MotionBlurLayer = ({
  children,
  shutterAngle = 90,
  samples = 5,
}: Props) => (
  <CameraMotionBlur
    shutterAngle={shutterAngle}
    samples={samples}
  >
    <AbsoluteFill>
      {children}
    </AbsoluteFill>
  </CameraMotionBlur>
);
