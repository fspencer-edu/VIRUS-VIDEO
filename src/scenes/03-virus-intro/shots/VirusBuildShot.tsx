import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

import {CinematicCamera} from "../../../components/camera/CinematicCamera";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const LayerLabel = ({text, x1, y1, x2, y2, progress, color}: {text: string; x1: number; y1: number; x2: number; y2: number; progress: number; color: string}) => (
  <g opacity={progress}>
    <line
      x1={x1}
      y1={y1}
      x2={x1 + (x2 - x1) * progress}
      y2={y1 + (y2 - y1) * progress}
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
    <rect
      x={x2 - 8}
      y={y2 - 22}
      rx="13"
      ry="13"
      width={text.length * 11 + 28}
      height="34"
      fill="rgba(255,255,255,.96)"
      stroke={color}
      strokeWidth="2"
    />
    <text
      x={x2 + 8}
      y={y2}
      fontFamily={theme.fonts.body}
      fontSize="20"
      fontWeight="700"
      fill={theme.colors.ink}
      dominantBaseline="middle"
    >
      {text}
    </text>
  </g>
);

const VirusAssemblyGraphic = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const envelope = spring({frame: frame - 8, fps, config: {damping: 160, stiffness: 110}});
  const spikes = spring({frame: frame - 38, fps, config: {damping: 160, stiffness: 110}});
  const genome = spring({frame: frame - 74, fps, config: {damping: 160, stiffness: 110}});
  const sizeRef = spring({frame: frame - 110, fps, config: {damping: 160, stiffness: 110}});

  const spokes = Array.from({length: 18}, (_, i) => {
    const angle = (Math.PI * 2 * i) / 18;
    const x1 = 320 + Math.cos(angle) * 160;
    const y1 = 320 + Math.sin(angle) * 160;
    const x2 = 320 + Math.cos(angle) * 196;
    const y2 = 320 + Math.sin(angle) * 196;
    const tip = 7 + Math.sin((frame + i * 7) / 7) * 1.2;
    const fill = i % 2 === 0 ? theme.colors.coral : theme.colors.violet;
    return {x1, y1, x2, y2, tip, fill};
  });

  return (
    <div style={{position: "relative", width: 920, height: 720}}>
      <svg viewBox="0 0 920 720" width="920" height="720" style={{position: "absolute", inset: 0}}>
        <g transform={`translate(0 0) scale(${0.96 + Math.sin(frame / 10) * 0.01})`}>
          <circle cx="320" cy="320" r={170 * envelope} fill={theme.colors.lavender} opacity="0.5" />
          <circle cx="320" cy="320" r={170 * envelope} fill="none" stroke={theme.colors.violet} strokeWidth="8" opacity={envelope} />
          <circle cx="320" cy="320" r={142 * envelope} fill="#F7F0FF" stroke={theme.colors.violet} strokeWidth="3" opacity={envelope} />

          {spokes.map((spoke, i) => (
            <g key={i} opacity={spikes}>
              <line x1={spoke.x1} y1={spoke.y1} x2={spoke.x2} y2={spoke.y2} stroke={theme.colors.violet} strokeWidth="7" strokeLinecap="round" />
              <circle cx={spoke.x2} cy={spoke.y2} r={spoke.tip * spikes} fill={spoke.fill} />
            </g>
          ))}

          <path d="M240 284 C290 220 335 352 389 268" fill="none" stroke={theme.colors.amber} strokeWidth="12" strokeLinecap="round" opacity={genome} />
          <path d="M226 342 C285 280 330 400 402 330" fill="none" stroke={theme.colors.coral} strokeWidth="12" strokeLinecap="round" opacity={genome} />
          <path d="M262 396 C302 350 344 430 389 384" fill="none" stroke={theme.colors.sky} strokeWidth="12" strokeLinecap="round" opacity={genome} />

          <text x="397" y="258" fontFamily={theme.fonts.body} fontSize="25" fontWeight="700" fill={theme.colors.ink} opacity={genome}>S</text>
          <text x="412" y="332" fontFamily={theme.fonts.body} fontSize="25" fontWeight="700" fill={theme.colors.ink} opacity={genome}>M</text>
          <text x="398" y="390" fontFamily={theme.fonts.body} fontSize="25" fontWeight="700" fill={theme.colors.ink} opacity={genome}>L</text>
        </g>

        <LayerLabel text="Envelope" x1={440} y1={210} x2={560} y2={150} progress={envelope} color={theme.colors.violet} />
        <LayerLabel text="Gn / Gc proteins" x1={485} y1={110} x2={600} y2={85} progress={spikes} color={theme.colors.coral} />
        <LayerLabel text="RNA segments" x1={448} y1={345} x2={585} y2={370} progress={genome} color={theme.colors.sky} />

        <g opacity={sizeRef}>
          <line x1="590" y1="575" x2="760" y2="575" stroke={theme.colors.ink} strokeWidth="4" strokeLinecap="round" />
          <line x1="590" y1="560" x2="590" y2="592" stroke={theme.colors.ink} strokeWidth="4" strokeLinecap="round" />
          <line x1="760" y1="560" x2="760" y2="592" stroke={theme.colors.ink} strokeWidth="4" strokeLinecap="round" />
          <text x="675" y="605" textAnchor="middle" fontFamily={theme.fonts.body} fontSize="22" fontWeight="700" fill={theme.colors.ink}>
            approximately 100 nm
          </text>
        </g>
      </svg>
    </div>
  );
};

export const VirusBuildShot = () => {
  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
      <CinematicCamera
        durationInFrames={330}
        from={{x: 35, y: 10, scale: 1.0}}
        to={{x: -50, y: -10, scale: 1.10}}
        origin="61% 51%"
      >
        <div
          style={{
            position: "absolute",
            right: 80,
            top: 90,
            width: 980,
            height: 760,
            borderRadius: 42,
            background: theme.colors.white,
            border: `1px solid ${theme.colors.line}`,
            boxShadow: "0 22px 65px rgba(52,42,35,.10)",
            overflow: "hidden",
          }}
        >
          <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(156,114,212,.08), rgba(255,255,255,0))"}} />
          <div style={{position: "absolute", left: 12, top: 18, transform: "scale(.92)", transformOrigin: "top left"}}>
            <VirusAssemblyGraphic />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 155,
            top: 120,
            width: 175,
            height: 175,
            borderRadius: 28,
            overflow: "hidden",
            opacity: 0.92,
            boxShadow: "0 16px 40px rgba(45,36,30,.10)",
            border: `1px solid ${theme.colors.line}`,
            background: theme.colors.white,
          }}
        >
          <EditorialAsset
            asset={ASSETS.virus.crossSection}
            width={175}
            height={175}
            zoom={1.02}
            organic={false}
            showCredit={false}
          />
        </div>
      </CinematicCamera>

      <div style={{position: "absolute", left: 92, top: 108, width: 620}}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(233,111,106,.11)",
            color: theme.colors.coralDark,
            fontFamily: theme.fonts.body,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2.2,
            textTransform: "uppercase",
          }}
        >
          Virus structure
        </div>

        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 60, lineHeight: 1.04, color: theme.colors.ink}}>
          Andes virus can be built up in simple layers.
        </div>

        <div style={{marginTop: 20, fontFamily: theme.fonts.body, fontSize: 27, lineHeight: 1.48, color: theme.colors.muted}}>
          First the envelope, then the Gn and Gc surface proteins, and finally the three RNA strands labeled S, M, and L.
        </div>
      </div>
    </div>
  );
};
