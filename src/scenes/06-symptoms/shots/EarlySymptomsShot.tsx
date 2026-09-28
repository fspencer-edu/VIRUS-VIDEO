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
  CalloutBubble,
} from "../../../components/layout/CalloutBubble";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";

const symptomBubbles = [
  {
    label: "Fever",
    color: theme.colors.coral,
    left: 170,
    top: 250,
  },
  {
    label: "Muscle aches",
    color: theme.colors.sky,
    left: 230,
    top: 625,
  },
  {
    label: "Headache",
    color: theme.colors.violet,
    left: 1305,
    top: 240,
  },
  {
    label: "Nausea",
    color: theme.colors.amber,
    left: 1325,
    top: 625,
  },
];

export const EarlySymptomsShot = () => {
  const frame =
    useCurrentFrame();

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
          y: 40,
          scale: 1.02,
        }}
        to={{
          y: -25,
          x: -20,
          scale: 1.14,
        }}
        origin="50% 58%"
      >
        <div
          style={{
            position:
              "absolute",
            left: 770,
            top: 220,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerA
            }
            width={
              380
            }
            sick={
              0.75
            }
            cough={
              0.1
            }
            rotate={
              3
            }
          />
        </div>

        {symptomBubbles.map(
          (
            item,
            i
          ) => {
            const p =
              interpolate(
                frame,
                [
                  30 +
                    i *
                      34,
                  85 +
                    i *
                      34,
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
                key={
                  item.label
                }
                style={{
                  position:
                    "absolute",
                  left:
                    item.left,
                  top:
                    item.top,
                  opacity:
                    p,
                  transform:
                    `scale(${0.88 + p * 0.12})`,
                }}
              >
                <CalloutBubble
                  width={
                    300
                  }
                  height={
                    185
                  }
                  borderColor={
                    item.color
                  }
                >
                  <div
                    style={{
                      fontFamily:
                        theme
                          .fonts
                          .display,
                      fontSize: 36,
                      textAlign:
                        "center",
                    }}
                  >
                    {
                      item.label
                    }
                  </div>
                </CalloutBubble>
              </div>
            );
          }
        )}
      </CinematicCamera>

      <div
        style={{
          position:
            "absolute",
          left: 85,
          top: 78,
          width: 850,
          fontFamily:
            theme.fonts
              .display,
          fontSize: 61,
          lineHeight: 1.03,
        }}
      >
        Early symptoms can
        look like many other
        infections.
      </div>
    </div>
  );
};
