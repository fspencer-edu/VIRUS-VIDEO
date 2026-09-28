ANDES HANTAVIRUS REMOTION V6 — FINISHED CINEMATIC BUILD

Target runtime: 4:55
Resolution: 1920 × 1080
Frame rate: 30 fps
Main composition ID: AndesHantavirus

This version is built to function as the finished visual edit for the assignment. It intentionally leaves narration/audio out so you can record your own narration and add the final voice track in iMovie or directly in Remotion later.

WHAT V6 ADDS

1. @remotion/transitions
   - major-section fades, wipes and iris transitions
   - timing is compensated so the narration section timestamps remain 0:00–4:55

2. @remotion/paths
   - drawn cruise route
   - person-to-person transmission route
   - South America → Canada travel route
   - moving route followers tied to real SVG path length

3. @remotion/rough-notation
   - hand-drawn underline accents
   - circles around key numbers
   - marker-style highlight for the Canadian risk conclusion

4. @remotion/motion-blur
   - subtle film-camera motion blur on the virus push-in
   - motion blur during the aerosol tracking shot
   - deliberately limited to selected fast shots so rendering does not become unnecessarily slow

5. Reusable animated visual components
   src/components/visuals/
     AnimatedRoute.tsx
     AnimatedNumber.tsx
     HandDrawnEmphasis.tsx
     RtGenerationVisual.tsx

6. Better maps
   - South America and Canada maps are converted to transparent cutouts so they sit naturally on the paper background
   - route animations are layered over real map graphics instead of abstract blob maps

7. Better people
   - the simple SVG person is not used in the actual scene files
   - supplied illustrated people are used as transparent character cutouts
   - subtle breathing, lean, sickness tint and cough particles are added in Remotion

8. Cinematic camera language
   - push-ins
   - pull-backs
   - horizontal tracking
   - parallax
   - reframing
   - close-up transitions into microscopic science
   - controlled motion blur
   - hand-drawn annotations

INSTALLATION

Copy this package into your existing Remotion project.

KEEP your existing project-level files:
- package.json
- package-lock.json
- remotion.config.ts
- tsconfig.json
- eslint.config.mjs
- .prettierrc

REPLACE / MERGE:
- Replace your existing src/ with this src/
- Merge this public/assets/ into your public/assets/
- Copy scripts/ if you want the one-click helper commands

INSTALL THE FOUR V6 REMOTION PACKAGES

On macOS, from the project root:

  ./scripts/install-v6-deps.command

Or run manually:

  npx remotion add @remotion/transitions
  npx remotion add @remotion/paths
  npx remotion add @remotion/rough-notation
  npx remotion add @remotion/motion-blur

Using `npx remotion add` is important because Remotion packages should match the version already installed in your project.

START STUDIO

  npm run dev

The Remotion sidebar will show:
- AndesHantavirus
- Sections/
  - Andes-01-OutbreakAtSea
  - Andes-02-WhatHappened
  - Andes-03-VirusIntro
  - Andes-04-Transmission
  - Andes-05-Pathogenesis
  - Andes-06-Symptoms
  - Andes-07-CanadaRisk
  - Andes-08-Prevention

Use the section compositions when you only want to revise or preview one portion of the video.

RENDER FINAL VIDEO

  ./scripts/render-final.command

or:

  npx remotion render AndesHantavirus out/andes-hantavirus-final.mp4 --codec=h264 --crf=18

The rendered file is visual-only by design. Add your own narration and final music/sound mix afterward.

IMPORTANT ASSET NOTE

IMAGE-CREDITS-TODO.txt is still included. Before submission, replace the placeholder image-credit notes with the original URL / creator / licence information for every external static image that remains in the final edit.

SOURCE LABELS

Scientific / outbreak source labels are centralized in:

  src/data/sources.ts

Static visual assets are centralized in:

  src/data/assets.ts

TIMING

The narration structure remains:

Outbreak at Sea: 0:00 to 0:25
What Happened?: 0:25 to 1:00
What Is Andes Virus?: 1:00 to 1:35
How Does It Spread?: 1:35 to 2:05
What Happens Inside the Body?: 2:05 to 2:55
Symptoms and Severity: 2:55 to 3:25
What Does This Mean for Canada?: 3:25 to 4:25
Prevention and Final Takeaway: 4:25 to 4:55

The major-section transition overlap is already compensated in videoTimeline.ts, so these visible start times remain aligned.
