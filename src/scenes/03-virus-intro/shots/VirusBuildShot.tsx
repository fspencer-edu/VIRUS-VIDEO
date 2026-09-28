import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

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
   LAYER LABEL
   ========================================================= */

type LayerLabelProps = {
  text: string;

  x1: number;
  y1: number;

  x2: number;
  y2: number;

  progress: number;

  color: string;

  width?: number;
};


const LayerLabel = ({
  text,

  x1,
  y1,

  x2,
  y2,

  progress,

  color,

  width = 190,
}: LayerLabelProps) => {
  return (
    <g
      opacity={
        progress
      }
    >
      {/* connector */}

      <line
        x1={x1}
        y1={y1}

        x2={
          x1 +
          (
            x2 -
            x1
          ) *
            progress
        }

        y2={
          y1 +
          (
            y2 -
            y1
          ) *
            progress
        }

        stroke={
          color
        }

        strokeWidth="4"

        strokeLinecap="round"
      />


      {/* endpoint */}

      <circle
        cx={x1}
        cy={y1}

        r={
          6
        }

        fill={
          color
        }
      />


      {/* label card */}

      <rect
        x={
          x2 -
          12
        }

        y={
          y2 -
          27
        }

        rx="18"
        ry="18"

        width={
          width
        }

        height="54"

        fill="rgba(255,255,255,.96)"

        stroke={
          color
        }

        strokeWidth="2"
      />


      <text
        x={
          x2 +
          12
        }

        y={
          y2 +
          1
        }

        fontFamily={
          FONT_STACK
        }

        fontSize="22"

        fontWeight="850"

        fill={
          theme.colors.ink
        }

        dominantBaseline="middle"
      >
        {text}
      </text>
    </g>
  );
};


/* =========================================================
   GENOME LABEL
   ========================================================= */

const GenomeLabel = ({
  x,
  y,
  text,
  color,
  progress,
}: {
  x: number;
  y: number;
  text: string;
  color: string;
  progress: number;
}) => {
  return (
    <g
      opacity={
        progress
      }
    >
      <circle
        cx={x}
        cy={y}

        r={
          27
        }

        fill={
          color
        }

        stroke="#FFFFFF"

        strokeWidth="4"
      />

      <text
        x={x}
        y={
          y +
          1
        }

        textAnchor="middle"

        dominantBaseline="middle"

        fontFamily={
          FONT_STACK
        }

        fontSize="25"

        fontWeight="900"

        fill="#FFFFFF"
      >
        {text}
      </text>
    </g>
  );
};


/* =========================================================
   VIRUS ASSEMBLY
   ========================================================= */

const VirusAssemblyGraphic = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* -------------------------------------------------------
     BUILD SEQUENCE
     ------------------------------------------------------- */

  const envelope =
    clamp01(
      spring({
        frame:
          frame -
          8,

        fps,

        config: {
          damping:
            165,

          stiffness:
            105,
        },
      })
    );


  const proteins =
    clamp01(
      spring({
        frame:
          frame -
          40,

        fps,

        config: {
          damping:
            165,

          stiffness:
            105,
        },
      })
    );


  const genome =
    clamp01(
      spring({
        frame:
          frame -
          78,

        fps,

        config: {
          damping:
            165,

          stiffness:
            105,
        },
      })
    );


  const labels =
    clamp01(
      spring({
        frame:
          frame -
          100,

        fps,

        config: {
          damping:
            170,

          stiffness:
            100,
        },
      })
    );


  const sizeRef =
    clamp01(
      spring({
        frame:
          frame -
          120,

        fps,

        config: {
          damping:
            170,

          stiffness:
            100,
        },
      })
    );


  /* -------------------------------------------------------
     INDIVIDUAL RNA APPEARANCE
     ------------------------------------------------------- */

  const sProgress =
    interpolate(
      genome,
      [
        0,
        0.35,
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


  const mProgress =
    interpolate(
      genome,
      [
        0.22,
        0.72,
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


  const lProgress =
    interpolate(
      genome,
      [
        0.52,
        1,
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


  /* -------------------------------------------------------
     GENTLE VIRUS MOTION
     ------------------------------------------------------- */

  const breathe =
    1 +
    Math.sin(
      frame /
        11
    ) *
      0.012;


  /* -------------------------------------------------------
     SURFACE PROTEINS
     ------------------------------------------------------- */

  const spokes =
    Array.from(
      {
        length: 22,
      },

      (
        _,
        i
      ) => {
        const angle =
          (
            Math.PI *
            2 *
            i
          ) /
          22;


        const x1 =
          370 +
          Math.cos(
            angle
          ) *
            205;


        const y1 =
          370 +
          Math.sin(
            angle
          ) *
            205;


        const x2 =
          370 +
          Math.cos(
            angle
          ) *
            253;


        const y2 =
          370 +
          Math.sin(
            angle
          ) *
            253;


        const pulse =
          1 +
          Math.sin(
            (
              frame +
              i *
                7
            ) /
              7
          ) *
            0.08;


        const isGn =
          i %
            2 ===
          0;


        return {
          x1,
          y1,
          x2,
          y2,

          pulse,

          color:
            isGn
              ? theme.colors.violet
              : theme.colors.coral,
        };
      }
    );


  return (
    <div
      style={{
        position:
          "relative",

        width:
          1080,

        height:
          900,
      }}
    >
      <svg
        viewBox="0 0 1080 900"

        width="1080"
        height="900"

        style={{
          position:
            "absolute",

          inset:
            0,

          overflow:
            "visible",
        }}
      >
        {/* =================================================
            SOFT BACKLIGHT
            ================================================= */}

        <circle
          cx="370"
          cy="370"

          r="330"

          fill="url(#virusGlow)"

          opacity={
            envelope *
            0.9
          }
        />


        <defs>
          <radialGradient
            id="virusGlow"
          >
            <stop
              offset="0%"
              stopColor="rgba(156,114,212,.13)"
            />

            <stop
              offset="58%"
              stopColor="rgba(156,114,212,.045)"
            />

            <stop
              offset="100%"
              stopColor="rgba(156,114,212,0)"
            />
          </radialGradient>
        </defs>


        {/* =================================================
            MAIN VIRUS
            ================================================= */}

        <g
          transform={`
            translate(
              ${370 * (1 - breathe)}
              ${370 * (1 - breathe)}
            )

            scale(
              ${breathe}
            )
          `}
        >
          {/* ===============================================
              ENVELOPE
              =============================================== */}

          <circle
            cx="370"
            cy="370"

            r={
              205 *
              envelope
            }

            fill={
              theme.colors.lavender
            }

            opacity={
              envelope *
              0.50
            }
          />


          <circle
            cx="370"
            cy="370"

            r={
              205 *
              envelope
            }

            fill="none"

            stroke={
              theme.colors.violet
            }

            strokeWidth="9"

            opacity={
              envelope
            }
          />


          <circle
            cx="370"
            cy="370"

            r={
              172 *
              envelope
            }

            fill="#FFF9F4"

            stroke={
              theme.colors.violet
            }

            strokeWidth="4"

            opacity={
              envelope
            }
          />


          {/* ===============================================
              Gn / Gc SURFACE PROTEINS
              =============================================== */}

          {spokes.map(
            (
              spoke,
              i
            ) => (
              <g
                key={
                  i
                }

                opacity={
                  proteins
                }
              >
                <line
                  x1={
                    spoke.x1
                  }

                  y1={
                    spoke.y1
                  }

                  x2={
                    spoke.x2
                  }

                  y2={
                    spoke.y2
                  }

                  stroke={
                    spoke.color
                  }

                  strokeWidth="9"

                  strokeLinecap="round"
                />


                <circle
                  cx={
                    spoke.x2
                  }

                  cy={
                    spoke.y2
                  }

                  r={
                    11 *
                    spoke.pulse *
                    proteins
                  }

                  fill={
                    spoke.color
                  }
                />
              </g>
            )
          )}


          {/* ===============================================
              S RNA
              =============================================== */}

          <path
            d="
              M268 302
              C316 242
              352 354
              424 282
            "

            fill="none"

            stroke={
              theme.colors.amber
            }

            strokeWidth="15"

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
              M250 388
              C308 316
              358 438
              452 370
            "

            fill="none"

            stroke={
              theme.colors.coral
            }

            strokeWidth="15"

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
              M292 470
              C338 418
              384 500
              438 446
            "

            fill="none"

            stroke={
              theme.colors.sky
            }

            strokeWidth="15"

            strokeLinecap="round"

            opacity={
              lProgress
            }
          />


          {/* ===============================================
              S / M / L LABELS
              =============================================== */}

          <GenomeLabel
            x={470}
            y={270}

            text="S"

            color={
              theme.colors.amber
            }

            progress={
              labels *
              sProgress
            }
          />


          <GenomeLabel
            x={498}
            y={371}

            text="M"

            color={
              theme.colors.coral
            }

            progress={
              labels *
              mProgress
            }
          />


          <GenomeLabel
            x={476}
            y={463}

            text="L"

            color={
              theme.colors.sky
            }

            progress={
              labels *
              lProgress
            }
          />
        </g>


        {/* =================================================
            STRUCTURE LABELS
            ================================================= */}

        <LayerLabel
          text="Envelope"

          x1={514}
          y1={220}

          x2={660}
          y2={165}

          progress={
            envelope *
            labels
          }

          color={
            theme.colors.violet
          }

          width={
            160
          }
        />


        <LayerLabel
          text="Gn protein"

          x1={544}
          y1={112}

          x2={720}
          y2={82}

          progress={
            proteins *
            labels
          }

          color={
            theme.colors.violet
          }

          width={
            170
          }
        />


        <LayerLabel
          text="Gc protein"

          x1={573}
          y1={160}

          x2={770}
          y2={148}

          progress={
            proteins *
            labels
          }

          color={
            theme.colors.coral
          }

          width={
            170
          }
        />


        <LayerLabel
          text="RNA genome"

          x1={505}
          y1={413}

          x2={700}
          y2={470}

          progress={
            genome *
            labels
          }

          color={
            theme.colors.sky
          }

          width={
            185
          }
        />


        {/* =================================================
            SIZE REFERENCE
            ================================================= */}

        <g
          opacity={
            sizeRef
          }
        >
          <line
            x1="620"
            y1="700"

            x2="845"
            y2="700"

            stroke={
              theme.colors.ink
            }

            strokeWidth="5"

            strokeLinecap="round"
          />


          <line
            x1="620"
            y1="680"

            x2="620"
            y2="721"

            stroke={
              theme.colors.ink
            }

            strokeWidth="5"

            strokeLinecap="round"
          />


          <line
            x1="845"
            y1="680"

            x2="845"
            y2="721"

            stroke={
              theme.colors.ink
            }

            strokeWidth="5"

            strokeLinecap="round"
          />


          <text
            x="732"
            y="751"

            textAnchor="middle"

            fontFamily={
              FONT_STACK
            }

            fontSize="30"

            fontWeight="900"

            fill={
              theme.colors.ink
            }
          >
            ≈ 100 nm
          </text>


          <text
            x="732"
            y="782"

            textAnchor="middle"

            fontFamily={
              FONT_STACK
            }

            fontSize="17"

            fontWeight="750"

            fill={
              theme.colors.muted
            }
          >
            average particle diameter
          </text>
        </g>
      </svg>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const VirusBuildShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* -------------------------------------------------------
     TEXT ENTRANCE
     ------------------------------------------------------- */

  const copyIn =
    clamp01(
      spring({
        frame,

        fps,

        config: {
          damping:
            180,

          stiffness:
            88,
        },
      })
    );


  /* -------------------------------------------------------
     VIRUS ENTRANCE
     ------------------------------------------------------- */

  const virusIn =
    clamp01(
      spring({
        frame:
          frame -
          4,

        fps,

        config: {
          damping:
            175,

          stiffness:
            82,
        },
      })
    );


  /* -------------------------------------------------------
     CROSS-SECTION REFERENCE
     ------------------------------------------------------- */

  const referenceIn =
    interpolate(
      frame,
      [
        116,
        150,
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
          radial-gradient(
            circle at 72% 48%,
            rgba(156,114,212,.10) 0%,
            rgba(156,114,212,.035) 34%,
            rgba(156,114,212,0) 66%
          ),

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
          LEFT TEXT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            88,

          top:
            100,

          width:
            680,

          opacity:
            copyIn,

          transform:
            `translateY(${(1 - copyIn) * 16}px)`,

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
              11,

            padding:
              "11px 18px",

            borderRadius:
              999,

            background:
              "rgba(233,111,106,.11)",

            color:
              theme.colors.coralDark,

            fontFamily:
              theme.fonts.body,

            fontSize:
              18,

            fontWeight:
              900,

            letterSpacing:
              2.2,

            textTransform:
              "uppercase",
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

          Virus structure
        </div>


        {/* =================================================
            TITLE
            ================================================= */}

        <div
          style={{
            marginTop:
              24,

            fontFamily:
              theme.fonts.display,

            fontSize:
              82,

            lineHeight:
              0.92,

            fontWeight:
              900,

            letterSpacing:
              -4.6,

            color:
              theme.colors.ink,
          }}
        >
          Andes virus,
          <br />

          layer by layer.
        </div>


        {/* =================================================
            DESCRIPTION
            ================================================= */}

        <div
          style={{
            marginTop:
              27,

            width:
              610,

            fontFamily:
              theme.fonts.body,

            fontSize:
              31,

            lineHeight:
              1.34,

            fontWeight:
              650,

            letterSpacing:
              -0.55,

            color:
              theme.colors.muted,
          }}
        >
          First comes the lipid envelope, then the Gn and Gc
          surface proteins, followed by three RNA genome
          segments.
        </div>


        {/* =================================================
            S M L KEY
            ================================================= */}

        <div
          style={{
            marginTop:
              34,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              15,
          }}
        >
          {[
            {
              label:
                "S",

              color:
                theme.colors.amber,
            },

            {
              label:
                "M",

              color:
                theme.colors.coral,
            },

            {
              label:
                "L",

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
                  width:
                    70,

                  height:
                    70,

                  borderRadius:
                    "50%",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  background:
                    part.color,

                  color:
                    "#FFFFFF",

                  fontFamily:
                    theme.fonts.body,

                  fontSize:
                    29,

                  fontWeight:
                    900,

                  boxShadow:
                    "0 12px 28px rgba(52,42,35,.10)",
                }}
              >
                {part.label}
              </div>
            )
          )}


          <div
            style={{
              marginLeft:
                5,

              fontFamily:
                theme.fonts.body,

              fontSize:
                20,

              lineHeight:
                1.25,

              fontWeight:
                750,

              color:
                theme.colors.muted,
            }}
          >
            single-stranded
            <br />
            RNA segments
          </div>
        </div>
      </div>


      {/* ===================================================
          VIRUS
          No large white card
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            780,

          top:
            72,

          width:
            1080,

          height:
            900,

          opacity:
            virusIn,

          transform: `
            translateX(
              ${(1 - virusIn) * 32}px
            )

            scale(
              ${0.94 + virusIn * 0.06}
            )
          `,

          transformOrigin:
            "50% 50%",

          zIndex:
            10,
        }}
      >
        <VirusAssemblyGraphic />
      </div>


      {/* ===================================================
          REAL CROSS-SECTION REFERENCE

          Keep it small and secondary.
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            62,

          bottom:
            72,

          width:
            190,

          opacity:
            referenceIn,

          transform:
            `
              translateY(
                ${(1 - referenceIn) * 14}px
              )
            `,

          zIndex:
            25,
        }}
      >
        <div
          style={{
            padding:
              8,

            borderRadius:
              24,

            overflow:
              "hidden",

            background:
              "rgba(255,255,255,.95)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 16px 40px rgba(45,36,30,.10)",
          }}
        >
          <div
            style={{
              width:
                174,

              height:
                174,

              overflow:
                "hidden",

              borderRadius:
                18,
            }}
          >
            <EditorialAsset
              asset={
                ASSETS.virus.crossSection
              }

              width={
                174
              }

              height={
                174
              }

              zoom={
                1
              }

              organic={
                false
              }

              showCredit={
                false
              }
            />
          </div>


          <div
            style={{
              padding:
                "9px 5px 4px",

              textAlign:
                "center",

              fontFamily:
                theme.fonts.body,

              fontSize:
                13,

              fontWeight:
                800,

              letterSpacing:
                1.5,

              textTransform:
                "uppercase",

              color:
                theme.colors.muted,
            }}
          >
            Structure reference
          </div>
        </div>
      </div>
    </div>
  );
};