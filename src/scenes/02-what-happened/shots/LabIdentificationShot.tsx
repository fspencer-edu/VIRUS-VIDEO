import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  CinematicCamera,
} from "../../../components/camera/CinematicCamera";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import {
  LabSequence,
} from "../../../components/graphics/LabSequence";

import {
  RoughHighlightAccent,
  RoughUnderlineAccent,
} from "../../../components/visuals/HandDrawnEmphasis";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";


/* =========================================================
   CONSTANTS
   ========================================================= */

const PHOTO_WIDTH =
  820;

const PHOTO_HEIGHT =
  610;


/* =========================================================
   PILL
   ========================================================= */

const Pill = ({
  label,
}: {
  label: string;
}) => (
  <div
    style={{
      padding:
        "12px 19px",

      borderRadius:
        999,

      background:
        "rgba(255,255,255,.94)",

      border:
        `1px solid ${theme.colors.line}`,

      fontFamily:
        theme.fonts.body,

      fontSize:
        20,

      lineHeight:
        1,

      fontWeight:
        650,

      color:
        theme.colors.muted,

      boxShadow:
        "0 10px 24px rgba(54,45,38,.06)",
    }}
  >
    {label}
  </div>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const LabIdentificationShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     ENTRANCES
     ======================================================= */

  const copyIn =
    spring({
      frame,

      fps,

      config: {
        damping:
          180,

        stiffness:
          86,
      },
    });


  const imageIn =
    spring({
      frame:
        frame -
        5,

      fps,

      config: {
        damping:
          180,

        stiffness:
          80,
      },
    });


  const resultIn =
    spring({
      frame:
        frame -
        62,

      fps,

      config: {
        damping:
          180,

        stiffness:
          90,
      },
    });


  /* =======================================================
     QUESTION / RESULT
     ======================================================= */

  const questionOpacity =
    interpolate(
      frame,
      [
        0,
        70,
        95,
      ],
      [
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


  const answerOpacity =
    interpolate(
      frame,
      [
        80,
        125,
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
            #F8F5EF 0%,
            #FAF8F3 100%
          )
        `,
      }}
    >
      {/* ===================================================
          SUBTLE PAPER TEXTURE
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
              rgba(36,56,72,.15) .7px,
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
          LEFT CONTENT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            88,

          top:
            92,

          width:
            720,

          opacity:
            copyIn,

          transform: `
            translateY(
              ${(1 - copyIn) * 18}px
            )
          `,

          zIndex:
            20,
        }}
      >
        {/* =================================================
            DATE
            ================================================= */}

        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              10,

            padding:
              "12px 18px",

            borderRadius:
              999,

            background:
              "rgba(101,167,232,.14)",

            color:
              theme.colors.sky,

            fontFamily:
              theme.fonts.body,

            fontSize:
              20,

            fontWeight:
              850,

            letterSpacing:
              2.5,

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
                theme.colors.sky,
            }}
          />

          May 2
        </div>


        {/* =================================================
            TITLE
            ================================================= */}

        <div
          style={{
            marginTop:
              24,

            width:
              700,

            fontFamily:
              theme.fonts.display,

            fontSize:
              82,

            lineHeight:
              0.98,

            fontWeight:
              700,

            letterSpacing:
              -2.8,

            color:
              theme.colors.ink,
          }}
        >
          Laboratory testing
          <br />

          solves the mystery.
        </div>


        {/* =================================================
            DESCRIPTION
            ================================================= */}

        <div
          style={{
            marginTop:
              28,

            width:
              650,

            fontFamily:
              theme.fonts.body,

            fontSize:
              32,

            lineHeight:
              1.4,

            fontWeight:
              520,

            letterSpacing:
              -0.35,

            color:
              theme.colors.muted,
          }}
        >
          Clinicians run tests, rule out common causes, and
          then identify the outbreak as{" "}

          <span
            style={{
              marginLeft:
                4,
            }}
          >
            <RoughUnderlineAccent
              startFrame={
                96
              }
              durationInFrames={
                28
              }
              color={
                theme.colors.coral
              }
            >
              Andes virus.
            </RoughUnderlineAccent>
          </span>
        </div>


        {/* =================================================
            TEST PILLS
            ================================================= */}

        <div
          style={{
            display:
              "flex",

            gap:
              13,

            marginTop:
              28,

            flexWrap:
              "wrap",
          }}
        >
          <Pill
            label="Clinical samples"
          />

          <Pill
            label="RT-PCR"
          />

          <Pill
            label="Sequencing"
          />
        </div>


        {/* =================================================
            RESULT CARD
            ================================================= */}

        <div
          style={{
            position:
              "relative",

            marginTop:
              42,

            width:
              560,

            height:
              205,

            borderRadius:
              30,

            overflow:
              "hidden",

            background:
              "rgba(255,255,255,.96)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 18px 46px rgba(52,42,35,.09)",

            opacity:
              resultIn,

            transform: `
              translateY(
                ${(1 - resultIn) * 16}px
              )
            `,
          }}
        >
          {/* Soft blue wash */}

          <div
            style={{
              position:
                "absolute",

              inset:
                0,

              background: `
                linear-gradient(
                  180deg,
                  rgba(101,167,232,.10),
                  rgba(255,255,255,0)
                )
              `,
            }}
          />


          {/* Question */}

          <div
            style={{
              position:
                "absolute",

              inset:
                0,

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              opacity:
                questionOpacity,

              transform:
                `scale(${0.96 + questionOpacity * 0.04})`,
            }}
          >
            <div
              style={{
                fontFamily:
                  theme.fonts.display,

                fontSize:
                  132,

                lineHeight:
                  1,

                color:
                  theme.colors.sky,
              }}
            >
              ?
            </div>
          </div>


          {/* Result */}

          <div
            style={{
              position:
                "absolute",

              inset:
                0,

              display:
                "flex",

              flexDirection:
                "column",

              alignItems:
                "center",

              justifyContent:
                "center",

              opacity:
                answerOpacity,

              transform:
                `scale(${0.92 + answerOpacity * 0.08})`,

              textAlign:
                "center",
            }}
          >
            <div
              style={{
                fontFamily:
                  theme.fonts.body,

                fontSize:
                  19,

                fontWeight:
                  850,

                letterSpacing:
                  2.4,

                textTransform:
                  "uppercase",

                color:
                  theme.colors.coralDark,
              }}
            >
              Result
            </div>


            <div
              style={{
                marginTop:
                  12,

                fontFamily:
                  theme.fonts.display,

                fontSize:
                  58,

                lineHeight:
                  1,

                color:
                  theme.colors.coralDark,
              }}
            >
              <RoughHighlightAccent
                startFrame={
                  102
                }
                durationInFrames={
                  24
                }
                color="rgba(244,160,175,.45)"
              >
                Andes virus
              </RoughHighlightAccent>
            </div>
          </div>
        </div>
      </div>


      {/* ===================================================
          RIGHT LAB PHOTO
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            72,

          top:
            74,

          width:
            PHOTO_WIDTH,

          height:
            PHOTO_HEIGHT,

          borderRadius:
            34,

          overflow:
            "hidden",

          background:
            theme.colors.white,

          border:
            `2px solid ${theme.colors.line}`,

          boxShadow:
            "0 28px 72px rgba(58,42,33,.14)",

          opacity:
            imageIn,

          transform: `
            translateX(
              ${(1 - imageIn) * 24}px
            )
          `,

          zIndex:
            10,
        }}
      >
        <CinematicCamera
          durationInFrames={
            240
          }
          from={{
            x:
              0,

            y:
              0,

            scale:
              1.01,
          }}
          to={{
            x:
              -8,

            y:
              -4,

            scale:
              1.045,
          }}
          origin="60% 50%"
        >
          <EditorialAsset
            asset={
              ASSETS.outbreak.pcrPhoto
            }

            width={
              PHOTO_WIDTH
            }

            height={
              PHOTO_HEIGHT
            }

            zoom={
              1.04
            }

            objectPosition="center"

            organic={
              false
            }

            showCredit={
              false
            }
          />
        </CinematicCamera>


        {/* Subtle photo gradient */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background: `
              linear-gradient(
                180deg,
                rgba(16,37,52,.02) 0%,
                rgba(16,37,52,.00) 58%,
                rgba(16,37,52,.16) 100%
              )
            `,

            pointerEvents:
              "none",
          }}
        />


        {/* Photo label */}

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
              10,

            padding:
              "11px 16px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.90)",

            border:
              "1px solid rgba(255,255,255,.60)",

            backdropFilter:
              "blur(12px)",

            boxShadow:
              "0 10px 26px rgba(24,35,46,.08)",
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
                theme.colors.sky,
            }}
          />

          <span
            style={{
              fontFamily:
                theme.fonts.body,

              fontSize:
                15,

              fontWeight:
                800,

              letterSpacing:
                1.7,

              textTransform:
                "uppercase",

              color:
                theme.colors.ink,
            }}
          >
            Laboratory testing
          </span>
        </div>
      </div>


      {/* ===================================================
          LAB SEQUENCE
          Move below photo instead of overlapping awkwardly
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            310,

          top:
            635,

          transform:
            "scale(.90)",

          transformOrigin:
            "top center",

          zIndex:
            16,
        }}
      >
        <LabSequence />
      </div>


      {/* ===================================================
          RIGHT-SIDE SUPPORTING COPY
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            96,

          top:
            770,

          width:
            760,

          display:
            "flex",

          justifyContent:
            "center",

          opacity:
            answerOpacity,

          transform: `
            translateY(
              ${(1 - answerOpacity) * 12}px
            )
          `,

          zIndex:
            15,
        }}
      >
        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              12,

            padding:
              "14px 20px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.92)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 12px 28px rgba(52,42,35,.07)",
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
                theme.colors.coral,
            }}
          />

          <span
            style={{
              fontFamily:
                theme.fonts.body,

              fontSize:
                20,

              fontWeight:
                720,

              color:
                theme.colors.ink,
            }}
          >
            Genetic sequencing identifies Andes virus
          </span>
        </div>
      </div>
    </div>
  );
};