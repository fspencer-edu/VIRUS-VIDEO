import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  ContactNetwork,
} from "../../../components/graphics/ContactNetwork";

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
   SPREAD FIELD

   Before containment:
   - rings radiate outward
   - small contacts drift away from the centre

   As containment rises:
   - rings disappear
   - particles pull inward / fade
   ========================================================= */

const SpreadField = ({
  containment,
}: {
  containment: number;
}) => {
  const frame =
    useCurrentFrame();


  const spread =
    1 -
    containment;


  const wave1 =
    (
      frame %
        70
    ) /
    70;


  const wave2 =
    (
      (
        frame +
        34
      ) %
      70
    ) /
    70;


  const ringOpacity = (
    progress: number
  ) =>
    interpolate(
      progress,
      [
        0,
        0.18,
        0.72,
        1,
      ],
      [
        0,
        0.55,
        0.22,
        0,
      ],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    ) *
    spread;


  const particles = [
    {
      angle: -150,
      distance: 178,
      delay: 0,
    },

    {
      angle: -118,
      distance: 206,
      delay: 13,
    },

    {
      angle: -78,
      distance: 192,
      delay: 27,
    },

    {
      angle: -42,
      distance: 218,
      delay: 39,
    },

    {
      angle: -6,
      distance: 205,
      delay: 18,
    },

    {
      angle: 30,
      distance: 190,
      delay: 46,
    },

    {
      angle: 68,
      distance: 214,
      delay: 7,
    },

    {
      angle: 106,
      distance: 198,
      delay: 32,
    },

    {
      angle: 145,
      distance: 216,
      delay: 52,
    },

    {
      angle: 178,
      distance: 188,
      delay: 22,
    },
  ];


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          130,

        top:
          105,

        width:
          500,

        height:
          390,

        pointerEvents:
          "none",

        zIndex:
          3,
      }}
    >
      {/* ===================================================
          CENTRAL GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            "50%",

          width:
            240,

          height:
            240,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(233,111,106,.16) 0%,
              rgba(233,111,106,.07) 42%,
              rgba(233,111,106,0) 74%
            )
          `,

          opacity:
            spread,

          transform:
            "translate(-50%, -50%)",
        }}
      />


      {/* ===================================================
          OUTWARD WAVES
          =================================================== */}

      {[wave1, wave2].map(
        (
          wave,
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
                "50%",

              top:
                "50%",

              width:
                130 +
                wave *
                  330,

              height:
                130 +
                wave *
                  330,

              borderRadius:
                "50%",

              border:
                `5px solid ${theme.colors.coral}`,

              opacity:
                ringOpacity(
                  wave
                ),

              transform:
                "translate(-50%, -50%)",

              boxShadow:
                "0 0 22px rgba(233,111,106,.08)",
            }}
          />
        )
      )}


      {/* ===================================================
          MOVING CONTACTS
          =================================================== */}

      {particles.map(
        (
          particle,
          index
        ) => {
          const t =
            (
              (
                frame +
                particle.delay
              ) %
              95
            ) /
            95;


          const movement =
            interpolate(
              t,
              [
                0,
                0.14,
                0.82,
                1,
              ],
              [
                0,
                0.18,
                1,
                1,
              ],
              {
                extrapolateLeft:
                  "clamp",

                extrapolateRight:
                  "clamp",
              }
            );


          const fade =
            interpolate(
              t,
              [
                0,
                0.12,
                0.76,
                1,
              ],
              [
                0,
                1,
                0.86,
                0,
              ],
              {
                extrapolateLeft:
                  "clamp",

                extrapolateRight:
                  "clamp",
              }
            );


          const radians =
            (
              particle.angle *
              Math.PI
            ) /
            180;


          const distance =
            particle.distance *
            movement *
            (
              0.55 +
              spread *
                0.45
            );


          const x =
            250 +
            Math.cos(
              radians
            ) *
              distance;


          const y =
            195 +
            Math.sin(
              radians
            ) *
              distance;


          const size =
            14 +
            (
              index %
              3
            ) *
              4;


          return (
            <div
              key={
                index
              }

              style={{
                position:
                  "absolute",

                left:
                  x -
                  size /
                    2,

                top:
                  y -
                  size /
                    2,

                width:
                  size,

                height:
                  size,

                borderRadius:
                  "50%",

                background:
                  index %
                    2 ===
                  0
                    ? theme.colors.coral
                    : theme.colors.violet,

                opacity:
                  fade *
                  spread *
                  0.8,

                boxShadow:
                  index %
                    2 ===
                  0
                    ? "0 0 0 8px rgba(233,111,106,.08)"
                    : "0 0 0 8px rgba(156,114,212,.07)",
              }}
            />
          );
        }
      )}
    </div>
  );
};


/* =========================================================
   CONTAINMENT RING
   ========================================================= */

const ContainmentRing = ({
  progress,
}: {
  progress: number;
}) => {
  const frame =
    useCurrentFrame();


  const pulse =
    1 +
    Math.sin(
      frame /
        12
    ) *
      0.025;


  return (
    <div
      style={{
        position:
          "absolute",

        left:
          153,

        top:
          132,

        width:
          430,

        height:
          330,

        borderRadius:
          "50%",

        border:
          `6px solid ${theme.colors.teal}`,

        opacity:
          progress *
          0.65,

        transform: `
          scale(
            ${(0.84 + progress * 0.16) * pulse}
          )
        `,

        boxShadow: `
          0 0 0 14px rgba(53,166,161,.055),
          inset 0 0 40px rgba(53,166,161,.035)
        `,

        pointerEvents:
          "none",

        zIndex:
          5,
      }}
    />
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const PPEIsolationTracingShot = () => {
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


  /* =======================================================
     LEFT PANEL
     ======================================================= */

  const isolationPanelIn =
    spring({
      frame:
        frame -
        16,

      fps,

      config: {
        damping:
          180,

        stiffness:
          82,
      },
    });


  const patientIn =
    spring({
      frame:
        frame -
        28,

      fps,

      config: {
        damping:
          165,

        stiffness:
          96,
      },
    });


  const ppeIn =
    spring({
      frame:
        frame -
        40,

      fps,

      config: {
        damping:
          170,

        stiffness:
          92,
      },
    });


  const isolationIn =
    spring({
      frame:
        frame -
        52,

      fps,

      config: {
        damping:
          155,

        stiffness:
          90,
      },
    });


  /* =======================================================
     RIGHT PANEL
     ======================================================= */

  const tracingPanelIn =
    spring({
      frame:
        frame -
        28,

      fps,

      config: {
        damping:
          180,

        stiffness:
          82,
      },
    });


  /*
   * Contact spread remains open initially.
   *
   * Then containment gradually closes the network.
   */
  const contain =
    interpolate(
      frame,

      [
        78,
        158,
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


  const containP =
    clamp01(
      contain
    );


  /* =======================================================
     PULSE / RING MOTION
     ======================================================= */

  const isolationPulse =
    1 +
    Math.sin(
      frame /
        10
    ) *
      0.028;


  const contactPulse =
    1 +
    Math.sin(
      frame /
        11
    ) *
      0.014;


  /* =======================================================
     LEFT PANEL MOTION
     ======================================================= */

  const leftPanelX =
    interpolate(
      isolationPanelIn,

      [
        0,
        1,
      ],

      [
        -46,
        0,
      ]
    );


  const patientY =
    interpolate(
      patientIn,

      [
        0,
        1,
      ],

      [
        28,
        0,
      ]
    );


  const ppeX =
    interpolate(
      ppeIn,

      [
        0,
        1,
      ],

      [
        54,
        0,
      ]
    );


  const isolationScale =
    interpolate(
      isolationIn,

      [
        0,
        1,
      ],

      [
        0.88,
        1,
      ]
    );


  /* =======================================================
     RIGHT PANEL MOTION
     ======================================================= */

  const rightPanelX =
    interpolate(
      tracingPanelIn,

      [
        0,
        1,
      ],

      [
        46,
        0,
      ]
    );


  /*
   * Network starts slightly larger / more open,
   * then tightens as containment is achieved.
   */
  const networkScale =
    0.80 -
    containP *
      0.035;


  const spreadLabelOpacity =
    interpolate(
      frame,

      [
        44,
        64,
        108,
        142,
      ],

      [
        0,
        1,
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
      {/* =================================================
          BACKGROUND TEXTURE
          ================================================= */}

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
              rgba(35,66,82,.13) 0.7px,
              transparent 0.75px
            )
          `,

          backgroundSize:
            "8px 8px",

          pointerEvents:
            "none",
        }}
      />


      {/* =================================================
          HEADER
          ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            84,

          top:
            68,

          width:
            1450,

          zIndex:
            30,
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
                44 *
                eyebrowIn,

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
            Healthcare response
          </div>
        </div>


        {/* TITLE */}

        <div
          style={{
            marginTop:
              24,

            width:
              1450,

            fontFamily:
              FONT_STACK,

            fontSize:
              76,

            lineHeight:
              0.98,

            fontWeight:
              835,

            letterSpacing:
              -4.2,

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
          PPE, isolation, and contact tracing
          <br />

          help stop spread.
        </div>
      </div>


      {/* =================================================
          LEFT PANEL — ISOLATION + PPE
          ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            76,

          top:
            286,

          width:
            820,

          height:
            650,

          borderRadius:
            36,

          background:
            "rgba(255,255,255,.93)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 20px 52px rgba(52,42,35,.09)",

          overflow:
            "hidden",

          opacity:
            isolationPanelIn,

          transform: `
            translateX(
              ${leftPanelX}px
            )
          `,

          zIndex:
            10,
        }}
      >
        {/* PANEL LABEL */}

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
              "rgba(255,247,245,.96)",

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
              theme.colors.coralDark,
          }}
        >
          Isolation and PPE
        </div>


        {/* SOFT BACKGROUND AREA */}

        <div
          style={{
            position:
              "absolute",

            left:
              42,

            right:
              42,

            top:
              110,

            height:
              392,

            borderRadius:
              30,

            background: `
              linear-gradient(
                180deg,
                rgba(247,251,252,.94) 0%,
                rgba(241,247,250,.94) 100%
              )
            `,
          }}
        />


        {/* =================================================
            ISOLATION ZONE
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              72,

            top:
              150,

            width:
              310,

            height:
              324,

            borderRadius:
              34,

            border:
              `6px solid ${theme.colors.sky}`,

            boxShadow: `
              0 0 0
              ${12 * isolationIn}px
              rgba(101,167,232,.10)
            `,

            opacity:
              isolationIn,

            transform: `
              scale(
                ${isolationScale * isolationPulse}
              )
            `,

            transformOrigin:
              "center",
          }}
        >
          {/* ISOLATION LABEL */}

          <div
            style={{
              position:
                "absolute",

              left:
                20,

              top:
                18,

              padding:
                "8px 12px",

              borderRadius:
                999,

              background:
                "rgba(255,255,255,.94)",

              fontFamily:
                FONT_STACK,

              fontSize:
                14,

              lineHeight:
                1,

              fontWeight:
                850,

              letterSpacing:
                1.5,

              textTransform:
                "uppercase",

              color:
                theme.colors.sky,
            }}
          >
            Isolated
          </div>


          {/* PATIENT */}

          <div
            style={{
              position:
                "absolute",

              left:
                32,

              top:
                68,

              opacity:
                patientIn,

              transform: `
                translateY(
                  ${patientY}px
                )
              `,
            }}
          >
            <IllustratedPerson
              asset={
                ASSETS
                  .characters
                  .passengerA
              }

              width={
                232
              }

              sick={
                1
              }

              cough={
                0.45
              }
            />
          </div>
        </div>


        {/* =================================================
            PPE WORKER
            Larger and more prominent
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              42,

            top:
              140,

            opacity:
              ppeIn,

            transform: `
              translateX(
                ${ppeX}px
              )

              scale(
                ${0.92 + ppeIn * 0.08}
              )
            `,

            transformOrigin:
              "bottom center",

            zIndex:
              8,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .ppeWorker
            }

            width={
              320
            }
          />
        </div>


        {/* PPE LABEL */}

        <div
          style={{
            position:
              "absolute",

            right:
              58,

            top:
              454,

            padding:
              "10px 15px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.95)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 8px 22px rgba(52,42,35,.06)",

            opacity:
              ppeIn,

            fontFamily:
              FONT_STACK,

            fontSize:
              15,

            fontWeight:
              820,

            letterSpacing:
              1.4,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,
          }}
        >
          Protective equipment
        </div>


        {/* DESCRIPTION */}

        <div
          style={{
            position:
              "absolute",

            left:
              48,

            right:
              48,

            bottom:
              42,

            fontFamily:
              FONT_STACK,

            fontSize:
              25,

            lineHeight:
              1.36,

            fontWeight:
              540,

            letterSpacing:
              -0.3,

            color:
              theme.colors.muted,
          }}
        >
          The patient is isolated while healthcare workers
          use protective equipment to reduce exposure.
        </div>
      </div>


      {/* =================================================
          RIGHT PANEL — CONTACT TRACING
          ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            76,

          top:
            286,

          width:
            880,

          height:
            650,

          borderRadius:
            36,

          background:
            "rgba(255,255,255,.93)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 20px 52px rgba(52,42,35,.09)",

          overflow:
            "hidden",

          opacity:
            tracingPanelIn,

          transform: `
            translateX(
              ${rightPanelX}px
            )
          `,

          zIndex:
            10,
        }}
      >
        {/* PANEL LABEL */}

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
              20,
          }}
        >
          Contact tracing
        </div>


        {/* =================================================
            SPREAD LABEL
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              322,

            top:
              92,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              8,

            padding:
              "8px 12px",

            borderRadius:
              999,

            background:
              "rgba(255,247,245,.94)",

            border:
              "1px solid rgba(233,111,106,.20)",

            opacity:
              spreadLabelOpacity,

            transform:
              `translateY(${(1 - spreadLabelOpacity) * 8}px)`,

            zIndex:
              18,
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

          <span
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                14,

              fontWeight:
                800,

              letterSpacing:
                1.4,

              textTransform:
                "uppercase",

              color:
                theme.colors.coralDark,
            }}
          >
            Contacts spread outward
          </span>
        </div>


        {/* =================================================
            OUTWARD SPREAD ANIMATION
            ================================================= */}

        <SpreadField
          containment={
            containP
          }
        />


        {/* =================================================
            CONTAINMENT RING
            ================================================= */}

        <ContainmentRing
          progress={
            containP
          }
        />


        {/* =================================================
            CONTACT NETWORK

            Larger than before and settles inward as tracing
            contains the network.
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              4,

            top:
              82,

            width:
              780,

            height:
              450,

            transform: `
              scale(
                ${networkScale * contactPulse}
              )
            `,

            transformOrigin:
              "center",

            zIndex:
              10,
          }}
        >
          <ContactNetwork
            contained={
              containP
            }
          />
        </div>


        {/* =================================================
            CONTAINMENT STATUS
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              32,

            top:
              118,

            width:
              154,

            height:
              154,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            borderRadius:
              "50%",

            background:
              "rgba(247,252,251,.97)",

            border:
              `5px solid ${theme.colors.teal}`,

            opacity:
              containP,

            transform: `
              scale(
                ${0.72 + containP * 0.28}
              )
            `,

            boxShadow: `
              0 14px 30px rgba(14,141,151,.12),
              0 0 0 14px rgba(53,166,161,.06)
            `,

            zIndex:
              22,
          }}
        >
          <div
            style={{
              width:
                72,

              height:
                38,

              borderLeft:
                `8px solid ${theme.colors.teal}`,

              borderBottom:
                `8px solid ${theme.colors.teal}`,

              transform:
                "rotate(-45deg) translate(4px,-6px)",

              borderRadius:
                4,
            }}
          />
        </div>


        {/* STATUS LABEL */}

        <div
          style={{
            position:
              "absolute",

            right:
              37,

            top:
              292,

            padding:
              "9px 13px",

            borderRadius:
              999,

            background:
              "rgba(244,251,250,.96)",

            opacity:
              containP,

            transform:
              `translateY(${(1 - containP) * 8}px)`,

            fontFamily:
              FONT_STACK,

            fontSize:
              15,

            lineHeight:
              1,

            fontWeight:
              850,

            letterSpacing:
              1.5,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,

            zIndex:
              22,
          }}
        >
          Network contained
        </div>


        {/* DESCRIPTION */}

        <div
          style={{
            position:
              "absolute",

            left:
              48,

            right:
              48,

            bottom:
              42,

            fontFamily:
              FONT_STACK,

            fontSize:
              25,

            lineHeight:
              1.36,

            fontWeight:
              540,

            letterSpacing:
              -0.3,

            color:
              theme.colors.muted,

            zIndex:
              20,
          }}
        >
          Close contacts are identified and monitored, and
          outward spread stops as the network is contained.
        </div>
      </div>
    </div>
  );
};