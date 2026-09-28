import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

import {CinematicCamera} from "../../../components/camera/CinematicCamera";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const MapBadge = ({x, y, label, active = false}: {x: number; y: number; label: string; active?: boolean}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: x - 7,
        top: y - 7,
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: active ? theme.colors.coral : theme.colors.teal,
        boxShadow: active ? "0 0 0 10px rgba(233,111,106,.14)" : "0 0 0 8px rgba(53,166,161,.12)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: x + 14,
        top: y - 18,
        padding: "7px 11px",
        borderRadius: 14,
        background: "rgba(255,255,255,.92)",
        border: `1px solid ${theme.colors.line}`,
        fontFamily: theme.fonts.body,
        fontSize: 16,
        color: theme.colors.ink,
        boxShadow: "0 8px 20px rgba(52,42,35,.08)",
      }}
    >
      {label}
    </div>
  </>
);

export const RodentReservoirShot = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const mapFade = interpolate(frame, [0, 38, 72], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const landscapeFade = interpolate(frame, [45, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ratReveal = spring({frame: frame - 74, fps, config: {damping: 170, stiffness: 110}});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #F8F3EB 0%, #FFF9F2 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 880,
          top: 70,
          width: 930,
          height: 690,
          opacity: mapFade,
          transform: `translateY(${(1 - mapFade) * 12}px) scale(${1 - (1 - mapFade) * 0.03})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 32,
            background: theme.colors.white,
            border: `1px solid ${theme.colors.line}`,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(52,42,35,.10)",
          }}
        >
          <EditorialAsset
            asset={ASSETS.canada.southAmericaMap}
            width={930}
            height={690}
            zoom={1.02}
            organic={false}
            showCredit={false}
          />
        </div>

        <div style={{position: "absolute", inset: 0}}>
          <MapBadge x={420} y={390} label="Argentina" active />
          <MapBadge x={330} y={470} label="Chile" />
        </div>
      </div>

      <CinematicCamera
        durationInFrames={360}
        from={{x: 40, y: 12, scale: 1.03}}
        to={{x: -55, y: -18, scale: 1.16}}
        origin="68% 56%"
        style={{opacity: landscapeFade}}
      >
        <div style={{position: "absolute", inset: 0}}>
          <EditorialAsset
            asset={ASSETS.transmission.rodentInfested}
            width={2100}
            height={1180}
            zoom={1.08}
            panX={-28}
            panY={-6}
            organic={false}
            showCredit
          />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(248,243,235,.95) 0%, rgba(248,243,235,.72) 36%, rgba(248,243,235,.08) 72%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 170,
            bottom: 115,
            opacity: ratReveal,
            transform: `translateY(${(1 - ratReveal) * 22}px) scale(${0.88 + ratReveal * 0.12})`,
          }}
        >
          <EditorialAsset
            asset={ASSETS.transmission.cartoonRatCutout}
            width={620}
            height={450}
            zoom={1}
            showCredit={false}
          />
        </div>
      </CinematicCamera>

      <div style={{position: "absolute", left: 85, top: 88, width: 715}}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(53,166,161,.12)",
            color: theme.colors.tealDark,
            fontFamily: theme.fonts.body,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2.2,
            textTransform: "uppercase",
          }}
        >
          Reservoir host
        </div>

        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 60, lineHeight: 1.04, color: theme.colors.ink}}>
          Andes virus circulates in rodents in South America.
        </div>

        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 27, lineHeight: 1.44, color: theme.colors.muted}}>
          Its main reservoir is the long-tailed pygmy rice rat.
        </div>
      </div>
    </div>
  );
};
