# Andes Hantavirus Remotion Starter

This ZIP is meant to be copied into the Remotion project you already created.

## Recommended project structure

```text
test-proj/
├── public/
│   └── assets/
│       ├── animals/
│       ├── biology/
│       ├── icons/
│       └── maps/
├── src/
│   ├── components/
│   │   ├── graphics/
│   │   ├── layout/
│   │   └── science/
│   ├── data/
│   ├── scenes/
│   ├── theme/
│   ├── utils/
│   ├── index.ts
│   ├── Root.tsx
│   └── Video.tsx
├── package.json
├── remotion.config.ts
└── tsconfig.json
```

## How to use

1. Keep your existing Remotion project files such as `package.json`, `remotion.config.ts`, and `tsconfig.json`.
2. Replace your project's current `src/` folder with the `src/` folder in this ZIP.
3. Copy `public/assets/` from this ZIP into your project's `public/` folder.
4. In the project directory run:

```bash
npm run dev
```

5. Open the `AndesHantavirus` composition in Remotion Studio.

The demo is 15 seconds long:
- 0–5 sec: intro / ship
- 5–10 sec: rodent transmission
- 10–15 sec: lung disease

This is intentionally simple and uses emoji so it works before you collect SVG assets.
