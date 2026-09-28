import {interpolate, useCurrentFrame} from "remotion";

import {CinematicCamera} from "../../../components/camera/CinematicCamera";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {AnimatedRoute} from "../../../components/visuals/AnimatedRoute";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const routes = [
  {d: "M 535 585 C 660 515 745 475 860 430", start: 20, end: 95, label: "North America", lx: 880, ly: 384},
  {d: "M 535 585 C 700 520 900 510 1080 458", start: 40, end: 125, label: "Europe", lx: 1100, ly: 412},
  {d: "M 535 585 C 720 600 970 650 1195 690", start: 60, end: 155, label: "Africa / Middle East", lx: 1188, ly: 706},
  {d: "M 535 585 C 450 610 380 660 315 735", start: 80, end: 180, label: "South America", lx: 190, ly: 770},
];

export const GlobalSpreadShot = () => {
  const frame = useCurrentFrame();

  const labelOpacity = (offset: number) => interpolate(frame, [offset + 20, offset + 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const peopleOpacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0}}>
      <CinematicCamera
        durationInFrames={270}
        from={{x: 26, y: -10, scale: 1.03}}
        to={{x: -52, y: -16, scale: 1.12}}
        origin="54% 52%"
      >
        <div
          style={{
            position: "absolute",
            left: 330,
            top: 135,
            width: 1260,
            height: 760,
            borderRadius: 36,
            overflow: "hidden",
            background: theme.colors.white,
            border: `1px solid ${theme.colors.line}`,
            boxShadow: "0 24px 60px rgba(52,42,35,.10)",
          }}
        >
          <EditorialAsset
            asset={ASSETS.outbreak.globalCasesMap}
            width={1260}
            height={760}
            zoom={1.01}
            organic={false}
            showCredit={false}
          />
        </div>

        <div style={{position: "absolute", left: 330, top: 135}}>
          {routes.map((route, i) => (
            <div key={i} style={{position: "absolute", inset: 0}}>
              <AnimatedRoute
                d={route.d}
                viewBox="0 0 1260 760"
                width={1260}
                height={760}
                startFrame={route.start}
                endFrame={route.end}
                stroke={i % 2 === 0 ? theme.colors.coral : theme.colors.teal}
                strokeWidth={6}
                opacity={0.95}
                followerRadius={8}
                followerColor={i % 2 === 0 ? theme.colors.coral : theme.colors.teal}
                followerOutline="rgba(255,249,242,.92)"
              />
              <div
                style={{
                  position: "absolute",
                  left: route.lx,
                  top: route.ly,
                  opacity: labelOpacity(route.start),
                  transform: `translateY(${(1 - labelOpacity(route.start)) * 8}px)`,
                  padding: "8px 12px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,.92)",
                  border: `1px solid ${theme.colors.line}`,
                  boxShadow: "0 12px 28px rgba(42,35,31,.08)",
                  fontFamily: theme.fonts.body,
                  fontSize: 17,
                  color: theme.colors.ink,
                  whiteSpace: "nowrap",
                }}
              >
                {route.label}
              </div>
            </div>
          ))}

          <div style={{position: "absolute", left: 510, top: 560, opacity: peopleOpacity}}>
            <div style={{width: 52, height: 52, borderRadius: "50%", background: theme.colors.navy, boxShadow: "0 0 0 10px rgba(35,48,74,.14)"}} />
          </div>
        </div>
      </CinematicCamera>

      <div style={{position: "absolute", left: 85, top: 88, width: 715}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          After the voyage, passengers disperse internationally.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 27, lineHeight: 1.44, color: theme.colors.muted}}>
          Once people leave the ship and return home, the outbreak becomes an international contact-tracing problem.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 110,
          bottom: 130,
          padding: "16px 22px",
          borderRadius: 22,
          background: "rgba(255,255,255,.92)",
          border: `1px solid ${theme.colors.line}`,
          boxShadow: "0 14px 36px rgba(52,42,35,.08)",
          fontFamily: theme.fonts.body,
          fontSize: 25,
          lineHeight: 1.36,
          color: theme.colors.ink,
          textAlign: "right",
        }}
      >
        600+ contacts
        <br />
        across 32 countries
        and territories
      </div>
    </div>
  );
};
