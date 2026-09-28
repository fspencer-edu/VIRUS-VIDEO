import {Sequence} from "remotion";

import {SceneFrame} from "../../components/layout/SceneFrame";
import {WhipPanBlur} from "../../components/camera/WhipPanBlur";
import {SCENES, sec, TRANSITION_FRAMES} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";

import {MovingTimelineShot} from "./shots/MovingTimelineShot";
import {LabIdentificationShot} from "./shots/LabIdentificationShot";
import {GlobalSpreadShot} from "./shots/GlobalSpreadShot";
import {CaseStatusShot} from "./shots/CaseStatusShot";

export const WhatHappenedScene = () => (
  <SceneFrame
    durationInFrames={SCENES.whatHappened.duration}
    timecode={SCENES.whatHappened.timecode}
    sources={[SOURCES.nejm, SOURCES.whoOutbreak]}
  >
    <Sequence from={0} durationInFrames={sec(12)}>
      <MovingTimelineShot />
    </Sequence>

    <Sequence from={sec(12)} durationInFrames={sec(8)}>
      <LabIdentificationShot />
    </Sequence>

    <Sequence from={sec(20)} durationInFrames={sec(9)}>
      <GlobalSpreadShot />
    </Sequence>

    <Sequence from={sec(29)} durationInFrames={sec(6) + TRANSITION_FRAMES}>
      <CaseStatusShot />
    </Sequence>

    <Sequence from={sec(12) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="left" />
    </Sequence>

    <Sequence from={sec(20) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="right" />
    </Sequence>

    <Sequence from={sec(29) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="left" />
    </Sequence>
  </SceneFrame>
);
