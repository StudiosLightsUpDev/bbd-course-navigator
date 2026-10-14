# BBD Campus Navigator (Vite + vanilla JavaScript)

This project migrates the supplied single-file `bbd-campus-map.html` prototype into Vite and JavaScript modules while preserving its existing campus scene, building selection, event status, event creation, rule-based assistant, help-desk ticket form, simulated satellite-style ground and animated guide robot.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite. Production build:
```bash
npm run build
npm run preview
```

## Current modules
- `src/legacy-app.js` — migrated original working prototype (kept together in this first pass to minimize regressions).
- `src/data/buildings.js` — building data extracted into a reusable module.
- `src/navigation/graph.js` — sample corridor graph and node coordinates.
- `src/navigation/astar.js` — A* pathfinding.
- `src/floorplans/floor-map.js` — Leaflet 2D floor-plan renderer with route overlay.
- `src/panorama/viewer.js` — Marzipano panorama viewer and checkpoint hotspots.
- `src/hybrid.js` — switches between 3D campus, floor plan and 360° views.

## Important prototype limitations
The original building layout, event entries, ground texture, help-desk details and the new indoor floor plan/checkpoints are samples, not verified BBD data. The 360° view uses an illustrative SVG placeholder. Do not use it for real-world wayfinding until verified floor plans, room IDs, corridor geometry, stairs/lifts, accessibility constraints and licensed panoramic images are supplied.

Events and tickets are stored in `localStorage`, on the current browser/device only. There is no shared backend, user authentication, event moderation or cross-device synchronization yet. The old demo event times are relative to the time the page loads.
