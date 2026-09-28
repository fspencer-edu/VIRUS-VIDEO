import {useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

export const ContactNetwork = ({
  contained = 0,
}: {
  contained?: number;
}) => {
  const frame = useCurrentFrame();

  const nodes = [
    [450, 250], [300, 160], [290, 345], [610, 160], [625, 350],
    [155, 95], [120, 255], [160, 425], [770, 92], [802, 260], [760, 430]
  ];

  const edges = [
    [0,1], [0,2], [0,3], [0,4], [1,5], [1,6], [2,7], [3,8], [3,9], [4,10]
  ];

  return (
    <svg viewBox="0 0 900 520" width="900" height="520">
      {edges.map(([a,b], i) => {
        const [x1,y1] = nodes[a];
        const [x2,y2] = nodes[b];
        const cut = contained > 0.5 && i >= 4;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={cut ? theme.colors.line : theme.colors.sky}
            strokeWidth="5"
            strokeDasharray={cut ? "12 12" : undefined}
            opacity={cut ? 0.32 : 0.75}
          />
        );
      })}
      {nodes.map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 0 ? 24 : 18} fill={i === 0 ? theme.colors.coral : theme.colors.teal}/>
          {contained > 0.5 && i > 0 ? (
            <circle cx={x} cy={y} r="31" fill="none" stroke={theme.colors.green} strokeWidth="4" opacity=".7"/>
          ) : null}
        </g>
      ))}
    </svg>
  );
};
