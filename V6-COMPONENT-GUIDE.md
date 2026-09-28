V6 COMPONENT GUIDE

CAMERA

CinematicCamera.tsx
Use for a slow push, pan, truck or pull-back across a layered scene.

ParallaxLayer.tsx
Use inside CinematicCamera when background, midground and foreground should move at different rates.

MotionBlurLayer.tsx
Use sparingly around fast camera movement. Current V6 uses 5 samples and a modest shutter angle on selected shots.

WhipPanBlur.tsx
Used as a short overlay around internal shot boundaries to soften hard cuts.

PATHS

AnimatedRoute.tsx
Uses @remotion/paths to calculate true SVG path length, draw the route over time and move a follower dot along that route.

Good for:
- maps
- airflow
- transmission arrows
- blood vessel paths
- contact tracing connectors

HAND-DRAWN ANNOTATIONS

HandDrawnEmphasis.tsx contains:
- RoughCircleAccent
- RoughUnderlineAccent
- RoughHighlightAccent

Use these for only the most important facts. Too many annotations will make the scene look busy.

NUMBERS / CHART-LIKE VISUALS

AnimatedNumber.tsx
Counts smoothly from zero to a target value using a Remotion spring.

RtGenerationVisual.tsx
A visual explanation of a declining reproduction number without inventing a time-series dataset. Each generation shows fewer nodes.

CHARACTERS

IllustratedPerson.tsx
Takes transparent character artwork and adds:
- breathing/bobbing
- rotation/lean
- sickness tint
- procedural cough particles
- horizontal flipping

SCIENCE COMPONENTS

VirusParticle.tsx
Layered animated virus model.

BreathingLungs.tsx
Breathing lung illustration with progressive fluid accumulation.

AlveolusSystem.tsx
Alveoli, red blood-cell flow, oxygen movement and leakage.

EndothelialEntry.tsx
Virus attachment, endosome entry and membrane-fusion sequence.

AerosolField.tsx
Procedural multi-depth particles with independent speed, sine drift, opacity, size and blur.

ContactNetwork.tsx
Animated close-contact network whose branches visually become contained.

EDITING RULE OF THUMB

If a visual needs realism:
  use a real/static source asset and animate the camera around it.

If a visual needs to explain a process:
  use a custom SVG/procedural component so the individual parts can move.

If a visual is important but abstract:
  use a hand-drawn annotation or animated path rather than another text box.
