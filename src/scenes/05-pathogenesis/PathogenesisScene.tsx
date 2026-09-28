import {Sequence} from "remotion";

import {SceneFrame} from "../../components/layout/SceneFrame";
import {WhipPanBlur} from "../../components/camera/WhipPanBlur";
import {SCENES, sec, TRANSITION_FRAMES} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";

import {AirwayAndLungsShot} from "./shots/AirwayAndLungsShot";
import {AlveoliShot} from "./shots/AlveoliShot";
import {CellEntryShot} from "./shots/CellEntryShot";
import {CapillaryLeakShot} from "./shots/CapillaryLeakShot";

export const PathogenesisScene = () => (
  <SceneFrame
    durationInFrames={SCENES.pathogenesis.duration}
    timecode={SCENES.pathogenesis.timecode}
    sources={[SOURCES.phacAndes, SOURCES.canadaSymptoms, SOURCES.cell]}
  >
    <Sequence from={0} durationInFrames={sec(10)}>
      <AirwayAndLungsShot />
    </Sequence>

    <Sequence from={sec(10)} durationInFrames={sec(10)}>
      <AlveoliShot />
    </Sequence>

    <Sequence from={sec(20)} durationInFrames={sec(14)}>
      <CellEntryShot />
    </Sequence>

    <Sequence from={sec(34)} durationInFrames={sec(16) + TRANSITION_FRAMES}>
      <CapillaryLeakShot />
    </Sequence>

    <Sequence from={sec(10) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="left" />
    </Sequence>

    <Sequence from={sec(20) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="right" />
    </Sequence>

    <Sequence from={sec(34) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="left" />
    </Sequence>
  </SceneFrame>
);
