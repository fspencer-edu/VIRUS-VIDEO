import {
  interpolate,
  useCurrentFrame,
} from "remotion";

import {
  CinematicCamera,
} from "../../../components/camera/CinematicCamera";

import {
  IllustratedPerson,
} from "../../../components/characters/IllustratedPerson";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import {
  BreathingLungs,
} from "../../../components/graphics/BreathingLungs";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";

export const ProgressionShot = () => {
  const frame =
    useCurrentFrame();

  const severe =
    interpolate(
      frame,
      [
        20,
        230,
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
          330
        }
        from={{
          x: 80,
          scale: 1.05,
        }}
        to={{
          x: -100,
          y: -30,
          scale: 1.26,
        }}
        origin="60% 58%"
      >
        <div
          style={{
            position:
              "absolute",
            left: 180,
            top: 280,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerB
            }
            width={
              350
            }
            sick={
              1
            }
            cough={
              1
            }
            rotate={
              6
            }
          />
        </div>

        <div
          style={{
            position:
              "absolute",
            left: 515,
            top: 180,
            opacity:
              1 -
              severe,
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .symptoms
                .treatmentPhoto
            }
            width={
              720
            }
            height={
              670
            }
            zoom={
              1.08
            }
            panX={
              -18
            }
            showCredit
          />
        </div>

        <div
          style={{
            position:
              "absolute",
            right: 150,
            top: 220,
            opacity:
              severe,
          }}
        >
          <BreathingLungs
            width={
              650
            }
            fluid={
              severe
            }
          />
        </div>
      </CinematicCamera>

      <div
        style={{
          position:
            "absolute",
          left: 850,
          top: 110,
          width: 840,
          fontFamily:
            theme.fonts
              .display,
          fontSize: 58,
          lineHeight: 1.03,
          textAlign:
            "right",
        }}
      >
        Later, breathing
        becomes the major
        concern.
      </div>

      <div
        style={{
          position:
            "absolute",
          left: 750,
          bottom: 150,
          width: 980,
          fontFamily:
            theme.fonts
              .body,
          fontSize: 28,
          color:
            theme.colors
              .muted,
          textAlign:
            "right",
        }}
      >
        Cough • shortness of
        breath • severe
        difficulty breathing
      </div>
    </div>
  );
};
