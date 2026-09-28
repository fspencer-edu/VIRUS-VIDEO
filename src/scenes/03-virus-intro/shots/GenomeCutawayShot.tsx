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


const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';


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
   RAT ASSET

   Change only this path if your transparent rat file
   has a different filename.
   ========================================================= */

const RAT_SRC =
  "assets/transmission/rat-cutout.webp";


/* =========================================================
   SOUTH AMERICAN LANDSCAPE
   ========================================================= */

const SouthAmericanLandscape = ({
  opacity,
}: {
  opacity: number;
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,

      overflow: "hidden",

      opacity,

      background: `
        linear-gradient(
          180deg,
          #E8F3F5 0%,
          #F7F2E8 58%,
          #E6E1C9 100%
        )
      `,
    }}
  >
    {/* Sun */}

    <div
      style={{
        position: "absolute",

        right: 210,
        top: 150,

        width: 155,
        height: 155,

        borderRadius: "50%",

        background: `
          radial-gradient(
            circle,
            #FFF6BA 0%,
            #F8D580 55%,
            #EDBE62 100%
          )
        `,

        boxShadow:
          "0 0 70px rgba(239,190,98,.20)",

        opacity: 0.84,
      }}
    />


    {/* Far mountains */}

    <svg
      viewBox="0 0 1920 500"
      preserveAspectRatio="none"
      style={{
        position: "absolute",

        left: 0,
        right: 0,

        bottom: 250,

        width: "100%",
        height: 520,
      }}
    >
      <path
        d="
          M0 410
          L130 320
          L240 365
          L380 230
          L500 330
          L650 190
          L820 325
          L980 230
          L1140 340
          L1300 210
          L1470 330
          L1630 245
          L1770 340
          L1920 260
          L1920 500
          L0 500
          Z
        "
        fill="#B7C9C5"
        opacity=".56"
      />

      <path
        d="
          M0 450
          L170 370
          L330 412
          L510 330
          L700 420
          L880 340
          L1080 410
          L1250 320
          L1430 410
          L1610 345
          L1780 420
          L1920 365
          L1920 500
          L0 500
          Z
        "
        fill="#9CB7AE"
        opacity=".66"
      />
    </svg>


    {/* Ground */}

    <div
      style={{
        position: "absolute",

        left: 0,
        right: 0,
        bottom: 0,

        height: 350,

        background: `
          linear-gradient(
            180deg,
            #D8D5B8 0%,
            #C7C49E 100%
          )
        `,
      }}
    />


    {/* Ground texture */}

    <div
      style={{
        position: "absolute",

        left: 0,
        right: 0,
        bottom: 0,

        height: 340,

        opacity: 0.22,

        backgroundImage: `
          radial-gradient(
            ellipse,
            rgba(77,103,78,.35) 0 2px,
            transparent 3px
          )
        `,

        backgroundSize:
          "34px 21px",
      }}
    />


    {/* Landscape label */}

    <div
      style={{
        position: "absolute",

        right: 120,
        top: 96,

        padding:
          "11px 18px",

        borderRadius:
          999,

        background:
          "rgba(255,255,255,.88)",

        border:
          `1px solid ${theme.colors.line}`,

        fontFamily:
          theme.fonts.body,

        fontSize: 18,

        fontWeight: 900,

        letterSpacing: 2.2,

        textTransform:
          "uppercase",

        color:
          theme.colors.teal,
      }}
    >
      South America
    </div>
  </div>
);


/* =========================================================
   VIRUS
   ========================================================= */

const AndesVirus = ({
  size,
  frame,
  envelopeProgress,
  proteinProgress,
  genomeProgress,
  labelProgress,
}: {
  size: number;
  frame: number;
  envelopeProgress: number;
  proteinProgress: number;
  genomeProgress: number;
  labelProgress: number;
}) => {
  const breathe =
    1 +
    Math.sin(
      frame / 9
    ) *
      0.018;


  const sProgress =
    interpolate(
      genomeProgress,
      [
        0,
        0.34,
      ],
      [
        0,
        1,
      ],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );


  const mProgress =
    interpolate(
      genomeProgress,
      [
        0.26,
        0.66,
      ],
      [
        0,
        1,
      ],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );


  const lProgress =
    interpolate(
      genomeProgress,
      [
        0.58,
        1,
      ],
      [
        0,
        1,
      ],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );


  return (
    <svg
      viewBox="0 0 600 600"
      width={size}
      height={size}
      style={{
        display: "block",

        overflow: "visible",

        transform:
          `scale(${breathe})`,
      }}
    >
      {/* ===============================================
          OUTER PROTEINS - Gn / Gc
          =============================================== */}

      {Array.from(
        {
          length: 20,
        },
        (
          _,
          i
        ) => {
          const angle =
            (
              360 /
              20
            ) *
            i;


          const alternating =
            i %
              2 ===
            0;


          const proteinPulse =
            1 +
            Math.sin(
              (
                frame +
                i *
                  4
              ) /
                7
            ) *
              0.08;


          return (
            <g
              key={i}
              transform={`
                rotate(
                  ${angle}
                  300
                  300
                )
              `}
              opacity={
                proteinProgress
              }
            >
              <line
                x1="300"
                y1="112"
                x2="300"
                y2="72"
                stroke={
                  alternating
                    ? theme.colors.violet
                    : theme.colors.coral
                }
                strokeWidth="10"
                strokeLinecap="round"
              />

              <circle
                cx="300"
                cy="59"
                r={
                  12 *
                  proteinPulse
                }
                fill={
                  alternating
                    ? theme.colors.violet
                    : theme.colors.coral
                }
              />
            </g>
          );
        }
      )}


      {/* ===============================================
          ENVELOPE
          =============================================== */}

      <circle
        cx="300"
        cy="300"
        r="188"

        fill={
          theme.colors.lavender
        }

        stroke={
          theme.colors.violet
        }

        strokeWidth="8"

        opacity={
          envelopeProgress
        }
      />


      <circle
        cx="300"
        cy="300"
        r="158"

        fill="#FFF9F3"

        stroke={
          theme.colors.violet
        }

        strokeWidth="3"

        opacity={
          envelopeProgress *
          0.98
        }
      />


      {/* subtle interior */}

      <circle
        cx="300"
        cy="300"
        r="142"

        fill="rgba(156,114,212,.05)"

        opacity={
          envelopeProgress
        }
      />


      {/* ===============================================
          S RNA
          =============================================== */}

      <path
        d="
          M218 238
          C250 192
          282 286
          340 220
        "
        fill="none"

        stroke={
          theme.colors.amber
        }

        strokeWidth="13"

        strokeLinecap="round"

        opacity={
          sProgress
        }
      />


      {/* ===============================================
          M RNA
          =============================================== */}

      <path
        d="
          M204 315
          C250 256
          286 362
          365 294
        "
        fill="none"

        stroke={
          theme.colors.coral
        }

        strokeWidth="13"

        strokeLinecap="round"

        opacity={
          mProgress
        }
      />


      {/* ===============================================
          L RNA
          =============================================== */}

      <path
        d="
          M234 380
          C274 338
          314 416
          358 366
        "
        fill="none"

        stroke={
          theme.colors.sky
        }

        strokeWidth="13"

        strokeLinecap="round"

        opacity={
          lProgress
        }
      />


      {/* ===============================================
          GENOME LABELS
          =============================================== */}

      <g
        opacity={
          labelProgress *
          sProgress
        }
      >
        <circle
          cx="380"
          cy="209"
          r="24"
          fill={
            theme.colors.amber
          }
        />

        <text
          x="380"
          y="217"

          textAnchor="middle"

          fontFamily={
            FONT_STACK
          }

          fontSize="24"

          fontWeight="800"

          fill="#FFFFFF"
        >
          S
        </text>
      </g>


      <g
        opacity={
          labelProgress *
          mProgress
        }
      >
        <circle
          cx="402"
          cy="304"
          r="24"
          fill={
            theme.colors.coral
          }
        />

        <text
          x="402"
          y="312"

          textAnchor="middle"

          fontFamily={
            FONT_STACK
          }

          fontSize="24"

          fontWeight="800"

          fill="#FFFFFF"
        >
          M
        </text>
      </g>


      <g
        opacity={
          labelProgress *
          lProgress
        }
      >
        <circle
          cx="384"
          cy="392"
          r="24"
          fill={
            theme.colors.sky
          }
        />

        <text
          x="384"
          y="400"

          textAnchor="middle"

          fontFamily={
            FONT_STACK
          }

          fontSize="24"

          fontWeight="800"

          fill="#FFFFFF"
        >
          L
        </text>
      </g>


      {/* ===============================================
          GN / GC LABELS
          =============================================== */}

      <g
        opacity={
          labelProgress *
          proteinProgress
        }
      >
        <line
          x1="435"
          y1="135"
          x2="490"
          y2="90"

          stroke={
            theme.colors.violet
          }

          strokeWidth="3"
        />

        <rect
          x="478"
          y="54"
          width="75"
          height="45"

          rx="20"

          fill="#FFFFFF"

          stroke={
            theme.colors.line
          }
        />

        <text
          x="516"
          y="84"

          textAnchor="middle"

          fontFamily={
            FONT_STACK
          }

          fontSize="20"

          fontWeight="800"

          fill={
            theme.colors.violet
          }
        >
          Gn
        </text>
      </g>


      <g
        opacity={
          labelProgress *
          proteinProgress
        }
      >
        <line
          x1="475"
          y1="184"
          x2="540"
          y2="160"

          stroke={
            theme.colors.coral
          }

          strokeWidth="3"
        />

        <rect
          x="526"
          y="129"
          width="68"
          height="45"

          rx="20"

          fill="#FFFFFF"

          stroke={
            theme.colors.line
          }
        />

        <text
          x="560"
          y="159"

          textAnchor="middle"

          fontFamily={
            FONT_STACK
          }

          fontSize="20"

          fontWeight="800"

          fill={
            theme.colors.coral
          }
        >
          Gc
        </text>
      </g>
    </svg>
  );
};


/* =========================================================
   SIZE REFERENCE
   ========================================================= */

const SizeReference = ({
  opacity,
}: {
  opacity: number;
}) => (
  <div
    style={{
      display: "flex",

      alignItems: "center",

      gap: 14,

      opacity,

      fontFamily:
        theme.fonts.body,

      color:
        theme.colors.muted,
    }}
  >
    <div
      style={{
        position: "relative",

        width: 130,
        height: 18,
      }}
    >
      <div
        style={{
          position: "absolute",

          left: 0,
          right: 0,
          top: 8,

          height: 3,

          background:
            theme.colors.navy,

          borderRadius: 999,
        }}
      />

      <div
        style={{
          position: "absolute",

          left: 0,
          top: 2,

          width: 3,
          height: 15,

          background:
            theme.colors.navy,
        }}
      />

      <div
        style={{
          position: "absolute",

          right: 0,
          top: 2,

          width: 3,
          height: 15,

          background:
            theme.colors.navy,
        }}
      />
    </div>

    <div
      style={{
        fontSize: 22,

        fontWeight: 800,

        color:
          theme.colors.ink,
      }}
    >
      ≈ 100 nm
    </div>
  </div>
);


/* =========================================================
   VIRUS MOVEMENT PARTICLES
   ========================================================= */

const EntryParticles = ({
  progress,
}: {
  progress: number;
}) => (
  <>
    {Array.from(
      {
        length: 8,
      },
      (
        _,
        i
      ) => {
        const t =
          i /
          7;


        return (
          <div
            key={i}
            style={{
              position: "absolute",

              left:
                120 +
                t *
                  260,

              top:
                90 +
                Math.sin(
                  i *
                    1.35
                ) *
                  24,

              width:
                9 +
                t *
                  7,

              height:
                9 +
                t *
                  7,

              borderRadius:
                "50%",

              background:
                theme.colors.coral,

              opacity:
                progress *
                (
                  0.15 +
                  t *
                    0.42
                ),

              transform:
                `scale(${0.7 + progress * 0.3})`,

              boxShadow:
                "0 0 12px rgba(242,106,96,.20)",
            }}
          />
        );
      }
    )}
  </>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const GenomeCutawayShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     LANDSCAPE / RAT
     ======================================================= */

  const landscapeIn =
    interpolate(
      frame,
      [
        0,
        20,
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


  const landscapeOut =
    interpolate(
      frame,
      [
        72,
        118,
      ],
      [
        1,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const landscapeOpacity =
    landscapeIn *
    landscapeOut;


  const ratIn =
    spring({
      frame:
        frame -
        4,

      fps,

      config: {
        damping: 170,
        stiffness: 82,
      },
    });


  const ratProgress =
    clamp01(
      ratIn
    );


  const ratZoom =
    interpolate(
      frame,
      [
        30,
        105,
      ],
      [
        1,
        1.18,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     VIRUS BUILD
     ======================================================= */

  const virusReveal =
    interpolate(
      frame,
      [
        62,
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


  const envelopeProgress =
    interpolate(
      frame,
      [
        78,
        118,
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


  const proteinProgress =
    interpolate(
      frame,
      [
        110,
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


  const genomeProgress =
    interpolate(
      frame,
      [
        145,
        220,
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


  const virusLabels =
    interpolate(
      frame,
      [
        152,
        194,
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


  const sizeOpacity =
    interpolate(
      frame,
      [
        188,
        220,
        260,
        292,
      ],
      [
        0,
        1,
        1,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     FINAL LUNG ENTRY
     ======================================================= */

  const lungOpacity =
    interpolate(
      frame,
      [
        242,
        292,
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


  const moveToLung =
    interpolate(
      frame,
      [
        252,
        350,
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


  /*
   * Virus begins as the dominant object and then
   * travels toward the lung.
   */

  const virusLeft =
    interpolate(
      moveToLung,
      [
        0,
        1,
      ],
      [
        1050,
        1275,
      ]
    );


  const virusTop =
    interpolate(
      moveToLung,
      [
        0,
        1,
      ],
      [
        265,
        420,
      ]
    );


  const virusScale =
    interpolate(
      moveToLung,
      [
        0,
        1,
      ],
      [
        1,
        0.42,
      ]
    );


  /* =======================================================
     TEXT STAGES
     ======================================================= */

  const reservoirText =
    interpolate(
      frame,
      [
        0,
        20,
        66,
        100,
      ],
      [
        0,
        1,
        1,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const structureText =
    interpolate(
      frame,
      [
        90,
        126,
        232,
        265,
      ],
      [
        0,
        1,
        1,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const entryText =
    interpolate(
      frame,
      [
        248,
        285,
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
        position: "absolute",

        inset: 0,

        overflow: "hidden",

        background:
          "#FAF7F1",
      }}
    >
      {/* ===================================================
          LANDSCAPE
          =================================================== */}

      <SouthAmericanLandscape
        opacity={
          landscapeOpacity
        }
      />


      {/* ===================================================
          PAPER BACKGROUND AFTER LANDSCAPE
          =================================================== */}

      <div
        style={{
          position: "absolute",

          inset: 0,

          background: `
            radial-gradient(
              circle at 67% 46%,
              rgba(156,114,212,.09) 0%,
              rgba(156,114,212,.03) 32%,
              rgba(156,114,212,0) 59%
            ),

            linear-gradient(
              180deg,
              #FAF7F1 0%,
              #FFF9F4 100%
            )
          `,

          opacity:
            1 -
            landscapeOpacity,

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          TEXT - RESERVOIR
          =================================================== */}

      <div
        style={{
          position: "absolute",

          left: 92,
          top: 104,

          width: 670,

          opacity:
            reservoirText,

          transform:
            `translateY(${(1 - reservoirText) * 14}px)`,

          zIndex: 20,
        }}
      >
        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap: 10,

            padding:
              "11px 17px",

            borderRadius: 999,

            background:
              "rgba(255,255,255,.88)",

            border:
              `1px solid ${theme.colors.line}`,

            fontFamily:
              theme.fonts.body,

            fontSize: 18,

            fontWeight: 900,

            letterSpacing: 2.2,

            textTransform:
              "uppercase",

            color:
              theme.colors.teal,
          }}
        >
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

          Natural reservoir
        </div>


        <div
          style={{
            marginTop: 22,

            fontFamily:
              theme.fonts.display,

            fontSize: 78,

            lineHeight: 0.92,

            fontWeight: 900,

            letterSpacing: -4.5,

            color:
              theme.colors.ink,
          }}
        >
          Andes virus begins
          <br />
          with rodents.
        </div>


        <div
          style={{
            marginTop: 24,

            width: 630,

            fontFamily:
              theme.fonts.body,

            fontSize: 30,

            lineHeight: 1.34,

            fontWeight: 650,

            letterSpacing: -0.55,

            color:
              theme.colors.muted,
          }}
        >
          Its main reservoir is the
          long-tailed pygmy rice rat
          found in South America.
        </div>
      </div>


      {/* ===================================================
          RAT
          =================================================== */}

      <div
        style={{
          position: "absolute",

          right: 165,
          bottom: 95,

          width: 660,

          opacity:
            landscapeOpacity *
            ratProgress,

          transform: `
            translateY(
              ${(1 - ratProgress) * 30}px
            )
            scale(
              ${ratZoom}
            )
          `,

          transformOrigin:
            "50% 80%",

          filter:
            "drop-shadow(0 24px 24px rgba(50,56,48,.17))",

          zIndex: 10,
        }}
      >
        <Img
          src={
            staticFile(
              RAT_SRC
            )
          }

          style={{
            display: "block",

            width: "100%",
            height: "auto",

            objectFit:
              "contain",
          }}
        />
      </div>


      {/* ===================================================
          STRUCTURE TEXT
          =================================================== */}

      <div
        style={{
          position: "absolute",

          left: 92,
          top: 104,

          width: 690,

          opacity:
            structureText,

          transform:
            `translateY(${(1 - structureText) * 14}px)`,

          zIndex: 24,
        }}
      >
        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap: 10,

            padding:
              "11px 17px",

            borderRadius: 999,

            background:
              "rgba(156,114,212,.11)",

            fontFamily:
              theme.fonts.body,

            fontSize: 18,

            fontWeight: 900,

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

          Andes virus
        </div>


        <div
          style={{
            marginTop: 22,

            fontFamily:
              theme.fonts.display,

            fontSize: 78,

            lineHeight: 0.92,

            fontWeight: 900,

            letterSpacing: -4.5,

            color:
              theme.colors.ink,
          }}
        >
          A tiny,
          <br />
          enveloped RNA virus.
        </div>


        <div
          style={{
            marginTop: 25,

            width: 630,

            fontFamily:
              theme.fonts.body,

            fontSize: 30,

            lineHeight: 1.34,

            color:
              theme.colors.muted,

            fontWeight: 650,

            letterSpacing: -0.55,
          }}
        >
          Gn and Gc proteins sit on the viral surface,
          while three RNA segments carry its genome.
        </div>


        {/* Genome key */}

        <div
          style={{
            marginTop: 30,

            display: "flex",

            gap: 14,

            opacity:
              genomeProgress,
          }}
        >
          {[
            {
              label: "S",
              color:
                theme.colors.amber,
            },

            {
              label: "M",
              color:
                theme.colors.coral,
            },

            {
              label: "L",
              color:
                theme.colors.sky,
            },
          ].map(
            part => (
              <div
                key={
                  part.label
                }
                style={{
                  width: 68,
                  height: 68,

                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  borderRadius:
                    "50%",

                  background:
                    part.color,

                  color: "#FFFFFF",

                  fontFamily:
                    theme.fonts.body,

                  fontSize: 28,

                  fontWeight: 850,

                  boxShadow:
                    "0 12px 28px rgba(52,42,35,.11)",
                }}
              >
                {part.label}
              </div>
            )
          )}
        </div>


        <div
          style={{
            marginTop: 28,
          }}
        >
          <SizeReference
            opacity={
              sizeOpacity
            }
          />
        </div>
      </div>


      {/* ===================================================
          ENTRY TEXT
          =================================================== */}

      <div
        style={{
          position: "absolute",

          left: 92,
          top: 115,

          width: 700,

          opacity:
            entryText,

          transform:
            `translateY(${(1 - entryText) * 14}px)`,

          zIndex: 30,
        }}
      >
        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap: 10,

            padding:
              "11px 17px",

            borderRadius: 999,

            background:
              "rgba(242,106,96,.10)",

            fontFamily:
              theme.fonts.body,

            fontSize: 18,

            fontWeight: 900,

            letterSpacing: 2.2,

            textTransform:
              "uppercase",

            color:
              theme.colors.coralDark,
          }}
        >
          Cell entry
        </div>


        <div
          style={{
            marginTop: 22,

            fontFamily:
              theme.fonts.display,

            fontSize: 78,

            lineHeight: 0.92,

            fontWeight: 900,

            letterSpacing: -4.5,

            color:
              theme.colors.ink,
          }}
        >
          Surface proteins
          <br />
          help the virus enter.
        </div>


        <div
          style={{
            marginTop: 24,

            width: 630,

            fontFamily:
              theme.fonts.body,

            fontSize: 30,

            lineHeight: 1.34,

            color:
              theme.colors.muted,

            fontWeight: 650,

            letterSpacing: -0.55,
          }}
        >
          Gn and Gc help the virus attach to human cells
          before infection progresses into the lungs.
        </div>
      </div>


      {/* ===================================================
          VIRUS
          =================================================== */}

      <div
        style={{
          position: "absolute",

          left:
            virusLeft,

          top:
            virusTop,

          width: 590,
          height: 590,

          opacity:
            virusReveal,

          transform: `
            translate(-50%, -50%)
            scale(
              ${
                (
                  0.50 +
                  virusReveal *
                    0.50
                ) *
                virusScale
              }
            )
          `,

          transformOrigin:
            "50% 50%",

          filter:
            "drop-shadow(0 28px 40px rgba(83,63,117,.13))",

          zIndex: 18,
        }}
      >
        <AndesVirus
          size={590}

          frame={
            frame
          }

          envelopeProgress={
            envelopeProgress
          }

          proteinProgress={
            proteinProgress
          }

          genomeProgress={
            genomeProgress
          }

          labelProgress={
            virusLabels
          }
        />
      </div>


      {/* ===================================================
          LUNGS — REAL LUNGS-ORGAN IMAGE
          =================================================== */}

      <div
        style={{
          position: "absolute",

          right: 105,
          top: 230,

          width: 540,
          height: 570,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          opacity:
            lungOpacity,

          transform: `
            translateX(
              ${(1 - lungOpacity) * 36}px
            )
            scale(
              ${
                (
                  0.94 +
                  lungOpacity *
                    0.06
                ) *
                (
                  1 +
                  Math.sin(
                    frame /
                      18
                  ) *
                    0.012
                )
              }
            )
          `,

          transformOrigin:
            "50% 52%",

          zIndex: 12,
        }}
      >
        {/* Soft lung halo */}

        <div
          style={{
            position: "absolute",

            left: "50%",
            top: "46%",

            width: 520,
            height: 520,

            transform:
              "translate(-50%, -50%)",

            borderRadius:
              "50%",

            background: `
              radial-gradient(
                circle,
                rgba(245,181,192,.16) 0%,
                rgba(245,181,192,.055) 50%,
                rgba(245,181,192,0) 74%
              )
            `,

            pointerEvents:
              "none",
          }}
        />


        {/* Actual lungs-organ.webp asset */}

        <Img
          src={staticFile(
            ASSETS
              .pathogenesis
              .lungsOrgan
              .src
          )}

          style={{
            position: "relative",

            width: 520,
            height: 520,

            objectFit:
              "contain",

            display:
              "block",

            /*
             * The source image has a white background.
             * Multiply blends that white into the cream slide.
             */
            mixBlendMode:
              "multiply",

            filter:
              "drop-shadow(0 22px 34px rgba(87,57,65,.09))",

            zIndex: 2,
          }}
        />


        <div
          style={{
            marginTop: -34,

            position: "relative",

            zIndex: 4,

            textAlign:
              "center",

            fontFamily:
              theme.fonts.body,

            fontSize: 18,

            fontWeight: 900,

            letterSpacing: 1.8,

            textTransform:
              "uppercase",

            color:
              theme.colors.coralDark,
          }}
        >
          Human lungs
        </div>
      </div>


      {/* ===================================================
          MOVEMENT PARTICLES
          =================================================== */}

      <div
        style={{
          position: "absolute",

          left: 1190,
          top: 442,

          width: 420,
          height: 180,

          opacity:
            lungOpacity *
            moveToLung,

          zIndex: 16,
        }}
      >
        <EntryParticles
          progress={
            moveToLung
          }
        />
      </div>
    </div>
  );
};