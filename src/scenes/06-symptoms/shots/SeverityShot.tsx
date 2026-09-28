import {
  interpolate,
  useCurrentFrame,
} from "remotion";

import {
  CinematicCamera,
} from "../../../components/camera/CinematicCamera";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";

export const SeverityShot = () => {
  const frame =
    useCurrentFrame();

  const text =
    interpolate(
      frame,
      [
        15,
        85,
      ],
      [
        0,
        1,
      ],
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
      }}
    >
      <CinematicCamera
        durationInFrames={
          240
        }
        from={{
          scale: 1.03,
          y: 20,
        }}
        to={{
          scale: 1.18,
          y: -25,
          x: -35,
        }}
        origin="70% 53%"
      >
        <div
          style={{
            position:
              "absolute",
            right: 175,
            top: 145,
            opacity: 0.55,
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .pathogenesis
                .chestXray
            }
            width={
              760
            }
            height={
              760
            }
            zoom={
              1.07
            }
            showCredit
          />
        </div>
      </CinematicCamera>

      <div
        style={{
          position:
            "absolute",
          left: 140,
          top: 275,
          opacity:
            text,
        }}
      >
        <div
          style={{
            fontFamily:
              theme.fonts
                .body,
            fontSize: 27,
            color:
              theme.colors
                .muted,
          }}
        >
          Incubation can
          extend to
        </div>

        <div
          style={{
            fontFamily:
              theme.fonts
                .display,
            fontSize: 108,
            color:
              theme.colors
                .sky,
          }}
        >
          ~42 days
        </div>
      </div>

      <div
        style={{
          position:
            "absolute",
          left: 140,
          top: 585,
          opacity:
            text,
        }}
      >
        <div
          style={{
            fontFamily:
              theme.fonts
                .body,
            fontSize: 27,
            color:
              theme.colors
                .muted,
          }}
        >
          Reported ANDV-HPS
          case fatality
        </div>

        <div
          style={{
            fontFamily:
              theme.fonts
                .display,
            fontSize: 108,
            color:
              theme.colors
                .coralDark,
          }}
        >
          20–40%
        </div>
      </div>
    </div>
  );
};
