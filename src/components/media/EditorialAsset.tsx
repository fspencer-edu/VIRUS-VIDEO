import type {CSSProperties} from "react";
import {Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import type {StaticAsset} from "../../data/assets";
import {theme} from "../../theme/theme";

type Props = {
  asset: StaticAsset;
  width: number;
  height: number;
  zoom?: number;
  panX?: number;
  panY?: number;
  opacity?: number;
  rotation?: number;
  objectPosition?: string;
  showCredit?: boolean;
  organic?: boolean;
  style?: CSSProperties;
};

export const EditorialAsset = ({
  asset,
  width,
  height,
  zoom = 1.05,
  panX = 0,
  panY = 0,
  opacity = 1,
  rotation = 0,
  objectPosition = "center",
  showCredit = true,
  organic = true,
  style,
}: Props) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 180], [1, zoom], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftX = interpolate(frame, [0, 180], [0, panX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(frame, [0, 180], [0, panY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isCutout = asset.mode === "cutout";
  const isPaper = asset.mode === "paper";
  const isFull = asset.mode === "full";

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: isCutout ? "visible" : "hidden",
        borderRadius: isFull ? 0 : isCutout ? 0 : organic ? "48% 52% 45% 55% / 52% 46% 54% 48%" : 32,
        background: isCutout || isPaper ? "transparent" : theme.colors.white,
        boxShadow: isCutout || isPaper ? "none" : "0 24px 70px rgba(64,46,36,.14)",
        opacity,
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
    >
      <Img
        src={staticFile(asset.src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: isCutout || isPaper ? "contain" : "cover",
          objectPosition,
          transform: `translate(${driftX}px, ${driftY}px) scale(${scale})`,
          transformOrigin: "center",
          mixBlendMode: isPaper ? "multiply" : undefined,
          filter: isPaper ? "saturate(.95) contrast(.98)" : undefined,
        }}
      />

      {!isCutout && !isPaper ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(255,248,239,.04), rgba(45,30,20,.05))",
            pointerEvents: "none",
          }}
        />
      ) : null}

      {showCredit ? (
        <div
          style={{
            position: "absolute",
            right: isCutout || isPaper ? 0 : 12,
            bottom: isCutout || isPaper ? -20 : 10,
            maxWidth: width * 0.82,
            padding: isCutout || isPaper ? 0 : "5px 9px",
            borderRadius: 9,
            background: isCutout || isPaper ? "transparent" : "rgba(255,255,255,.86)",
            color: theme.colors.muted,
            fontFamily: theme.fonts.body,
            fontSize: 12,
            textAlign: "right",
          }}
        >
          {asset.credit}
        </div>
      ) : null}
    </div>
  );
};
