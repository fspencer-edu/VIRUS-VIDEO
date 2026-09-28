import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

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
   TYPOGRAPHY
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   PHOTO SIZE

   Original image presentation was 760 × 500.
   Preserve that exact aspect ratio:
   760 / 500 = 1.52
   ========================================================= */

const PHOTO_WIDTH =
  820;

const PHOTO_HEIGHT =
  Math.round(
    PHOTO_WIDTH *
      (500 / 760)
  );


/* =========================================================
   TEST TUBE SIZE
   ========================================================= */

const TEST_TUBE_WIDTH =
  180;

const TEST_TUBE_HEIGHT =
  260;


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
        FONT_STACK,

      fontSize:
        20,

      lineHeight:
        1,

      fontWeight:
        650,

      letterSpacing:
        -0.2,

      color:
        "#5D6B7D",

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
        damping: 180,
        stiffness: 86,
      },
    });


  const imageIn =
    spring({
      frame:
        frame - 5,

      fps,

      config: {
        damping: 180,
        stiffness: 80,
      },
    });


  const resultIn =
    spring({
      frame:
        frame - 62,

      fps,

      config: {
        damping: 180,
        stiffness: 90,
      },
    });


  const tubeIn =
    spring({
      frame:
        frame - 74,

      fps,

      config: {
        damping: 180,
        stiffness: 94,
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
              "11px 17px",

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
                "#65A7E8",
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                16,

              lineHeight:
                1,

              fontWeight:
                800,

              letterSpacing:
                2.5,

              textTransform:
                "uppercase",

              color:
                "#4E93D5",
            }}
          >
            May 2
          </span>
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
              TITLE_STACK,

            fontSize:
              84,

            lineHeight:
              0.91,

            fontWeight:
              840,

            letterSpacing:
              -4.5,

            color:
              "#17243A",
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
              30,

            width:
              650,

            fontFamily:
              FONT_STACK,

            fontSize:
              31,

            lineHeight:
              1.36,

            fontWeight:
              600,

            letterSpacing:
              -0.45,

            color:
              "#566A82",
          }}
        >
          Clinicians run tests, rule out common causes, and
          then identify the outbreak as{" "}

          <span
            style={{
              marginLeft:
                4,

              fontWeight:
                750,

              color:
                "#435B73",
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
              30,

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


          {/* =================================================
              QUESTION
              ================================================= */}

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
                  TITLE_STACK,

                fontSize:
                  132,

                lineHeight:
                  0.9,

                fontWeight:
                  850,

                letterSpacing:
                  -5,

                color:
                  "#65A7E8",
              }}
            >
              ?
            </div>
          </div>


          {/* =================================================
              ANSWER
              ================================================= */}

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
                  FONT_STACK,

                fontSize:
                  17,

                fontWeight:
                  850,

                letterSpacing:
                  2.3,

                textTransform:
                  "uppercase",

                color:
                  "#B14E49",
              }}
            >
              Result
            </div>


            <div
              style={{
                marginTop:
                  12,

                fontFamily:
                  TITLE_STACK,

                fontSize:
                  58,

                lineHeight:
                  0.95,

                fontWeight:
                  840,

                letterSpacing:
                  -2.8,

                color:
                  "#B14E49",
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

          opacity:
            imageIn,

          transform: `
            translateX(
              ${(1 - imageIn) * 24}px
            )
          `,

          boxShadow:
            "0 22px 52px rgba(58,42,33,.13)",

          zIndex:
            10,
        }}
      >
        {/* =================================================
            IMAGE
            ================================================= */}

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
            1
          }

          objectPosition="center"

          organic={
            false
          }

          showCredit={
            false
          }
        />


        {/* =================================================
            VERY SUBTLE PHOTO GRADING
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
                rgba(16,37,52,.015) 0%,
                rgba(16,37,52,0) 65%,
                rgba(16,37,52,.08) 100%
              )
            `,

            pointerEvents:
              "none",

            zIndex:
              2,
          }}
        />


        {/* =================================================
            PHOTO LABEL
            ================================================= */}

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
              "rgba(255,255,255,.92)",

            border:
              "1px solid rgba(255,255,255,.68)",

            backdropFilter:
              "blur(12px)",

            boxShadow:
              "0 10px 26px rgba(24,35,46,.08)",

            zIndex:
              4,
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
                "#65A7E8",
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
                1.7,

              textTransform:
                "uppercase",

              color:
                "#2C4159",
            }}
          >
            Laboratory testing
          </span>
        </div>
      </div>


      {/* ===================================================
          TEST TUBE IMAGE
          Loaded directly from public/assets/virus
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            545,

          top:
            600,

          width:
            TEST_TUBE_WIDTH,

          height:
            TEST_TUBE_HEIGHT,

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          opacity:
            tubeIn,

          transform: `
            translateY(
              ${(1 - tubeIn) * 22}px
            )
            scale(
              ${0.92 + tubeIn * 0.08}
            )
          `,

          transformOrigin:
            "center center",

          zIndex:
            16,

          pointerEvents:
            "none",
        }}
      >
        <img
          src={
            staticFile(
              "assets/virus/test_tube.png"
            )
          }

          alt="Laboratory test tube"

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


      {/* ===================================================
          SUPPORTING RESULT COPY
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            96,

          top:
            780,

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
              "rgba(255,255,255,.94)",

            border:
              "1px solid rgba(17,39,68,.08)",

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
                "#F26A60",
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              fontWeight:
                750,

              letterSpacing:
                -0.25,

              color:
                "#2C4159",
            }}
          >
            Genetic sequencing identifies Andes virus
          </span>
        </div>
      </div>
    </div>
  );
};