import {interpolate, useCurrentFrame} from "remotion";

import {IllustratedPerson} from "../../../components/characters/IllustratedPerson";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const FloatingDots = ({count = 18, active = 1}: {count?: number; active?: number}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {Array.from({length: count}, (_, i) => {
        const t = ((frame * (0.9 + (i % 3) * 0.12) + i * 18) % 150) / 150;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: 1090 + t * 170 + Math.sin(frame / 9 + i) * 11,
              top: 370 + Math.cos(frame / 8 + i * 0.5) * 24,
              width: 7 + (i % 3) * 2,
              height: 7 + (i % 3) * 2,
              borderRadius: "50%",
              background: i % 2 === 0 ? theme.colors.coral : theme.colors.violet,
              opacity: (0.18 + (i % 3) * 0.08) * active,
              filter: `blur(${(i % 2) * 0.7}px)`,
            }}
          />
        );
      })}
    </>
  );
};

export const AerosolInhalationShot = () => {
  const frame = useCurrentFrame();

  const morph = interpolate(frame, [0, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const portholeReveal = interpolate(frame, [76, 146], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 88, top: 90, width: 640}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          In the cruise outbreak, shared indoor spaces became part of the story.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.46, color: theme.colors.muted}}>
          The enclosed room transforms into a ship interior, connecting the biology to the cruise-ship outbreak.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 780,
          top: 125,
          width: 1040,
          height: 740,
          borderRadius: 38,
          overflow: "hidden",
          border: `1px solid ${theme.colors.line}`,
          boxShadow: "0 22px 60px rgba(52,42,35,.10)",
          background: morph < 0.5 ? "linear-gradient(180deg, #F1E6D9 0 68%, #D8CCBE 68% 100%)" : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(241,230,217,${1 - morph}) 0 68%, rgba(216,204,190,${1 - morph}) 68% 100%), linear-gradient(180deg, rgba(228,233,241,${morph}) 0 70%, rgba(198,207,220,${morph}) 70% 100%)`,
          }}
        />

        <div style={{position: "absolute", left: 70, top: 118, width: 170, height: 250, borderRadius: 18, border: `6px solid rgba(178,143,108,${1 - morph})`, opacity: 1 - morph, background: "rgba(255,255,255,.12)"}} />
        <div style={{position: "absolute", left: 300, top: 155, width: 240, height: 22, borderRadius: 8, background: `rgba(178,143,108,${1 - morph})`}} />
        <div style={{position: "absolute", left: 320, top: 177, width: 16, height: 164, background: `rgba(178,143,108,${1 - morph})`}} />
        <div style={{position: "absolute", left: 502, top: 177, width: 16, height: 164, background: `rgba(178,143,108,${1 - morph})`}} />

        <div style={{position: "absolute", right: 72, top: 58, width: 230, height: 230, borderRadius: "50%", overflow: "hidden", border: `10px solid rgba(75,100,130,${portholeReveal})`, boxShadow: "0 14px 34px rgba(38,48,65,.15)", opacity: portholeReveal, background: theme.colors.white}}>
          <EditorialAsset asset={ASSETS.outbreak.shipResponse} width={230} height={230} zoom={1.26} objectPosition="center" organic={false} showCredit={false} />
        </div>

        <div style={{position: "absolute", left: 110, bottom: 102, width: 368, height: 168, borderRadius: 20, background: `rgba(205,224,240,${morph})`, border: `1px solid rgba(120,145,170,${morph})`, boxShadow: morph > 0 ? "0 12px 26px rgba(58,76,96,.10)" : "none"}} />
        <div style={{position: "absolute", left: 128, bottom: 176, width: 336, height: 48, borderRadius: 16, background: `rgba(245,249,252,${morph})`}} />
        <div style={{position: "absolute", left: 128, bottom: 120, width: 152, height: 34, borderRadius: 12, background: `rgba(241,248,253,${morph})`}} />
        <div style={{position: "absolute", left: 104, top: 94, opacity: portholeReveal}}>
          <div style={{padding: "8px 12px", borderRadius: 14, background: "rgba(255,255,255,.9)", border: `1px solid ${theme.colors.line}`, fontFamily: theme.fonts.body, fontSize: 16, color: theme.colors.ink}}>Cruise ship cabin</div>
        </div>

        <div style={{position: "absolute", left: 498, top: 214, opacity: 0.86 + morph * 0.12}}>
          <IllustratedPerson asset={ASSETS.characters.passengerA} width={240} sick={0.62} cough={0.55} />
        </div>
        <div style={{position: "absolute", right: 130, top: 232, opacity: 0.86 + morph * 0.12}}>
          <IllustratedPerson asset={ASSETS.characters.passengerWave} width={230} flip />
        </div>

        <FloatingDots active={0.4 + morph * 0.6} />
      </div>
    </div>
  );
};
