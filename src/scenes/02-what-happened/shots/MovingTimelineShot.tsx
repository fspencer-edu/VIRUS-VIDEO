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
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

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


const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   TIMELINE CONSTANTS
   ========================================================= */

const TIMELINE_Y =
  660;

const NODE_CONTENT_WIDTH =
  320;

const MEDIA_WIDTH =
  300;

const MEDIA_HEIGHT =
  168;


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
   TYPES
   ========================================================= */

type NodeProps = {
  x:
    number;

  y:
    number;

  progress:
    number;

  date:
    string;

  title:
    string;

  detail?:
    string;

  above?:
    boolean;

  accent?:
    string;

  children:
    ReactNode;
};


/* =========================================================
   ROUNDED MEDIA CARD
   ========================================================= */

const RoundedCard = ({
  children,
  width,
  height,
}: {
  children:
    ReactNode;

  width:
    number;

  height:
    number;
}) => (
  <div
    style={{
      position:
        "relative",

      width,

      height,

      overflow:
        "hidden",

      borderRadius:
        26,

      background:
        theme.colors.white,

      border:
        `1px solid ${theme.colors.line}`,

      boxShadow:
        "0 18px 42px rgba(52,42,35,.10)",
    }}
  >
    {children}
  </div>
);


/* =========================================================
   TIMELINE NODE
   ========================================================= */

const TimelineNode = ({
  x,
  y,
  progress,
  date,
  title,
  detail,
  above = true,
  accent = theme.colors.coral,
  children,
}: NodeProps) => {
  const p =
    clamp01(
      progress
    );


  /*
   * Keep both rows comfortably inside the frame.
   *
   * Above:
   * y = 660
   * content starts around 334
   *
   * Below:
   * content starts around 708
   */
  const cardY =
    above
      ? y - 326
      : y + 48;


  const contentX =
    x -
    NODE_CONTENT_WIDTH /
      2;


  /* =======================================================
     SHORT CONNECTOR STEM
     ======================================================= */

  const stemTop =
    above
      ? y - 52
      : y + 18;


  const stemHeight =
    above
      ? 34
      : 30;


  const contentTranslateY =
    (
      1 -
      p
    ) *
    (
      above
        ? 22
        : -22
    );


  const contentScale =
    0.95 +
    p *
      0.05;


  return (
    <>
      {/* ================================================= */}
      {/* STEM                                              */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            x - 3,

          top:
            stemTop,

          width:
            6,

          height:
            stemHeight,

          borderRadius:
            999,

          background:
            accent,

          opacity:
            p,

          transform: `
            scaleY(
              ${p}
            )
          `,

          transformOrigin:
            above
              ? "bottom center"
              : "top center",
        }}
      />


      {/* ================================================= */}
      {/* TIMELINE DOT                                      */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            x - 17,

          top:
            y - 17,

          width:
            34,

          height:
            34,

          boxSizing:
            "border-box",

          borderRadius:
            "50%",

          background:
            theme.colors.white,

          border:
            `6px solid ${accent}`,

          opacity:
            p,

          transform: `
            scale(
              ${0.7 + p * 0.3}
            )
          `,

          boxShadow: `
            0
            0
            0
            ${10 * p}px
            rgba(
              233,
              111,
              106,
              ${0.08 * p}
            )
          `,

          zIndex:
            4,
        }}
      />


      {/* ================================================= */}
      {/* CONTENT                                           */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            contentX,

          top:
            cardY,

          width:
            NODE_CONTENT_WIDTH,

          opacity:
            p,

          transform: `
            translateY(
              ${contentTranslateY}px
            )

            scale(
              ${contentScale}
            )
          `,

          transformOrigin:
            above
              ? "bottom center"
              : "top center",

          zIndex:
            3,
        }}
      >
        {children}


        {/* ================================================= */}
        {/* DATE                                              */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              13,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            lineHeight:
              1,

            fontWeight:
              850,

            letterSpacing:
              2.1,

            textTransform:
              "uppercase",

            color:
              accent,
          }}
        >
          {date}
        </div>


        {/* ================================================= */}
        {/* TITLE                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              6,

            maxWidth:
              320,

            fontFamily:
              TITLE_STACK,

            fontSize:
              31,

            lineHeight:
              1.02,

            fontWeight:
              810,

            letterSpacing:
              -1.15,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        {/* ================================================= */}
        {/* DETAIL                                            */}
        {/* ================================================= */}

        {detail ? (
          <div
            style={{
              marginTop:
                7,

              maxWidth:
                310,

              fontFamily:
                FONT_STACK,

              fontSize:
                18,

              lineHeight:
                1.3,

              fontWeight:
                540,

              letterSpacing:
                -0.2,

              color:
                theme.colors.muted,
            }}
          >
            {detail}
          </div>
        ) : null}
      </div>
    </>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const MovingTimelineShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     HEADER ENTRANCE
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


  const headerProgress =
    clamp01(
      headerIn
    );


  /* =======================================================
     TIMELINE NODE ENTRANCES

     Faster staggering so the entire sequence becomes visible
     without making the viewer wait too long for event four.
     ======================================================= */

  const p1 =
    spring({
      frame:
        frame -
        8,

      fps,

      config: {
        damping:
          165,

        stiffness:
          112,
      },
    });


  const p2 =
    spring({
      frame:
        frame -
        40,

      fps,

      config: {
        damping:
          165,

        stiffness:
          112,
      },
    });


  const p3 =
    spring({
      frame:
        frame -
        72,

      fps,

      config: {
        damping:
          165,

        stiffness:
          112,
      },
    });


  const p4 =
    spring({
      frame:
        frame -
        104,

      fps,

      config: {
        damping:
          165,

        stiffness:
          112,
      },
    });


  /* =======================================================
     TIMELINE PROGRESS
     ======================================================= */

  const lineProgress =
    interpolate(
      frame,
      [
        5,
        145,
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


  const markerX =
    interpolate(
      lineProgress,
      [
        0,
        1,
      ],
      [
        245,
        1620,
      ]
    );


  /* =======================================================
     MOVING MARKER PULSE
     ======================================================= */

  const pulse =
    1 +
    Math.sin(
      frame *
        0.09
    ) *
      0.06;


  /* =======================================================
     HEADER MOTION
     ======================================================= */

  const headerY =
    interpolate(
      headerProgress,
      [
        0,
        1,
      ],
      [
        22,
        0,
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
            0.16,

          backgroundImage: `
            radial-gradient(
              circle,
              rgba(
                35,
                66,
                82,
                .14
              )
              0.75px,
              transparent
              0.8px
            )
          `,

          backgroundSize:
            "8px 8px",

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* FIXED HEADER                                     */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            88,

          right:
            88,

          top:
            46,

          zIndex:
            30,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${headerY}px
            )
          `,
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
              14,
          }}
        >
          <span
            style={{
              width:
                40 *
                headerProgress,

              height:
                4,

              borderRadius:
                999,

              background:
                "#0E8D97",

              transformOrigin:
                "left center",
            }}
          />

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              lineHeight:
                1,

              fontWeight:
                850,

              letterSpacing:
                2.8,

              textTransform:
                "uppercase",

              color:
                "#0E8D97",
            }}
          >
            Outbreak timeline
          </div>
        </div>


        {/* ================================================= */}
        {/* HEADER TITLE                                      */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              18,

            width:
              1100,

            fontFamily:
              TITLE_STACK,

            fontSize:
              78,

            lineHeight:
              0.92,

            fontWeight:
              835,

            letterSpacing:
              -4,

            color:
              "#17243A",
          }}
        >
          How the outbreak
          <br />
          was recognized
        </div>


        {/* ================================================= */}
        {/* HEADER DESCRIPTION                                */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              18,

            width:
              1160,

            fontFamily:
              FONT_STACK,

            fontSize:
              29,

            lineHeight:
              1.33,

            fontWeight:
              545,

            letterSpacing:
              -0.45,

            color:
              "#596D82",
          }}
        >
          The ship leaves Argentina, symptoms appear, a medical
          evacuation follows, and laboratory testing identifies
          the cause.
        </div>
      </div>


      {/* ================================================= */}
      {/* TIMELINE                                         */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* TIMELINE LINE                                     */}
        {/* ================================================= */}

        <svg
          viewBox="0 0 1920 1080"
          width="1920"
          height="1080"
          style={{
            position:
              "absolute",

            inset:
              0,
          }}
        >
          {/* ================================================= */}
          {/* BASE TRACK                                        */}
          {/* ================================================= */}

          <line
            x1="190"
            y1={TIMELINE_Y}
            x2="1730"
            y2={TIMELINE_Y}
            stroke={
              theme.colors.line
            }
            strokeWidth="8"
            strokeLinecap="round"
          />


          {/* ================================================= */}
          {/* ACTIVE PROGRESS                                   */}
          {/* ================================================= */}

          <line
            x1="190"
            y1={TIMELINE_Y}
            x2={
              190 +
              1540 *
                lineProgress
            }
            y2={TIMELINE_Y}
            stroke={
              theme.colors.coral
            }
            strokeWidth="8"
            strokeLinecap="round"
          />


          {/* ================================================= */}
          {/* MOVING HALO                                       */}
          {/* ================================================= */}

          <circle
            cx={
              markerX
            }
            cy={
              TIMELINE_Y
            }
            r={
              31 *
              pulse
            }
            fill="rgba(233,111,106,.11)"
          />


          {/* ================================================= */}
          {/* MOVING MARKER                                     */}
          {/* ================================================= */}

          <circle
            cx={
              markerX
            }
            cy={
              TIMELINE_Y
            }
            r="13"
            fill={
              theme.colors.coral
            }
          />
        </svg>


        {/* ================================================= */}
        {/* EVENT 1 — DEPARTURE                               */}
        {/* ================================================= */}

        <TimelineNode
          x={245}
          y={TIMELINE_Y}
          progress={p1}
          date="April 1"
          title="Ship leaves Argentina"
          detail="M/V Hondius departs Ushuaia."
          above
        >
          <RoundedCard
            width={
              MEDIA_WIDTH
            }
            height={
              MEDIA_HEIGHT
            }
          >
            <EditorialAsset
              asset={
                ASSETS
                  .outbreak
                  .harbor
              }

              width={
                MEDIA_WIDTH
              }

              height={
                MEDIA_HEIGHT
              }

              zoom={
                1
              }

              objectPosition="center 54%"

              organic={
                false
              }

              showCredit={
                false
              }
            />
          </RoundedCard>
        </TimelineNode>


        {/* ================================================= */}
        {/* EVENT 2 — FIRST SYMPTOMS                          */}
        {/* ================================================= */}

        <TimelineNode
          x={700}
          y={TIMELINE_Y}
          progress={p2}
          date="April 3"
          title="First symptoms"
          detail="The first known case becomes ill."
          above={false}
          accent={
            theme.colors.teal
          }
        >
          <RoundedCard
            width={
              MEDIA_WIDTH
            }
            height={
              MEDIA_HEIGHT
            }
          >
            {/* ================================================= */}
            {/* ILLUSTRATION BACKGROUND                           */}
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
                    #F7FBFC 0%,
                    #EDF6F8 100%
                  )
                `,
              }}
            />


            {/* ================================================= */}
            {/* PERSON                                            */}
            {/* ================================================= */}

            <div
              style={{
                position:
                  "absolute",

                left:
                  76,

                top:
                  2,

                width:
                  154,
              }}
            >
              <IllustratedPerson
                asset={
                  ASSETS
                    .characters
                    .passengerA
                }

                width={
                  154
                }

                sick={
                  0.85
                }

                cough={
                  0.2
                }

                bob={
                  0.3
                }
              />
            </div>


            {/* ================================================= */}
            {/* TEMPERATURE                                       */}
            {/* ================================================= */}

            <div
              style={{
                position:
                  "absolute",

                right:
                  14,

                top:
                  14,

                width:
                  60,

                height:
                  60,

                borderRadius:
                  "50%",

                background:
                  theme.colors.coral,

                color:
                  theme.colors.white,

                border:
                  "4px solid rgba(255,255,255,.96)",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                fontFamily:
                  FONT_STACK,

                fontWeight:
                  850,

                fontSize:
                  18,

                boxShadow:
                  "0 10px 24px rgba(233,111,106,.22)",
              }}
            >
              39°
            </div>
          </RoundedCard>
        </TimelineNode>


        {/* ================================================= */}
        {/* EVENT 3 — MEDICAL EVACUATION                     */}
        {/* ================================================= */}

        <TimelineNode
          x={1165}
          y={TIMELINE_Y}
          progress={p3}
          date="Late April"
          title="Medical evacuation"
          detail="Severely ill passengers are evacuated for care."
          above
          accent={
            theme.colors.violet
          }
        >
          <RoundedCard
            width={
              MEDIA_WIDTH
            }
            height={
              MEDIA_HEIGHT
            }
          >
            <EditorialAsset
              asset={
                ASSETS
                  .outbreak
                  .evacuation
              }

              width={
                MEDIA_WIDTH
              }

              height={
                MEDIA_HEIGHT
              }

              zoom={
                1
              }

              objectPosition="center 52%"

              organic={
                false
              }

              showCredit={
                false
              }
            />
          </RoundedCard>
        </TimelineNode>


        {/* ================================================= */}
        {/* EVENT 4 — LAB IDENTIFICATION                     */}
        {/* ================================================= */}

        <TimelineNode
          x={1620}
          y={TIMELINE_Y}
          progress={p4}
          date="May 2"
          title="Andes virus identified"
          detail="Laboratory testing identifies Andes virus."
          above={false}
          accent={
            theme.colors.sky
          }
        >
          <RoundedCard
            width={
              MEDIA_WIDTH
            }
            height={
              MEDIA_HEIGHT
            }
          >
            <EditorialAsset
              asset={
                ASSETS
                  .outbreak
                  .pcrPhoto
              }

              width={
                MEDIA_WIDTH
              }

              height={
                MEDIA_HEIGHT
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


            {/* ================================================= */}
            {/* RESULT LABEL                                      */}
            {/* ================================================= */}

            <div
              style={{
                position:
                  "absolute",

                left:
                  15,

                bottom:
                  14,

                padding:
                  "9px 14px",

                borderRadius:
                  999,

                background:
                  "rgba(255,255,255,.95)",

                border:
                  `1px solid ${theme.colors.sky}`,

                boxShadow:
                  "0 9px 22px rgba(52,42,35,.08)",

                fontFamily:
                  FONT_STACK,

                fontSize:
                  15,

                lineHeight:
                  1,

                fontWeight:
                  800,

                color:
                  theme.colors.ink,
              }}
            >
              Andes virus
            </div>
          </RoundedCard>
        </TimelineNode>
      </div>
    </div>
  );
};