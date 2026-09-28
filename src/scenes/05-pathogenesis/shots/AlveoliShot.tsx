import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";


/* =========================================================
   TYPOGRAPHY
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   HELPERS
   ========================================================= */

const clamp01 = (
  value: number
) =>
  Math.max(
    0,
    Math.min(
      1,
      value
    )
  );


/* =========================================================
   OXYGEN PARTICLES
   ========================================================= */

const OxygenParticles = ({
  active,
}: {
  active: number;
}) => {
  const frame =
    useCurrentFrame();


  return (
    <>
      {Array.from(
        {
          length: 18,
        },
        (
          _,
          index
        ) => {
          const t =
            (
              (
                frame *
                  (
                    1.35 +
                    (
                      index %
                      4
                    ) *
                      0.12
                  ) +
                index *
                  18
              ) %
              150
            ) /
            150;


          /*
           * Starts in alveolar air space,
           * then moves down toward the capillary.
           */
          const x =
            405 +
            t *
              230 +
            Math.sin(
              frame /
                12 +
                index
            ) *
              10;


          const y =
            290 +
            t *
              265 +
            Math.cos(
              frame /
                10 +
                index
            ) *
              9;


          const size =
            8 +
            (
              index %
              3
            ) *
              3;


          const fade =
            interpolate(
              t,
              [
                0,
                0.1,
                0.88,
                1,
              ],
              [
                0,
                1,
                1,
                0,
              ]
            );


          return (
            <span
              key={
                index
              }
              style={{
                position:
                  "absolute",

                left:
                  x,

                top:
                  y,

                width:
                  size,

                height:
                  size,

                borderRadius:
                  "50%",

                background:
                  theme.colors.oxygen,

                opacity:
                  active *
                  fade *
                  (
                    0.58 +
                    (
                      index %
                      3
                    ) *
                      0.12
                  ),

                boxShadow:
                  "0 0 16px rgba(101,167,232,.32)",

                zIndex:
                  20,
              }}
            />
          );
        }
      )}
    </>
  );
};


/* =========================================================
   MOVING BLOOD CELLS
   ========================================================= */

const BloodCells = ({
  active,
}: {
  active: number;
}) => {
  const frame =
    useCurrentFrame();


  return (
    <>
      {Array.from(
        {
          length: 11,
        },
        (
          _,
          index
        ) => {
          const t =
            (
              (
                frame *
                  (
                    1.2 +
                    (
                      index %
                      3
                    ) *
                      0.1
                  ) +
                index *
                  27
              ) %
              170
            ) /
            170;


          const x =
            220 +
            t *
              680;


          const y =
            650 -
            Math.sin(
              t *
                Math.PI *
                2.4
            ) *
              48;


          return (
            <div
              key={
                index
              }
              style={{
                position:
                  "absolute",

                left:
                  x,

                top:
                  y,

                width:
                  30,

                height:
                  18,

                borderRadius:
                  "50%",

                background:
                  "#BE3A42",

                border:
                  "2px solid rgba(140,37,45,.35)",

                opacity:
                  active *
                  0.86,

                transform: `
                  rotate(
                    ${
                      Math.sin(
                        frame /
                          12 +
                          index
                      ) *
                      10
                    }deg
                  )
                `,

                boxShadow:
                  "0 4px 10px rgba(120,30,38,.12)",

                zIndex:
                  18,
              }}
            />
          );
        }
      )}
    </>
  );
};


/* =========================================================
   CALLOUT
   ========================================================= */

const Callout = ({
  left,
  top,
  eyebrow,
  text,
  color,
  progress,
  width = 285,
}: {
  left: number;
  top: number;
  eyebrow: string;
  text: string;
  color: string;
  progress: number;
  width?: number;
}) => {
  const p =
    clamp01(
      progress
    );


  return (
    <div
      style={{
        position:
          "absolute",

        left,
        top,

        width,

        padding:
          "16px 18px",

        borderRadius:
          20,

        background:
          "rgba(255,255,255,.94)",

        border:
          `1px solid ${color}33`,

        boxShadow:
          "0 12px 30px rgba(44,36,30,.08)",

        backdropFilter:
          "blur(10px)",

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 12}px
          )
        `,

        zIndex:
          30,
      }}
    >
      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap:
            8,

          fontFamily:
            FONT_STACK,

          fontSize:
            14,

          fontWeight:
            850,

          letterSpacing:
            1.6,

          textTransform:
            "uppercase",

          color,
        }}
      >
        <span
          style={{
            width:
              8,

            height:
              8,

            borderRadius:
              "50%",

            background:
              color,
          }}
        />

        {eyebrow}
      </div>


      <div
        style={{
          marginTop:
            7,

          fontFamily:
            FONT_STACK,

          fontSize:
            20,

          lineHeight:
            1.3,

          fontWeight:
            650,

          color:
            theme.colors.ink,
        }}
      >
        {text}
      </div>
    </div>
  );
};


/* =========================================================
   PROCESS STEP
   ========================================================= */

const ProcessStep = ({
  number,
  text,
  color,
  progress,
}: {
  number: string;
  text: string;
  color: string;
  progress: number;
}) => {
  const p =
    clamp01(
      progress
    );


  return (
    <div
      style={{
        display:
          "flex",

        alignItems:
          "center",

        gap:
          16,

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 10}px
          )
        `,
      }}
    >
      <div
        style={{
          width:
            46,

          height:
            46,

          flex:
            "0 0 auto",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          borderRadius:
            "50%",

          background:
            color,

          color:
            "#FFFFFF",

          fontFamily:
            FONT_STACK,

          fontSize:
            18,

          fontWeight:
            850,
        }}
      >
        {number}
      </div>


      <div
        style={{
          fontFamily:
            FONT_STACK,

          fontSize:
            23,

          lineHeight:
            1.22,

          fontWeight:
            750,

          color:
            theme.colors.ink,
        }}
      >
        {text}
      </div>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const AlveoliShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     ENTRANCES
     ======================================================= */

  const headerIn =
    spring({
      frame,

      fps,

      config: {
        damping:
          180,

        stiffness:
          90,
      },
    });


  const imageIn =
    spring({
      frame:
        frame -
        8,

      fps,

      config: {
        damping:
          180,

        stiffness:
          82,
      },
    });


  const alveolusReveal =
    interpolate(
      frame,
      [
        24,
        62,
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


  const oxygenReveal =
    interpolate(
      frame,
      [
        54,
        94,
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


  const vesselReveal =
    interpolate(
      frame,
      [
        94,
        138,
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


  const endothelialReveal =
    interpolate(
      frame,
      [
        126,
        168,
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


  const headerProgress =
    clamp01(
      headerIn
    );


  const imageProgress =
    clamp01(
      imageIn
    );


  const pulse =
    1 +
    Math.sin(
      frame /
        16
    ) *
      0.025;


  return (
    <div
      style={{
        position:
          "absolute",

        inset:
          0,

        overflow:
          "hidden",

        background: `
          linear-gradient(
            180deg,
            #F9F6F0 0%,
            #F6EFE7 100%
          )
        `,
      }}
    >

      {/* ================================================= */}
      {/* PAPER TEXTURE                                    */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          opacity:
            0.14,

          backgroundImage: `
            radial-gradient(
              circle,
              rgba(33,54,72,.14) .7px,
              transparent .8px
            )
          `,

          backgroundSize:
            "8px 8px",

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* LEFT COPY                                        */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            82,

          top:
            62,

          width:
            660,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${(1 - headerProgress) * 16}px
            )
          `,

          zIndex:
            30,
        }}
      >

        {/* EYEBROW */}

        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              10,

            padding:
              "11px 17px",

            borderRadius:
              999,

            background:
              "rgba(53,166,161,.13)",

            border:
              "1px solid rgba(53,166,161,.08)",

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            fontWeight:
              850,

            letterSpacing:
              2.2,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,
          }}
        >
          <span
            style={{
              width:
                9,

              height:
                9,

              borderRadius:
                "50%",

              background:
                theme.colors.teal,
            }}
          />

          Deep inside the lungs
        </div>


        {/* ================================================= */}
        {/* TITLE                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              650,

            fontFamily:
              TITLE_STACK,

            fontSize:
              72,

            lineHeight:
              0.94,

            fontWeight:
              850,

            letterSpacing:
              -4,

            color:
              "#17243A",
          }}
        >
          The alveoli sit
          <br />

          beside tiny
          <br />

          blood vessels.
        </div>


        {/* ================================================= */}
        {/* DESCRIPTION                                      */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              24,

            width:
              620,

            fontFamily:
              FONT_STACK,

            fontSize:
              28,

            lineHeight:
              1.38,

            fontWeight:
              570,

            letterSpacing:
              -0.45,

            color:
              "#596D82",
          }}
        >
          This thin interface normally lets oxygen move
          from inhaled air into the bloodstream.
        </div>


        {/* ================================================= */}
        {/* PROCESS                                          */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              38,

            display:
              "grid",

            gap:
              22,
          }}
        >
          <ProcessStep
            number="1"

            text="Air reaches the alveoli"

            color={
              theme.colors.teal
            }

            progress={
              alveolusReveal
            }
          />


          <ProcessStep
            number="2"

            text="Oxygen crosses toward the blood"

            color={
              theme.colors.sky
            }

            progress={
              oxygenReveal
            }
          />


          <ProcessStep
            number="3"

            text="Capillary walls become the next focus"

            color={
              theme.colors.violet
            }

            progress={
              endothelialReveal
            }
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* LARGE ALVEOLUS IMAGE PANEL                       */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            62,

          top:
            64,

          width:
            1110,

          height:
            910,

          overflow:
            "hidden",

          borderRadius:
            38,

          background:
            "rgba(255,255,255,.96)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 26px 70px rgba(56,43,33,.11)",

          opacity:
            imageProgress,

          transform: `
            translateX(
              ${(1 - imageProgress) * 28}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* TOP LABEL                                        */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              28,

            top:
              26,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              9,

            padding:
              "10px 15px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.94)",

            border:
              "1px solid rgba(53,166,161,.14)",

            boxShadow:
              "0 8px 22px rgba(44,36,30,.06)",

            fontFamily:
              FONT_STACK,

            fontSize:
              16,

            fontWeight:
              850,

            letterSpacing:
              1.7,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,

            zIndex:
              40,
          }}
        >
          <span
            style={{
              width:
                8,

              height:
                8,

              borderRadius:
                "50%",

              background:
                theme.colors.teal,
            }}
          />

          Alveolus + capillary
        </div>


        {/* ================================================= */}
        {/* REAL BASE IMAGE                                  */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              70,

            right:
              70,

            top:
              74,

            bottom:
              70,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            transform: `
              scale(
                ${
                  pulse *
                  (
                    0.97 +
                    imageProgress *
                      0.03
                  )
                }
              )
            `,

            transformOrigin:
              "50% 50%",

            zIndex:
              4,
          }}
        >
          <Img
            src={staticFile(
              ASSETS
                .pathogenesis
                .alveolusGasExchange
                .src
            )}

            style={{
              width:
                "100%",

              height:
                "100%",

              objectFit:
                "contain",

              display:
                "block",
            }}
          />
        </div>


        {/* ================================================= */}
        {/* SOFT IMAGE GRADE                                 */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background: `
              radial-gradient(
                circle at 50% 50%,
                transparent 38%,
                rgba(255,255,255,.04) 64%,
                rgba(255,255,255,.18) 100%
              )
            `,

            pointerEvents:
              "none",

            zIndex:
              8,
          }}
        />


        {/* ================================================= */}
        {/* OXYGEN MOVEMENT                                  */}
        {/* ================================================= */}

        <OxygenParticles
          active={
            oxygenReveal
          }
        />


        {/* ================================================= */}
        {/* RED BLOOD CELLS                                  */}
        {/* ================================================= */}

        <BloodCells
          active={
            vesselReveal
          }
        />


        {/* ================================================= */}
        {/* ALVEOLAR FOCUS                                   */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              258,

            top:
              180,

            width:
              410,

            height:
              380,

            borderRadius:
              "50%",

            border: `
              4px
              solid
              rgba(
                233,
                111,
                106,
                ${
                  alveolusReveal *
                  0.34
                }
              )
            `,

            boxShadow: `
              0
              0
              55px
              rgba(
                233,
                111,
                106,
                ${
                  alveolusReveal *
                  0.10
                }
              )
            `,

            transform: `
              scale(
                ${
                  0.96 +
                  Math.sin(
                    frame /
                      15
                  ) *
                    0.02
                }
              )
            `,

            opacity:
              alveolusReveal,

            pointerEvents:
              "none",

            zIndex:
              14,
          }}
        />


        {/* ================================================= */}
        {/* CAPILLARY FOCUS                                  */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              360,

            top:
              515,

            width:
              530,

            height:
              205,

            borderRadius:
              "50%",

            border: `
              4px
              dashed
              rgba(
                156,
                114,
                212,
                ${
                  vesselReveal *
                  0.50
                }
              )
            `,

            transform: `
              scale(
                ${
                  0.98 +
                  Math.sin(
                    frame /
                      13
                  ) *
                    0.015
                }
              )
            `,

            opacity:
              vesselReveal,

            pointerEvents:
              "none",

            zIndex:
              14,
          }}
        />


        {/* ================================================= */}
        {/* ENDOTHELIAL FOCUS                               */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              684,

            top:
              490,

            width:
              120,

            height:
              120,

            borderRadius:
              "50%",

            border: `
              4px
              solid
              rgba(
                235,
                177,
                64,
                ${
                  endothelialReveal *
                  0.8
                }
              )
            `,

            boxShadow: `
              0
              0
              0
              ${
                10 +
                Math.sin(
                  frame /
                    10
                ) *
                  3
              }px
              rgba(
                235,
                177,
                64,
                ${
                  endothelialReveal *
                  0.08
                }
              )
            `,

            opacity:
              endothelialReveal,

            pointerEvents:
              "none",

            zIndex:
              20,
          }}
        />


        {/* ================================================= */}
        {/* ALVEOLUS CALLOUT                                 */}
        {/* ================================================= */}

        <Callout
          left={
            54
          }

          top={
            230
          }

          eyebrow="Alveolus"

          text="A tiny air sac where gas exchange normally occurs."

          color={
            theme.colors.coralDark
          }

          progress={
            alveolusReveal
          }
        />


        {/* ================================================= */}
        {/* OXYGEN CALLOUT                                   */}
        {/* ================================================= */}

        <Callout
          left={
            760
          }

          top={
            212
          }

          eyebrow="Oxygen"

          text="Oxygen normally crosses this thin barrier into the blood."

          color={
            theme.colors.sky
          }

          progress={
            oxygenReveal
          }
        />


        {/* ================================================= */}
        {/* ENDOTHELIAL CALLOUT                              */}
        {/* ================================================= */}

        <Callout
          left={
            760
          }

          top={
            610
          }

          eyebrow="Endothelial cells"

          text="These cells form the lining of the tiny blood vessels beside the alveolus."

          color={
            theme.colors.violet
          }

          progress={
            endothelialReveal
          }

          width={
            300
          }
        />


        {/* ================================================= */}
        {/* BOTTOM PROGRESSION                              */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              38,

            bottom:
              27,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              13,

            fontFamily:
              FONT_STACK,

            fontSize:
              17,

            fontWeight:
              700,

            color:
              theme.colors.muted,

            zIndex:
              40,
          }}
        >
          <span
            style={{
              width:
                9,

              height:
                9,

              borderRadius:
                "50%",

              background:
                theme.colors.coral,
            }}
          />

          Alveolus

          <span
            style={{
              opacity:
                0.45,
            }}
          >
            →
          </span>

          <span
            style={{
              width:
                9,

              height:
                9,

              borderRadius:
                "50%",

              background:
                theme.colors.sky,
            }}
          />

          Oxygen exchange

          <span
            style={{
              opacity:
                0.45,
            }}
          >
            →
          </span>

          <span
            style={{
              width:
                9,

              height:
                9,

              borderRadius:
                "50%",

              background:
                theme.colors.violet,
            }}
          />

          Capillary wall
        </div>
      </div>
    </div>
  );
};