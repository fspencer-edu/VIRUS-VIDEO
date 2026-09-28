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
   Match "Outbreak at sea"
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   STATIC ASSETS
   ========================================================= */

const HOUSE_SRC =
  "/assets/transmission/house.png";

const RAT_SRC =
  "/assets/transmission/rat-info.webp";


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
   STEP LABEL
   ========================================================= */

const StepLabel = ({
  number,
  title,
  color,
  left,
  top,
  progress,
}: {
  number: string;
  title: string;
  color: string;
  left: number;
  top: number;
  progress: number;
}) => (
  <div
    style={{
      position:
        "absolute",

      left,
      top,

      display:
        "inline-flex",

      alignItems:
        "center",

      gap:
        10,

      padding:
        "10px 15px",

      borderRadius:
        999,

      background:
        "rgba(255,255,255,.95)",

      border:
        `1px solid ${color}44`,

      boxShadow:
        "0 10px 26px rgba(52,42,35,.07)",

      opacity:
        progress,

      transform:
        `translateY(${(1 - progress) * 8}px)`,

      zIndex:
        12,
    }}
  >
    <span
      style={{
        width:
          26,

        height:
          26,

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
          13,

        fontWeight:
          850,
      }}
    >
      {number}
    </span>

    <span
      style={{
        fontFamily:
          FONT_STACK,

        fontSize:
          16,

        fontWeight:
          800,

        letterSpacing:
          -0.2,

        color:
          "#30465C",
      }}
    >
      {title}
    </span>
  </div>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const SealBuildingShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     TITLE
     ======================================================= */

  const titleIn =
    clamp01(
      spring({
        frame,

        fps,

        config: {
          damping:
            180,

          stiffness:
            88,
        },
      })
    );


  /* =======================================================
     RAT LEAVES
     ======================================================= */

  const ratOut =
    interpolate(
      frame,
      [18, 86],
      [1, 0],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     PATCH
     ======================================================= */

  const patchIn =
    clamp01(
      spring({
        frame:
          frame - 68,

        fps,

        config: {
          damping:
            170,

          stiffness:
            100,
        },
      })
    );


  /* =======================================================
     CHECK
     ======================================================= */

  const checkIn =
    interpolate(
      frame,
      [102, 142],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     STEP LABELS
     ======================================================= */

  const step1In =
    interpolate(
      frame,
      [0, 28],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const step2In =
    interpolate(
      frame,
      [64, 96],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const step3In =
    interpolate(
      frame,
      [110, 148],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  /* =======================================================
     SUCCESS GLOW
     ======================================================= */

  const successGlow =
    interpolate(
      frame,
      [108, 150],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",

        extrapolateRight:
          "clamp",
      }
    );


  const pulse =
    1 +
    Math.sin(
      frame / 13
    ) * 0.018;


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
            #FAF7F1 0%,
            #FFF9F4 100%
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
              rgba(35,57,72,.14) .7px,
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
          SUCCESS BACKGROUND GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            90,

          top:
            220,

          width:
            980,

          height:
            680,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(111,163,107,.10) 0%,
              rgba(111,163,107,.04) 42%,
              rgba(111,163,107,0) 74%
            )
          `,

          opacity:
            successGlow,

          transform:
            `scale(${pulse})`,

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          LEFT COPY
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            86,

          top:
            78,

          width:
            660,

          opacity:
            titleIn,

          transform:
            `translateY(${(1 - titleIn) * 16}px)`,

          zIndex:
            20,
        }}
      >
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
              "rgba(255,255,255,.90)",

            border:
              "1px solid rgba(17,39,68,.08)",

            boxShadow:
              "0 8px 24px rgba(37,50,65,.04)",
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
                theme.colors.teal,
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
                2.3,

              textTransform:
                "uppercase",

              color:
                theme.colors.tealDark,
            }}
          >
            Prevention
          </span>
        </div>

        <div
          style={{
            marginTop:
              22,

            width:
              650,

            fontFamily:
              TITLE_STACK,

            fontSize:
              82,

            lineHeight:
              0.91,

            fontWeight:
              840,

            letterSpacing:
              -4.4,

            color:
              "#17243A",
          }}
        >
          Keep rodents
          <br />
          outside.
        </div>

        <div
          style={{
            marginTop:
              28,

            width:
              585,

            fontFamily:
              FONT_STACK,

            fontSize:
              30,

            lineHeight:
              1.38,

            fontWeight:
              600,

            letterSpacing:
              -0.45,

            color:
              "#566A82",
          }}
        >
          Seal openings around buildings so rodents have
          fewer ways to enter indoor spaces.
        </div>

        <div
          style={{
            marginTop:
              38,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              13,

            padding:
              "14px 18px",

            borderRadius:
              22,

            background:
              "rgba(53,166,161,.08)",

            border:
              "1px solid rgba(53,166,161,.16)",
          }}
        >
          <div
            style={{
              width:
                42,

              height:
                42,

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              borderRadius:
                "50%",

              background:
                theme.colors.teal,

              color:
                "#FFFFFF",

              fontFamily:
                FONT_STACK,

              fontSize:
                23,

              fontWeight:
                900,
            }}
          >
            ✓
          </div>

          <div
            style={{
              fontFamily:
                FONT_STACK,

              fontSize:
                20,

              lineHeight:
                1.25,

              fontWeight:
                750,

              color:
                "#36566A",
            }}
          >
            Fewer entry points means
            <br />
            fewer indoor rodent encounters.
          </div>
        </div>
      </div>


      {/* ===================================================
          HOUSE / RAT ILLUSTRATION AREA
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            70,

          top:
            118,

          width:
            1080,

          height:
            780,

          zIndex:
            10,
        }}
      >
        {/* Ground shadow */}
        <div
          style={{
            position:
              "absolute",

            left:
              120,

            bottom:
              52,

            width:
              760,

            height:
              92,

            borderRadius:
              "50%",

            background:
              "radial-gradient(ellipse, rgba(60,50,43,.14) 0%, rgba(60,50,43,.05) 55%, rgba(60,50,43,0) 78%)",
          }}
        />

        {/* House card */}
        <div
          style={{
            position:
              "absolute",

            left:
              72,

            top:
              64,

            width:
              860,

            height:
              610,

            borderRadius:
              40,

            background:
              "rgba(255,255,255,.90)",

            border:
              `1px solid ${theme.colors.line}`,

            boxShadow:
              "0 18px 50px rgba(52,42,35,.08)",

            overflow:
              "hidden",
          }}
        >
          {/* soft panel bg */}
          <div
            style={{
              position:
                "absolute",

              inset:
                0,

              background: `
                linear-gradient(
                  180deg,
                  rgba(248,243,235,.92) 0%,
                  rgba(244,237,228,.96) 100%
                )
              `,
            }}
          />

          {/* grass / ground behind house */}
          <div
            style={{
              position:
                "absolute",

              left:
                0,

              right:
                0,

              bottom:
                96,

              height:
                28,

              background:
                "#D7E3C4",
            }}
          />

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
                96,

              background:
                "#DDD1C3",
            }}
          />

          {/* actual house image */}
          <div
            style={{
              position:
                "absolute",

              left:
                90,

              top:
                72,

              width:
                660,

              height:
                470,

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >
            <img
              src={HOUSE_SRC}
              alt=""
              style={{
                width:
                  "100%",

                height:
                  "100%",

                objectFit:
                  "contain",

                display:
                  "block",
              }}
            />
          </div>

          {/* foundation opening highlight */}
          <div
            style={{
              position:
                "absolute",

              left:
                678,

              top:
                430,

              width:
                94,

              height:
                74,

              borderRadius:
                14,

              background:
                "rgba(65,50,43,.78)",

              boxShadow:
                "inset 0 0 0 2px rgba(255,255,255,.05)",

              opacity:
                1 - patchIn * 0.9,
            }}
          />

          <div
            style={{
              position:
                "absolute",

              left:
                686,

              top:
                438,

              width:
                78,

              height:
                58,

              borderRadius:
                10,

              background:
                "rgba(22,19,17,.80)",

              opacity:
                1 - patchIn * 0.9,
            }}
          />

          {/* subtle focus ring around opening */}
          <div
            style={{
              position:
                "absolute",

              left:
                662,

              top:
                414,

              width:
                126,

              height:
                106,

              borderRadius:
                18,

              border:
                `2px solid rgba(233,111,106,.26)`,

              opacity:
                step1In * ratOut,
            }}
          />
        </div>

        {/* actual rat image */}
        <div
          style={{
            position:
              "absolute",

            left:
              715 + (1 - ratOut) * 92,

            top:
              470,

            width:
              250,

            height:
              190,

            opacity:
              ratOut,

            transform: `
              scale(${0.96 + ratOut * 0.04})
            `,

            zIndex:
              16,

            pointerEvents:
              "none",
          }}
        >
          <img
            src={RAT_SRC}
            alt=""
            style={{
              width:
                "100%",

              height:
                "100%",

              objectFit:
                "contain",

              display:
                "block",
            }}
          />
        </div>

        {/* patch */}
        <div
          style={{
            position:
              "absolute",

            left:
              740 + (1 - patchIn) * 120,

            top:
              496,

            width:
              106,

            height:
              90,

            borderRadius:
              14,

            background:
              "#7FB7DD",

            border:
              "6px solid #4F86A8",

            opacity:
              patchIn,

            boxSizing:
              "border-box",

            zIndex:
              18,
          }}
        >
          <div
            style={{
              position:
                "absolute",

              left:
                14,

              right:
                14,

              top:
                18,

              height:
                4,

              borderRadius:
                999,

              background:
                "rgba(255,255,255,.38)",
            }}
          />

          <div
            style={{
              position:
                "absolute",

              left:
                14,

              right:
                14,

              top:
                38,

              height:
                4,

              borderRadius:
                999,

              background:
                "rgba(255,255,255,.38)",
            }}
          />

          <div
            style={{
              position:
                "absolute",

              left:
                14,

              right:
                14,

              top:
                58,

              height:
                4,

              borderRadius:
                999,

              background:
                "rgba(255,255,255,.38)",
            }}
          />
        </div>

        {/* success check */}
        <div
          style={{
            position:
              "absolute",

            left:
              796,

            top:
              520,

            width:
              92,

            height:
              92,

            borderRadius:
              "50%",

            background:
              "rgba(255,255,255,.96)",

            border:
              `5px solid ${theme.colors.green}`,

            display:
              "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            opacity:
              checkIn,

            transform: `
              scale(${0.84 + checkIn * 0.16})
            `,

            zIndex:
              20,
          }}
        >
          <svg
            viewBox="0 0 50 50"
            width="42"
            height="42"
          >
            <path
              d="M10 25 L20 34 L39 13"
              fill="none"
              stroke={theme.colors.green}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* step labels */}
        <StepLabel
          number="1"
          title="Find the opening"
          color={theme.colors.coralDark}
          left={650}
          top={396}
          progress={step1In * ratOut}
        />

        <StepLabel
          number="2"
          title="Seal the gap"
          color={theme.colors.sky}
          left={690}
          top={620}
          progress={step2In}
        />

        <StepLabel
          number="3"
          title="Rodents stay out"
          color={theme.colors.green}
          left={788}
          top={318}
          progress={step3In}
        />
      </div>


      {/* ===================================================
          BOTTOM TAKEAWAY
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            820,

          bottom:
            74,

          display:
            "inline-flex",

          alignItems:
            "center",

          gap:
            11,

          padding:
            "13px 20px",

          borderRadius:
            999,

          background:
            "rgba(255,255,255,.94)",

          border:
            "1px solid rgba(17,39,68,.08)",

          boxShadow:
            "0 12px 30px rgba(52,42,35,.07)",

          opacity:
            checkIn,

          transform:
            `translateY(${(1 - checkIn) * 10}px)`,

          zIndex:
            20,
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
              theme.colors.green,
          }}
        />

        <span
          style={{
            fontFamily:
              FONT_STACK,

            fontSize:
              19,

            fontWeight:
              750,

            letterSpacing:
              -0.2,

            color:
              "#31465E",
          }}
        >
          Seal gaps around foundations, doors, windows, and utility openings.
        </span>
      </div>
    </div>
  );
};