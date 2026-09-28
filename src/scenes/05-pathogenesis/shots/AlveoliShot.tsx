import {interpolate, useCurrentFrame} from "remotion";

import {theme} from "../../../theme/theme";

const AlveolusZoomGraphic = ({progress = 0}: {progress?: number}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 18) * 0.02;

  return (
    <svg viewBox="0 0 1080 760" width="1080" height="760" style={{overflow: "visible"}}>
      <defs>
        <linearGradient id="lungTint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5ABB5" />
          <stop offset="100%" stopColor="#F18E9D" />
        </linearGradient>
      </defs>

      <g opacity={1 - progress * 0.78} transform={`translate(170 70) scale(${1 - progress * 0.18})`}>
        <path d="M380 68 L380 154" stroke={theme.colors.navy} strokeWidth="20" strokeLinecap="round" />
        <path d="M380 144 C320 168 278 214 245 270" stroke={theme.colors.navy} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M380 144 C440 168 482 214 515 270" stroke={theme.colors.navy} strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M352 110 C264 116 178 190 147 305 C116 422 177 488 286 464 C338 452 360 401 360 328 L360 150 C360 127 364 111 352 110 Z" fill="url(#lungTint)" stroke={theme.colors.coralDark} strokeWidth="5" />
        <path d="M408 110 C496 116 582 190 613 305 C644 422 583 488 474 464 C422 452 400 401 400 328 L400 150 C400 127 396 111 408 110 Z" fill="url(#lungTint)" stroke={theme.colors.coralDark} strokeWidth="5" />
        <circle cx="255" cy="322" r="42" fill="none" stroke={theme.colors.tealDark} strokeWidth="4" strokeDasharray="8 10" />
        <path d="M297 318 C372 345 442 366 564 420" fill="none" stroke={theme.colors.tealDark} strokeWidth="4" strokeDasharray="8 10" />
      </g>

      <g transform={`translate(${70 - progress * 18} ${95 - progress * 20}) scale(${0.94 + progress * 0.14})`}>
        <g transform={`translate(455 284) scale(${pulse}) translate(-455 -284)`}>
          <circle cx="340" cy="256" r="125" fill="#FFE4E4" stroke={theme.colors.coralDark} strokeWidth="5" />
          <circle cx="505" cy="240" r="118" fill="#FFE8E8" stroke={theme.colors.coralDark} strokeWidth="5" />
          <circle cx="417" cy="378" r="118" fill="#FFE1E2" stroke={theme.colors.coralDark} strokeWidth="5" />
        </g>

        <path d="M80 505 C170 338 334 546 474 370 C592 222 752 258 900 430" fill="none" stroke={theme.colors.vessel} strokeWidth="54" strokeLinecap="round" />
        <path d="M80 505 C170 338 334 546 474 370 C592 222 752 258 900 430" fill="none" stroke="#9C383F" strokeWidth="4" strokeLinecap="round" />

        {Array.from({length: 13}, (_, i) => {
          const t = ((frame * 2.2 + i * 65) % 760) / 760;
          const x = 92 + t * 790;
          const y = 470 - Math.sin(t * Math.PI * 3.2) * 110;
          return <ellipse key={i} cx={x} cy={y} rx="16" ry="10" fill="#BE3A42" opacity=".92" />;
        })}

        {Array.from({length: 14}, (_, i) => {
          const x = 310 + (i % 4) * 72 + Math.sin(frame / 22 + i) * 2;
          const y = 180 + Math.floor(i / 4) * 34;
          return <circle key={i} cx={x} cy={y} r="7" fill={theme.colors.oxygen} opacity={0.8} />;
        })}

        <circle cx="596" cy="268" r="58" fill="none" stroke={theme.colors.amber} strokeWidth="4" strokeDasharray="8 10" opacity={0.8} />
        <text x="650" y="250" fontFamily={theme.fonts.body} fontSize="26" fontWeight="700" fill={theme.colors.ink}>Endothelial cell</text>
        <text x="650" y="284" fontFamily={theme.fonts.body} fontSize="24" fill={theme.colors.muted}>Tiny blood vessel wall beside the alveolus</text>
      </g>
    </svg>
  );
};

export const AlveoliShot = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 94, top: 106, width: 560}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Zooming deeper reveals the alveolus and its neighboring capillary.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.47, color: theme.colors.muted}}>
          This is where oxygen normally crosses into the bloodstream, and where vascular damage begins to matter.
        </div>
      </div>

      <div style={{position: "absolute", left: 690, top: 86, width: 1140, height: 840, borderRadius: 42, border: `1px solid ${theme.colors.line}`, background: "rgba(255,255,255,.84)", boxShadow: "0 24px 60px rgba(54,40,30,.10)", overflow: "hidden"}}>
        <AlveolusZoomGraphic progress={progress} />
      </div>
    </div>
  );
};
