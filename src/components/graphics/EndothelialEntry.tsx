import {interpolate, useCurrentFrame} from "remotion";
import {VirusParticle} from "./VirusParticle";
import {theme} from "../../theme/theme";

export const EndothelialEntry = ({progress = 1}: {progress?: number}) => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 160], [120, 560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * progress;
  const endosome = interpolate(frame, [130, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fusion = interpolate(frame, [250, 390], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{position: "relative", width: 900, height: 560}}>
      <svg viewBox="0 0 900 560" width="900" height="560" style={{position: "absolute", inset: 0}}>
        <path
          d="M80 400 C225 342 345 430 500 365 C650 300 735 336 850 300"
          fill="none"
          stroke={theme.colors.teal}
          strokeWidth="78"
          strokeLinecap="round"
          opacity=".5"
        />
        <circle cx="615" cy="325" r={95 * endosome} fill="rgba(156,114,212,.12)" stroke={theme.colors.violet} strokeWidth={5 * endosome}/>
        <circle cx="615" cy="325" r={42 * fusion} fill="rgba(233,111,106,.18)" />
        <path
          d={`M615 324 C655 ${315 - fusion * 60} 700 ${338 - fusion * 35} 742 ${305 - fusion * 10}`}
          fill="none"
          stroke={theme.colors.amber}
          strokeWidth={9 * fusion}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: x,
          top: 220,
          transform: "scale(.34)",
          transformOrigin: "center",
        }}
      >
        <VirusParticle size={300} cutaway={fusion > 0.4}/>
      </div>
    </div>
  );
};
