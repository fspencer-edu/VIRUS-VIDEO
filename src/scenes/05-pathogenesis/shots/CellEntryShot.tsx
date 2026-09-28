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
        display: "flex",
        alignItems: "flex-start",
        gap: 16,

        opacity: p,

        transform: `
          translateY(
            ${(1 - p) * 12}px
          )
        `,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,

          flex: "0 0 auto",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "50%",

          background: color,

          color: "#FFFFFF",

          fontFamily: FONT_STACK,
          fontSize: 17,
          fontWeight: 850,

          boxShadow:
            `0 9px 22px ${color}2D`,
        }}
      >
        {number}
      </div>


      <div
        style={{
          width: 565,
        }}
      >
        <div
          style={{
            fontFamily:
              TITLE_STACK,

            fontSize: 23,
            lineHeight: 1.12,

            fontWeight: 800,

            letterSpacing: -0.5,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        <div
          style={{
            marginTop: 4,

            fontFamily:
              FONT_STACK,

            fontSize: 18,
            lineHeight: 1.33,

            fontWeight: 540,

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
  width = 270,
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
        position: "absolute",

        left,
        top,

        width,

        padding:
          "15px 17px",

        borderRadius: 20,

        background:
          "rgba(255,255,255,.94)",

        border:
          `1px solid ${color}33`,

        boxShadow:
          "0 12px 30px rgba(44,36,30,.08)",

        backdropFilter:
          "blur(10px)",

        opacity: p,

        transform: `
          translateY(
            ${(1 - p) * 10}px
          )
        `,

        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,

          fontFamily:
            FONT_STACK,

          fontSize: 14,

          fontWeight: 850,

          letterSpacing: 1.5,

          textTransform:
            "uppercase",

          color,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,

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
          marginTop: 7,

          fontFamily:
            FONT_STACK,

          fontSize: 19,

          lineHeight: 1.3,

          fontWeight: 650,

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
          length: 3,
        },
        (
          _,
          index
        ) => {
          const offsetX =
            p *
            (
              92 +
              index *
                34
            );


          const offsetY =
            p *
            (
              -38 +
              index *
                34
            );


          return (
            <svg
              key={
                index
              }

              width="110"
              height="50"

              viewBox="0 0 110 50"

              style={{
                position:
                  "absolute",

                left:
                  730 +
                  offsetX,

                top:
                  480 +
                  offsetY,

                opacity: p,

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
                `,

                zIndex: 35,
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
        damping: 180,
        stiffness: 90,
      },
    });


  const panelIn =
    spring({
      frame:
        frame - 8,

      fps,

      config: {
        damping: 180,
        stiffness: 82,
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
        130,
        365,
        600,
        600,
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
        300,
        350,
        455,
        455,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const virusScale =
    0.88 +
    attachment *
      0.12 -
    fusion *
      0.12;


  const virusRotation =
    Math.sin(
      frame /
        14
    ) *
      2;


  const endosomeSize =
    40 +
    internalization *
      175;


  const acidPulse =
    0.82 +
    Math.sin(
      frame /
        10
    ) *
      0.08;


  return (
    <div
      style={{
        position: "absolute",

        inset: 0,

        overflow: "hidden",

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
          position: "absolute",

          inset: 0,

          opacity: 0.14,

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
          position: "absolute",

          left: 82,
          top: 58,

          width: 655,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${(1 - headerProgress) * 16}px
            )
          `,

          zIndex: 30,
        }}
      >

        {/* EYEBROW */}

        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap: 10,

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

            fontSize: 18,

            fontWeight: 850,

            letterSpacing: 2.2,

            textTransform:
              "uppercase",

            color:
              theme.colors.violet,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,

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
            marginTop: 22,

            width: 650,

            fontFamily:
              TITLE_STACK,

            fontSize: 72,

            lineHeight: 0.94,

            fontWeight: 850,

            letterSpacing: -4,

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
            marginTop: 24,

            width: 625,

            fontFamily:
              FONT_STACK,

            fontSize: 27,

            lineHeight: 1.37,

            fontWeight: 570,

            letterSpacing: -0.45,

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
            marginTop: 33,

            display: "grid",

            gap: 17,
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
          position: "absolute",

          right: 62,
          top: 62,

          width: 1110,
          height: 914,

          overflow: "hidden",

          borderRadius: 38,

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

          zIndex: 10,
        }}
      >

        {/* ================================================= */}
        {/* PANEL LABEL                                      */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            left: 28,
            top: 26,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap: 9,

            padding:
              "10px 15px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.94)",

            border:
              "1px solid rgba(156,114,212,.15)",

            fontFamily:
              FONT_STACK,

            fontSize: 16,

            fontWeight: 850,

            letterSpacing: 1.7,

            textTransform:
              "uppercase",

            color:
              theme.colors.violet,

            zIndex: 60,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,

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
            position: "absolute",

            left: 46,
            top: 125,

            fontFamily:
              FONT_STACK,

            fontSize: 15,

            fontWeight: 800,

            letterSpacing: 1.8,

            textTransform:
              "uppercase",

            color:
              "rgba(89,109,130,.62)",

            zIndex: 20,
          }}
        >
          Outside the cell
        </div>


        <div
          style={{
            position: "absolute",

            left: 46,
            bottom: 42,

            fontFamily:
              FONT_STACK,

            fontSize: 15,

            fontWeight: 800,

            letterSpacing: 1.8,

            textTransform:
              "uppercase",

            color:
              "rgba(89,109,130,.62)",

            zIndex: 20,
          }}
        >
          Inside the cell
        </div>


        {/* ================================================= */}
        {/* CELL MEMBRANE                                    */}
        {/* ================================================= */}

        <svg
          viewBox="0 0 1110 914"

          width="1110"
          height="914"

          style={{
            position: "absolute",

            inset: 0,

            zIndex: 8,

            pointerEvents:
              "none",
          }}
        >
          {/* membrane glow */}

          <path
            d="
              M0 455

              C165 390
               320 525
               500 450

              C675 375
               850 440
               1110 330
            "

            fill="none"

            stroke="rgba(53,166,161,.19)"

            strokeWidth="92"

            strokeLinecap="round"
          />


          {/* membrane line */}

          <path
            d="
              M0 455

              C165 390
               320 525
               500 450

              C675 375
               850 440
               1110 330
            "

            fill="none"

            stroke={
              theme.colors.tealDark
            }

            strokeWidth="6"

            strokeLinecap="round"

            opacity=".64"
          />


          {/* receptor / attachment marker */}

          <path
            d="
              M340 410
              L340 362

              M328 362
              L352 362
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


          {/* membrane wrapping around virus */}

          <path
            d={`
              M365 422

              C410
              ${
                412 -
                internalization *
                  36
              }

              470
              ${
                420 -
                internalization *
                  40
              }

              520
              ${
                450 +
                internalization *
                  18
              }

              C555
              ${
                490 +
                internalization *
                  42
              }

              575
              ${
                535 +
                internalization *
                  45
              }

              610
              ${
                560 +
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
        {/* VIRUS                                           */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            left:
              virusX,

            top:
              virusY,

            width: 180,
            height: 180,

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
                0.22,

            filter:
              `
                drop-shadow(
                  0
                  16px
                  24px
                  rgba(
                    83,
                    59,
                    130,
                    .18
                  )
                )
              `,

            zIndex: 30,
          }}
        >
          <Img
            src={staticFile(
              ASSETS
                .virus
                .cepi
                .src
            )}

            style={{
              width: "100%",
              height: "100%",

              objectFit:
                "contain",

              display: "block",
            }}
          />
        </div>


        {/* ================================================= */}
        {/* ATTACHMENT HALO                                  */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            left: 365,
            top: 350,

            width:
              120 +
              Math.sin(
                frame /
                  10
              ) *
                6,

            height:
              120 +
              Math.sin(
                frame /
                  10
              ) *
                6,

            borderRadius:
              "50%",

            border:
              `4px solid rgba(233,111,106,${attachment * 0.52})`,

            boxShadow:
              `0 0 0 12px rgba(233,111,106,${attachment * 0.07})`,

            transform:
              "translate(-50%, -50%)",

            opacity:
              attachment *
              (
                1 -
                internalization *
                  0.8
              ),

            zIndex: 18,
          }}
        />


        {/* ================================================= */}
        {/* ENDOSOME                                         */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            left: 600,
            top: 455,

            width:
              endosomeSize,

            height:
              endosomeSize,

            borderRadius:
              "50%",

            transform:
              "translate(-50%, -50%)",

            background: `
              radial-gradient(
                circle,

                rgba(
                  247,
                  214,
                  204,
                  ${
                    0.15 +
                    acidification *
                      0.45
                  }
                )
                0%,

                rgba(
                  242,
                  178,
                  163,
                  ${
                    0.1 +
                    acidification *
                      0.48
                  }
                )
                66%,

                rgba(
                  156,
                  114,
                  212,
                  .10
                )
                100%
              )
            `,

            border:
              `5px solid rgba(156,114,212,${internalization * 0.72})`,

            boxShadow:
              `
                0
                0
                ${
                  24 +
                  acidification *
                    34
                }px
                rgba(
                  233,
                  111,
                  106,
                  ${
                    acidification *
                    0.20 *
                    acidPulse
                  }
                )
              `,

            opacity:
              internalization,

            zIndex: 20,
          }}
        />


        {/* ================================================= */}
        {/* ACID PARTICLES                                   */}
        {/* ================================================= */}

        {Array.from(
          {
            length: 18,
          },
          (
            _,
            index
          ) => {
            const angle =
              (
                index /
                18
              ) *
                Math.PI *
                2 +
              frame /
                80;


            const radius =
              42 +
              (
                index %
                3
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
                    600 +
                    Math.cos(
                      angle
                    ) *
                      radius,

                  top:
                    455 +
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
                    theme.colors.coral,

                  opacity:
                    acidification *
                    (
                      0.28 +
                      (
                        index %
                        4
                      ) *
                        0.09
                    ),

                  zIndex: 26,
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
            position: "absolute",

            left: 678,
            top: 450,

            width:
              20 +
              fusion *
                105,

            height:
              8 +
              fusion *
                15,

            borderRadius:
              999,

            background:
              theme.colors.amber,

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
              `0 0 24px rgba(235,177,64,${fusion * 0.32})`,

            zIndex: 32,
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
        {/* CALLOUT 1                                       */}
        {/* ================================================= */}

        <Callout
          left={55}
          top={198}

          eyebrow="Gn / Gc"

          text="Surface proteins help the virus attach to the cell."

          color={
            theme.colors.coralDark
          }

          progress={
            attachment
          }
        />


        {/* ================================================= */}
        {/* CALLOUT 2                                       */}
        {/* ================================================= */}

        <Callout
          left={740}
          top={175}

          eyebrow="Internalization"

          text="The cell membrane folds around the attached particle."

          color={
            theme.colors.tealDark
          }

          progress={
            internalization
          }

          width={300}
        />


        {/* ================================================= */}
        {/* CALLOUT 3                                       */}
        {/* ================================================= */}

        <Callout
          left={755}
          top={530}

          eyebrow="Acidic endosome"

          text="Lower pH triggers a structural change in viral proteins."

          color={
            theme.colors.violet
          }

          progress={
            acidification
          }

          width={295}
        />


        {/* ================================================= */}
        {/* CALLOUT 4                                       */}
        {/* ================================================= */}

        <Callout
          left={630}
          top={710}

          eyebrow="Membrane fusion"

          text="Fusion releases the viral genetic material into the cell."

          color={
            theme.colors.amber
          }

          progress={
            fusion
          }

          width={335}
        />


        {/* ================================================= */}
        {/* BOTTOM STAGE LINE                               */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            left: 40,
            bottom: 28,

            display:
              "flex",

            alignItems:
              "center",

            gap: 11,

            fontFamily:
              FONT_STACK,

            fontSize: 16,

            fontWeight: 700,

            color:
              theme.colors.muted,

            zIndex: 60,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,

              borderRadius:
                "50%",

              background:
                theme.colors.coral,
            }}
          />

          Attach

          <span
            style={{
              opacity: 0.4,
            }}
          >
            →
          </span>

          <span
            style={{
              width: 9,
              height: 9,

              borderRadius:
                "50%",

              background:
                theme.colors.teal,
            }}
          />

          Enter

          <span
            style={{
              opacity: 0.4,
            }}
          >
            →
          </span>

          <span
            style={{
              width: 9,
              height: 9,

              borderRadius:
                "50%",

              background:
                theme.colors.violet,
            }}
          />

          Acidify

          <span
            style={{
              opacity: 0.4,
            }}
          >
            →
          </span>

          <span
            style={{
              width: 9,
              height: 9,

              borderRadius:
                "50%",

              background:
                theme.colors.amber,
            }}
          />

          Fuse + release
        </div>
      </div>
    </div>
  );
};