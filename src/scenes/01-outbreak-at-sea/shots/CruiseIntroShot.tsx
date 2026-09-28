import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";


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
   SUN + FULL-SCREEN LIGHT
   ========================================================= */

const Sun = ({
  progress,
  frame,
}: {
  progress: number;
  frame: number;
}) => {
  const sunScale =
    0.9 +
    progress *
      0.1;


  const lightPulse =
    0.98 +
    Math.sin(
      frame /
        34
    ) *
      0.02;


  const drift =
    Math.sin(
      frame /
        58
    ) *
      10;


  return (
    <>
      {/* ================================================= */}
      {/* FULL-SCREEN LIGHT WASH                           */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          pointerEvents:
            "none",

          opacity:
            progress *
            0.28,

          transform: `
            translateX(${drift}px)
            scale(${lightPulse})
          `,

          transformOrigin:
            "100% 0%",

          background: `
            radial-gradient(
              ellipse at 92% 6%,
              rgba(
                255,
                222,
                145,
                .34
              )
              0%,

              rgba(
                255,
                229,
                167,
                .20
              )
              22%,

              rgba(
                255,
                237,
                193,
                .10
              )
              45%,

              rgba(
                255,
                244,
                219,
                .04
              )
              67%,

              rgba(
                255,
                248,
                235,
                0
              )
              90%
            ),

            linear-gradient(
              136deg,

              rgba(
                255,
                241,
                205,
                0
              )
              0%,

              rgba(
                255,
                233,
                177,
                .025
              )
              22%,

              rgba(
                255,
                224,
                148,
                .10
              )
              38%,

              rgba(
                255,
                235,
                190,
                .045
              )
              54%,

              rgba(
                255,
                245,
                220,
                0
              )
              76%
            ),

            linear-gradient(
              146deg,

              rgba(
                255,
                243,
                211,
                0
              )
              8%,

              rgba(
                255,
                231,
                174,
                .075
              )
              40%,

              rgba(
                255,
                239,
                201,
                .03
              )
              62%,

              rgba(
                255,
                248,
                232,
                0
              )
              84%
            )
          `,

          filter:
            "blur(10px)",

          zIndex:
            5,
        }}
      />


      {/* ================================================= */}
      {/* SUBTLE BROAD SUN RAYS                            */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            -250,

          top:
            -200,

          width:
            1550,

          height:
            1080,

          pointerEvents:
            "none",

          opacity:
            progress *
            0.22,

          transform:
            `rotate(-3deg)`,

          transformOrigin:
            "100% 0%",

          background: `
            conic-gradient(
              from 218deg
              at 100% 0%,

              transparent
              0deg,

              rgba(
                255,
                225,
                150,
                .12
              )
              6deg,

              transparent
              14deg,

              rgba(
                255,
                239,
                195,
                .16
              )
              22deg,

              transparent
              32deg,

              rgba(
                255,
                224,
                145,
                .09
              )
              40deg,

              transparent
              52deg
            )
          `,

          filter:
            "blur(18px)",

          zIndex:
            5,
        }}
      />


      {/* ================================================= */}
      {/* SUN DISK                                         */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            90,

          top:
            58,

          width:
            168,

          height:
            168,

          opacity:
            progress,

          transform:
            `scale(${sunScale})`,

          transformOrigin:
            "50% 50%",

          pointerEvents:
            "none",

          zIndex:
            7,
        }}
      >
        <div
          style={{
            position:
              "absolute",

            inset:
              -75,

            borderRadius:
              "50%",

            background: `
              radial-gradient(
                circle,

                rgba(
                  246,
                  192,
                  93,
                  .22
                )
                0%,

                rgba(
                  246,
                  192,
                  93,
                  .10
                )
                38%,

                rgba(
                  246,
                  192,
                  93,
                  .03
                )
                58%,

                rgba(
                  246,
                  192,
                  93,
                  0
                )
                78%
              )
            `,
          }}
        />

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            borderRadius:
              "50%",

            background: `
              radial-gradient(
                circle at 34% 30%,

                #FFF9C7
                0%,

                #FFE596
                35%,

                #F8C75F
                72%,

                #EEAE3D
                100%
              )
            `,

            boxShadow: `
              0
              0
              46px
              rgba(
                247,
                196,
                94,
                .16
              )
            `,
          }}
        />
      </div>
    </>
  );
};


/* =========================================================
   BIRD
   ========================================================= */

type BirdProps = {
  left: number;
  top: number;

  frame: number;

  scale?: number;
  opacity?: number;
  speed?: number;
  phase?: number;
};


const Bird = ({
  left,
  top,

  frame,

  scale = 1,
  opacity = 0.3,
  speed = 0.32,
  phase = 0,
}: BirdProps) => {
  const travel =
    frame *
    speed;


  const verticalFloat =
    Math.sin(
      frame /
        18 +
        phase
    ) *
    4;


  const wing =
    Math.sin(
      frame /
        5 +
        phase
    ) *
    3;


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          left +
          travel,

        top:
          top +
          verticalFloat,

        width:
          48,

        height:
          24,

        opacity,

        transform:
          `scale(${scale})`,

        pointerEvents:
          "none",
      }}
    >
      <svg
        viewBox="0 0 48 24"
        width="100%"
        height="100%"
        fill="none"
      >
        <path
          d={`
            M 2 17

            C 8 ${10 - wing}
              15 ${10 - wing}
              24 17

            C 33 ${10 + wing}
              40 ${10 + wing}
              46 17
          `}
          stroke="#507887"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};


/* =========================================================
   BIRDS
   ========================================================= */

const Birds = ({
  frame,
  progress,
}: {
  frame: number;
  progress: number;
}) => {
  return (
    <div
      style={{
        position:
          "absolute",

        inset:
          0,

        opacity:
          progress,

        pointerEvents:
          "none",

        zIndex:
          8,
      }}
    >
      <Bird
        left={1120}
        top={200}
        frame={frame}
        scale={0.84}
        opacity={0.28}
        speed={0.28}
        phase={0}
      />

      <Bird
        left={1240}
        top={156}
        frame={frame}
        scale={0.58}
        opacity={0.22}
        speed={0.36}
        phase={1.4}
      />

      <Bird
        left={1360}
        top={242}
        frame={frame}
        scale={0.72}
        opacity={0.25}
        speed={0.25}
        phase={2.3}
      />
    </div>
  );
};


/* =========================================================
   OCEAN
   ========================================================= */

const Ocean = ({
  frame,
}: {
  frame: number;
}) => {
  const driftBack =
    Math.sin(
      frame /
        42
    ) *
      78 +
    Math.sin(
      frame /
        17
    ) *
      12;


  const driftMiddle =
    Math.sin(
      frame /
        32 +
        1.4
    ) *
      100 +
    Math.sin(
      frame /
        13
    ) *
      12;


  const driftFront =
    Math.sin(
      frame /
        24 +
        2.2
    ) *
      128 +
    Math.sin(
      frame /
        10
    ) *
      16;


  const liftBack =
    Math.sin(
      frame /
        23
    ) *
      8;


  const liftMiddle =
    Math.sin(
      frame /
        17 +
        1.1
    ) *
      11;


  const liftFront =
    Math.sin(
      frame /
        13 +
        2
    ) *
      14;


  const shimmer =
    0.92 +
    Math.sin(
      frame /
        15
    ) *
      0.05;


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          0,

        right:
          0,

        /*
         * Lower horizon.
         */
        top:
          610,

        /*
         * Fill all the way to the bottom.
         */
        bottom:
          0,

        overflow:
          "hidden",

        background: `
          linear-gradient(
            180deg,

            #EDF8FA
            0%,

            #DDEFF4
            24%,

            #C9E7EF
            56%,

            #A7D7E4
            100%
          )
        `,

        zIndex:
          2,
      }}
    >

      {/* ================================================= */}
      {/* HORIZON                                          */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            0,

          right:
            0,

          top:
            64 +
            liftBack,

          height:
            4,

          background:
            "rgba(58,174,193,.30)",

          opacity:
            0.82,
        }}
      />


      {/* ================================================= */}
      {/* BACK WATER                                       */}
      {/* ================================================= */}

      <svg
        viewBox="0 0 2400 230"
        preserveAspectRatio="none"
        style={{
          position:
            "absolute",

          left:
            -240 +
            driftBack,

          top:
            48 +
            liftBack,

          width:
            2400,

          height:
            230,

          opacity:
            shimmer,
        }}
      >
        <path
          d="
            M0,82

            C170,48
             350,108
             560,78

            C770,48
             940,38
             1160,76

            C1380,114
             1540,44
             1760,68

            C1940,88
             2150,58
             2400,72

            L2400,230
            L0,230
            Z
          "
          fill="rgba(179,227,235,.58)"
        />

        <path
          d="
            M0,82

            C170,48
             350,108
             560,78

            C770,48
             940,38
             1160,76

            C1380,114
             1540,44
             1760,68

            C1940,88
             2150,58
             2400,72
          "
          fill="none"
          stroke="rgba(104,195,211,.42)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>


      {/* ================================================= */}
      {/* MIDDLE WATER                                     */}
      {/* ================================================= */}

      <svg
        viewBox="0 0 2420 260"
        preserveAspectRatio="none"
        style={{
          position:
            "absolute",

          left:
            -250 +
            driftMiddle,

          top:
            120 +
            liftMiddle,

          width:
            2420,

          height:
            260,

          opacity:
            0.94,
        }}
      >
        <path
          d="
            M0,78

            C190,108
             365,48
             590,76

            C800,102
             990,44
             1220,78

            C1450,112
             1630,48
             1850,72

            C2040,92
             2220,54
             2420,76

            L2420,260
            L0,260
            Z
          "
          fill="rgba(126,202,218,.38)"
        />

        <path
          d="
            M0,78

            C190,108
             365,48
             590,76

            C800,102
             990,44
             1220,78

            C1450,112
             1630,48
             1850,72

            C2040,92
             2220,54
             2420,76
          "
          fill="none"
          stroke="rgba(81,179,201,.34)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>


      {/* ================================================= */}
      {/* FRONT WATER                                      */}
      {/* ================================================= */}

      <svg
        viewBox="0 0 2460 320"
        preserveAspectRatio="none"
        style={{
          position:
            "absolute",

          left:
            -280 +
            driftFront,

          top:
            205 +
            liftFront,

          width:
            2460,

          height:
            320,

          opacity:
            0.96,
        }}
      >
        <path
          d="
            M0,74

            C170,38
             350,108
             590,70

            C800,36
             990,110
             1230,70

            C1460,30
             1640,112
             1880,72

            C2060,40
             2240,50
             2460,76

            L2460,320
            L0,320
            Z
          "
          fill="rgba(75,174,197,.25)"
        />

        <path
          d="
            M0,74

            C170,38
             350,108
             590,70

            C800,36
             990,110
             1230,70

            C1460,30
             1640,112
             1880,72

            C2060,40
             2240,50
             2460,76
          "
          fill="none"
          stroke="rgba(62,165,190,.34)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>


      {/* ================================================= */}
      {/* MOVING SURFACE HIGHLIGHTS                        */}
      {/* ================================================= */}

      {[
        {
          left:
            70,

          bottom:
            108,

          width:
            310,

          speed:
            0.72,
        },

        {
          left:
            500,

          bottom:
            82,

          width:
            370,

          speed:
            0.98,
        },

        {
          left:
            1010,

          bottom:
            132,

          width:
            300,

          speed:
            0.8,
        },

        {
          left:
            1440,

          bottom:
            74,

          width:
            410,

          speed:
            1.12,
        },
      ].map(
        (
          highlight,
          index
        ) => {
          const x =
            highlight.left +
            Math.sin(
              frame /
                (
                  16 /
                  highlight.speed
                ) +
                index
            ) *
              58;


          const widthPulse =
            1 +
            Math.sin(
              frame /
                13 +
                index *
                  1.4
            ) *
              0.08;


          return (
            <div
              key={
                index
              }
              style={{
                position:
                  "absolute",

                left:
                  x,

                bottom:
                  highlight.bottom +
                  Math.sin(
                    frame /
                      17 +
                      index
                  ) *
                    7,

                width:
                  highlight.width,

                height:
                  9,

                borderRadius:
                  999,

                background:
                  "rgba(255,255,255,.33)",

                opacity:
                  0.6,

                filter:
                  "blur(2px)",

                transform:
                  `scaleX(${widthPulse})`,
              }}
            />
          );
        }
      )}


      {/* ================================================= */}
      {/* SMALL RIPPLE HIGHLIGHTS                          */}
      {/* ================================================= */}

      {Array.from(
        {
          length:
            8,
        },
        (
          _,
          index
        ) => {
          const move =
            Math.sin(
              frame /
                (
                  9 +
                  index *
                    1.8
                ) +
                index *
                  1.7
            ) *
              34;


          return (
            <div
              key={
                index
              }
              style={{
                position:
                  "absolute",

                left:
                  70 +
                  index *
                    245 +
                  move,

                bottom:
                  34 +
                  (
                    index %
                    3
                  ) *
                    24,

                width:
                  105 +
                  (
                    index %
                    3
                  ) *
                    42,

                height:
                  5,

                borderRadius:
                  999,

                background:
                  "rgba(255,255,255,.30)",

                opacity:
                  0.74,
              }}
            />
          );
        }
      )}
    </div>
  );
};


/* =========================================================
   CRUISE SHIP
   ========================================================= */

const CruiseShip = ({
  frame,
  fps,
}: {
  frame: number;
  fps: number;
}) => {
  const entrance =
    spring({
      frame:
        frame -
        4,

      fps,

      config: {
        damping:
          150,

        stiffness:
          80,

        mass:
          1,
      },
    });


  const entranceProgress =
    clamp01(
      entrance
    );


  /*
   * Clear left-to-right movement.
   */
  const travelX =
    interpolate(
      frame,
      [
        0,
        175,
      ],
      [
        -300,
        260,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const shipOpacity =
    interpolate(
      frame,
      [
        0,
        16,
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


  const floatY =
    Math.sin(
      frame /
        13
    ) *
      7;


  const rotation =
    Math.sin(
      frame /
        20
    ) *
      0.35;


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          "50%",

        bottom:
          38,

        width:
          900,

        opacity:
          shipOpacity,

        transform: `
          translateX(-50%)
          translateX(${travelX}px)
          translateY(${(1 - entranceProgress) * 22 + floatY}px)
          rotate(${rotation}deg)
        `,

        transformOrigin:
          "50% 84%",

        pointerEvents:
          "none",

        zIndex:
          12,
      }}
    >
      <Img
        src={staticFile(
          "assets/outbreak/ship-cutout.png"
        )}
        style={{
          display:
            "block",

          width:
            "100%",

          height:
            "auto",

          objectFit:
            "contain",

          filter: `
            drop-shadow(
              0
              24px
              26px
              rgba(
                28,
                91,
                117,
                .17
              )
            )
          `,
        }}
      />
    </div>
  );
};


/* =========================================================
   DATE PILL
   ========================================================= */

const DatePill = ({
  progress,
}: {
  progress: number;
}) => {
  return (
    <div
      style={{
        display:
          "inline-flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        gap:
          12,

        padding:
          "12px 20px",

        borderRadius:
          999,

        background:
          "rgba(255,255,255,.92)",

        border:
          "1px solid rgba(17,39,68,.08)",

        boxShadow:
          "0 8px 24px rgba(37,50,65,.04)",

        opacity:
          progress,

        transform:
          `translateY(${(1 - progress) * 10}px)`,
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
            "#EF6C63",
        }}
      />

      <span
        style={{
          fontFamily:
            FONT_STACK,

          fontSize:
            18,

          lineHeight:
            1,

          fontWeight:
            800,

          letterSpacing:
            2.6,

          textTransform:
            "uppercase",

          color:
            "#168894",
        }}
      >
        April 2026
      </span>
    </div>
  );
};


/* =========================================================
   ROUTE LABEL
   ========================================================= */

const RouteLabel = ({
  progress,
}: {
  progress: number;
}) => {
  return (
    <div
      style={{
        position:
          "absolute",

        left:
          "50%",

        bottom:
          104,

        transform: `
          translateX(-50%)
          translateY(${(1 - progress) * 12}px)
        `,

        display:
          "inline-flex",

        alignItems:
          "center",

        gap:
          13,

        padding:
          "14px 22px",

        borderRadius:
          999,

        background:
          "rgba(255,255,255,.93)",

        border:
          "1px solid rgba(24,59,78,.08)",

        boxShadow:
          "0 10px 30px rgba(29,69,84,.05)",

        opacity:
          progress,

        zIndex:
          20,
      }}
    >
      <span
        style={{
          width:
            11,

          height:
            11,

          borderRadius:
            "50%",

          background:
            "#198B98",
        }}
      />

      <span
        style={{
          fontFamily:
            FONT_STACK,

          fontSize:
            19,

          lineHeight:
            1,

          fontWeight:
            700,

          color:
            "#324A60",
        }}
      >
        South Atlantic expedition route
      </span>
    </div>
  );
};


/* =========================================================
   SOURCE SAFE AREA
   ========================================================= */

const SourceSafeArea = () => {
  return (
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
          76,

        background: `
          linear-gradient(
            180deg,

            rgba(
              169,
              216,
              229,
              0
            )
            0%,

            rgba(
              169,
              216,
              229,
              .28
            )
            42%,

            rgba(
              169,
              216,
              229,
              .88
            )
            100%
          )
        `,

        pointerEvents:
          "none",

        zIndex:
          30,
      }}
    />
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const CruiseIntroShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  const textSpring =
    spring({
      frame:
        frame -
        2,

      fps,

      config: {
        damping:
          160,

        stiffness:
          90,
      },
    });


  const textProgress =
    clamp01(
      textSpring
    );


  const bodyProgress =
    interpolate(
      frame,
      [
        10,
        30,
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


  const environmentProgress =
    interpolate(
      frame,
      [
        0,
        22,
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


  const birdsProgress =
    interpolate(
      frame,
      [
        15,
        38,
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


  const routeProgress =
    interpolate(
      frame,
      [
        22,
        44,
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
    <AbsoluteFill
      style={{
        overflow:
          "hidden",

        background: `
          linear-gradient(
            180deg,

            #F9F6F0
            0%,

            #FBF8F3
            56%,

            #EEF7F8
            56%,

            #D4EBF0
            100%
          )
        `,

        fontFamily:
          FONT_STACK,
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
            0.18,

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

          zIndex:
            1,
        }}
      />


      {/* ================================================= */}
      {/* OCEAN                                            */}
      {/* ================================================= */}

      <Ocean
        frame={
          frame
        }
      />


      {/* ================================================= */}
      {/* FULL-SCREEN SUNLIGHT                             */}
      {/* ================================================= */}

      <Sun
        progress={
          environmentProgress
        }
        frame={
          frame
        }
      />


      {/* ================================================= */}
      {/* BIRDS                                            */}
      {/* ================================================= */}

      <Birds
        frame={
          frame
        }
        progress={
          birdsProgress
        }
      />


      {/* ================================================= */}
      {/* CENTERED MAIN TEXT                               */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            64,

          width:
            1380,

          transform:
            "translateX(-50%)",

          display:
            "flex",

          flexDirection:
            "column",

          alignItems:
            "center",

          textAlign:
            "center",

          zIndex:
            20,
        }}
      >

        {/* DATE */}

        <DatePill
          progress={
            textProgress
          }
        />


        {/* ================================================= */}
        {/* TITLE                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              1220,

            fontFamily:
              TITLE_STACK,

            fontSize:
              112,

            lineHeight:
              0.86,

            fontWeight:
              850,

            letterSpacing:
              -6,

            color:
              "#17243A",

            textAlign:
              "center",

            opacity:
              textProgress,

            transform: `
              translateY(
                ${(1 - textProgress) * 18}px
              )
            `,
          }}
        >
          Outbreak
          <br />
          at sea
        </div>


        {/* ================================================= */}
        {/* DESCRIPTION                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              28,

            width:
              1150,

            fontFamily:
              FONT_STACK,

            fontSize:
              37,

            lineHeight:
              1.3,

            fontWeight:
              600,

            letterSpacing:
              -0.7,

            color:
              "#536880",

            textAlign:
              "center",

            opacity:
              bodyProgress,

            transform: `
              translateY(
                ${(1 - bodyProgress) * 14}px
              )
            `,
          }}
        >
          The expedition cruise ship{" "}

          <span
            style={{
              fontWeight:
                760,

              color:
                "#405A74",
            }}
          >
            M/V Hondius
          </span>

          {" "}
          begins a South Atlantic voyage from{" "}

          <span
            style={{
              fontWeight:
                720,

              color:
                "#455F78",
            }}
          >
            Ushuaia, Argentina.
          </span>
        </div>
      </div>


      {/* ================================================= */}
      {/* LARGE MOVING CRUISE SHIP                         */}
      {/* ================================================= */}

      <CruiseShip
        frame={
          frame
        }
        fps={
          fps
        }
      />


      {/* ================================================= */}
      {/* ROUTE LABEL                                      */}
      {/* ================================================= */}

      <RouteLabel
        progress={
          routeProgress
        }
      />


      {/* ================================================= */}
      {/* BOTTOM SOURCE FADE                               */}
      {/* ================================================= */}

      <SourceSafeArea />
    </AbsoluteFill>
  );
};