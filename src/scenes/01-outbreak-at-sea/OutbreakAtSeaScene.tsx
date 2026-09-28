import {Sequence} from "remotion";

import {SceneFrame} from "../../components/layout/SceneFrame";
import {SCENES, sec, TRANSITION_FRAMES} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";

import {CruiseIntroShot} from "./shots/CruiseIntroShot";
import {PortContextShot} from "./shots/PortContextShot";
import {RouteMapShot} from "./shots/RouteMapShot";
import {CasesRevealShot} from "./shots/CasesRevealShot";
import {VirusDiveShot} from "./shots/VirusDiveShot";

export const OutbreakAtSeaScene = () => (
  <SceneFrame
    durationInFrames={SCENES.outbreakAtSea.duration}
    timecode={SCENES.outbreakAtSea.timecode}
    sources={[SOURCES.nejm, SOURCES.whoOutbreak]}
  >
    <Sequence from={0} durationInFrames={sec(5)}>
      <CruiseIntroShot />
    </Sequence>

    <Sequence from={sec(5)} durationInFrames={sec(4)}>
      <PortContextShot />
    </Sequence>

    <Sequence from={sec(9)} durationInFrames={sec(5)}>
      <RouteMapShot />
    </Sequence>

    <Sequence from={sec(14)} durationInFrames={sec(6)}>
      <CasesRevealShot />
    </Sequence>

    <Sequence from={sec(20)} durationInFrames={sec(5) + TRANSITION_FRAMES}>
      <VirusDiveShot />
    </Sequence>
  </SceneFrame>
);
