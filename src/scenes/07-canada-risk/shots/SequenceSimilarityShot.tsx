import {interpolate, useCurrentFrame} from "remotion";

import {theme} from "../../../theme/theme";

const baseColors = [theme.colors.sky, theme.colors.teal, theme.colors.violet, theme.colors.amber];

const SequenceRow = ({
  y,
  shift,
  label,
  variant,
}: {
  y: number;
  shift: number;
  label: string;
  variant: "known" | "outbreak" | "novel";
}) => {
  return (
    <g transform={`translate(${shift} ${y})`}>
      <text x="0" y="20" fontFamily={theme.fonts.body} fontSize="22" fontWeight="700" fill={theme.colors.ink}>
        {label}
      </text>
      {Array.from({length: 24}, (_, i) => {
        let fill = baseColors[i % 4];
        if (variant === "novel" && (i === 8 || i === 9 || i === 15 || i === 18)) {
          fill = theme.colors.coral;
        }
        if (variant === "outbreak" && i === 9) {
          fill = theme.colors.coral;
        }
        return <rect key={i} x={120 + i * 22} y={0} width={16} height={24} rx={4} fill={fill} opacity={0.92} />;
      })}
    </g>
  );
};

export const SequenceSimilarityShot = () => {
  const frame = useCurrentFrame();
  const rtIn = interpolate(frame, [0, 36], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const seqIn = interpolate(frame, [32, 88], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const noteIn = interpolate(frame, [88, 130], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden", background: "linear-gradient(180deg, #FAF6EF 0%, #FFF9F2 100%)"}}>
      <div style={{position: "absolute", left: 88, top: 84, width: 880}}>
        <div style={{fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Sequence data and outbreak dynamics both argue against a highly transmissible new form.
        </div>
      </div>

      <div style={{position: "absolute", left: 96, top: 242, width: 430, height: 520, borderRadius: 34, background: "rgba(255,255,255,.93)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 42px rgba(52,42,35,.09)", opacity: rtIn, transform: `translateY(${(1 - rtIn) * 12}px)`}}>
        <div style={{position: "absolute", left: 28, top: 22, fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: theme.colors.tealDark}}>Outbreak spread</div>
        <div style={{position: "absolute", left: 28, top: 80, fontFamily: theme.fonts.display, fontSize: 90, color: theme.colors.tealDark}}>Rt = 0.7 ↓</div>
        <div style={{position: "absolute", left: 30, top: 176, width: 330, fontFamily: theme.fonts.body, fontSize: 27, lineHeight: 1.4, color: theme.colors.ink}}>
          A reproduction number below 1 suggests the outbreak was declining.
        </div>
        <svg viewBox="0 0 430 200" width="430" height="200" style={{position: "absolute", left: 0, bottom: 20}}>
          <path d="M60 154 C115 124 145 122 192 103 C228 90 265 86 318 72" fill="none" stroke={theme.colors.tealDark} strokeWidth="7" strokeLinecap="round" />
          <path d="M58 154 L58 60 M58 154 L350 154" fill="none" stroke={theme.colors.line} strokeWidth="3" />
          {[60, 138, 214, 288].map((x, i) => <circle key={i} cx={x} cy={[154,132,105,82][i]} r="7" fill={theme.colors.tealDark} />)}
        </svg>
      </div>

      <div style={{position: "absolute", right: 94, top: 242, width: 1200, height: 520, borderRadius: 34, background: "rgba(255,255,255,.93)", border: `1px solid ${theme.colors.line}`, boxShadow: "0 18px 42px rgba(52,42,35,.09)", opacity: seqIn, transform: `translateY(${(1 - seqIn) * 12}px)`}}>
        <div style={{position: "absolute", left: 28, top: 22, fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color: theme.colors.coralDark}}>Sequence comparison</div>
        <svg viewBox="0 0 1200 360" width="1200" height="360" style={{position: "absolute", left: 0, top: 92}}>
          <SequenceRow y={24} shift={54} label="Known Andes virus" variant="known" />
          <SequenceRow y={122} shift={54} label="Outbreak samples" variant="outbreak" />
          <SequenceRow y={220} shift={54} label="Hypothetical highly transmissible new form" variant="novel" />
        </svg>
        <div style={{position: "absolute", left: 54, bottom: 34, width: 1060, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.42, color: theme.colors.muted}}>
          The outbreak virus samples looked very similar to known Andes virus sequences, rather than a newly identified highly transmissible form.
        </div>
      </div>

      <div style={{position: "absolute", left: 504, bottom: 92, width: 912, padding: "20px 26px", borderRadius: 24, background: "rgba(255,255,255,.95)", border: `2px solid ${theme.colors.teal}`, boxShadow: "0 16px 38px rgba(52,42,35,.09)", opacity: noteIn, transform: `translateY(${(1 - noteIn) * 12}px)`}}>
        <div style={{fontFamily: theme.fonts.body, fontSize: 22, lineHeight: 1.42, color: theme.colors.ink, textAlign: "center"}}>
          Combined with isolation, testing, and contact tracing, this supports a limited public-health threat rather than uncontrolled spread.
        </div>
      </div>
    </div>
  );
};
