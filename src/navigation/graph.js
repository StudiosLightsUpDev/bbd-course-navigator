// src/navigation/graph.js

export const FLOOR_NODES = {
  entrance: { id: 'entrance', label: 'Floor entrance', x: 8, y: 48, lat: 26.8501, lng: 80.9490 },
  junction: { id: 'junction', label: 'Main corridor junction', x: 50, y: 48, lat: 26.8505, lng: 80.9495 },
  stairs: { id: 'stairs', label: 'Stairs / lift', x: 50, y: 75, vertical: true, lat: 26.8510, lng: 80.9498 },
  room101: { id: 'room101', label: 'Room 101', x: 20, y: 18, lat: 26.8498, lng: 80.9485 },
  room102: { id: 'room102', label: 'Room 102', x: 43, y: 18, lat: 26.8500, lng: 80.9488 },
  lab1: { id: 'lab1', label: 'Computer Lab 1', x: 80, y: 18, lat: 26.8502, lng: 80.9502 },
  office: { id: 'office', label: 'Department Office', x: 82, y: 48, lat: 26.8506, lng: 80.9505 },
  library: { id: 'library', label: 'Reading Room', x: 82, y: 78, lat: 26.8512, lng: 80.9508 },
};

export const FLOOR_EDGES = [
  ['entrance', 'junction'],
  ['junction', 'stairs'],
  ['junction', 'office'],
  ['office', 'library'],
  ['junction', 'room101'],
  ['room101', 'room102'],
  ['room102', 'lab1'],
  ['lab1', 'office'],
  ['stairs', 'library']
].map(([from, to]) => ({
  from,
  to,
  cost: Math.hypot(FLOOR_NODES[from].x - FLOOR_NODES[to].x, FLOOR_NODES[from].y - FLOOR_NODES[to].y)
}));

// Export the graph object expected by hybrid.js and astar.js
export const graph = {
  nodes: FLOOR_NODES,
  edges: FLOOR_EDGES
};