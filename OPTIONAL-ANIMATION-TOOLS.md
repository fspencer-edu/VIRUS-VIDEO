OPTIONAL ANIMATION TOOLS FOR THIS PROJECT

V5 does not require these, but they can improve later versions.

1. @remotion/transitions
Best for cinematic scene-to-scene transitions:
- fade
- push
- wipe
- zoom
- blur
- film-burn style effects
- custom transition presentations

Install:
npm i @remotion/transitions

Good use here:
- ship photo -> illustrated ship
- map -> lab
- lung -> alveolus
- Canada map -> contact network

2. @remotion/paths
Best for:
- drawing route lines
- morphing one SVG path into another
- organic shape transitions
- animated callout lines

Install:
npm i @remotion/paths

Good use here:
- cruise route path
- airflow path
- blood vessel path
- shape morph from case marker -> virus

3. @remotion/shapes
Best for programmatic shapes and animated geometry.

Install:
npm i @remotion/shapes

Good use here:
- circular masks
- organic graphic elements
- animated background geometry

4. @remotion/lottie
Useful if you create animations in After Effects or download/create Lottie JSON.

Install:
npm i @remotion/lottie

Good use here:
- polished PPE motion
- character gestures
- icon micro-animations
- animated lab equipment

5. Rive
Useful if you want truly rigged 2D characters with bones/state machines.
Potential future use:
- mouse walking
- passenger coughing
- PPE worker gestures

For this 5-minute assignment it may be more setup than necessary unless character animation becomes a major focus.

6. After Effects + Bodymovin/Lottie
Useful if you want to keyframe a complicated illustration visually, export it as Lottie, and place it inside Remotion.

7. Figma / Illustrator
Best for preparing layered vector art:
- isolate body parts
- remove backgrounds
- create masks
- prepare lungs / alveoli / virus layers

RECOMMENDED FOR THIS PROJECT

Use core Remotion + the existing custom camera system first.

If you add only two packages later:
1. @remotion/transitions
2. @remotion/paths

Those give the most benefit for the least extra complexity.
