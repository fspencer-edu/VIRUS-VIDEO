import {interpolate, useCurrentFrame} from "remotion";

import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const BodySilhouette = ({focus = 0}: {focus?: number}) => (
  <svg viewBox="0 0 540 700" width="540" height="700" style={{overflow: "visible"}}>
    <defs>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F3E6D8" />
        <stop offset="100%" stopColor="#E7D4C2" />
      </linearGradient>
    </defs>

    <circle cx="270" cy="90" r="56" fill="url(#bodyGrad)" stroke={theme.colors.navy} strokeWidth="5" />
    <path
      d="M204 160 C172 184 152 231 152 304 L152 515 C152 565 186 606 236 624 L245 676 L295 676 L304 624 C354 606 388 565 388 515 L388 304 C388 231 368 184 336 160 Z"
      fill="url(#bodyGrad)"
      stroke={theme.colors.navy}
      strokeWidth="5"
    />
    <path d="M152 260 C114 282 82 330 74 402" fill="none" stroke={theme.colors.navy} strokeWidth="20" strokeLinecap="round" />
    <path d="M388 260 C426 282 458 330 466 402" fill="none" stroke={theme.colors.navy} strokeWidth="20" strokeLinecap="round" />
    <path d="M202 676 C190 618 174 582 160 544" fill="none" stroke={theme.colors.navy} strokeWidth="22" strokeLinecap="round" />
    <path d="M338 676 C350 618 366 582 380 544" fill="none" stroke={theme.colors.navy} strokeWidth="22" strokeLinecap="round" />

    <path d="M270 170 L270 250" stroke={theme.colors.navy} strokeWidth="16" strokeLinecap="round" />
    <path d="M270 238 C240 248 220 274 200 318" fill="none" stroke={theme.colors.navy} strokeWidth="12" strokeLinecap="round" />
    <path d="M270 238 C300 248 320 274 340 318" fill="none" stroke={theme.colors.navy} strokeWidth="12" strokeLinecap="round" />

    <path
      d="M248 212 C190 218 154 266 150 338 C145 432 196 497 252 487 C274 483 286 451 286 394 L286 235 C286 222 277 213 248 212 Z"
      fill={theme.colors.lung}
      stroke={theme.colors.coralDark}
      strokeWidth="5"
    />
    <path
      d="M292 212 C350 218 386 266 390 338 C395 432 344 497 288 487 C266 483 254 451 254 394 L254 235 C254 222 263 213 292 212 Z"
      fill={theme.colors.lung}
      stroke={theme.colors.coralDark}
      strokeWidth="5"
    />

    <ellipse cx="246" cy="360" rx="24" ry="82" fill="rgba(255,255,255,.08)" opacity={0.18 + focus * 0.22} />
    <ellipse cx="294" cy="360" rx="24" ry="82" fill="rgba(255,255,255,.08)" opacity={0.18 + focus * 0.22} />

    <circle cx="270" cy="350" r={60 + focus * 70} fill="none" stroke={theme.colors.coral} strokeWidth="3" opacity={0.35 + focus * 0.25} strokeDasharray="10 12" />
    <circle cx="270" cy="350" r={95 + focus * 105} fill="none" stroke={theme.colors.violet} strokeWidth="2" opacity={0.18 + focus * 0.22} />
  </svg>
);

export const AirwayAndLungsShot = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const shipFade = interpolate(frame, [0, 90, 160], [1, 1, 0.16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", inset: 0, background: "radial-gradient(circle at 78% 32%, rgba(101,167,232,.10) 0%, transparent 22%), radial-gradient(circle at 72% 58%, rgba(233,111,106,.08) 0%, transparent 24%)"}} />

      <div style={{position: "absolute", left: 92, top: 92, width: 620}}>
        <div style={{display: "inline-block", padding: "10px 16px", borderRadius: 999, background: "rgba(53,166,161,.12)", color: theme.colors.tealDark, fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 2.1, textTransform: "uppercase"}}>
          Inside the body
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          The story moves from the ship into the lungs.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.48, color: theme.colors.muted}}>
          After exposure, the virus targets the lungs, where damage to tiny blood vessels can make breathing much harder.
        </div>
      </div>

      <div style={{position: "absolute", left: 820, top: 94, width: 980, height: 850, borderRadius: 42, border: `1px solid ${theme.colors.line}`, background: "rgba(255,255,255,.84)", boxShadow: "0 26px 64px rgba(56,43,33,.10)", overflow: "hidden"}}>
        <div style={{position: "absolute", left: 52, top: 56, width: 260, height: 170, borderRadius: 28, overflow: "hidden", opacity: shipFade, boxShadow: "0 16px 34px rgba(49,58,74,.14)"}}>
          <EditorialAsset asset={ASSETS.outbreak.shipResponse} width={260} height={170} zoom={1.1} objectPosition="center" organic={false} showCredit={false} />
        </div>

        <svg viewBox="0 0 980 850" width="980" height="850" style={{position: "absolute", inset: 0}}>
          <path d="M316 148 C430 188 474 228 520 320" fill="none" stroke={theme.colors.coral} strokeWidth="4" strokeDasharray="10 12" opacity={shipFade} />
          <circle cx="315" cy="149" r="8" fill={theme.colors.coral} opacity={shipFade} />
          <circle cx="520" cy="320" r={12 + zoom * 4} fill={theme.colors.coral} opacity={0.5 + zoom * 0.25} />
        </svg>

        <div
          style={{
            position: "absolute",
            left: 322,
            top: 74,
            transform: `translate(${interpolate(frame, [0, 210], [0, -40], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px, ${interpolate(frame, [0, 210], [0, -42], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px) scale(${0.78 + zoom * 0.62})`,
            transformOrigin: "center center",
          }}
        >
          <BodySilhouette focus={zoom} />
        </div>

        <div style={{position: "absolute", right: 64, bottom: 56, width: 260, padding: "14px 16px", borderRadius: 20, background: "rgba(255,255,255,.92)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 12px 24px rgba(44,36,30,.06)"}}>
          <div style={{fontFamily: theme.fonts.body, fontSize: 16, fontWeight: 800, letterSpacing: 1.1, textTransform: "uppercase", color: theme.colors.coralDark}}>Focus</div>
          <div style={{marginTop: 8, fontFamily: theme.fonts.body, fontSize: 22, lineHeight: 1.35, color: theme.colors.ink}}>Lung tissue and the tiny blood vessels beside each alveolus.</div>
        </div>
      </div>
    </div>
  );
};
