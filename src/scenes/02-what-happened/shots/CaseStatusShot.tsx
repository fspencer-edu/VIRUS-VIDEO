import type {
  ReactNode,
} from "react";

import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  AnimatedNumber,
} from "../../../components/visuals/AnimatedNumber";

import {
  RtGenerationVisual,
} from "../../../components/visuals/RtGenerationVisual";

import {
  RoughCircleAccent,
  RoughUnderlineAccent,
} from "../../../components/visuals/HandDrawnEmphasis";

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
   BACKGROUND DECORATION
   ========================================================= */

const BackgroundMotion = ({
  frame,
}: {
  frame: number;
}) => {
  return (
    <>
      {/* Soft teal glow */}

      <div
        style={{
          position: "absolute",
          right: -220,
          top: 100,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `
            radial-gradient(
              circle,
              rgba(53,166,161,.08) 0%,
              rgba(53,166,161,.025) 44%,
              rgba(53,166,161,0) 72%
            )
          `,
          transform: `
            translate(
              ${Math.sin(frame / 48) * 18}px,
              ${Math.cos(frame / 60) * 12}px
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* Coral glow */}

      <div
        style={{
          position: "absolute",
          left: -260,
          bottom: -300,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `
            radial-gradient(
              circle,
              rgba(233,111,106,.065) 0%,
              rgba(233,111,106,.018) 46%,
              rgba(233,111,106,0) 74%
            )
          `,
          transform: `
            translate(
              ${Math.cos(frame / 55) * 15}px,
              ${Math.sin(frame / 50) * 14}px
            )
          `,
          pointerEvents: "none",
        }}
      />

      {/* Paper texture */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.14,
          backgroundImage: `
            radial-gradient(
              circle,
              rgba(35,66,82,.14) .7px,
              transparent .8px
            )
          `,
          backgroundSize: "8px 8px",
          pointerEvents: "none",
        }}
      />
    </>
  );
};


/* =========================================================
   STAT CARD
   ========================================================= */

const StatCard = ({
  children,
  left,
  top,
  width,
  height,
  progress,
}: {
  children: ReactNode;
  left: number;
  top: number;
  width: number;
  height: number;
  progress: number;
}) => {
  const p =
    clamp01(
      progress
    );

  return (
    <div
      style={{
        position: "absolute",

        left,
        top,

        width,
        height,

        boxSizing: "border-box",

        borderRadius: 34,

        background:
          "rgba(255,255,255,.94)",

        border:
          `1px solid ${theme.colors.line}`,

        boxShadow: `
          0
          24px
          64px
          rgba(52,42,35,.10)
        `,

        padding:
          "34px 36px",

        opacity: p,

        transform: `
          translateY(
            ${(1 - p) * 28}px
          )

          scale(
            ${0.96 + p * 0.04}
          )
        `,

        transformOrigin:
          "50% 100%",

        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};


/* =========================================================
   CASE DOTS
   ========================================================= */

const CaseDots = ({
  frame,
}: {
  frame: number;
}) => {
  return (
    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          "repeat(5, 1fr)",

        gap: 14,

        width: 220,

        marginTop: 34,
      }}
    >
      {Array.from(
        {
          length: 13,
        },
        (_, index) => {
          const reveal =
            interpolate(
              frame,
              [
                36 + index * 3,
                48 + index * 3,
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
              key={index}
              style={{
                width: 26,
                height: 26,

                borderRadius: "50%",

                background:
                  theme.colors.coral,

                opacity:
                  reveal,

                transform:
                  `scale(${0.5 + reveal * 0.5})`,

                boxShadow: `
                  0
                  5px
                  12px
                  rgba(233,111,106,.18)
                `,
              }}
            />
          );
        }
      )}
    </div>
  );
};


/* =========================================================
   DEATH INDICATORS
   ========================================================= */

const DeathIndicators = ({
  frame,
}: {
  frame: number;
}) => {
  return (
    <div
      style={{
        display: "flex",

        gap: 20,

        marginTop: 42,
      }}
    >
      {[0, 1, 2].map(
        (
          _,
          index
        ) => {
          const reveal =
            interpolate(
              frame,
              [
                50 + index * 10,
                68 + index * 10,
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
              key={index}
              style={{
                position: "relative",

                width: 58,
                height: 58,

                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                borderRadius:
                  "50%",

                background:
                  "rgba(185,76,74,.10)",

                border: `
                  2px
                  solid
                  rgba(185,76,74,.24)
                `,

                opacity:
                  reveal,

                transform:
                  `scale(${0.6 + reveal * 0.4})`,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,

                  borderRadius:
                    "50%",

                  background:
                    theme.colors.coralDark,
                }}
              />
            </div>
          );
        }
      )}
    </div>
  );
};


/* =========================================================
   TREND ARROW
   ========================================================= */

const TrendArrow = ({
  frame,
  progress,
}: {
  frame: number;
  progress: number;
}) => {
  const pulse =
    1 +
    Math.sin(
      frame / 9
    ) *
      0.04;

  return (
    <div
      style={{
        width: 96,
        height: 96,

        flex: "0 0 auto",

        borderRadius:
          "50%",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          "rgba(53,166,161,.11)",

        border:
          "1px solid rgba(53,166,161,.18)",

        opacity:
          progress,

        transform:
          `scale(${pulse * (0.82 + progress * 0.18)})`,

        boxShadow:
          "0 14px 32px rgba(53,166,161,.10)",
      }}
    >
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
      >
        <path
          d="
            M27 8
            V38

            M15 28
            L27 40
            L39 28
          "
          stroke={
            theme.colors.tealDark
          }
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};


/* =========================================================
   STATUS PILL
   ========================================================= */

const StatusPill = ({
  progress,
}: {
  progress: number;
}) => (
  <div
    style={{
      display:
        "inline-flex",

      alignItems:
        "center",

      gap:
        12,

      padding:
        "13px 18px",

      borderRadius:
        999,

      background:
        "rgba(53,166,161,.09)",

      border:
        "1px solid rgba(53,166,161,.17)",

      opacity:
        progress,

      transform:
        `translateY(${(1 - progress) * 8}px)`,
    }}
  >
    <span
      style={{
        width: 10,
        height: 10,

        borderRadius:
          "50%",

        background:
          theme.colors.teal,

        boxShadow:
          "0 0 0 6px rgba(53,166,161,.09)",
      }}
    />

    <span
      style={{
        fontFamily:
          FONT_STACK,

        fontSize:
          18,

        fontWeight:
          750,

        letterSpacing:
          0.2,

        color:
          theme.colors.tealDark,
      }}
    >
      Transmission trending downward
    </span>
  </div>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const CaseStatusShot = () => {
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
        damping: 180,
        stiffness: 90,
      },
    });


  /* =======================================================
     CARDS
     ======================================================= */

  const casesIn =
    spring({
      frame:
        frame - 8,

      fps,

      config: {
        damping: 170,
        stiffness: 95,
      },
    });


  const deathsIn =
    spring({
      frame:
        frame - 17,

      fps,

      config: {
        damping: 170,
        stiffness: 95,
      },
    });


  const trendIn =
    spring({
      frame:
        frame - 28,

      fps,

      config: {
        damping: 170,
        stiffness: 90,
      },
    });


  const trendDetails =
    interpolate(
      frame,
      [
        48,
        84,
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
            #F9F6F0 0%,
            #FBF8F3 100%
          )
        `,
      }}
    >

      <BackgroundMotion
        frame={
          frame
        }
      />


      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            88,

          top:
            56,

          right:
            88,

          opacity:
            clamp01(
              headerIn
            ),

          transform: `
            translateY(
              ${(1 - clamp01(headerIn)) * 16}px
            )
          `,

          zIndex:
            10,
        }}
      >
        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              13,
          }}
        >
          <span
            style={{
              width: 38,
              height: 4,

              borderRadius:
                999,

              background:
                theme.colors.coral,
            }}
          />

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                19,

              fontWeight:
                850,

              letterSpacing:
                2.7,

              textTransform:
                "uppercase",

              color:
                theme.colors.coralDark,
            }}
          >
            Outbreak status
          </div>
        </div>


        <div
          style={{
            marginTop:
              18,

            fontFamily:
              TITLE_STACK,

            fontSize:
              72,

            lineHeight:
              0.96,

            fontWeight:
              830,

            letterSpacing:
              -3.6,

            color:
              theme.colors.ink,
          }}
        >
          Final numbers from the cruise outbreak
        </div>


        <div
          style={{
            marginTop:
              14,

            width:
              980,

            fontFamily:
              FONT_STACK,

            fontSize:
              27,

            lineHeight:
              1.4,

            fontWeight:
              520,

            color:
              theme.colors.muted,
          }}
        >
          The cluster remained serious, but the pattern of
          transmission suggested the outbreak was beginning
          to contract.
        </div>
      </div>


      {/* ================================================= */}
      {/* CASES                                             */}
      {/* ================================================= */}

      <StatCard
        left={88}
        top={260}
        width={420}
        height={690}
        progress={casesIn}
      >
        <div
          style={{
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
              theme.colors.coralDark,
          }}
        >
          Reported cases
        </div>


        <div
          style={{
            marginTop:
              34,

            display:
              "flex",

            justifyContent:
              "center",
          }}
        >
          <div
            style={{
              fontFamily:
                TITLE_STACK,

              fontSize:
                190,

              lineHeight:
                0.9,

              fontWeight:
                760,

              letterSpacing:
                -7,

              color:
                theme.colors.coral,
            }}
          >
            <RoughCircleAccent
              startFrame={22}
              durationInFrames={30}
              color="rgba(233,111,106,.66)"
            >
              <span>
                <AnimatedNumber
                  value={13}
                  startFrame={8}
                />
              </span>
            </RoughCircleAccent>
          </div>
        </div>


        <div
          style={{
            marginTop:
              20,

            textAlign:
              "center",

            fontFamily:
              FONT_STACK,

            fontSize:
              31,

            lineHeight:
              1.2,

            fontWeight:
              620,

            color:
              theme.colors.ink,
          }}
        >
          total reported cases
        </div>


        <div
          style={{
            marginTop:
              12,

            textAlign:
              "center",

            fontFamily:
              FONT_STACK,

            fontSize:
              20,

            lineHeight:
              1.4,

            color:
              theme.colors.muted,
          }}
        >
          Each dot below represents one reported case.
        </div>


        <div
          style={{
            display:
              "flex",

            justifyContent:
              "center",
          }}
        >
          <CaseDots
            frame={
              frame
            }
          />
        </div>


        {/* Decorative baseline */}

        <div
          style={{
            position:
              "absolute",

            left:
              34,

            right:
              34,

            bottom:
              34,

            height:
              5,

            borderRadius:
              999,

            background:
              "rgba(233,111,106,.12)",
          }}
        >
          <div
            style={{
              width:
                `${interpolate(
                  frame,
                  [20, 90],
                  [0, 100],
                  {
                    extrapolateLeft:
                      "clamp",

                    extrapolateRight:
                      "clamp",
                  }
                )}%`,

              height:
                "100%",

              borderRadius:
                999,

              background:
                theme.colors.coral,
            }}
          />
        </div>
      </StatCard>


      {/* ================================================= */}
      {/* DEATHS                                            */}
      {/* ================================================= */}

      <StatCard
        left={540}
        top={260}
        width={350}
        height={690}
        progress={deathsIn}
      >
        <div
          style={{
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
              theme.colors.coralDark,
          }}
        >
          Deaths
        </div>


        <div
          style={{
            marginTop:
              46,

            fontFamily:
              TITLE_STACK,

            fontSize:
              190,

            lineHeight:
              0.88,

            fontWeight:
              760,

            letterSpacing:
              -7,

            color:
              theme.colors.coralDark,
          }}
        >
          <AnimatedNumber
            value={3}
            startFrame={18}
          />
        </div>


        <div
          style={{
            marginTop:
              24,

            fontFamily:
              FONT_STACK,

            fontSize:
              31,

            lineHeight:
              1.2,

            fontWeight:
              620,

            color:
              theme.colors.ink,
          }}
        >
          deaths
        </div>


        <div
          style={{
            marginTop:
              18,

            width:
              260,

            fontFamily:
              FONT_STACK,

            fontSize:
              20,

            lineHeight:
              1.45,

            color:
              theme.colors.muted,
          }}
        >
          The outbreak caused severe disease, including
          fatal outcomes.
        </div>


        <DeathIndicators
          frame={
            frame
          }
        />


        {/* Vertical accent */}

        <div
          style={{
            position:
              "absolute",

            left:
              34,

            bottom:
              34,

            width:
              90,

            height:
              6,

            borderRadius:
              999,

            background:
              theme.colors.coralDark,
          }}
        />
      </StatCard>


      {/* ================================================= */}
      {/* TRANSMISSION TREND                                */}
      {/* ================================================= */}

      <StatCard
        left={924}
        top={260}
        width={908}
        height={690}
        progress={trendIn}
      >
        {/* Header row */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "flex-start",

            justifyContent:
              "space-between",

            gap:
              36,
          }}
        >
          <div>
            <div
              style={{
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
              Transmission trend
            </div>


            <div
              style={{
                marginTop:
                  18,

                display:
                  "flex",

                alignItems:
                  "baseline",

                gap:
                  20,
              }}
            >
              <div
                style={{
                  fontFamily:
                    TITLE_STACK,

                  fontSize:
                    126,

                  lineHeight:
                    0.9,

                  fontWeight:
                    740,

                  letterSpacing:
                    -5,

                  color:
                    theme.colors.tealDark,
                }}
              >
                Rt = 0.7
              </div>


              <div
                style={{
                  fontFamily:
                    FONT_STACK,

                  fontSize:
                    72,

                  lineHeight:
                    1,

                  color:
                    theme.colors.tealDark,

                  transform:
                    `translateY(${Math.sin(frame / 9) * 3}px)`,
                }}
              >
                ↓
              </div>
            </div>


            <div
              style={{
                marginTop:
                  22,

                fontFamily:
                  FONT_STACK,

                fontSize:
                  29,

                fontWeight:
                  600,

                color:
                  theme.colors.muted,
              }}
            >
              <RoughUnderlineAccent
                startFrame={52}
                durationInFrames={24}
                color={
                  theme.colors.teal
                }
              >
                spread was declining
              </RoughUnderlineAccent>
            </div>
          </div>


          <TrendArrow
            frame={
              frame
            }

            progress={
              trendDetails
            }
          />
        </div>


        {/* Divider */}

        <div
          style={{
            marginTop:
              30,

            width:
              "100%",

            height:
              1,

            background:
              theme.colors.line,
          }}
        />


        {/* ================================================= */}
        {/* GENERATION VISUAL                                 */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              24,

            width:
              "100%",

            height:
              275,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            opacity:
              trendDetails,

            transform:
              `translateY(${(1 - trendDetails) * 12}px)`,
          }}
        >
          <RtGenerationVisual
            width={780}
            height={255}
          />
        </div>


        {/* ================================================= */}
        {/* INTERPRETATION                                   */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              16,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap:
              24,

            opacity:
              trendDetails,
          }}
        >
          <StatusPill
            progress={
              trendDetails
            }
          />


          <div
            style={{
              width:
                360,

              textAlign:
                "right",

              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              lineHeight:
                1.4,

              color:
                theme.colors.muted,
            }}
          >
            An Rt below 1 means each generation of
            transmission is smaller than the one before it.
          </div>
        </div>


        {/* Bottom teal accent */}

        <div
          style={{
            position:
              "absolute",

            left:
              36,

            right:
              36,

            bottom:
              34,

            height:
              5,

            borderRadius:
              999,

            background:
              "rgba(53,166,161,.12)",
          }}
        >
          <div
            style={{
              width:
                `${interpolate(
                  frame,
                  [42, 120],
                  [0, 70],
                  {
                    extrapolateLeft:
                      "clamp",

                    extrapolateRight:
                      "clamp",
                  }
                )}%`,

              height:
                "100%",

              borderRadius:
                999,

              background:
                theme.colors.teal,
            }}
          />
        </div>
      </StatCard>
    </div>
  );
};