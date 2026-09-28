import {Sequence} from "remotion";
import {SceneFrame} from "../../components/layout/SceneFrame";
import {WhipPanBlur} from "../../components/camera/WhipPanBlur";
import {SCENES, sec, TRANSITION_FRAMES} from "../../data/videoTimeline";
import {SOURCES} from "../../data/sources";
import {EarlySymptomsShot} from "./shots/EarlySymptomsShot";
import {ProgressionShot} from "./shots/ProgressionShot";
import {SeverityShot} from "./shots/SeverityShot";

export const SymptomsScene = () => (
  <SceneFrame
    durationInFrames={SCENES.symptoms.duration}
    timecode={SCENES.symptoms.timecode}
    sources={[SOURCES.phacAndes, SOURCES.cdc]}
  >
    <Sequence from={0} durationInFrames={sec(11)}><EarlySymptomsShot /></Sequence>
    <Sequence from={sec(11)} durationInFrames={sec(11)}><ProgressionShot /></Sequence>
    <Sequence from={sec(22)} durationInFrames={sec(8) + TRANSITION_FRAMES}><SeverityShot /></Sequence>
    <Sequence from={sec(11) - 6} durationInFrames={12}><WhipPanBlur durationInFrames={12} direction="right" /></Sequence>
    <Sequence from={sec(22) - 6} durationInFrames={12}><WhipPanBlur durationInFrames={12} direction="left" /></Sequence>
  </SceneFrame>
);
