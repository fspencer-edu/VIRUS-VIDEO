import {interpolate, useCurrentFrame} from "remotion";

import {CinematicCamera} from "../../../components/camera/CinematicCamera";
import {theme} from "../../../theme/theme";

const LungSilhouette = ({opacity = 1}: {opacity?: number}) => (
  <svg viewBox="0 0 380 380" width="380" height="380" style={{opacity}}>
    <path d="M184 56 C184 40 196 38 196 56 L196 168" fill="none" stroke={theme.colors.navy} strokeWidth="10" strokeLinecap="round"/>
    <path d="M196 106 C178 118 162 134 150 152" fill="none" stroke={theme.colors.navy} strokeWidth="8" strokeLinecap="round"/>
    <path d="M196 106 C214 118 230 134 242 152" fill="none" stroke={theme.colors.navy} strokeWidth="8" strokeLinecap="round"/>
    <path d="M180 168 C138 156 92 183 80 241 C68 300 92 338 142 342 C177 345 187 316 191 284 C195 251 191 205 180 168 Z" fill="#F5B5C0" stroke={theme.colors.vessel} strokeWidth="6"/>
    <path d="M200 168 C242 156 288 183 300 241 C312 300 288 338 238 342 C203 345 193 316 189 284 C185 251 189 205 200 168 Z" fill="#F5B5C0" stroke={theme.colors.vessel} strokeWidth="6"/>
    <path d="M190 174 C168 197 151 220 141 246" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity=".82"/>
    <path d="M204 174 C226 197 243 220 253 246" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity=".82"/>
  </svg>
);

const MiniVirus = ({x, y, size, opacity = 1}: {x: number; y: number; size: number; opacity?: number}) => {
  const frame = useCurrentFrame();
  const breathe = 1 + Math.sin(frame / 8 + x / 50) * 0.03;
  return (
    <svg viewBox="0 0 500 500" width={size} height={size} style={{position: "absolute", left: x, top: y, opacity, transform: `scale(${breathe})`}}>
      {Array.from({length: 16}, (_, i) => {
        const angle = (360 / 16) * i;
        const pulse = 1 + Math.sin((frame + i * 5) / 7) * 0.12;
        return (
          <g key={i} transform={`rotate(${angle} 250 250)`}>
            <line x1="250" y1="90" x2="250" y2={58 - pulse} stroke={theme.colors.violet} strokeWidth="7" strokeLinecap="round"/>
            <circle cx="250" cy="48" r={8 * pulse} fill={i % 2 === 0 ? theme.colors.coral : theme.colors.violet}/>
          </g>
        );
      })}
      <circle cx="250" cy="250" r="152" fill={theme.colors.lavender} stroke={theme.colors.violet} strokeWidth="6"/>
      <circle cx="250" cy="250" r="128" fill="#FFF8F1" opacity=".96" stroke={theme.colors.violet} strokeWidth="3"/>
      <path d="M182 208 C222 163 248 280 295 218" fill="none" stroke={theme.colors.amber} strokeWidth="10" strokeLinecap="round"/>
      <path d="M170 268 C214 220 243 316 302 260" fill="none" stroke={theme.colors.coral} strokeWidth="10" strokeLinecap="round"/>
      <path d="M200 314 C236 280 258 342 292 305" fill="none" stroke={theme.colors.sky} strokeWidth="10" strokeLinecap="round"/>
    </svg>
  );
};

export const GenomeCutawayShot = () => {
  const frame = useCurrentFrame();

  const moveProgress = interpolate(frame, [120, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(frame, [0, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lungOpacity = interpolate(frame, [105, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const virusX = 790 + moveProgress * 330;
  const virusY = 260 + moveProgress * 36;
  const virusScale = 1 - moveProgress * 0.30;

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
      <CinematicCamera
        durationInFrames={360}
        from={{x: 20, y: 0, scale: 1.0}}
        to={{x: -34, y: -8, scale: 1.06}}
        origin="56% 52%"
      >
        <div
          style={{
            position: "absolute",
            right: 160,
            top: 122,
            width: 760,
            height: 760,
            borderRadius: 38,
            background: theme.colors.white,
            border: `1px solid ${theme.colors.line}`,
            boxShadow: "0 22px 60px rgba(52,42,35,.10)",
          }}
        />

        <div style={{position: "absolute", left: virusX, top: virusY, transform: `scale(${virusScale})`, transformOrigin: "center"}}>
          <MiniVirus x={0} y={0} size={520} />
        </div>

        <div style={{position: "absolute", right: 78, top: 274, opacity: lungOpacity, transform: `translateX(${(1 - lungOpacity) * 24}px)`}}>
          <LungSilhouette opacity={lungOpacity} />
        </div>

        <div style={{position: "absolute", right: 370, top: 412, opacity: lungOpacity}}>
          {Array.from({length: 7}, (_, i) => {
            const t = i / 6;
            const left = 0 + t * 190;
            const top = Math.sin(i * 1.1) * 16;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left,
                  top,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: theme.colors.coral,
                  opacity: 0.22 + t * 0.35,
                  filter: "blur(.4px)",
                }}
              />
            );
          })}
        </div>
      </CinematicCamera>

      <div style={{position: "absolute", left: 94, top: 102, width: 600}}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(156,114,212,.11)",
            color: theme.colors.violet,
            fontFamily: theme.fonts.body,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2.2,
            textTransform: "uppercase",
            opacity: labelOpacity,
          }}
        >
          Genome and entry
        </div>

        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink, opacity: labelOpacity}}>
          The three genome segments are called S, M, and L.
        </div>

        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 27, lineHeight: 1.46, color: theme.colors.muted, opacity: labelOpacity}}>
          The surface proteins help the virus attach to human cells.
        </div>

        <div style={{marginTop: 34, display: "flex", gap: 12, opacity: labelOpacity}}>
          {["S", "M", "L"].map((part, i) => (
            <div
              key={part}
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: [theme.colors.amber, theme.colors.coral, theme.colors.sky][i],
                color: theme.colors.white,
                fontFamily: theme.fonts.body,
                fontWeight: 800,
                fontSize: 24,
                boxShadow: "0 10px 24px rgba(52,42,35,.10)",
              }}
            >
              {part}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
