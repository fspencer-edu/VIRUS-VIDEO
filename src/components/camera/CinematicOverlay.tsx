import {
  useCurrentFrame,
} from "remotion";

export const CinematicOverlay = () => {
  const frame =
    useCurrentFrame();

  const grainX =
    (frame * 17) % 43;

  const grainY =
    (frame * 11) % 37;

  return (
    <>
      <div
        style={{
          position:
            "absolute",
          inset: 0,
          pointerEvents:
            "none",
          zIndex: 95,
          background:
            "radial-gradient(circle at 50% 45%, transparent 55%, rgba(40,31,24,.10) 100%)",
        }}
      />

      <div
        style={{
          position:
            "absolute",
          inset: -40,
          pointerEvents:
            "none",
          zIndex: 96,
          opacity: 0.045,
          backgroundImage:
            "radial-gradient(circle, #2B2420 0.7px, transparent 0.9px)",
          backgroundSize:
            "7px 7px",
          transform:
            `translate(${grainX}px, ${grainY}px)`,
        }}
      />

      <div
        style={{
          position:
            "absolute",
          inset: 0,
          pointerEvents:
            "none",
          zIndex: 97,
          background:
            "linear-gradient(120deg, rgba(255,255,255,.08), transparent 35%, transparent 72%, rgba(255,218,183,.06))",
          mixBlendMode:
            "screen",
        }}
      />
    </>
  );
};
