export const FPS = 30;
export const sec = (value: number) => Math.round(value * FPS);

// 12-frame overlaps are used between the 8 main sections.
// The first seven section components hold their final shot for these
// extra frames so the visible section start times stay exactly aligned
// with the narration plan while TransitionSeries overlaps the scenes.
export const TRANSITION_FRAMES = 12;

export const SCENES = {
  outbreakAtSea: {
    from: sec(0),
    baseDuration: sec(25),
    duration: sec(25) + TRANSITION_FRAMES,
    timecode: "0:00–0:25",
  },
  whatHappened: {
    from: sec(25),
    baseDuration: sec(35),
    duration: sec(35) + TRANSITION_FRAMES,
    timecode: "0:25–1:00",
  },
  virusIntro: {
    from: sec(60),
    baseDuration: sec(35),
    duration: sec(35) + TRANSITION_FRAMES,
    timecode: "1:00–1:35",
  },
  transmission: {
    from: sec(95),
    baseDuration: sec(30),
    duration: sec(30) + TRANSITION_FRAMES,
    timecode: "1:35–2:05",
  },
  pathogenesis: {
    from: sec(125),
    baseDuration: sec(50),
    duration: sec(50) + TRANSITION_FRAMES,
    timecode: "2:05–2:55",
  },
  symptoms: {
    from: sec(175),
    baseDuration: sec(30),
    duration: sec(30) + TRANSITION_FRAMES,
    timecode: "2:55–3:25",
  },
  canadaRisk: {
    from: sec(205),
    baseDuration: sec(60),
    duration: sec(60) + TRANSITION_FRAMES,
    timecode: "3:25–4:25",
  },
  prevention: {
    from: sec(265),
    baseDuration: sec(30),
    duration: sec(30),
    timecode: "4:25–4:55",
  },
} as const;

// Sum(adjusted durations) - 7 transition overlaps = 295 seconds.
export const TOTAL_FRAMES = sec(295);
