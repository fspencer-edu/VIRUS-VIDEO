import {theme} from "../../theme/theme";

type Props = {
  timecode: string;
  sources: string[];
};

export const SourceStrip = ({timecode, sources}: Props) => (
  <div
    style={{
      position: "absolute",
      left: 42,
      bottom: 24,
      maxWidth: 1450,
      fontFamily: theme.fonts.body,
      color: theme.colors.muted,
      fontSize: 16,
      lineHeight: 1.3,
      zIndex: 100,
      display: "flex",
      gap: 16,
      alignItems: "center",
    }}
  >
    <span
      style={{
        color: theme.colors.ink,
        fontWeight: 700,
        letterSpacing: 0.3,
      }}
    >
      {timecode}
    </span>
    <span style={{opacity: 0.45}}>•</span>
    <span>{sources.join("   |   ")}</span>
  </div>
);
