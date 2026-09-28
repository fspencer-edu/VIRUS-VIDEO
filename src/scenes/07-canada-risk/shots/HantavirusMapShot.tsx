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
  ASSETS,
} from "../../../data/assets";

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
   PANEL CONSTANTS
   ========================================================= */

const PANEL_WIDTH =
  820;

const PANEL_HEIGHT =
  610;


/* =========================================================
   LABEL PILL
   ========================================================= */

const LabelPill = ({
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
        10,

      padding:
        "11px 17px",

      borderRadius:
        999,

      background:
        "rgba(255,255,255,.94)",

      border:
        `1px solid ${color}44`,

      boxShadow:
        "0 10px 26px rgba(42,48,58,.08)",

      backdropFilter:
        "blur(10px)",
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
          `0 0 12px ${color}55`,
      }}
    />

    <span
      style={{
        fontFamily:
          FONT_STACK,

        fontSize:
          16,

        lineHeight:
          1,

        fontWeight:
          850,

        letterSpacing:
          1.9,

        textTransform:
          "uppercase",

        color,
      }}
    >
      {text}
    </span>
  </div>
);


/* =========================================================
   VIRUS LABEL
   ========================================================= */

const VirusLabel = ({
  eyebrow,
  virus,
  color,
}: {
  eyebrow: string;
  virus: string;
  color: string;
}) => (
  <div
    style={{
      padding:
        "16px 18px",

      borderRadius:
        20,

      background:
        "rgba(255,255,255,.95)",

      border:
        `1px solid ${color}55`,

      boxShadow:
        "0 12px 30px rgba(52,42,35,.08)",

      backdropFilter:
        "blur(10px)",
    }}
  >
    <div
      style={{
        display:
          "flex",

        alignItems:
          "center",

        gap:
          9,
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
            14,

          fontWeight:
            850,

          letterSpacing:
            1.8,

          textTransform:
            "uppercase",

          color,
        }}
      >
        {eyebrow}
      </span>
    </div>


    <div
      style={{
        marginTop:
          7,

        fontFamily:
          TITLE_STACK,

        fontSize:
          34,

        lineHeight:
          1,

        fontWeight:
          820,

        letterSpacing:
          -1.3,

        color:
          "#17243A",
      }}
    >
      {virus}
    </div>
  </div>
);


/* =========================================================
   MAP PANEL
   ========================================================= */

const MapPanel = ({
  left,
  asset,
  location,
  locationColor,
  eyebrow,
  virus,
  virusColor,
  progress,
}: {
  left: number;

  asset:
    | typeof ASSETS.canada.bcMap
    | typeof ASSETS.canada.southAmericaMap;

  location: string;

  locationColor: string;

  eyebrow: string;

  virus: string;

  virusColor: string;

  progress: number;
}) => (
  <div
    style={{
      position:
        "absolute",

      left,

      top:
        278,

      width:
        PANEL_WIDTH,

      height:
        PANEL_HEIGHT,

      borderRadius:
        34,

      overflow:
        "hidden",

      background:
        "#FFFFFF",

      border:
        "1px solid rgba(17,39,68,.09)",

      boxShadow: `
        0 22px 54px rgba(52,42,35,.10),
        0 8px 20px rgba(52,42,35,.04)
      `,

      opacity:
        progress,

      transform: `
        translateY(
          ${(1 - progress) * 18}px
        )

        scale(
          ${0.985 + progress * 0.015}
        )
      `,

      transformOrigin:
        "50% 50%",
    }}
  >
    {/* =====================================================
        MAP IMAGE
        No zoom
        ===================================================== */}

    <EditorialAsset
      asset={
        asset
      }

      width={
        PANEL_WIDTH
      }

      height={
        PANEL_HEIGHT
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


    {/* =====================================================
        SOFT IMAGE GRADING
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        inset:
          0,

        background: `
          linear-gradient(
            180deg,
            rgba(15,32,48,.01) 0%,
            rgba(15,32,48,0) 56%,
            rgba(15,32,48,.14) 100%
          )
        `,

        pointerEvents:
          "none",
      }}
    />


    {/* =====================================================
        LOCATION
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          26,

        top:
          24,
      }}
    >
      <LabelPill
        text={
          location
        }

        color={
          locationColor
        }
      />
    </div>


    {/* =====================================================
        VIRUS INFORMATION
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          26,

        bottom:
          28,
      }}
    >
      <VirusLabel
        eyebrow={
          eyebrow
        }

        virus={
          virus
        }

        color={
          virusColor
        }
      />
    </div>
  </div>
);


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const HantavirusMapShot = () => {
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
     MAP ENTRANCES
     ======================================================= */

  const leftIn =
    interpolate(
      frame,

      [
        8,
        52,
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


  const rightIn =
    interpolate(
      frame,

      [
        44,
        92,
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


  const contrastIn =
    interpolate(
      frame,

      [
        82,
        118,
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
          BACKGROUND ACCENTS
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            -140,

          top:
            320,

          width:
            750,

          height:
            560,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(53,166,161,.055) 0%,
              rgba(53,166,161,.02) 48%,
              rgba(53,166,161,0) 72%
            )
          `,
        }}
      />


      <div
        style={{
          position:
            "absolute",

          right:
            -140,

          top:
            320,

          width:
            750,

          height:
            560,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(242,106,96,.055) 0%,
              rgba(242,106,96,.02) 48%,
              rgba(242,106,96,0) 72%
            )
          `,
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
            1580,

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
                "#168894",
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
                "#168894",
            }}
          >
            Geographic context
          </span>
        </div>


        {/* Main title */}

        <div
          style={{
            marginTop:
              18,

            width:
              1500,

            fontFamily:
              TITLE_STACK,

            fontSize:
              72,

            lineHeight:
              0.96,

            fontWeight:
              840,

            letterSpacing:
              -3.7,

            color:
              "#17243A",
          }}
        >
          Canadian hantavirus is not the same as the
          Andes virus outbreak.
        </div>
      </div>


      {/* ===================================================
          CANADA PANEL
          =================================================== */}

      <MapPanel
        left={
          72
        }

        asset={
          ASSETS.canada.bcMap
        }

        location="Canada"

        locationColor={
          theme.colors.tealDark
        }

        eyebrow="Main Canadian hantavirus"

        virus="Sin Nombre virus"

        virusColor={
          theme.colors.tealDark
        }

        progress={
          leftIn
        }
      />


      {/* ===================================================
          SOUTH AMERICA PANEL
          =================================================== */}

      <MapPanel
        left={
          1028
        }

        asset={
          ASSETS.canada.southAmericaMap
        }

        location="South America"

        locationColor={
          theme.colors.coralDark
        }

        eyebrow="Outbreak virus"

        virus="Andes virus"

        virusColor={
          theme.colors.coralDark
        }

        progress={
          rightIn
        }
      />


      {/* ===================================================
          CENTER CONTRAST MARKER
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            570,

          width:
            86,

          height:
            86,

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          borderRadius:
            "50%",

          background:
            "rgba(255,255,255,.97)",

          border:
            "1px solid rgba(17,39,68,.10)",

          boxShadow:
            "0 16px 38px rgba(52,42,35,.11)",

          opacity:
            contrastIn,

          transform: `
            translate(-50%, -50%)
            scale(
              ${0.84 + contrastIn * 0.16}
            )
          `,

          zIndex:
            30,
        }}
      >
        <div
          style={{
            fontFamily:
              TITLE_STACK,

            fontSize:
              23,

            fontWeight:
              850,

            letterSpacing:
              -0.5,

            color:
              "#53677D",
          }}
        >
          ≠
        </div>
      </div>


      {/* ===================================================
          BOTTOM SUMMARY
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          bottom:
            72,

          display:
            "inline-flex",

          alignItems:
            "center",

          gap:
            12,

          padding:
            "13px 21px",

          borderRadius:
            999,

          background:
            "rgba(255,255,255,.94)",

          border:
            "1px solid rgba(17,39,68,.08)",

          boxShadow:
            "0 12px 30px rgba(52,42,35,.07)",

          opacity:
            contrastIn,

          transform: `
            translateX(-50%)
            translateY(
              ${(1 - contrastIn) * 12}px
            )
          `,

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
              theme.colors.tealDark,
          }}
        />

        <span
          style={{
            width:
              10,

            height:
              10,

            marginLeft:
              -5,

            borderRadius:
              "50%",

            background:
              theme.colors.coralDark,
          }}
        />

        <span
          style={{
            marginLeft:
              2,

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
          Different viruses, different geographic context.
        </span>
      </div>
    </div>
  );
};