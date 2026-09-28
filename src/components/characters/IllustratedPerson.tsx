import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

import type {
  StaticAsset,
} from "../../data/assets";

import {
  theme,
} from "../../theme/theme";

type Props = {
  asset: StaticAsset;
  width?: number;
  sick?: number;
  cough?: number;
  flip?: boolean;
  bob?: number;
  rotate?: number;
  opacity?: number;
};

export const IllustratedPerson = ({
  asset,
  width = 250,
  sick = 0,
  cough = 0,
  flip = false,
  bob = 1,
  rotate = 0,
  opacity = 1,
}: Props) => {
  const frame =
    useCurrentFrame();

  const breathe =
    Math.sin(
      frame / 18
    ) *
    3 *
    bob;

  const coughPulse =
    interpolate(
      Math.sin(
        frame / 5
      ),
      [
        -1,
        1,
      ],
      [
        0,
        1,
      ]
    ) *
    cough;

  return (
    <div
      style={{
        position:
          "relative",
        width,
        opacity,
        transform:
          `translateY(${breathe + coughPulse * 5}px) rotate(${rotate + coughPulse * 2}deg) scaleX(${flip ? -1 : 1})`,
        transformOrigin:
          "50% 90%",
        filter:
          sick > 0
            ? `saturate(${1 - sick * 0.15}) contrast(${1 + sick * 0.04})`
            : undefined,
      }}
    >
      <Img
        src={
          staticFile(
            asset.src
          )
        }
        style={{
          width:
            "100%",
          height:
            "auto",
          display:
            "block",
          filter:
            "drop-shadow(0 18px 20px rgba(47,39,32,.12))",
        }}
      />

      {sick > 0 ? (
        <div
          style={{
            position:
              "absolute",
            left:
              "49%",
            top:
              "15%",
            width:
              width * 0.13,
            height:
              width * 0.1,
            borderRadius:
              "50%",
            background:
              theme.colors.coral,
            opacity:
              sick * 0.18,
            filter:
              "blur(8px)",
          }}
        />
      ) : null}

      {cough > 0 ? (
        <>
          {Array.from(
            {
              length: 7,
            },
            (
              _,
              i
            ) => {
              const spread =
                ((frame *
                  (1.7 +
                    i *
                      0.09)) %
                  86) *
                cough;

              return (
                <span
                  key={
                    i
                  }
                  style={{
                    position:
                      "absolute",
                    left:
                      flip
                        ? width *
                            0.24 -
                          spread
                        : width *
                            0.70 +
                          spread,
                    top:
                      width *
                        0.24 +
                      Math.sin(
                        frame /
                          7 +
                          i
                      ) *
                        10,
                    width:
                      5 +
                      (i %
                        3) *
                        2,
                    height:
                      5 +
                      (i %
                        3) *
                        2,
                    borderRadius:
                      "50%",
                    background:
                      theme
                        .colors
                        .coral,
                    opacity:
                      Math.max(
                        0,
                        0.6 -
                          spread /
                            160
                      ),
                    filter:
                      "blur(.5px)",
                  }}
                />
              );
            }
          )}
        </>
      ) : null}
    </div>
  );
};
