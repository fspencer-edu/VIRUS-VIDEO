import {
  interpolate,
  spring,
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
   HELPERS
   ========================================================= */

const clamp01 = (
  value:
    number
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
        damping:
          180,

        stiffness:
          92,
      },
    });


  const titleIn =
    spring({
      frame:
        frame -
        5,

      fps,

      config: {
        damping:
          180,

        stiffness:
          88,
      },
    });


  const bodyIn =
    spring({
      frame:
        frame -
        12,

      fps,

      config: {
        damping:
          185,

        stiffness:
          84,
      },
    });


  /* =======================================================
     PANEL ENTRANCE
     ======================================================= */

  const panelIn =
    spring({
      frame:
        frame -
        10,

      fps,

      config: {
        damping:
          180,

        stiffness:
          78,
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
        frame -
        94,

      fps,

      config: {
        damping:
          165,

        stiffness:
          100,
      },
    });


  const forbidP =
    clamp01(
      forbid
    );


  /* =======================================================
     SUCCESS STATE
     ======================================================= */

  const cleanIn =
    spring({
      frame:
        frame -
        128,

      fps,

      config: {
        damping:
          165,

        stiffness:
          105,
      },
    });


  const cleanP =
    clamp01(
      cleanIn
    );


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
     DROPPING OPACITY
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
        0.45,
        1,
      ],
      [
        0,
        -5,
        0,
      ]
    );


  /* =======================================================
     WARNING PULSE
     ======================================================= */

  const warningPulse =
    1 +
    Math.sin(
      frame /
        10
    ) *
      0.025;


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
              rgba(
                35,
                66,
                82,
                .13
              )
              0.7px,
              transparent
              0.75px
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

        {/* ================================================= */}
        {/* EYEBROW                                           */}
        {/* ================================================= */}

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
                44 * eyebrowIn,

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
                850,

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


        {/* ================================================= */}
        {/* TITLE                                             */}
        {/* ================================================= */}

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
              0.96,

            fontWeight:
              835,

            letterSpacing:
              -4.5,

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
          Wet and disinfect
          <br />
          droppings instead
          <br />
          of sweeping.
        </div>


        {/* ================================================= */}
        {/* ACCENT                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              34,

            width:
              94 * titleIn,

            height:
              7,

            borderRadius:
              999,

            background:
              theme.colors.coral,

            transformOrigin:
              "left center",
          }}
        />


        {/* ================================================= */}
        {/* DESCRIPTION                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              30,

            width:
              620,

            fontFamily:
              FONT_STACK,

            fontSize:
              34,

            lineHeight:
              1.35,

            fontWeight:
              560,

            letterSpacing:
              -0.65,

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


        {/* ================================================= */}
        {/* SUPPORTING POINT                                  */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              42,

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

              flex:
                "0 0 auto",

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
                720,

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

        {/* ================================================= */}
        {/* PANEL LABEL                                       */}
        {/* ================================================= */}

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

            lineHeight:
              1,

            fontWeight:
              850,

            letterSpacing:
              1.9,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,

            zIndex:
              5,
          }}
        >
          Wet cleaning method
        </div>


        {/* ================================================= */}
        {/* ILLUSTRATION                                      */}
        {/* ================================================= */}

        <svg
          viewBox="0 0 1010 730"
          width="1010"
          height="730"
        >

          {/* ================================================= */}
          {/* BACKGROUND                                        */}
          {/* ================================================= */}

          <rect
            x="0"
            y="0"
            width="1010"
            height="730"
            fill="#FBF9F5"
          />


          {/* ================================================= */}
          {/* SOFT BACKDROP                                     */}
          {/* ================================================= */}

          <circle
            cx="500"
            cy="330"
            r="270"
            fill="rgba(14,141,151,.04)"
          />


          {/* ================================================= */}
          {/* FLOOR                                             */}
          {/* ================================================= */}

          <rect
            x="0"
            y="574"
            width="1010"
            height="156"
            fill="#DCCEBE"
          />

          <line
            x1="0"
            y1="574"
            x2="1010"
            y2="574"
            stroke="#C7B8A7"
            strokeWidth="3"
          />


          {/* ================================================= */}
          {/* CONTAMINATED SURFACE                              */}
          {/* ================================================= */}

          <rect
            x="220"
            y="500"
            width="510"
            height="92"
            rx="18"
            fill="#C7B9A8"
          />


          {/* ================================================= */}
          {/* WET AREA                                          */}
          {/* ================================================= */}

          <ellipse
            cx="470"
            cy="530"
            rx={
              60 +
              wetSurface *
                150
            }
            ry={
              14 +
              wetSurface *
                18
            }
            fill="rgba(111,175,229,.22)"
            opacity={
              wetSurface
            }
          />


          {/* ================================================= */}
          {/* DROPPINGS                                         */}
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
              <ellipse
                key={
                  i
                }

                cx={
                  320 +
                  i *
                    38
                }

                cy={
                  540 +
                  (
                    i %
                    2
                  ) *
                    8
                }

                rx="12"

                ry="7"

                fill="#6D4F3D"

                opacity={
                  droppingsOpacity
                }
              />
            )
          )}


          {/* ================================================= */}
          {/* SPRAY BOTTLE                                      */}
          {/* ================================================= */}

          <g
            transform={`
              translate(0 0)
              rotate(
                ${bottleRotation}
                184
                336
              )
            `}
          >
            <rect
              x="118"
              y="270"
              width="132"
              height="185"
              rx="18"
              fill="#F2F5FA"
              stroke="#B9C8D7"
              strokeWidth="6"
            />

            <rect
              x="141"
              y="232"
              width="87"
              height="48"
              rx="14"
              fill="#A9C9EA"
              stroke="#729CC5"
              strokeWidth="6"
            />

            <path
              d="
                M 215 244
                L 270 244
                L 290 262
              "
              fill="none"
              stroke="#729CC5"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <rect
              x="142"
              y="318"
              width="84"
              height="64"
              rx="12"
              fill="rgba(255,255,255,.72)"
            />
          </g>


          {/* ================================================= */}
          {/* SPRAY STREAM                                      */}
          {/* ================================================= */}

          <path
            d={`
              M 287 269
              C
              345 ${285 - spray * 14},
              385 ${330 - spray * 10},
              455 ${390 - spray * 12}
            `}

            fill="none"

            stroke="#6FAFE5"

            strokeWidth="10"

            strokeLinecap="round"

            opacity={
              spray
            }
          />


          {/* ================================================= */}
          {/* SPRAY DROPLETS                                    */}
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
              <circle
                key={
                  i
                }

                cx={
                  330 +
                  i *
                    18
                }

                cy={
                  298 +
                  i *
                    13 +
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
                    0.7 -
                    i *
                      0.035
                  )
                }
              />
            )
          )}


          {/* ================================================= */}
          {/* CLOTH                                             */}
          {/* ================================================= */}

          <g
            transform={`
              translate(
                ${wipeX}
                0
              )

              rotate(
                ${wipeRotation}
                484
                480
              )
            `}
          >
            <rect
              x="425"
              y="456"
              width="150"
              height="48"
              rx="15"
              fill="#79B7DA"
              stroke="#4A84A8"
              strokeWidth="6"
            />

            <path
              d="
                M 444 468
                C 466 480,
                  490 462,
                  512 478
                C 534 492,
                  550 474,
                  566 485
              "
              fill="none"
              stroke="rgba(255,255,255,.55)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>


          {/* ================================================= */}
          {/* WIPING HAND / TOOL                               */}
          {/* ================================================= */}

          <g
            transform={`
              translate(
                ${wipeX}
                0
              )
            `}
          >
            <rect
              x="540"
              y="464"
              width="168"
              height="26"
              rx="9"
              fill="#FFFDF7"
              stroke="#D8D0C2"
              strokeWidth="3"
            />

            <circle
              cx="708"
              cy="477"
              r="17"
              fill="#E4C5A8"
            />
          </g>


          {/* ================================================= */}
          {/* CLEAN CHECK                                       */}
          {/* ================================================= */}

          <g
            opacity={
              cleanP
            }

            transform={`
              translate(690 420)
              scale(
                ${0.76 + cleanP * 0.24}
              )
            `}
          >
            <circle
              cx="0"
              cy="0"
              r="42"
              fill="rgba(255,255,255,.96)"
              stroke={theme.colors.teal}
              strokeWidth="5"
            />

            <path
              d="
                M -17 1
                L -5 14
                L 20 -16
              "
              fill="none"
              stroke={theme.colors.teal}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>


          {/* ================================================= */}
          {/* DO NOT SWEEP — BROOM                              */}
          {/* ================================================= */}

          <g
            opacity={
              forbidP
            }

            transform={`
              translate(815 310)
              scale(
                ${(0.82 + forbidP * 0.18) * warningPulse}
              )
            `}
          >

            {/* WHITE WARNING DISC */}

            <circle
              cx="0"
              cy="0"
              r="104"
              fill="rgba(255,255,255,.96)"
              stroke={theme.colors.coral}
              strokeWidth="7"
            />


            {/* BROOM HANDLE */}

            <line
              x1="-24"
              y1="-64"
              x2="28"
              y2="28"
              stroke="#8F755F"
              strokeWidth="10"
              strokeLinecap="round"
            />


            {/* BROOM HEAD */}

            <path
              d="
                M 5 17
                L 52 43
                L 33 78
                L -15 51
                Z
              "
              fill="#C9B89C"
              stroke="#A99378"
              strokeWidth="5"
              strokeLinejoin="round"
            />


            {/* BRISTLES */}

            <line
              x1="7"
              y1="48"
              x2="31"
              y2="61"
              stroke="#9A846B"
              strokeWidth="4"
            />

            <line
              x1="17"
              y1="40"
              x2="42"
              y2="54"
              stroke="#9A846B"
              strokeWidth="4"
            />


            {/* PROHIBITION SLASH */}

            <line
              x1="-67"
              y1="-67"
              x2="67"
              y2="67"
              stroke={theme.colors.coral}
              strokeWidth="12"
              strokeLinecap="round"
            />
          </g>


          {/* ================================================= */}
          {/* WARNING LABEL                                     */}
          {/* ================================================= */}

          <g
            opacity={
              forbidP
            }
          >
            <rect
              x="748"
              y="433"
              width="137"
              height="42"
              rx="21"
              fill="rgba(255,255,255,.96)"
              stroke={theme.colors.coral}
              strokeWidth="2"
            />

            <text
              x="816.5"
              y="460"
              textAnchor="middle"
              fontFamily={FONT_STACK}
              fontSize="15"
              fontWeight="850"
              letterSpacing="1.3"
              fill={theme.colors.coralDark}
            >
              DO NOT SWEEP
            </text>
          </g>
        </svg>


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
        {/* BOTTOM CAPTION                                    */}
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
              800,

            letterSpacing:
              1.45,

            textTransform:
              "uppercase",

            color:
              theme.colors.muted,
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