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
   Match "Outbreak at sea"
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


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
        damping: 180,
        stiffness: 86,
      },
    });


  const lowIn =
    spring({
      frame:
        frame -
        18,

      fps,

      config: {
        damping: 165,
        stiffness: 92,
      },
    });


  const cardIn =
    spring({
      frame:
        frame -
        42,

      fps,

      config: {
        damping: 180,
        stiffness: 84,
      },
    });


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
      frame / 16
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
          GREEN BACKGROUND GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            360,

          width:
            1100,

          height:
            680,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(53,166,161,.11) 0%,
              rgba(111,163,107,.075) 32%,
              rgba(111,163,107,.028) 58%,
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
            88,

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
              28,

            width:
              1320,

            fontFamily:
              TITLE_STACK,

            fontSize:
              72,

            lineHeight:
              0.96,

            fontWeight:
              840,

            letterSpacing:
              -3.8,

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
            DIVIDER / ACCENT
            ================================================= */}

        <div
          style={{
            marginTop:
              28,

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
              18,

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
          {/* Soft halo */}

          <div
            style={{
              position:
                "absolute",

              left:
                "50%",

              top:
                "50%",

              width:
                420,

              height:
                210,

              borderRadius:
                "50%",

              background: `
                radial-gradient(
                  ellipse,
                  rgba(111,163,107,.16) 0%,
                  rgba(111,163,107,.07) 48%,
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
                164,

              lineHeight:
                0.88,

              fontWeight:
                900,

              letterSpacing:
                -8,

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
      </div>


      {/* ===================================================
          CONCLUSION CARD
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          bottom:
            96,

          width:
            1240,

          boxSizing:
            "border-box",

          padding:
            "26px 34px",

          borderRadius:
            28,

          background:
            "rgba(255,255,255,.95)",

          border:
            `2px solid ${theme.colors.green}`,

          boxShadow: `
            0 20px 50px rgba(52,42,35,.09),
            0 0 42px rgba(111,163,107,.035)
          `,

          opacity:
            cardIn,

          transform: `
            translateX(-50%)
            translateY(
              ${(1 - cardIn) * 16}px
            )
            scale(
              ${0.97 + cardIn * 0.03}
            )
          `,

          transformOrigin:
            "50% 50%",

          zIndex:
            20,
        }}
      >
        {/* Card heading */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            gap:
              10,
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
            Why the risk remains limited
          </span>
        </div>


        {/* Main conclusion */}

        <div
          style={{
            marginTop:
              13,

            fontFamily:
              FONT_STACK,

            fontSize:
              27,

            lineHeight:
              1.38,

            fontWeight:
              600,

            letterSpacing:
              -0.35,

            color:
              "#31465E",

            textAlign:
              "center",
          }}
        >
          The outbreak mattered because Andes virus can cause
          severe disease and can rarely spread between people,
          but transmission generally requires close, prolonged
          contact. The outbreak was declining and public-health
          controls were already active.
        </div>


        {/* =================================================
            THREE REASONS
            ================================================= */}

        <div
          style={{
            marginTop:
              20,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            gap:
              34,
          }}
        >
          {[
            "Close contact usually required",
            "Outbreak declining",
            "Controls already active",
          ].map(
            item => (
              <div
                key={
                  item
                }
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap:
                    9,
                }}
              >
                <span
                  style={{
                    width:
                      8,

                    height:
                      8,

                    flex:
                      "0 0 auto",

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
                      17,

                    fontWeight:
                      700,

                    color:
                      "#566A82",

                    whiteSpace:
                      "nowrap",
                  }}
                >
                  {item}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};