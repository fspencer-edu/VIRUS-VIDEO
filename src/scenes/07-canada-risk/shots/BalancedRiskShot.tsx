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
   Match the "Outbreak at sea" visual system
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   BULLET CARD
   ========================================================= */

type BulletCardProps = {
  eyebrow: string;

  title: string;

  items: string[];

  color: string;

  accent: string;

  glow: string;

  left: number;

  active: number;

  index: number;
};


const BulletCard = ({
  eyebrow,
  title,
  items,
  color,
  accent,
  glow,
  left,
  active,
  index,
}: BulletCardProps) => {
  return (
    <div
      style={{
        position: "absolute",

        left,

        top: 292,

        width: 820,
        height: 570,

        boxSizing:
          "border-box",

        padding:
          "30px 34px 34px",

        borderRadius:
          32,

        background:
          "rgba(255,255,255,.95)",

        border:
          `2px solid ${color}`,

        boxShadow: `
          0 22px 52px rgba(52,42,35,.08),
          0 0 52px ${glow}
        `,

        opacity:
          0.28 +
          active *
            0.72,

        transform: `
          translateY(
            ${(1 - active) * 18}px
          )

          scale(
            ${0.975 + active * 0.025}
          )
        `,

        transformOrigin:
          "50% 50%",

        overflow:
          "hidden",
      }}
    >
      {/* ===================================================
          SOFT CARD WASH
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          background: `
            linear-gradient(
              180deg,
              ${accent} 0%,
              rgba(255,255,255,0) 42%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          HEADER
          =================================================== */}

      <div
        style={{
          position:
            "relative",

          zIndex:
            2,
        }}
      >
        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              10,

            padding:
              "10px 15px",

            borderRadius:
              999,

            background:
              accent,

            border:
              `1px solid ${color}22`,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,

              borderRadius:
                "50%",

              background:
                color,

              boxShadow:
                `0 0 12px ${color}44`,
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                15,

              lineHeight:
                1,

              fontWeight:
                850,

              letterSpacing:
                2,

              textTransform:
                "uppercase",

              color,
            }}
          >
            {eyebrow}
          </span>
        </div>


        <div
          style={{
            marginTop:
              20,

            width:
              700,

            fontFamily:
              TITLE_STACK,

            fontSize:
              42,

            lineHeight:
              1.05,

            fontWeight:
              820,

            letterSpacing:
              -1.6,

            color:
              "#17243A",
          }}
        >
          {title}
        </div>
      </div>


      {/* ===================================================
          DIVIDER
          =================================================== */}

      <div
        style={{
          position:
            "relative",

          marginTop:
            24,

          width:
            "100%",

          height:
            1,

          background:
            "rgba(17,39,68,.08)",

          zIndex:
            2,
        }}
      />


      {/* ===================================================
          BULLETS
          =================================================== */}

      <div
        style={{
          position:
            "relative",

          marginTop:
            26,

          display:
            "grid",

          gap:
            items.length >=
            4
              ? 22
              : 28,

          zIndex:
            2,
        }}
      >
        {items.map(
          (
            item,
            itemIndex
          ) => {
            const itemProgress =
              interpolate(
                active,

                [
                  itemIndex *
                    0.12,

                  0.52 +
                    itemIndex *
                      0.12,
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
                key={
                  item
                }
                style={{
                  display:
                    "flex",

                  alignItems:
                    "flex-start",

                  gap:
                    18,

                  opacity:
                    itemProgress,

                  transform:
                    `translateX(${(1 - itemProgress) * 12}px)`,
                }}
              >
                {/* Bullet */}

                <div
                  style={{
                    width:
                      18,

                    height:
                      18,

                    marginTop:
                      8,

                    flex:
                      "0 0 auto",

                    borderRadius:
                      "50%",

                    background:
                      color,

                    boxShadow:
                      `0 0 0 7px ${accent}`,
                  }}
                />


                {/* Text */}

                <div
                  style={{
                    maxWidth:
                      690,

                    fontFamily:
                      FONT_STACK,

                    fontSize:
                      items.length >=
                      4
                        ? 27
                        : 30,

                    lineHeight:
                      1.28,

                    fontWeight:
                      650,

                    letterSpacing:
                      -0.4,

                    color:
                      "#31465E",
                  }}
                >
                  {item}
                </div>
              </div>
            );
          }
        )}
      </div>


      {/* ===================================================
          CARD NUMBER
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            26,

          bottom:
            22,

          fontFamily:
            FONT_STACK,

          fontSize:
            13,

          fontWeight:
            850,

          letterSpacing:
            2,

          color,

          opacity:
            0.42,
        }}
      >
        0{index + 1}
      </div>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const BalancedRiskShot = () => {
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
     CARD ENTRANCES
     ======================================================= */

  const leftActive =
    interpolate(
      frame,

      [
        10,
        56,
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


  const rightActive =
    interpolate(
      frame,

      [
        52,
        108,
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


  const balanceIn =
    interpolate(
      frame,

      [
        88,
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
          BACKGROUND GLOWS
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            -120,

          top:
            260,

          width:
            820,

          height:
            620,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(242,106,96,.055) 0%,
              rgba(242,106,96,.02) 46%,
              rgba(242,106,96,0) 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      <div
        style={{
          position:
            "absolute",

          right:
            -120,

          top:
            260,

          width:
            820,

          height:
            620,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(53,166,161,.055) 0%,
              rgba(53,166,161,.02) 46%,
              rgba(53,166,161,0) 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          TITLE AREA
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            86,

          top:
            72,

          width:
            1600,

          opacity:
            titleIn,

          transform:
            `translateY(${(1 - titleIn) * 16}px)`,

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
                "#168894",
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
                "#168894",
            }}
          >
            Canada risk assessment
          </span>
        </div>


        {/* Main title */}

        <div
          style={{
            marginTop:
              18,

            width:
              1530,

            fontFamily:
              TITLE_STACK,

            fontSize:
              66,

            lineHeight:
              0.98,

            fontWeight:
              840,

            letterSpacing:
              -3.2,

            color:
              "#17243A",
          }}
        >
          Risk in Canada reflects both reasons for concern
          and factors that limit spread.
        </div>
      </div>


      {/* ===================================================
          LEFT CARD
          =================================================== */}

      <BulletCard
        index={
          0
        }

        eyebrow="Raises concern"

        title="Factors that increase concern"

        color={
          theme.colors.coralDark
        }

        accent="rgba(233,111,106,.12)"

        glow="rgba(233,111,106,.035)"

        left={
          72
        }

        active={
          leftActive
        }

        items={[
          "International travel",

          "Potential for severe disease",

          "Possible person-to-person transmission",
        ]}
      />


      {/* ===================================================
          RIGHT CARD
          =================================================== */}

      <BulletCard
        index={
          1
        }

        eyebrow="Limits risk"

        title="Factors that keep the overall threat limited"

        color={
          theme.colors.tealDark
        }

        accent="rgba(53,166,161,.12)"

        glow="rgba(53,166,161,.035)"

        left={
          1028
        }

        active={
          rightActive
        }

        items={[
          "Close and prolonged contact is usually required",

          "Outbreak spread is declining",

          "Andes virus is mainly associated with South America",

          "Isolation, testing and contact tracing are in place",
        ]}
      />


      {/* ===================================================
          CENTRE BALANCE MARKER
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            540,

          width:
            88,

          height:
            88,

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          borderRadius:
            "50%",

          background:
            "rgba(255,255,255,.97)",

          border:
            "1px solid rgba(17,39,68,.10)",

          boxShadow:
            "0 16px 38px rgba(52,42,35,.10)",

          opacity:
            balanceIn,

          transform: `
            translate(-50%, -50%)
            scale(
              ${0.82 + balanceIn * 0.18}
            )
          `,

          zIndex:
            30,
        }}
      >
        <div
          style={{
            position:
              "absolute",

            width:
              46,

            height:
              4,

            borderRadius:
              999,

            background:
              `linear-gradient(
                90deg,
                ${theme.colors.coralDark} 0 50%,
                ${theme.colors.tealDark} 50% 100%
              )`,
          }}
        />

        <div
          style={{
            position:
              "absolute",

            width:
              4,

            height:
              46,

            borderRadius:
              999,

            background:
              "#FFFFFF",
          }}
        />
      </div>


      {/* ===================================================
          BOTTOM SUMMARY
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          bottom:
            82,

          display:
            "inline-flex",

          alignItems:
            "center",

          gap:
            12,

          padding:
            "13px 20px",

          borderRadius:
            999,

          background:
            "rgba(255,255,255,.92)",

          border:
            "1px solid rgba(17,39,68,.08)",

          boxShadow:
            "0 12px 30px rgba(52,42,35,.07)",

          opacity:
            balanceIn,

          transform: `
            translateX(-50%)
            translateY(
              ${(1 - balanceIn) * 12}px
            )
          `,

          zIndex:
            20,
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
              "#168894",
          }}
        />

        <span
          style={{
            fontFamily:
              FONT_STACK,

            fontSize:
              19,

            fontWeight:
              750,

            letterSpacing:
              -0.2,

            color:
              "#31465E",
          }}
        >
          Risk depends on both exposure and opportunities for onward transmission.
        </span>
      </div>
    </div>
  );
};