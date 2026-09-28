import {
  linearTiming,
  TransitionSeries,
} from "@remotion/transitions";

import {fade} from "@remotion/transitions/fade";
import {iris} from "@remotion/transitions/iris";
import {wipe} from "@remotion/transitions/wipe";

import {useVideoConfig} from "remotion";

import {
  SCENES,
  TRANSITION_FRAMES,
} from "./data/videoTimeline";

import {OutbreakAtSeaScene} from "./scenes/01-outbreak-at-sea/OutbreakAtSeaScene";
import {WhatHappenedScene} from "./scenes/02-what-happened/WhatHappenedScene";
import {VirusIntroScene} from "./scenes/03-virus-intro/VirusIntroScene";
import {TransmissionScene} from "./scenes/04-transmission/TransmissionScene";
import {PathogenesisScene} from "./scenes/05-pathogenesis/PathogenesisScene";
import {SymptomsScene} from "./scenes/06-symptoms/SymptomsScene";
import {CanadaRiskScene} from "./scenes/07-canada-risk/CanadaRiskScene";
import {PreventionScene} from "./scenes/08-prevention/PreventionScene";

const timing = linearTiming({durationInFrames: TRANSITION_FRAMES});

export const AndesHantavirusVideo = () => {
  const {width, height} = useVideoConfig();

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENES.outbreakAtSea.duration}>
        <OutbreakAtSeaScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={timing}
      />

      <TransitionSeries.Sequence durationInFrames={SCENES.whatHappened.duration}>
        <WhatHappenedScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({direction: "from-right"})}
        timing={timing}
      />

      <TransitionSeries.Sequence durationInFrames={SCENES.virusIntro.duration}>
        <VirusIntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={iris({width, height})}
        timing={timing}
      />

      <TransitionSeries.Sequence durationInFrames={SCENES.transmission.duration}>
        <TransmissionScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({direction: "from-bottom-right"})}
        timing={timing}
      />

      <TransitionSeries.Sequence durationInFrames={SCENES.pathogenesis.duration}>
        <PathogenesisScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade({shouldFadeOutExitingScene: true})}
        timing={timing}
      />

      <TransitionSeries.Sequence durationInFrames={SCENES.symptoms.duration}>
        <SymptomsScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={wipe({direction: "from-left"})}
        timing={timing}
      />

      <TransitionSeries.Sequence durationInFrames={SCENES.canadaRisk.duration}>
        <CanadaRiskScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={timing}
      />

      <TransitionSeries.Sequence durationInFrames={SCENES.prevention.duration}>
        <PreventionScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
