import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {IllustratedPerson} from "../../../components/characters/IllustratedPerson";
import {AnimatedRoute} from "../../../components/visuals/AnimatedRoute";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const travelPath = "M 656 664 C 785 503 939 377 1106 278 C 1230 205 1375 164 1544 196";

const HospitalCard = ({reveal = 1}: {reveal?: number}) => (
  <div
    style={{
      position: "absolute",
      right: 88,
      bottom: 68,
      width: 430,
      height: 272,
      borderRadius: 28,
      background: "rgba(255,255,255,.96)",
      border: `1px solid ${theme.colors.line}`,
      boxShadow: "0 18px 42px rgba(52,42,35,.10)",
      overflow: "hidden",
      opacity: reveal,
      transform: `translateY(${(1 - reveal) * 18}px) scale(${0.96 + reveal * 0.04})`,
    }}
  >
    <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, #F7FBFF 0%, #F3F7FB 100%)"}} />
    <div style={{position: "absolute", left: 24, top: 20, fontFamily: theme.fonts.body, fontSize: 17, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: theme.colors.coralDark}}>
      British Columbia response
    </div>

    <div style={{position: "absolute", left: 28, top: 78, width: 126, height: 126, borderRadius: 20, background: "#EAF2FA", border: `1px solid ${theme.colors.line}`}}>
      <svg viewBox="0 0 128 128" width="126" height="126">
        <rect x="31" y="25" width="66" height="78" rx="10" fill="#FFFFFF" stroke={theme.colors.sky} strokeWidth="4" />
        <path d="M57 39 H71 V56 H88 V70 H71 V87 H57 V70 H40 V56 H57 Z" fill={theme.colors.coral} />
      </svg>
    </div>

    <div style={{position: "absolute", left: 176, top: 72}}>
      <IllustratedPerson asset={ASSETS.characters.passengerA} width={112} sick={0.7} />
    </div>
    <div style={{position: "absolute", left: 280, top: 70}}>
      <IllustratedPerson asset={ASSETS.characters.ppeWorker} width={116} />
    </div>

    <div style={{position: "absolute", left: 174, top: 188, width: 214, fontFamily: theme.fonts.body, fontSize: 22, lineHeight: 1.3, color: theme.colors.ink}}>
      Passenger enters hospital isolation and clinical assessment.
    </div>
  </div>
);

export const TravelIsolationShot = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const bcReveal = spring({frame: frame - 128, fps, config: {damping: 180, stiffness: 110}});
  const pulse = 0.65 + Math.sin(frame / 11) * 0.18;
  const isoReveal = interpolate(frame, [180, 265], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 92, top: 84, width: 760}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Travel created a pathway from the ship to Canada.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.45, color: theme.colors.muted}}>
          The outbreak is still linked to travelers, not widespread community transmission. British Columbia becomes the focal point of the Canadian response.
        </div>
      </div>

      <div style={{position: "absolute", left: 110, bottom: 92, width: 362, height: 228, borderRadius: 30, overflow: "hidden", boxShadow: "0 16px 38px rgba(42,50,64,.16)"}}>
        <EditorialAsset asset={ASSETS.outbreak.shipResponse} width={362} height={228} zoom={1.08} showCredit={false} organic={false} />
      </div>

      <div style={{position: "absolute", left: 520, top: 154, width: 540, height: 540, borderRadius: 32, overflow: "hidden", background: "rgba(255,255,255,.88)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 16px 40px rgba(52,42,35,.08)"}}>
        <EditorialAsset asset={ASSETS.canada.southAmericaMap} width={540} height={540} zoom={1} showCredit />
        <div style={{position: "absolute", left: 24, top: 18, padding: "8px 12px", borderRadius: 999, background: "rgba(255,255,255,.94)", border: `1px solid ${theme.colors.line}`, fontFamily: theme.fonts.body, fontSize: 16, fontWeight: 700}}>South America</div>
      </div>

      <div style={{position: "absolute", right: 146, top: 152, width: 432, height: 432, borderRadius: 32, overflow: "hidden", background: "rgba(255,255,255,.88)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 16px 40px rgba(52,42,35,.08)"}}>
        <EditorialAsset asset={ASSETS.canada.bcMap} width={432} height={432} zoom={1} showCredit />
        <div style={{position: "absolute", left: 24, top: 18, padding: "8px 12px", borderRadius: 999, background: "rgba(255,255,255,.94)", border: `1px solid ${theme.colors.line}`, fontFamily: theme.fonts.body, fontSize: 16, fontWeight: 700}}>British Columbia</div>
        {bcReveal > 0.02 ? (
          <>
            <div style={{position: "absolute", left: 204, top: 136, width: 18, height: 18, borderRadius: "50%", background: theme.colors.coralDark, boxShadow: `0 0 0 ${16 * pulse}px rgba(185,76,74,.18)`}} />
            <div style={{position: "absolute", left: 146, top: 168, padding: "8px 12px", borderRadius: 14, background: "rgba(255,255,255,.94)", border: `1px solid ${theme.colors.coral}`, fontFamily: theme.fonts.body, fontSize: 16, fontWeight: 700, color: theme.colors.coralDark, opacity: bcReveal}}>
              Isolation in hospital
            </div>
          </>
        ) : null}
      </div>

      <AnimatedRoute
        d={travelPath}
        viewBox="0 0 1920 1080"
        width={1920}
        height={1080}
        startFrame={20}
        endFrame={170}
        stroke={theme.colors.coral}
        strokeWidth={7}
        followerRadius={11}
        followerColor={theme.colors.tealDark}
      />

      <HospitalCard reveal={isoReveal} />
    </div>
  );
};
