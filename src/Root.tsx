import {
  Composition,
  Folder,
} from "remotion";

import {AndesHantavirusVideo} from "./Video";
import {
  FPS,
  SCENES,
  TOTAL_FRAMES,
} from "./data/videoTimeline";

import {OutbreakAtSeaScene} from "./scenes/01-outbreak-at-sea/OutbreakAtSeaScene";
import {WhatHappenedScene} from "./scenes/02-what-happened/WhatHappenedScene";
import {VirusIntroScene} from "./scenes/03-virus-intro/VirusIntroScene";
import {TransmissionScene} from "./scenes/04-transmission/TransmissionScene";
import {PathogenesisScene} from "./scenes/05-pathogenesis/PathogenesisScene";
import {SymptomsScene} from "./scenes/06-symptoms/SymptomsScene";
import {CanadaRiskScene} from "./scenes/07-canada-risk/CanadaRiskScene";
import {PreventionScene} from "./scenes/08-prevention/PreventionScene";
import {VisualSystemDemo} from "./dev/VisualSystemDemo";

const common = {
  fps: FPS,
  width: 1920,
  height: 1080,
} as const;

export const RemotionRoot = () => (
  <>
    <Composition
      id="AndesHantavirus"
      component={AndesHantavirusVideo}
      durationInFrames={TOTAL_FRAMES}
      {...common}
    />

    <Folder name="Sections">
      <Composition
        id="Andes-01-OutbreakAtSea"
        component={OutbreakAtSeaScene}
        durationInFrames={SCENES.outbreakAtSea.duration}
        {...common}
      />

      <Composition
        id="Andes-02-WhatHappened"
        component={WhatHappenedScene}
        durationInFrames={SCENES.whatHappened.duration}
        {...common}
      />

      <Composition
        id="Andes-03-VirusIntro"
        component={VirusIntroScene}
        durationInFrames={SCENES.virusIntro.duration}
        {...common}
      />

      <Composition
        id="Andes-04-Transmission"
        component={TransmissionScene}
        durationInFrames={SCENES.transmission.duration}
        {...common}
      />

      <Composition
        id="Andes-05-Pathogenesis"
        component={PathogenesisScene}
        durationInFrames={SCENES.pathogenesis.duration}
        {...common}
      />

      <Composition
        id="Andes-06-Symptoms"
        component={SymptomsScene}
        durationInFrames={SCENES.symptoms.duration}
        {...common}
      />

      <Composition
        id="Andes-07-CanadaRisk"
        component={CanadaRiskScene}
        durationInFrames={SCENES.canadaRisk.duration}
        {...common}
      />

      <Composition
        id="Andes-08-Prevention"
        component={PreventionScene}
        durationInFrames={SCENES.prevention.duration}
        {...common}
      />
    </Folder>

    <Folder name="Development">
      <Composition
        id="Andes-Visual-System-Demo"
        component={VisualSystemDemo}
        durationInFrames={360}
        {...common}
      />
    </Folder>
  </>
);
