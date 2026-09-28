import {
  Img,
  interpolate,
  spring,
  staticFile,
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
   SYMPTOM PNG ASSETS ONLY
   NO JPG FILES
   ========================================================= */

const symptomOrbitAssets = [
  {
    label:
      "Fever",

    src:
      "assets/symptoms/fever_care_illustration.png",

    accent:
      theme.colors.coral,

    left:
      56,

    top:
      28,

    width:
      220,

    height:
      195,

    rotate:
      -3,

    startFrame:
      26,
  },

  {
    label:
      "Dry cough",

    src:
      "assets/symptoms/coughing_boy_with_dry_cough_label.png",

    accent:
      theme.colors.amber,

    left:
      820,

    top:
      24,

    width:
      220,

    height:
      200,

    rotate:
      3,

    startFrame:
      40,
  },

  {
    label:
      "Fatigue",

    src:
      "assets/symptoms/fatigue_slumped_in_a_blue_chair.png",

    accent:
      theme.colors.sky,

    left:
      34,

    top:
      270,

    width:
      220,

    height:
      195,

    rotate:
      -2,

    startFrame:
      54,
  },

  {
    label:
      "Stomach symptoms",

    src:
      "assets/symptoms/man_with_stomach_problems.png",

    accent:
      theme.colors.amber,

    left:
      820,

    top:
      285,

    width:
      228,

    height:
      205,

    rotate:
      2,

    startFrame:
      68,
  },

  {
    label:
      "Rapid heartbeat",

    src:
      "assets/symptoms/elderly_man_with_rapid_heartbeat_icon.png",

    accent:
      theme.colors.violet,

    left:
      52,

    top:
      510,

    width:
      235,

    height:
      220,

    rotate:
      -2,

    startFrame:
      82,
  },

  {
    label:
      "Trouble breathing",

    src:
      "assets/symptoms/trouble_breathing_illustration.png",

    accent:
      theme.colors.coralDark,

    left:
      802,

    top:
      512,

    width:
      240,

    height:
      220,

    rotate:
      2,

    startFrame:
      96,
  },
];


/* =========================================================
   LEFT SYMPTOM LIST
   ========================================================= */

const commonSymptoms = [
  {
    label:
      "Fever",
    color:
      theme.colors.coral,
  },

  {
    label:
      "Chills",
    color:
      theme.colors.sky,
  },

  {
    label:
      "Headache",
    color:
      theme.colors.violet,
  },

  {
    label:
      "Muscle aches",
    color:
      theme.colors.sky,
  },

  {
    label:
      "Fatigue",
    color:
      theme.colors.amber,
  },

  {
    label:
      "Dry cough",
    color:
      theme.colors.coral,
  },

  {
    label:
      "Nausea / vomiting",
    color:
      theme.colors.amber,
  },

  {
    label:
      "Abdominal pain",
    color:
      theme.colors.coralDark,
  },

  {
    label:
      "Diarrhea",
    color:
      theme.colors.amber,
  },

  {
    label:
      "Dizziness",
    color:
      theme.colors.violet,
  },

  {
    label:
      "Chest pain",
    color:
      theme.colors.coralDark,
  },

  {
    label:
      "Shortness of breath",
    color:
      theme.colors.coral,
  },
];


/* =========================================================
   SYMPTOM ORBIT IMAGE

   No duplicate label chip here because the PNG itself
   already contains the symptom title.
   ========================================================= */

type SymptomOrbitAssetProps = {
  src: string;

  width: number;
  height: number;

  left: number;
  top: number;

  rotate: number;

  progress: number;

  frame: number;

  index: number;

  emphasize?: boolean;
};


const SymptomOrbitAsset = ({
  src,

  width,
  height,

  left,
  top,

  rotate,

  progress,

  frame,

  index,

  emphasize = false,
}: SymptomOrbitAssetProps) => {
  const p =
    clamp01(
      progress
    );


  const floatY =
    Math.sin(
      frame / 18 +
      index * 0.85
    ) *
    3;


  const floatX =
    Math.cos(
      frame / 26 +
      index * 0.65
    ) *
    2;


  const pulse =
    emphasize
      ? 1 +
        Math.sin(
          frame / 10
        ) *
          0.015
      : 1;


  return (
    <div
      style={{
        position:
          "absolute",

        left,
        top,

        width,
        height,

        opacity:
          p,

        transform: `
          translate(
            ${floatX}px,
            ${(1 - p) * 22 + floatY}px
          )

          rotate(
            ${rotate}deg
          )

          scale(
            ${(0.88 + p * 0.12) * pulse}
          )
        `,

        transformOrigin:
          "50% 50%",

        zIndex:
          18,
      }}
    >
      {/* =================================================
          SOFT BACKDROP
          ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            "50%",

          width:
            width * 0.82,

          height:
            height * 0.82,

          transform:
            "translate(-50%, -50%)",

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(255,255,255,.72) 0%,
              rgba(255,255,255,.34) 45%,
              rgba(255,255,255,0) 76%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* =================================================
          PNG
          ================================================= */}

      <Img
        src={
          staticFile(
            src
          )
        }

        style={{
          position:
            "relative",

          width:
            "100%",

          height:
            "100%",

          objectFit:
            "contain",

          display:
            "block",

          filter:
            "drop-shadow(0 13px 20px rgba(44,38,33,.10))",

          zIndex:
            2,
        }}
      />
    </div>
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
          280,

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
      {/* AIR STROKE 1 */}

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


      {/* AIR STROKE 2 */}

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


      {/* AIR STROKE 3 */}

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


      {/* PARTICLES */}

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
                  index * 1.8
                ) *
                  4,

              width:
                particle.size,

              height:
                particle.size,

              borderRadius:
                "50%",

              background:
                index % 2 === 0
                  ? theme.colors.coral
                  : theme.colors.pink,

              opacity:
                amount *
                (
                  0.92 -
                  index * 0.08
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


  const headerProgress =
    clamp01(
      headerIn
    );


  /* =======================================================
     PERSON
     ======================================================= */

  const personIn =
    spring({
      frame:
        frame - 10,

      fps,

      config: {
        damping:
          175,

        stiffness:
          88,
      },
    });


  const personProgress =
    clamp01(
      personIn
    );


  const personCenterX =
    540;


  /* =======================================================
     FEVER PULSE
     ======================================================= */

  const feverPulse =
    1 +
    Math.sin(
      frame / 10
    ) *
      0.035;


  /* =======================================================
     COUGH ANIMATION
     ======================================================= */

  const coughCycle =
    frame % 78;


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
     ORBIT DECORATION
     ======================================================= */

  const orbitIn =
    interpolate(
      frame,

      [
        18,
        56,
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


  /* =======================================================
     SYMPTOM LIST
     ======================================================= */

  const listIn =
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


  /* =======================================================
     BOTTOM NOTE
     ======================================================= */

  const bottomNoteIn =
    interpolate(
      frame,

      [
        106,
        144,
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
          LEFT CONTENT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            64,

          top:
            38,

          width:
            620,

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
              "10px 16px",

            borderRadius:
              999,

            background:
              "rgba(233,111,106,.11)",

            border:
              "1px solid rgba(233,111,106,.08)",

            fontFamily:
              FONT_STACK,

            fontSize:
              17,

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
          <span
            style={{
              width:
                8,

              height:
                8,

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
              18,

            width:
              610,

            fontFamily:
              TITLE_STACK,

            fontSize:
              66,

            lineHeight:
              0.93,

            fontWeight:
              850,

            letterSpacing:
              -3.5,

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
              20,

            width:
              575,

            fontFamily:
              FONT_STACK,

            fontSize:
              25,

            lineHeight:
              1.34,

            fontWeight:
              620,

            letterSpacing:
              -0.4,

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
              24,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              11,

            padding:
              "13px 17px",

            borderRadius:
              18,

            background:
              "rgba(255,255,255,.88)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 10px 28px rgba(52,42,35,.06)",

            fontFamily:
              FONT_STACK,

            fontSize:
              19,

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
                10,

              height:
                10,

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


{/* =================================================
    COMMON SYMPTOMS LIST
    ================================================= */}

<div
  style={{
    marginTop:
      24,

    width:
      620,

    opacity:
      listIn,

    transform: `
      translateY(
        ${(1 - listIn) * 12}px
      )
    `,
  }}
>
  <div
    style={{
      display:
        "flex",

      alignItems:
        "center",

      gap:
        11,

      fontFamily:
        FONT_STACK,

      fontSize:
        30,

      fontWeight:
        850,

      letterSpacing:
        1.8,

      textTransform:
        "uppercase",

      color:
        theme.colors.muted,
    }}
  >
    <span
      style={{
        width:
          32,

        height:
          4,

        borderRadius:
          999,

        background:
          theme.colors.coral,
      }}
    />

    Common symptoms
  </div>


  <div
    style={{
      marginTop:
        18,

      display:
        "grid",

      gridTemplateColumns:
        "repeat(3, minmax(0, 1fr))",

      columnGap:
        24,

      rowGap:
        15,
    }}
  >
    {commonSymptoms.map(
      (
        symptom,
        index
      ) => {
        const itemProgress =
          interpolate(
            listIn,

            [
              index * 0.035,
              0.42 +
                index * 0.035,
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
              symptom.label
            }

            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                10,

              minWidth:
                0,

              opacity:
                itemProgress,

              transform:
                `translateX(${(1 - itemProgress) * 7}px)`,
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
                  symptom.color,

                boxShadow:
                  `0 0 0 5px ${symptom.color}12`,
              }}
            />

            <span
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  26,

                lineHeight:
                  1.4,

                fontWeight:
                  750,

                letterSpacing:
                  -0.2,

                color:
                  theme.colors.ink,
              }}
            >
              {symptom.label}
            </span>
          </div>
        );
      }
    )}
  </div>
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
            150,

          width:
            1080,

          height:
            820,

          zIndex:
            10,
        }}
      >
        {/* =================================================
            OUTER ORBIT
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX,

            top:
              360,

            width:
              760,

            height:
              610,

            transform:
              "translate(-50%, -50%)",

            borderRadius:
              "50%",

            border:
              `2px dashed rgba(156,114,212,${0.14 * orbitIn})`,

            opacity:
              orbitIn,

            zIndex:
              2,
          }}
        />


        {/* =================================================
            INNER ORBIT
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX,

            top:
              360,

            width:
              620,

            height:
              500,

            transform:
              "translate(-50%, -50%)",

            borderRadius:
              "50%",

            border:
              `1.5px dashed rgba(233,111,106,${0.12 * orbitIn})`,

            opacity:
              orbitIn * 0.9,

            zIndex:
              2,
          }}
        />


        {/* =================================================
            PERSON HALO
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX,

            top:
              118,

            width:
              470,

            height:
              610,

            borderRadius:
              "50%",

            background: `
              radial-gradient(
                ellipse,
                rgba(233,111,106,.10) 0%,
                rgba(233,111,106,.04) 48%,
                transparent 72%
              )
            `,

            opacity:
              personProgress,

            transform:
              "translateX(-50%)",

            zIndex:
              6,
          }}
        />


        {/* =================================================
            PERSON
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX,

            top:
              150,

            opacity:
              personProgress,

            transform: `
              translateX(-50%)

              translateY(
                ${(1 - personProgress) * 24 + coughDip}px
              )

              rotate(
                ${2 + coughLean}deg
              )

              scaleX(
                ${coughScaleX}
              )

              scale(
                ${0.92 + personProgress * 0.08}
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
              430
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
            COUGH AIR
            ================================================= */}

        <CoughBurst
          amount={
            coughAmount *
            personProgress
          }

          centerX={
            personCenterX -
            24
          }
        />


        {/* =================================================
            FEVER BADGE
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              personCenterX +
              84,

            top:
              178,

            width:
              92,

            height:
              92,

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
              26,

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
            PNG SYMPTOM IMAGES

            No extra title chips.
            ================================================= */}

        {symptomOrbitAssets.map(
          (
            item,
            index
          ) => {
            const progress =
              interpolate(
                frame,

                [
                  item.startFrame,
                  item.startFrame +
                    26,
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
              <SymptomOrbitAsset
                key={
                  item.label
                }

                src={
                  item.src
                }

                left={
                  item.left
                }

                top={
                  item.top
                }

                width={
                  item.width
                }

                height={
                  item.height
                }

                rotate={
                  item.rotate
                }

                progress={
                  progress
                }

                frame={
                  frame
                }

                index={
                  index
                }

                emphasize={
                  item.label ===
                  "Trouble breathing"
                }
              />
            );
          }
        )}
      </div>


      {/* ===================================================
          PROGRESSION NOTE
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            790,

          right:
            105,

          bottom:
            66,

          height:
            72,

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            30,

          padding:
            "0 25px",

          boxSizing:
            "border-box",

          borderRadius:
            22,

          background:
            "rgba(255,255,255,.77)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 12px 32px rgba(52,42,35,.055)",

          opacity:
            bottomNoteIn,

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
              13,
          }}
        >
          <span
            style={{
              width:
                12,

              height:
                12,

              flex:
                "0 0 auto",

              borderRadius:
                "50%",

              background:
                theme.colors.coral,

              boxShadow:
                "0 0 0 7px rgba(233,111,106,.10)",
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              lineHeight:
                1.1,

              fontWeight:
                800,

              color:
                theme.colors.ink,
            }}
          >
            Symptoms can progress from general illness to respiratory disease
          </span>
        </div>


        <div
          style={{
            fontFamily:
              FONT_STACK,

            fontSize:
              17,

            fontWeight:
              700,

            color:
              theme.colors.coralDark,

            textTransform:
              "uppercase",

            letterSpacing:
              1.2,

            whiteSpace:
              "nowrap",
          }}
        >
          Watch for worsening breathing
        </div>
      </div>
    </div>
  );
};