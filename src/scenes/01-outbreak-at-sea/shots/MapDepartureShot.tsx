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
  EditorialAsset,
} from "../../../components/media/EditorialAsset";

import type {
  StaticAsset,
} from "../../../data/assets";

import {
  ASSETS,
} from "../../../data/assets";

import {
  RoughUnderlineAccent,
} from "../../../components/visuals/HandDrawnEmphasis";

import {
  theme,
} from "../../../theme/theme";

const shipCutout: StaticAsset = {
  src: "assets/outbreak/ship-cutout.png",
  credit:
    "User-provided cruise-ship illustration — add original source to final credits",
  mode: "cutout",
};

const Wave = ({
  y,
  amplitude,
  speed,
  opacity,
}: {
  y: number;
  amplitude: number;
  speed: number;
  opacity: number;
}) => {
  const frame = useCurrentFrame();

  const points =
    Array.from(
      {length: 17},
      (_, i) => {
        const x =
          -80 +
          i * 125;

        const waveY =
          y +
          Math.sin(
            frame *
              speed +
              i *
                0.72
          ) *
            amplitude;

        return `${i === 0 ? "M" : "L"} ${x} ${waveY}`;
      }
    ).join(" ");

  return (
    <path
      d={points}
      fill="none"
      stroke="#66B7CF"
      strokeWidth="7"
      strokeLinecap="round"
      opacity={opacity}
    />
  );
};

export const MapDepartureShot = () => {
  const frame =
    useCurrentFrame();

  const {fps} =
    useVideoConfig();

  const titleIn =
    spring({
      frame,
      fps,
      config: {
        damping: 180,
        stiffness: 90,
      },
    });

  const shipProgress =
    interpolate(
      frame,
      [10, 190],
      [0, 1],
      {
        extrapolateLeft:
          "clamp",
        extrapolateRight:
          "clamp",
      }
    );

  const shipX =
    interpolate(
      shipProgress,
      [0, 1],
      [-420, 820]
    );

  const shipBob =
    Math.sin(
      frame / 8
    ) * 8;

  const oceanRise =
    interpolate(
      frame,
      [0, 45],
      [80, 0],
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
        inset: 0,
        overflow:
          "hidden",
      }}
    >
      <CinematicCamera
        durationInFrames={210}
        from={{
          x: 40,
          y: 10,
          scale: 1.05,
        }}
        to={{
          x: -55,
          y: -25,
          scale: 1.18,
        }}
        origin="68% 54%"
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
          }}
        >
          <EditorialAsset
            asset={
              ASSETS
                .outbreak
                .shipResponse
            }
            width={2100}
            height={1180}
            zoom={1.08}
            panX={-28}
            panY={4}
            objectPosition="center 46%"
            organic={false}
            showCredit
          />
        </div>

        <div
          style={{
            position:
              "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(248,243,235,.93) 0%, rgba(248,243,235,.64) 37%, rgba(248,243,235,.12) 72%)",
          }}
        />
      </CinematicCamera>

      <svg
        viewBox="0 0 1920 1080"
        width="1920"
        height="1080"
        style={{
          position:
            "absolute",
          left: 0,
          top:
            690 +
            oceanRise,
        }}
      >
        <path
          d="M0 80 H1920 V390 H0 Z"
          fill="#DDF1F6"
          opacity="0.88"
        />

        <Wave
          y={88}
          amplitude={12}
          speed={0.12}
          opacity={0.72}
        />

        <Wave
          y={150}
          amplitude={18}
          speed={0.09}
          opacity={0.5}
        />

        <Wave
          y={220}
          amplitude={14}
          speed={0.145}
          opacity={0.35}
        />
      </svg>

      <div
        style={{
          position:
            "absolute",
          left: shipX,
          top:
            655 +
            shipBob,
          width: 760,
          transform:
            `rotate(${Math.sin(frame / 14) * 0.8}deg)`,
          transformOrigin:
            "50% 80%",
        }}
      >
        <EditorialAsset
          asset={
            shipCutout
          }
          width={760}
          height={430}
          zoom={1}
          showCredit={false}
        />
      </div>

      <div
        style={{
          position:
            "absolute",
          left: 78,
          top: 72,
          width: 780,
          opacity:
            titleIn,
          transform:
            `translateY(${(1 - titleIn) * 34}px)`,
        }}
      >
        <div
          style={{
            fontFamily:
              theme.fonts.body,
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform:
              "uppercase",
            color:
              theme.colors.tealDark,
          }}
        >
          April 2026
        </div>

        <div
          style={{
            marginTop: 12,
            fontFamily:
              theme.fonts.display,
            fontSize: 76,
            lineHeight: 0.98,
            fontWeight: 700,
            color:
              theme.colors.ink,
          }}
        >
          A mysterious
          <br />
          illness at{" "}
          <RoughUnderlineAccent
            startFrame={34}
            durationInFrames={28}
            color={
              theme.colors.coral
            }
          >
            sea
          </RoughUnderlineAccent>
        </div>

        <div
          style={{
            marginTop: 21,
            maxWidth: 690,
            fontFamily:
              theme.fonts.body,
            fontSize: 27,
            lineHeight: 1.4,
            color:
              theme.colors.muted,
          }}
        >
          The expedition
          cruise ship M/V
          Hondius begins a
          South Atlantic
          voyage from
          Ushuaia, Argentina.
        </div>
      </div>
    </div>
  );
};
