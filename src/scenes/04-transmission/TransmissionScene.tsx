import {Sequence} from "remotion";

import {SceneFrame} from "../../components/layout/SceneFrame";
import {SCENES, sec, TRANSITION_FRAMES} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";

import {RodentContaminationShot} from "./shots/RodentContaminationShot";
import {HumanToHumanShot} from "./shots/HumanToHumanShot";
import {AerosolInhalationShot} from "./shots/AerosolInhalationShot";

export const TransmissionScene = () => (
  <SceneFrame
    durationInFrames={SCENES.transmission.duration}
    timecode={SCENES.transmission.timecode}
    sources={[SOURCES.whoFact, SOURCES.whoOutbreak, SOURCES.cdc]}
  >
    <Sequence from={0} durationInFrames={sec(10)}>
      <RodentContaminationShot />
    </Sequence>

    <Sequence from={sec(10)} durationInFrames={sec(10)}>
      <HumanToHumanShot />
    </Sequence>

    <Sequence from={sec(20)} durationInFrames={sec(10) + TRANSITION_FRAMES}>
      <AerosolInhalationShot />
    </Sequence>
  </SceneFrame>
);
