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
  value:
    number
) =>
  Math.max(
    0,
    Math.min(
      1,
      value
    )
  );


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const FoodStorageShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  /* =======================================================
     TEXT ENTRANCE
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


  const bodyIn =
    spring({
      frame:
        frame -
        12,

      fps,

      config: {
        damping:
          185,

        stiffness:
          84,
      },
    });


  /* =======================================================
     FOOD / CONTAINER
     ======================================================= */

  const grainsIn =
    interpolate(
      frame,
      [
        0,
        35,
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


  const lidProgress =
    spring({
      frame:
        frame -
        32,

      fps,

      config: {
        damping:
          150,

        stiffness:
          82,

        mass:
          0.9,
      },
    });


  const lidDown =
    clamp01(
      lidProgress
    );


  /* =======================================================
     RAT EXIT
     ======================================================= */

  const ratOut =
    interpolate(
      frame,
      [
        58,
        112,
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


  const ratX =
    interpolate(
      ratOut,
      [
        0,
        1,
      ],
      [
        0,
        135,
      ]
    );


  const ratOpacity =
    interpolate(
      ratOut,
      [
        0,
        0.7,
        1,
      ],
      [
        1,
        1,
        0,
      ]
    );


  /* =======================================================
     SUCCESS / NO RODENT SYMBOL
     ======================================================= */

  const successIn =
    spring({
      frame:
        frame -
        88,

      fps,

      config: {
        damping:
          155,

        stiffness:
          105,
      },
    });


  const successScale =
    interpolate(
      successIn,
      [
        0,
        1,
      ],
      [
        0.72,
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
     PANEL ENTRANCE
     ======================================================= */

  const panelIn =
    spring({
      frame:
        frame -
        8,

      fps,

      config: {
        damping:
          180,

        stiffness:
          78,
      },
    });


  const panelX =
    interpolate(
      panelIn,
      [
        0,
        1,
      ],
      [
        50,
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

      {/* ================================================= */}
      {/* BACKGROUND TEXTURE                                */}
      {/* ================================================= */}

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
              rgba(
                35,
                66,
                82,
                .13
              )
              0.7px,
              transparent
              0.75px
            )
          `,

          backgroundSize:
            "8px 8px",

          pointerEvents:
            "none",
        }}
      />


      {/* ================================================= */}
      {/* LEFT CONTENT                                      */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          left:
            86,

          top:
            98,

          width:
            680,

          zIndex:
            20,
        }}
      >

        {/* ================================================= */}
        {/* EYEBROW                                           */}
        {/* ================================================= */}

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              15,

            opacity:
              headerIn,

            transform: `
              translateX(
                ${(1 - headerIn) * -18}px
              )
            `,
          }}
        >
          <div
            style={{
              width:
                44 * headerIn,

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
            Prevention
          </div>
        </div>


        {/* ================================================= */}
        {/* TITLE                                             */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              30,

            width:
              650,

            fontFamily:
              FONT_STACK,

            fontSize:
              88,

            lineHeight:
              0.96,

            fontWeight:
              835,

            letterSpacing:
              -4.5,

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
          Store food in
          <br />
          closed containers.
        </div>


        {/* ================================================= */}
        {/* ACCENT                                            */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              34,

            width:
              92 * titleIn,

            height:
              7,

            borderRadius:
              999,

            background:
              theme.colors.coral,

            transformOrigin:
              "left center",
          }}
        />


        {/* ================================================= */}
        {/* DESCRIPTION                                       */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              30,

            width:
              625,

            fontFamily:
              FONT_STACK,

            fontSize:
              34,

            lineHeight:
              1.35,

            fontWeight:
              560,

            letterSpacing:
              -0.65,

            color:
              theme.colors.muted,

            opacity:
              bodyIn,

            transform: `
              translateY(
                ${(1 - bodyIn) * 22}px
              )
            `,
          }}
        >
          Limiting access to food helps reduce rodent
          activity around homes, cabins, and storage areas.
        </div>


        {/* ================================================= */}
        {/* SUPPORTING POINT                                  */}
        {/* ================================================= */}

        <div
          style={{
            marginTop:
              44,

            display:
              "flex",

            alignItems:
              "center",

            gap:
              16,

            opacity:
              bodyIn,
          }}
        >
          <div
            style={{
              width:
                14,

              height:
                14,

              flex:
                "0 0 auto",

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
                23,

              lineHeight:
                1.3,

              fontWeight:
                720,

              color:
                theme.colors.ink,
            }}
          >
            Seal dry food, grains, and animal feed.
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* ILLUSTRATION PANEL                                */}
      {/* ================================================= */}

      <div
        style={{
          position:
            "absolute",

          right:
            72,

          top:
            155,

          width:
            980,

          height:
            720,

          borderRadius:
            38,

          background:
            "rgba(255,255,255,.92)",

          border:
            `1px solid ${theme.colors.line}`,

          boxShadow:
            "0 22px 58px rgba(52,42,35,.10)",

          overflow:
            "hidden",

          opacity:
            panelIn,

          transform: `
            translateX(
              ${panelX}px
            )
          `,

          zIndex:
            10,
        }}
      >

        {/* ================================================= */}
        {/* PANEL LABEL                                       */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              32,

            top:
              30,

            display:
              "inline-flex",

            alignItems:
              "center",

            gap:
              10,

            padding:
              "12px 17px",

            borderRadius:
              999,

            background:
              "rgba(247,251,252,.96)",

            border:
              `1px solid ${theme.colors.line}`,

            fontFamily:
              FONT_STACK,

            fontSize:
              16,

            fontWeight:
              830,

            letterSpacing:
              1.8,

            textTransform:
              "uppercase",

            color:
              theme.colors.teal,

            zIndex:
              5,
          }}
        >
          Secure food storage
        </div>


        {/* ================================================= */}
        {/* ILLUSTRATION                                      */}
        {/* ================================================= */}

        <svg
          viewBox="0 0 980 720"
          width="980"
          height="720"
        >

          {/* ================================================= */}
          {/* BACKGROUND                                        */}
          {/* ================================================= */}

          <rect
            x="0"
            y="0"
            width="980"
            height="720"
            fill="#FBF9F5"
          />


          {/* ================================================= */}
          {/* BACK WALL ACCENT                                  */}
          {/* ================================================= */}

          <circle
            cx="475"
            cy="320"
            r="235"
            fill="rgba(14,141,151,.045)"
          />


          {/* ================================================= */}
          {/* FLOOR                                             */}
          {/* ================================================= */}

          <rect
            x="0"
            y="568"
            width="980"
            height="152"
            fill="#D9CDBF"
          />

          <line
            x1="0"
            y1="568"
            x2="980"
            y2="568"
            stroke="#C7B8A7"
            strokeWidth="3"
          />


          {/* ================================================= */}
          {/* CONTAINER SHADOW                                  */}
          {/* ================================================= */}

          <ellipse
            cx="442"
            cy="582"
            rx="205"
            ry="28"
            fill="rgba(52,42,35,.09)"
          />


          {/* ================================================= */}
          {/* CONTAINER BODY                                    */}
          {/* ================================================= */}

          <rect
            x="258"
            y="220"
            width="360"
            height="330"
            rx="32"
            fill="#FDFBF9"
            stroke="#8FB1D1"
            strokeWidth="7"
          />


          {/* ================================================= */}
          {/* CONTAINER INNER PANEL                             */}
          {/* ================================================= */}

          <rect
            x="286"
            y="264"
            width="304"
            height="246"
            rx="20"
            fill="#F5ECD5"
            opacity="0.82"
          />


          {/* ================================================= */}
          {/* GRAINS                                            */}
          {/* ================================================= */}

          {Array.from(
            {
              length:
                52,
            },
            (
              _,
              i
            ) => {
              const column =
                i %
                10;

              const row =
                Math.floor(
                  i /
                    10
                );


              return (
                <circle
                  key={
                    i
                  }

                  cx={
                    310 +
                    column *
                      28 +
                    (
                      row %
                      2
                    ) *
                      6
                  }

                  cy={
                    330 +
                    row *
                      35 +
                    (
                      i %
                      3
                    ) *
                      3
                  }

                  r={
                    6
                  }

                  fill="#EAB84C"

                  opacity={
                    grainsIn *
                    0.95
                  }
                />
              );
            }
          )}


          {/* ================================================= */}
          {/* FOOD LEVEL                                       */}
          {/* ================================================= */}

          <rect
            x="286"
            y="424"
            width="304"
            height="86"
            rx="0"
            fill="rgba(231,180,70,.12)"
            opacity={
              grainsIn
            }
          />


          {/* ================================================= */}
          {/* LID SHADOW                                       */}
          {/* ================================================= */}

          <rect
            x="278"
            y={
              130 +
              lidDown *
                77
            }
            width="320"
            height="66"
            rx="20"
            fill="rgba(52,42,35,.10)"
            opacity={
              0.2 *
              lidDown
            }
          />


          {/* ================================================= */}
          {/* LID                                              */}
          {/* ================================================= */}

          <rect
            x="276"
            y={
              118 +
              lidDown *
                78
            }
            width="324"
            height="66"
            rx="20"
            fill="#9FC3E7"
            stroke="#6288AD"
            strokeWidth="7"
          />


          {/* ================================================= */}
          {/* LID HANDLE                                       */}
          {/* ================================================= */}

          <rect
            x="382"
            y={
              98 +
              lidDown *
                78
            }
            width="112"
            height="31"
            rx="15"
            fill="#6288AD"
          />


          {/* ================================================= */}
          {/* SEALED INDICATOR                                  */}
          {/* ================================================= */}

          <g
            opacity={
              successIn
            }

            transform={`
              translate(595 230)
              scale(${successScale})
            `}
          >
            <circle
              cx="0"
              cy="0"
              r="38"
              fill="#FFFFFF"
              stroke={theme.colors.teal}
              strokeWidth="5"
            />

            <path
              d="
                M -16 0
                L -5 12
                L 18 -15
              "
              fill="none"
              stroke={theme.colors.teal}
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>


          {/* ================================================= */}
          {/* RAT                                              */}
          {/* ================================================= */}

          <g
            opacity={
              ratOpacity
            }

            transform={`
              translate(
                ${ratX}
                0
              )
            `}
          >
            {/* TAIL */}

            <path
              d="
                M 744 544
                C 712 538,
                  686 518,
                  678 486
              "
              fill="none"
              stroke="#7A6558"
              strokeWidth="6"
              strokeLinecap="round"
            />


            {/* BODY */}

            <ellipse
              cx="792"
              cy="548"
              rx="52"
              ry="31"
              fill="#7A6558"
            />


            {/* HEAD */}

            <circle
              cx="839"
              cy="533"
              r="22"
              fill="#7A6558"
            />


            {/* EAR */}

            <circle
              cx="831"
              cy="514"
              r="10"
              fill="#92796B"
            />


            {/* EYE */}

            <circle
              cx="847"
              cy="529"
              r="3.5"
              fill="#17243A"
            />


            {/* NOSE */}

            <circle
              cx="859"
              cy="537"
              r="4"
              fill="#4E4039"
            />
          </g>


          {/* ================================================= */}
          {/* NO RODENT SYMBOL                                 */}
          {/* ================================================= */}

          <g
            opacity={
              successIn
            }

            transform={`
              translate(807 445)
              scale(${successScale})
            `}
          >
            <circle
              cx="0"
              cy="0"
              r="62"
              fill="rgba(255,255,255,.94)"
              stroke={theme.colors.coral}
              strokeWidth="6"
            />

            <circle
              cx="0"
              cy="0"
              r="43"
              fill="none"
              stroke={theme.colors.coral}
              strokeWidth="4"
              opacity="0.25"
            />

            <line
              x1="-39"
              y1="-39"
              x2="39"
              y2="39"
              stroke={theme.colors.coral}
              strokeWidth="9"
              strokeLinecap="round"
            />
          </g>
        </svg>


        {/* ================================================= */}
        {/* BOTTOM CAPTION                                    */}
        {/* ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              34,

            bottom:
              27,

            fontFamily:
              FONT_STACK,

            fontSize:
              18,

            lineHeight:
              1,

            fontWeight:
              800,

            letterSpacing:
              1.5,

            textTransform:
              "uppercase",

            color:
              theme.colors.muted,
          }}
        >
          Closed container → reduced access
        </div>
      </div>
    </div>
  );
};