import {Sequence} from "remotion";

import {SceneFrame} from "../../components/layout/SceneFrame";
import {WhipPanBlur} from "../../components/camera/WhipPanBlur";
import {SCENES, sec, TRANSITION_FRAMES} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";

import {TravelIsolationShot} from "./shots/TravelIsolationShot";
import {BalancedRiskShot} from "./shots/BalancedRiskShot";
import {HantavirusMapShot} from "./shots/HantavirusMapShot";
import {SequenceSimilarityShot} from "./shots/SequenceSimilarityShot";
import {LowRiskConclusionShot} from "./shots/LowRiskConclusionShot";

export const CanadaRiskScene = () => (
  <SceneFrame
    durationInFrames={SCENES.canadaRisk.duration}
    timecode={SCENES.canadaRisk.timecode}
    sources={[SOURCES.phacMedia, SOURCES.canadaSymptoms, SOURCES.cdc, SOURCES.nejm]}
  >
    <Sequence from={0} durationInFrames={sec(12)}>
      <TravelIsolationShot />
    </Sequence>

    <Sequence from={sec(12)} durationInFrames={sec(12)}>
      <BalancedRiskShot />
    </Sequence>

    <Sequence from={sec(24)} durationInFrames={sec(12)}>
      <HantavirusMapShot />
    </Sequence>

    <Sequence from={sec(36)} durationInFrames={sec(12)}>
      <SequenceSimilarityShot />
    </Sequence>

    <Sequence from={sec(48)} durationInFrames={sec(12) + TRANSITION_FRAMES}>
      <LowRiskConclusionShot />
    </Sequence>

    <Sequence from={sec(12) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="left" />
    </Sequence>

    <Sequence from={sec(24) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="right" />
    </Sequence>

    <Sequence from={sec(36) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="left" />
    </Sequence>

    <Sequence from={sec(48) - 6} durationInFrames={12}>
      <WhipPanBlur durationInFrames={12} direction="right" />
    </Sequence>
  </SceneFrame>
);
