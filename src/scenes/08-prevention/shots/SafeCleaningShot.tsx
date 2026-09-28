import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  AerosolField,
} from "../../../components/graphics/AerosolField";

import {
  theme,
} from "../../../theme/theme";


/* =========================================================
   TYPOGRAPHY
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';


/* =========================================================
   IMAGE PATHS
   ========================================================= */

const DISINFECTANT_IMAGE =
  "assets/transmission/disinfectant-spray-icon-cartoon-style-vector.png";

const BROOM_IMAGE =
  "assets/transmission/broom.png";


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
   MAIN SHOT
   ========================================================= */

export const SafeCleaningShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     HEADER
     ======================================================= */

  const eyebrowIn =
    spring({
      frame,

      fps,

      config: {
        damping: 180,
        stiffness: 92,
      },
    });


  const titleIn =
    spring({
      frame:
        frame - 5,

      fps,

      config: {
        damping: 180,
        stiffness: 88,
      },
    });


  const bodyIn =
    spring({
      frame:
        frame - 12,

      fps,

      config: {
        damping: 185,
        stiffness: 84,
      },
    });


  /* =======================================================
     PANEL
     ======================================================= */

  const panelIn =
    spring({
      frame:
        frame - 10,

      fps,

      config: {
        damping: 180,
        stiffness: 78,
      },
    });


  const panelX =
    interpolate(
      panelIn,
      [
        0,
        1,
      ],
      [
        52,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     CLEANING SEQUENCE
     ======================================================= */

  const spray =
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


  const wetSurface =
    interpolate(
      frame,
      [
        48,
        86,
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


  const wipe =
    interpolate(
      frame,
      [
        78,
        138,
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


  const forbid =
    spring({
      frame:
        frame - 94,

      fps,

      config: {
        damping: 165,
        stiffness: 100,
      },
    });


  const forbidP =
    clamp01(
      forbid
    );


  /* =======================================================
     SUCCESS
     ======================================================= */

  const cleanIn =
    spring({
      frame:
        frame - 128,

      fps,

      config: {
        damping: 165,
        stiffness: 105,
      },
    });


  const cleanP =
    clamp01(
      cleanIn
    );


  /* =======================================================
     IMAGE ENTRANCES
     ======================================================= */

  const bottleIn =
    spring({
      frame:
        frame - 18,

      fps,

      config: {
        damping: 170,
        stiffness: 92,
      },
    });


  const broomIn =
    spring({
      frame:
        frame - 88,

      fps,

      config: {
        damping: 170,
        stiffness: 96,
      },
    });


  /* =======================================================
     WIPE MOTION
     ======================================================= */

  const wipeX =
    interpolate(
      wipe,
      [
        0,
        1,
      ],
      [
        0,
        190,
      ]
    );


  const wipeRotation =
    interpolate(
      wipe,
      [
        0,
        0.5,
        1,
      ],
      [
        -2,
        2,
        -1,
      ]
    );


  /* =======================================================
     DROPPINGS
     ======================================================= */

  const droppingsOpacity =
    interpolate(
      wipe,
      [
        0,
        0.6,
        1,
      ],
      [
        1,
        0.45,
        0.04,
      ]
    );


  /* =======================================================
     SPRAY BOTTLE MOTION
     ======================================================= */

  const bottleRotation =
    interpolate(
      spray,
      [
        0,
        0.35,
        0.65,
        1,
      ],
      [
        0,
        -8,
        -8,
        0,
      ]
    );


  const bottleScale =
    0.94 +
    bottleIn *
      0.06;


  /* =======================================================
     BROOM MOTION
     ======================================================= */

  const warningPulse =
    1 +
    Math.sin(
      frame /
        10
    ) *
      0.025;


  const broomRotation =
    -12 +
    Math.sin(
      frame /
        18
    ) *
      2;


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
            #FAF6EF 0%,
            #FFF9F2 100%
          )
        `,
      }}
    >

      {/* ================================================= */}
      {/* BACKGROUND TEXTURE                                */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          opacity:
            0.12,

          backgroundImage: `
            radial-gradient(
              circle,
              rgba(35,66,82,.13) .7px,
              transparent .75px
            )
          `,

          backgroundSize:
            "8px 8px",

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
            84,

          top:
            96,

          width:
            680,

          zIndex:
            20,
        }}
      >

        {/* EYEBROW */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              15,

            opacity:
              eyebrowIn,

            transform: `
              translateX(
                ${(1 - eyebrowIn) * -18}px
              )
            `,
          }}
        >
          <div
            style={{
              width:
                44 *
                eyebrowIn,

              height:
                5,

              borderRadius:
                999,

              background:
                theme.colors.teal,
            }}
          />

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                22,

              lineHeight:
                1,

              fontWeight:
                900,

              letterSpacing:
                2.9,

              textTransform:
                "uppercase",

              color:
                theme.colors.teal,
            }}
          >
            Safe cleaning
          </div>
        </div>


        {/* TITLE */}

        <div
          style={{
            marginTop:
              30,

            width:
              650,

            fontFamily:
              FONT_STACK,

            fontSize:
              88,

            lineHeight:
              0.93,

            fontWeight:
              900,

            letterSpacing:
              -4.8,

            color:
              theme.colors.ink,

            opacity:
              titleIn,

            transform: `
              translateY(
                ${(1 - titleIn) * 28}px
              )
            `,
          }}
        >
          Wet and
          <br />

          disinfect
          <br />

          droppings
          <br />

          instead of
          <br />

          sweeping.
        </div>


        {/* ACCENT */}

        <div
          style={{
            marginTop:
              30,

            width:
              94 *
              titleIn,

            height:
              7,

            borderRadius:
              999,

            background:
              theme.colors.coral,
          }}
        />


        {/* DESCRIPTION */}

        <div
          style={{
            marginTop:
              28,

            width:
              620,

            fontFamily:
              FONT_STACK,

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

            opacity:
              bodyIn,

            transform: `
              translateY(
                ${(1 - bodyIn) * 22}px
              )
            `,
          }}
        >
          Moistening contaminated material helps keep
          infectious particles from becoming airborne.
        </div>


        {/* SUPPORTING POINT */}

        <div
          style={{
            marginTop:
              36,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              16,

            opacity:
              bodyIn,
          }}
        >
          <div
            style={{
              width:
                14,

              height:
                14,

              borderRadius:
                "50%",

              background:
                theme.colors.coral,
            }}
          />

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                23,

              lineHeight:
                1.3,

              fontWeight:
                800,

              color:
                theme.colors.ink,
            }}
          >
            Spray first, then wipe the surface clean.
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* ILLUSTRATION PANEL                                */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            70,

          top:
            158,

          width:
            1010,

          height:
            730,

          borderRadius:
            38,

          background:
            "rgba(255,255,255,.93)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 22px 58px rgba(52,42,35,.10)",

          overflow:
            "hidden",

          opacity:
            panelIn,

          transform: `
            translateX(
              ${panelX}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* PANEL LABEL */}

        <div
          style={{
            position:
              "absolute",

            left:
              30,

            top:
              28,

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
              "rgba(244,251,250,.96)",

            fontFamily:
              FONT_STACK,

            fontSize:
              17,

            fontWeight:
              900,

            letterSpacing:
              1.9,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,

            zIndex:
              30,
          }}
        >
          Wet cleaning method
        </div>


        {/* ================================================= */}
        {/* BACKGROUND                                       */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background:
              "#FBF9F5",
          }}
        />


        <div
          style={{
            position:
              "absolute",

            left:
              225,

            top:
              60,

            width:
              540,

            height:
              540,

            borderRadius:
              "50%",

            background:
              "rgba(14,141,151,.035)",
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
              156,

            background:
              "#DCCEBE",

            borderTop:
              "3px solid #C7B8A7",
          }}
        />


        {/* ================================================= */}
        {/* CONTAMINATED SURFACE                             */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              220,

            top:
              500,

            width:
              510,

            height:
              92,

            borderRadius:
              18,

            background:
              "#C7B9A8",
          }}
        />


        {/* ================================================= */}
        {/* WET AREA                                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              470,

            top:
              530,

            width:
              120 +
              wetSurface *
                300,

            height:
              28 +
              wetSurface *
                36,

            borderRadius:
              "50%",

            background:
              "rgba(111,175,229,.22)",

            opacity:
              wetSurface,

            transform:
              "translate(-50%, -50%)",
          }}
        />


        {/* ================================================= */}
        {/* DROPPINGS                                        */}
        {/* ================================================= */}

        {Array.from(
          {
            length:
              9,
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
                  308 +
                  i *
                    38,

                top:
                  533 +
                  (
                    i %
                    2
                  ) *
                    8,

                width:
                  24,

                height:
                  14,

                borderRadius:
                  "50%",

                background:
                  "#6D4F3D",

                opacity:
                  droppingsOpacity,

                transform:
                  `rotate(${i * 11}deg)`,
              }}
            />
          )
        )}


        {/* ================================================= */}
        {/* REAL DISINFECTANT IMAGE                          */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              70,

            top:
              195,

            width:
              270,

            height:
              330,

            opacity:
              bottleIn,

            transform: `
              translateY(
                ${(1 - bottleIn) * 25}px
              )

              rotate(
                ${bottleRotation}deg
              )

              scale(
                ${bottleScale}
              )
            `,

            transformOrigin:
              "52% 68%",

            zIndex:
              18,
          }}
        >
          <Img
            src={
              staticFile(
                DISINFECTANT_IMAGE
              )
            }

            style={{
              width:
                "100%",

              height:
                "100%",

              objectFit:
                "contain",

              display:
                "block",

              mixBlendMode:
                "multiply",

              filter:
                "drop-shadow(0 18px 26px rgba(48,69,79,.12))",
            }}
          />
        </div>


        {/* ================================================= */}
        {/* SPRAY STREAM                                     */}
        {/* ================================================= */}

        <svg
          viewBox="0 0 1010 730"

          width="1010"

          height="730"

          style={{
            position:
              "absolute",

            inset:
              0,

            pointerEvents:
              "none",

            zIndex:
              20,
          }}
        >
          <path
            d={`
              M 275 286

              C
              345 ${290 - spray * 12},
              400 ${340 - spray * 8},
              478 ${420 - spray * 12}
            `}

            fill="none"

            stroke="#6FAFE5"

            strokeWidth="10"

            strokeLinecap="round"

            opacity={
              spray
            }
          />


          {Array.from(
            {
              length:
                11,
            },
            (
              _,
              i
            ) => (
              <circle
                key={
                  i
                }

                cx={
                  320 +
                  i *
                    18
                }

                cy={
                  304 +
                  i *
                    14 +
                  (
                    i %
                    2
                  ) *
                    10
                }

                r={
                  4 +
                  (
                    i %
                    3
                  )
                }

                fill="#6FAFE5"

                opacity={
                  spray *
                  (
                    0.72 -
                    i *
                      0.035
                  )
                }
              />
            )
          )}
        </svg>


        {/* ================================================= */}
        {/* WIPE / CLOTH                                     */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              425 +
              wipeX,

            top:
              456,

            width:
              150,

            height:
              48,

            borderRadius:
              15,

            background:
              "#79B7DA",

            border:
              "6px solid #4A84A8",

            boxSizing:
              "border-box",

            transform:
              `rotate(${wipeRotation}deg)`,

            zIndex:
              22,
          }}
        >
          <div
            style={{
              position:
                "absolute",

              left:
                18,

              top:
                10,

              width:
                95,

              height:
                16,

              borderTop:
                "4px solid rgba(255,255,255,.55)",

              borderRadius:
                "50%",
            }}
          />
        </div>


        {/* ================================================= */}
        {/* WIPE HANDLE                                      */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              540 +
              wipeX,

            top:
              464,

            width:
              168,

            height:
              26,

            borderRadius:
              9,

            background:
              "#FFFDF7",

            border:
              "3px solid #D8D0C2",

            boxSizing:
              "border-box",

            zIndex:
              21,
          }}
        />

        <div
          style={{
            position:
              "absolute",

            left:
              691 +
              wipeX,

            top:
              460,

            width:
              34,

            height:
              34,

            borderRadius:
              "50%",

            background:
              "#E4C5A8",

            zIndex:
              22,
          }}
        />


        {/* ================================================= */}
        {/* CLEAN CHECK                                      */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              690,

            top:
              420,

            width:
              84,

            height:
              84,

            borderRadius:
              "50%",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            background:
              "rgba(255,255,255,.96)",

            border:
              `5px solid ${theme.colors.teal}`,

            opacity:
              cleanP,

            transform: `
              translate(-50%, -50%)

              scale(
                ${0.76 + cleanP * 0.24}
              )
            `,

            zIndex:
              25,
          }}
        >
          <div
            style={{
              width:
                28,

              height:
                15,

              borderLeft:
                `7px solid ${theme.colors.teal}`,

              borderBottom:
                `7px solid ${theme.colors.teal}`,

              transform:
                "rotate(-45deg) translate(2px,-2px)",
            }}
          />
        </div>


        {/* ================================================= */}
        {/* REAL BROOM IMAGE                                 */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              70,

            top:
              190,

            width:
              250,

            height:
              310,

            opacity:
              forbidP *
              broomIn,

            transform: `
              rotate(
                ${broomRotation}deg
              )

              scale(
                ${
                  (
                    0.88 +
                    forbidP *
                      0.12
                  ) *
                  warningPulse
                }
              )
            `,

            transformOrigin:
              "50% 60%",

            zIndex:
              20,
          }}
        >
          <Img
            src={
              staticFile(
                BROOM_IMAGE
              )
            }

            style={{
              width:
                "100%",

              height:
                "100%",

              objectFit:
                "contain",

              display:
                "block",

              mixBlendMode:
                "multiply",

              filter:
                "drop-shadow(0 14px 22px rgba(52,42,35,.09))",
            }}
          />
        </div>


        {/* ================================================= */}
        {/* PROHIBITION CIRCLE                               */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              74,

            top:
              185,

            width:
              260,

            height:
              260,

            borderRadius:
              "50%",

            border:
              `8px solid ${theme.colors.coral}`,

            opacity:
              forbidP,

            transform:
              `scale(${0.88 + forbidP * 0.12})`,

            zIndex:
              24,
          }}
        />


        {/* ================================================= */}
        {/* PROHIBITION SLASH                                */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              92,

            top:
              305,

            width:
              225,

            height:
              12,

            borderRadius:
              999,

            background:
              theme.colors.coral,

            opacity:
              forbidP,

            transform:
              "rotate(45deg)",

            transformOrigin:
              "center center",

            zIndex:
              25,
          }}
        />


        {/* ================================================= */}
        {/* DO NOT SWEEP LABEL                               */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              104,

            top:
              458,

            padding:
              "10px 17px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.96)",

            border:
              `2px solid ${theme.colors.coral}`,

            boxShadow:
              "0 8px 20px rgba(52,42,35,.06)",

            fontFamily:
              FONT_STACK,

            fontSize:
              15,

            fontWeight:
              900,

            letterSpacing:
              1.3,

            color:
              theme.colors.coralDark,

            opacity:
              forbidP,

            transform:
              `translateY(${(1 - forbidP) * 8}px)`,

            zIndex:
              28,
          }}
        >
          DO NOT SWEEP
        </div>


        {/* ================================================= */}
        {/* AEROSOL PARTICLES                                */}
        {/* ================================================= */}

        {spray >
        0.05 ? (
          <AerosolField
            count={
              18
            }

            width={
              210
            }

            height={
              125
            }

            startX={
              285
            }

            startY={
              280
            }

            progress={
              spray *
              0.34
            }

            direction="up-right"
          />
        ) : null}


        {/* ================================================= */}
        {/* BOTTOM CAPTION                                   */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              34,

            bottom:
              27,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              12,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            lineHeight:
              1,

            fontWeight:
              900,

            letterSpacing:
              1.45,

            textTransform:
              "uppercase",

            color:
              theme.colors.muted,

            zIndex:
              30,
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
                theme.colors.teal,
            }}
          />

          Wet first → wipe clean → avoid sweeping
        </div>
      </div>
    </div>
  );
};