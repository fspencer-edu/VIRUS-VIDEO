import type {ReactNode} from "react";
import {theme} from "../../theme/theme";

type Props = {
  children: ReactNode;
  width?: number;
  height?: number;
  borderColor?: string;
  background?: string;
};

export const CalloutBubble = ({
  children,
  width = 300,
  height = 210,
  borderColor = theme.colors.sky,
  background = "rgba(255,255,255,0.72)",
}: Props) => (
  <div
    style={{
      width,
      height,
      borderRadius: "50%",
      border: `4px solid ${borderColor}`,
      background,
      boxShadow: "0 12px 40px rgba(62,55,45,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      boxSizing: "border-box",
    }}
  >
    {children}
  </div>
);
