import {interpolate, useCurrentFrame} from "remotion";

import {IllustratedPerson} from "../../../components/characters/IllustratedPerson";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const PanelTitle = ({text, color}: {text: string; color: string}) => (
  <div
    style={{
      display: "inline-block",
      padding: "9px 15px",
      borderRadius: 999,
      background: "rgba(255,255,255,.9)",
      border: `1px solid ${color}`,
      color,
      fontFamily: theme.fonts.body,
      fontSize: 17,
      fontWeight: 800,
      letterSpacing: 1.6,
      textTransform: "uppercase",
      boxShadow: "0 8px 18px rgba(52,42,35,.06)",
    }}
  >
    {text}
  </div>
);

const ParticleBridge = ({fromX, fromY, toX, toY, active = 1, count = 18}: {fromX: number; fromY: number; toX: number; toY: number; active?: number; count?: number}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({length: count}, (_, i) => {
        const t = ((frame * (1.1 + (i % 4) * 0.16) + i * 14) % 140) / 140;
        const x = fromX + (toX - fromX) * t + Math.sin(frame / 9 + i) * 9;
        const y = fromY + (toY - fromY) * t + Math.cos(frame / 8 + i * 0.4) * 9;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 7 + (i % 3) * 2,
              height: 7 + (i % 3) * 2,
              borderRadius: "50%",
              background: i % 2 === 0 ? theme.colors.coral : theme.colors.violet,
              opacity: (0.22 + (i % 4) * 0.1) * active,
              filter: `blur(${(i % 2) * 0.6}px)`,
            }}
          />
        );
      })}
    </>
  );
};

export const HumanToHumanShot = () => {
  const frame = useCurrentFrame();
  const splitReveal = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightReveal = interpolate(frame, [54, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 94, top: 88, width: 680}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 56, lineHeight: 1.04, color: theme.colors.ink}}>
          Most spread is rodent-to-human, but Andes virus can rarely spread between people.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 86,
          top: 240,
          width: 820,
          height: 610,
          borderRadius: 34,
          background: theme.colors.white,
          border: `1px solid ${theme.colors.line}`,
          boxShadow: "0 22px 60px rgba(52,42,35,.10)",
          overflow: "hidden",
          opacity: splitReveal,
          transform: `translateY(${(1 - splitReveal) * 10}px)`,
        }}
      >
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, #F1E6D9 0 70%, #DCD0C1 70% 100%)"}} />
        <div style={{position: "absolute", left: 28, top: 22}}><PanelTitle text="Rodent to human" color={theme.colors.tealDark} /></div>
        <div style={{position: "absolute", left: 66, top: 325, width: 210, height: 150}}>
          <EditorialAsset asset={ASSETS.transmission.cartoonRatCutout} width={210} height={150} zoom={1} showCredit={false} />
        </div>
        <div style={{position: "absolute", right: 74, top: 220}}>
          <IllustratedPerson asset={ASSETS.characters.passengerB} width={260} flip sick={0.3} />
        </div>
        <ParticleBridge fromX={248} fromY={470} toX={520} toY={350} count={28} active={1} />
        <div style={{position: "absolute", left: 84, bottom: 52, width: 650, fontFamily: theme.fonts.body, fontSize: 25, lineHeight: 1.42, color: theme.colors.muted}}>
          The usual route is inhaling aerosolized particles from contaminated rodent material.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 86,
          top: 240,
          width: 820,
          height: 610,
          borderRadius: 34,
          background: theme.colors.white,
          border: `1px solid ${theme.colors.line}`,
          boxShadow: "0 22px 60px rgba(52,42,35,.10)",
          overflow: "hidden",
          opacity: rightReveal,
          transform: `translateY(${(1 - rightReveal) * 10}px)`,
        }}
      >
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, #F2E8DB 0 68%, #DFD4C7 68% 100%)"}} />
        <div style={{position: "absolute", left: 26, top: 22}}><PanelTitle text="Rare person-to-person spread" color={theme.colors.coralDark} /></div>
        <div style={{position: "absolute", left: 118, top: 222}}>
          <IllustratedPerson asset={ASSETS.characters.passengerA} width={260} sick={0.82} cough={0.5} />
        </div>
        <div style={{position: "absolute", right: 118, top: 222}}>
          <IllustratedPerson asset={ASSETS.characters.passengerWave} width={260} flip />
        </div>
        <ParticleBridge fromX={330} fromY={332} toX={502} toY={338} count={22} active={rightReveal} />
        <div style={{position: "absolute", left: 98, top: 122, width: 630, fontFamily: theme.fonts.body, fontSize: 25, lineHeight: 1.42, color: theme.colors.muted}}>
          This can happen after prolonged close contact in a shared enclosed space.
        </div>
        <div style={{position: "absolute", left: 106, bottom: 52, width: 610, fontFamily: theme.fonts.body, fontSize: 24, lineHeight: 1.42, color: theme.colors.muted}}>
          That makes Andes virus unusual among hantaviruses.
        </div>
      </div>
    </div>
  );
};
