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
  ASSETS,
} from "../../../data/assets";


const FONT_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const TITLE_STACK =
  FONT_STACK;


/* =========================================================
   FEVER BADGE
   Slightly larger to match larger characters
   ========================================================= */

const FeverBadge = ({
  progress,
}: {
  progress: number;
}) => {
  return (
    <div
      style={{
        position: "absolute",

        right: -8,
        top: 10,

        width: 84,
        height: 84,

        borderRadius: "50%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background:
          "#F26A60",

        border:
          "5px solid rgba(255,255,255,.97)",

        color:
          "#FFFFFF",

        fontFamily:
          FONT_STACK,

        fontSize:
          28,

        fontWeight:
          800,

        opacity:
          progress,

        transform:
          `scale(${0.8 + progress * 0.22})`,

        boxShadow:
          "0 16px 34px rgba(185,76,74,.28)",
      }}
    >
      39°
    </div>
  );
};


/* =========================================================
   SPREAD PARTICLES
   Roughly 2x larger
   ========================================================= */

const SpreadParticles = ({
  progress,
  frame,
  scale = 1,
}: {
  progress: number;
  frame: number;
  scale?: number;
}) => {
  const particles = [
    {x: 86, y: 34, size: 22, driftX: -18, driftY: -12, delay: 0},
    {x: 126, y: 48, size: 18, driftX: 20, driftY: -20, delay: 4},
    {x: 104, y: 72, size: 16, driftX: -14, driftY: -22, delay: 8},
    {x: 146, y: 34, size: 14, driftX: 16, driftY: -10, delay: 10},
    {x: 74, y: 66, size: 14, driftX: -20, driftY: -16, delay: 14},
    {x: 154, y: 72, size: 20, driftX: 18, driftY: -12, delay: 18},
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: progress,
      }}
    >
      {particles.map((particle, index) => {
        const t =
          (frame + particle.delay + index * 3) /
          14;

        const floatX =
          Math.sin(t) *
          particle.driftX *
          scale;

        const floatY =
          Math.cos(t) *
          particle.driftY *
          scale;

        const pulse =
          0.92 +
          Math.sin(t * 1.35) *
            0.18;

        return (
          <div
            key={`${particle.x}-${particle.y}-${index}`}
            style={{
              position: "absolute",

              left:
                particle.x *
                  scale +
                floatX,

              top:
                particle.y *
                  scale +
                floatY,

              width:
                particle.size *
                scale,

              height:
                particle.size *
                scale,

              borderRadius:
                "50%",

              background:
                "rgba(242,106,96,.72)",

              boxShadow:
                "0 0 18px rgba(242,106,96,.28)",

              transform:
                `scale(${pulse})`,

              opacity:
                0.30 +
                progress * 0.70,
            }}
          />
        );
      })}
    </div>
  );
};


/* =========================================================
   PASSENGER
   ========================================================= */

type PassengerProps = {
  left: number;
  top: number;
  width: number;

  asset:
    | typeof ASSETS.characters.passengerA
    | typeof ASSETS.characters.passengerB
    | typeof ASSETS.characters.passengerWave;

  fever?: number;
  sick?: boolean;
  flip?: boolean;
  opacity?: number;
  frame: number;
};


const Passenger = ({
  left,
  top,
  width,
  asset,
  fever = 0,
  sick = false,
  flip = false,
  opacity = 1,
  frame,
}: PassengerProps) => {
  const particleScale =
    width / 250;

  return (
    <div
      style={{
        position: "absolute",

        left,
        top,
        width,

        opacity,

        transform:
          `scale(${0.97 + fever * 0.05})`,

        transformOrigin:
          "50% 90%",

        filter:
          fever > 0.02
            ? `
              drop-shadow(
                0 0
                ${20 + fever * 26}px
                rgba(233,111,106,.22)
              )
            `
            : undefined,
      }}
    >
      <IllustratedPerson
        asset={asset}
        width={width}
        sick={sick ? 0.95 : 0}
        cough={fever > 0.45 ? 0.38 : 0}
        flip={flip}
        bob={0.46}
      />

      {sick ? (
        <>
          <SpreadParticles
            progress={fever}
            frame={frame}
            scale={particleScale}
          />

          <FeverBadge
            progress={fever}
          />
        </>
      ) : null}
    </div>
  );
};


/* =========================================================
   SOFT SPREAD AURA
   ========================================================= */

const SpreadAura = ({
  progress,
  pulse,
}: {
  progress: number;
  pulse: number;
}) => {
  return (
    <div
      style={{
        position: "absolute",

        left: 470,
        top: 212,

        width: 1120,
        height: 470,

        opacity: progress,

        transform:
          `scale(${0.94 + progress * 0.10}) scale(${pulse})`,

        transformOrigin:
          "50% 50%",

        pointerEvents:
          "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,

          borderRadius: "50%",

          background: `
            radial-gradient(
              ellipse at center,
              rgba(242,106,96,.18) 0%,
              rgba(242,106,96,.13) 34%,
              rgba(242,106,96,.08) 58%,
              rgba(242,106,96,.04) 78%,
              rgba(242,106,96,0) 100%
            )
          `,
        }}
      />

      <div
        style={{
          position: "absolute",

          left: -86,
          right: -86,
          top: -44,
          bottom: -44,

          borderRadius: "50%",

          background: `
            radial-gradient(
              ellipse at center,
              rgba(242,106,96,.08) 0%,
              rgba(242,106,96,.05) 48%,
              rgba(242,106,96,.02) 70%,
              rgba(242,106,96,0) 100%
            )
          `,
        }}
      />

      <div
        style={{
          position: "absolute",

          left: 160,
          right: 160,
          top: 62,
          bottom: 62,

          borderRadius: "50%",

          background: `
            radial-gradient(
              ellipse at center,
              rgba(242,106,96,.12) 0%,
              rgba(242,106,96,.07) 48%,
              rgba(242,106,96,0) 100%
            )
          `,
        }}
      />
    </div>
  );
};


/* =========================================================
   SOURCE SAFE AREA
   ========================================================= */

const SourceSafeArea = () => {
  return (
    <div
      style={{
        position: "absolute",

        left: 0,
        right: 0,
        bottom: 0,

        height: 56,

        background: `
          linear-gradient(
            180deg,
            rgba(248,245,239,0),
            rgba(248,245,239,.98) 62%
          )
        `,

        pointerEvents:
          "none",
      }}
    />
  );
};


/* =========================================================
   MAIN SHOT
   ========================================================= */

export const CasesRevealShot = () => {
  const frame =
    useCurrentFrame();

  const {
    fps,
  } =
    useVideoConfig();


  const fever1 =
    spring({
      frame:
        frame - 12,
      fps,
      config: {
        damping: 165,
        stiffness: 110,
      },
    });


  const fever2 =
    spring({
      frame:
        frame - 42,
      fps,
      config: {
        damping: 165,
        stiffness: 110,
      },
    });


  const fever3 =
    spring({
      frame:
        frame - 74,
      fps,
      config: {
        damping: 165,
        stiffness: 110,
      },
    });


  const warning =
    interpolate(
      frame,
      [72, 138],
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
      frame / 7
    ) *
      0.022;


  return (
    <div
      style={{
        position: "absolute",
        inset: 0,

        overflow: "hidden",

        background: `
          linear-gradient(
            180deg,
            #F8F5EF 0%,
            #FFF9F4 100%
          )
        `,
      }}
    >
      {/* ===================================================
          TOP BLUE BAND
          Now reaches screen edge
          =================================================== */}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 208,

          background:
            "#EAF3F7",

          borderBottom:
            "10px solid rgba(69,93,113,.16)",
        }}
      />


      {/* ===================================================
          WHITE MIDDLE SECTION
          Whiter background
          =================================================== */}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 208,
          bottom: 188,

          background:
            "#FCFBF8",
        }}
      />


      {/* ===================================================
          BOTTOM BLUE BAND
          Reaches screen edge
          =================================================== */}

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 188,

          background:
            "#DCEAF3",

          borderTop:
            "8px solid rgba(35,48,74,.08)",
        }}
      />


      {/* ===================================================
          WINDOWS
          =================================================== */}

      {[180, 540, 930, 1310].map(
        left => (
          <div
            key={left}
            style={{
              position: "absolute",

              left,
              top: 86,

              width: 190,
              height: 96,

              borderRadius:
                999,

              border:
                "8px solid rgba(95,136,159,.46)",

              background: `
                linear-gradient(
                  180deg,
                  #C8F0F8 0%,
                  #EAF8FC 58%,
                  #B5DBE7 59%,
                  #B5DBE7 64%,
                  #EEF9FC 65%
                )
              `,

              opacity:
                0.92,
            }}
          />
        )
      )}


      {/* ===================================================
          SPREAD AURA
          =================================================== */}

      <SpreadAura
        progress={warning}
        pulse={pulse}
      />


      {/* ===================================================
          PASSENGERS
          Noticeably larger
          =================================================== */}

      <Passenger
        left={110}
        top={328}
        width={300}
        asset={
          ASSETS.characters.passengerA
        }
        opacity={0.94}
        frame={frame}
      />

      <Passenger
        left={335}
        top={296}
        width={320}
        asset={
          ASSETS.characters.passengerWave
        }
        opacity={0.95}
        frame={frame}
      />

      <Passenger
        left={610}
        top={232}
        width={360}
        asset={
          ASSETS.characters.passengerA
        }
        sick
        fever={fever1}
        frame={frame}
      />

      <Passenger
        left={885}
        top={280}
        width={320}
        asset={
          ASSETS.characters.passengerB
        }
        opacity={0.95}
        frame={frame}
      />

      <Passenger
        left={1135}
        top={296}
        width={320}
        asset={
          ASSETS.characters.passengerWave
        }
        sick
        fever={fever2}
        frame={frame}
      />

      <Passenger
        left={1395}
        top={232}
        width={360}
        asset={
          ASSETS.characters.passengerA
        }
        sick
        fever={fever3}
        flip
        frame={frame}
      />


      {/* ===================================================
          TITLE
          =================================================== */}

      <div
        style={{
          position: "absolute",

          left: 0,
          right: 0,
          top: 48,

          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display:
              "inline-flex",

            alignItems:
              "center",

            gap: 10,

            padding:
              "10px 18px",

            borderRadius:
              999,

            background:
              "rgba(255,255,255,.90)",

            border:
              "1px solid rgba(17,39,68,.08)",

            backdropFilter:
              "blur(12px)",

            boxShadow:
              "0 12px 28px rgba(35,43,53,.06)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#F26A60",
            }}
          />

          <span
            style={{
              fontFamily:
                FONT_STACK,
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 2.2,
              textTransform: "uppercase",
              color: "#B14E49",
            }}
          >
            On board
          </span>
        </div>

        <div
          style={{
            marginTop: 14,

            fontFamily:
              TITLE_STACK,

            fontSize: 82,

            lineHeight: 0.92,

            fontWeight: 820,

            letterSpacing:
              -3.8,

            color:
              "#16233A",

            textAlign:
              "center",
          }}
        >
          Passengers begin to fall ill.
        </div>
      </div>


      {/* ===================================================
          WARNING CARD
          =================================================== */}

      <div
        style={{
          position: "absolute",

          left: "50%",
          bottom: 74,

          width: 860,

          padding:
            "18px 24px",

          borderRadius:
            28,

          background:
            "rgba(255,255,255,.97)",

          border:
            `2px solid rgba(242,106,96,${0.34 + warning * 0.46})`,

          boxShadow:
            "0 18px 42px rgba(52,42,35,.10)",

          opacity:
            warning,

          transform:
            `translateX(-50%) translateY(${(1 - warning) * 14}px)`,
        }}
      >
        <div
          style={{
            fontFamily:
              FONT_STACK,

            fontSize: 16,

            fontWeight: 800,

            letterSpacing: 2,

            textTransform: "uppercase",

            color:
              "#C2564B",

            textAlign:
              "center",
          }}
        >
          Early outbreak signal
        </div>

        <div
          style={{
            marginTop: 8,

            fontFamily:
              FONT_STACK,

            fontSize: 28,

            lineHeight: 1.28,

            fontWeight: 700,

            color:
              "#33465D",

            textAlign:
              "center",
          }}
        >
          Several passengers develop fever and respiratory
          illness within days of departure.
        </div>
      </div>


      <SourceSafeArea />
    </div>
  );
};