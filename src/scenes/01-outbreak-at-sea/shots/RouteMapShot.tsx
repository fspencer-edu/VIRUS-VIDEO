import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  AnimatedRoute,
} from "../../../components/visuals/AnimatedRoute";


const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';


const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   ROUTE CANVAS
   ========================================================= */

const ROUTE_WIDTH =
  1208;


const ROUTE_HEIGHT =
  892;


/* =========================================================
   ROUTE
   ========================================================= */

const routePath = `
  M 130 710

  C 250 735
    340 680
    420 610

  C 500 542
    535 485
    575 430

  C 630 355
    700 332
    770 318

  C 850 302
    920 250
    972 192

  C 1022 138
    1064 112
    1110 96
`;


/* =========================================================
   STOPS
   ========================================================= */

type RouteStop = {
  x: number;
  y: number;

  label:
    string;

  date:
    string;

  align:
    "left" |
    "right";

  labelOffsetX:
    number;

  labelOffsetY:
    number;
};


const stops:
  RouteStop[] = [
    {
      x:
        130,

      y:
        710,

      label:
        "Ushuaia",

      date:
        "April 1",

      align:
        "left",

      labelOffsetX:
        -10,

      labelOffsetY:
        42,
    },

    {
      x:
        420,

      y:
        610,

      label:
        "South Georgia",

      date:
        "April 11",

      align:
        "left",

      labelOffsetX:
        -20,

      labelOffsetY:
        40,
    },

    {
      x:
        575,

      y:
        430,

      label:
        "Gough Island",

      date:
        "April 17",

      align:
        "right",

      labelOffsetX:
        34,

      labelOffsetY:
        -14,
    },

    {
      x:
        690,

      y:
        340,

      label:
        "Tristan da Cunha",

      date:
        "April 13",

      align:
        "left",

      labelOffsetX:
        -190,

      labelOffsetY:
        -64,
    },

    {
      x:
        770,

      y:
        318,

      label:
        "St Helena",

      date:
        "April 22",

      align:
        "right",

      labelOffsetX:
        34,

      labelOffsetY:
        12,
    },

    {
      x:
        972,

      y:
        192,

      label:
        "Ascension Island",

      date:
        "April 27",

      align:
        "left",

      labelOffsetX:
        -222,

      labelOffsetY:
        -54,
    },

    {
      x:
        1110,

      y:
        96,

      label:
        "Cape Verde",

      date:
        "May 6",

      align:
        "left",

      labelOffsetX:
        -170,

      labelOffsetY:
        24,
    },
  ];


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
   INFO PILL
   ========================================================= */

const InfoPill = ({
  color,
  children,
}: {
  color:
    string;

  children:
    React.ReactNode;
}) => (
  <div
    style={{
      display:
        "flex",

      alignItems:
        "center",

      gap:
        13,

      padding:
        "15px 18px",

      borderRadius:
        18,

      background:
        "rgba(255,255,255,.065)",

      border:
        "1px solid rgba(255,255,255,.11)",

      boxShadow:
        "0 10px 26px rgba(0,0,0,.10)",

      backdropFilter:
        "blur(10px)",
    }}
  >
    <span
      style={{
        width:
          10,

        height:
          10,

        flex:
          "0 0 auto",

        borderRadius:
          "50%",

        background:
          color,

        boxShadow:
          `0 0 16px ${color}55`,
      }}
    />

    <span
      style={{
        fontFamily:
          FONT_STACK,

        fontSize:
          19,

        lineHeight:
          1.18,

        fontWeight:
          730,

        color:
          "#FFFFFF",
      }}
    >
      {children}
    </span>
  </div>
);


/* =========================================================
   DESTINATION LABEL
   ========================================================= */

const DestinationLabel = ({
  stop,
  index,
  frame,
  progress,
}: {
  stop:
    RouteStop;

  index:
    number;

  frame:
    number;

  progress:
    number;
}) => {
  const start =
    10 +
    index *
      15;


  const reveal =
    interpolate(
      frame,
      [
        start,
        start +
          24,
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


  const stopProgress =
    index /
    (
      stops.length -
      1
    );


  const activeDistance =
    Math.abs(
      progress -
      stopProgress
    );


  const active =
    interpolate(
      activeDistance,
      [
        0,
        0.13,
      ],
      [
        1,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const labelWidth =
    stop.label ===
    "Tristan da Cunha"
      ? 190
      : stop.label ===
          "Ascension Island"
        ? 180
        : 150;


  return (
    <>
      {/* ================================================= */}
      {/* DOT                                               */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            stop.x -
            10,

          top:
            stop.y -
            10,

          width:
            20,

          height:
            20,

          borderRadius:
            "50%",

          background:
            active >
            0.25
              ? "#FF8E85"
              : "#7FD8D2",

          opacity:
            reveal,

          transform:
            `scale(${0.8 + active * 0.4})`,

          boxShadow:
            active >
            0.25
              ? `
                  0
                  0
                  0
                  10px
                  rgba(
                    255,
                    142,
                    133,
                    .12
                  ),

                  0
                  0
                  28px
                  rgba(
                    255,
                    142,
                    133,
                    .32
                  )
                `
              : `
                  0
                  0
                  0
                  8px
                  rgba(
                    127,
                    216,
                    210,
                    .10
                  )
                `,

          zIndex:
            12,
        }}
      />


      {/* ================================================= */}
      {/* LABEL                                             */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            stop.x +
            stop.labelOffsetX,

          top:
            stop.y +
            stop.labelOffsetY,

          width:
            labelWidth,

          opacity:
            reveal,

          transform: `
            translateY(
              ${(1 - reveal) * 10}px
            )
          `,

          textAlign:
            stop.align,

          zIndex:
            14,
        }}
      >
        <div
          style={{
            fontFamily:
              FONT_STACK,

            fontSize:
              active >
              0.25
                ? 22
                : 19,

            lineHeight:
              1.16,

            fontWeight:
              active >
              0.25
                ? 800
                : 700,

            color:
              active >
              0.25
                ? "#FFFFFF"
                : "rgba(239,248,248,.82)",

            textShadow:
              "0 2px 10px rgba(0,0,0,.28)",
          }}
        >
          {stop.label}
        </div>


        <div
          style={{
            marginTop:
              5,

            fontFamily:
              FONT_STACK,

            fontSize:
              14,

            lineHeight:
              1,

            fontWeight:
              650,

            letterSpacing:
              0.5,

            color:
              active >
              0.25
                ? "#FFAAA3"
                : "rgba(127,216,210,.72)",
          }}
        >
          {stop.date}
        </div>
      </div>
    </>
  );
};


/* =========================================================
   SHIP
   ========================================================= */

const MovingShip = ({
  frame,
  progress,
}: {
  frame:
    number;

  progress:
    number;
}) => {
  /*
   * Piecewise positioning keeps the ship
   * close to the actual path.
   */
  const shipX =
    interpolate(
      progress,
      [
        0,
        0.17,
        0.34,
        0.5,
        0.67,
        0.84,
        1,
      ],
      [
        130,
        300,
        420,
        575,
        770,
        972,
        1110,
      ]
    );


  const shipY =
    interpolate(
      progress,
      [
        0,
        0.17,
        0.34,
        0.5,
        0.67,
        0.84,
        1,
      ],
      [
        710,
        682,
        610,
        430,
        318,
        192,
        96,
      ]
    ) +
    Math.sin(
      frame /
        10
    ) *
      3;


  const rotation =
    interpolate(
      progress,
      [
        0,
        0.18,
        0.4,
        0.7,
        1,
      ],
      [
        -8,
        -14,
        -24,
        -30,
        -32,
      ]
    );


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          shipX -
          92,

        top:
          shipY -
          55,

        width:
          184,

        height:
          108,

        transform:
          `rotate(${rotation}deg)`,

        transformOrigin:
          "50% 65%",

        filter:
          `
            drop-shadow(
              0
              14px
              20px
              rgba(
                0,
                0,
                0,
                .42
              )
            )
          `,

        zIndex:
          20,
      }}
    >
      <Img
        src={staticFile(
          "assets/outbreak/ship-cutout.png"
        )}
        style={{
          width:
            "100%",

          height:
            "100%",

          objectFit:
            "contain",
        }}
      />
    </div>
  );
};


/* =========================================================
   SOURCE SAFE AREA
   ========================================================= */

const SourceSafeArea = () => (
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
        64,

      background: `
        linear-gradient(
          180deg,

          rgba(
            10,
            16,
            30,
            0
          ),

          rgba(
            10,
            16,
            30,
            .98
          )
          64%
        )
      `,

      pointerEvents:
        "none",

      zIndex:
        50,
    }}
  />
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const RouteMapShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     ENTRANCE
     ======================================================= */

  const copyIn =
    spring({
      frame,

      fps,

      config: {
        damping:
          180,

        stiffness:
          86,
      },
    });


  const routeIn =
    spring({
      frame:
        frame -
        6,

      fps,

      config: {
        damping:
          180,

        stiffness:
          80,
      },
    });


  const routeEntrance =
    clamp01(
      routeIn
    );


  /* =======================================================
     ROUTE PROGRESS
     ======================================================= */

  const progress =
    interpolate(
      frame,
      [
        18,
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

            #091421
            0%,

            #0D1E32
            100%
          )
        `,
      }}
    >

      {/* ================================================= */}
      {/* BACKGROUND GLOWS                                 */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          background: `
            radial-gradient(
              circle at 77% 28%,

              rgba(
                44,
                103,
                151,
                .20
              ),

              transparent
              34%
            ),

            radial-gradient(
              circle at 22% 80%,

              rgba(
                13,
                145,
                159,
                .15
              ),

              transparent
              29%
            )
          `,
        }}
      />


      {/* ================================================= */}
      {/* SUBTLE TEXTURE                                   */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          opacity:
            0.08,

          backgroundImage: `
            radial-gradient(
              circle,

              rgba(
                255,
                255,
                255,
                .25
              )
              .7px,

              transparent
              .8px
            )
          `,

          backgroundSize:
            "9px 9px",

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
            86,

          top:
            96,

          width:
            530,

          opacity:
            copyIn,

          transform: `
            translateX(
              ${(1 - copyIn) * -20}px
            )
          `,

          zIndex:
            20,
        }}
      >

        {/* Eyebrow */}

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
                34,

              height:
                4,

              borderRadius:
                999,

              background:
                "#7FD8D2",
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
                "#7FD8D2",
            }}
          >
            Voyage route
          </div>
        </div>


        {/* ================================================= */}
        {/* TITLE                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            fontFamily:
              TITLE_STACK,

            fontSize:
              88,

            lineHeight:
              0.89,

            fontWeight:
              820,

            letterSpacing:
              -4.5,

            color:
              "#F7F3ED",
          }}
        >
          Into the
          <br />

          South Atlantic
        </div>


        {/* ================================================= */}
        {/* DESCRIPTION                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              30,

            width:
              480,

            fontFamily:
              FONT_STACK,

            fontSize:
              30,

            lineHeight:
              1.39,

            letterSpacing:
              -0.4,

            color:
              "rgba(245,241,234,.78)",

            fontWeight:
              540,
          }}
        >
          Follow the ship from Ushuaia through a chain of
          remote South Atlantic stops.
        </div>


        {/* ================================================= */}
        {/* INFO PILLS                                        */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              38,

            display:
              "grid",

            gap:
              13,

            width:
              390,
          }}
        >
          <InfoPill
            color="#F26A60"
          >
            M/V Hondius voyage
          </InfoPill>

          <InfoPill
            color="#7FD8D2"
          >
            Departure: Ushuaia, Argentina
          </InfoPill>
        </div>
      </div>


      {/* ================================================= */}
      {/* ROUTE PANEL                                      */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            56,

          top:
            72,

          width:
            ROUTE_WIDTH,

          height:
            ROUTE_HEIGHT,

          overflow:
            "hidden",

          borderRadius:
            38,

          border:
            "2px solid rgba(142,210,219,.18)",

          background: `
            linear-gradient(
              145deg,

              rgba(
                17,
                43,
                65,
                .96
              )
              0%,

              rgba(
                9,
                25,
                43,
                .98
              )
              52%,

              rgba(
                8,
                20,
                35,
                1
              )
              100%
            )
          `,

          boxShadow: `
            0
            34px
            80px
            rgba(
              0,
              0,
              0,
              .36
            ),

            0
            12px
            28px
            rgba(
              0,
              0,
              0,
              .18
            )
          `,

          opacity:
            routeEntrance,

          transform: `
            translateX(
              ${(1 - routeEntrance) * 24}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* WATER / ATLANTIC TEXTURE                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background: `
              radial-gradient(
                ellipse
                at
                30%
                72%,

                rgba(
                  23,
                  114,
                  144,
                  .22
                )
                0%,

                transparent
                34%
              ),

              radial-gradient(
                ellipse
                at
                80%
                24%,

                rgba(
                  58,
                  116,
                  151,
                  .18
                )
                0%,

                transparent
                30%
              )
            `,
          }}
        />


        {/* ================================================= */}
        {/* ABSTRACT LATITUDE LINES                          */}
        {/* ================================================= */}

        {[170, 340, 510, 680].map(
          (
            y,
            index
          ) => (
            <div
              key={
                y
              }
              style={{
                position:
                  "absolute",

                left:
                  70,

                right:
                  70,

                top:
                  y,

                height:
                  1,

                background:
                  "rgba(127,216,210,.08)",

                transform:
                  `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
              }}
            />
          )
        )}


        {/* ================================================= */}
        {/* ROUTE                                           */}
        {/* ================================================= */}

        <AnimatedRoute
          d={
            routePath
          }

          viewBox={`0 0 ${ROUTE_WIDTH} ${ROUTE_HEIGHT}`}

          width={
            ROUTE_WIDTH
          }

          height={
            ROUTE_HEIGHT
          }

          startFrame={
            12
          }

          endFrame={
            132
          }

          stroke="#FF8E85"

          strokeWidth={
            9
          }

          followerRadius={
            0
          }

          followerColor="transparent"

          followerOutline="transparent"
        />


        {/* ================================================= */}
        {/* DESTINATIONS                                     */}
        {/* ================================================= */}

        {stops.map(
          (
            stop,
            index
          ) => (
            <DestinationLabel
              key={
                stop.label
              }
              stop={
                stop
              }
              index={
                index
              }
              frame={
                frame
              }
              progress={
                progress
              }
            />
          )
        )}


        {/* ================================================= */}
        {/* MOVING SHIP                                      */}
        {/* ================================================= */}

        <MovingShip
          frame={
            frame
          }
          progress={
            progress
          }
        />


        {/* ================================================= */}
        {/* PANEL TITLE                                      */}
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
              "rgba(8,20,34,.72)",

            border:
              "1px solid rgba(255,255,255,.12)",

            backdropFilter:
              "blur(12px)",

            zIndex:
              30,
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
                "#7FD8D2",
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                15,

              fontWeight:
                800,

              letterSpacing:
                1.7,

              textTransform:
                "uppercase",

              color:
                "#E8FFFC",
            }}
          >
            South Atlantic voyage
          </span>
        </div>


        {/* ================================================= */}
        {/* VESSEL LABEL                                     */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              30,

            bottom:
              28,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              13,

            padding:
              "13px 17px",

            borderRadius:
              18,

            background:
              "rgba(7,18,31,.82)",

            border:
              "1px solid rgba(255,255,255,.12)",

            backdropFilter:
              "blur(14px)",

            boxShadow:
              "0 12px 30px rgba(0,0,0,.18)",

            zIndex:
              30,
          }}
        >
          <div
            style={{
              width:
                11,

              height:
                11,

              borderRadius:
                "50%",

              background:
                "#FF8E85",

              boxShadow:
                "0 0 14px rgba(255,142,133,.50)",
            }}
          />

          <div>
            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  13,

                fontWeight:
                  800,

                letterSpacing:
                  1.7,

                textTransform:
                  "uppercase",

                color:
                  "#7FD8D2",
              }}
            >
              Tracking vessel
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
                  750,

                color:
                  "#FFFFFF",
              }}
            >
              M/V Hondius
            </div>
          </div>
        </div>


        {/* ================================================= */}
        {/* REGION LABEL                                     */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              38,

            bottom:
              34,

            fontFamily:
              FONT_STACK,

            fontSize:
              68,

            fontWeight:
              800,

            letterSpacing:
              -3,

            color:
              "rgba(127,216,210,.045)",

            textTransform:
              "uppercase",

            pointerEvents:
              "none",
          }}
        >
          South Atlantic
        </div>
      </div>


      <SourceSafeArea />
    </div>
  );
};