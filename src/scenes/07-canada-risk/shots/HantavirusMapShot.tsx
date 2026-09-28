import {interpolate, useCurrentFrame} from "remotion";

import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const LabelPill = ({text, color}: {text: string; color: string}) => (
  <div style={{display: "inline-block", padding: "10px 16px", borderRadius: 999, background: "rgba(255,255,255,.94)", border: `1px solid ${color}`, fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, color}}>
    {text}
  </div>
);

export const HantavirusMapShot = () => {
  const frame = useCurrentFrame();
  const leftIn = interpolate(frame, [0, 45], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const rightIn = interpolate(frame, [42, 88], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 88, top: 84, width: 840}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          The Canadian hantavirus context is not the same as the Andes virus outbreak.
        </div>
      </div>

      <div style={{position: "absolute", left: 96, top: 220, width: 820, height: 610, borderRadius: 36, overflow: "hidden", background: "rgba(255,255,255,.92)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 48px rgba(52,42,35,.09)", opacity: leftIn, transform: `translateY(${(1 - leftIn) * 12}px)`}}>
        <EditorialAsset asset={ASSETS.canada.bcMap} width={820} height={610} zoom={1} showCredit />
        <div style={{position: "absolute", left: 28, top: 24}}><LabelPill text="Canada" color={theme.colors.tealDark} /></div>
        <div style={{position: "absolute", left: 26, bottom: 106, padding: "14px 16px", borderRadius: 18, background: "rgba(255,255,255,.95)", border: `1px solid ${theme.colors.teal}`, boxShadow: "0 10px 26px rgba(52,42,35,.07)"}}>
          <div style={{fontFamily: theme.fonts.body, fontSize: 16, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: theme.colors.tealDark}}>
            Main Canadian hantavirus
          </div>
          <div style={{marginTop: 6, fontFamily: theme.fonts.display, fontSize: 34, color: theme.colors.ink}}>
            Sin Nombre virus
          </div>
        </div>
      </div>

      <div style={{position: "absolute", right: 96, top: 220, width: 820, height: 610, borderRadius: 36, overflow: "hidden", background: "rgba(255,255,255,.92)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 48px rgba(52,42,35,.09)", opacity: rightIn, transform: `translateY(${(1 - rightIn) * 12}px)`}}>
        <EditorialAsset asset={ASSETS.canada.southAmericaMap} width={820} height={610} zoom={1} showCredit />
        <div style={{position: "absolute", left: 28, top: 24}}><LabelPill text="South America" color={theme.colors.coralDark} /></div>
        <div style={{position: "absolute", left: 26, bottom: 106, padding: "14px 16px", borderRadius: 18, background: "rgba(255,255,255,.95)", border: `1px solid ${theme.colors.coral}`, boxShadow: "0 10px 26px rgba(52,42,35,.07)"}}>
          <div style={{fontFamily: theme.fonts.body, fontSize: 16, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: theme.colors.coralDark}}>
            Outbreak virus
          </div>
          <div style={{marginTop: 6, fontFamily: theme.fonts.display, fontSize: 34, color: theme.colors.ink}}>
            Andes virus
          </div>
        </div>
      </div>
    </div>
  );
};
