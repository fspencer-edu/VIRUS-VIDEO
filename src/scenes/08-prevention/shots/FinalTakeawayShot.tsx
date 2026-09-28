import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const Phrase = ({text, active}: {text: string; active: number}) => (
  <div style={{opacity: active, transform: `translateY(${(1-active)*10}px)`, fontFamily: theme.fonts.display, fontSize: 56, lineHeight: 1.08, color: theme.colors.ink, marginBottom: 14}}>
    {text}
  </div>
);

export const FinalTakeawayShot = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pullback = spring({frame, fps, config: {damping: 180, stiffness: 70}});
  const p1 = interpolate(frame, [20, 55], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const p2 = interpolate(frame, [62, 98], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const p3 = interpolate(frame, [104, 145], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  const shipW = 1000 - pullback * 760;
  const shipH = 620 - pullback * 430;
  const shipLeft = 110 + pullback * 130;
  const shipTop = 150 + pullback * 100;

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #F6F2EA 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", inset: 0, opacity: 0.12 + pullback * 0.88}}>
        <EditorialAsset asset={ASSETS.outbreak.globalCasesMap} width={1920} height={1080} zoom={1.03} showCredit organic={false} />
      </div>

      <div style={{position: "absolute", left: shipLeft, top: shipTop, width: shipW, height: shipH, borderRadius: 36, overflow: "hidden", boxShadow: "0 22px 56px rgba(42,50,64,.20)", border: `1px solid ${theme.colors.line}`, transform: `rotate(${(1-pullback) * -1.2}deg)`}}>
        <EditorialAsset asset={ASSETS.outbreak.shipResponse} width={shipW} height={shipH} zoom={1.05} showCredit={false} organic={false} />
      </div>

      <div style={{position: "absolute", left: shipLeft + shipW + 26, top: shipTop + shipH * 0.42, width: 16, height: 16, borderRadius: "50%", background: theme.colors.coralDark, opacity: pullback, boxShadow: `0 0 0 ${10 + 12*pullback}px rgba(185,76,74,.14)`}} />

      <div style={{position: "absolute", right: 110, top: 172, width: 560, padding: "30px 34px", borderRadius: 30, background: "rgba(255,255,255,.92)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 44px rgba(52,42,35,.09)"}}>
        <Phrase text="Severe disease" active={p1} />
        <Phrase text="Limited person-to-person spread" active={p2} />
        <Phrase text="Low broader Canadian risk with control measures" active={p3} />
      </div>
    </div>
  );
};
