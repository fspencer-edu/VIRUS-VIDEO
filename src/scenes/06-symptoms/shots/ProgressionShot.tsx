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
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import {
  BreathingLungs,
} from "../../../components/graphics/BreathingLungs";

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
   PROGRESSION STEP
   ========================================================= */

const ProgressionStep = ({
  number,
  title,
  detail,
  color,
  progress,
}: {
  number: string;
  title: string;
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
        display:
          "flex",

        alignItems:
          "flex-start",

        gap:
          16,

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 12}px
          )
        `,
      }}
    >
      <div
        style={{
          width:
            45,

          height:
            45,

          flex:
            "0 0 auto",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          borderRadius:
            "50%",

          background:
            color,

          color:
            "#FFFFFF",

          fontFamily:
            FONT_STACK,

          fontSize:
            18,

          fontWeight:
            850,

          boxShadow:
            `0 9px 22px ${color}2D`,
        }}
      >
        {number}
      </div>


      <div
        style={{
          width:
            575,
        }}
      >
        <div
          style={{
            fontFamily:
              TITLE_STACK,

            fontSize:
              23,

            lineHeight:
              1.12,

            fontWeight:
              800,

            letterSpacing:
              -0.55,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        <div
          style={{
            marginTop:
              5,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            lineHeight:
              1.34,

            fontWeight:
              540,

            color:
              theme.colors.muted,
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};


/* =========================================================
   STATUS CHIP
   ========================================================= */

const StatusChip = ({
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
          "rgba(255,255,255,.94)",

        border:
          `1px solid ${color}3D`,

        boxShadow:
          "0 9px 24px rgba(52,42,35,.08)",

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
          780,

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

          boxShadow:
            `0 0 0 6px ${color}16`,
        }}
      />

      {text}
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const ProgressionShot = () => {
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


  const visualIn =
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


  const personIn =
    spring({
      frame:
        frame - 12,

      fps,

      config: {
        damping:
          175,

        stiffness:
          90,
      },
    });


  /* =======================================================
     SEVERITY PROGRESSION
     ======================================================= */

  const coughStage =
    interpolate(
      frame,
      [
        20,
        72,
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


  const breathlessnessStage =
    interpolate(
      frame,
      [
        66,
        126,
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


  const careStage =
    interpolate(
      frame,
      [
        110,
        172,
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


  const severe =
    interpolate(
      frame,
      [
        140,
        240,
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


  const warningStage =
    interpolate(
      frame,
      [
        205,
        260,
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


  const visualProgress =
    clamp01(
      visualIn
    );


  const personProgress =
    clamp01(
      personIn
    );


  /* =======================================================
     BREATHING / DISTRESS MOTION
     ======================================================= */

  const breathingScale =
    1 +
    Math.sin(
      frame /
        (
          18 -
          severe *
            6
        )
    ) *
      (
        0.012 +
        severe *
          0.012
      );


  const distressShift =
    Math.sin(
      frame /
        9
    ) *
    severe *
    4;


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
      {/* BACKGROUND GLOW                                  */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            -130,

          top:
            40,

          width:
            1050,

          height:
            1050,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(233,111,106,.075) 0%,
              rgba(233,111,106,.022) 45%,
              transparent 72%
            )
          `,

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

          Respiratory stage
        </div>


        {/* ================================================= */}
        {/* TITLE                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              22,

            width:
              660,

            fontFamily:
              TITLE_STACK,

            fontSize:
              76,

            lineHeight:
              0.93,

            fontWeight:
              850,

            letterSpacing:
              -4.1,

            color:
              "#17243A",
          }}
        >
          Breathing
          <br />

          becomes the
          <br />

          major concern.
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
              28,

            lineHeight:
              1.37,

            fontWeight:
              570,

            letterSpacing:
              -0.45,

            color:
              "#596D82",
          }}
        >
          As fluid accumulates in the lungs, patients can
          progress from cough and shortness of breath to
          severe respiratory distress.
        </div>


        {/* ================================================= */}
        {/* PROGRESSION STEPS                                */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              34,

            display:
              "grid",

            gap:
              19,
          }}
        >
          <ProgressionStep
            number="1"

            title="Cough develops"

            detail="Respiratory symptoms become more prominent."

            color={
              theme.colors.teal
            }

            progress={
              coughStage
            }
          />


          <ProgressionStep
            number="2"

            title="Shortness of breath worsens"

            detail="Fluid in the lungs makes oxygen exchange harder."

            color={
              theme.colors.coral
            }

            progress={
              breathlessnessStage
            }
          />


          <ProgressionStep
            number="3"

            title="Supportive care may be needed"

            detail="Severe cases may require oxygen, ventilation or intensive care."

            color={
              theme.colors.violet
            }

            progress={
              careStage
            }
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* RIGHT VISUAL PANEL                               */}
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
            "rgba(255,255,255,.96)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 26px 70px rgba(56,43,33,.11)",

          opacity:
            visualProgress,

          transform: `
            translateX(
              ${(1 - visualProgress) * 28}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* TOP PANEL LABEL                                  */}
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
              "rgba(255,255,255,.94)",

            border:
              "1px solid rgba(233,111,106,.14)",

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
              theme.colors.coralDark,

            zIndex:
              50,
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

          Disease progression
        </div>


        {/* ================================================= */}
        {/* TREATMENT / CLINICAL PHOTO                       */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              34,

            top:
              110,

            width:
              590,

            height:
              680,

            overflow:
              "hidden",

            borderRadius:
              28,

            background:
              "#DDE5E8",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 18px 44px rgba(42,47,53,.10)",

            opacity:
              1 -
              severe *
                0.46,

            transform: `
              translateX(
                ${severe * -18}px
              )
            `,

            zIndex:
              5,
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .symptoms
                .treatmentPhoto
            }

            width={
              590
            }

            height={
              680
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


          {/* DARK BOTTOM GRADE */}

          <div
            style={{
              position:
                "absolute",

              inset:
                0,

              background: `
                linear-gradient(
                  180deg,
                  transparent 55%,
                  rgba(12,25,36,.50) 100%
                )
              `,

              pointerEvents:
                "none",
            }}
          />


          {/* LABEL */}

          <div
            style={{
              position:
                "absolute",

              left:
                24,

              bottom:
                24,

              fontFamily:
                FONT_STACK,

              fontSize:
                24,

              lineHeight:
                1.2,

              fontWeight:
                760,

              color:
                "#FFFFFF",

              textShadow:
                "0 2px 12px rgba(0,0,0,.30)",
            }}
          >
            Supportive respiratory care
          </div>
        </div>


        {/* ================================================= */}
        {/* PATIENT                                         */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              370,

            bottom:
              48,

            opacity:
              personProgress,

            transform: `
              translateY(
                ${
                  (
                    1 -
                    personProgress
                  ) *
                  20 +
                  distressShift
                }px
              )

              scale(
                ${0.94 + personProgress * 0.06}
              )
            `,

            transformOrigin:
              "bottom center",

            zIndex:
              20,
          }}
        >
          <IllustratedPerson
            asset={
              ASSETS
                .characters
                .passengerB
            }

            width={
              390
            }

            sick={
              1
            }

            cough={
              1
            }

            rotate={
              5
            }

            bob={
              0.18
            }
          />
        </div>


        {/* ================================================= */}
        {/* LUNGS                                           */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              4,

            top:
              145,

            width:
              560,

            height:
              560,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            opacity:
              0.18 +
              severe *
                0.82,

            transform: `
              translateX(
                ${(1 - severe) * 40}px
              )

              scale(
                ${
                  (
                    0.91 +
                    severe *
                      0.09
                  ) *
                  breathingScale
                }
              )
            `,

            transformOrigin:
              "50% 55%",

            zIndex:
              18,
          }}
        >
          <BreathingLungs
            width={
              540
            }

            fluid={
              severe
            }
          />
        </div>


        {/* ================================================= */}
        {/* RESPIRATORY DISTRESS HALO                        */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              92,

            top:
              205,

            width:
              400,

            height:
              400,

            borderRadius:
              "50%",

            border: `
              4px
              solid
              rgba(
                233,
                111,
                106,
                ${
                  severe *
                  0.34
                }
              )
            `,

            boxShadow: `
              0
              0
              80px
              rgba(
                233,
                111,
                106,
                ${
                  severe *
                  0.10
                }
              )
            `,

            transform:
              `scale(${breathingScale})`,

            opacity:
              severe,

            pointerEvents:
              "none",

            zIndex:
              15,
          }}
        />


        {/* ================================================= */}
        {/* SYMPTOM CHIPS                                    */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            right:
              42,

            bottom:
              210,

            display:
              "grid",

            gap:
              12,

            justifyItems:
              "end",

            zIndex:
              40,
          }}
        >
          <StatusChip
            text="Cough"

            color={
              theme.colors.teal
            }

            progress={
              coughStage
            }
          />


          <StatusChip
            text="Shortness of breath"

            color={
              theme.colors.coral
            }

            progress={
              breathlessnessStage
            }
          />


          <StatusChip
            text="Severe breathing difficulty"

            color={
              theme.colors.violet
            }

            progress={
              severe
            }
          />
        </div>


        {/* ================================================= */}
        {/* SEVERE WARNING                                  */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              34,

            right:
              34,

            bottom:
              26,

            minHeight:
              122,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap:
              30,

            padding:
              "20px 24px",

            boxSizing:
              "border-box",

            borderRadius:
              24,

            background: `
              linear-gradient(
                90deg,
                rgba(233,111,106,.10),
                rgba(156,114,212,.08)
              )
            `,

            border:
              "1px solid rgba(233,111,106,.16)",

            opacity:
              warningStage,

            transform: `
              translateY(
                ${(1 - warningStage) * 12}px
              )
            `,

            zIndex:
              50,
          }}
        >
          <div>
            <div
              style={{
                fontFamily:
                  FONT_STACK,

                fontSize:
                  15,

                fontWeight:
                  850,

                letterSpacing:
                  1.8,

                textTransform:
                  "uppercase",

                color:
                  theme.colors.coralDark,
              }}
            >
              Severe stage
            </div>


            <div
              style={{
                marginTop:
                  6,

                fontFamily:
                  TITLE_STACK,

                fontSize:
                  27,

                lineHeight:
                  1.18,

                fontWeight:
                  780,

                letterSpacing:
                  -0.6,

                color:
                  theme.colors.ink,
              }}
            >
              Respiratory failure and shock can develop
              rapidly in severe HPS.
            </div>
          </div>


          <div
            style={{
              width:
                72,

              height:
                72,

              flex:
                "0 0 auto",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              borderRadius:
                "50%",

              background:
                "rgba(233,111,106,.13)",

              color:
                theme.colors.coralDark,

              fontFamily:
                FONT_STACK,

              fontSize:
                36,

              fontWeight:
                850,
            }}
          >
            !
          </div>
        </div>
      </div>
    </div>
  );
};