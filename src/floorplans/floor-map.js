// Indoor floor plan using Leaflet CRS.Simple + A* routing over the corridor graph.
// Sample layout only — replace graph.js with surveyed data before relying on directions.
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FLOOR_NODES, FLOOR_EDGES } from '../navigation/graph.js';
import { findRoute } from '../navigation/astar.js';

let mapInstance = null;
let routeLayer = null;
let listening = false;

// Graph coordinates are 0..100 with y pointing down; Leaflet Simple uses [lat(y up), lng(x)].
const toLatLng = (node) => [100 - node.y, node.x];

export function initFloorMap(containerId, toolsId = 'floor-tools') {
  const container = document.getElementById(containerId);
  if (!container) return null;

  if (!mapInstance) {
    mapInstance = L.map(container, {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 4,
      zoomSnap: 0.25,
      attributionControl: false,
    });
    const bounds = [[0, 0], [100, 100]];
    L.rectangle(bounds, { color: '#8a98a5', weight: 2, fillColor: '#ffffff', fillOpacity: 0.6 }).addTo(mapInstance);

    FLOOR_EDGES.forEach((edge) => {
      L.polyline([toLatLng(FLOOR_NODES[edge.from]), toLatLng(FLOOR_NODES[edge.to])], {
        color: '#9aa7b3', weight: 6, opacity: 0.7,
      }).addTo(mapInstance);
    });
    Object.values(FLOOR_NODES).forEach((node) => {
      L.circleMarker(toLatLng(node), { radius: 6, color: '#1f6feb', fillColor: '#fff', fillOpacity: 1, weight: 3 })
        .bindTooltip(node.label, { permanent: true, direction: 'top', className: 'floor-room-label' })
        .addTo(mapInstance);
    });
    mapInstance.fitBounds(bounds);
    buildTools(toolsId);
  }

  if (!listening) {
    listening = true;
    // Allows other modules to draw a route by dispatching `route-calculated` ({ path: [ids or nodes] }).
    window.addEventListener('route-calculated', (e) => renderRoute(e.detail?.path));
  }
  return mapInstance;
}

// Call when the (previously hidden) container becomes visible so Leaflet recomputes its size.
export function refreshFloorMap() {
  if (!mapInstance) return;
  mapInstance.invalidateSize();
  mapInstance.fitBounds([[0, 0], [100, 100]]);
}

export function routeBetween(fromId, toId) {
  const path = findRoute(FLOOR_NODES, FLOOR_EDGES, fromId, toId);
  renderRoute(path);
  return path;
}

function renderRoute(path) {
  if (!mapInstance) return;
  if (routeLayer) { mapInstance.removeLayer(routeLayer); routeLayer = null; }
  if (!path || path.length < 2) return;
  const points = path
    .map((p) => (typeof p === 'string' ? FLOOR_NODES[p] : p))
    .filter(Boolean)
    .map(toLatLng);
  if (points.length < 2) return;
  routeLayer = L.polyline(points, { color: '#e5484d', weight: 5, opacity: 0.9, dashArray: '10, 8' }).addTo(mapInstance);
}

function buildTools(toolsId) {
  const tools = document.getElementById(toolsId);
  if (!tools) return;
  const options = Object.values(FLOOR_NODES).map((n) => `<option value="${n.id}">${n.label}</option>`).join('');
  tools.innerHTML = `
    <label for="route-from" style="margin:0">From</label><select id="route-from">${options}</select>
    <label for="route-to" style="margin:0">To</label><select id="route-to">${options}</select>
    <button class="btn pri" id="route-go" type="button">Route</button>
    <button class="btn" id="route-clear" type="button">Clear</button>
    <span id="route-msg" class="legend" style="margin:0"></span>`;
  tools.querySelector('#route-to').value = 'room102';
  const msg = tools.querySelector('#route-msg');
  tools.querySelector('#route-go').onclick = () => {
    const a = tools.querySelector('#route-from').value;
    const b = tools.querySelector('#route-to').value;
    const path = routeBetween(a, b);
    msg.textContent = path.length ? `${path.length - 1} segment(s): ${path.map((id) => FLOOR_NODES[id].label).join(' → ')}` : 'No route found.';
  };
  tools.querySelector('#route-clear').onclick = () => { renderRoute(null); msg.textContent = ''; };
}