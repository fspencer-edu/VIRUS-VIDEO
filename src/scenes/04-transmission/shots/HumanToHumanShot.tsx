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
   PANEL TITLE
   ========================================================= */

const PanelTitle = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => (
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
        "rgba(255,255,255,.94)",

      border:
        `1px solid ${color}55`,

      boxShadow:
        "0 10px 26px rgba(52,42,35,.08)",

      backdropFilter:
        "blur(10px)",

      fontFamily:
        FONT_STACK,

      fontSize:
        18,

      lineHeight:
        1,

      fontWeight:
        850,

      letterSpacing:
        1.8,

      textTransform:
        "uppercase",

      color,
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
   PARTICLE BRIDGE
   ========================================================= */

const ParticleBridge = ({
  fromX,
  fromY,
  toX,
  toY,
  active = 1,
  count = 18,
  spread = 10,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  active?: number;
  count?: number;
  spread?: number;
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
                    1.1 +
                    (
                      i %
                      4
                    ) *
                      0.16
                  ) +
                i *
                  14
              ) %
              140
            ) /
            140;


          const x =
            fromX +
            (
              toX -
              fromX
            ) *
              t +
            Math.sin(
              frame /
                9 +
                i
            ) *
              spread;


          const y =
            fromY +
            (
              toY -
              fromY
            ) *
              t +
            Math.cos(
              frame /
                8 +
                i *
                  0.4
            ) *
              spread;


          const size =
            8 +
            (
              i %
              3
            ) *
              3;


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
                    2 ===
                  0
                    ? theme.colors.coral
                    : theme.colors.violet,

                opacity:
                  (
                    0.20 +
                    (
                      i %
                      4
                    ) *
                      0.1
                  ) *
                  active,

                filter:
                  `blur(${(i % 2) * 0.6}px)`,

                boxShadow:
                  i %
                    5 ===
                  0
                    ? "0 0 18px rgba(156,114,212,.24)"
                    : undefined,

                zIndex:
                  16,
              }}
            />
          );
        }
      )}
    </>
  );
};


/* =========================================================
   INFO LABEL
   ========================================================= */

const InfoLabel = ({
  text,
  color,
  progress,
}: {
  text: string;
  color: string;
  progress: number;
}) => {
  const p =
    clamp01(
      progress
    );


  return (
    <div
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        gap:
          9,

        padding:
          "10px 14px",

        borderRadius:
          999,

        background:
          "rgba(255,255,255,.94)",

        border:
          `1px solid ${color}44`,

        boxShadow:
          "0 8px 22px rgba(52,42,35,.08)",

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 10}px
          )
        `,

        fontFamily:
          FONT_STACK,

        fontSize:
          17,

        fontWeight:
          780,

        color:
          theme.colors.ink,
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
            color,
        }}
      />

      {text}
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const HumanToHumanShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     HEADER
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


  /* =======================================================
     PANELS
     ======================================================= */

  const leftIn =
    spring({
      frame:
        frame -
        8,

      fps,

      config: {
        damping:
          175,

        stiffness:
          90,
      },
    });


  const rightIn =
    spring({
      frame:
        frame -
        48,

      fps,

      config: {
        damping:
          175,

        stiffness:
          90,
      },
    });


  /* =======================================================
     DETAIL REVEALS
     ======================================================= */

  const leftDetail =
    interpolate(
      frame,
      [
        28,
        62,
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


  const rightDetail =
    interpolate(
      frame,
      [
        70,
        106,
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


  const rightParticles =
    interpolate(
      frame,
      [
        84,
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


  const headerProgress =
    clamp01(
      headerIn
    );


  const leftProgress =
    clamp01(
      leftIn
    );


  const rightProgress =
    clamp01(
      rightIn
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
      {/* PAPER TEXTURE                                    */}
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
      {/* BACKGROUND GLOW                                  */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            -420,

          width:
            1200,

          height:
            1200,

          transform:
            "translateX(-50%)",

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(53,166,161,.075) 0%,
              rgba(53,166,161,.02) 46%,
              transparent 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* HEADER                                           */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            82,

          top:
            54,

          right:
            82,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${(1 - headerProgress) * 16}px
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
              "10px 16px",

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

          How it spreads
        </div>


        {/* ================================================= */}
        {/* TITLE                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              18,

            width:
              1690,

            fontFamily:
              TITLE_STACK,

            fontSize:
              70,

            lineHeight:
              0.94,

            fontWeight:
              850,

            letterSpacing:
              -3.7,

            color:
              "#17243A",
          }}
        >
          Most infections come from rodents.
          <br />

          Andes virus can rarely spread between people.
        </div>


        {/* DESCRIPTION */}

        <div
          style={{
            marginTop:
              18,

            width:
              1240,

            fontFamily:
              FONT_STACK,

            fontSize:
              27,

            lineHeight:
              1.36,

            fontWeight:
              560,

            letterSpacing:
              -0.45,

            color:
              "#596D82",
          }}
        >
          Person-to-person transmission has been documented,
          but it is uncommon and is associated mainly with
          close, prolonged contact.
        </div>
      </div>


      {/* ================================================= */}
      {/* LEFT PANEL                                       */}
      {/* RODENT → HUMAN                                   */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            72,

          top:
            342,

          width:
            850,

          height:
            642,

          borderRadius:
            36,

          overflow:
            "hidden",

          background: `
            linear-gradient(
              180deg,
              #F3E7D8 0%,
              #EFE1D0 70%,
              #D9C7B4 70%,
              #CEB9A3 100%
            )
          `,

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 24px 64px rgba(52,42,35,.11)",

          opacity:
            leftProgress,

          transform: `
            translateY(
              ${(1 - leftProgress) * 20}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* TITLE */}

        <div
          style={{
            position:
              "absolute",

            left:
              28,

            top:
              26,

            zIndex:
              30,
          }}
        >
          <PanelTitle
            text="Usual route · rodent → human"
            color={
              theme.colors.tealDark
            }
          />
        </div>


        {/* SMALL EXPLANATION */}

        <div
          style={{
            position:
              "absolute",

            left:
              42,

            top:
              94,

            width:
              720,

            fontFamily:
              FONT_STACK,

            fontSize:
              22,

            lineHeight:
              1.34,

            fontWeight:
              560,

            color:
              theme.colors.muted,
          }}
        >
          Exposure usually begins when contaminated rodent
          material releases virus-containing particles.
        </div>


        {/* RAT */}

        <div
          style={{
            position:
              "absolute",

            left:
              36,

            top:
              228,

            width:
              330,

            height:
              245,

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
              330
            }

            height={
              245
            }

            zoom={
              1
            }

            showCredit={
              false
            }
          />
        </div>


        {/* HUMAN */}

        <div
          style={{
            position:
              "absolute",

            right:
              26,

            top:
              182,

            zIndex:
              13,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerB
            }

            width={
              365
            }

            flip

            sick={
              0.3
            }
          />
        </div>


        {/* PARTICLES */}

        <ParticleBridge
          fromX={
            300
          }

          fromY={
            392
          }

          toX={
            565
          }

          toY={
            318
          }

          count={
            34
          }

          active={
            leftDetail
          }

          spread={
            17
          }
        />


        {/* PARTICLE LABEL */}

        <div
          style={{
            position:
              "absolute",

            left:
              340,

            top:
              225,

            zIndex:
              25,
          }}
        >
          <InfoLabel
            text="Aerosolized particles"
            color={
              theme.colors.teal
            }
            progress={
              leftDetail
            }
          />
        </div>


        {/* DIRECTION ARROW */}

        <div
          style={{
            position:
              "absolute",

            left:
              385,

            top:
              335,

            opacity:
              leftDetail,

            fontFamily:
              FONT_STACK,

            fontSize:
              60,

            lineHeight:
              1,

            fontWeight:
              500,

            color:
              "rgba(53,166,161,.44)",
          }}
        >
          →
        </div>


        {/* BOTTOM EXPLANATION */}

        <div
          style={{
            position:
              "absolute",

            left:
              42,

            right:
              42,

            bottom:
              32,

            paddingTop:
              20,

            borderTop:
              `1px solid ${theme.colors.line}`,

            fontFamily:
              FONT_STACK,

            fontSize:
              24,

            lineHeight:
              1.36,

            fontWeight:
              570,

            letterSpacing:
              -0.3,

            color:
              theme.colors.muted,
          }}
        >
          People can inhale particles from contaminated
          urine, droppings or saliva.
        </div>
      </div>


      {/* ================================================= */}
      {/* RIGHT PANEL                                      */}
      {/* PERSON → PERSON                                  */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            72,

          top:
            342,

          width:
            850,

          height:
            642,

          borderRadius:
            36,

          overflow:
            "hidden",

          background: `
            linear-gradient(
              180deg,
              #F4E8DC 0%,
              #F0E0D3 70%,
              #DDCABB 70%,
              #D3BEAD 100%
            )
          `,

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 24px 64px rgba(52,42,35,.11)",

          opacity:
            rightProgress,

          transform: `
            translateY(
              ${(1 - rightProgress) * 20}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* TITLE */}

        <div
          style={{
            position:
              "absolute",

            left:
              28,

            top:
              26,

            zIndex:
              30,
          }}
        >
          <PanelTitle
            text="Rare route · person → person"
            color={
              theme.colors.coralDark
            }
          />
        </div>


        {/* EXPLANATION */}

        <div
          style={{
            position:
              "absolute",

            left:
              42,

            top:
              94,

            width:
              745,

            fontFamily:
              FONT_STACK,

            fontSize:
              22,

            lineHeight:
              1.34,

            fontWeight:
              560,

            color:
              theme.colors.muted,

            opacity:
              rightDetail,
          }}
        >
          Limited transmission can occur during close,
          prolonged contact, particularly in shared
          enclosed spaces.
        </div>


        {/* SICK PERSON */}

        <div
          style={{
            position:
              "absolute",

            left:
              52,

            top:
              200,

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
              355
            }

            sick={
              0.82
            }

            cough={
              0.5
            }
          />
        </div>


        {/* OTHER PERSON */}

        <div
          style={{
            position:
              "absolute",

            right:
              46,

            top:
              200,

            zIndex:
              13,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerWave
            }

            width={
              355
            }

            flip
          />
        </div>


        {/* PERSON-TO-PERSON PARTICLES */}

        <ParticleBridge
          fromX={
            340
          }

          fromY={
            350
          }

          toX={
            530
          }

          toY={
            350
          }

          count={
            26
          }

          active={
            rightParticles
          }

          spread={
            10
          }
        />


        {/* CLOSE CONTACT */}

        <div
          style={{
            position:
              "absolute",

            left:
              "50%",

            top:
              218,

            transform:
              "translateX(-50%)",

            zIndex:
              25,
          }}
        >
          <InfoLabel
            text="Close + prolonged contact"
            color={
              theme.colors.coral
            }
            progress={
              rightDetail
            }
          />
        </div>


        {/* DIRECTION */}

        <div
          style={{
            position:
              "absolute",

            left:
              "50%",

            top:
              375,

            transform:
              "translateX(-50%)",

            opacity:
              rightParticles,

            fontFamily:
              FONT_STACK,

            fontSize:
              52,

            fontWeight:
              500,

            color:
              "rgba(233,111,106,.45)",

            zIndex:
              20,
          }}
        >
          →
        </div>


        {/* BOTTOM EXPLANATION */}

        <div
          style={{
            position:
              "absolute",

            left:
              42,

            right:
              42,

            bottom:
              32,

            paddingTop:
              20,

            borderTop:
              `1px solid ${theme.colors.line}`,

            fontFamily:
              FONT_STACK,

            fontSize:
              24,

            lineHeight:
              1.36,

            fontWeight:
              570,

            letterSpacing:
              -0.3,

            color:
              theme.colors.muted,
          }}
        >
          This documented but limited human-to-human spread
          is unusual among hantaviruses in the Americas.
        </div>
      </div>


      {/* ================================================= */}
      {/* CENTER DIVIDER                                   */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            395,

          bottom:
            112,

          width:
            2,

          transform:
            "translateX(-50%)",

          background: `
            linear-gradient(
              180deg,
              transparent,
              rgba(67,92,118,.13) 18%,
              rgba(67,92,118,.13) 82%,
              transparent
            )
          `,

          opacity:
            Math.min(
              leftProgress,
              rightProgress
            ),

          zIndex:
            20,
        }}
      />
    </div>
  );
};