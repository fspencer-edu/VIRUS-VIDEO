import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
   METRIC BLOCK
   ========================================================= */

const MetricBlock = ({
  eyebrow,
  value,
  label,
  detail,
  color,
  progress,
}: {
  eyebrow: string;
  value: string;
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
          590,

        padding:
          "25px 28px 24px 28px",

        borderRadius:
          28,

        background:
          "rgba(255,255,255,.92)",

        border:
          `1px solid ${color}25`,

        boxShadow:
          "0 16px 42px rgba(52,42,35,.08)",

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 16}px
          )

          scale(
            ${0.97 + p * 0.03}
          )
        `,

        transformOrigin:
          "left center",
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
            10,

          fontFamily:
            FONT_STACK,

          fontSize:
            16,

          fontWeight:
            850,

          letterSpacing:
            2,

          textTransform:
            "uppercase",

          color,
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
              color,

            boxShadow:
              `0 0 0 6px ${color}16`,
          }}
        />

        {eyebrow}
      </div>


      {/* VALUE */}

      <div
        style={{
          marginTop:
            14,

          fontFamily:
            TITLE_STACK,

          fontSize:
            92,

          lineHeight:
            0.9,

          fontWeight:
            820,

          letterSpacing:
            -4,

          color,
        }}
      >
        {value}
      </div>


      {/* LABEL */}

      <div
        style={{
          marginTop:
            14,

          fontFamily:
            TITLE_STACK,

          fontSize:
            27,

          lineHeight:
            1.12,

          fontWeight:
            760,

          letterSpacing:
            -0.6,

          color:
            theme.colors.ink,
        }}
      >
        {label}
      </div>


      {/* DETAIL */}

      <div
        style={{
          marginTop:
            8,

          fontFamily:
            FONT_STACK,

          fontSize:
            18,

          lineHeight:
            1.4,

          fontWeight:
            540,

          color:
            theme.colors.muted,
        }}
      >
        {detail}
      </div>
    </div>
  );
};


/* =========================================================
   SEVERITY CHIP
   ========================================================= */

const SeverityChip = ({
  text,
  color,
  progress,
}: {
  text: string;
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
        display:
          "inline-flex",

        alignItems:
          "center",

        gap:
          10,

        padding:
          "11px 15px",

        borderRadius:
          999,

        background:
          "rgba(255,255,255,.92)",

        border:
          `1px solid ${color}35`,

        boxShadow:
          "0 8px 22px rgba(52,42,35,.08)",

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 9}px
          )
        `,

        fontFamily:
          FONT_STACK,

        fontSize:
          17,

        fontWeight:
          760,

        color:
          theme.colors.ink,
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
            color,
        }}
      />

      {text}
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const SeverityShot = () => {
  const frame =
    useCurrentFrame();


  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     ENTRANCES
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


  const imageIn =
    spring({
      frame:
        frame - 8,

      fps,

      config: {
        damping:
          180,

        stiffness:
          82,
      },
    });


  const incubationIn =
    spring({
      frame:
        frame - 24,

      fps,

      config: {
        damping:
          170,

        stiffness:
          95,
      },
    });


  const fatalityIn =
    spring({
      frame:
        frame - 68,

      fps,

      config: {
        damping:
          170,

        stiffness:
          95,
      },
    });


  /* =======================================================
     X-RAY / SEVERITY PROGRESSION
     ======================================================= */

  const xrayFocus =
    interpolate(
      frame,
      [
        55,
        140,
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


  const severeStage =
    interpolate(
      frame,
      [
        118,
        190,
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


  const headerProgress =
    clamp01(
      headerIn
    );


  const imageProgress =
    clamp01(
      imageIn
    );


  const pulse =
    1 +
    Math.sin(
      frame /
        14
    ) *
      0.018;


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


      {/* ================================================= */}
      {/* LEFT CONTENT                                     */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            82,

          top:
            58,

          width:
            670,

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

        {/* EYEBROW */}

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

          Timing + severity
        </div>


        {/* ================================================= */}
        {/* TITLE                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              650,

            fontFamily:
              TITLE_STACK,

            fontSize:
              74,

            lineHeight:
              0.93,

            fontWeight:
              850,

            letterSpacing:
              -4,

            color:
              "#17243A",
          }}
        >
          Severe disease
          <br />

          can develop
          <br />

          after a delay.
        </div>


        {/* ================================================= */}
        {/* DESCRIPTION                                      */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              24,

            width:
              625,

            fontFamily:
              FONT_STACK,

            fontSize:
              27,

            lineHeight:
              1.38,

            fontWeight:
              570,

            letterSpacing:
              -0.45,

            color:
              "#596D82",
          }}
        >
          Symptoms may not appear immediately after exposure,
          but once cardiopulmonary disease develops,
          deterioration can be rapid.
        </div>


        {/* ================================================= */}
        {/* METRICS                                          */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              34,

            display:
              "grid",

            gap:
              18,
          }}
        >
          <MetricBlock
            eyebrow="Symptom onset"

            value="4–42 days"

            label="after exposure"

            detail="Andes virus symptoms can begin several days to several weeks after infection."

            color={
              theme.colors.sky
            }

            progress={
              incubationIn
            }
          />


          <MetricBlock
            eyebrow="Reported ANDV-HPS"

            value="20–40%"

            label="case fatality"

            detail="Severe Andes virus pulmonary syndrome can be life-threatening."

            color={
              theme.colors.coralDark
            }

            progress={
              fatalityIn
            }
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* X-RAY PANEL                                      */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            62,

          top:
            62,

          width:
            1110,

          height:
            914,

          overflow:
            "hidden",

          borderRadius:
            38,

          background:
            "#172330",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 26px 70px rgba(40,40,44,.16)",

          opacity:
            imageProgress,

          transform: `
            translateX(
              ${(1 - imageProgress) * 28}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* X-RAY IMAGE                                      */}
        {/* ================================================= */}

        <Img
          src={staticFile(
            ASSETS
              .pathogenesis
              .chestXray
              .src
          )}

          style={{
            position:
              "absolute",

            inset:
              0,

            width:
              "100%",

            height:
              "100%",

            objectFit:
              "cover",

            objectPosition:
              "center",

            display:
              "block",

            transform:
              `scale(${1.01 + xrayFocus * 0.025})`,

            transformOrigin:
              "50% 50%",
          }}
        />


        {/* ================================================= */}
        {/* DARK IMAGE GRADE                                 */}
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

                rgba(
                  6,
                  15,
                  24,
                  .10
                )
                0%,

                rgba(
                  6,
                  15,
                  24,
                  .04
                )
                45%,

                rgba(
                  6,
                  15,
                  24,
                  .62
                )
                100%
              )
            `,

            pointerEvents:
              "none",

            zIndex:
              5,
          }}
        />


        {/* ================================================= */}
        {/* PANEL LABEL                                      */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              28,

            top:
              26,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              9,

            padding:
              "10px 15px",

            borderRadius:
              999,

            background:
              "rgba(12,25,36,.68)",

            border:
              "1px solid rgba(255,255,255,.17)",

            backdropFilter:
              "blur(12px)",

            fontFamily:
              FONT_STACK,

            fontSize:
              16,

            fontWeight:
              850,

            letterSpacing:
              1.7,

            textTransform:
              "uppercase",

            color:
              "#FFFFFF",

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
                theme.colors.coral,
            }}
          />

          Severe pulmonary disease
        </div>


        {/* ================================================= */}
        {/* LUNG FOCUS                                      */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              "50%",

            top:
              "49%",

            width:
              550,

            height:
              620,

            borderRadius:
              "46%",

            border: `
              4px
              solid
              rgba(
                233,
                111,
                106,
                ${
                  xrayFocus *
                  0.40
                }
              )
            `,

            boxShadow: `
              0
              0
              100px
              rgba(
                233,
                111,
                106,
                ${
                  xrayFocus *
                  0.10
                }
              )
            `,

            transform: `
              translate(
                -50%,
                -50%
              )

              scale(
                ${pulse}
              )
            `,

            opacity:
              xrayFocus,

            pointerEvents:
              "none",

            zIndex:
              12,
          }}
        />


        {/* ================================================= */}
        {/* SEVERITY INDICATORS                              */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              34,

            top:
              108,

            display:
              "grid",

            justifyItems:
              "end",

            gap:
              12,

            zIndex:
              30,
          }}
        >
          <SeverityChip
            text="Fluid accumulation"

            color={
              theme.colors.sky
            }

            progress={
              xrayFocus
            }
          />


          <SeverityChip
            text="Reduced oxygen exchange"

            color={
              theme.colors.violet
            }

            progress={
              severeStage
            }
          />


          <SeverityChip
            text="Respiratory failure risk"

            color={
              theme.colors.coral
            }

            progress={
              severeStage
            }
          />
        </div>


        {/* ================================================= */}
        {/* BOTTOM CLINICAL MESSAGE                          */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              32,

            right:
              32,

            bottom:
              28,

            padding:
              "22px 24px",

            borderRadius:
              24,

            background:
              "rgba(8,20,31,.72)",

            border:
              "1px solid rgba(255,255,255,.14)",

            backdropFilter:
              "blur(14px)",

            opacity:
              severeStage,

            transform: `
              translateY(
                ${(1 - severeStage) * 12}px
              )
            `,

            zIndex:
              30,
          }}
        >
          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                15,

              fontWeight:
                850,

              letterSpacing:
                1.7,

              textTransform:
                "uppercase",

              color:
                "#F7B7B1",
            }}
          >
            Severe HPS
          </div>


          <div
            style={{
              marginTop:
                7,

              fontFamily:
                TITLE_STACK,

              fontSize:
                28,

              lineHeight:
                1.22,

              fontWeight:
                750,

              letterSpacing:
                -0.5,

              color:
                "#FFFFFF",
            }}
          >
            Fluid-filled lungs can lead to profound
            breathing difficulty, respiratory failure,
            and shock.
          </div>
        </div>
      </div>
    </div>
  );
};