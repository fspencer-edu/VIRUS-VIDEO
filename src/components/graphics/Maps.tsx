import {theme} from "../../theme/theme";

export const SouthAtlanticMap = ({progress = 1}: {progress?: number}) => (
  <svg viewBox="0 0 1000 620" width="1000" height="620">
    <path
      d="M180 88 C128 143 119 237 158 329 C188 399 223 458 252 552 C292 528 335 478 345 419 C360 331 325 261 300 198 C278 145 244 108 180 88Z"
      fill="#DDE8DA"
      stroke={theme.colors.tealDark}
      strokeWidth="5"
    />
    <path
      d="M760 76 C696 120 662 192 665 263 C668 343 703 417 734 535 C790 492 820 421 823 330 C827 239 799 153 760 76Z"
      fill="#E5E2D2"
      stroke={theme.colors.navy}
      strokeWidth="5"
      opacity=".75"
    />
    <path
      d="M268 500 C400 448 525 423 690 371"
      fill="none"
      stroke={theme.colors.coral}
      strokeWidth="7"
      strokeDasharray="16 16"
      strokeDashoffset={400 * (1 - progress)}
      strokeLinecap="round"
    />
    <circle cx="268" cy="500" r="10" fill={theme.colors.coral}/>
    <text x="195" y="548" fontFamily={theme.fonts.body} fontSize="24" fill={theme.colors.ink}>Ushuaia</text>
  </svg>
);

export const WorldSpreadMap = ({
  highlighted = 0,
}: {
  highlighted?: number;
}) => (
  <svg viewBox="0 0 1200 600" width="1200" height="600">
    <path d="M104 187 C182 92 310 114 358 188 C403 257 340 334 255 330 C172 326 80 272 104 187Z" fill="#DDE8DA" stroke={theme.colors.tealDark} strokeWidth="4"/>
    <path d="M330 367 C387 345 446 374 454 425 C464 485 410 548 366 525 C328 505 302 410 330 367Z" fill="#DDE8DA" stroke={theme.colors.tealDark} strokeWidth="4"/>
    <path d="M578 153 C654 95 784 100 852 166 C906 220 860 277 780 282 C691 288 592 257 578 153Z" fill="#E5E2D2" stroke={theme.colors.navy} strokeWidth="4"/>
    <path d="M835 319 C915 270 1035 310 1074 392 C1102 455 1039 511 958 504 C881 496 800 407 835 319Z" fill="#E5E2D2" stroke={theme.colors.navy} strokeWidth="4"/>

    {[
      [276, 435], [650, 170], [705, 196], [760, 215], [843, 198], [935, 396], [235, 196], [480, 138]
    ].map(([x, y], i) => (
      <g key={i} opacity={highlighted}>
        <circle cx={x} cy={y} r="12" fill={theme.colors.coral}/>
        <circle cx={x} cy={y} r={18 + Math.sin(i) * 2} fill="none" stroke={theme.colors.coral} strokeWidth="3" opacity=".35"/>
      </g>
    ))}
  </svg>
);

export const CanadaMap = ({accent = 1}: {accent?: number}) => (
  <svg viewBox="0 0 920 470" width="920" height="470">
    <path
      d="M120 185 C190 108 300 95 392 130 C470 90 572 112 617 157 C701 123 790 166 818 229 C744 251 711 311 636 318 C575 370 488 355 425 328 C349 364 282 349 230 313 C159 321 102 266 120 185Z"
      fill="#E7EFE5"
      stroke={theme.colors.tealDark}
      strokeWidth="5"
    />
    <path d="M165 240 C175 218 200 203 226 205 C247 208 260 223 263 247 C240 255 213 261 187 260Z" fill={theme.colors.coral} opacity={0.2 + accent * 0.55}/>
    <circle cx="208" cy="233" r={11 + accent * 5} fill={theme.colors.coral}/>
    <text x="157" y="295" fontFamily={theme.fonts.body} fontSize="22" fill={theme.colors.ink}>British Columbia</text>
    <circle cx="488" cy="274" r="9" fill={theme.colors.sky}/>
    <text x="505" y="281" fontFamily={theme.fonts.body} fontSize="22" fill={theme.colors.ink}>Winnipeg</text>
  </svg>
);
