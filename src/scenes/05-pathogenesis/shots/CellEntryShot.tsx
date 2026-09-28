import {interpolate, useCurrentFrame} from "remotion";

import {theme} from "../../../theme/theme";

const VirusEntryGraphic = () => {
  const frame = useCurrentFrame();
  const attach = interpolate(frame, [0, 70], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const wrap = interpolate(frame, [70, 170], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const acid = interpolate(frame, [170, 260], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const fusion = interpolate(frame, [260, 370], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  const virusX = 160 + attach * 170 + wrap * 145;
  const virusY = 250 + wrap * 44;
  const endosomeR = 58 * wrap;

  const spikeLength = 18 + fusion * 18;
  const acidBg = `rgba(233,111,106,${0.10 + acid * 0.22})`;

  return (
    <svg viewBox="0 0 980 640" width="980" height="640" style={{overflow: "visible"}}>
      <defs>
        <linearGradient id="endoGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={acid < 0.45 ? "#E8F0FB" : "#F7D6CC"} />
          <stop offset="100%" stopColor={acid < 0.45 ? "#D9E7F7" : "#F2B2A3"} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="980" height="640" rx="36" fill="rgba(255,255,255,.65)" />

      <path d="M44 322 C230 255 400 406 595 300 C760 211 854 238 948 206" fill="none" stroke="rgba(53,166,161,.36)" strokeWidth="82" strokeLinecap="round" />
      <path d="M44 322 C230 255 400 406 595 300 C760 211 854 238 948 206" fill="none" stroke={theme.colors.tealDark} strokeWidth="5" strokeLinecap="round" opacity="0.58" />
      <text x="56" y="118" fontFamily={theme.fonts.body} fontSize="26" fontWeight="700" fill={theme.colors.ink}>Endothelial cell surface</text>

      <g transform={`translate(${virusX} ${virusY})`}>
        <circle cx="0" cy="0" r="42" fill="#9C72D4" stroke="#6B54A0" strokeWidth="5" />
        <circle cx="0" cy="0" r="27" fill="#EFE8FF" opacity="0.85" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          const x1 = Math.cos(r) * 42;
          const y1 = Math.sin(r) * 42;
          const x2 = Math.cos(r) * (42 + spikeLength);
          const y2 = Math.sin(r) * (42 + spikeLength);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={theme.colors.coralDark} strokeWidth="5" strokeLinecap="round" />
              <circle cx={x2} cy={y2} r="6" fill={theme.colors.coral} />
            </g>
          );
        })}
        {fusion > 0.76 ? (
          <>
            <path d="M-8 -12 C6 -25 19 -8 26 -20" fill="none" stroke={theme.colors.amber} strokeWidth="4" strokeLinecap="round" />
            <path d="M-8 6 C6 -7 18 14 28 4" fill="none" stroke={theme.colors.amber} strokeWidth="4" strokeLinecap="round" />
            <path d="M-15 20 C0 8 20 30 36 18" fill="none" stroke={theme.colors.amber} strokeWidth="4" strokeLinecap="round" />
          </>
        ) : null}
      </g>

      {attach > 0.2 ? (
        <>
          <line x1={virusX + 54} y1={virusY - 64} x2={virusX + 135} y2={virusY - 124} stroke={theme.colors.coralDark} strokeWidth="3" />
          <text x={virusX + 144} y={virusY - 126} fontFamily={theme.fonts.body} fontSize="24" fontWeight="700" fill={theme.colors.ink}>Gn / Gc proteins</text>
        </>
      ) : null}

      <path
        d={`M430 240 C460 ${240 - wrap * 48} 500 ${245 - wrap * 55} 540 ${264 - wrap * 22} C570 ${278 - wrap * 8} 602 ${320 + wrap * 28} 618 ${344 + wrap * 48}`}
        fill="none"
        stroke={theme.colors.tealDark}
        strokeWidth={10}
        strokeLinecap="round"
      />
      <path
        d={`M615 344 C604 ${360 + wrap * 30} 598 ${382 + wrap * 26} 570 ${394 + wrap * 10} C538 ${408 + wrap * 4} 486 ${392 + wrap * 12} 452 ${360 + wrap * 18}`}
        fill="none"
        stroke={theme.colors.tealDark}
        strokeWidth={10}
        strokeLinecap="round"
      />

      {wrap > 0.06 ? <circle cx={620} cy={350} r={endosomeR} fill={acidBg} stroke={theme.colors.violet} strokeWidth={4} opacity={wrap} /> : null}
      {wrap > 0.18 ? <circle cx={620} cy={350} r={endosomeR * 0.72} fill="url(#endoGrad)" opacity={0.82} /> : null}

      {acid > 0.08 ? (
        <>
          <text x="678" y="420" fontFamily={theme.fonts.body} fontSize="22" fontWeight="700" fill={theme.colors.ink}>Endosome acidifies</text>
          <text x="678" y="448" fontFamily={theme.fonts.body} fontSize="20" fill={theme.colors.muted}>Lower pH triggers a shape change in viral proteins</text>
        </>
      ) : null}

      {fusion > 0.1 ? (
        <>
          <path d={`M621 350 C650 ${332 - fusion * 32} 706 ${332 - fusion * 20} 760 ${312 - fusion * 8}`} fill="none" stroke={theme.colors.amber} strokeWidth={8 * fusion} strokeLinecap="round" />
          <circle cx={762} cy={311} r={10 * fusion} fill={theme.colors.amber} opacity={fusion} />
          <text x="706" y="274" fontFamily={theme.fonts.body} fontSize="22" fontWeight="700" fill={theme.colors.ink}>Membrane fusion</text>
        </>
      ) : null}
    </svg>
  );
};

export const CellEntryShot = () => (
  <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
    <div style={{position: "absolute", left: 92, top: 96, width: 540}}>
      <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
        The virus attaches, gets pulled inside, and fuses with the endosome.
      </div>
      <div style={{marginTop: 20, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.48, color: theme.colors.muted}}>
        Andes virus uses its Gn and Gc proteins to attach to the endothelial cell surface. The membrane folds around it, acidity rises, and fusion releases the viral contents into the cell.
      </div>
    </div>

    <div style={{position: "absolute", left: 690, top: 160, width: 1040, height: 650, borderRadius: 42, border: `1px solid ${theme.colors.line}`, background: "rgba(255,255,255,.84)", boxShadow: "0 24px 60px rgba(54,40,30,.10)", overflow: "hidden"}}>
      <VirusEntryGraphic />
    </div>
  </div>
);
