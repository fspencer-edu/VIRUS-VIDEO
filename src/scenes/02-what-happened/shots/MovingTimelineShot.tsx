import type {ReactNode} from "react";

import {spring, useCurrentFrame, useVideoConfig, interpolate} from "remotion";

import {CinematicCamera} from "../../../components/camera/CinematicCamera";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {IllustratedPerson} from "../../../components/characters/IllustratedPerson";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

type NodeProps = {
  x: number;
  y: number;
  progress: number;
  date: string;
  title: string;
  detail?: string;
  above?: boolean;
  accent?: string;
  children: ReactNode;
};

const RoundedCard = ({children, width, height}: {children: ReactNode; width: number; height: number}) => (
  <div
    style={{
      width,
      height,
      borderRadius: 26,
      overflow: "hidden",
      background: theme.colors.white,
      boxShadow: "0 18px 45px rgba(52,42,35,.10)",
      border: `1px solid ${theme.colors.line}`,
      position: "relative",
    }}
  >
    {children}
  </div>
);

const TimelineNode = ({
  x,
  y,
  progress,
  date,
  title,
  detail,
  above = true,
  accent = theme.colors.coral,
  children,
}: NodeProps) => {
  const cardY = above ? y - 235 : y + 38;
  const stemTop = above ? y - 88 : y + 16;
  const stemHeight = 72;

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x - 4,
          top: stemTop,
          width: 8,
          height: stemHeight,
          borderRadius: 999,
          background: accent,
          opacity: progress,
          transform: `scaleY(${progress})`,
          transformOrigin: above ? "bottom center" : "top center",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: x - 14,
          top: y - 14,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: theme.colors.white,
          border: `6px solid ${accent}`,
          opacity: progress,
          transform: `scale(${0.7 + progress * 0.3})`,
          boxShadow: `0 0 0 10px rgba(233,111,106,.12)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: x - 135,
          top: cardY,
          width: 270,
          opacity: progress,
          transform: `translateY(${(1 - progress) * (above ? 24 : -24)}px) scale(${0.92 + progress * 0.08})`,
        }}
      >
        {children}
        <div
          style={{
            marginTop: 12,
            fontFamily: theme.fonts.body,
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: 2.4,
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {date}
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: theme.fonts.display,
            fontSize: 27,
            lineHeight: 1.08,
            color: theme.colors.ink,
          }}
        >
          {title}
        </div>
        {detail ? (
          <div
            style={{
              marginTop: 6,
              fontFamily: theme.fonts.body,
              fontSize: 17,
              lineHeight: 1.35,
              color: theme.colors.muted,
            }}
          >
            {detail}
          </div>
        ) : null}
      </div>
    </>
  );
};

export const MovingTimelineShot = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p1 = spring({frame: frame - 10, fps, config: {damping: 160, stiffness: 120}});
  const p2 = spring({frame: frame - 65, fps, config: {damping: 160, stiffness: 120}});
  const p3 = spring({frame: frame - 130, fps, config: {damping: 160, stiffness: 120}});
  const p4 = spring({frame: frame - 195, fps, config: {damping: 160, stiffness: 120}});

  const lineProgress = interpolate(frame, [0, 300], [0.03, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const markerX = interpolate(frame, [0, 300], [275, 1560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0}}>
      <CinematicCamera
        durationInFrames={360}
        from={{x: 90, y: -10, scale: 1.02}}
        to={{x: -140, y: -8, scale: 1.08}}
        origin="50% 55%"
      >
        <div style={{position: "absolute", left: 92, top: 80}}>
          <div
            style={{
              fontFamily: theme.fonts.display,
              fontSize: 58,
              lineHeight: 1.04,
              color: theme.colors.ink,
              width: 760,
            }}
          >
            A short timeline shows how the outbreak was recognized.
          </div>

          <div
            style={{
              marginTop: 16,
              fontFamily: theme.fonts.body,
              fontSize: 25,
              lineHeight: 1.42,
              color: theme.colors.muted,
              width: 760,
            }}
          >
            The ship leaves Argentina, symptoms appear, a medical evacuation follows,
            and lab testing finally identifies the cause.
          </div>
        </div>

        <svg viewBox="0 0 1920 1080" width="1920" height="1080" style={{position: "absolute", inset: 0}}>
          <line x1="230" y1="640" x2="1690" y2="640" stroke={theme.colors.line} strokeWidth="8" strokeLinecap="round" />
          <line x1="230" y1="640" x2={230 + 1460 * lineProgress} y2="640" stroke={theme.colors.coral} strokeWidth="8" strokeLinecap="round" />
          <circle cx={markerX} cy="640" r="16" fill={theme.colors.coral} />
          <circle cx={markerX} cy="640" r="32" fill="rgba(233,111,106,.16)" />
        </svg>

        <TimelineNode
          x={270}
          y={640}
          progress={p1}
          date="April 1"
          title="Ship leaves Argentina"
          detail="M/V Hondius departs Ushuaia."
          above
        >
          <RoundedCard width={250} height={138}>
            <EditorialAsset
              asset={ASSETS.outbreak.harbor}
              width={250}
              height={138}
              zoom={1.03}
              objectPosition="center 56%"
              organic={false}
              showCredit={false}
            />
          </RoundedCard>
        </TimelineNode>

        <TimelineNode
          x={680}
          y={640}
          progress={p2}
          date="April 3"
          title="First symptoms"
          detail="The first known case becomes ill."
          above={false}
          accent={theme.colors.teal}
        >
          <RoundedCard width={250} height={160}>
            <div style={{position: "absolute", inset: 0, background: "#F8FBFC"}} />
            <div style={{position: "absolute", left: 56, top: 10, width: 130}}>
              <IllustratedPerson asset={ASSETS.characters.passengerA} width={130} sick={0.85} cough={0.2} bob={0.3} />
            </div>
            <div
              style={{
                position: "absolute",
                right: 18,
                top: 18,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: theme.colors.coral,
                color: theme.colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: theme.fonts.body,
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              39°
            </div>
          </RoundedCard>
        </TimelineNode>

        <TimelineNode
          x={1090}
          y={640}
          progress={p3}
          date="Late April"
          title="Medical evacuation"
          detail="Severely ill passengers are evacuated for care."
          above
          accent={theme.colors.violet}
        >
          <RoundedCard width={250} height={138}>
            <EditorialAsset
              asset={ASSETS.outbreak.evacuation}
              width={250}
              height={138}
              zoom={1.02}
              objectPosition="center 52%"
              organic={false}
              showCredit={false}
            />
            <div
              style={{
                position: "absolute",
                right: 14,
                top: 14,
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: theme.colors.white,
                border: `3px solid ${theme.colors.violet}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.colors.violet,
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              +
            </div>
          </RoundedCard>
        </TimelineNode>

        <TimelineNode
          x={1500}
          y={640}
          progress={p4}
          date="May 2"
          title="Testing identifies the cause"
          detail="Lab work points to Andes virus."
          above={false}
          accent={theme.colors.sky}
        >
          <RoundedCard width={250} height={138}>
            <EditorialAsset
              asset={ASSETS.outbreak.pcrPhoto}
              width={250}
              height={138}
              zoom={1.02}
              objectPosition="center"
              organic={false}
              showCredit={false}
            />
          </RoundedCard>
        </TimelineNode>
      </CinematicCamera>
    </div>
  );
};
