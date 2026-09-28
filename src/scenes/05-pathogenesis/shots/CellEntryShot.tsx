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
          16,

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
            44,

          height:
            44,

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
            17,

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
            565,
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
              -0.5,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        <div
          style={{
            marginTop:
              4,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            lineHeight:
              1.33,

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
  width = 255,
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
          "13px 15px",

        borderRadius:
          18,

        background:
          "rgba(255,255,255,.96)",

        border:
          `1px solid ${color}2D`,

        boxShadow:
          "0 10px 28px rgba(44,36,30,.07)",

        backdropFilter:
          "blur(12px)",

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 10}px
          )

          scale(
            ${0.97 + p * 0.03}
          )
        `,

        transformOrigin:
          "center center",

        zIndex:
          50,
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
            13,

          fontWeight:
            850,

          letterSpacing:
            1.45,

          textTransform:
            "uppercase",

          color,
        }}
      >
        <span
          style={{
            width:
              7,

            height:
              7,

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
            6,

          fontFamily:
            FONT_STACK,

          fontSize:
            18,

          lineHeight:
            1.28,

          fontWeight:
            650,

          letterSpacing:
            -0.15,

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
   VIRAL RNA
   ========================================================= */

const ViralRNA = ({
  progress,
}: {
  progress: number;
}) => {
  const frame =
    useCurrentFrame();


  const p =
    clamp01(
      progress
    );


  return (
    <>
      {Array.from(
        {
          length:
            3,
        },
        (
          _,
          index
        ) => {
          const offsetX =
            p *
            (
              96 +
              index *
                38
            );


          const offsetY =
            p *
            (
              -44 +
              index *
                38
            );


          const floatY =
            Math.sin(
              frame /
                10 +
                index *
                  1.6
            ) *
              4;


          return (
            <svg
              key={
                index
              }

              width="122"

              height="56"

              viewBox="0 0 110 50"

              style={{
                position:
                  "absolute",

                left:
                  716 +
                  offsetX,

                top:
                  505 +
                  offsetY +
                  floatY,

                opacity:
                  p,

                transform: `
                  rotate(
                    ${
                      -8 +
                      index *
                        10 +
                      Math.sin(
                        frame /
                          12 +
                          index
                      ) *
                        3
                    }deg
                  )

                  scale(
                    ${0.92 + p * 0.08}
                  )
                `,

                zIndex:
                  35,
              }}
            >
              <path
                d="
                  M4 25
                  C20 7
                   36 43
                   52 25
                  C68 7
                   84 43
                   104 25
                "

                fill="none"

                stroke={
                  theme.colors.amber
                }

                strokeWidth="5"

                strokeLinecap="round"
              />
            </svg>
          );
        }
      )}
    </>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const CellEntryShot = () => {
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
        frame - 8,

      fps,

      config: {
        damping:
          180,

        stiffness:
          82,
      },
    });


  /* =======================================================
     ENTRY STAGES
     ======================================================= */

  const attachment =
    interpolate(
      frame,

      [
        18,
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


  const internalization =
    interpolate(
      frame,

      [
        70,
        145,
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


  const acidification =
    interpolate(
      frame,

      [
        138,
        215,
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


  const fusion =
    interpolate(
      frame,

      [
        210,
        295,
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


  const release =
    interpolate(
      frame,

      [
        270,
        340,
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


  /* =======================================================
     VIRUS POSITION
     Slightly more central than before
     ======================================================= */

  const virusX =
    interpolate(
      frame,

      [
        0,
        72,
        145,
        340,
      ],

      [
        160,
        395,
        610,
        610,
      ],

      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const virusY =
    interpolate(
      frame,

      [
        0,
        72,
        145,
        340,
      ],

      [
        330,
        375,
        470,
        470,
      ],

      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const virusScale =
    0.94 +
    attachment *
      0.10 -
    fusion *
      0.10;


  const virusRotation =
    Math.sin(
      frame /
        14
    ) *
      2;


  const endosomeSize =
    46 +
    internalization *
      205;


  const acidPulse =
    0.82 +
    Math.sin(
      frame /
        10
    ) *
      0.08;


  const endosomePulse =
    1 +
    Math.sin(
      frame /
        14
    ) *
      0.015;


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
      {/* LEFT TEXT                                        */}
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
            655,

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
              "rgba(156,114,212,.11)",

            border:
              "1px solid rgba(156,114,212,.09)",

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
              theme.colors.violet,
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
                theme.colors.violet,
            }}
          />

          Viral entry
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
          The virus
          <br />

          gets pulled
          <br />

          inside the cell.
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
              1.37,

            fontWeight:
              570,

            letterSpacing:
              -0.45,

            color:
              "#596D82",
          }}
        >
          Viral Gn and Gc proteins help Andes virus attach
          to the endothelial cell surface before the cell
          draws the particle inside.
        </div>


        {/* ================================================= */}
        {/* STEPS                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              33,

            display:
              "grid",

            gap:
              17,
          }}
        >
          <ProcessStep
            number="1"

            title="Attachment"

            detail="Gn and Gc interact with the cell surface."

            color={
              theme.colors.coral
            }

            progress={
              attachment
            }
          />


          <ProcessStep
            number="2"

            title="Internalization"

            detail="The cell membrane folds around the virus."

            color={
              theme.colors.teal
            }

            progress={
              internalization
            }
          />


          <ProcessStep
            number="3"

            title="Endosome acidifies"

            detail="Lower pH changes the viral fusion machinery."

            color={
              theme.colors.violet
            }

            progress={
              acidification
            }
          />


          <ProcessStep
            number="4"

            title="Fusion releases viral contents"

            detail="The viral membrane fuses and the genome enters the cell."

            color={
              theme.colors.amber
            }

            progress={
              fusion
            }
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* LARGE CELL ENTRY PANEL                           */}
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

          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,.98) 0%,
              rgba(250,248,246,.98) 100%
            )
          `,

          border:
            "1px solid rgba(17,39,68,.08)",

          boxShadow:
            "0 24px 62px rgba(56,43,33,.09)",

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
        {/* SOFT PANEL GLOW                                  */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              300,

            top:
              170,

            width:
              640,

            height:
              560,

            borderRadius:
              "50%",

            background: `
              radial-gradient(
                circle,
                rgba(156,114,212,.045) 0%,
                rgba(53,166,161,.025) 45%,
                transparent 72%
              )
            `,

            pointerEvents:
              "none",

            zIndex:
              1,
          }}
        />


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
              "rgba(255,255,255,.96)",

            border:
              "1px solid rgba(156,114,212,.15)",

            boxShadow:
              "0 8px 22px rgba(44,36,30,.05)",

            backdropFilter:
              "blur(10px)",

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
              theme.colors.violet,

            zIndex:
              60,
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
                theme.colors.violet,
            }}
          />

          Endothelial cell entry
        </div>


        {/* ================================================= */}
        {/* OUTSIDE / INSIDE LABELS                          */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              46,

            top:
              126,

            padding:
              "7px 10px",

            borderRadius:
              10,

            background:
              "rgba(255,255,255,.70)",

            fontFamily:
              FONT_STACK,

            fontSize:
              14,

            fontWeight:
              800,

            letterSpacing:
              1.7,

            textTransform:
              "uppercase",

            color:
              "rgba(89,109,130,.68)",

            zIndex:
              20,
          }}
        >
          Outside the cell
        </div>


        {/* ================================================= */}
        {/* CELL MEMBRANE                                    */}
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

            zIndex:
              8,

            pointerEvents:
              "none",
          }}
        >
          {/* membrane glow */}

          <path
            d="
              M0 472

              C165 405
               320 538
               510 462

              C690 390
               865 445
               1110 340
            "

            fill="none"

            stroke="rgba(53,166,161,.16)"

            strokeWidth="104"

            strokeLinecap="round"
          />


          {/* secondary membrane wash */}

          <path
            d="
              M0 472

              C165 405
               320 538
               510 462

              C690 390
               865 445
               1110 340
            "

            fill="none"

            stroke="rgba(53,166,161,.08)"

            strokeWidth="72"

            strokeLinecap="round"
          />


          {/* membrane line */}

          <path
            d="
              M0 472

              C165 405
               320 538
               510 462

              C690 390
               865 445
               1110 340
            "

            fill="none"

            stroke={
              theme.colors.tealDark
            }

            strokeWidth="6"

            strokeLinecap="round"

            opacity=".66"
          />


          {/* receptor / attachment marker */}

          <path
            d="
              M367 430
              L367 376

              M354 376
              L380 376
            "

            stroke={
              theme.colors.coralDark
            }

            strokeWidth="7"

            strokeLinecap="round"

            opacity={
              attachment
            }
          />


          {/* membrane wrapping */}

          <path
            d={`
              M395 442

              C440
              ${
                430 -
                internalization *
                  40
              }

              492
              ${
                435 -
                internalization *
                  44
              }

              535
              ${
                466 +
                internalization *
                  16
              }

              C572
              ${
                505 +
                internalization *
                  46
              }

              592
              ${
                554 +
                internalization *
                  46
              }

              632
              ${
                580 +
                internalization *
                  30
              }
            `}

            fill="none"

            stroke={
              theme.colors.tealDark
            }

            strokeWidth="10"

            strokeLinecap="round"

            opacity={
              internalization
            }
          />
        </svg>


        {/* ================================================= */}
        {/* VIRUS                                            */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              virusX,

            top:
              virusY,

            width:
              205,

            height:
              205,

            transform: `
              translate(
                -50%,
                -50%
              )

              rotate(
                ${virusRotation}deg
              )

              scale(
                ${virusScale}
              )
            `,

            transformOrigin:
              "50% 50%",

            opacity:
              1 -
              release *
                0.24,

            filter: `
              drop-shadow(
                0
                16px
                26px
                rgba(
                  83,
                  59,
                  130,
                  .17
                )
              )
            `,

            zIndex:
              30,
          }}
        >
          <Img
            src={
              staticFile(
                ASSETS
                  .virus
                  .cepi
                  .src
              )
            }

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
        {/* ATTACHMENT HALO                                  */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              395,

            top:
              375,

            width:
              132 +
              Math.sin(
                frame /
                  10
              ) *
                6,

            height:
              132 +
              Math.sin(
                frame /
                  10
              ) *
                6,

            borderRadius:
              "50%",

            border:
              `3px solid rgba(233,111,106,${attachment * 0.46})`,

            boxShadow:
              `0 0 0 12px rgba(233,111,106,${attachment * 0.055})`,

            transform:
              "translate(-50%, -50%)",

            opacity:
              attachment *
              (
                1 -
                internalization *
                  0.8
              ),

            zIndex:
              18,
          }}
        />


        {/* ================================================= */}
        {/* ENDOSOME                                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              610,

            top:
              470,

            width:
              endosomeSize,

            height:
              endosomeSize,

            borderRadius:
              "50%",

            transform: `
              translate(
                -50%,
                -50%
              )

              scale(
                ${endosomePulse}
              )
            `,

            background: `
              radial-gradient(
                circle,

                rgba(
                  247,
                  214,
                  204,
                  ${
                    0.16 +
                    acidification *
                      0.46
                  }
                )
                0%,

                rgba(
                  242,
                  178,
                  163,
                  ${
                    0.10 +
                    acidification *
                      0.48
                  }
                )
                62%,

                rgba(
                  156,
                  114,
                  212,
                  .12
                )
                100%
              )
            `,

            border:
              `4px solid rgba(156,114,212,${internalization * 0.66})`,

            boxShadow: `
              0
              0
              ${
                24 +
                acidification *
                  38
              }px
              rgba(
                233,
                111,
                106,
                ${
                  acidification *
                  0.18 *
                  acidPulse
                }
              )
            `,

            opacity:
              internalization,

            zIndex:
              20,
          }}
        />


        {/* ================================================= */}
        {/* ACID PARTICLES                                   */}
        {/* ================================================= */}

        {Array.from(
          {
            length:
              20,
          },
          (
            _,
            index
          ) => {
            const angle =
              (
                index /
                20
              ) *
                Math.PI *
                2 +
              frame /
                80;


            const radius =
              46 +
              (
                index %
                4
              ) *
                18;


            return (
              <div
                key={
                  index
                }

                style={{
                  position:
                    "absolute",

                  left:
                    610 +
                    Math.cos(
                      angle
                    ) *
                      radius,

                  top:
                    470 +
                    Math.sin(
                      angle
                    ) *
                      radius,

                  width:
                    7,

                  height:
                    7,

                  borderRadius:
                    "50%",

                  background:
                    index %
                      3 ===
                    0
                      ? theme.colors.violet
                      : theme.colors.coral,

                  opacity:
                    acidification *
                    (
                      0.24 +
                      (
                        index %
                        4
                      ) *
                        0.08
                    ),

                  boxShadow:
                    index %
                      4 ===
                    0
                      ? "0 0 12px rgba(233,111,106,.20)"
                      : undefined,

                  zIndex:
                    26,
                }}
              />
            );
          }
        )}


        {/* ================================================= */}
        {/* FUSION OPENING                                   */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              706,

            top:
              462,

            width:
              26 +
              fusion *
                122,

            height:
              10 +
              fusion *
                16,

            borderRadius:
              999,

            background: `
              linear-gradient(
                90deg,
                ${theme.colors.amber},
                rgba(245,193,79,.74)
              )
            `,

            opacity:
              fusion,

            transform: `
              rotate(-12deg)

              scaleX(
                ${0.4 + fusion * 0.6}
              )
            `,

            transformOrigin:
              "left center",

            boxShadow:
              `0 0 26px rgba(235,177,64,${fusion * 0.30})`,

            zIndex:
              32,
          }}
        />


        {/* ================================================= */}
        {/* RELEASED RNA                                     */}
        {/* ================================================= */}

        <ViralRNA
          progress={
            release
          }
        />


        {/* ================================================= */}
        {/* GN / GC CALLOUT                                  */}
        {/* ================================================= */}

        <Callout
          left={
            44
          }

          top={
            205
          }

          eyebrow="Gn / Gc"

          text="Surface proteins help the virus attach to the cell."

          color={
            theme.colors.coralDark
          }

          progress={
            attachment
          }

          width={
            255
          }
        />


        {/* ================================================= */}
        {/* INTERNALIZATION CALLOUT                          */}
        {/* ================================================= */}

        <Callout
          left={
            790
          }

          top={
            180
          }

          eyebrow="Internalization"

          text="The cell membrane folds around the attached particle."

          color={
            theme.colors.tealDark
          }

          progress={
            internalization
          }

          width={
            270
          }
        />


        {/* ================================================= */}
        {/* ACIDIC ENDOSOME CALLOUT                          */}
        {/* ================================================= */}

        <Callout
          left={
            804
          }

          top={
            530
          }

          eyebrow="Acidic endosome"

          text="Lower pH triggers a structural change in viral proteins."

          color={
            theme.colors.violet
          }

          progress={
            acidification
          }

          width={
            260
          }
        />


        {/* ================================================= */}
        {/* MEMBRANE FUSION CALLOUT                          */}
        {/* ================================================= */}

        <Callout
          left={
            630
          }

          top={
            705
          }

          eyebrow="Membrane fusion"

          text="Fusion releases the viral genetic material into the cell."

          color={
            theme.colors.amber
          }

          progress={
            fusion
          }

          width={
            320
          }
        />


        {/* ================================================= */}
        {/* BOTTOM STAGE PROGRESSION                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              32,

            bottom:
              24,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              11,

            padding:
              "11px 16px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.94)",

            border:
              "1px solid rgba(17,39,68,.07)",

            boxShadow:
              "0 8px 20px rgba(44,36,30,.05)",

            backdropFilter:
              "blur(10px)",

            fontFamily:
              FONT_STACK,

            fontSize:
              15,

            fontWeight:
              750,

            color:
              theme.colors.muted,

            zIndex:
              60,
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

              opacity:
                0.45 +
                attachment *
                  0.55,
            }}
          />

          <span
            style={{
              color:
                attachment >
                0.7
                  ? theme.colors.ink
                  : theme.colors.muted,
            }}
          >
            Attach
          </span>


          <span
            style={{
              opacity:
                0.34,

              fontSize:
                18,
            }}
          >
            →
          </span>


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

              opacity:
                0.45 +
                internalization *
                  0.55,
            }}
          />

          <span
            style={{
              color:
                internalization >
                0.7
                  ? theme.colors.ink
                  : theme.colors.muted,
            }}
          >
            Enter
          </span>


          <span
            style={{
              opacity:
                0.34,

              fontSize:
                18,
            }}
          >
            →
          </span>


          <span
            style={{
              width:
                8,

              height:
                8,

              borderRadius:
                "50%",

              background:
                theme.colors.violet,

              opacity:
                0.45 +
                acidification *
                  0.55,
            }}
          />

          <span
            style={{
              color:
                acidification >
                0.7
                  ? theme.colors.ink
                  : theme.colors.muted,
            }}
          >
            Acidify
          </span>


          <span
            style={{
              opacity:
                0.34,

              fontSize:
                18,
            }}
          >
            →
          </span>


          <span
            style={{
              width:
                8,

              height:
                8,

              borderRadius:
                "50%",

              background:
                theme.colors.amber,

              opacity:
                0.45 +
                fusion *
                  0.55,
            }}
          />

          <span
            style={{
              color:
                fusion >
                0.7
                  ? theme.colors.ink
                  : theme.colors.muted,
            }}
          >
            Fuse + release
          </span>
        </div>
      </div>
    </div>
  );
};