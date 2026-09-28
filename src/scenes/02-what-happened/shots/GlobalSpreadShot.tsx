import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  AnimatedRoute,
} from "../../../components/visuals/AnimatedRoute";

import {
  theme,
} from "../../../theme/theme";


/* =========================================================
   TYPOGRAPHY
   Match original "Outbreak at sea" styling
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   ROUTE CANVAS

   Everything uses the same 1920 × 1080 coordinate system.
   ========================================================= */

const ROUTES = [
  {
    id:
      "north-america",

    label:
      "North America",

    sublabel:
      "Returning passengers",

    color:
      theme.colors.coral,

    d: `
      M 930 595
      C 1020 510
        1120 420
        1280 330
    `,

    start:
      18,

    end:
      92,

    points: [
      {
        progress: 0,
        x: 930,
        y: 595,
      },

      {
        progress: 0.34,
        x: 1030,
        y: 505,
      },

      {
        progress: 0.68,
        x: 1140,
        y: 410,
      },

      {
        progress: 1,
        x: 1280,
        y: 330,
      },
    ],

    labelX:
      1322,

    labelY:
      286,
  },

  {
    id:
      "europe",

    label:
      "Europe",

    sublabel:
      "International follow-up",

    color:
      theme.colors.teal,

    d: `
      M 930 595
      C 1100 540
        1310 490
        1495 445
    `,

    start:
      38,

    end:
      118,

    points: [
      {
        progress: 0,
        x: 930,
        y: 595,
      },

      {
        progress: 0.35,
        x: 1110,
        y: 535,
      },

      {
        progress: 0.70,
        x: 1310,
        y: 490,
      },

      {
        progress: 1,
        x: 1495,
        y: 445,
      },
    ],

    labelX:
      1515,

    labelY:
      405,
  },

  {
    id:
      "africa",

    label:
      "Africa / Middle East",

    sublabel:
      "Contacts monitored",

    color:
      theme.colors.coral,

    d: `
      M 930 595
      C 1110 640
        1310 700
        1495 760
    `,

    start:
      58,

    end:
      148,

    points: [
      {
        progress: 0,
        x: 930,
        y: 595,
      },

      {
        progress: 0.34,
        x: 1110,
        y: 645,
      },

      {
        progress: 0.68,
        x: 1310,
        y: 700,
      },

      {
        progress: 1,
        x: 1495,
        y: 760,
      },
    ],

    labelX:
      1450,

    labelY:
      785,
  },

  {
    id:
      "south-america",

    label:
      "South America",

    sublabel:
      "Regional follow-up",

    color:
      theme.colors.teal,

    d: `
      M 930 595
      C 780 650
        620 720
        470 790
    `,

    start:
      76,

    end:
      170,

    points: [
      {
        progress: 0,
        x: 930,
        y: 595,
      },

      {
        progress: 0.34,
        x: 780,
        y: 650,
      },

      {
        progress: 0.68,
        x: 620,
        y: 720,
      },

      {
        progress: 1,
        x: 470,
        y: 790,
      },
    ],

    labelX:
      255,

    labelY:
      785,
  },
];


/* =========================================================
   HELPERS
   ========================================================= */

const clamp = (
  value: number,
  min: number,
  max: number
) =>
  Math.max(
    min,
    Math.min(
      max,
      value
    )
  );


const interpolateRoutePosition = (
  progress: number,

  points: {
    progress: number;
    x: number;
    y: number;
  }[]
) => {
  const safeProgress =
    clamp(
      progress,
      0,
      1
    );


  for (
    let i = 0;
    i < points.length - 1;
    i++
  ) {
    const current =
      points[i];

    const next =
      points[
        i + 1
      ];


    if (
      safeProgress >=
        current.progress &&
      safeProgress <=
        next.progress
    ) {
      const local =
        (
          safeProgress -
          current.progress
        ) /
        (
          next.progress -
          current.progress
        );


      return {
        x:
          current.x +
          (
            next.x -
            current.x
          ) *
            local,

        y:
          current.y +
          (
            next.y -
            current.y
          ) *
            local,
      };
    }
  }


  return {
    x:
      points[
        points.length -
          1
      ].x,

    y:
      points[
        points.length -
          1
      ].y,
  };
};


/* =========================================================
   TRAVELER MARKER
   ========================================================= */

const TravelerMarker = ({
  x,
  y,
  opacity,
  color,
}: {
  x: number;
  y: number;
  opacity: number;
  color: string;
}) => {
  return (
    <div
      style={{
        position:
          "absolute",

        left:
          x -
          28,

        top:
          y -
          28,

        width:
          56,

        height:
          56,

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
          `4px solid ${color}`,

        boxShadow: `
          0 10px 26px rgba(31,43,56,.18),
          0 0 0 10px ${color}22
        `,

        opacity,

        zIndex:
          20,
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="7"
          r="4"
          fill={
            color
          }
        />

        <path
          d="
            M5 21
            C5.7 15.8
            8.1 13
            12 13

            C15.9 13
            18.3 15.8
            19 21
          "
          fill={
            color
          }
        />
      </svg>
    </div>
  );
};


/* =========================================================
   DESTINATION LABEL
   ========================================================= */

const DestinationLabel = ({
  label,
  sublabel,
  color,
  left,
  top,
  opacity,
}: {
  label: string;
  sublabel: string;
  color: string;
  left: number;
  top: number;
  opacity: number;
}) => (
  <div
    style={{
      position:
        "absolute",

      left,
      top,

      minWidth:
        230,

      padding:
        "15px 19px",

      borderRadius:
        20,

      background:
        "rgba(255,255,255,.95)",

      border:
        "1px solid rgba(17,39,68,.08)",

      boxShadow:
        "0 16px 38px rgba(52,42,35,.09)",

      opacity,

      transform:
        `translateY(${(1 - opacity) * 10}px)`,

      zIndex:
        18,
    }}
  >
    <div
      style={{
        display:
          "flex",

        alignItems:
          "center",

        gap:
          10,
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
            color,

          boxShadow:
            `0 0 14px ${color}66`,
        }}
      />

      <span
        style={{
          fontFamily:
            FONT_STACK,

          fontSize:
            20,

          fontWeight:
            800,

          letterSpacing:
            -0.2,

          color:
            "#263A52",
        }}
      >
        {label}
      </span>
    </div>


    <div
      style={{
        marginTop:
          5,

        marginLeft:
          20,

        fontFamily:
          FONT_STACK,

        fontSize:
          15,

        fontWeight:
          600,

        color:
          "#68788A",
      }}
    >
      {sublabel}
    </div>
  </div>
);


/* =========================================================
   CENTRAL PASSENGER HUB
   ========================================================= */

const PassengerHub = ({
  progress,
}: {
  progress: number;
}) => (
  <div
    style={{
      position:
        "absolute",

      left:
        930 -
        100,

      top:
        595 -
        100,

      width:
        200,

      height:
        200,

      borderRadius:
        "50%",

      display:
        "flex",

      flexDirection:
        "column",

      alignItems:
        "center",

      justifyContent:
        "center",

      background: `
        radial-gradient(
          circle,
          rgba(255,255,255,.98) 0%,
          rgba(255,255,255,.94) 65%,
          rgba(255,255,255,.82) 100%
        )
      `,

      border:
        "2px solid rgba(17,39,68,.08)",

      boxShadow: `
        0 24px 60px rgba(45,48,57,.14),
        0 0 0 18px rgba(101,167,232,.08)
      `,

      opacity:
        progress,

      transform:
        `scale(${0.88 + progress * 0.12})`,

      zIndex:
        22,
    }}
  >
    <div
      style={{
        width:
          66,

        height:
          66,

        borderRadius:
          "50%",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          "#17243A",

        boxShadow:
          "0 0 0 11px rgba(35,48,74,.10)",
      }}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="7"
          r="4"
          fill="#FFFFFF"
        />

        <path
          d="
            M5 21
            C5.7 15.8
            8.1 13
            12 13

            C15.9 13
            18.3 15.8
            19 21
          "
          fill="#FFFFFF"
        />
      </svg>
    </div>


    <div
      style={{
        marginTop:
          14,

        fontFamily:
          FONT_STACK,

        fontSize:
          14,

        fontWeight:
          800,

        letterSpacing:
          1.7,

        textTransform:
          "uppercase",

        color:
          "#7E8998",
      }}
    >
      Cruise passengers
    </div>


    <div
      style={{
        marginTop:
          4,

        fontFamily:
          FONT_STACK,

        fontSize:
          21,

        fontWeight:
          800,

        letterSpacing:
          -0.3,

        color:
          "#263A52",
      }}
    >
      Disembark
    </div>
  </div>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const GlobalSpreadShot = () => {
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
          90,
      },
    });


  /* =======================================================
     HUB
     ======================================================= */

  const hubIn =
    spring({
      frame:
        frame -
        8,

      fps,

      config: {
        damping:
          170,

        stiffness:
          90,
      },
    });


  /* =======================================================
     STAT
     ======================================================= */

  const statIn =
    spring({
      frame:
        frame -
        110,

      fps,

      config: {
        damping:
          170,

        stiffness:
          84,
      },
    });


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
            #FAF8F3 100%
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
              rgba(34,55,72,.15) .7px,
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
          SUBTLE CENTRAL GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            570,

          top:
            300,

          width:
            720,

          height:
            590,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(101,167,232,.10) 0%,
              rgba(101,167,232,.05) 44%,
              rgba(101,167,232,0) 76%
            )
          `,
        }}
      />


      {/* ===================================================
          TITLE
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            86,

          top:
            76,

          width:
            980,

          opacity:
            titleIn,

          transform:
            `translateY(${(1 - titleIn) * 16}px)`,

          zIndex:
            30,
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
              11,

            padding:
              "11px 17px",

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
                "#F26A60",
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                16,

              lineHeight:
                1,

              fontWeight:
                800,

              letterSpacing:
                2.5,

              textTransform:
                "uppercase",

              color:
                "#168894",
            }}
          >
            After the voyage
          </span>
        </div>


        {/* Main title */}

        <div
          style={{
            marginTop:
              22,

            fontFamily:
              TITLE_STACK,

            fontSize:
              86,

            lineHeight:
              0.9,

            fontWeight:
              840,

            letterSpacing:
              -4.6,

            color:
              "#17243A",
          }}
        >
          Passengers disperse
          <br />

          internationally.
        </div>


        {/* Description */}

        <div
          style={{
            marginTop:
              28,

            width:
              720,

            fontFamily:
              FONT_STACK,

            fontSize:
              31,

            lineHeight:
              1.35,

            fontWeight:
              600,

            letterSpacing:
              -0.5,

            color:
              "#566A82",
          }}
        >
          Once passengers leave the ship and return home,
          the outbreak becomes an international
          contact-tracing problem.
        </div>
      </div>


      {/* ===================================================
          ROUTE NETWORK
          =================================================== */}

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
        {ROUTES.map(
          route => {
            const routeProgress =
              interpolate(
                frame,

                [
                  route.start,
                  route.end,
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


            const traveler =
              interpolateRoutePosition(
                routeProgress,
                route.points
              );


            const travelerOpacity =
              interpolate(
                routeProgress,

                [
                  0,
                  0.05,
                  0.92,
                  1,
                ],

                [
                  0,
                  1,
                  1,
                  0.85,
                ],

                {
                  extrapolateLeft:
                    "clamp",

                  extrapolateRight:
                    "clamp",
                }
              );


            const labelOpacity =
              interpolate(
                frame,

                [
                  route.end -
                    16,

                  route.end +
                    12,
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
                  route.id
                }
              >
                {/* Route glow */}

                <AnimatedRoute
                  d={
                    route.d
                  }

                  viewBox="0 0 1920 1080"

                  width={
                    1920
                  }

                  height={
                    1080
                  }

                  startFrame={
                    route.start
                  }

                  endFrame={
                    route.end
                  }

                  stroke={
                    `${route.color}33`
                  }

                  strokeWidth={
                    18
                  }

                  opacity={
                    1
                  }

                  followerRadius={
                    0
                  }

                  followerColor="transparent"

                  followerOutline="transparent"
                />


                {/* Main route */}

                <AnimatedRoute
                  d={
                    route.d
                  }

                  viewBox="0 0 1920 1080"

                  width={
                    1920
                  }

                  height={
                    1080
                  }

                  startFrame={
                    route.start
                  }

                  endFrame={
                    route.end
                  }

                  stroke={
                    route.color
                  }

                  strokeWidth={
                    7
                  }

                  opacity={
                    0.95
                  }

                  followerRadius={
                    0
                  }

                  followerColor="transparent"

                  followerOutline="transparent"
                />


                {/* Moving traveler */}

                <TravelerMarker
                  x={
                    traveler.x
                  }

                  y={
                    traveler.y
                  }

                  color={
                    route.color
                  }

                  opacity={
                    travelerOpacity
                  }
                />


                {/* Destination */}

                <DestinationLabel
                  label={
                    route.label
                  }

                  sublabel={
                    route.sublabel
                  }

                  color={
                    route.color
                  }

                  left={
                    route.labelX
                  }

                  top={
                    route.labelY
                  }

                  opacity={
                    labelOpacity
                  }
                />
              </div>
            );
          }
        )}
      </div>


      {/* ===================================================
          CENTRAL PASSENGER HUB
          =================================================== */}

      <PassengerHub
        progress={
          hubIn
        }
      />


      {/* ===================================================
          STAT CARD
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            86,

          bottom:
            104,

          width:
            440,

          padding:
            "24px 28px",

          borderRadius:
            28,

          background:
            "rgba(255,255,255,.96)",

          border:
            "1px solid rgba(17,39,68,.08)",

          boxShadow:
            "0 18px 46px rgba(52,42,35,.09)",

          opacity:
            statIn,

          transform:
            `translateY(${(1 - statIn) * 18}px)`,

          zIndex:
            30,
        }}
      >
        {/* Eyebrow */}

        <div
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
              "#B14E49",
          }}
        >
          International response
        </div>


        {/* Number */}

        <div
          style={{
            marginTop:
              8,

            fontFamily:
              TITLE_STACK,

            fontSize:
              62,

            lineHeight:
              0.95,

            fontWeight:
              850,

            letterSpacing:
              -3,

            color:
              "#17243A",
          }}
        >
          600+
        </div>


        {/* Supporting stat */}

        <div
          style={{
            marginTop:
              8,

            fontFamily:
              FONT_STACK,

            fontSize:
              25,

            lineHeight:
              1.28,

            fontWeight:
              700,

            letterSpacing:
              -0.35,

            color:
              "#2C4159",
          }}
        >
          contacts across
          <br />

          32 countries
          <br />

          and territories
        </div>
      </div>
    </div>
  );
};