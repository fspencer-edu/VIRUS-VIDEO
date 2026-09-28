import {theme} from "../../theme/theme";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  maxWidth?: number;
};

export const HandDrawnTitle = ({
  eyebrow,
  title,
  subtitle,
  maxWidth = 900,
}: Props) => (
  <div style={{maxWidth}}>
    {eyebrow ? (
      <div
        style={{
          fontFamily: theme.fonts.body,
          fontSize: 16,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 3.2,
          color: theme.colors.tealDark,
          marginBottom: 10,
        }}
      >
        {eyebrow}
      </div>
    ) : null}
    <div
      style={{
        fontFamily: theme.fonts.display,
        fontSize: 64,
        lineHeight: 1.02,
        fontWeight: 700,
        color: theme.colors.ink,
        letterSpacing: -1.4,
      }}
    >
      {title}
    </div>
    {subtitle ? (
      <div
        style={{
          marginTop: 14,
          fontFamily: theme.fonts.body,
          fontSize: 25,
          lineHeight: 1.35,
          color: theme.colors.muted,
        }}
      >
        {subtitle}
      </div>
    ) : null}
  </div>
);
