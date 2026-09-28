import {
  interpolate,
  useCurrentFrame,
} from "remotion";

import {theme} from "../../theme/theme";

type Props = {
  width?: number;
  height?: number;
};

export const RtGenerationVisual = ({
  width = 620,
  height = 240,
}: Props) => {
  const frame = useCurrentFrame();

  const generations = [7, 5, 4, 3];

  return (
    <svg viewBox="0 0 620 240" width={width} height={height}>
      {generations.map((count, generationIndex) => {
        const x = 85 + generationIndex * 155;
        const reveal = interpolate(
          frame,
          [generationIndex * 18, generationIndex * 18 + 38],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        return (
          <g key={generationIndex} opacity={reveal}>
            {Array.from({length: count}, (_, i) => {
              const y = 35 + i * (170 / Math.max(1, count - 1));
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={11}
                  fill={generationIndex === 0 ? theme.colors.coral : theme.colors.teal}
                  opacity={0.8 - generationIndex * 0.08}
                />
              );
            })}

            {generationIndex < generations.length - 1 ? (
              <path
                d={`M ${x + 22} 120 C ${x + 65} 120 ${x + 90} 120 ${x + 128} 120`}
                fill="none"
                stroke={theme.colors.line}
                strokeWidth="4"
                strokeDasharray="10 10"
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};
