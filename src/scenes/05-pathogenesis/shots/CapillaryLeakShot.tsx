import {interpolate, useCurrentFrame} from "remotion";

import {theme} from "../../../theme/theme";

const LeakSystem = ({leak = 0}: {leak?: number}) => {
  const frame = useCurrentFrame();
  return (
    <svg viewBox="0 0 1040 720" width="1040" height="720" style={{overflow: "visible"}}>
      <defs>
        <linearGradient id="alvGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE8E8" />
          <stop offset="100%" stopColor="#FFDCDC" />
        </linearGradient>
      </defs>

      <circle cx="315" cy="260" r="122" fill="url(#alvGrad)" stroke={theme.colors.coralDark} strokeWidth="5" />
      <circle cx="486" cy="238" r="118" fill="url(#alvGrad)" stroke={theme.colors.coralDark} strokeWidth="5" />
      <circle cx="402" cy="392" r="118" fill="url(#alvGrad)" stroke={theme.colors.coralDark} strokeWidth="5" />

      <path d="M82 526 C196 352 330 566 486 396 C614 256 784 286 940 466" fill="none" stroke={theme.colors.vessel} strokeWidth="58" strokeLinecap="round" />
      <path d="M82 526 C196 352 330 566 486 396 C614 256 784 286 940 466" fill="none" stroke="#983138" strokeWidth="4" strokeLinecap="round" />

      {Array.from({length: 12}, (_, i) => {
        const t = ((frame * 2.15 + i * 70) % 800) / 800;
        const x = 94 + t * 810;
        const y = 490 - Math.sin(t * Math.PI * 3.2) * 116;
        return <ellipse key={i} cx={x} cy={y} rx="16" ry="10" fill="#BE3A42" opacity=".92" />;
      })}

      {Array.from({length: 6}, (_, i) => {
        const gapOpen = leak * 22;
        const x = 565 + i * 28;
        const y = 302 + i * 16;
        return <rect key={i} x={x} y={y} width={7 + gapOpen * 0.35} height={24 + gapOpen * 0.5} rx="5" fill="#F8F3EB" opacity={0.24 + leak * 0.76} />;
      })}

      {Array.from({length: 24}, (_, i) => {
        const drift = ((frame * (1.2 + (i % 4) * 0.14) + i * 18) % 150) / 150;
        const x = 606 + (i % 4) * 16 + Math.sin(frame / 10 + i) * 8;
        const y = 320 + drift * 170 + (i % 3) * 9;
        return <circle key={i} cx={x} cy={y} r={5 + (i % 3)} fill={theme.colors.fluid} opacity={leak * (0.16 + (i % 4) * 0.09)} />;
      })}

      {Array.from({length: 18}, (_, i) => {
        const x = 286 + (i % 5) * 48;
        const y = 186 + Math.floor(i / 5) * 35;
        const alpha = Math.max(0.08, 0.86 - leak * 0.72);
        return <circle key={i} cx={x} cy={y} r="7" fill={theme.colors.oxygen} opacity={alpha} />;
      })}

      {Array.from({length: 16}, (_, i) => {
        const x = 308 + (i % 4) * 55;
        const y = 330 + Math.floor(i / 4) * 36;
        return <circle key={i} cx={x} cy={y} r={5 + (i % 2)} fill={theme.colors.fluid} opacity={leak * 0.6} />;
      })}

      <text x="642" y="250" fontFamily={theme.fonts.body} fontSize="24" fontWeight="700" fill={theme.colors.ink}>More permeable vessel wall</text>
      <text x="642" y="278" fontFamily={theme.fonts.body} fontSize="20" fill={theme.colors.muted}>Fluid leaks into lung tissue and the alveolar space</text>
      <text x="238" y="126" fontFamily={theme.fonts.body} fontSize="24" fontWeight="700" fill={theme.colors.ink}>Less oxygen crossing into blood</text>
    </svg>
  );
};

const LungsComparison = ({progress = 0}: {progress?: number}) => (
  <svg viewBox="0 0 560 420" width="560" height="420">
    <text x="34" y="30" fontFamily={theme.fonts.body} fontSize="22" fontWeight="700" fill={theme.colors.ink}>Progression</text>
    <text x="34" y="58" fontFamily={theme.fonts.body} fontSize="18" fill={theme.colors.muted}>Normal lung → fluid-filled lung</text>

    <g transform="translate(34 92)">
      <path d="M120 12 L120 70" stroke={theme.colors.navy} strokeWidth="14" strokeLinecap="round" />
      <path d="M120 62 C95 70 80 88 68 110" fill="none" stroke={theme.colors.navy} strokeWidth="10" strokeLinecap="round" />
      <path d="M120 62 C145 70 160 88 172 110" fill="none" stroke={theme.colors.navy} strokeWidth="10" strokeLinecap="round" />
      <path d="M107 26 C60 30 20 74 10 140 C0 206 36 244 94 232 C115 228 120 200 120 164 L120 62 C120 42 117 28 107 26 Z" fill={theme.colors.lung} stroke={theme.colors.coralDark} strokeWidth="4" />
      <path d="M133 26 C180 30 220 74 230 140 C240 206 204 244 146 232 C125 228 120 200 120 164 L120 62 C120 42 123 28 133 26 Z" fill={theme.colors.lung} stroke={theme.colors.coralDark} strokeWidth="4" />
      <text x="74" y="278" fontFamily={theme.fonts.body} fontSize="20" fill={theme.colors.ink}>Normal</text>
    </g>

    <g transform={`translate(${310 + progress * 18} 92)`} opacity={0.45 + progress * 0.55}>
      <path d="M120 12 L120 70" stroke={theme.colors.navy} strokeWidth="14" strokeLinecap="round" />
      <path d="M120 62 C95 70 80 88 68 110" fill="none" stroke={theme.colors.navy} strokeWidth="10" strokeLinecap="round" />
      <path d="M120 62 C145 70 160 88 172 110" fill="none" stroke={theme.colors.navy} strokeWidth="10" strokeLinecap="round" />
      <path d="M107 26 C60 30 20 74 10 140 C0 206 36 244 94 232 C115 228 120 200 120 164 L120 62 C120 42 117 28 107 26 Z" fill={theme.colors.lung} stroke={theme.colors.coralDark} strokeWidth="4" />
      <path d="M133 26 C180 30 220 74 230 140 C240 206 204 244 146 232 C125 228 120 200 120 164 L120 62 C120 42 123 28 133 26 Z" fill={theme.colors.lung} stroke={theme.colors.coralDark} strokeWidth="4" />
      <path d={`M12 ${194 - progress * 28} C44 ${172 - progress * 10} 92 ${192 - progress * 16} 120 ${174 - progress * 24} L120 232 C62 250 26 226 12 ${194 - progress * 28} Z`} fill={theme.colors.fluid} opacity={0.18 + progress * 0.58} />
      <path d={`M120 ${174 - progress * 24} C150 ${190 - progress * 16} 192 ${172 - progress * 10} 228 ${194 - progress * 28} C214 228 178 250 120 232 Z`} fill={theme.colors.fluid} opacity={0.18 + progress * 0.58} />
      <text x="44" y="278" fontFamily={theme.fonts.body} fontSize="20" fill={theme.colors.ink}>Fluid-filled</text>
    </g>

    <path d="M245 186 L304 186" fill="none" stroke={theme.colors.coralDark} strokeWidth="4" markerEnd="url(#arrow)" />
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" fill={theme.colors.coralDark} />
      </marker>
    </defs>
  </svg>
);

export const CapillaryLeakShot = () => {
  const frame = useCurrentFrame();
  const leak = interpolate(frame, [10, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 92, top: 90, width: 620}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Leaky vessels allow fluid into the lungs and reduce oxygen exchange.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.48, color: theme.colors.muted}}>
          As the endothelial barrier becomes more permeable, fluid accumulates around the alveoli. Oxygen movement drops, and the lungs shift from functioning normally to becoming fluid-filled.
        </div>
      </div>

      <div style={{position: "absolute", left: 666, top: 90, width: 1188, height: 864, borderRadius: 42, border: `1px solid ${theme.colors.line}`, background: "rgba(255,255,255,.84)", boxShadow: "0 24px 60px rgba(54,40,30,.10)", overflow: "hidden"}}>
        <div style={{position: "absolute", left: 22, top: 44}}>
          <LeakSystem leak={leak} />
        </div>
        <div style={{position: "absolute", right: 24, bottom: 18}}>
          <LungsComparison progress={leak} />
        </div>
      </div>
    </div>
  );
};
