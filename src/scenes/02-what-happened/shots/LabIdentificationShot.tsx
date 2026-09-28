import {interpolate, useCurrentFrame} from "remotion";

import {CinematicCamera} from "../../../components/camera/CinematicCamera";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {LabSequence} from "../../../components/graphics/LabSequence";
import {RoughUnderlineAccent, RoughHighlightAccent} from "../../../components/visuals/HandDrawnEmphasis";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const Pill = ({label}: {label: string}) => (
  <div
    style={{
      padding: "10px 16px",
      borderRadius: 999,
      background: "rgba(255,255,255,.92)",
      border: `1px solid ${theme.colors.line}`,
      fontFamily: theme.fonts.body,
      fontSize: 17,
      color: theme.colors.muted,
      boxShadow: "0 10px 24px rgba(54,45,38,.06)",
    }}
  >
    {label}
  </div>
);

export const LabIdentificationShot = () => {
  const frame = useCurrentFrame();

  const questionOpacity = interpolate(frame, [0, 70, 95], [1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const answerOpacity = interpolate(frame, [80, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0}}>
      <CinematicCamera
        durationInFrames={240}
        from={{x: 40, y: -6, scale: 1.03}}
        to={{x: -70, y: -16, scale: 1.10}}
        origin="62% 52%"
      >
        <div
          style={{
            position: "absolute",
            right: 104,
            top: 122,
            width: 760,
            height: 500,
            borderRadius: 34,
            overflow: "hidden",
            background: theme.colors.white,
            border: `1px solid ${theme.colors.line}`,
            boxShadow: "0 26px 68px rgba(58,42,33,.12)",
          }}
        >
          <EditorialAsset
            asset={ASSETS.outbreak.pcrPhoto}
            width={760}
            height={500}
            zoom={1.02}
            objectPosition="center"
            organic={false}
            showCredit={false}
          />
        </div>

        <div style={{position: "absolute", right: 40, top: 435, transform: "scale(.68)", transformOrigin: "top right"}}>
          <LabSequence />
        </div>
      </CinematicCamera>

      <div style={{position: "absolute", left: 90, top: 100, width: 640}}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(101,167,232,.14)",
            color: theme.colors.sky,
            fontFamily: theme.fonts.body,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2.2,
            textTransform: "uppercase",
          }}
        >
          May 2
        </div>

        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 62, lineHeight: 1.04, color: theme.colors.ink}}>
          Laboratory testing solves the mystery.
        </div>

        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 27, lineHeight: 1.44, color: theme.colors.muted}}>
          Clinicians run tests, rule out common causes, and then identify the outbreak as
          <span style={{marginLeft: 8}}>
            <RoughUnderlineAccent startFrame={96} durationInFrames={28} color={theme.colors.coral}>
              Andes virus.
            </RoughUnderlineAccent>
          </span>
        </div>

        <div style={{display: "flex", gap: 12, marginTop: 26}}>
          <Pill label="Clinical samples" />
          <Pill label="RT-PCR" />
          <Pill label="Sequencing" />
        </div>

        <div
          style={{
            marginTop: 38,
            width: 430,
            minHeight: 150,
            borderRadius: 28,
            background: theme.colors.white,
            border: `1px solid ${theme.colors.line}`,
            boxShadow: "0 14px 40px rgba(52,42,35,.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(101,167,232,.08), rgba(255,255,255,0))",
            }}
          />

          <div style={{position: "relative", opacity: questionOpacity, transform: `scale(${1 + questionOpacity * 0.03})`}}>
            <div style={{fontFamily: theme.fonts.display, fontSize: 106, color: theme.colors.sky}}>?</div>
          </div>

          <div
            style={{
              position: "absolute",
              opacity: answerOpacity,
              transform: `scale(${0.92 + answerOpacity * 0.08})`,
              textAlign: "center",
              width: 320,
            }}
          >
            <div style={{fontFamily: theme.fonts.body, fontSize: 18, fontWeight: 800, letterSpacing: 2.2, textTransform: "uppercase", color: theme.colors.coralDark}}>
              Result
            </div>
            <div style={{marginTop: 10, fontFamily: theme.fonts.display, fontSize: 48, lineHeight: 1.04, color: theme.colors.coralDark}}>
              <RoughHighlightAccent startFrame={102} durationInFrames={24} color="rgba(244,160,175,.45)">
                Andes virus
              </RoughHighlightAccent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
