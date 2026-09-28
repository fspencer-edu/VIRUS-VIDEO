import type {ReactNode} from "react";

import {interpolate, useCurrentFrame} from "remotion";

import {AnimatedNumber} from "../../../components/visuals/AnimatedNumber";
import {RtGenerationVisual} from "../../../components/visuals/RtGenerationVisual";
import {RoughCircleAccent, RoughUnderlineAccent} from "../../../components/visuals/HandDrawnEmphasis";
import {theme} from "../../../theme/theme";

const StatCard = ({children, left, top, width = 340}: {children: ReactNode; left: number; top: number; width?: number}) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width,
      borderRadius: 28,
      background: theme.colors.white,
      border: `1px solid ${theme.colors.line}`,
      boxShadow: "0 18px 45px rgba(52,42,35,.10)",
      padding: "34px 34px 28px 34px",
    }}
  >
    {children}
  </div>
);

export const CaseStatusShot = () => {
  const frame = useCurrentFrame();

  const reveal = interpolate(frame, [0, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0}}>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 92,
          fontFamily: theme.fonts.display,
          fontSize: 60,
          lineHeight: 1.04,
          color: theme.colors.ink,
          opacity: reveal,
        }}
      >
        Final numbers from the cruise outbreak.
      </div>

      <StatCard left={105} top={250} width={350}>
        <div style={{fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 2.2, textTransform: "uppercase", color: theme.colors.coralDark}}>
          Cases
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 136, lineHeight: 1, color: theme.colors.coral}}>
          <RoughCircleAccent startFrame={24} durationInFrames={28} color="rgba(233,111,106,.68)">
            <span><AnimatedNumber value={13} startFrame={8} /></span>
          </RoughCircleAccent>
        </div>
        <div style={{marginTop: 10, fontFamily: theme.fonts.body, fontSize: 29, color: theme.colors.muted}}>
          reported cases
        </div>
      </StatCard>

      <StatCard left={495} top={250} width={300}>
        <div style={{fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 2.2, textTransform: "uppercase", color: theme.colors.coralDark}}>
          Deaths
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 136, lineHeight: 1, color: theme.colors.coralDark}}>
          <AnimatedNumber value={3} startFrame={18} />
        </div>
        <div style={{marginTop: 10, fontFamily: theme.fonts.body, fontSize: 29, color: theme.colors.muted}}>
          deaths
        </div>
      </StatCard>

      <StatCard left={865} top={210} width={855}>
        <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 28}}>
          <div>
            <div style={{fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 2.2, textTransform: "uppercase", color: theme.colors.tealDark}}>
              Transmission trend
            </div>
            <div style={{marginTop: 14, fontFamily: theme.fonts.display, fontSize: 92, lineHeight: 1, color: theme.colors.tealDark}}>
              Rt = 0.7 ↓
            </div>
            <div style={{marginTop: 14, fontFamily: theme.fonts.body, fontSize: 28, color: theme.colors.muted}}>
              <RoughUnderlineAccent startFrame={52} durationInFrames={24} color={theme.colors.teal}>
                spread was declining
              </RoughUnderlineAccent>
            </div>
          </div>

          <div
            style={{
              marginTop: 8,
              width: 74,
              height: 74,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(53,166,161,.12)",
              color: theme.colors.tealDark,
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            ↓
          </div>
        </div>

        <div style={{marginTop: 20}}>
          <RtGenerationVisual width={660} height={225} />
        </div>
      </StatCard>
    </div>
  );
};
