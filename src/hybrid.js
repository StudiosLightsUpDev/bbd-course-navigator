// import { findRoute } from './navigation/astar.js';
import { graph } from './navigation/graph.js';
import { BUILDINGS } from './data/buildings.js';

// Map building names or IDs to graph node IDs in your corridor network
const BUILDING_NODE_MAP = {
  "Main Gate": "node_gate",
  "Admin Block": "node_admin",
  "School of Engineering": "node_eng_lobby",
  "BBD NITM": "node_nitm_main",
  "Auditorium": "node_auditorium",
  "Conference Hall": "node_conf",
  "College of Dental Sciences": "node_dental",
  "Central Library": "node_library",
  "Hostels": "node_hostels",
  "Canteen": "node_canteen",
  "Sports Ground": "node_sports"
};

let routingState = {
  startNode: null,
  destinationNode: null
};

export function initHybridApp() {
  console.log("Hybrid Navigation Bridge Initialized.");
  setupGlobalListeners();
}

// Function triggered when a building is selected from 3D view or bottom chips
export function handleBuildingClick(buildingName) {
  const nodeId = BUILDING_NODE_MAP[buildingName];
  
  if (!nodeId) {
    console.warn(`No graph node mapped for building: ${buildingName}`);
    return;
  }

  if (!routingState.startNode) {
    routingState.startNode = nodeId;
    showNotification(`Start set to: ${buildingName}. Now select destination.`);
  } else if (!routingState.destinationNode) {
    routingState.destinationNode = nodeId;
    showNotification(`Destination set to: ${buildingName}. Calculating route...`);
    
    // Execute A* routing
    const path = findRoute(graph, routingState.startNode, routingState.destinationNode);
    console.log("Calculated A* Path:", path);
    
    if (path && path.length > 0) {
      showNotification(`Route found! Path length: ${path.length} steps.`);
      // Dispatch custom event so floor-map.js or UI can render the route
      window.dispatchEvent(new CustomEvent('route-calculated', { detail: { path, state: routingState } }));
    } else {
      showNotification(`No direct path found between selected locations.`);
    }
    
    // Reset for next route query after computation
    routingState = { startNode: null, destinationNode: null };
  }
}

function showNotification(message) {
  // You can hook this into your UI status banner or console
  console.log(`[Navigator]: ${message}`);
}

function setupGlobalListeners() {
  // Listen for clicks coming from legacy building cards or 3D meshes
  window.addEventListener('building-selected', (e) => {
    if (e.detail && e.detail.name) {
      handleBuildingClick(e.detail.name);
    }
  });
}
export function initHybridViews() {
  console.log("Hybrid views initialized.");
}
export function initViewSwitcher() {
  const btn3D = document.querySelector('button:has-text("Campus 3D"), button:nth-child(1)'); // adjust selector based on your button classes/IDs
  const btnFloor = document.querySelector('button:has-text("Floor plan + route")');
  const btnPanorama = document.querySelector('button:has-text("360° checkpoint")');

  const view3DContainer = document.getElementById('campus-3d-container') || document.querySelector('canvas').parentElement;
  const floorContainer = document.getElementById('floor-map-container');
  const panoContainer = document.getElementById('pano-container');

  // Helper to switch active views
  function switchView(activeType) {
    if (view3DContainer) view3DContainer.style.display = activeType === '3d' ? 'block' : 'none';
    if (floorContainer) floorContainer.style.display = activeType === 'floor' ? 'block' : 'none';
    if (panoContainer) panoContainer.style.display = activeType === 'pano' ? 'block' : 'none';
  }

  // Attach event listeners to your UI tabs
  const tabButtons = document.querySelectorAll('.tab-bar button, header button'); 
  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const text = btn.textContent.trim();
      if (text.includes('Campus 3D')) switchView('3d');
      if (text.includes('Floor plan')) switchView('floor');
      if (text.includes('360°')) switchView('pano');
    });
  });
}