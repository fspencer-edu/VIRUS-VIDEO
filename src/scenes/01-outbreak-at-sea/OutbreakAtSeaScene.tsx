import {Sequence} from "remotion";

import {SceneFrame} from "../../components/layout/SceneFrame";

import {
  SCENES,
  sec,
  TRANSITION_FRAMES,
} from "../../data/videoTimeline";

import {SOURCES} from "../../data/sources";

import {MapDepartureShot} from "./shots/MapDepartureShot";
import {ShipInteriorShot} from "./shots/ShipInteriorShot";
import {CasesRevealShot} from "./shots/CasesRevealShot";
import {VirusDiveShot} from "./shots/VirusDiveShot";

export const OutbreakAtSeaScene = () => (
  <SceneFrame
    durationInFrames={SCENES.outbreakAtSea.duration}
    timecode={SCENES.outbreakAtSea.timecode}
    sources={[
      SOURCES.nejm,
      SOURCES.whoOutbreak,
    ]}
  >
    <Sequence
      from={0}
      durationInFrames={sec(7)}
    >
      <MapDepartureShot />
    </Sequence>

    <Sequence
      from={sec(7)}
      durationInFrames={sec(7)}
    >
      <ShipInteriorShot />
    </Sequence>

    <Sequence
      from={sec(14)}
      durationInFrames={sec(6)}
    >
      <CasesRevealShot />
    </Sequence>

    <Sequence
      from={sec(20)}
      durationInFrames={
        sec(5) +
        TRANSITION_FRAMES
      }
    >
      <VirusDiveShot />
    </Sequence>
  </SceneFrame>
);
