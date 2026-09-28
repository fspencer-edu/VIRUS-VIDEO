import {interpolate, useCurrentFrame} from "remotion";
import {ContactNetwork} from "../../../components/graphics/ContactNetwork";
import {IllustratedPerson} from "../../../components/characters/IllustratedPerson";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

export const PPEIsolationTracingShot = () => {
  const frame = useCurrentFrame();
  const contain = interpolate(frame, [54, 132], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const isoPulse = 0.75 + Math.sin(frame / 10) * 0.12;

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 92, top: 84, width: 840}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          In healthcare settings, PPE, isolation, and contact tracing help stop spread.
        </div>
      </div>

      <div style={{position: "absolute", left: 88, top: 228, width: 660, height: 560, borderRadius: 36, background: "rgba(255,255,255,.92)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 48px rgba(52,42,35,.09)"}}>
        <div style={{position: "absolute", left: 26, top: 20, fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", color: theme.colors.coralDark}}>Isolation and PPE</div>
        <div style={{position: "absolute", left: 62, top: 146, padding: "26px 44px 16px", border: `5px solid ${theme.colors.sky}`, borderRadius: 34, boxShadow: `0 0 0 ${10*isoPulse}px rgba(101,167,232,.10)`}}>
          <IllustratedPerson asset={ASSETS.characters.passengerA} width={230} sick={1} cough={0.45} />
        </div>
        <div style={{position: "absolute", right: 88, top: 184}}>
          <IllustratedPerson asset={ASSETS.characters.ppeWorker} width={220} />
        </div>
        <div style={{position: "absolute", left: 54, bottom: 48, width: 540, fontFamily: theme.fonts.body, fontSize: 24, lineHeight: 1.4, color: theme.colors.muted}}>
          The patient is isolated while healthcare workers use protective equipment.
        </div>
      </div>

      <div style={{position: "absolute", right: 86, top: 228, width: 748, height: 560, borderRadius: 36, background: "rgba(255,255,255,.92)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 48px rgba(52,42,35,.09)", overflow: "hidden"}}>
        <div style={{position: "absolute", left: 26, top: 20, fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", color: theme.colors.tealDark}}>Contact tracing</div>
        <div style={{position: "absolute", left: -60, top: 30, transform: `scale(${0.72 + contain * 0.06})`}}>
          <ContactNetwork contained={contain} />
        </div>
        <div style={{position: "absolute", left: 40, bottom: 48, width: 640, fontFamily: theme.fonts.body, fontSize: 24, lineHeight: 1.4, color: theme.colors.muted}}>
          Close contacts are identified and monitored, and the network stops expanding outward.
        </div>
      </div>
    </div>
  );
};
