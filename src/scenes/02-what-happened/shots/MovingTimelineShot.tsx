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
  CinematicCamera,
} from "../../../components/camera/CinematicCamera";

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
        30,

      background:
        theme.colors.white,

      border:
        `1px solid ${theme.colors.line}`,

      boxShadow:
        "0 20px 48px rgba(52,42,35,.12)",
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


  const cardY =
    above
      ? y - 320
      : y + 58;


  const stemTop =
    above
      ? y - 110
      : y + 18;


  const stemHeight =
    92;


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
            x - 4,

          top:
            stemTop,

          width:
            8,

          height:
            stemHeight,

          borderRadius:
            999,

          background:
            accent,

          opacity:
            p,

          transform:
            `scaleY(${p})`,

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
            x - 18,

          top:
            y - 18,

          width:
            36,

          height:
            36,

          borderRadius:
            "50%",

          background:
            theme.colors.white,

          border:
            `7px solid ${accent}`,

          opacity:
            p,

          transform:
            `scale(${0.72 + p * 0.28})`,

          boxShadow:
            `
              0
              0
              0
              12px
              rgba(
                233,
                111,
                106,
                .10
              )
            `,
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
            x - 170,

          top:
            cardY,

          width:
            340,

          opacity:
            p,

          transform: `
            translateY(
              ${
                (
                  1 -
                  p
                ) *
                (
                  above
                    ? 28
                    : -28
                )
              }px
            )

            scale(
              ${
                0.93 +
                p *
                  0.07
              }
            )
          `,

          transformOrigin:
            above
              ? "bottom center"
              : "top center",
        }}
      >
        {children}


        {/* DATE */}

        <div
          style={{
            marginTop:
              15,

            fontFamily:
              FONT_STACK,

            fontSize:
              19,

            fontWeight:
              850,

            letterSpacing:
              2.2,

            textTransform:
              "uppercase",

            color:
              accent,
          }}
        >
          {date}
        </div>


        {/* TITLE */}

        <div
          style={{
            marginTop:
              7,

            fontFamily:
              TITLE_STACK,

            fontSize:
              34,

            lineHeight:
              1.02,

            fontWeight:
              800,

            letterSpacing:
              -1.3,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        {/* DETAIL */}

        {detail ? (
          <div
            style={{
              marginTop:
                9,

              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              lineHeight:
                1.34,

              fontWeight:
                520,

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
     FIXED HEADER ENTRANCE
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
     ======================================================= */

  const p1 =
    spring({
      frame:
        frame -
        10,

      fps,

      config: {
        damping:
          160,

        stiffness:
          120,
      },
    });


  const p2 =
    spring({
      frame:
        frame -
        65,

      fps,

      config: {
        damping:
          160,

        stiffness:
          120,
      },
    });


  const p3 =
    spring({
      frame:
        frame -
        130,

      fps,

      config: {
        damping:
          160,

        stiffness:
          120,
      },
    });


  const p4 =
    spring({
      frame:
        frame -
        195,

      fps,

      config: {
        damping:
          160,

        stiffness:
          120,
      },
    });


  /* =======================================================
     TIMELINE PROGRESS
     ======================================================= */

  const lineProgress =
    interpolate(
      frame,
      [
        0,
        300,
      ],
      [
        0.03,
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
      frame,
      [
        0,
        300,
      ],
      [
        255,
        1635,
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
            54,

          zIndex:
            30,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${(1 - headerProgress) * 18}px
            )
          `,
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
              13,
          }}
        >
          <span
            style={{
              width:
                38,

              height:
                4,

              borderRadius:
                999,

              background:
                "#0E8D97",
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
              1120,

            fontFamily:
              TITLE_STACK,

            fontSize:
              76,

            lineHeight:
              0.94,

            fontWeight:
              830,

            letterSpacing:
              -3.8,

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
              19,

            width:
              1100,

            fontFamily:
              FONT_STACK,

            fontSize:
              29,

            lineHeight:
              1.38,

            fontWeight:
              540,

            letterSpacing:
              -0.45,

            color:
              "#596D82",
          }}
        >
          The ship leaves Argentina, symptoms appear,
          a medical evacuation follows, and laboratory
          testing identifies the cause.
        </div>
      </div>


      {/* ================================================= */}
      {/* TIMELINE CAMERA                                  */}
      {/* ONLY THIS SECTION ZOOMS / PANS                    */}
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
  {/* =================================================== */}
  {/* TIMELINE LINE                                      */}
  {/* =================================================== */}

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
    <line
      x1="220"
      y1="680"
      x2="1710"
      y2="680"
      stroke={
        theme.colors.line
      }
      strokeWidth="10"
      strokeLinecap="round"
    />

    <line
      x1="220"
      y1="680"
      x2={
        220 +
        1490 *
          lineProgress
      }
      y2="680"
      stroke={
        theme.colors.coral
      }
      strokeWidth="10"
      strokeLinecap="round"
    />

    <circle
      cx={
        markerX
      }
      cy="680"
      r="38"
      fill="rgba(233,111,106,.13)"
    />

    <circle
      cx={
        markerX
      }
      cy="680"
      r="17"
      fill={
        theme.colors.coral
      }
    />
  </svg>


  <TimelineNode
    x={270}
    y={680}
    progress={p1}
    date="April 1"
    title="Ship leaves Argentina"
    detail="M/V Hondius departs Ushuaia."
    above
  >
    <RoundedCard
      width={320}
      height={180}
    >
      <EditorialAsset
        asset={
          ASSETS
            .outbreak
            .harbor
        }
        width={320}
        height={180}
        zoom={1}
        objectPosition="center 54%"
        organic={false}
        showCredit={false}
      />
    </RoundedCard>
  </TimelineNode>


  <TimelineNode
    x={715}
    y={680}
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
      width={320}
      height={190}
    >
      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          background:
            `
              linear-gradient(
                180deg,
                #F7FBFC 0%,
                #EDF6F8 100%
              )
            `,
        }}
      />

      <div
        style={{
          position:
            "absolute",

          left:
            70,

          top:
            4,

          width:
            178,
        }}
      >
        <IllustratedPerson
          asset={
            ASSETS
              .characters
              .passengerA
          }
          width={178}
          sick={0.85}
          cough={0.2}
          bob={0.3}
        />
      </div>

      <div
        style={{
          position:
            "absolute",

          right:
            18,

          top:
            18,

          width:
            64,

          height:
            64,

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
            19,

          boxShadow:
            "0 10px 24px rgba(233,111,106,.22)",
        }}
      >
        39°
      </div>
    </RoundedCard>
  </TimelineNode>


  <TimelineNode
    x={1160}
    y={680}
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
      width={320}
      height={180}
    >
      <EditorialAsset
        asset={
          ASSETS
            .outbreak
            .evacuation
        }
        width={320}
        height={180}
        zoom={1}
        objectPosition="center 52%"
        organic={false}
        showCredit={false}
      />

      <div
        style={{
          position:
            "absolute",

          right:
            16,

          top:
            16,

          width:
            56,

          height:
            56,

          borderRadius:
            "50%",

          background:
            "rgba(255,255,255,.95)",

          border:
            `3px solid ${theme.colors.violet}`,

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          color:
            theme.colors.violet,

          fontFamily:
            FONT_STACK,

          fontSize:
            33,

          lineHeight:
            1,

          fontWeight:
            700,

          boxShadow:
            "0 10px 24px rgba(52,42,35,.10)",
        }}
      >
        +
      </div>
    </RoundedCard>
  </TimelineNode>


  <TimelineNode
    x={1600}
    y={680}
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
      width={320}
      height={180}
    >
      <EditorialAsset
        asset={
          ASSETS
            .outbreak
            .pcrPhoto
        }
        width={320}
        height={180}
        zoom={1}
        objectPosition="center"
        organic={false}
        showCredit={false}
      />

      <div
        style={{
          position:
            "absolute",

          left:
            18,

          bottom:
            16,

          padding:
            "10px 15px",

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
            16,

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