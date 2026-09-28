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
   PROCESS STEP
   ========================================================= */

const ProcessStep = ({
  number,
  title,
  detail,
  color,
  progress,
}: {
  number: string;
  title: string;
  detail: string;
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
          "flex-start",

        gap:
          17,

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 12}px
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

          boxShadow:
            `0 9px 22px ${color}2D`,
        }}
      >
        {number}
      </div>


      <div
        style={{
          width:
            570,
        }}
      >
        <div
          style={{
            fontFamily:
              TITLE_STACK,

            fontSize:
              23,

            lineHeight:
              1.12,

            fontWeight:
              800,

            letterSpacing:
              -0.6,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        <div
          style={{
            marginTop:
              5,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            lineHeight:
              1.34,

            fontWeight:
              540,

            color:
              theme.colors.muted,
          }}
        >
          {detail}
        </div>
      </div>
    </div>
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
  width = 290,
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
          40,
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
   LEAK PARTICLES
   ========================================================= */

const LeakParticles = ({
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
          length:
            30,
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
                    1.1 +
                    (
                      index %
                      4
                    ) *
                      0.15
                  ) +
                index *
                  17
              ) %
              150
            ) /
            150;


          const column =
            index %
            5;


          const x =
            570 +
            column *
              23 +
            Math.sin(
              frame /
                11 +
                index
            ) *
              8;


          const y =
            405 +
            t *
              245 +
            Math.cos(
              frame /
                9 +
                index
            ) *
              8;


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
                  size,

                height:
                  size,

                borderRadius:
                  "50%",

                background:
                  theme.colors.fluid,

                opacity:
                  active *
                  fade *
                  (
                    0.32 +
                    (
                      index %
                      4
                    ) *
                      0.1
                  ),

                boxShadow:
                  "0 0 14px rgba(87,160,207,.18)",

                zIndex:
                  24,
              }}
            />
          );
        }
      )}
    </>
  );
};


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
          length:
            20,
        },
        (
          _,
          index
        ) => {
          const t =
            (
              (
                frame *
                  1.3 +
                index *
                  20
              ) %
              150
            ) /
            150;


          const x =
            260 +
            t *
              350 +
            Math.sin(
              frame /
                11 +
                index
            ) *
              9;


          const y =
            290 +
            t *
              210 +
            Math.cos(
              frame /
                10 +
                index
            ) *
              8;


          const size =
            8 +
            (
              index %
              3
            ) *
              2;


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
                  size,

                height:
                  size,

                borderRadius:
                  "50%",

                background:
                  theme.colors.oxygen,

                opacity:
                  (
                    0.32 +
                    (
                      index %
                      3
                    ) *
                      0.12
                  ) *
                  active,

                boxShadow:
                  "0 0 14px rgba(101,167,232,.28)",

                zIndex:
                  23,
              }}
            />
          );
        }
      )}
    </>
  );
};


/* =========================================================
   CAPILLARY GAPS
   ========================================================= */

const CapillaryGaps = ({
  progress,
}: {
  progress: number;
}) => {
  const p =
    clamp01(
      progress
    );


  return (
    <>
      {Array.from(
        {
          length:
            6,
        },
        (
          _,
          index
        ) => {
          const width =
            5 +
            p *
              16;


          return (
            <div
              key={
                index
              }
              style={{
                position:
                  "absolute",

                left:
                  545 +
                  index *
                    30,

                top:
                  372 +
                  index *
                    15,

                width,

                height:
                  34 +
                  p *
                    13,

                borderRadius:
                  999,

                background:
                  "rgba(249,245,239,.92)",

                opacity:
                  p *
                  (
                    0.55 +
                    index *
                      0.05
                  ),

                transform: `
                  rotate(
                    ${
                      -18 +
                      index *
                        7
                    }deg
                  )
                `,

                boxShadow:
                  "0 0 12px rgba(255,255,255,.35)",

                zIndex:
                  26,
              }}
            />
          );
        }
      )}
    </>
  );
};


/* =========================================================
   SMALL LUNG PROGRESSION
   ========================================================= */

const LungProgression = ({
  progress,
}: {
  progress: number;
}) => {
  const p =
    clamp01(
      progress
    );


  const breathingNormal =
    1 +
    Math.sin(
      useCurrentFrame() /
        18
    ) *
      0.012;


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          44,

        right:
          44,

        bottom:
          30,

        height:
          164,

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "space-between",

        padding:
          "0 28px",

        borderRadius:
          24,

        background:
          "rgba(248,249,249,.91)",

        border:
          `1px solid ${theme.colors.line}`,

        boxShadow:
          "0 10px 28px rgba(44,36,30,.05)",

        zIndex:
          35,
      }}
    >
      {/* NORMAL */}

      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap:
            18,
        }}
      >
        <div
          style={{
            width:
              112,

            height:
              118,

            transform:
              `scale(${breathingNormal})`,
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
            }}
          />
        </div>


        <div>
          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                14,

              fontWeight:
                850,

              letterSpacing:
                1.5,

              textTransform:
                "uppercase",

              color:
                theme.colors.tealDark,
            }}
          >
            Normal
          </div>

          <div
            style={{
              marginTop:
                4,

              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              fontWeight:
                700,

              color:
                theme.colors.ink,
            }}
          >
            Air-filled alveoli
          </div>
        </div>
      </div>


      {/* ARROW */}

      <div
        style={{
          fontFamily:
            FONT_STACK,

          fontSize:
            44,

          color:
            theme.colors.coralDark,

          opacity:
            0.72,
        }}
      >
        →
      </div>


      {/* PULMONARY EDEMA */}

      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap:
            18,

          opacity:
            0.45 +
            p *
              0.55,

          transform: `
            translateX(
              ${(1 - p) * 12}px
            )
          `,
        }}
      >
        <div
          style={{
            position:
              "relative",

            width:
              118,

            height:
              118,
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
            }}
          />


          {/* Fluid tint */}

          <div
            style={{
              position:
                "absolute",

              left:
                12,

              right:
                12,

              bottom:
                14,

              height:
                `${20 + p * 45}%`,

              borderRadius:
                "20px 20px 30px 30px",

              background:
                `rgba(83,161,207,${0.12 + p * 0.25})`,

              filter:
                "blur(3px)",

              pointerEvents:
                "none",
            }}
          />
        </div>


        <div>
          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                14,

              fontWeight:
                850,

              letterSpacing:
                1.5,

              textTransform:
                "uppercase",

              color:
                theme.colors.coralDark,
            }}
          >
            Pulmonary edema
          </div>

          <div
            style={{
              marginTop:
                4,

              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              fontWeight:
                700,

              color:
                theme.colors.ink,
            }}
          >
            Fluid-filled lung tissue
          </div>
        </div>
      </div>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const CapillaryLeakShot = () => {
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


  const panelIn =
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


  /* =======================================================
     PATHOGENESIS PROGRESSION
     ======================================================= */

  const permeability =
    interpolate(
      frame,
      [
        24,
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


  const leakage =
    interpolate(
      frame,
      [
        78,
        154,
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


  const oxygenLoss =
    interpolate(
      frame,
      [
        126,
        205,
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


  const edema =
    interpolate(
      frame,
      [
        180,
        280,
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


  const panelProgress =
    clamp01(
      panelIn
    );


  const oxygenStrength =
    1 -
    oxygenLoss *
      0.74;


  const pulse =
    1 +
    Math.sin(
      frame /
        15
    ) *
      0.018;


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
            58,

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
              "rgba(233,111,106,.11)",

            border:
              "1px solid rgba(233,111,106,.08)",

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
              theme.colors.coralDark,
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

          Capillary leak
        </div>


        {/* ================================================= */}
        {/* LARGE TITLE                                      */}
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
          Fluid begins
          <br />

          leaking into
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
              625,

            fontFamily:
              FONT_STACK,

            fontSize:
              27,

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
          As tiny blood vessels become more permeable,
          fluid moves into lung tissue and the alveolar
          spaces where gas exchange normally occurs.
        </div>


        {/* ================================================= */}
        {/* STEPS                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              34,

            display:
              "grid",

            gap:
              19,
          }}
        >
          <ProcessStep
            number="1"

            title="The vessel barrier becomes leaky"

            detail="Gaps between endothelial cells allow fluid to escape."

            color={
              theme.colors.coral
            }

            progress={
              permeability
            }
          />


          <ProcessStep
            number="2"

            title="Fluid accumulates around the alveoli"

            detail="The air spaces begin filling with fluid."

            color={
              theme.colors.sky
            }

            progress={
              leakage
            }
          />


          <ProcessStep
            number="3"

            title="Oxygen exchange falls"

            detail="Less oxygen can move efficiently into the bloodstream."

            color={
              theme.colors.violet
            }

            progress={
              oxygenLoss
            }
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* MAIN PATHOGENESIS PANEL                          */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            62,

          top:
            62,

          width:
            1110,

          height:
            914,

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
            panelProgress,

          transform: `
            translateX(
              ${(1 - panelProgress) * 28}px
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
              "rgba(255,255,255,.94)",

            border:
              "1px solid rgba(233,111,106,.14)",

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
              theme.colors.coralDark,

            zIndex:
              50,
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
                theme.colors.coral,
            }}
          />

          Increasing permeability
        </div>


        {/* ================================================= */}
        {/* REAL PULMONARY EDEMA IMAGE                      */}
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
              70,

            bottom:
              170,

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
                    panelProgress *
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
                .pulmonaryEdema
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
        {/* HEALTHY → LEAKY VESSEL OVERLAY                  */}
        {/* ================================================= */}

        <svg
          viewBox="0 0 1110 914"

          width="1110"

          height="914"

          style={{
            position:
              "absolute",

            inset:
              0,

            pointerEvents:
              "none",

            zIndex:
              15,
          }}
        >
          {/* Capillary highlight */}

          <path
            d="
              M185 520

              C300 405
               430 545
               560 438

              C685 335
               810 380
               930 492
            "

            fill="none"

            stroke={
              theme.colors.coralDark
            }

            strokeWidth="7"

            strokeLinecap="round"

            strokeDasharray="14 13"

            opacity={
              permeability *
              0.46
            }
          />


          {/* Leakage origin halo */}

          <circle
            cx="630"
            cy="438"

            r={
              62 +
              Math.sin(
                frame /
                  11
              ) *
                7
            }

            fill="none"

            stroke={
              theme.colors.coral
            }

            strokeWidth="4"

            opacity={
              permeability *
              0.56
            }
          />


          <circle
            cx="630"
            cy="438"

            r={
              92 +
              Math.sin(
                frame /
                  13
              ) *
                8
            }

            fill="none"

            stroke={
              theme.colors.coral
            }

            strokeWidth="2"

            opacity={
              permeability *
              0.18
            }
          />


          {/* Fluid region */}

          <ellipse
            cx="520"
            cy="560"

            rx={
              145 +
              leakage *
                45
            }

            ry={
              100 +
              leakage *
                38
            }

            fill={
              theme.colors.fluid
            }

            opacity={
              leakage *
              0.11
            }
          />


          {/* Oxygen focus */}

          <circle
            cx="380"
            cy="360"

            r={
              98 +
              Math.sin(
                frame /
                  15
              ) *
                6
            }

            fill="none"

            stroke={
              theme.colors.oxygen
            }

            strokeWidth="3"

            strokeDasharray="10 11"

            opacity={
              oxygenLoss *
              0.45
            }
          />
        </svg>


        {/* ================================================= */}
        {/* GAPS IN ENDOTHELIAL BARRIER                     */}
        {/* ================================================= */}

        <CapillaryGaps
          progress={
            permeability
          }
        />


        {/* ================================================= */}
        {/* LEAKING FLUID                                   */}
        {/* ================================================= */}

        <LeakParticles
          active={
            leakage
          }
        />


        {/* ================================================= */}
        {/* OXYGEN PARTICLES                                */}
        {/* ================================================= */}

        <OxygenParticles
          active={
            oxygenStrength
          }
        />


        {/* ================================================= */}
        {/* CALLOUT — VESSEL                               */}
        {/* ================================================= */}

        <Callout
          left={
            720
          }

          top={
            154
          }

          eyebrow="Vessel wall"

          text="The endothelial barrier becomes more permeable."

          color={
            theme.colors.coralDark
          }

          progress={
            permeability
          }

          width={
            300
          }
        />


        {/* ================================================= */}
        {/* CALLOUT — FLUID                                */}
        {/* ================================================= */}

        <Callout
          left={
            60
          }

          top={
            515
          }

          eyebrow="Fluid leak"

          text="Fluid leaves the blood vessel and enters lung tissue."

          color={
            theme.colors.sky
          }

          progress={
            leakage
          }

          width={
            295
          }
        />


        {/* ================================================= */}
        {/* CALLOUT — OXYGEN                               */}
        {/* ================================================= */}

        <Callout
          left={
            720
          }

          top={
            485
          }

          eyebrow="Gas exchange"

          text="As fluid builds up, oxygen transfer becomes less efficient."

          color={
            theme.colors.violet
          }

          progress={
            oxygenLoss
          }

          width={
            300
          }
        />


        {/* ================================================= */}
        {/* BOTTOM PROGRESSION                             */}
        {/* ================================================= */}

        <LungProgression
          progress={
            edema
          }
        />
      </div>
    </div>
  );
};