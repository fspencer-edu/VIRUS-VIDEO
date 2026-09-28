import {Sequence} from "remotion";
import {SceneFrame} from "../../components/layout/SceneFrame";
import {WhipPanBlur} from "../../components/camera/WhipPanBlur";
import {SCENES, sec} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";
import {SealBuildingShot} from "./shots/SealBuildingShot";
import {FoodStorageShot} from "./shots/FoodStorageShot";
import {SafeCleaningShot} from "./shots/SafeCleaningShot";
import {PPEIsolationTracingShot} from "./shots/PPEIsolationTracingShot";
import {FinalTakeawayShot} from "./shots/FinalTakeawayShot";

export const PreventionScene = () => (
  <SceneFrame
    durationInFrames={SCENES.prevention.duration}
    timecode={SCENES.prevention.timecode}
    sources={[SOURCES.whoFact, SOURCES.phacAndes, SOURCES.canadaSymptoms, SOURCES.cdc]}
  >
    <Sequence from={0} durationInFrames={sec(6)}><SealBuildingShot /></Sequence>
    <Sequence from={sec(6)} durationInFrames={sec(6)}><FoodStorageShot /></Sequence>
    <Sequence from={sec(12)} durationInFrames={sec(6)}><SafeCleaningShot /></Sequence>
    <Sequence from={sec(18)} durationInFrames={sec(6)}><PPEIsolationTracingShot /></Sequence>
    <Sequence from={sec(24)} durationInFrames={sec(6)}><FinalTakeawayShot /></Sequence>

    <Sequence from={sec(6) - 6} durationInFrames={12}><WhipPanBlur durationInFrames={12} direction="right" /></Sequence>
    <Sequence from={sec(12) - 6} durationInFrames={12}><WhipPanBlur durationInFrames={12} direction="left" /></Sequence>
    <Sequence from={sec(18) - 6} durationInFrames={12}><WhipPanBlur durationInFrames={12} direction="right" /></Sequence>
    <Sequence from={sec(24) - 6} durationInFrames={12}><WhipPanBlur durationInFrames={12} direction="left" /></Sequence>
  </SceneFrame>
);
