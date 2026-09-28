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
   RNA NUCLEOTIDES
   Andes virus has an RNA genome, so the sequence visual uses
   A / U / C / G rather than DNA's A / T / C / G.
   ========================================================= */

type RnaBase =
  | "A"
  | "U"
  | "C"
  | "G";


const RNA_BASES: RnaBase[] = [
  "A",
  "U",
  "C",
  "G",
];


const RNA_BASE_COLORS: Record<
  RnaBase,
  string
> = {
  A:
    theme.colors.sky,

  U:
    theme.colors.teal,

  C:
    theme.colors.violet,

  G:
    theme.colors.amber,
};


/* =========================================================
   REFERENCE RNA SEQUENCE

   This is a simplified illustrative sequence graphic.
   It is not intended to reproduce a full viral genome.
   ========================================================= */

const REFERENCE_SEQUENCE: RnaBase[] = [
  "A",
  "U",
  "C",
  "G",
  "A",
  "U",
  "C",
  "G",
  "A",
  "U",
  "C",
  "G",
  "A",
  "U",
  "C",
  "G",
  "A",
  "U",
  "C",
  "G",
  "A",
  "U",
  "C",
  "G",
  "A",
  "U",
  "C",
  "G",
  "A",
  "U",
  "C",
  "G",
];


/* =========================================================
   DIFFERENCE POSITIONS
   ========================================================= */

const OUTBREAK_DIFFERENCE_POSITION =
  13;


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
   HELPERS
   ========================================================= */

const getAlternativeBase = (
  base: RnaBase
): RnaBase => {
  switch (
    base
  ) {
    case "A":
      return "G";

    case "U":
      return "C";

    case "C":
      return "A";

    case "G":
      return "U";

    default:
      return "A";
  }
};


/* =========================================================
   SMALL RNA BADGE
   ========================================================= */

const RnaBadge = () => (
  <div
    style={{
      display:
        "inline-flex",

      alignItems:
        "center",

      gap:
        9,

      padding:
        "9px 13px",

      borderRadius:
        999,

      background:
        "rgba(53,166,161,.08)",

      border:
        "1px solid rgba(53,166,161,.16)",
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
          theme.colors.tealDark,
      }}
    />

    <span
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
      RNA genome
    </span>
  </div>
);


/* =========================================================
   RNA LEGEND
   ========================================================= */

const RnaLegend = () => (
  <div
    style={{
      display:
        "flex",

      alignItems:
        "center",

      gap:
        8,
    }}
  >
    {RNA_BASES.map(
      base => (
        <div
          key={
            base
          }

          style={{
            width:
              28,

            height:
              28,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            borderRadius:
              7,

            background:
              RNA_BASE_COLORS[
                base
              ],

            fontFamily:
              FONT_STACK,

            fontSize:
              14,

            fontWeight:
              900,

            color:
              "#FFFFFF",

            boxShadow:
              "0 4px 10px rgba(17,39,68,.08)",
          }}
        >
          {base}
        </div>
      )
    )}

    <span
      style={{
        marginLeft:
          5,

        fontFamily:
          FONT_STACK,

        fontSize:
          14,

        fontWeight:
          650,

        color:
          "#617184",
      }}
    >
      RNA nucleotides
    </span>
  </div>
);


/* =========================================================
   SEQUENCE ROW
   ========================================================= */

const SequenceRow = ({
  y,
  label,
  sublabel,
  variant,
  progress,
}: {
  y: number;

  label: string;

  sublabel: string;

  variant:
    | "known"
    | "outbreak"
    | "novel";

  progress: number;
}) => {
  return (
    <g
      transform={`translate(0 ${y})`}
      opacity={
        progress
      }
    >

      {/* ===================================================
          ROW LABEL
          =================================================== */}

      <text
        x="54"
        y="20"

        fontFamily={
          FONT_STACK
        }

        fontSize="21"

        fontWeight="850"

        fill="#263A52"
      >
        {label}
      </text>


      <text
        x="54"
        y="42"

        fontFamily={
          FONT_STACK
        }

        fontSize="13"

        fontWeight="650"

        fill="#7B8997"
      >
        {sublabel}
      </text>


      {/* ===================================================
          SEQUENCE BACKGROUND
          =================================================== */}

      <rect
        x="54"
        y="54"

        width="1010"
        height="54"

        rx="16"

        fill="rgba(17,39,68,.035)"
      />


      {/* ===================================================
          RNA BASES
          =================================================== */}

      {REFERENCE_SEQUENCE.map(
        (
          referenceBase,
          i
        ) => {
          let base: RnaBase =
            referenceBase;

          let isDifference =
            false;


          /* =================================================
             OUTBREAK SAMPLE

             Nearly identical to the reference sequence.
             ================================================= */

          if (
            variant ===
              "outbreak" &&
            i ===
              OUTBREAK_DIFFERENCE_POSITION
          ) {
            base =
              getAlternativeBase(
                referenceBase
              );

            isDifference =
              true;
          }


          /* =================================================
             HYPOTHETICAL HIGHLY CHANGED FORM
             ================================================= */

          if (
            variant ===
              "novel" &&
            NOVEL_DIFFERENCE_POSITIONS.indexOf(
              i
            ) !==
              -1
          ) {
            base =
              getAlternativeBase(
                referenceBase
              );

            isDifference =
              true;
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


          const x =
            72 +
            i *
              30;


          const fill =
            isDifference
              ? theme.colors.coral
              : RNA_BASE_COLORS[
                  base
                ];


          return (
            <g
              key={
                i
              }

              opacity={
                0.28 +
                blockProgress *
                  0.72
              }

              transform={`
                translate(
                  0
                  ${(1 - blockProgress) * 7}
                )
              `}
            >
              <rect
                x={
                  x
                }

                y="67"

                width="22"
                height="28"

                rx="6"

                fill={
                  fill
                }

                stroke={
                  isDifference
                    ? "rgba(171,66,64,.28)"
                    : "rgba(255,255,255,.25)"
                }

                strokeWidth={
                  isDifference
                    ? 2
                    : 1
                }
              />


              <text
                x={
                  x +
                  11
                }

                y="86"

                textAnchor="middle"

                fontFamily={
                  FONT_STACK
                }

                fontSize="12"

                fontWeight="900"

                fill="#FFFFFF"
              >
                {base}
              </text>
            </g>
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
            54,

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


        {/* =================================================
            MAIN TITLE
            ================================================= */}

        <div
          style={{
            marginTop:
              16,

            width:
              1600,

            fontFamily:
              TITLE_STACK,

            fontSize:
              61,

            lineHeight:
              0.98,

            fontWeight:
              840,

            letterSpacing:
              -3,

            color:
              "#17243A",
          }}
        >
          RNA sequence data and outbreak dynamics argue against
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
            300,

          width:
            450,

          height:
            540,

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

        {/* =================================================
            SOFT WASH
            ================================================= */}

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


        {/* =================================================
            HEADER
            ================================================= */}

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


        {/* =================================================
            RT
            ================================================= */}

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


        {/* =================================================
            DOWN ARROW
            ================================================= */}

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


        {/* =================================================
            DESCRIPTION
            ================================================= */}

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
              10,
          }}
        >

          {/* AXES */}

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


          {/* RT = 1 THRESHOLD */}

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


          {/* DECLINING LINE */}

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
              x:
                72,

              y:
                62,
            },

            {
              x:
                158,

              y:
                84,
            },

            {
              x:
                248,

              y:
                117,
            },

            {
              x:
                330,

              y:
                143,
            },

            {
              x:
                382,

              y:
                154,
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
          RNA SEQUENCE CARD
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            568,

          top:
            300,

          width:
            1280,

          height:
            540,

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

        {/* =================================================
            HEADER
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              30,

            top:
              22,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              14,
          }}
        >
          <div
            style={{
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
              Viral RNA sequence comparison
            </span>
          </div>


          <RnaBadge />
        </div>


        {/* =================================================
            RNA BASE LEGEND
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              31,

            top:
              19,
          }}
        >
          <RnaLegend />
        </div>


        {/* =================================================
            EXPLANATORY STRIP
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              30,

            right:
              30,

            top:
              66,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap:
              20,

            padding:
              "11px 15px",

            borderRadius:
              15,

            background:
              "rgba(53,166,161,.055)",

            border:
              "1px solid rgba(53,166,161,.11)",
          }}
        >
          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                16,

              lineHeight:
                1.3,

              fontWeight:
                650,

              color:
                "#53677D",
            }}
          >
            Andes virus carries its genetic information as
            <strong
              style={{
                marginLeft:
                  5,

                color:
                  "#263A52",
              }}
            >
              RNA
            </strong>
            . Each tile below represents an RNA nucleotide.
          </div>


          <div
            style={{
              display:
                "inline-flex",

              alignItems:
                "center",

              gap:
                8,

              flex:
                "0 0 auto",

              padding:
                "7px 11px",

              borderRadius:
                999,

              background:
                "rgba(242,106,96,.08)",

              fontFamily:
                FONT_STACK,

              fontSize:
                13,

              fontWeight:
                750,

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

            changed RNA base
          </div>
        </div>


        {/* =================================================
            RNA SEQUENCES
            ================================================= */}

        <svg
          viewBox="0 0 1180 390"

          width="1180"
          height="390"

          style={{
            position:
              "absolute",

            left:
              50,

            top:
              118,
          }}
        >
          <SequenceRow
            y={
              0
            }

            label="Known Andes virus RNA"

            sublabel="Reference RNA sequence"

            variant="known"

            progress={
              knownIn
            }
          />


          <SequenceRow
            y={
              116
            }

            label="Outbreak virus RNA"

            sublabel="Sequence recovered from outbreak samples"

            variant="outbreak"

            progress={
              outbreakIn
            }
          />


          <SequenceRow
            y={
              232
            }

            label="Hypothetical highly changed RNA"

            sublabel="Illustrative comparison with many nucleotide changes"

            variant="novel"

            progress={
              novelIn
            }
          />
        </svg>


        {/* =================================================
            EXPLANATION
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              54,

            right:
              54,

            bottom:
              22,

            paddingTop:
              15,

            borderTop:
              "1px solid rgba(17,39,68,.08)",

            fontFamily:
              FONT_STACK,

            fontSize:
              21,

            lineHeight:
              1.3,

            fontWeight:
              600,

            letterSpacing:
              -0.25,

            color:
              "#617184",
          }}
        >
          The outbreak viral RNA was very similar to known
          Andes virus RNA. Only limited sequence differences
          were observed, unlike the many changes illustrated
          in the hypothetical comparison.
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
            66,

          width:
            1120,

          boxSizing:
            "border-box",

          padding:
            "17px 28px",

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
                22,

              lineHeight:
                1.34,

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
            Together, the similar viral RNA sequences and
            declining transmission support limited spread
            rather than emergence of a highly transmissible
            new form.
          </div>
        </div>
      </div>
    </div>
  );
};