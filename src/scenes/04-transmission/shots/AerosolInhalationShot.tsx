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
   FLOATING TRANSMISSION PARTICLES
   ========================================================= */

const FloatingDots = ({
  count = 28,
  active = 1,
  fromX = 440,
  fromY = 390,
  toX = 675,
  toY = 395,
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
                    1 +
                    (
                      i %
                      4
                    ) *
                      0.13
                  ) +
                i *
                  17
              ) %
              150
            ) /
            150;


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
              (
                8 +
                (
                  i %
                  3
                ) *
                  3
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
                8 +
                i *
                  0.5
            ) *
              (
                10 +
                (
                  i %
                  3
                ) *
                  3
              );


          const size =
            7 +
            (
              i %
              3
            ) *
              3;


          const fade =
            interpolate(
              t,
              [
                0,
                0.08,
                0.9,
                1,
              ],
              [
                0,
                1,
                1,
                0,
              ]
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
                    2 ===
                  0
                    ? theme.colors.coral
                    : theme.colors.violet,

                opacity:
                  (
                    0.22 +
                    (
                      i %
                      4
                    ) *
                      0.08
                  ) *
                  active *
                  fade,

                filter:
                  `blur(${(i % 3) * 0.45}px)`,

                boxShadow:
                  i %
                    6 ===
                  0
                    ? "0 0 16px rgba(156,114,212,.22)"
                    : undefined,

                zIndex:
                  20,
              }}
            />
          );
        }
      )}
    </>
  );
};


/* =========================================================
   INFO CHIP
   ========================================================= */

const InfoChip = ({
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
          10,

        padding:
          "11px 16px",

        borderRadius:
          999,

        background:
          "rgba(255,255,255,.94)",

        border:
          `1px solid ${color}38`,

        boxShadow:
          "0 9px 24px rgba(52,42,35,.08)",

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
          800,

        color:
          theme.colors.ink,
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
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const AerosolInhalationShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     ENTRANCES
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


  const panelIn =
    spring({
      frame:
        frame -
        8,

      fps,

      config: {
        damping:
          180,

        stiffness:
          82,
      },
    });


  const peopleIn =
    spring({
      frame:
        frame -
        24,

      fps,

      config: {
        damping:
          175,

        stiffness:
          92,
      },
    });


  /* =======================================================
     ROOM → CRUISE CABIN TRANSITION
     ======================================================= */

  const morph =
    interpolate(
      frame,
      [
        20,
        105,
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
     TRANSMISSION REVEAL
     ======================================================= */

  const contactReveal =
    interpolate(
      frame,
      [
        72,
        112,
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


  const particleReveal =
    interpolate(
      frame,
      [
        92,
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


  const takeawayReveal =
    interpolate(
      frame,
      [
        126,
        174,
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


  const panelProgress =
    clamp01(
      panelIn
    );


  const peopleProgress =
    clamp01(
      peopleIn
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
            #F6EFE7 100%
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
            0.14,

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
      {/* SOFT BACKGROUND ACCENT                           */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            -180,

          top:
            -180,

          width:
            1050,

          height:
            1050,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(101,167,232,.08) 0%,
              rgba(101,167,232,.02) 46%,
              transparent 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* LEFT CONTENT                                     */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            82,

          top:
            62,

          width:
            650,

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
              "11px 17px",

            borderRadius:
              999,

            background:
              "rgba(233,111,106,.11)",

            border:
              "1px solid rgba(233,111,106,.08)",

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            fontWeight:
              900,

            letterSpacing:
              2.2,

            textTransform:
              "uppercase",

            color:
              theme.colors.coralDark,
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

          Shipboard transmission
        </div>


        {/* ================================================= */}
        {/* TITLE                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              640,

            fontFamily:
              FONT_STACK,

            fontSize:
              76,

            lineHeight:
              0.93,

            fontWeight:
              900,

            letterSpacing:
              -4.4,

            color:
              theme.colors.ink,
          }}
        >
          Shared indoor
          <br />

          spaces became
          <br />

          part of the story.
        </div>


        {/* ================================================= */}
        {/* DESCRIPTION                                      */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              24,

            width:
              620,

            fontFamily:
              FONT_STACK,

            fontSize:
              28,

            lineHeight:
              1.36,

            fontWeight:
              650,

            letterSpacing:
              -0.55,

            color:
              theme.colors.muted,
          }}
        >
          During the cruise outbreak, close living quarters,
          prolonged exposure and frequent interaction created
          opportunities for limited person-to-person spread.
        </div>


        {/* ================================================= */}
        {/* CONTEXT NOTE                                     */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              34,

            display:
              "flex",

            alignItems:
              "flex-start",

            gap:
              14,

            width:
              590,

            padding:
              "17px 19px",

            boxSizing:
              "border-box",

            borderRadius:
              20,

            background:
              "rgba(255,255,255,.78)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 10px 28px rgba(52,42,35,.05)",

            opacity:
              contactReveal,
          }}
        >
          <div
            style={{
              width:
                12,

              height:
                12,

              marginTop:
                6,

              flex:
                "0 0 auto",

              borderRadius:
                "50%",

              background:
                theme.colors.teal,
            }}
          />


          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              lineHeight:
                1.36,

              fontWeight:
                650,

              color:
                theme.colors.ink,
            }}
          >
            Human-to-human transmission is documented,
            but it is still considered limited.
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* CABIN PANEL                                      */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            62,

          top:
            62,

          width:
            1110,

          height:
            914,

          overflow:
            "hidden",

          borderRadius:
            38,

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 26px 70px rgba(56,43,33,.11)",

          opacity:
            panelProgress,

          transform: `
            translateX(
              ${(1 - panelProgress) * 28}px
            )
          `,

          background:
            "#E8EDF3",

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* ROOM → CABIN BACKGROUND                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background: `
              linear-gradient(
                180deg,

                rgba(
                  241,
                  230,
                  217,
                  ${1 - morph}
                )
                0%,

                rgba(
                  241,
                  230,
                  217,
                  ${1 - morph}
                )
                68%,

                rgba(
                  216,
                  204,
                  190,
                  ${1 - morph}
                )
                68%,

                rgba(
                  216,
                  204,
                  190,
                  ${1 - morph}
                )
                100%
              ),

              linear-gradient(
                180deg,

                rgba(
                  232,
                  239,
                  247,
                  ${morph}
                )
                0%,

                rgba(
                  220,
                  231,
                  241,
                  ${morph}
                )
                68%,

                rgba(
                  194,
                  207,
                  219,
                  ${morph}
                )
                68%,

                rgba(
                  185,
                  199,
                  212,
                  ${morph}
                )
                100%
              )
            `,
          }}
        />


        {/* ================================================= */}
        {/* TOP CABIN LABEL                                 */}
        {/* ================================================= */}

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
              9,

            padding:
              "10px 15px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.92)",

            border:
              "1px solid rgba(53,166,161,.14)",

            boxShadow:
              "0 8px 22px rgba(44,36,30,.06)",

            fontFamily:
              FONT_STACK,

            fontSize:
              16,

            fontWeight:
              850,

            letterSpacing:
              1.7,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,

            zIndex:
              40,
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

          Shared cruise-ship cabin
        </div>


        {/* ================================================= */}
        {/* WINDOW / PORTHOLE                               */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              58,

            top:
              65,

            width:
              220,

            height:
              220,

            borderRadius:
              "50%",

            background: `
              radial-gradient(
                circle at 46% 40%,
                #D9EFF8 0%,
                #B8D9E9 54%,
                #8DB7CB 100%
              )
            `,

            border:
              `12px solid rgba(60,83,107,${0.18 + morph * 0.58})`,

            boxShadow:
              "inset 0 0 34px rgba(255,255,255,.35), 0 15px 34px rgba(38,48,65,.12)",

            opacity:
              0.2 +
              morph *
                0.8,
          }}
        >
          {/* horizon */}

          <div
            style={{
              position:
                "absolute",

              left:
                0,

              right:
                0,

              top:
                "56%",

              height:
                3,

              background:
                "rgba(255,255,255,.55)",
            }}
          />
        </div>


        {/* ================================================= */}
        {/* CABIN WALL DETAILS                              */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              72,

            top:
              145,

            width:
              150,

            height:
              230,

            borderRadius:
              17,

            border:
              `5px solid rgba(90,112,132,${morph * 0.34})`,

            opacity:
              morph,
          }}
        />


        <div
          style={{
            position:
              "absolute",

            left:
              70,

            right:
              70,

            top:
              470,

            height:
              2,

            background:
              `rgba(67,92,118,${morph * 0.12})`,
          }}
        />


        {/* ================================================= */}
        {/* CLOSE CONTACT CHIP                              */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              "50%",

            top:
              185,

            transform:
              "translateX(-50%)",

            zIndex:
              45,
          }}
        >
          <InfoChip
            text="Close + prolonged contact"

            color={
              theme.colors.coral
            }

            progress={
              contactReveal
            }
          />
        </div>


        {/* ================================================= */}
        {/* INFECTED PASSENGER                              */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              175,

            top:
              275,

            opacity:
              peopleProgress,

            transform: `
              translateY(
                ${(1 - peopleProgress) * 22}px
              )

              scale(
                ${0.94 + peopleProgress * 0.06}
              )
            `,

            transformOrigin:
              "bottom center",

            zIndex:
              25,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerA
            }

            width={
              390
            }

            sick={
              0.82
            }

            cough={
              0.62
            }

            rotate={
              1
            }
          />
        </div>


        {/* ================================================= */}
        {/* SECOND PASSENGER                                */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              125,

            top:
              275,

            opacity:
              peopleProgress,

            transform: `
              translateY(
                ${(1 - peopleProgress) * 22}px
              )

              scale(
                ${0.94 + peopleProgress * 0.06}
              )
            `,

            transformOrigin:
              "bottom center",

            zIndex:
              25,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerWave
            }

            width={
              390
            }

            flip
          />
        </div>


        {/* ================================================= */}
        {/* TRANSMISSION PARTICLES                          */}
        {/* ================================================= */}

        <FloatingDots
          count={
            30
          }

          active={
            particleReveal
          }

          fromX={
            445
          }

          fromY={
            405
          }

          toX={
            680
          }

          toY={
            405
          }
        />


        {/* ================================================= */}
        {/* DIRECTION ARROW                                 */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              "50%",

            top:
              430,

            transform:
              "translateX(-50%)",

            fontFamily:
              FONT_STACK,

            fontSize:
              56,

            fontWeight:
              500,

            color:
              "rgba(233,111,106,.44)",

            opacity:
              particleReveal,

            zIndex:
              22,
          }}
        >
          →
        </div>


        {/* ================================================= */}
        {/* CABIN CONDITIONS                                */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              44,

            right:
              44,

            top:
              595,

            display:
              "grid",

            gridTemplateColumns:
              "repeat(3, 1fr)",

            gap:
              12,

            opacity:
              contactReveal,

            zIndex:
              30,
          }}
        >
          <InfoChip
            text="Shared indoor space"

            color={
              theme.colors.teal
            }

            progress={
              contactReveal
            }
          />


          <InfoChip
            text="Prolonged exposure"

            color={
              theme.colors.violet
            }

            progress={
              contactReveal
            }
          />


          <InfoChip
            text="Frequent interaction"

            color={
              theme.colors.amber
            }

            progress={
              contactReveal
            }
          />
        </div>


        {/* ================================================= */}
        {/* BOTTOM TAKEAWAY                                 */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              36,

            right:
              36,

            bottom:
              30,

            padding:
              "22px 25px",

            borderRadius:
              24,

            background:
              "rgba(255,255,255,.91)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 12px 30px rgba(52,42,35,.07)",

            opacity:
              takeawayReveal,

            transform: `
              translateY(
                ${(1 - takeawayReveal) * 14}px
              )
            `,

            zIndex:
              40,
          }}
        >
          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                15,

              fontWeight:
                900,

              letterSpacing:
                1.8,

              textTransform:
                "uppercase",

              color:
                theme.colors.coralDark,
            }}
          >
            Why the ship environment mattered
          </div>


          <div
            style={{
              marginTop:
                7,

              maxWidth:
                980,

              fontFamily:
                FONT_STACK,

              fontSize:
                26,

              lineHeight:
                1.25,

              fontWeight:
                800,

              letterSpacing:
                -0.55,

              color:
                theme.colors.ink,
            }}
          >
            Andes virus can spread between people,
            but transmission is associated mainly with
            close and prolonged contact.
          </div>
        </div>
      </div>
    </div>
  );
};