import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
   BASE COLORS
   ========================================================= */

const baseColors: string[] = [
  theme.colors.sky,
  theme.colors.teal,
  theme.colors.violet,
  theme.colors.amber,
];


/* =========================================================
   DIFFERENCE POSITIONS
   ========================================================= */

const NOVEL_DIFFERENCE_POSITIONS: number[] = [
  4,
  7,
  10,
  13,
  17,
  20,
  24,
  28,
];


/* =========================================================
   SEQUENCE ROW
   ========================================================= */

const SequenceRow = ({
  y,
  label,
  variant,
  progress,
}: {
  y: number;

  label: string;

  variant:
    | "known"
    | "outbreak"
    | "novel";

  progress: number;
}) => {
  return (
    <g
      transform={`translate(0 ${y})`}
      opacity={progress}
    >
      {/* ===================================================
          LABEL
          =================================================== */}

      <text
        x="54"
        y="23"

        fontFamily={
          FONT_STACK
        }

        fontSize="21"

        fontWeight="800"

        fill="#263A52"
      >
        {label}
      </text>


      {/* ===================================================
          SEQUENCE BACKGROUND
          =================================================== */}

      <rect
        x="54"
        y="42"

        width="1010"
        height="48"

        rx="15"

        fill="rgba(17,39,68,.035)"
      />


      {/* ===================================================
          BASE BLOCKS
          =================================================== */}

      {Array.from(
        {
          length: 32,
        },

        (
          _,
          i
        ) => {
          /*
           * Explicit string type prevents TypeScript from
           * restricting fill to only the original four
           * literal theme colors.
           */
          let fill: string =
            baseColors[
              i %
                baseColors.length
            ];


          /* =================================================
             OUTBREAK SAMPLE
             Nearly identical with one highlighted difference
             ================================================= */

          if (
            variant ===
              "outbreak" &&
            i ===
              13
          ) {
            fill =
              theme.colors.coral;
          }


          /* =================================================
             HYPOTHETICAL NOVEL FORM

             indexOf is used instead of includes so this works
             with older TypeScript library targets.
             ================================================= */

          if (
            variant ===
              "novel" &&
            NOVEL_DIFFERENCE_POSITIONS.indexOf(
              i
            ) !==
              -1
          ) {
            fill =
              theme.colors.coral;
          }


          const blockProgress =
            interpolate(
              progress,

              [
                i *
                  0.012,

                0.55 +
                  i *
                    0.012,
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
            <rect
              key={
                i
              }

              x={
                72 +
                i *
                  30
              }

              y={
                54
              }

              width={
                21
              }

              height={
                24
              }

              rx={
                5
              }

              fill={
                fill
              }

              opacity={
                0.25 +
                blockProgress *
                  0.70
              }

              transform={`
                translate(
                  0
                  ${(1 - blockProgress) * 6}
                )
              `}
            />
          );
        }
      )}
    </g>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const SequenceSimilarityShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     TITLE
     ======================================================= */

  const titleIn =
    spring({
      frame,

      fps,

      config: {
        damping:
          180,

        stiffness:
          88,
      },
    });


  /* =======================================================
     PANEL REVEALS
     ======================================================= */

  const rtIn =
    interpolate(
      frame,

      [
        8,
        50,
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


  const seqIn =
    interpolate(
      frame,

      [
        38,
        92,
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


  const noteIn =
    interpolate(
      frame,

      [
        92,
        136,
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


  /* =======================================================
     INDIVIDUAL SEQUENCE ROWS
     ======================================================= */

  const knownIn =
    interpolate(
      frame,

      [
        44,
        76,
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


  const outbreakIn =
    interpolate(
      frame,

      [
        62,
        96,
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


  const novelIn =
    interpolate(
      frame,

      [
        82,
        116,
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

        inset:
          0,

        overflow:
          "hidden",

        background: `
          linear-gradient(
            180deg,
            #FAF7F1 0%,
            #FFF9F4 100%
          )
        `,
      }}
    >
      {/* ===================================================
          PAPER TEXTURE
          =================================================== */}

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
              rgba(35,57,72,.14) .7px,
              transparent .8px
            )
          `,

          backgroundSize:
            "8px 8px",

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          BACKGROUND GLOW — LEFT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            -160,

          top:
            300,

          width:
            720,

          height:
            620,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(53,166,161,.06) 0%,
              rgba(53,166,161,.02) 46%,
              rgba(53,166,161,0) 72%
            )
          `,
        }}
      />


      {/* ===================================================
          BACKGROUND GLOW — RIGHT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            -180,

          top:
            290,

          width:
            760,

          height:
            640,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(156,114,212,.055) 0%,
              rgba(156,114,212,.02) 48%,
              rgba(156,114,212,0) 74%
            )
          `,
        }}
      />


      {/* ===================================================
          TITLE
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            86,

          top:
            70,

          width:
            1660,

          opacity:
            titleIn,

          transform: `
            translateY(
              ${(1 - titleIn) * 16}px
            )
          `,

          zIndex:
            20,
        }}
      >
        {/* Eyebrow */}

        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              10,

            padding:
              "10px 16px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.90)",

            border:
              "1px solid rgba(17,39,68,.08)",

            boxShadow:
              "0 8px 24px rgba(37,50,65,.04)",
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

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                15,

              fontWeight:
                800,

              letterSpacing:
                2.3,

              textTransform:
                "uppercase",

              color:
                theme.colors.tealDark,
            }}
          >
            Evidence from the outbreak
          </span>
        </div>


        {/* Main title */}

        <div
          style={{
            marginTop:
              18,

            width:
              1580,

            fontFamily:
              TITLE_STACK,

            fontSize:
              68,

            lineHeight:
              0.97,

            fontWeight:
              840,

            letterSpacing:
              -3.4,

            color:
              "#17243A",
          }}
        >
          Sequence data and outbreak dynamics argue against
          <br />

          a highly transmissible new form.
        </div>
      </div>


      {/* ===================================================
          RT CARD
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            72,

          top:
            284,

          width:
            450,

          height:
            560,

          boxSizing:
            "border-box",

          borderRadius:
            32,

          overflow:
            "hidden",

          background:
            "rgba(255,255,255,.95)",

          border:
            "2px solid rgba(53,166,161,.34)",

          boxShadow:
            "0 20px 48px rgba(52,42,35,.09)",

          opacity:
            rtIn,

          transform: `
            translateY(
              ${(1 - rtIn) * 16}px
            )

            scale(
              ${0.98 + rtIn * 0.02}
            )
          `,

          zIndex:
            10,
        }}
      >
        {/* Soft wash */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background: `
              linear-gradient(
                180deg,
                rgba(53,166,161,.08) 0%,
                rgba(255,255,255,0) 44%
              )
            `,
          }}
        />


        {/* Header */}

        <div
          style={{
            position:
              "absolute",

            left:
              28,

            top:
              25,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              9,
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
                theme.colors.tealDark,
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                15,

              fontWeight:
                850,

              letterSpacing:
                2,

              textTransform:
                "uppercase",

              color:
                theme.colors.tealDark,
            }}
          >
            Outbreak spread
          </span>
        </div>


        {/* Rt */}

        <div
          style={{
            position:
              "absolute",

            left:
              28,

            top:
              72,

            fontFamily:
              TITLE_STACK,

            fontSize:
              74,

            lineHeight:
              0.95,

            fontWeight:
              850,

            letterSpacing:
              -3.4,

            color:
              theme.colors.tealDark,
          }}
        >
          Rt = 0.7
        </div>


        {/* Down arrow */}

        <div
          style={{
            position:
              "absolute",

            right:
              32,

            top:
              84,

            fontFamily:
              FONT_STACK,

            fontSize:
              44,

            lineHeight:
              1,

            fontWeight:
              900,

            color:
              theme.colors.tealDark,
          }}
        >
          ↓
        </div>


        {/* Description */}

        <div
          style={{
            position:
              "absolute",

            left:
              30,

            top:
              166,

            width:
              370,

            fontFamily:
              FONT_STACK,

            fontSize:
              25,

            lineHeight:
              1.36,

            fontWeight:
              600,

            letterSpacing:
              -0.35,

            color:
              "#31465E",
          }}
        >
          A reproduction number below 1 indicates that
          transmission was declining.
        </div>


        {/* =================================================
            DECLINING GRAPH
            ================================================= */}

        <svg
          viewBox="0 0 450 210"

          width="450"
          height="210"

          style={{
            position:
              "absolute",

            left:
              0,

            bottom:
              20,
          }}
        >
          {/* Axes */}

          <path
            d="
              M58 40
              L58 164
              L390 164
            "

            fill="none"

            stroke="rgba(17,39,68,.12)"

            strokeWidth="3"

            strokeLinecap="round"
          />


          {/* Rt = 1 threshold */}

          <line
            x1="58"
            y1="105"

            x2="390"
            y2="105"

            stroke="rgba(53,166,161,.20)"

            strokeWidth="2"

            strokeDasharray="7 7"
          />


          <text
            x="70"
            y="96"

            fontFamily={
              FONT_STACK
            }

            fontSize="13"

            fontWeight="700"

            fill="#7A8795"
          >
            Rt = 1
          </text>


          {/* Declining line */}

          <path
            d="
              M72 62

              C120 68
                150 81
                192 96

              C236 112
                276 129
                328 142

              C350 148
                366 152
                382 154
            "

            fill="none"

            stroke={
              theme.colors.tealDark
            }

            strokeWidth="7"

            strokeLinecap="round"
          />


          {[
            {
              x: 72,
              y: 62,
            },

            {
              x: 158,
              y: 84,
            },

            {
              x: 248,
              y: 117,
            },

            {
              x: 330,
              y: 143,
            },

            {
              x: 382,
              y: 154,
            },
          ].map(
            (
              point,
              index
            ) => (
              <circle
                key={
                  index
                }

                cx={
                  point.x
                }

                cy={
                  point.y
                }

                r={
                  7
                }

                fill={
                  theme.colors.tealDark
                }

                stroke="#FFFFFF"

                strokeWidth="3"
              />
            )
          )}
        </svg>
      </div>


      {/* ===================================================
          SEQUENCE CARD
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            568,

          top:
            284,

          width:
            1280,

          height:
            560,

          boxSizing:
            "border-box",

          borderRadius:
            32,

          overflow:
            "hidden",

          background:
            "rgba(255,255,255,.95)",

          border:
            "1px solid rgba(17,39,68,.09)",

          boxShadow:
            "0 20px 48px rgba(52,42,35,.09)",

          opacity:
            seqIn,

          transform: `
            translateY(
              ${(1 - seqIn) * 16}px
            )

            scale(
              ${0.985 + seqIn * 0.015}
            )
          `,

          zIndex:
            10,
        }}
      >
        {/* Header */}

        <div
          style={{
            position:
              "absolute",

            left:
              30,

            top:
              25,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              9,
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

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                15,

              fontWeight:
                850,

              letterSpacing:
                2,

              textTransform:
                "uppercase",

              color:
                theme.colors.coralDark,
            }}
          >
            Sequence comparison
          </span>
        </div>


        {/* Legend */}

        <div
          style={{
            position:
              "absolute",

            right:
              30,

            top:
              23,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              9,

            padding:
              "8px 12px",

            borderRadius:
              999,

            background:
              "rgba(242,106,96,.08)",

            fontFamily:
              FONT_STACK,

            fontSize:
              14,

            fontWeight:
              700,

            color:
              "#617184",
          }}
        >
          <span
            style={{
              width:
                9,

              height:
                9,

              borderRadius:
                3,

              background:
                theme.colors.coral,
            }}
          />

          highlighted differences
        </div>


        {/* =================================================
            SEQUENCES
            ================================================= */}

        <svg
          viewBox="0 0 1180 365"

          width="1180"
          height="365"

          style={{
            position:
              "absolute",

            left:
              50,

            top:
              82,
          }}
        >
          <SequenceRow
            y={
              4
            }

            label="Known Andes virus"

            variant="known"

            progress={
              knownIn
            }
          />


          <SequenceRow
            y={
              118
            }

            label="Outbreak samples"

            variant="outbreak"

            progress={
              outbreakIn
            }
          />


          <SequenceRow
            y={
              232
            }

            label="Hypothetical highly transmissible form"

            variant="novel"

            progress={
              novelIn
            }
          />
        </svg>


        {/* Explanation */}

        <div
          style={{
            position:
              "absolute",

            left:
              54,

            right:
              54,

            bottom:
              28,

            paddingTop:
              19,

            borderTop:
              "1px solid rgba(17,39,68,.08)",

            fontFamily:
              FONT_STACK,

            fontSize:
              24,

            lineHeight:
              1.34,

            fontWeight:
              600,

            letterSpacing:
              -0.3,

            color:
              "#617184",
          }}
        >
          Outbreak samples were very similar to known Andes
          virus sequences, rather than showing the extensive
          changes illustrated by the hypothetical comparison.
        </div>
      </div>


      {/* ===================================================
          BOTTOM CONCLUSION
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          bottom:
            74,

          width:
            1120,

          boxSizing:
            "border-box",

          padding:
            "18px 28px",

          borderRadius:
            25,

          background:
            "rgba(255,255,255,.95)",

          border:
            `2px solid ${theme.colors.teal}`,

          boxShadow:
            "0 16px 38px rgba(52,42,35,.08)",

          opacity:
            noteIn,

          transform: `
            translateX(-50%)
            translateY(
              ${(1 - noteIn) * 14}px
            )
          `,

          zIndex:
            20,
        }}
      >
        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            gap:
              13,
          }}
        >
          <span
            style={{
              width:
                10,

              height:
                10,

              flex:
                "0 0 auto",

              borderRadius:
                "50%",

              background:
                theme.colors.tealDark,
            }}
          />

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                23,

              lineHeight:
                1.38,

              fontWeight:
                650,

              letterSpacing:
                -0.3,

              color:
                "#31465E",

              textAlign:
                "center",
            }}
          >
            Together with isolation, testing, and contact tracing,
            these findings support a limited public-health threat
            rather than uncontrolled spread.
          </div>
        </div>
      </div>
    </div>
  );
};