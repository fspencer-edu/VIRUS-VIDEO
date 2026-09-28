import {useCurrentFrame} from "remotion";
import {theme} from "../../theme/theme";

export const BreathingLungs = ({
  width = 650,
  fluid = 0,
}: {
  width?: number;
  fluid?: number;
}) => {
  const frame = useCurrentFrame();
  const breathe = 1 + Math.sin(frame / 18) * 0.025 * (1 - fluid * 0.65);

  return (
    <svg
      viewBox="0 0 760 620"
      width={width}
      style={{overflow: "visible", transform: `scale(${breathe})`}}
    >
      <path d="M370 85 L370 238" stroke={theme.colors.navy} strokeWidth="24" strokeLinecap="round"/>
      <path d="M370 220 C320 238 284 275 249 328" stroke={theme.colors.navy} strokeWidth="18" fill="none" strokeLinecap="round"/>
      <path d="M370 220 C420 238 456 275 491 328" stroke={theme.colors.navy} strokeWidth="18" fill="none" strokeLinecap="round"/>
      <path
        d="M342 171 C252 178 166 239 132 354 C96 477 162 556 276 530 C335 516 358 459 358 385 L358 205 C358 184 354 174 342 171Z"
        fill={theme.colors.lung}
        stroke={theme.colors.coralDark}
        strokeWidth="6"
      />
      <path
        d="M398 171 C488 178 574 239 608 354 C644 477 578 556 464 530 C405 516 382 459 382 385 L382 205 C382 184 386 174 398 171Z"
        fill={theme.colors.lung}
        stroke={theme.colors.coralDark}
        strokeWidth="6"
      />
      <path d="M320 253 C272 286 241 329 218 382" stroke="#F8C0C9" strokeWidth="9" fill="none" strokeLinecap="round"/>
      <path d="M420 253 C468 286 499 329 522 382" stroke="#F8C0C9" strokeWidth="9" fill="none" strokeLinecap="round"/>
      {fluid > 0 ? (
        <>
          <path
            d={`M131 ${500 - fluid * 90} C170 ${470 - fluid * 40} 268 ${484 - fluid * 38} 352 ${460 - fluid * 70} L352 524 C250 560 160 540 131 500Z`}
            fill={theme.colors.fluid}
            opacity={0.18 + fluid * 0.55}
          />
          <path
            d={`M409 ${460 - fluid * 70} C490 ${486 - fluid * 40} 570 ${470 - fluid * 38} 610 ${500 - fluid * 90} C575 548 485 559 409 524Z`}
            fill={theme.colors.fluid}
            opacity={0.18 + fluid * 0.55}
          />
        </>
      ) : null}
    </svg>
  );
};
