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
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";


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
   MAP BADGE
   ========================================================= */

const MapBadge = ({
  x,
  y,
  label,
  active = false,
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
}) => (
  <>
    <div
      style={{
        position:
          "absolute",

        left:
          x - 7,

        top:
          y - 7,

        width:
          14,

        height:
          14,

        borderRadius:
          "50%",

        background:
          active
            ? theme.colors.coral
            : theme.colors.teal,

        boxShadow:
          active
            ? "0 0 0 10px rgba(233,111,106,.14)"
            : "0 0 0 8px rgba(53,166,161,.12)",
      }}
    />

    <div
      style={{
        position:
          "absolute",

        left:
          x + 14,

        top:
          y - 18,

        padding:
          "7px 11px",

        borderRadius:
          14,

        background:
          "rgba(255,255,255,.92)",

        border:
          `1px solid ${theme.colors.line}`,

        fontFamily:
          FONT_STACK,

        fontSize:
          16,

        fontWeight:
          700,

        color:
          theme.colors.ink,

        boxShadow:
          "0 8px 20px rgba(52,42,35,.08)",
      }}
    >
      {label}
    </div>
  </>
);


/* =========================================================
   TRANSMISSION STEP
   ========================================================= */

const TransmissionStep = ({
  number,
  title,
  detail,
  progress,
  accent,
}: {
  number: string;
  title: string;
  detail: string;
  progress: number;
  accent: string;
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
          17,

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 14}px
          )
        `,
      }}
    >
      {/* NUMBER */}

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
            accent,

          color:
            "#FFFFFF",

          fontFamily:
            FONT_STACK,

          fontSize:
            18,

          fontWeight:
            850,

          boxShadow:
            `0 8px 20px ${accent}33`,
        }}
      >
        {number}
      </div>


      {/* COPY */}

      <div
        style={{
          paddingTop:
            1,

          maxWidth:
            500,
        }}
      >
        <div
          style={{
            fontFamily:
              FONT_STACK,

            fontSize:
              23,

            lineHeight:
              1.1,

            fontWeight:
              800,

            letterSpacing:
              -0.5,

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
              19,

            lineHeight:
              1.38,

            fontWeight:
              520,

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
   EXPOSURE LABEL
   ========================================================= */

const ExposureLabel = ({
  progress,
}: {
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

        right:
          86,

        bottom:
          90,

        width:
          470,

        padding:
          "22px 25px",

        borderRadius:
          24,

        background:
          "rgba(255,255,255,.90)",

        border:
          "1px solid rgba(255,255,255,.65)",

        backdropFilter:
          "blur(14px)",

        boxShadow:
          "0 18px 48px rgba(28,35,42,.16)",

        opacity:
          p,

        transform: `
          translateY(
            ${(1 - p) * 18}px
          )
        `,

        zIndex:
          20,
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
              theme.colors.coral,
          }}
        />

        <div
          style={{
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

            color:
              theme.colors.coralDark,
          }}
        >
          Exposure pathway
        </div>
      </div>

      <div
        style={{
          marginTop:
            12,

          fontFamily:
            FONT_STACK,

          fontSize:
            25,

          lineHeight:
            1.28,

          fontWeight:
            700,

          letterSpacing:
            -0.5,

          color:
            theme.colors.ink,
        }}
      >
        Virus-containing particles can become airborne when
        contaminated material is disturbed.
      </div>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const RodentReservoirShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     MAP → LANDSCAPE TRANSITION
     ======================================================= */

  const mapFade =
    interpolate(
      frame,
      [
        0,
        38,
        72,
      ],
      [
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


  const landscapeFade =
    interpolate(
      frame,
      [
        42,
        82,
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
     TEXT REVEALS
     ======================================================= */

  const headerIn =
    spring({
      frame:
        frame - 4,

      fps,

      config: {
        damping:
          180,

        stiffness:
          90,
      },
    });


  const step1 =
    spring({
      frame:
        frame - 76,

      fps,

      config: {
        damping:
          170,

        stiffness:
          100,
      },
    });


  const step2 =
    spring({
      frame:
        frame - 98,

      fps,

      config: {
        damping:
          170,

        stiffness:
          100,
      },
    });


  const step3 =
    spring({
      frame:
        frame - 120,

      fps,

      config: {
        damping:
          170,

        stiffness:
          100,
      },
    });


  const exposureIn =
    spring({
      frame:
        frame - 132,

      fps,

      config: {
        damping:
          170,

        stiffness:
          95,
      },
    });


  const headerProgress =
    clamp01(
      headerIn
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

        background:
          "linear-gradient(180deg, #F8F3EB 0%, #FFF9F2 100%)",
      }}
    >

      {/* ================================================= */}
      {/* INITIAL SOUTH AMERICA MAP                        */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            880,

          top:
            70,

          width:
            930,

          height:
            690,

          opacity:
            mapFade,

          transform: `
            translateY(
              ${(1 - mapFade) * 12}px
            )

            scale(
              ${1 - (1 - mapFade) * 0.03}
            )
          `,

          zIndex:
            4,
        }}
      >
        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            borderRadius:
              32,

            background:
              theme.colors.white,

            border:
              `1px solid ${theme.colors.line}`,

            overflow:
              "hidden",

            boxShadow:
              "0 20px 60px rgba(52,42,35,.10)",
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .canada
                .southAmericaMap
            }

            width={
              930
            }

            height={
              690
            }

            zoom={
              1
            }

            organic={
              false
            }

            showCredit={
              false
            }
          />
        </div>


        <div
          style={{
            position:
              "absolute",

            inset:
              0,
          }}
        >
          <MapBadge
            x={420}
            y={390}
            label="Argentina"
            active
          />

          <MapBadge
            x={330}
            y={470}
            label="Chile"
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* FULL-SCREEN RODENT ENVIRONMENT                   */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          opacity:
            landscapeFade,

          zIndex:
            5,
        }}
      >
        <CinematicCamera
          durationInFrames={
            360
          }

          /*
           * Much gentler than the previous 1.16 zoom.
           */
          from={{
            x:
              12,

            y:
              2,

            scale:
              1.01,
          }}

          to={{
            x:
              -14,

            y:
              -4,

            scale:
              1.045,
          }}

          origin="69% 52%"
        >
          <div
            style={{
              position:
                "absolute",

              inset:
                0,
            }}
          >
            <EditorialAsset
              asset={
                ASSETS
                  .transmission
                  .rodentInfested
              }

              width={
                1920
              }

              height={
                1080
              }

              zoom={
                1
              }

              panX={
                0
              }

              panY={
                0
              }

              objectPosition="center"

              organic={
                false
              }

              showCredit
            />
          </div>
        </CinematicCamera>


        {/* ================================================= */}
        {/* LEFT READABILITY GRADIENT                        */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            inset:
              0,

            background: `
              linear-gradient(
                90deg,

                rgba(
                  248,
                  243,
                  235,
                  .98
                )
                0%,

                rgba(
                  248,
                  243,
                  235,
                  .94
                )
                25%,

                rgba(
                  248,
                  243,
                  235,
                  .72
                )
                42%,

                rgba(
                  248,
                  243,
                  235,
                  .26
                )
                58%,

                rgba(
                  248,
                  243,
                  235,
                  0
                )
                76%
              )
            `,

            pointerEvents:
              "none",
          }}
        />


        {/* ================================================= */}
        {/* BOTTOM GRADIENT                                  */}
        {/* ================================================= */}

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
              150,

            background: `
              linear-gradient(
                180deg,

                rgba(
                  248,
                  243,
                  235,
                  0
                )
                0%,

                rgba(
                  248,
                  243,
                  235,
                  .82
                )
                100%
              )
            `,

            pointerEvents:
              "none",
          }}
        />
      </div>


      {/* ================================================= */}
      {/* MAIN COPY                                         */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            84,

          top:
            72,

          width:
            790,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${(1 - headerProgress) * 16}px
            )
          `,

          zIndex:
            20,
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
              "10px 16px",

            borderRadius:
              999,

            background:
              "rgba(53,166,161,.12)",

            color:
              theme.colors.tealDark,

            fontFamily:
              FONT_STACK,

            fontSize:
              17,

            fontWeight:
              850,

            letterSpacing:
              2.2,

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
                theme.colors.teal,
            }}
          />

          Reservoir host
        </div>


        {/* ================================================= */}
        {/* TITLE                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              20,

            fontFamily:
              TITLE_STACK,

            fontSize:
              66,

            lineHeight:
              0.98,

            fontWeight:
              820,

            letterSpacing:
              -3.2,

            color:
              theme.colors.ink,
          }}
        >
          Andes virus circulates
          <br />
          in South American rodents.
        </div>


        {/* ================================================= */}
        {/* INTRO                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              19,

            width:
              720,

            fontFamily:
              FONT_STACK,

            fontSize:
              27,

            lineHeight:
              1.4,

            fontWeight:
              560,

            letterSpacing:
              -0.4,

            color:
              theme.colors.muted,
          }}
        >
          A key reservoir is the long-tailed pygmy rice rat.
          Infected rodents can shed the virus into their
          surroundings.
        </div>


        {/* ================================================= */}
        {/* TRANSMISSION STEPS                                */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              35,

            display:
              "grid",

            gap:
              23,

            width:
              650,
          }}
        >
          <TransmissionStep
            number="1"
            title="Rodents shed the virus"
            detail="Virus can be present in urine, droppings and saliva."
            progress={
              step1
            }
            accent={
              theme.colors.teal
            }
          />


          <TransmissionStep
            number="2"
            title="Contaminated material is disturbed"
            detail="Cleaning, sweeping or moving contaminated material can release tiny particles into the air."
            progress={
              step2
            }
            accent={
              theme.colors.coral
            }
          />


          <TransmissionStep
            number="3"
            title="People can inhale the particles"
            detail="Exposure can occur when contaminated particles reach the respiratory tract."
            progress={
              step3
            }
            accent={
              theme.colors.violet
            }
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* EXPOSURE CALLOUT ON PHOTO                         */}
      {/* ================================================= */}

      <ExposureLabel
        progress={
          exposureIn
        }
      />
    </div>
  );
};