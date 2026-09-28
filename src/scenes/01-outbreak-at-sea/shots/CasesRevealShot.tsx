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
  IllustratedPerson,
} from "../../../components/characters/IllustratedPerson";

import {
  ASSETS,
} from "../../../data/assets";

import {
  theme,
} from "../../../theme/theme";

const FeverBadge = ({
  progress,
}: {
  progress: number;
}) => (
  <div
    style={{
      position:
        "absolute",
      right: -20,
      top: 28,
      width: 76,
      height: 76,
      borderRadius:
        "50%",
      display:
        "flex",
      alignItems:
        "center",
      justifyContent:
        "center",
      background:
        "#EA6E67",
      color:
        "#FFFFFF",
      fontFamily:
        theme.fonts.body,
      fontSize: 21,
      fontWeight: 800,
      transform:
        `scale(${progress})`,
      opacity:
        progress,
      boxShadow:
        "0 0 0 10px rgba(234,110,103,.14), 0 12px 35px rgba(185,76,74,.28)",
    }}
  >
    39°
  </div>
);

type PassengerProps = {
  left: number;
  top: number;
  asset:
    | typeof ASSETS.characters.passengerA
    | typeof ASSETS.characters.passengerB
    | typeof ASSETS.characters.passengerWave;
  width: number;
  feverProgress?: number;
  sick?: boolean;
  flip?: boolean;
};

const Passenger = ({
  left,
  top,
  asset,
  width,
  feverProgress = 0,
  sick = false,
  flip = false,
}: PassengerProps) => (
  <div
    style={{
      position:
        "absolute",
      left,
      top,
      width,
      transform:
        `scale(${0.96 + feverProgress * 0.04})`,
      transformOrigin:
        "50% 90%",
      filter:
        feverProgress > 0
          ? `drop-shadow(0 0 ${20 + feverProgress * 24}px rgba(234,110,103,.28))`
          : undefined,
    }}
  >
    <IllustratedPerson
      asset={asset}
      width={width}
      sick={
        sick
          ? 0.9
          : 0
      }
      cough={
        feverProgress >
        0.5
          ? 0.35
          : 0
      }
      flip={flip}
      bob={0.55}
    />

    {sick ? (
      <FeverBadge
        progress={
          feverProgress
        }
      />
    ) : null}
  </div>
);

export const CasesRevealShot = () => {
  const frame =
    useCurrentFrame();

  const {fps} =
    useVideoConfig();

  const fever1 =
    spring({
      frame:
        frame - 24,
      fps,
      config: {
        damping: 150,
        stiffness: 110,
      },
    });

  const fever2 =
    spring({
      frame:
        frame - 70,
      fps,
      config: {
        damping: 150,
        stiffness: 110,
      },
    });

  const fever3 =
    spring({
      frame:
        frame - 116,
      fps,
      config: {
        damping: 150,
        stiffness: 110,
      },
    });

  const warning =
    interpolate(
      frame,
      [125, 180],
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
      frame / 5
    ) *
      0.035;

  return (
    <div
      style={{
        position:
          "absolute",
        inset: 0,
        overflow:
          "hidden",
        background:
          "linear-gradient(180deg, #F9F0E7 0 55%, #DCE8EE 55% 100%)",
      }}
    >
      <CinematicCamera
        durationInFrames={180}
        from={{
          x: 90,
          scale: 1.04,
        }}
        to={{
          x: -90,
          y: -20,
          scale: 1.18,
        }}
        origin="54% 64%"
      >
        <div
          style={{
            position:
              "absolute",
            left: 0,
            right: 0,
            top: 560,
            height: 12,
            background:
              "rgba(35,48,74,.16)",
          }}
        />

        {[
          {
            left: 150,
            top: 390,
            asset:
              ASSETS
                .characters
                .passengerA,
            width: 245,
          },
          {
            left: 455,
            top: 380,
            asset:
              ASSETS
                .characters
                .passengerB,
            width: 235,
          },
          {
            left: 745,
            top: 365,
            asset:
              ASSETS
                .characters
                .passengerWave,
            width: 255,
            sick: true,
            fever:
              fever1,
          },
          {
            left: 1065,
            top: 375,
            asset:
              ASSETS
                .characters
                .passengerA,
            width: 245,
            sick: true,
            fever:
              fever2,
            flip: true,
          },
          {
            left: 1370,
            top: 380,
            asset:
              ASSETS
                .characters
                .passengerB,
            width: 235,
          },
          {
            left: 1630,
            top: 370,
            asset:
              ASSETS
                .characters
                .passengerWave,
            width: 245,
            sick: true,
            fever:
              fever3,
            flip: true,
          },
        ].map(
          (
            passenger,
            i
          ) => (
            <Passenger
              key={i}
              left={
                passenger.left
              }
              top={
                passenger.top
              }
              asset={
                passenger.asset
              }
              width={
                passenger.width
              }
              sick={
                passenger.sick
              }
              feverProgress={
                passenger.fever ??
                0
              }
              flip={
                passenger.flip
              }
            />
          )
        )}
      </CinematicCamera>

      <div
        style={{
          position:
            "absolute",
          left: 82,
          top: 72,
          width: 1000,
        }}
      >
        <div
          style={{
            fontFamily:
              theme.fonts.display,
            fontSize: 62,
            lineHeight: 1.03,
            color:
              theme.colors.ink,
          }}
        >
          Then passengers
          begin to fall ill.
        </div>

        <div
          style={{
            marginTop: 18,
            fontFamily:
              theme.fonts.body,
            fontSize: 27,
            color:
              theme.colors.muted,
          }}
        >
          One case. Then a
          second. Then a
          third.
        </div>
      </div>

      <div
        style={{
          position:
            "absolute",
          left: 590,
          top: 290,
          width: 850,
          height: 520,
          borderRadius:
            "50%",
          border:
            "7px solid rgba(234,110,103,.8)",
          opacity:
            warning * 0.46,
          transform:
            `scale(${warning * pulse})`,
          boxShadow:
            warning > 0
              ? "0 0 70px rgba(234,110,103,.14)"
              : undefined,
        }}
      />

      <div
        style={{
          position:
            "absolute",
          right: 105,
          bottom: 125,
          width: 640,
          opacity:
            warning,
          transform:
            `translateY(${(1 - warning) * 22}px)`,
          textAlign:
            "right",
        }}
      >
        <div
          style={{
            fontFamily:
              theme.fonts.body,
            fontSize: 18,
            fontWeight: 800,
            textTransform:
              "uppercase",
            letterSpacing: 3,
            color:
              theme.colors.coralDark,
          }}
        >
          Warning
        </div>

        <div
          style={{
            marginTop: 8,
            fontFamily:
              theme.fonts.display,
            fontSize: 58,
            lineHeight: 1.02,
            color:
              theme.colors.coralDark,
          }}
        >
          Severe
          respiratory
          illness
        </div>
      </div>
    </div>
  );
};
