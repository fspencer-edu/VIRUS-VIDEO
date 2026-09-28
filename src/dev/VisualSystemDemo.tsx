import {
  AbsoluteFill,
  Sequence,
} from "remotion";

import {AnimatedRoute} from "../components/visuals/AnimatedRoute";
import {AnimatedNumber} from "../components/visuals/AnimatedNumber";
import {
  RoughCircleAccent,
  RoughHighlightAccent,
  RoughUnderlineAccent,
} from "../components/visuals/HandDrawnEmphasis";
import {RtGenerationVisual} from "../components/visuals/RtGenerationVisual";
import {PaperBackground} from "../components/layout/PaperBackground";
import {VirusParticle} from "../components/graphics/VirusParticle";
import {BreathingLungs} from "../components/graphics/BreathingLungs";
import {theme} from "../theme/theme";

const demoRoute = "M 80 260 C 240 70 470 75 710 250";

export const VisualSystemDemo = () => (
  <AbsoluteFill style={{overflow: "hidden"}}>
    <PaperBackground />

    <Sequence from={0} durationInFrames={120}>
      <div style={{position: "absolute", left: 100, top: 100}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 66}}>
          <RoughUnderlineAccent color={theme.colors.coral} startFrame={18}>
            Hand-drawn emphasis
          </RoughUnderlineAccent>
        </div>
        <div style={{marginTop: 70, fontFamily: theme.fonts.display, fontSize: 90}}>
          <RoughCircleAccent color="rgba(233,111,106,.7)" startFrame={35}>
            <span><AnimatedNumber value={13} startFrame={8} /></span>
          </RoughCircleAccent>
        </div>
      </div>
    </Sequence>

    <Sequence from={120} durationInFrames={120}>
      <div style={{position: "absolute", left: 200, top: 250}}>
        <AnimatedRoute
          d={demoRoute}
          viewBox="0 0 800 360"
          width={800}
          height={360}
          startFrame={0}
          endFrame={90}
          stroke={theme.colors.teal}
          followerColor={theme.colors.coral}
        />
      </div>
      <div style={{position: "absolute", right: 180, top: 210}}>
        <RtGenerationVisual />
      </div>
    </Sequence>

    <Sequence from={240} durationInFrames={120}>
      <div style={{position: "absolute", left: 230, top: 230}}>
        <VirusParticle size={560} cutaway />
      </div>
      <div style={{position: "absolute", right: 220, top: 235}}>
        <BreathingLungs width={620} fluid={0.72} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 660,
          bottom: 120,
          fontFamily: theme.fonts.display,
          fontSize: 54,
        }}
      >
        <RoughHighlightAccent color="rgba(111,163,107,.35)" startFrame={32}>
          reusable science visuals
        </RoughHighlightAccent>
      </div>
    </Sequence>
  </AbsoluteFill>
);
