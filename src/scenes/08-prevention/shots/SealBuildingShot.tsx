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

      [
        18,
        86,
      ],

      [
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


  /* =======================================================
     PATCH
     ======================================================= */

  const patchIn =
    clamp01(
      spring({
        frame:
          frame -
          68,

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

      [
        102,
        142,
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
     STEP LABELS
     ======================================================= */

  const step1In =
    interpolate(
      frame,

      [
        0,
        28,
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


  const step2In =
    interpolate(
      frame,

      [
        64,
        96,
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


  const step3In =
    interpolate(
      frame,

      [
        110,
        148,
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
     SUCCESS GLOW
     ======================================================= */

  const successGlow =
    interpolate(
      frame,

      [
        108,
        150,
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


  const pulse =
    1 +
    Math.sin(
      frame /
        13
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
        {/* Eyebrow */}

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


        {/* Main title */}

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


        {/* Description */}

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


        {/* Supporting takeaway */}

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
          HOUSE ILLUSTRATION AREA
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
        {/* =================================================
            SOFT GROUND SHADOW
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              120,

            bottom:
              45,

            width:
              760,

            height:
              100,

            borderRadius:
              "50%",

            background:
              "radial-gradient(ellipse, rgba(60,50,43,.13) 0%, rgba(60,50,43,.04) 52%, rgba(60,50,43,0) 76%)",
          }}
        />


        {/* =================================================
            HOUSE
            ================================================= */}

        <svg
          viewBox="0 0 1080 780"

          width="1080"
          height="780"

          style={{
            position:
              "absolute",

            inset:
              0,

            overflow:
              "visible",
          }}
        >
          {/* Ground */}

          <rect
            x="0"
            y="590"

            width="1080"
            height="190"

            fill="#DDD1C3"
          />


          {/* Grass strip */}

          <rect
            x="0"
            y="568"

            width="1080"
            height="38"

            fill="#CBD9B7"
          />


          {/* House wall */}

          <rect
            x="168"
            y="230"

            width="610"
            height="365"

            rx="20"

            fill="#F4E6D3"

            stroke="#D6C4AF"

            strokeWidth="6"
          />


          {/* Roof */}

          <polygon
            points="
              132,254
              472,88
              817,254
            "

            fill="#D97B63"
          />


          {/* Roof underside */}

          <path
            d="
              M150 254
              L472 100
              L797 254
            "

            fill="none"

            stroke="#C56552"

            strokeWidth="8"

            strokeLinejoin="round"
          />


          {/* Left window */}

          <rect
            x="250"
            y="340"

            width="116"
            height="106"

            rx="12"

            fill="#EAF3FA"

            stroke="#9ABFE4"

            strokeWidth="5"
          />


          <line
            x1="308"
            y1="343"

            x2="308"
            y2="443"

            stroke="#B4CFE8"

            strokeWidth="4"
          />


          <line
            x1="253"
            y1="392"

            x2="363"
            y2="392"

            stroke="#B4CFE8"

            strokeWidth="4"
          />


          {/* Door */}

          <rect
            x="426"
            y="315"

            width="164"
            height="280"

            rx="13"

            fill="#E6D3BC"

            stroke="#D0BAA2"

            strokeWidth="5"
          />


          <circle
            cx="557"
            cy="455"

            r="8"

            fill="#AE9274"
          />


          {/* Right window */}

          <rect
            x="655"
            y="348"

            width="76"
            height="122"

            rx="8"

            fill="#EAF3FA"

            stroke="#9ABFE4"

            strokeWidth="5"
          />


          {/* Foundation */}

          <path
            d="
              M168 540
              L778 540
            "

            stroke="#D3BFA8"

            strokeWidth="7"
          />


          {/* =================================================
              OPENING / GAP

              Visible before it gets sealed.
              ================================================= */}

          <rect
            x="778"
            y="514"

            width="90"
            height="76"

            rx="10"

            fill="#71594B"

            opacity={
              1 -
              patchIn *
                0.90
            }
          />


          <rect
            x="787"
            y="523"

            width="72"
            height="58"

            rx="8"

            fill="#3A302C"

            opacity={
              1 -
              patchIn *
                0.90
            }
          />


          {/* =================================================
              RAT

              Moves away and fades before the opening is sealed.
              ================================================= */}

          <g
            transform={`
              translate(
                ${(1 - ratOut) * 90}
                0
              )
            `}

            opacity={
              ratOut
            }
          >
            {/* Tail */}

            <path
              d="
                M841 565
                C812 555
                  795 532
                  787 506
              "

              fill="none"

              stroke="#7A6558"

              strokeWidth="5"

              strokeLinecap="round"
            />


            {/* Body */}

            <ellipse
              cx="885"
              cy="574"

              rx="54"
              ry="30"

              fill="#7A6558"
            />


            {/* Head */}

            <circle
              cx="933"
              cy="560"

              r="21"

              fill="#7A6558"
            />


            {/* Ear */}

            <circle
              cx="938"
              cy="546"

              r="8"

              fill="#A98678"
            />


            {/* Eye */}

            <circle
              cx="943"
              cy="557"

              r="3.5"

              fill="#17243A"
            />


            {/* Nose */}

            <circle
              cx="954"
              cy="566"

              r="4"

              fill="#F0A2A5"
            />
          </g>


          {/* =================================================
              PATCH

              Slides over the opening.
              ================================================= */}

          <g
            opacity={
              patchIn
            }

            transform={`
              translate(
                ${(1 - patchIn) * 120}
                0
              )
            `}
          >
            <rect
              x="770"
              y="506"

              width="106"
              height="90"

              rx="14"

              fill="#7FB7DD"

              stroke="#4F86A8"

              strokeWidth="6"
            />


            {/* Patch detail */}

            <path
              d="
                M785 526
                H861

                M785 546
                H861

                M785 566
                H861
              "

              fill="none"

              stroke="rgba(255,255,255,.38)"

              strokeWidth="4"

              strokeLinecap="round"
            />
          </g>


          {/* =================================================
              SUCCESS CHECK
              ================================================= */}

          <g
            opacity={
              checkIn
            }

            transform={`
              translate(
                825
                550
              )

              scale(
                ${0.84 + checkIn * 0.16}
              )
            `}
          >
            <circle
              cx="0"
              cy="0"

              r="46"

              fill="rgba(255,255,255,.96)"

              stroke={
                theme.colors.green
              }

              strokeWidth="5"
            />


            <path
              d="
                M-20 0
                L-6 15
                L23 -18
              "

              fill="none"

              stroke={
                theme.colors.green
              }

              strokeWidth="9"

              strokeLinecap="round"

              strokeLinejoin="round"
            />
          </g>
        </svg>


        {/* =================================================
            STEP 1
            ================================================= */}

        <StepLabel
          number="1"

          title="Find the opening"

          color={
            theme.colors.coralDark
          }

          left={
            670
          }

          top={
            430
          }

          progress={
            step1In *
            ratOut
          }
        />


        {/* =================================================
            STEP 2
            ================================================= */}

        <StepLabel
          number="2"

          title="Seal the gap"

          color={
            theme.colors.sky
          }

          left={
            690
          }

          top={
            620
          }

          progress={
            step2In
          }
        />


        {/* =================================================
            STEP 3
            ================================================= */}

        <StepLabel
          number="3"

          title="Rodents stay out"

          color={
            theme.colors.green
          }

          left={
            790
          }

          top={
            332
          }

          progress={
            step3In
          }
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