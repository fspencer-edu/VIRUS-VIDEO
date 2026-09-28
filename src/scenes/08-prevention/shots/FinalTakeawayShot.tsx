import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

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
   TAKEAWAY ITEM
   ========================================================= */

const TakeawayItem = ({
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
        position: "relative",

        display: "flex",

        alignItems: "flex-start",

        gap: 24,

        width: "100%",

        padding:
          "28px 30px",

        boxSizing:
          "border-box",

        borderRadius: 26,

        background:
          "rgba(255,255,255,.82)",

        border:
          `1px solid ${color}25`,

        boxShadow:
          "0 14px 34px rgba(52,42,35,.06)",

        opacity: p,

        transform: `
          translateY(
            ${(1 - p) * 18}px
          )

          scale(
            ${0.98 + p * 0.02}
          )
        `,

        transformOrigin:
          "left center",
      }}
    >

      {/* ================================================= */}
      {/* NUMBER                                            */}
      {/* ================================================= */}

      <div
        style={{
          width: 58,
          height: 58,

          flex:
            "0 0 auto",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          borderRadius:
            "50%",

          background:
            color,

          color:
            "#FFFFFF",

          fontFamily:
            FONT_STACK,

          fontSize: 22,

          fontWeight: 900,

          boxShadow:
            `0 10px 24px ${color}30`,
        }}
      >
        {number}
      </div>


      {/* ================================================= */}
      {/* COPY                                              */}
      {/* ================================================= */}

      <div
        style={{
          flex: 1,

          paddingTop: 1,
        }}
      >
        <div
          style={{
            fontFamily:
              FONT_STACK,

            fontSize: 32,

            lineHeight: 1.05,

            fontWeight: 900,

            letterSpacing: -1,

            color:
              theme.colors.ink,
          }}
        >
          {title}
        </div>


        <div
          style={{
            marginTop: 10,

            maxWidth: 910,

            fontFamily:
              FONT_STACK,

            fontSize: 21,

            lineHeight: 1.38,

            fontWeight: 600,

            letterSpacing: -0.25,

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
   FINAL STATEMENT
   ========================================================= */

const FinalStatement = ({
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
        display: "flex",

        alignItems: "center",

        gap: 20,

        opacity: p,

        transform: `
          translateY(
            ${(1 - p) * 15}px
          )
        `,
      }}
    >
      <div
        style={{
          width: 5,

          height:
            76 * p,

          borderRadius: 999,

          background:
            theme.colors.teal,
        }}
      />


      <div
        style={{
          fontFamily:
            FONT_STACK,

          fontSize: 30,

          lineHeight: 1.25,

          fontWeight: 750,

          letterSpacing: -0.65,

          color:
            theme.colors.ink,
        }}
      >
        Understanding how Andes virus spreads is what allows
        outbreaks to be identified and controlled.
      </div>
    </div>
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const FinalTakeawayShot = () => {
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
        damping: 180,
        stiffness: 90,
      },
    });


  /* =======================================================
     TAKEAWAYS
     ======================================================= */

  const takeaway1 =
    spring({
      frame:
        frame - 28,

      fps,

      config: {
        damping: 175,
        stiffness: 92,
      },
    });


  const takeaway2 =
    spring({
      frame:
        frame - 62,

      fps,

      config: {
        damping: 175,
        stiffness: 92,
      },
    });


  const takeaway3 =
    spring({
      frame:
        frame - 96,

      fps,

      config: {
        damping: 175,
        stiffness: 92,
      },
    });


  const finalIn =
    spring({
      frame:
        frame - 136,

      fps,

      config: {
        damping: 175,
        stiffness: 88,
      },
    });


  const headerProgress =
    clamp01(
      headerIn
    );


  /* =======================================================
     BACKGROUND ACCENT MOTION
     ======================================================= */

  const glowShift =
    interpolate(
      frame,
      [
        0,
        220,
      ],
      [
        0,
        70,
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
        position: "absolute",

        inset: 0,

        overflow: "hidden",

        background: `
          linear-gradient(
            180deg,
            #F9F6F0 0%,
            #FFF9F2 100%
          )
        `,
      }}
    >

      {/* ================================================= */}
      {/* PAPER TEXTURE                                    */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          inset: 0,

          opacity: 0.14,

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
      {/* SOFT BACKGROUND ACCENTS                          */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          right:
            -260 + glowShift,

          top: -320,

          width: 1050,
          height: 1050,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(53,166,161,.10) 0%,
              rgba(53,166,161,.025) 45%,
              transparent 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      <div
        style={{
          position: "absolute",

          left: -350,

          bottom: -470,

          width: 1000,
          height: 1000,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              circle,
              rgba(156,114,212,.07) 0%,
              rgba(156,114,212,.018) 48%,
              transparent 72%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          left: 82,
          top: 62,

          width: 1760,

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

        {/* EYEBROW */}

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

            fontFamily:
              FONT_STACK,

            fontSize: 18,

            fontWeight: 900,

            letterSpacing: 2.2,

            textTransform:
              "uppercase",

            color:
              theme.colors.tealDark,
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

          Final takeaway
        </div>


        {/* ================================================= */}
        {/* TITLE                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop: 22,

            width: 1540,

            fontFamily:
              FONT_STACK,

            fontSize: 76,

            lineHeight: 0.93,

            fontWeight: 900,

            letterSpacing: -4.4,

            color:
              theme.colors.ink,
          }}
        >
          What the Andes virus outbreak
          <br />

          tells us
        </div>


        {/* ================================================= */}
        {/* INTRO                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop: 22,

            width: 1280,

            fontFamily:
              FONT_STACK,

            fontSize: 28,

            lineHeight: 1.36,

            fontWeight: 650,

            letterSpacing: -0.55,

            color:
              theme.colors.muted,
          }}
        >
          The cruise outbreak brought together the key features
          of Andes virus: serious lung disease, unusual but limited
          human transmission, and a low broader risk when cases
          are recognized and controlled.
        </div>
      </div>


      {/* ================================================= */}
      {/* TAKEAWAY GRID                                     */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          left: 82,
          right: 82,

          top: 405,

          display: "grid",

          gridTemplateColumns:
            "1fr 1fr 1fr",

          gap: 22,

          zIndex: 20,
        }}
      >
        <TakeawayItem
          number="1"

          title="Disease can be severe"

          detail="Andes virus can cause serious cardiopulmonary illness when fluid accumulates in the lungs."

          color={
            theme.colors.coral
          }

          progress={
            takeaway1
          }
        />


        <TakeawayItem
          number="2"

          title="Human spread is limited"

          detail="Unlike most hantaviruses in the Americas, Andes virus can spread between people after close, prolonged contact."

          color={
            theme.colors.violet
          }

          progress={
            takeaway2
          }
        />


        <TakeawayItem
          number="3"

          title="Broader Canadian risk remains low"

          detail="The main reservoir is in South America, and rapid detection, isolation and contact follow-up help limit onward spread."

          color={
            theme.colors.teal
          }

          progress={
            takeaway3
          }
        />
      </div>


      {/* ================================================= */}
      {/* FINAL CLOSING LINE                                */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          left: 82,

          bottom: 88,

          width: 1370,

          zIndex: 20,
        }}
      >
        <FinalStatement
          progress={
            finalIn
          }
        />
      </div>


      {/* ================================================= */}
      {/* CLOSING ACCENT                                    */}
      {/* ================================================= */}

      <div
        style={{
          position: "absolute",

          right: 82,

          bottom: 78,

          display: "flex",

          alignItems: "center",

          gap: 10,

          opacity:
            finalIn,

          fontFamily:
            FONT_STACK,

          fontSize: 17,

          fontWeight: 850,

          letterSpacing: 1.7,

          textTransform:
            "uppercase",

          color:
            theme.colors.tealDark,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,

            borderRadius:
              "50%",

            background:
              theme.colors.teal,
          }}
        />

        Andes virus · 2026 outbreak
      </div>
    </div>
  );
};