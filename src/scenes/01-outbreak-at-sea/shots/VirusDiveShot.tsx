import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

import {CinematicCamera} from "../../../components/camera/CinematicCamera";
import {MotionBlurLayer} from "../../../components/camera/MotionBlurLayer";
import {VirusParticle} from "../../../components/graphics/VirusParticle";

const FONT_STACK = 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const TITLE_STACK = FONT_STACK;

const SourceSafeArea = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 56,
      background: "linear-gradient(180deg, rgba(11,18,31,0), rgba(11,18,31,.98) 62%)",
      pointerEvents: "none",
    }}
  />
);

export const VirusDiveShot = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ringGrow = interpolate(frame, [0, 54], [0.3, 8], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const ringFade = interpolate(frame, [0, 44, 70], [1, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const virusIn = spring({frame: frame - 38, fps, config: {damping: 170, stiffness: 75}});
  const copyIn = spring({frame: frame - 72, fps, config: {damping: 180, stiffness: 90}});
  const virusScale = interpolate(frame, [48, 150], [0.72, 1.12], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "radial-gradient(circle at 68% 46%, #344C76 0%, #1A2944 40%, #0A1220 100%)"}}>
      <MotionBlurLayer shutterAngle={90} samples={5}>
        <CinematicCamera durationInFrames={165} from={{x: 30, y: 8, scale: 1.0}} to={{x: -56, y: -16, scale: 1.18}} origin="69% 50%">
          <div style={{position: "absolute", right: 475, top: 420, width: 118, height: 118, borderRadius: "50%", border: "10px solid #F26A60", opacity: ringFade, transform: `scale(${ringGrow})`, boxShadow: "0 0 90px rgba(242,106,96,.35)"}} />
          <div style={{position: "absolute", right: 215, top: 185, opacity: virusIn, transform: `scale(${virusScale})`, transformOrigin: "center", filter: "drop-shadow(0 26px 60px rgba(0,0,0,.30))"}}>
            <VirusParticle size={690} />
          </div>
        </CinematicCamera>
      </MotionBlurLayer>

      <div style={{position: "absolute", left: 102, top: 252, width: 650, opacity: copyIn, transform: `translateY(${(1 - copyIn) * 18}px)`, color: "#F7F2EA"}}>
        <div style={{fontFamily: FONT_STACK, fontSize: 16, fontWeight: 800, letterSpacing: 2.4, textTransform: "uppercase", color: "#83D1CF"}}>
          Outbreak cause revealed
        </div>
        <div style={{marginTop: 16, fontFamily: TITLE_STACK, fontSize: 76, lineHeight: 0.94, fontWeight: 800, letterSpacing: -3.0}}>
          Andes virus
        </div>
        <div style={{marginTop: 24, width: 560, fontFamily: FONT_STACK, fontSize: 27, lineHeight: 1.42, fontWeight: 500, color: "rgba(247,242,234,.78)"}}>
          A hantavirus capable of causing severe cardiopulmonary disease — and, unusually, limited person-to-person transmission.
        </div>
      </div>

      <SourceSafeArea />
    </div>
  );
};
