import {
  interpolate,
  useCurrentFrame,
} from "remotion";

import {
  CinematicCamera,
} from "../../../components/camera/CinematicCamera";

import {
  MotionBlurLayer,
} from "../../../components/camera/MotionBlurLayer";

import {
  VirusParticle,
} from "../../../components/graphics/VirusParticle";

import {
  RoughUnderlineAccent,
} from "../../../components/visuals/HandDrawnEmphasis";

import {
  theme,
} from "../../../theme/theme";

export const VirusDiveShot = () => {
  const frame =
    useCurrentFrame();

  const markerFade =
    interpolate(
      frame,
      [0, 48, 82],
      [1, 1, 0],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const virusFade =
    interpolate(
      frame,
      [50, 88],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const markerScale =
    interpolate(
      frame,
      [0, 75],
      [0.5, 6.4],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const virusScale =
    interpolate(
      frame,
      [55, 150],
      [0.55, 1.15],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const copyFade =
    interpolate(
      frame,
      [82, 118],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  return (
    <div
      style={{
        position:
          "absolute",
        inset: 0,
        overflow:
          "hidden",
        background:
          "radial-gradient(circle at 65% 50%, #293C61 0%, #15233A 46%, #09111F 100%)",
      }}
    >
      <MotionBlurLayer
        shutterAngle={100}
        samples={5}
      >
        <CinematicCamera
          durationInFrames={150}
          from={{
            x: 30,
            scale: 1,
          }}
          to={{
            x: -80,
            y: -10,
            scale: 1.26,
          }}
          origin="65% 50%"
        >
          <div
            style={{
              position:
                "absolute",
              right: 470,
              top: 430,
              width: 120,
              height: 120,
              borderRadius:
                "50%",
              background:
                theme.colors.coral,
              opacity:
                markerFade,
              transform:
                `scale(${markerScale})`,
              boxShadow:
                "0 0 80px rgba(233,111,106,.46)",
            }}
          />

          <div
            style={{
              position:
                "absolute",
              right: 300,
              top: 220,
              opacity:
                virusFade,
              transform:
                `scale(${virusScale})`,
              transformOrigin:
                "center",
            }}
          >
            <VirusParticle
              size={620}
            />
          </div>
        </CinematicCamera>
      </MotionBlurLayer>

      <div
        style={{
          position:
            "absolute",
          left: 105,
          top: 270,
          width: 680,
          opacity:
            copyFade,
          color:
            "#F7F2EA",
        }}
      >
        <div
          style={{
            fontFamily:
              theme.fonts.body,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform:
              "uppercase",
            color:
              "#83D1CF",
          }}
        >
          Outbreak cause
        </div>

        <div
          style={{
            marginTop: 15,
            fontFamily:
              theme.fonts.display,
            fontSize: 82,
            lineHeight: 1,
          }}
        >
          <RoughUnderlineAccent
            startFrame={95}
            durationInFrames={28}
            color={
              theme.colors.coral
            }
          >
            Andes virus
          </RoughUnderlineAccent>
        </div>

        <div
          style={{
            marginTop: 24,
            fontFamily:
              theme.fonts.body,
            fontSize: 29,
            lineHeight: 1.45,
            color:
              "rgba(247,242,234,.80)",
          }}
        >
          A hantavirus capable
          of causing severe
          respiratory disease.
        </div>
      </div>
    </div>
  );
};
