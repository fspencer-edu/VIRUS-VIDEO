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
   PARTICLES MOVING THROUGH AIRWAYS
   ========================================================= */

const AirwayParticles = ({
  active,
}: {
  active: number;
}) => {
  const frame =
    useCurrentFrame();


  const particles =
    Array.from(
      {
        length: 24,
      },
      (
        _,
        index
      ) => {
        const offset =
          index *
          12;


        const t =
          (
            (
              frame *
                (
                  1.25 +
                  (
                    index %
                    5
                  ) *
                    0.08
                ) +
              offset
            ) %
            160
          ) /
          160;


        /*
         * First part travels downward through trachea.
         * Second part branches left/right.
         */
        const branch =
          index %
          2 ===
          0
            ? -1
            : 1;


        let x =
          525;

        let y =
          110;


        if (
          t <
          0.45
        ) {
          const phase =
            t /
            0.45;


          x =
            525 +
            Math.sin(
              frame /
                12 +
                index
            ) *
              7;


          y =
            105 +
            245 *
              phase;
        } else {
          const phase =
            (
              t -
              0.45
            ) /
            0.55;


          x =
            525 +
            branch *
              230 *
              phase +
            Math.sin(
              frame /
                10 +
                index
            ) *
              10;


          y =
            350 +
            220 *
              phase +
            Math.cos(
              frame /
                9 +
                index
            ) *
              8;
        }


        const size =
          7 +
          (
            index %
            4
          ) *
            2;


        const fadeAtEnd =
          interpolate(
            t,
            [
              0,
              0.08,
              0.9,
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
                index %
                  3 ===
                0
                  ? theme.colors.coral
                  : theme.colors.violet,

              opacity:
                active *
                fadeAtEnd *
                (
                  0.45 +
                  (
                    index %
                    4
                  ) *
                    0.1
                ),

              filter:
                `blur(${(index % 3) * 0.45}px)`,

              boxShadow:
                index %
                  5 ===
                0
                  ? "0 0 16px rgba(156,114,212,.24)"
                  : undefined,

              zIndex:
                20,
            }}
          />
        );
      }
    );


  return (
    <>
      {particles}
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
}: {
  left: number;
  top: number;
  eyebrow: string;
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
        position:
          "absolute",

        left,
        top,

        width:
          260,

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
   MAIN SHOT
   ========================================================= */

export const AirwayAndLungsShot = () => {
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


  const lungsIn =
    spring({
      frame:
        frame -
        12,

      fps,

      config: {
        damping:
          180,

        stiffness:
          82,
      },
    });


  const airwayReveal =
    interpolate(
      frame,
      [
        28,
        72,
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


  const tissueReveal =
    interpolate(
      frame,
      [
        72,
        112,
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
        104,
        146,
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


  const lungsProgress =
    clamp01(
      lungsIn
    );


  /* =======================================================
     BREATHING MOTION
     ======================================================= */

  const breathing =
    1 +
    Math.sin(
      frame /
        18
    ) *
      0.012;


  const glowPulse =
    0.72 +
    Math.sin(
      frame /
        14
    ) *
      0.12;


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
      {/* BACKGROUND ACCENTS                               */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            -120,

          top:
            -190,

          width:
            980,

          height:
            980,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(101,167,232,.10) 0%,
              rgba(101,167,232,.025) 46%,
              transparent 72%
            )
          `,

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
            690,

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

          Inside the body
        </div>


        {/* ================================================= */}
        {/* MAIN TITLE                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              680,

            fontFamily:
              TITLE_STACK,

            fontSize:
              76,

            lineHeight:
              0.94,

            fontWeight:
              850,

            letterSpacing:
              -4.1,

            color:
              "#17243A",
          }}
        >
          The infection
          <br />

          moves into
          <br />

          the lungs.
        </div>


        {/* ================================================= */}
        {/* DESCRIPTION                                      */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              24,

            width:
              640,

            fontFamily:
              FONT_STACK,

            fontSize:
              29,

            lineHeight:
              1.37,

            fontWeight:
              570,

            letterSpacing:
              -0.5,

            color:
              "#596D82",
          }}
        >
          After exposure, virus-containing particles
          reach the respiratory tract and travel deep
          into lung tissue.
        </div>


        {/* ================================================= */}
        {/* PROCESS                                          */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              40,

            display:
              "grid",

            gap:
              22,
          }}
        >

          {/* Step 1 */}

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                16,

              opacity:
                airwayReveal,
            }}
          >
            <div
              style={{
                width:
                  46,

                height:
                  46,

                borderRadius:
                  "50%",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                background:
                  theme.colors.teal,

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
              1
            </div>

            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  23,

                fontWeight:
                  750,

                color:
                  theme.colors.ink,
              }}
            >
              Particles enter the airways
            </div>
          </div>


          {/* Step 2 */}

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                16,

              opacity:
                tissueReveal,
            }}
          >
            <div
              style={{
                width:
                  46,

                height:
                  46,

                borderRadius:
                  "50%",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                background:
                  theme.colors.coral,

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
              2
            </div>

            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  23,

                fontWeight:
                  750,

                color:
                  theme.colors.ink,
              }}
            >
              Infection reaches lung tissue
            </div>
          </div>


          {/* Step 3 */}

          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                16,

              opacity:
                vesselReveal,
            }}
          >
            <div
              style={{
                width:
                  46,

                height:
                  46,

                borderRadius:
                  "50%",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                background:
                  theme.colors.violet,

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
              3
            </div>

            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  23,

                fontWeight:
                  750,

                color:
                  theme.colors.ink,
              }}
            >
              Tiny blood vessels become important
            </div>
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* LARGE LUNG VISUAL                                */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            68,

          top:
            74,

          width:
            1060,

          height:
            900,

          overflow:
            "hidden",

          borderRadius:
            38,

          background:
            "rgba(255,255,255,.94)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 26px 70px rgba(56,43,33,.11)",

          opacity:
            lungsProgress,

          transform: `
            translateX(
              ${(1 - lungsProgress) * 28}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* PANEL LABEL                                      */}
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
              "rgba(248,250,250,.94)",

            border:
              "1px solid rgba(53,166,161,.14)",

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

          Respiratory tract
        </div>


        {/* ================================================= */}
        {/* LUNG IMAGE                                       */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              120,

            top:
              90,

            width:
              820,

            height:
              720,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            transform: `
              scale(
                ${
                  breathing *
                  (
                    0.94 +
                    lungsProgress *
                      0.06
                  )
                }
              )
            `,

            transformOrigin:
              "50% 55%",

            zIndex:
              5,
          }}
        >
          <Img
            src={staticFile(
              ASSETS
                .pathogenesis
                .lungsOrgan
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
        {/* AIRWAY PATH                                     */}
        {/* ================================================= */}

        <svg
          viewBox="0 0 1060 900"
          width="1060"
          height="900"

          style={{
            position:
              "absolute",

            inset:
              0,

            zIndex:
              12,

            pointerEvents:
              "none",
          }}
        >

          {/* Trachea */}

          <path
            d="
              M525 112
              C525 185 525 240 525 330
            "

            fill="none"

            stroke={
              theme.colors.teal
            }

            strokeWidth="8"

            strokeLinecap="round"

            strokeDasharray="12 12"

            opacity={
              airwayReveal *
              0.72
            }
          />


          {/* Left branch */}

          <path
            d="
              M525 330
              C480 355 420 410 325 550
            "

            fill="none"

            stroke={
              theme.colors.teal
            }

            strokeWidth="7"

            strokeLinecap="round"

            strokeDasharray="12 12"

            opacity={
              airwayReveal *
              0.62
            }
          />


          {/* Right branch */}

          <path
            d="
              M525 330
              C570 355 635 410 735 550
            "

            fill="none"

            stroke={
              theme.colors.teal
            }

            strokeWidth="7"

            strokeLinecap="round"

            strokeDasharray="12 12"

            opacity={
              airwayReveal *
              0.62
            }
          />


          {/* ================================================= */}
          {/* LUNG FOCUS RINGS                                 */}
          {/* ================================================= */}

          <ellipse
            cx="330"
            cy="540"

            rx={
              118 +
              Math.sin(
                frame /
                  12
              ) *
                7
            }

            ry={
              170 +
              Math.sin(
                frame /
                  12
              ) *
                7
            }

            fill="none"

            stroke={
              theme.colors.coral
            }

            strokeWidth="4"

            opacity={
              tissueReveal *
              0.34 *
              glowPulse
            }
          />


          <ellipse
            cx="730"
            cy="540"

            rx={
              118 +
              Math.sin(
                frame /
                  12
              ) *
                7
            }

            ry={
              170 +
              Math.sin(
                frame /
                  12
              ) *
                7
            }

            fill="none"

            stroke={
              theme.colors.coral
            }

            strokeWidth="4"

            opacity={
              tissueReveal *
              0.34 *
              glowPulse
            }
          />


          {/* Vessel focus */}

          <circle
            cx="330"
            cy="600"

            r={
              74 +
              Math.sin(
                frame /
                  10
              ) *
                5
            }

            fill="none"

            stroke={
              theme.colors.violet
            }

            strokeWidth="3"

            strokeDasharray="9 11"

            opacity={
              vesselReveal *
              0.48
            }
          />

          <circle
            cx="730"
            cy="600"

            r={
              74 +
              Math.sin(
                frame /
                  10 +
                  1
              ) *
                5
            }

            fill="none"

            stroke={
              theme.colors.violet
            }

            strokeWidth="3"

            strokeDasharray="9 11"

            opacity={
              vesselReveal *
              0.48
            }
          />
        </svg>


        {/* ================================================= */}
        {/* MOVING PARTICLES                                */}
        {/* ================================================= */}

        <AirwayParticles
          active={
            airwayReveal
          }
        />


        {/* ================================================= */}
        {/* AIRWAY CALLOUT                                  */}
        {/* ================================================= */}

        <Callout
          left={
            690
          }

          top={
            118
          }

          eyebrow="Entry"

          text="Virus-containing particles travel through the respiratory tract."

          color={
            theme.colors.tealDark
          }

          progress={
            airwayReveal
          }
        />


        {/* ================================================= */}
        {/* LUNG TISSUE CALLOUT                             */}
        {/* ================================================= */}

        <Callout
          left={
            58
          }

          top={
            560
          }

          eyebrow="Lung tissue"

          text="The infection reaches deep into the lungs."

          color={
            theme.colors.coralDark
          }

          progress={
            tissueReveal
          }
        />


        {/* ================================================= */}
        {/* BLOOD VESSEL CALLOUT                            */}
        {/* ================================================= */}

        <Callout
          left={
            720
          }

          top={
            660
          }

          eyebrow="Next focus"

          text="Tiny blood vessels surrounding the alveoli become central to severe disease."

          color={
            theme.colors.violet
          }

          progress={
            vesselReveal
          }
        />


        {/* ================================================= */}
        {/* BOTTOM PROGRESSION LABEL                        */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              42,

            bottom:
              28,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              14,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

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
                10,

              height:
                10,

              borderRadius:
                "50%",

              background:
                theme.colors.teal,
            }}
          />

          Airways

          <span
            style={{
              color:
                "rgba(89,109,130,.42)",
            }}
          >
            →
          </span>

          <span
            style={{
              width:
                10,

              height:
                10,

              borderRadius:
                "50%",

              background:
                theme.colors.coral,
            }}
          />

          Lung tissue

          <span
            style={{
              color:
                "rgba(89,109,130,.42)",
            }}
          >
            →
          </span>

          <span
            style={{
              width:
                10,

              height:
                10,

              borderRadius:
                "50%",

              background:
                theme.colors.violet,
            }}
          />

          Tiny blood vessels
        </div>
      </div>
    </div>
  );
};