import {Sequence} from "remotion";

import {SceneFrame} from "../../components/layout/SceneFrame";
import {SCENES, sec, TRANSITION_FRAMES} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";

import {RodentReservoirShot} from "./shots/RodentReservoirShot";
import {VirusBuildShot} from "./shots/VirusBuildShot";
import {GenomeCutawayShot} from "./shots/GenomeCutawayShot";

export const VirusIntroScene = () => (
  <SceneFrame
    durationInFrames={SCENES.virusIntro.duration}
    timecode={SCENES.virusIntro.timecode}
    sources={[SOURCES.phacAndes, SOURCES.cell]}
  >
    <Sequence from={0} durationInFrames={sec(12)}>
      <RodentReservoirShot />
    </Sequence>

    <Sequence from={sec(12)} durationInFrames={sec(11)}>
      <VirusBuildShot />
    </Sequence>

    <Sequence from={sec(23)} durationInFrames={sec(12) + TRANSITION_FRAMES}>
      <GenomeCutawayShot />
    </Sequence>
  </SceneFrame>
);
