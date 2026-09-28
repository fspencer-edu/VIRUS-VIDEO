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
   ROUTE CANVAS

   Everything uses the same 1920 × 1080 coordinate system.
   ========================================================= */

const ROUTES = [
  {
    id: "north-america",

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
    id: "europe",

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
    id: "africa",

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
    id: "south-america",

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

const clamp =
  (
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
      points[i + 1];


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
          fill={color}
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
          fill={color}
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
        220,

      padding:
        "14px 18px",

      borderRadius:
        20,

      background:
        "rgba(255,255,255,.95)",

      border:
        `1px solid ${theme.colors.line}`,

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
            theme.fonts.body,

          fontSize:
            19,

          fontWeight:
            800,

          color:
            theme.colors.ink,
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
          theme.fonts.body,

        fontSize:
          14,

        fontWeight:
          600,

        color:
          theme.colors.muted,
      }}
    >
      {sublabel}
    </div>
  </div>
);


/* =========================================================
   CENTRAL HUB
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
        95,

      top:
        595 -
        95,

      width:
        190,

      height:
        190,

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
        `2px solid ${theme.colors.line}`,

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
          62,

        height:
          62,

        borderRadius:
          "50%",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          theme.colors.navy,

        boxShadow:
          "0 0 0 11px rgba(35,48,74,.10)",
      }}
    >
      <svg
        width="32"
        height="32"
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
          theme.fonts.body,

        fontSize:
          14,

        fontWeight:
          800,

        letterSpacing:
          1.7,

        textTransform:
          "uppercase",

        color:
          theme.colors.muted,
      }}
    >
      Cruise passengers
    </div>

    <div
      style={{
        marginTop:
          3,

        fontFamily:
          theme.fonts.body,

        fontSize:
          19,

        fontWeight:
          800,

        color:
          theme.colors.ink,
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
            82,

          width:
            960,

          opacity:
            titleIn,

          transform:
            `translateY(${(1 - titleIn) * 16}px)`,

          zIndex:
            30,
        }}
      >
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
              "rgba(101,167,232,.14)",

            color:
              theme.colors.sky,

            fontFamily:
              theme.fonts.body,

            fontSize:
              17,

            fontWeight:
              850,

            letterSpacing:
              2.3,

            textTransform:
              "uppercase",
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
                theme.colors.sky,
            }}
          />

          After the voyage
        </div>


        <div
          style={{
            marginTop:
              20,

            fontFamily:
              theme.fonts.display,

            fontSize:
              76,

            lineHeight:
              0.98,

            fontWeight:
              700,

            letterSpacing:
              -2.7,

            color:
              theme.colors.ink,
          }}
        >
          Passengers disperse
          <br />
          internationally.
        </div>


        <div
          style={{
            marginTop:
              22,

            width:
              720,

            fontFamily:
              theme.fonts.body,

            fontSize:
              29,

            lineHeight:
              1.4,

            fontWeight:
              520,

            letterSpacing:
              -0.35,

            color:
              theme.colors.muted,
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
          (
            route
          ) => {
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
            `1px solid ${theme.colors.line}`,

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
        <div
          style={{
            fontFamily:
              theme.fonts.body,

            fontSize:
              15,

            fontWeight:
              850,

            letterSpacing:
              2,

            textTransform:
              "uppercase",

            color:
              theme.colors.coralDark,
          }}
        >
          International response
        </div>


        <div
          style={{
            marginTop:
              8,

            fontFamily:
              theme.fonts.display,

            fontSize:
              52,

            lineHeight:
              1,

            fontWeight:
              700,

            color:
              theme.colors.ink,
          }}
        >
          600+
        </div>


        <div
          style={{
            marginTop:
              4,

            fontFamily:
              theme.fonts.body,

            fontSize:
              25,

            lineHeight:
              1.28,

            fontWeight:
              700,

            color:
              theme.colors.ink,
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