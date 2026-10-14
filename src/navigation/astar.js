// A* shortest path over the corridor graph. Coordinates are map-local units.
export function findRoute(nodes, edges, startId, goalId) {
  if (!nodes[startId] || !nodes[goalId]) return [];
  const adjacency = new Map(Object.keys(nodes).map(id => [id, []]));
  for (const edge of edges) {
    adjacency.get(edge.from)?.push({ id: edge.to, cost: edge.cost });
    adjacency.get(edge.to)?.push({ id: edge.from, cost: edge.cost });
  }
  const heuristic = id => Math.hypot(nodes[id].x - nodes[goalId].x, nodes[id].y - nodes[goalId].y);
  const open = new Set([startId]), cameFrom = new Map();
  const g = new Map([[startId, 0]]), f = new Map([[startId, heuristic(startId)]]);
  while (open.size) {
    let current = [...open].reduce((best, id) => f.get(id) < f.get(best) ? id : best);
    if (current === goalId) {
      const path = [current];
      while (cameFrom.has(current)) { current = cameFrom.get(current); path.unshift(current); }
      return path;
    }
    open.delete(current);
    for (const next of adjacency.get(current) || []) {
      const tentative = g.get(current) + next.cost;
      if (tentative < (g.get(next.id) ?? Infinity)) {
        cameFrom.set(next.id, current); g.set(next.id, tentative);
        f.set(next.id, tentative + heuristic(next.id)); open.add(next.id);
      }
    }
  }
  return [];
}
