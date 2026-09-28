import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  IllustratedPerson,
} from "../../../components/characters/IllustratedPerson";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

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
   LABEL TAG
   ========================================================= */

const Tag = ({
  left,
  top,
  text,
  color,
}: {
  left: number;
  top: number;
  text: string;
  color: string;
}) => (
  <div
    style={{
      position:
        "absolute",

      left,
      top,

      display:
        "inline-flex",

      alignItems:
        "center",

      gap:
        9,

      padding:
        "11px 16px",

      borderRadius:
        999,

      background:
        "rgba(255,255,255,.94)",

      border:
        `2px solid ${color}`,

      boxShadow:
        "0 10px 26px rgba(52,42,35,.10)",

      backdropFilter:
        "blur(10px)",

      fontFamily:
        FONT_STACK,

      fontSize:
        18,

      fontWeight:
        800,

      color:
        theme.colors.ink,

      zIndex:
        20,
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
          color,
      }}
    />

    {text}
  </div>
);


/* =========================================================
   RISING PARTICLES
   ========================================================= */

const RisingParticles = ({
  count = 48,
  active = 1,
  fromX = 720,
  fromY = 690,
  toX = 1010,
  toY = 330,
}: {
  count?: number;
  active?: number;
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
}) => {
  const frame =
    useCurrentFrame();


  return (
    <>
      {Array.from(
        {
          length:
            count,
        },
        (
          _,
          i
        ) => {
          const t =
            (
              (
                frame *
                  (
                    1.25 +
                    (
                      i %
                      5
                    ) *
                      0.16
                  ) +
                i *
                  19
              ) %
              180
            ) /
            180;


          const x =
            fromX +
            (
              toX -
              fromX
            ) *
              t +
            Math.sin(
              frame /
                12 +
                i
            ) *
              (
                18 +
                (
                  i %
                  4
                ) *
                  9
              );


          const y =
            fromY +
            (
              toY -
              fromY
            ) *
              t +
            Math.cos(
              frame /
                10 +
                i *
                  0.8
            ) *
              (
                15 +
                (
                  i %
                  3
                ) *
                  11
              );


          const size =
            7 +
            (
              i %
              4
            ) *
              3;


          const opacity =
            (
              0.16 +
              (
                (
                  i *
                  17
                ) %
                10
              ) /
                18
            ) *
            active *
            (
              1 -
              t *
                0.12
            );


          return (
            <span
              key={
                i
              }

              style={{
                position:
                  "absolute",

                left:
                  x,

                top:
                  y,

                width:
                  size,

                height:
                  size,

                borderRadius:
                  "50%",

                background:
                  i %
                    3 ===
                  0
                    ? theme.colors.coral
                    : theme.colors.violet,

                opacity,

                filter:
                  `blur(${(i % 4) * 0.7}px)`,

                boxShadow:
                  i %
                    5 ===
                  0
                    ? "0 0 20px rgba(156,114,212,.28)"
                    : undefined,

                zIndex:
                  14,
              }}
            />
          );
        }
      )}
    </>
  );
};


/* =========================================================
   CONTAMINATION PATH STEP
   ========================================================= */

const ExposureStep = ({
  number,
  title,
  progress,
  color,
}: {
  number: string;
  title: string;
  progress: number;
  color: string;
}) => {
  const p =
    clamp01(
      progress
    );


  return (
    <div
      style={{
        display:
          "flex",

        alignItems:
          "center",

        gap:
          15,

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 12}px
          )
        `,
      }}
    >
      <div
        style={{
          width:
            42,

          height:
            42,

          flex:
            "0 0 auto",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          borderRadius:
            "50%",

          background:
            color,

          color:
            "#FFFFFF",

          fontFamily:
            FONT_STACK,

          fontSize:
            17,

          fontWeight:
            850,
        }}
      >
        {number}
      </div>


      <div
        style={{
          fontFamily:
            FONT_STACK,

          fontSize:
            21,

          lineHeight:
            1.2,

          fontWeight:
            750,

          color:
            theme.colors.ink,
        }}
      >
        {title}
      </div>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const RodentContaminationShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     MAIN ENTRANCES
     ======================================================= */

  const headerIn =
    spring({
      frame,

      fps,

      config: {
        damping:
          180,

        stiffness:
          90,
      },
    });


  const sceneIn =
    spring({
      frame:
        frame - 8,

      fps,

      config: {
        damping:
          180,

        stiffness:
          80,
      },
    });


  const personReveal =
    spring({
      frame:
        frame - 72,

      fps,

      config: {
        damping:
          170,

        stiffness:
          110,
      },
    });


  const ratReveal =
    spring({
      frame:
        frame - 22,

      fps,

      config: {
        damping:
          170,

        stiffness:
          100,
      },
    });


  const step1 =
    spring({
      frame:
        frame - 28,

      fps,

      config: {
        damping:
          170,

        stiffness:
          100,
      },
    });


  const step2 =
    spring({
      frame:
        frame - 52,

      fps,

      config: {
        damping:
          170,

        stiffness:
          100,
      },
    });


  const step3 =
    spring({
      frame:
        frame - 84,

      fps,

      config: {
        damping:
          170,

        stiffness:
          100,
      },
    });


  const particleActive =
    interpolate(
      frame,

      [
        76,
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


  /* =======================================================
     RAT MOVEMENT
     Pulled farther toward center
     ======================================================= */

  const ratX =
    interpolate(
      frame,

      [
        0,
        105,
      ],

      [
        650,
        560,
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


  const sceneProgress =
    clamp01(
      sceneIn
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
            #F9F6F0 0%,
            #F5EDE3 100%
          )
        `,
      }}
    >
      {/* ================================================= */}
      {/* PAPER TEXTURE                                     */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          opacity:
            0.15,

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
      {/* BACKGROUND GLOW                                   */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            490,

          top:
            -180,

          width:
            760,

          height:
            760,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(53,166,161,.07) 0%,
              rgba(53,166,161,.025) 45%,
              rgba(53,166,161,0) 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* LEFT CONTENT                                      */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            82,

          top:
            64,

          width:
            700,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${(1 - headerProgress) * 18}px
            )
          `,

          zIndex:
            30,
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
              "11px 17px",

            borderRadius:
              999,

            background:
              "rgba(53,166,161,.13)",

            border:
              "1px solid rgba(53,166,161,.08)",

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            fontWeight:
              850,

            letterSpacing:
              2.3,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,
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
                theme.colors.teal,
            }}
          />

          Usual transmission
        </div>


        {/* ================================================= */}
        {/* LARGE TITLE                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              690,

            fontFamily:
              TITLE_STACK,

            fontSize:
              76,

            lineHeight:
              0.94,

            fontWeight:
              850,

            letterSpacing:
              -4.1,

            color:
              "#17243A",
          }}
        >
          Rodent contamination
          <br />

          is the main route
          <br />

          into humans.
        </div>


        {/* ================================================= */}
        {/* DESCRIPTION                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              24,

            width:
              650,

            fontFamily:
              FONT_STACK,

            fontSize:
              29,

            lineHeight:
              1.36,

            fontWeight:
              570,

            letterSpacing:
              -0.5,

            color:
              "#596D82",
          }}
        >
          In enclosed spaces, virus from urine, saliva
          and droppings can contaminate surfaces and dust.
          When that material is disturbed, infectious
          particles can become airborne.
        </div>


        {/* ================================================= */}
        {/* SIMPLE PROCESS                                   */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              32,

            display:
              "grid",

            gap:
              17,
          }}
        >
          <ExposureStep
            number="1"

            title="Rodent sheds virus"

            progress={
              step1
            }

            color={
              theme.colors.teal
            }
          />

          <ExposureStep
            number="2"

            title="Contaminated material is disturbed"

            progress={
              step2
            }

            color={
              theme.colors.coral
            }
          />

          <ExposureStep
            number="3"

            title="Particles are inhaled"

            progress={
              step3
            }

            color={
              theme.colors.violet
            }
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* LARGE ENVIRONMENT                                 */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            760,

          top:
            70,

          width:
            1100,

          height:
            900,

          borderRadius:
            38,

          overflow:
            "hidden",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 24px 64px rgba(52,42,35,.11)",

          background: `
            linear-gradient(
              180deg,
              #F1E6D9 0%,
              #E8D9C7 68%,
              #D5C3AE 68%,
              #CDBAA5 100%
            )
          `,

          opacity:
            sceneProgress,

          transform: `
            translateX(
              ${(1 - sceneProgress) * 24}px
            )
          `,

          zIndex:
            10,
        }}
      >
        {/* ================================================= */}
        {/* ROOM LIGHTING                                    */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background: `
              radial-gradient(
                ellipse at 40% 18%,
                rgba(255,255,255,.42) 0%,
                rgba(255,255,255,.08) 42%,
                transparent 70%
              ),

              linear-gradient(
                90deg,
                rgba(0,0,0,.025),
                transparent 44%,
                rgba(0,0,0,.035)
              )
            `,
          }}
        />


        {/* ================================================= */}
        {/* WINDOW                                           */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              84,

            top:
              112,

            width:
              210,

            height:
              330,

            borderRadius:
              20,

            border:
              "7px solid #B28F6C",

            background: `
              linear-gradient(
                180deg,
                rgba(173,219,228,.44),
                rgba(255,255,255,.16)
              )
            `,

            boxShadow:
              "inset 0 0 40px rgba(255,255,255,.18)",
          }}
        />


        {/* ================================================= */}
        {/* SHELF                                            */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              340,

            top:
              165,

            width:
              260,

            height:
              30,

            borderRadius:
              9,

            background:
              "#B28F6C",
          }}
        />

        <div
          style={{
            position:
              "absolute",

            left:
              362,

            top:
              195,

            width:
              18,

            height:
              195,

            background:
              "#B28F6C",
          }}
        />

        <div
          style={{
            position:
              "absolute",

            left:
              545,

            top:
              195,

            width:
              18,

            height:
              195,

            background:
              "#B28F6C",
          }}
        />

        <div
          style={{
            position:
              "absolute",

            left:
              380,

            top:
              214,

            width:
              162,

            height:
              24,

            borderRadius:
              8,

            background:
              "#D9C2A4",
          }}
        />

        <div
          style={{
            position:
              "absolute",

            left:
              380,

            top:
              275,

            width:
              142,

            height:
              24,

            borderRadius:
              8,

            background:
              "#D9C2A4",
          }}
        />


        {/* ================================================= */}
        {/* STORAGE BOX                                      */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              675,

            top:
              175,

            width:
              190,

            height:
              170,

            borderRadius:
              18,

            background:
              "#C5AF91",

            boxShadow:
              "0 12px 26px rgba(81,62,44,.08)",
          }}
        />

        <div
          style={{
            position:
              "absolute",

            left:
              700,

            top:
              140,

            width:
              142,

            height:
              54,

            borderRadius:
              14,

            background:
              "#B69775",
          }}
        />


        {/* ================================================= */}
        {/* FLOOR                                            */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              0,

            right:
              0,

            bottom:
              0,

            height:
              280,

            background: `
              linear-gradient(
                180deg,
                rgba(166,142,113,.15),
                rgba(135,109,82,.20)
              )
            `,
          }}
        />


        {/* ================================================= */}
        {/* URINE                                            */}
        {/* Pulled left with the rat                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              575,

            top:
              690,

            width:
              110,

            height:
              35,

            borderRadius:
              "50%",

            background:
              "rgba(224,196,95,.55)",

            filter:
              "blur(1px)",
          }}
        />

        <Tag
          left={
            535
          }

          top={
            630
          }

          text="Urine"

          color={
            theme.colors.amber
          }
        />


        {/* ================================================= */}
        {/* DROPPINGS                                        */}
        {/* ================================================= */}

        {Array.from(
          {
            length:
              7,
          },
          (
            _,
            i
          ) => (
            <div
              key={
                i
              }

              style={{
                position:
                  "absolute",

                left:
                  700 +
                  i *
                    20,

                top:
                  727 +
                  (
                    i %
                    2
                  ) *
                    10,

                width:
                  16,

                height:
                  11,

                borderRadius:
                  "50%",

                background:
                  "#71533F",

                transform:
                  `rotate(${i * 17}deg)`,
              }}
            />
          )
        )}

        <Tag
          left={
            695
          }

          top={
            656
          }

          text="Droppings"

          color={
            theme.colors.coral
          }
        />


        {/* ================================================= */}
        {/* SALIVA                                           */}
        {/* ================================================= */}

        {Array.from(
          {
            length:
              5,
          },
          (
            _,
            i
          ) => (
            <span
              key={
                i
              }

              style={{
                position:
                  "absolute",

                left:
                  575 +
                  i *
                    17,

                top:
                  580 -
                  (
                    i %
                    2
                  ) *
                    12,

                width:
                  14,

                height:
                  14,

                borderRadius:
                  "50%",

                background:
                  "rgba(90,160,180,.52)",

                filter:
                  "blur(.5px)",
              }}
            />
          )
        )}

        <Tag
          left={
            515
          }

          top={
            520
          }

          text="Saliva"

          color={
            theme.colors.sky
          }
        />


        {/* ================================================= */}
        {/* RAT                                              */}
        {/* More centered                                    */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              ratX,

            top:
              520,

            width:
              300,

            height:
              225,

            opacity:
              ratReveal,

            transform: `
              translateY(
                ${(1 - ratReveal) * 20}px
              )

              scale(
                ${0.9 + ratReveal * 0.1}
              )
            `,

            zIndex:
              12,
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .transmission
                .cartoonRatCutout
            }

            width={
              300
            }

            height={
              225
            }

            zoom={
              1
            }

            showCredit={
              false
            }
          />
        </div>


        {/* ================================================= */}
        {/* PERSON                                           */}
        {/* Pulled inward from far right                     */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              105,

            bottom:
              32,

            opacity:
              personReveal,

            transform: `
              translateX(
                ${(1 - personReveal) * 70}px
              )

              scale(
                ${0.9 + personReveal * 0.1}
              )
            `,

            transformOrigin:
              "bottom right",

            zIndex:
              13,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerA
            }

            width={
              410
            }

            flip
          />
        </div>


        {/* ================================================= */}
        {/* CLEANING / DISTURBANCE MARK                      */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              285,

            bottom:
              175,

            width:
              145,

            height:
              29,

            borderRadius:
              14,

            background:
              "rgba(170,140,110,.34)",

            opacity:
              personReveal,

            transform: `
              rotate(-14deg)

              scale(
                ${personReveal}
              )
            `,

            transformOrigin:
              "left center",

            zIndex:
              12,
          }}
        />


        {/* ================================================= */}
        {/* AIRBORNE PARTICLES                               */}
        {/* ================================================= */}

        <RisingParticles
          active={
            particleActive
          }

          fromX={
            650
          }

          fromY={
            700
          }

          toX={
            900
          }

          toY={
            350
          }
        />


        {/* ================================================= */}
        {/* AIRBORNE LABEL                                   */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              140,

            top:
              360,

            padding:
              "13px 18px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.92)",

            border:
              "1px solid rgba(156,114,212,.24)",

            boxShadow:
              "0 10px 28px rgba(52,42,35,.09)",

            opacity:
              particleActive,

            transform: `
              translateY(
                ${(1 - particleActive) * 14}px
              )
            `,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            fontWeight:
              800,

            color:
              theme.colors.ink,

            zIndex:
              20,
          }}
        >
          Airborne particles
        </div>


        {/* ================================================= */}
        {/* SOFT EDGE VIGNETTE                               */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            boxShadow:
              "inset 0 0 90px rgba(69,48,31,.08)",

            pointerEvents:
              "none",

            zIndex:
              30,
          }}
        />
      </div>
    </div>
  );
};