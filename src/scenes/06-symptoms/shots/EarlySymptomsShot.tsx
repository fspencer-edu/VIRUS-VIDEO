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
   SYMPTOMS
   ========================================================= */

const symptomBubbles = [
  {
    label:
      "Fever",

    detail:
      "Often one of the first signs",

    color:
      theme.colors.coral,

    left:
      825,

    top:
      255,
  },

  {
    label:
      "Headache",

    detail:
      "Can appear during early illness",

    color:
      theme.colors.violet,

    left:
      1375,

    top:
      260,
  },

  {
    label:
      "Muscle aches",

    detail:
      "Generalized body aches can occur",

    color:
      theme.colors.sky,

    left:
      760,

    top:
      655,
  },

  {
    label:
      "Nausea",

    detail:
      "Gastrointestinal symptoms may occur",

    color:
      theme.colors.amber,

    left:
      1395,

    top:
      655,
  },
];


/* =========================================================
   SYMPTOM CALLOUT
   ========================================================= */

const SymptomCallout = ({
  label,
  detail,
  color,
  progress,
}: {
  label: string;
  detail: string;
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
        width:
          390,

        boxSizing:
          "border-box",

        padding:
          "23px 25px",

        borderRadius:
          25,

        background:
          "rgba(255,255,255,.96)",

        border:
          `1px solid ${color}55`,

        boxShadow:
          "0 16px 38px rgba(52,42,35,.09)",

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 14}px
          )

          scale(
            ${0.94 + p * 0.06}
          )
        `,

        backdropFilter:
          "blur(12px)",
      }}
    >
      {/* ===================================================
          TITLE
          =================================================== */}

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
              13,

            height:
              13,

            flex:
              "0 0 auto",

            borderRadius:
              "50%",

            background:
              color,

            boxShadow:
              `0 0 0 8px ${color}18`,
          }}
        />


        <div
          style={{
            fontFamily:
              TITLE_STACK,

            fontSize:
              35,

            lineHeight:
              1,

            fontWeight:
              850,

            letterSpacing:
              -1,

            color:
              theme.colors.ink,
          }}
        >
          {label}
        </div>
      </div>


      {/* ===================================================
          DETAIL
          =================================================== */}

      <div
        style={{
          marginTop:
            12,

          fontFamily:
            FONT_STACK,

          fontSize:
            22,

          lineHeight:
            1.32,

          fontWeight:
            620,

          letterSpacing:
            -0.25,

          color:
            "#536A82",
        }}
      >
        {detail}
      </div>
    </div>
  );
};


/* =========================================================
   CONNECTOR LINE
   ========================================================= */

const ConnectorLine = ({
  left,
  top,
  width,
  rotate,
  color,
  progress,
}: {
  left: number;
  top: number;
  width: number;
  rotate: number;
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
        position:
          "absolute",

        left,
        top,

        width:
          width *
          p,

        height:
          4,

        borderRadius:
          999,

        background:
          color,

        opacity:
          p *
          0.42,

        transform:
          `rotate(${rotate}deg)`,

        transformOrigin:
          "left center",

        zIndex:
          8,
      }}
    />
  );
};


/* =========================================================
   COUGH BURST
   ========================================================= */

const CoughBurst = ({
  amount,
  centerX,
}: {
  amount: number;
  centerX: number;
}) => {
  const particles = [
    {
      left:
        72,

      top:
        14,

      size:
        12,

      offset:
        18,
    },

    {
      left:
        104,

      top:
        38,

      size:
        9,

      offset:
        27,
    },

    {
      left:
        138,

      top:
        18,

      size:
        7,

      offset:
        38,
    },

    {
      left:
        84,

      top:
        69,

      size:
        8,

      offset:
        24,
    },

    {
      left:
        149,

      top:
        60,

      size:
        10,

      offset:
        45,
    },

    {
      left:
        118,

      top:
        86,

      size:
        6,

      offset:
        34,
    },
  ];


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          centerX +
          18,

        top:
          266,

        width:
          210,

        height:
          135,

        opacity:
          amount,

        transform: `
          translateX(
            ${amount * 16}px
          )

          scale(
            ${0.84 + amount * 0.16}
          )
        `,

        transformOrigin:
          "left center",

        pointerEvents:
          "none",

        zIndex:
          24,
      }}
    >
      {/* ===================================================
          AIR STROKE 1
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            0,

          top:
            30,

          width:
            112,

          height:
            5,

          borderRadius:
            999,

          background: `
            linear-gradient(
              90deg,
              rgba(233,111,106,.62),
              rgba(233,111,106,0)
            )
          `,

          transform:
            "rotate(-8deg)",
        }}
      />


      {/* ===================================================
          AIR STROKE 2
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            6,

          top:
            55,

          width:
            143,

          height:
            5,

          borderRadius:
            999,

          background: `
            linear-gradient(
              90deg,
              rgba(233,111,106,.48),
              rgba(233,111,106,0)
            )
          `,

          transform:
            "rotate(3deg)",
        }}
      />


      {/* ===================================================
          AIR STROKE 3
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            8,

          top:
            78,

          width:
            96,

          height:
            4,

          borderRadius:
            999,

          background: `
            linear-gradient(
              90deg,
              rgba(244,160,175,.45),
              rgba(244,160,175,0)
            )
          `,

          transform:
            "rotate(10deg)",
        }}
      />


      {/* ===================================================
          COUGH PARTICLES
          =================================================== */}

      {particles.map(
        (
          particle,
          index
        ) => (
          <div
            key={
              index
            }

            style={{
              position:
                "absolute",

              left:
                particle.left +
                amount *
                  particle.offset,

              top:
                particle.top +
                Math.sin(
                  index *
                    1.8
                ) *
                  4,

              width:
                particle.size,

              height:
                particle.size,

              borderRadius:
                "50%",

              background:
                index %
                  2 ===
                0
                  ? theme.colors.coral
                  : theme.colors.pink,

              opacity:
                amount *
                (
                  0.92 -
                  index *
                    0.08
                ),

              boxShadow:
                "0 0 0 6px rgba(233,111,106,.06)",
            }}
          />
        )
      )}
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const EarlySymptomsShot = () => {
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
        damping:
          180,

        stiffness:
          90,
      },
    });


  /* =======================================================
     PERSON
     ======================================================= */

  const personIn =
    spring({
      frame:
        frame -
        10,

      fps,

      config: {
        damping:
          175,

        stiffness:
          88,
      },
    });


  const headerProgress =
    clamp01(
      headerIn
    );


  const personProgress =
    clamp01(
      personIn
    );


  /*
   * Everything related to the person now uses this
   * exact same horizontal anchor.
   */
  const personCenterX =
    540;


  /* =======================================================
     FEVER PULSE
     ======================================================= */

  const feverPulse =
    1 +
    Math.sin(
      frame /
        10
    ) *
      0.035;


  /* =======================================================
     COUGH ANIMATION
     ======================================================= */

  const coughCycle =
    frame %
    78;


  /*
   * Two quick coughs followed by a longer resting period.
   */
  const coughBurst =
    interpolate(
      coughCycle,

      [
        0,
        5,
        11,
        17,
        22,
        28,
        36,
        78,
      ],

      [
        0.05,
        1,
        0.22,
        0.82,
        0.16,
        0.08,
        0.04,
        0.04,
      ],

      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const coughIn =
    interpolate(
      frame,

      [
        22,
        48,
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


  const coughAmount =
    coughBurst *
    coughIn;


  const coughLean =
    interpolate(
      coughAmount,

      [
        0,
        1,
      ],

      [
        0,
        5.5,
      ]
    );


  const coughDip =
    interpolate(
      coughAmount,

      [
        0,
        1,
      ],

      [
        0,
        8,
      ]
    );


  const coughScaleX =
    interpolate(
      coughAmount,

      [
        0,
        1,
      ],

      [
        1,
        0.985,
      ]
    );


  /* =======================================================
     CALLOUT REVEALS
     ======================================================= */

  const feverIn =
    interpolate(
      frame,

      [
        28,
        64,
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


  const headacheIn =
    interpolate(
      frame,

      [
        62,
        98,
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


  const muscleIn =
    interpolate(
      frame,

      [
        96,
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


  const nauseaIn =
    interpolate(
      frame,

      [
        130,
        166,
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
            #F6EFE7 100%
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


      {/* ===================================================
          SOFT BACKGROUND GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            900,

          top:
            130,

          width:
            820,

          height:
            820,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(233,111,106,.08) 0%,
              rgba(233,111,106,.025) 44%,
              transparent 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          HEADER
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            82,

          top:
            58,

          width:
            700,

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
        {/* =================================================
            EYEBROW
            ================================================= */}

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
              850,

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

          Early illness
        </div>


        {/* =================================================
            TITLE
            ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              690,

            fontFamily:
              TITLE_STACK,

            fontSize:
              78,

            lineHeight:
              0.93,

            fontWeight:
              850,

            letterSpacing:
              -4.3,

            color:
              "#17243A",
          }}
        >
          Early symptoms
          <br />

          can look like
          <br />

          many infections.
        </div>


        {/* =================================================
            DESCRIPTION
            ================================================= */}

        <div
          style={{
            marginTop:
              25,

            width:
              650,

            fontFamily:
              FONT_STACK,

            fontSize:
              31,

            lineHeight:
              1.36,

            fontWeight:
              620,

            letterSpacing:
              -0.5,

            color:
              "#596D82",
          }}
        >
          The first stage can resemble a nonspecific viral
          illness before severe breathing problems appear.
        </div>


        {/* =================================================
            TIMING NOTE
            ================================================= */}

        <div
          style={{
            marginTop:
              35,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              12,

            padding:
              "15px 19px",

            borderRadius:
              19,

            background:
              "rgba(255,255,255,.88)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 10px 28px rgba(52,42,35,.06)",

            fontFamily:
              FONT_STACK,

            fontSize:
              23,

            lineHeight:
              1.15,

            fontWeight:
              700,

            color:
              theme.colors.ink,
          }}
        >
          <span
            style={{
              width:
                11,

              height:
                11,

              flex:
                "0 0 auto",

              borderRadius:
                "50%",

              background:
                theme.colors.teal,
            }}
          />

          Symptoms may begin weeks after exposure
        </div>
      </div>


      {/* ===================================================
          PERSON / SYMPTOM AREA
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            760,

          top:
            178,

          width:
            1080,

          height:
            810,

          zIndex:
            10,
        }}
      >
        {/* =================================================
            PERSON HALO — CENTERED
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX,

            top:
              94,

            width:
              500,

            height:
              640,

            borderRadius:
              "50%",

            background: `
              radial-gradient(
                ellipse,
                rgba(233,111,106,.09) 0%,
                rgba(233,111,106,.03) 50%,
                transparent 72%
              )
            `,

            opacity:
              personProgress,

            transform:
              "translateX(-50%)",
          }}
        />


        {/* =================================================
            PERSON — CENTERED
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX,

            top:
              72,

            opacity:
              personProgress,

            transform: `
              translateX(-50%)

              translateY(
                ${
                  (1 - personProgress) *
                    24 +
                  coughDip
                }px
              )

              rotate(
                ${2 + coughLean}deg
              )

              scaleX(
                ${coughScaleX}
              )

              scale(
                ${0.94 + personProgress * 0.06}
              )
            `,

            transformOrigin:
              "bottom center",

            zIndex:
              15,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerA
            }

            width={
              500
            }

            sick={
              0.82
            }

            cough={
              coughAmount
            }

            rotate={
              0
            }

            bob={
              0.16
            }
          />
        </div>


        {/* =================================================
            COUGH AIR / PARTICLES
            ================================================= */}

        <CoughBurst
          amount={
            coughAmount *
            personProgress
          }

          centerX={
            personCenterX
          }
        />


        {/* =================================================
            FEVER BADGE — ANCHORED TO PERSON
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX +
              112,

            top:
              112,

            width:
              96,

            height:
              96,

            borderRadius:
              "50%",

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            background:
              theme.colors.coral,

            border:
              "6px solid rgba(255,255,255,.96)",

            boxShadow:
              "0 15px 36px rgba(233,111,106,.25)",

            color:
              "#FFFFFF",

            fontFamily:
              FONT_STACK,

            fontSize:
              27,

            fontWeight:
              850,

            opacity:
              personProgress,

            transform:
              `scale(${feverPulse})`,

            zIndex:
              25,
          }}
        >
          39°
        </div>


        {/* =================================================
            CONNECTOR — FEVER
            ================================================= */}

        <ConnectorLine
          left={
            360
          }

          top={
            250
          }

          width={
            150
          }

          rotate={
            12
          }

          color={
            theme.colors.coral
          }

          progress={
            feverIn
          }
        />


        {/* =================================================
            CONNECTOR — HEADACHE
            ================================================= */}

        <ConnectorLine
          left={
            760
          }

          top={
            258
          }

          width={
            130
          }

          rotate={
            -10
          }

          color={
            theme.colors.violet
          }

          progress={
            headacheIn
          }
        />


        {/* =================================================
            CONNECTOR — MUSCLE ACHES
            ================================================= */}

        <ConnectorLine
          left={
            340
          }

          top={
            620
          }

          width={
            175
          }

          rotate={
            -14
          }

          color={
            theme.colors.sky
          }

          progress={
            muscleIn
          }
        />


        {/* =================================================
            CONNECTOR — NAUSEA
            ================================================= */}

        <ConnectorLine
          left={
            770
          }

          top={
            628
          }

          width={
            145
          }

          rotate={
            13
          }

          color={
            theme.colors.amber
          }

          progress={
            nauseaIn
          }
        />


        {/* =================================================
            SYMPTOM CALLOUTS
            ================================================= */}

        {symptomBubbles.map(
          (
            item,
            index
          ) => {
            let progress =
              0;


            if (
              index ===
              0
            ) {
              progress =
                feverIn;
            }


            if (
              index ===
              1
            ) {
              progress =
                headacheIn;
            }


            if (
              index ===
              2
            ) {
              progress =
                muscleIn;
            }


            if (
              index ===
              3
            ) {
              progress =
                nauseaIn;
            }


            return (
              <div
                key={
                  item.label
                }

                style={{
                  position:
                    "absolute",

                  left:
                    item.left -
                    760,

                  top:
                    item.top -
                    178,

                  zIndex:
                    30,
                }}
              >
                <SymptomCallout
                  label={
                    item.label
                  }

                  detail={
                    item.detail
                  }

                  color={
                    item.color
                  }

                  progress={
                    progress
                  }
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};