# Implementation status

## Stage 1 — completed in this scaffold
- Vite project + ES module entry point.
- Three.js imported through npm rather than a global CDN script.
- Original prototype behavior retained in `legacy-app.js`.
- Building data extracted into `data/buildings.js`.
- Leaflet `CRS.Simple` indoor plan with sample rooms.
- A* shortest path on a sample corridor graph.
- Marzipano 360 viewer with sample checkpoint hotspots.
- Clear labels for all placeholder/sample geography and imagery.

## Next stages
1. Verify the campus/building data and choose one building for a surveyed floor-plan pilot.
2. Replace sample room polygons and corridor graph with verified coordinates, room IDs, accessible links and floor transitions.
3. Add multi-floor routing, stairs/lifts and path constraints.
4. Replace the SVG panorama with a licensed equirectangular photo; map each hotspot to a surveyed checkpoint and corridor graph node.
5. Split event, assistant and help-desk logic into their own modules and add automated tests.
6. Add a backend/authentication and moderator roles before publishing shared events or tickets.
