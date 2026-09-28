import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";

import {IllustratedPerson} from "../../../components/characters/IllustratedPerson";
import {EditorialAsset} from "../../../components/media/EditorialAsset";
import {ASSETS} from "../../../data/assets";
import {theme} from "../../../theme/theme";

const Tag = ({left, top, text, color}: {left: number; top: number; text: string; color: string}) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      padding: "7px 11px",
      borderRadius: 14,
      background: "rgba(255,255,255,.94)",
      border: `1px solid ${color}`,
      boxShadow: "0 8px 18px rgba(52,42,35,.07)",
      fontFamily: theme.fonts.body,
      fontSize: 16,
      fontWeight: 700,
      color: theme.colors.ink,
    }}
  >
    {text}
  </div>
);

const RisingParticles = ({count = 38, active = 1, fromX = 820, fromY = 645, toX = 1270, toY = 350}: {count?: number; active?: number; fromX?: number; fromY?: number; toX?: number; toY?: number}) => {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({length: count}, (_, i) => {
        const t = ((frame * (1.4 + (i % 5) * 0.15) + i * 19) % 180) / 180;
        const x = fromX + (toX - fromX) * t + Math.sin(frame / 12 + i) * (16 + (i % 4) * 8);
        const y = fromY + (toY - fromY) * t + Math.cos(frame / 10 + i * 0.8) * (14 + (i % 3) * 10);
        const size = 6 + (i % 4) * 3;
        const opacity = (0.18 + ((i * 17) % 10) / 18) * active * (1 - t * 0.08);
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: i % 3 === 0 ? theme.colors.coral : theme.colors.violet,
              opacity,
              filter: `blur(${(i % 4) * 0.8}px)`,
              boxShadow: i % 5 === 0 ? `0 0 18px rgba(156,114,212,.26)` : undefined,
            }}
          />
        );
      })}
    </>
  );
};

export const RodentContaminationShot = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ratX = interpolate(frame, [0, 105], [1080, 790], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const personReveal = spring({frame: frame - 72, fps, config: {damping: 170, stiffness: 110}});
  const particleActive = interpolate(frame, [76, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "absolute", inset: 0, overflow: "hidden"}}>
      <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, #F8F3EB 0%, #EFE4D4 100%)"}} />

      <div
        style={{
          position: "absolute",
          left: 770,
          top: 118,
          width: 1030,
          height: 760,
          borderRadius: 38,
          overflow: "hidden",
          border: `1px solid ${theme.colors.line}`,
          boxShadow: "0 22px 60px rgba(52,42,35,.10)",
          background: "linear-gradient(180deg, #F1E6D9 0 68%, #D9CCBC 68% 100%)",
        }}
      >
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,.03), transparent 40%, rgba(0,0,0,.02) 100%)"}} />
        <div style={{position: "absolute", left: 80, top: 110, width: 190, height: 280, borderRadius: 18, border: `6px solid #B28F6C`, background: "rgba(255,255,255,.12)"}} />
        <div style={{position: "absolute", left: 300, top: 150, width: 220, height: 26, borderRadius: 8, background: "#B28F6C"}} />
        <div style={{position: "absolute", left: 320, top: 176, width: 16, height: 165, background: "#B28F6C"}} />
        <div style={{position: "absolute", left: 470, top: 176, width: 16, height: 165, background: "#B28F6C"}} />
        <div style={{position: "absolute", left: 334, top: 192, width: 136, height: 20, borderRadius: 8, background: "#D9C2A4"}} />
        <div style={{position: "absolute", left: 334, top: 240, width: 114, height: 20, borderRadius: 8, background: "#D9C2A4"}} />
        <div style={{position: "absolute", left: 620, top: 160, width: 170, height: 145, borderRadius: 16, background: "#C5AF91"}} />
        <div style={{position: "absolute", left: 642, top: 133, width: 126, height: 46, borderRadius: 12, background: "#B69775"}} />
        <div style={{position: "absolute", left: 680, top: 420, width: 260, height: 120, borderRadius: 18, background: "rgba(145,118,84,.16)"}} />

        <div
          style={{
            position: "absolute",
            left: 740,
            top: 565,
            width: 70,
            height: 26,
            borderRadius: "50%",
            background: "rgba(224,196,95,.55)",
            filter: "blur(1px)",
          }}
        />
        <Tag left={700} top={522} text="Urine" color={theme.colors.amber} />

        {Array.from({length: 5}, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 830 + i * 18,
              top: 595 + (i % 2) * 9,
              width: 13,
              height: 9,
              borderRadius: "50%",
              background: "#71533F",
              transform: `rotate(${i * 16}deg)`,
            }}
          />
        ))}
        <Tag left={816} top={544} text="Droppings" color={theme.colors.coral} />

        {Array.from({length: 4}, (_, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: 716 + i * 14,
              top: 470 - (i % 2) * 10,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "rgba(90,160,180,.48)",
              filter: "blur(.5px)",
            }}
          />
        ))}
        <Tag left={664} top={424} text="Saliva" color={theme.colors.sky} />

        <div style={{position: "absolute", left: ratX, top: 444, width: 230, height: 170}}>
          <EditorialAsset
            asset={ASSETS.transmission.cartoonRatCutout}
            width={230}
            height={170}
            zoom={1}
            showCredit={false}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 5,
            bottom: 42,
            opacity: personReveal,
            transform: `translateX(${(1 - personReveal) * 70}px) scale(${0.9 + personReveal * 0.1})`,
          }}
        >
          <IllustratedPerson asset={ASSETS.characters.passengerA} width={330} flip />
        </div>

        <div
          style={{
            position: "absolute",
            left: 958,
            top: 628,
            width: 110,
            height: 24,
            borderRadius: 14,
            background: "rgba(170,140,110,.28)",
            opacity: personReveal,
            transform: `rotate(-14deg) scale(${personReveal})`,
            transformOrigin: "left center",
          }}
        />

        <RisingParticles active={particleActive} />
      </div>

      <div style={{position: "absolute", left: 88, top: 92, width: 620}}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(53,166,161,.12)",
            color: theme.colors.tealDark,
            fontFamily: theme.fonts.body,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 2.2,
            textTransform: "uppercase",
          }}
        >
          Usual transmission
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.display, fontSize: 58, lineHeight: 1.04, color: theme.colors.ink}}>
          Rodent contamination is the main route into humans.
        </div>
        <div style={{marginTop: 18, fontFamily: theme.fonts.body, fontSize: 26, lineHeight: 1.46, color: theme.colors.muted}}>
          In an enclosed room, virus from urine, saliva and droppings can be stirred up and inhaled.
        </div>
      </div>
    </div>
  );
};
