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
   Match "Outbreak at sea"
   ========================================================= */

const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   MAP CONSTANTS
   ========================================================= */

const CANADA_WIDTH =
  760;

const CANADA_HEIGHT =
  560;

const SOUTH_AMERICA_WIDTH =
  700;

const SOUTH_AMERICA_HEIGHT =
  620;


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
   MAP VISUAL
   Transparent images — no white panel
   ========================================================= */

const MapVisual = ({
  left,
  top,
  width,
  height,
  src,
  location,
  locationColor,
  eyebrow,
  virus,
  virusColor,
  progress,
  labelLeft = 16,
  labelTop = 8,
  virusLeft = 30,
  virusBottom = 12,
}: {
  left: number;
  top: number;

  width: number;
  height: number;

  src: string;

  location: string;
  locationColor: string;

  eyebrow: string;
  virus: string;
  virusColor: string;

  progress: number;

  labelLeft?: number;
  labelTop?: number;

  virusLeft?: number;
  virusBottom?: number;
}) => (
  <div
    style={{
      position:
        "absolute",

      left,

      top,

      width,

      height,

      opacity:
        progress,

      transform: `
        translateY(
          ${(1 - progress) * 20}px
        )

        scale(
          ${0.96 + progress * 0.04}
        )
      `,

      transformOrigin:
        "50% 50%",

      zIndex:
        10,
    }}
  >

    {/* =====================================================
        SOFT GLOW
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          "8%",

        right:
          "8%",

        top:
          "10%",

        bottom:
          "5%",

        borderRadius:
          "50%",

        background: `
          radial-gradient(
            circle,
            ${locationColor}16 0%,
            ${locationColor}08 44%,
            transparent 74%
          )
        `,

        filter:
          "blur(26px)",

        pointerEvents:
          "none",
      }}
    />


    {/* =====================================================
        TRANSPARENT MAP IMAGE
        ===================================================== */}

    <Img
      src={
        src
      }

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
          "contain",

        display:
          "block",

        filter:
          "drop-shadow(0 22px 34px rgba(23,36,58,.12))",
      }}
    />


    {/* =====================================================
        LOCATION LABEL
        ===================================================== */}

    <div
      style={{
        position:
          "absolute",

        left:
          labelLeft,

        top:
          labelTop,

        zIndex:
          20,
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
          virusLeft,

        bottom:
          virusBottom,

        zIndex:
          20,
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
     IMAGE SOURCES
     ======================================================= */

  const canadaSrc =
    staticFile(
      ASSETS.canada
        .bcMap
        .src
    );


  const southAmericaSrc =
    staticFile(
      ASSETS.canada
        .southAmericaMap
        .src
    );


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
          LEFT BACKGROUND ACCENT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            -170,

          top:
            300,

          width:
            850,

          height:
            620,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(53,166,161,.07) 0%,
              rgba(53,166,161,.025) 48%,
              rgba(53,166,161,0) 73%
            )
          `,

          pointerEvents:
            "none",
        }}
      />


      {/* ===================================================
          RIGHT BACKGROUND ACCENT
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          right:
            -170,

          top:
            300,

          width:
            850,

          height:
            620,

          borderRadius:
            "50%",

          background: `
            radial-gradient(
              ellipse,
              rgba(242,106,96,.07) 0%,
              rgba(242,106,96,.025) 48%,
              rgba(242,106,96,0) 73%
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
            1580,

          opacity:
            titleIn,

          transform:
            `translateY(${(1 - titleIn) * 16}px)`,

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


        {/* =================================================
            MAIN TITLE
            ================================================= */}

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
          <br />

          Andes virus outbreak.
        </div>
      </div>


      {/* ===================================================
          CANADA MAP
          =================================================== */}

      <MapVisual
        left={
          40
        }

        top={
          282
        }

        width={
          CANADA_WIDTH
        }

        height={
          CANADA_HEIGHT
        }

        src={
          canadaSrc
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

        labelLeft={
          22
        }

        labelTop={
          8
        }

        virusLeft={
          35
        }

        virusBottom={
          5
        }
      />


      {/* ===================================================
          SOUTH AMERICA MAP
          =================================================== */}

      <MapVisual
        left={
          1170
        }

        top={
          260
        }

        width={
          SOUTH_AMERICA_WIDTH
        }

        height={
          SOUTH_AMERICA_HEIGHT
        }

        src={
          southAmericaSrc
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

        labelLeft={
          20
        }

        labelTop={
          8
        }

        virusLeft={
          20
        }

        virusBottom={
          8
        }
      />


      {/* ===================================================
          CENTER CONTRAST LINE
          =================================================== */}

      <div
        style={{
          position:
            "absolute",

          left:
            "50%",

          top:
            388,

          width:
            1,

          height:
            350,

          background: `
            linear-gradient(
              180deg,
              transparent 0%,
              rgba(17,39,68,.08) 18%,
              rgba(17,39,68,.08) 82%,
              transparent 100%
            )
          `,

          opacity:
            contrastIn,

          transform:
            "translateX(-50%)",

          zIndex:
            5,
        }}
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
            572,

          width:
            96,

          height:
            96,

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
              30,

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
            100,

          display:
            "inline-flex",

          alignItems:
            "center",

          gap:
            12,

          padding:
            "14px 22px",

          borderRadius:
            999,

          background:
            "rgba(255,255,255,.95)",

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
            40,
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