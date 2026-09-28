import {Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

type Props = {
  path: string;
  credit: string;
  width?: number;
  height?: number;
  startScale?: number;
  endScale?: number;
  objectPosition?: string;
};

export const OptionalPhoto = ({
  path,
  credit,
  width = 900,
  height = 560,
  startScale = 1,
  endScale = 1.06,
  objectPosition = "center",
}: Props) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 180], [startScale, endScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        borderRadius: 38,
        boxShadow: "0 24px 70px rgba(68,54,43,0.13)",
        border: "1px solid rgba(70,60,50,.08)",
      }}
    >
      <Img
        src={staticFile(path)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          transform: `scale(${scale})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 12,
          padding: "7px 10px",
          borderRadius: 10,
          background: "rgba(255,255,255,.84)",
          color: theme.colors.muted,
          fontFamily: theme.fonts.body,
          fontSize: 13,
        }}
      >
        {credit}
      </div>
    </div>
  );
};
