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
   REASON CARD
   ========================================================= */

const ReasonCard = ({
  number,
  title,
  detail,
  progress,
}: {
  number: string;
  title: string;
  detail: string;
  progress: number;
}) => (
  <div
    style={{
      position:
        "relative",

      width:
        350,

      minHeight:
        145,

      boxSizing:
        "border-box",

      padding:
        "22px 22px 20px",

      borderRadius:
        22,

      background:
        "rgba(255,255,255,.94)",

      border:
        "1px solid rgba(111,163,107,.24)",

      boxShadow:
        "0 14px 34px rgba(52,42,35,.07)",

      opacity:
        progress,

      transform: `
        translateY(
          ${(1 - progress) * 14}px
        )

        scale(
          ${0.97 + progress * 0.03}
        )
      `,
    }}
  >
    {/* Number */}

    <div
      style={{
        width:
          36,

        height:
          36,

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        borderRadius:
          "50%",

        background:
          "rgba(111,163,107,.12)",

        border:
          "1px solid rgba(111,163,107,.18)",

        fontFamily:
          FONT_STACK,

        fontSize:
          16,

        fontWeight:
          900,

        color:
          theme.colors.green,
      }}
    >
      {number}
    </div>


    {/* Title */}

    <div
      style={{
        marginTop:
          14,

        fontFamily:
          TITLE_STACK,

        fontSize:
          21,

        lineHeight:
          1.12,

        fontWeight:
          820,

        letterSpacing:
          -0.45,

        color:
          "#17243A",
      }}
    >
      {title}
    </div>


    {/* Detail */}

    <div
      style={{
        marginTop:
          7,

        fontFamily:
          FONT_STACK,

        fontSize:
          16,

        lineHeight:
          1.35,

        fontWeight:
          600,

        color:
          "#617184",
      }}
    >
      {detail}
    </div>
  </div>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const LowRiskConclusionShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     ENTRANCE ANIMATIONS
     ======================================================= */

  const headingIn =
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


  const lowIn =
    spring({
      frame:
        frame -
        16,

      fps,

      config: {
        damping:
          165,

        stiffness:
          92,
      },
    });


  const supportingIn =
    spring({
      frame:
        frame -
        34,

      fps,

      config: {
        damping:
          180,

        stiffness:
          86,
      },
    });


  const cardOneIn =
    interpolate(
      frame,

      [
        44,
        78,
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


  const cardTwoIn =
    interpolate(
      frame,

      [
        56,
        90,
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


  const cardThreeIn =
    interpolate(
      frame,

      [
        68,
        102,
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


  const conclusionIn =
    interpolate(
      frame,

      [
        90,
        132,
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


  const glowIn =
    interpolate(
      frame,

      [
        0,
        55,
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


  const lineIn =
    interpolate(
      frame,

      [
        24,
        68,
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


  const pulse =
    1 +
    Math.sin(
      frame /
        16
    ) *
      0.012;


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
            0.13,

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
          CENTRAL BACKGROUND GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            390,

          width:
            1040,

          height:
            600,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(53,166,161,.09) 0%,
              rgba(111,163,107,.055) 34%,
              rgba(111,163,107,.020) 58%,
              rgba(111,163,107,0) 78%
            )
          `,

          opacity:
            glowIn,

          transform: `
            translate(-50%, -50%)
            scale(${pulse})
          `,

          transformOrigin:
            "50% 50%",

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          TOP CONTENT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            0,

          right:
            0,

          top:
            66,

          display:
            "flex",

          flexDirection:
            "column",

          alignItems:
            "center",

          opacity:
            headingIn,

          transform: `
            translateY(
              ${(1 - headingIn) * 18}px
            )
          `,

          zIndex:
            20,
        }}
      >

        {/* =================================================
            EYEBROW
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
              "rgba(255,255,255,.92)",

            border:
              "1px solid rgba(17,39,68,.08)",

            boxShadow:
              "0 8px 24px rgba(37,50,65,.04)",
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
                theme.colors.green,
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                16,

              fontWeight:
                850,

              letterSpacing:
                2.4,

              textTransform:
                "uppercase",

              color:
                theme.colors.green,
            }}
          >
            Canadian general population
          </span>
        </div>


        {/* =================================================
            HEADING
            ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              1320,

            fontFamily:
              TITLE_STACK,

            fontSize:
              68,

            lineHeight:
              0.96,

            fontWeight:
              840,

            letterSpacing:
              -3.5,

            color:
              "#17243A",

            textAlign:
              "center",
          }}
        >
          Overall risk to the Canadian
          <br />

          general population
        </div>


        {/* =================================================
            DIVIDER
            ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              180 *
              lineIn,

            height:
              5,

            borderRadius:
              999,

            background:
              `linear-gradient(
                90deg,
                ${theme.colors.teal},
                ${theme.colors.green}
              )`,
          }}
        />


        {/* =================================================
            LOW
            ================================================= */}

        <div
          style={{
            position:
              "relative",

            marginTop:
              14,

            opacity:
              lowIn,

            transform: `
              scale(
                ${0.82 + lowIn * 0.18}
              )
            `,

            transformOrigin:
              "50% 50%",
          }}
        >

          {/* Halo */}

          <div
            style={{
              position:
                "absolute",

              left:
                "50%",

              top:
                "50%",

              width:
                430,

              height:
                190,

              borderRadius:
                "50%",

              background: `
                radial-gradient(
                  ellipse,
                  rgba(111,163,107,.17) 0%,
                  rgba(111,163,107,.075) 48%,
                  rgba(111,163,107,0) 76%
                )
              `,

              transform:
                "translate(-50%, -50%)",

              pointerEvents:
                "none",
            }}
          />


          <div
            style={{
              position:
                "relative",

              fontFamily:
                TITLE_STACK,

              fontSize:
                150,

              lineHeight:
                0.88,

              fontWeight:
                900,

              letterSpacing:
                -7,

              textTransform:
                "uppercase",

              color:
                theme.colors.green,

              textAlign:
                "center",

              textShadow:
                "0 8px 26px rgba(80,128,77,.08)",
            }}
          >
            Low
          </div>
        </div>


        {/* =================================================
            ASSESSMENT SUBLABEL
            ================================================= */}

        <div
          style={{
            marginTop:
              13,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              8,

            padding:
              "8px 14px",

            borderRadius:
              999,

            background:
              "rgba(111,163,107,.08)",

            border:
              "1px solid rgba(111,163,107,.16)",

            opacity:
              supportingIn,

            transform: `
              translateY(
                ${(1 - supportingIn) * 8}px
              )
            `,
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
                theme.colors.green,
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                14,

              fontWeight:
                800,

              letterSpacing:
                1.5,

              textTransform:
                "uppercase",

              color:
                theme.colors.green,
            }}
          >
            Public-health assessment
          </span>
        </div>
      </div>


      {/* ===================================================
          SUPPORTING EVIDENCE TITLE
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            0,

          right:
            0,

          top:
            540,

          textAlign:
            "center",

          opacity:
            supportingIn,

          transform: `
            translateY(
              ${(1 - supportingIn) * 10}px
            )
          `,

          zIndex:
            20,
        }}
      >
        <div
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
              theme.colors.green,
          }}
        >
          Why the broader risk remained limited
        </div>


        <div
          style={{
            marginTop:
              7,

            fontFamily:
              FONT_STACK,

            fontSize:
              20,

            fontWeight:
              600,

            color:
              "#617184",
          }}
        >
          Three pieces of evidence support the overall assessment.
        </div>
      </div>


      {/* ===================================================
          THREE REASON CARDS
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            610,

          display:
            "flex",

          alignItems:
            "stretch",

          justifyContent:
            "center",

          gap:
            24,

          transform:
            "translateX(-50%)",

          zIndex:
            20,
        }}
      >
        <ReasonCard
          number="1"

          title="Close contact usually required"

          detail="Person-to-person spread generally requires close and prolonged exposure."

          progress={
            cardOneIn
          }
        />


        <ReasonCard
          number="2"

          title="Transmission was declining"

          detail="Outbreak dynamics indicated that onward transmission was decreasing."

          progress={
            cardTwoIn
          }
        />


        <ReasonCard
          number="3"

          title="Controls were already active"

          detail="Isolation, testing and contact tracing were already limiting further spread."

          progress={
            cardThreeIn
          }
        />
      </div>


      {/* ===================================================
          FINAL CONCLUSION
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
            1160,

          boxSizing:
            "border-box",

          padding:
            "18px 30px",

          borderRadius:
            24,

          background:
            "rgba(255,255,255,.95)",

          border:
            `2px solid ${theme.colors.green}`,

          boxShadow: `
            0 16px 38px rgba(52,42,35,.08),
            0 0 36px rgba(111,163,107,.03)
          `,

          opacity:
            conclusionIn,

          transform: `
            translateX(-50%)

            translateY(
              ${(1 - conclusionIn) * 14}px
            )
          `,

          zIndex:
            25,
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
              14,
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
                theme.colors.green,
            }}
          />


          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                22,

              lineHeight:
                1.35,

              fontWeight:
                650,

              letterSpacing:
                -0.25,

              color:
                "#31465E",

              textAlign:
                "center",
            }}
          >
            Andes virus can cause severe disease, but the
            evidence from this outbreak supports a
            <strong
              style={{
                marginLeft:
                  6,

                marginRight:
                  6,

                fontWeight:
                  850,

                color:
                  theme.colors.green,
              }}
            >
              low risk to the Canadian general population
            </strong>
            rather than widespread community transmission.
          </div>
        </div>
      </div>
    </div>
  );
};