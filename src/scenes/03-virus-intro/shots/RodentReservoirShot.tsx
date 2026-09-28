import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
        position: "absolute",

        left:
          x - 8,

        top:
          y - 8,

        width: 16,
        height: 16,

        borderRadius:
          "50%",

        background:
          active
            ? theme.colors.coral
            : theme.colors.teal,

        boxShadow:
          active
            ? "0 0 0 11px rgba(233,111,106,.14)"
            : "0 0 0 9px rgba(53,166,161,.12)",
      }}
    />

    <div
      style={{
        position: "absolute",

        left:
          x + 18,

        top:
          y - 20,

        padding:
          "8px 13px",

        borderRadius:
          14,

        background:
          "rgba(255,255,255,.94)",

        border:
          `1px solid ${theme.colors.line}`,

        fontFamily:
          FONT_STACK,

        fontSize: 17,

        fontWeight: 750,

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
        display: "flex",

        alignItems:
          "flex-start",

        gap: 18,

        opacity: p,

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
          width: 48,
          height: 48,

          flex:
            "0 0 auto",

          display: "flex",

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

          fontSize: 19,

          fontWeight: 850,

          boxShadow:
            `0 9px 22px ${accent}33`,
        }}
      >
        {number}
      </div>


      {/* COPY */}

      <div
        style={{
          paddingTop: 1,

          width: 600,
        }}
      >
        <div
          style={{
            fontFamily:
              TITLE_STACK,

            fontSize: 25,

            lineHeight: 1.08,

            fontWeight: 800,

            letterSpacing: -0.7,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        <div
          style={{
            marginTop: 5,

            fontFamily:
              FONT_STACK,

            fontSize: 19,

            lineHeight: 1.34,

            fontWeight: 550,

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
     MAP → ENVIRONMENT TRANSITION
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
     TEXT ENTRANCE
     ======================================================= */

  const headerIn =
    spring({
      frame:
        frame - 4,

      fps,

      config: {
        damping: 180,
        stiffness: 90,
      },
    });


  const step1 =
    spring({
      frame:
        frame - 76,

      fps,

      config: {
        damping: 170,
        stiffness: 100,
      },
    });


  const step2 =
    spring({
      frame:
        frame - 98,

      fps,

      config: {
        damping: 170,
        stiffness: 100,
      },
    });


  const step3 =
    spring({
      frame:
        frame - 120,

      fps,

      config: {
        damping: 170,
        stiffness: 100,
      },
    });


  const headerProgress =
    clamp01(
      headerIn
    );


  return (
    <div
      style={{
        position: "absolute",

        inset: 0,

        overflow: "hidden",

        background:
          "#F8F3EB",
      }}
    >

      {/* ================================================= */}
      {/* INITIAL MAP                                      */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          left: 840,
          top: 68,

          width: 970,
          height: 720,

          opacity:
            mapFade,

          transform: `
            translateY(
              ${(1 - mapFade) * 12}px
            )

            scale(
              ${0.98 + mapFade * 0.02}
            )
          `,

          zIndex: 4,
        }}
      >
        <div
          style={{
            position: "absolute",

            inset: 0,

            borderRadius: 32,

            background:
              theme.colors.white,

            border:
              `1px solid ${theme.colors.line}`,

            overflow: "hidden",

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

            width={970}
            height={720}

            zoom={1}

            organic={false}

            showCredit={false}
          />
        </div>


        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <MapBadge
            x={438}
            y={407}
            label="Argentina"
            active
          />

          <MapBadge
            x={342}
            y={492}
            label="Chile"
          />
        </div>
      </div>


      {/* ================================================= */}
      {/* FULL-SCREEN REAL RODENT PHOTO                    */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          inset: 0,

          opacity:
            landscapeFade,

          overflow: "hidden",

          zIndex: 5,
        }}
      >
        <Img
          src={staticFile(
            ASSETS
              .transmission
              .rodentInfested
              .src
          )}

          style={{
            position: "absolute",

            inset: 0,

            width: "100%",
            height: "100%",

            objectFit: "cover",

            /*
             * Keeps the real rat toward the
             * right side of the composition.
             */
            objectPosition:
              "62% 50%",

            display: "block",
          }}
        />


        {/* ================================================= */}
        {/* SUBTLE PHOTO GRADE                               */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            inset: 0,

            background: `
              linear-gradient(
                180deg,

                rgba(
                  20,
                  18,
                  15,
                  .03
                )
                0%,

                rgba(
                  20,
                  18,
                  15,
                  0
                )
                60%,

                rgba(
                  20,
                  18,
                  15,
                  .08
                )
                100%
              )
            `,

            pointerEvents:
              "none",
          }}
        />


        {/* ================================================= */}
        {/* LARGE LEFT READABILITY GRADIENT                  */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            inset: 0,

            background: `
              linear-gradient(
                90deg,

                rgba(
                  248,
                  243,
                  235,
                  1
                )
                0%,

                rgba(
                  248,
                  243,
                  235,
                  .985
                )
                22%,

                rgba(
                  248,
                  243,
                  235,
                  .94
                )
                34%,

                rgba(
                  248,
                  243,
                  235,
                  .72
                )
                46%,

                rgba(
                  248,
                  243,
                  235,
                  .28
                )
                59%,

                rgba(
                  248,
                  243,
                  235,
                  .06
                )
                70%,

                rgba(
                  248,
                  243,
                  235,
                  0
                )
                78%
              )
            `,

            pointerEvents:
              "none",
          }}
        />


        {/* ================================================= */}
        {/* BOTTOM READABILITY FADE                          */}
        {/* ================================================= */}

        <div
          style={{
            position: "absolute",

            left: 0,
            right: 0,
            bottom: 0,

            height: 120,

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
                  .68
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
      {/* MAIN COPY                                        */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          left: 82,
          top: 60,

          width: 890,

          opacity:
            headerProgress,

          transform: `
            translateY(
              ${(1 - headerProgress) * 16}px
            )
          `,

          zIndex: 20,
        }}
      >

        {/* ================================================= */}
        {/* EYEBROW                                           */}
        {/* ================================================= */}

        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap: 10,

            padding:
              "11px 17px",

            borderRadius: 999,

            background:
              "rgba(53,166,161,.13)",

            border:
              "1px solid rgba(53,166,161,.08)",

            color:
              theme.colors.tealDark,

            fontFamily:
              FONT_STACK,

            fontSize: 18,

            fontWeight: 850,

            letterSpacing: 2.3,

            textTransform:
              "uppercase",
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,

              borderRadius:
                "50%",

              background:
                theme.colors.teal,
            }}
          />

          Reservoir host
        </div>


        {/* ================================================= */}
        {/* LARGE TITLE                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop: 20,

            width: 860,

            fontFamily:
              TITLE_STACK,

            fontSize: 82,

            lineHeight: 0.91,

            fontWeight: 850,

            letterSpacing: -4.5,

            color:
              "#17243A",
          }}
        >
          Andes virus circulates
          <br />

          in South American
          <br />

          rodents.
        </div>


        {/* ================================================= */}
        {/* INTRO                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop: 24,

            width: 780,

            fontFamily:
              FONT_STACK,

            fontSize: 29,

            lineHeight: 1.34,

            fontWeight: 590,

            letterSpacing: -0.55,

            color:
              "#596D82",
          }}
        >
          A key reservoir is the long-tailed pygmy rice rat.
          Infected rodents can shed Andes virus into their
          surroundings.
        </div>


        {/* ================================================= */}
        {/* TRANSMISSION STEPS                                */}
        {/* ================================================= */}

        <div
          style={{
            marginTop: 31,

            display: "grid",

            gap: 20,

            width: 720,
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

            detail="Sweeping, cleaning or moving contaminated material can release tiny particles into the air."

            progress={
              step2
            }

            accent={
              theme.colors.coral
            }
          />


          <TransmissionStep
            number="3"

            title="People inhale contaminated particles"

            detail="Airborne particles can enter the respiratory tract and cause infection."

            progress={
              step3
            }

            accent={
              theme.colors.violet
            }
          />
        </div>
      </div>
    </div>
  );
};