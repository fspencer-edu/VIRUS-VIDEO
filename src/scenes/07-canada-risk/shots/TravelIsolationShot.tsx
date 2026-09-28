import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import {
  IllustratedPerson,
} from "../../../components/characters/IllustratedPerson";

import {
  AnimatedRoute,
} from "../../../components/visuals/AnimatedRoute";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";


/* =========================================================
   TYPOGRAPHY
   Match the rest of the video
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   LAYOUT CONSTANTS
   ========================================================= */

const SHIP_WIDTH =
  400;

const SHIP_HEIGHT =
  252;

const MAP_SIZE =
  500;


/* =========================================================
   TRAVEL ROUTE

   Ship → South America → British Columbia
   ========================================================= */

const travelPath = `
  M 450 704
  C 560 660
    650 602
    790 550

  C 980 478
    1240 438
    1572 490
`;


/* =========================================================
   SMALL LOCATION LABEL
   ========================================================= */

const LocationPill = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => (
  <div
    style={{
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
        "1px solid rgba(17,39,68,.08)",

      boxShadow:
        "0 8px 22px rgba(37,50,65,.06)",

      backdropFilter:
        "blur(10px)",
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
          color,
      }}
    />

    <span
      style={{
        fontFamily:
          FONT_STACK,

        fontSize:
          15,

        lineHeight:
          1,

        fontWeight:
          800,

        letterSpacing:
          1.7,

        textTransform:
          "uppercase",

        color:
          "#304B61",
      }}
    >
      {text}
    </span>
  </div>
);


/* =========================================================
   HOSPITAL CARD
   ========================================================= */

const HospitalCard = ({
  reveal = 1,
}: {
  reveal?: number;
}) => (
  <div
    style={{
      position:
        "absolute",

      right:
        76,

      bottom:
        74,

      width:
        550,

      height:
        202,

      boxSizing:
        "border-box",

      borderRadius:
        28,

      overflow:
        "hidden",

      background:
        "rgba(255,255,255,.96)",

      border:
        "1px solid rgba(17,39,68,.09)",

      boxShadow:
        "0 18px 44px rgba(52,42,35,.10)",

      opacity:
        reveal,

      transform: `
        translateY(
          ${(1 - reveal) * 18}px
        )

        scale(
          ${0.97 + reveal * 0.03}
        )
      `,

      zIndex:
        24,
    }}
  >
    {/* Background wash */}

    <div
      style={{
        position:
          "absolute",

        inset:
          0,

        background: `
          linear-gradient(
            135deg,
            rgba(101,167,232,.10) 0%,
            rgba(255,255,255,0) 58%
          )
        `,
      }}
    />


    {/* =====================================================
        HOSPITAL ICON
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          22,

        top:
          24,

        width:
          108,

        height:
          108,

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        borderRadius:
          22,

        background:
          "#EAF2FA",

        border:
          "1px solid rgba(17,39,68,.08)",
      }}
    >
      <svg
        viewBox="0 0 128 128"

        width="88"
        height="88"
      >
        <rect
          x="31"
          y="25"

          width="66"
          height="78"

          rx="10"

          fill="#FFFFFF"

          stroke={
            theme.colors.sky
          }

          strokeWidth="4"
        />

        <path
          d="
            M57 39
            H71
            V56
            H88
            V70
            H71
            V87
            H57
            V70
            H40
            V56
            H57
            Z
          "

          fill={
            theme.colors.coral
          }
        />
      </svg>
    </div>


    {/* =====================================================
        PASSENGER
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          138,

        top:
          22,
      }}
    >
      <IllustratedPerson
        asset={
          ASSETS.characters.passengerA
        }

        width={
          105
        }

        sick={
          0.72
        }
      />
    </div>


    {/* =====================================================
        PPE WORKER
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          224,

        top:
          20,
      }}
    >
      <IllustratedPerson
        asset={
          ASSETS.characters.ppeWorker
        }

        width={
          108
        }
      />
    </div>


    {/* =====================================================
        TEXT
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          342,

        top:
          28,

        right:
          22,
      }}
    >
      <div
        style={{
          fontFamily:
            FONT_STACK,

          fontSize:
            13,

          fontWeight:
            850,

          letterSpacing:
            1.7,

          lineHeight:
            1.1,

          textTransform:
            "uppercase",

          color:
            theme.colors.coralDark,
        }}
      >
        British Columbia response
      </div>


      <div
        style={{
          marginTop:
            10,

          fontFamily:
            TITLE_STACK,

          fontSize:
            28,

          lineHeight:
            1.02,

          fontWeight:
            830,

          letterSpacing:
            -1.1,

          color:
            "#17243A",
        }}
      >
        Hospital
        <br />
        isolation
      </div>
    </div>


    {/* =====================================================
        DESCRIPTION
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          22,

        right:
          22,

        bottom:
          16,

        paddingTop:
          12,

        borderTop:
          "1px solid rgba(17,39,68,.08)",

        fontFamily:
          FONT_STACK,

        fontSize:
          17,

        lineHeight:
          1.3,

        fontWeight:
          650,

        letterSpacing:
          -0.15,

        color:
          "#53677D",
      }}
    >
      The traveler enters hospital isolation for assessment
      and testing.
    </div>
  </div>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const TravelIsolationShot = () => {
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
    spring({
      frame,

      fps,

      config: {
        damping:
          180,

        stiffness:
          88,
      },
    });


  /* =======================================================
     SHIP
     ======================================================= */

  const shipIn =
    spring({
      frame:
        frame -
        5,

      fps,

      config: {
        damping:
          180,

        stiffness:
          84,
      },
    });


  /* =======================================================
     SOUTH AMERICA
     ======================================================= */

  const southAmericaReveal =
    interpolate(
      frame,

      [
        22,
        68,
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
     BRITISH COLUMBIA
     ======================================================= */

  const bcReveal =
    spring({
      frame:
        frame -
        112,

      fps,

      config: {
        damping:
          180,

        stiffness:
          100,
      },
    });


  /* =======================================================
     BC MARKER
     ======================================================= */

  const markerReveal =
    interpolate(
      frame,

      [
        136,
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


  /* =======================================================
     HOSPITAL CARD
     ======================================================= */

  const isoReveal =
    interpolate(
      frame,

      [
        174,
        232,
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
     ROUTE LABEL
     ======================================================= */

  const routeLabelReveal =
    interpolate(
      frame,

      [
        56,
        88,
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
     PULSE
     ======================================================= */

  const pulse =
    0.74 +
    Math.sin(
      frame /
        11
    ) *
      0.15;


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
          BACKGROUND GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            390,

          top:
            340,

          width:
            1320,

          height:
            520,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(101,167,232,.055) 0%,
              rgba(242,106,96,.025) 48%,
              rgba(242,106,96,0) 76%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          TITLE AREA
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            86,

          top:
            70,

          width:
            1160,

          opacity:
            titleIn,

          transform:
            `translateY(${(1 - titleIn) * 16}px)`,

          zIndex:
            30,
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
                theme.colors.coral,
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
                theme.colors.coralDark,
            }}
          >
            Travel to Canada
          </span>
        </div>


        {/* Main heading */}

        <div
          style={{
            marginTop:
              18,

            width:
              1080,

            fontFamily:
              TITLE_STACK,

            fontSize:
              72,

            lineHeight:
              0.94,

            fontWeight:
              840,

            letterSpacing:
              -3.8,

            color:
              "#17243A",
          }}
        >
          Travel created a pathway
          <br />

          from the ship to Canada.
        </div>


        {/* Description */}

        <div
          style={{
            marginTop:
              23,

            width:
              1010,

            fontFamily:
              FONT_STACK,

            fontSize:
              28,

            lineHeight:
              1.37,

            fontWeight:
              600,

            letterSpacing:
              -0.4,

            color:
              "#566A82",
          }}
        >
          Canadian cases remain linked to travelers rather
          than widespread community transmission. British
          Columbia becomes the focus of the response.
        </div>
      </div>


      {/* ===================================================
          SHIP IMAGE
          No zoom
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            76,

          top:
            558,

          width:
            SHIP_WIDTH,

          height:
            SHIP_HEIGHT,

          borderRadius:
            30,

          overflow:
            "hidden",

          boxShadow:
            "0 18px 42px rgba(42,50,64,.14)",

          opacity:
            shipIn,

          transform:
            `translateY(${(1 - shipIn) * 16}px)`,

          zIndex:
            10,
        }}
      >
        <EditorialAsset
          asset={
            ASSETS.outbreak.shipResponse
          }

          width={
            SHIP_WIDTH
          }

          height={
            SHIP_HEIGHT
          }

          zoom={
            1
          }

          objectPosition="center"

          showCredit={
            false
          }

          organic={
            false
          }
        />


        <div
          style={{
            position:
              "absolute",

            left:
              20,

            top:
              18,
          }}
        >
          <LocationPill
            text="Cruise ship"

            color={
              theme.colors.coralDark
            }
          />
        </div>
      </div>


      {/* ===================================================
          SOUTH AMERICA MAP
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            590,

          top:
            340,

          width:
            MAP_SIZE,

          height:
            MAP_SIZE,

          borderRadius:
            32,

          overflow:
            "hidden",

          background:
            "#FFFFFF",

          border:
            "1px solid rgba(17,39,68,.09)",

          boxShadow:
            "0 18px 44px rgba(52,42,35,.09)",

          opacity:
            southAmericaReveal,

          transform: `
            translateY(
              ${(1 - southAmericaReveal) * 16}px
            )

            scale(
              ${0.985 + southAmericaReveal * 0.015}
            )
          `,

          zIndex:
            10,
        }}
      >
        <EditorialAsset
          asset={
            ASSETS.canada.southAmericaMap
          }

          width={
            MAP_SIZE
          }

          height={
            MAP_SIZE
          }

          zoom={
            1
          }

          objectPosition="center"

          organic={
            false
          }

          showCredit
        />


        <div
          style={{
            position:
              "absolute",

            left:
              22,

            top:
              20,
          }}
        >
          <LocationPill
            text="South America"

            color={
              theme.colors.coralDark
            }
          />
        </div>
      </div>


      {/* ===================================================
          BRITISH COLUMBIA MAP
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            76,

          top:
            340,

          width:
            MAP_SIZE,

          height:
            MAP_SIZE,

          borderRadius:
            32,

          overflow:
            "hidden",

          background:
            "#FFFFFF",

          border:
            "1px solid rgba(17,39,68,.09)",

          boxShadow:
            "0 18px 44px rgba(52,42,35,.09)",

          opacity:
            bcReveal,

          transform: `
            translateY(
              ${(1 - bcReveal) * 16}px
            )

            scale(
              ${0.985 + bcReveal * 0.015}
            )
          `,

          zIndex:
            10,
        }}
      >
        <EditorialAsset
          asset={
            ASSETS.canada.bcMap
          }

          width={
            MAP_SIZE
          }

          height={
            MAP_SIZE
          }

          zoom={
            1
          }

          objectPosition="center"

          organic={
            false
          }

          showCredit
        />


        {/* BC label */}

        <div
          style={{
            position:
              "absolute",

            left:
              22,

            top:
              20,
          }}
        >
          <LocationPill
            text="British Columbia"

            color={
              theme.colors.tealDark
            }
          />
        </div>


        {/* =================================================
            HOSPITAL LOCATION MARKER
            ================================================= */}

        <div
          style={{
            position:
              "absolute",

            left:
              244,

            top:
              200,

            width:
              18,

            height:
              18,

            borderRadius:
              "50%",

            background:
              theme.colors.coralDark,

            boxShadow:
              `0 0 0 ${
                15 *
                pulse
              }px rgba(185,76,74,.18)`,

            opacity:
              markerReveal,

            transform:
              `scale(${0.82 + markerReveal * 0.18})`,

            zIndex:
              14,
          }}
        />


        {/* Hospital map label */}

        <div
          style={{
            position:
              "absolute",

            left:
              180,

            top:
              232,

            padding:
              "9px 13px",

            borderRadius:
              15,

            background:
              "rgba(255,255,255,.95)",

            border:
              `1px solid ${theme.colors.coral}`,

            boxShadow:
              "0 8px 22px rgba(52,42,35,.07)",

            fontFamily:
              FONT_STACK,

            fontSize:
              15,

            fontWeight:
              800,

            color:
              theme.colors.coralDark,

            opacity:
              markerReveal,

            transform:
              `translateY(${(1 - markerReveal) * 8}px)`,

            zIndex:
              14,
          }}
        >
          Hospital isolation
        </div>
      </div>


      {/* ===================================================
          ROUTE GLOW
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          pointerEvents:
            "none",

          zIndex:
            17,
        }}
      >
        <AnimatedRoute
          d={
            travelPath
          }

          viewBox="0 0 1920 1080"

          width={
            1920
          }

          height={
            1080
          }

          startFrame={
            18
          }

          endFrame={
            168
          }

          stroke="rgba(242,106,96,.18)"

          strokeWidth={
            20
          }

          followerRadius={
            0
          }

          followerColor="transparent"
        />
      </div>


      {/* ===================================================
          MAIN TRAVEL ROUTE
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          inset:
            0,

          pointerEvents:
            "none",

          zIndex:
            18,
        }}
      >
        <AnimatedRoute
          d={
            travelPath
          }

          viewBox="0 0 1920 1080"

          width={
            1920
          }

          height={
            1080
          }

          startFrame={
            18
          }

          endFrame={
            168
          }

          stroke={
            theme.colors.coral
          }

          strokeWidth={
            7
          }

          followerRadius={
            12
          }

          followerColor={
            theme.colors.tealDark
          }
        />
      </div>


      {/* ===================================================
          TRAVELER PATH LABEL
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            1060,

          top:
            472,

          display:
            "inline-flex",

          alignItems:
            "center",

          gap:
            9,

          padding:
            "9px 14px",

          borderRadius:
            999,

          background:
            "rgba(255,255,255,.94)",

          border:
            "1px solid rgba(17,39,68,.08)",

          boxShadow:
            "0 8px 22px rgba(52,42,35,.06)",

          opacity:
            routeLabelReveal,

          transform:
            `translateY(${(1 - routeLabelReveal) * 8}px)`,

          zIndex:
            22,
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
              1.5,

            textTransform:
              "uppercase",

            color:
              theme.colors.coralDark,
          }}
        >
          Traveler pathway
        </span>
      </div>


      {/* ===================================================
          HOSPITAL RESPONSE CARD
          =================================================== */}

      <HospitalCard
        reveal={
          isoReveal
        }
      />
    </div>
  );
};