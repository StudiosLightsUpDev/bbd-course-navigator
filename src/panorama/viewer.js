import Marzipano from 'marzipano';

// Placeholder equirectangular scenes. Replace `url` with licensed 2:1 photos.
// A hotspot `target` that matches a scene id switches to that scene.
export const DEFAULT_SCENES = [
  {
    id: 'entrance',
    url: '/assets/panoramas/sample-campus.svg',
    initialView: { yaw: 0, pitch: 0, fov: Math.PI / 2 },
    hotspots: [{ yaw: 0.65, pitch: -0.05, label: 'Admin / junction →', target: 'junction' }],
  },
  {
    id: 'junction',
    url: '/assets/panoramas/sample-campus.svg',
    initialView: { yaw: Math.PI, pitch: 0, fov: Math.PI / 2 },
    hotspots: [{ yaw: -1.0, pitch: -0.05, label: '← Main corridor', target: 'entrance' }],
  },
];

const IMAGE_RE = /\.(jpe?g|png|webp|svg)(\?.*)?$/i;

// Preload to detect missing files / invalid formats before Marzipano touches them.
function validateImage(url) {
  return new Promise((resolve, reject) => {
    if (!IMAGE_RE.test(url)) {
      reject(new Error(`Unsupported panorama format: ${url}`));
      return;
    }
    const img = new Image();
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (!img.naturalWidth || Math.abs(ratio - 2) > 0.05) {
        reject(new Error(`Panorama must be equirectangular (2:1), got ${img.naturalWidth}x${img.naturalHeight}: ${url}`));
      } else {
        resolve(img.naturalWidth);
      }
    };
    img.onerror = () => reject(new Error(`Could not load panorama image: ${url}`));
    img.src = url;
  });
}

export function createPanoramaViewer(element, onCheckpoint = () => {}, options = {}) {
  if (!element) throw new Error('createPanoramaViewer: container element is required');
  const { scenes: initialScenes = DEFAULT_SCENES, initialSceneId, onError = () => {} } = options;

  // Container must have a size or WebGL renders nothing.
  if (!element.style.position && getComputedStyle(element).position === 'static') element.style.position = 'relative';

  const viewer = new Marzipano.Viewer(element, { controls: { mouseViewMode: 'drag' } });
  const defs = new Map();   // id -> definition
  const built = new Map();  // id -> { scene, hotspots }
  let currentId = null;
  let switchToken = 0;
  let destroyed = false;

  const errorBox = document.createElement('div');
  errorBox.className = 'pano-error';
  errorBox.style.cssText = 'position:absolute;left:10px;right:10px;top:10px;z-index:5;padding:8px 10px;border-radius:8px;background:#e5484d;color:#fff;font-size:12px;display:none';
  element.appendChild(errorBox);
  function showError(err, sceneId) {
    console.error('[panorama]', err);
    errorBox.textContent = `360° view unavailable: ${err.message}`;
    errorBox.style.display = 'block';
    try { onError(err, sceneId); } catch (e) { console.error(e); }
  }

  const resizeObserver = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => { if (!destroyed) viewer.updateSize(); })
    : null;
  resizeObserver?.observe(element);

  function addScene(def) {
    if (!def || !def.id || !def.url) throw new Error('Scene needs an id and a url');
    defs.set(def.id, def);
  }
  initialScenes.forEach(addScene);

  async function buildScene(def) {
    const width = await validateImage(def.url);
    const source = Marzipano.ImageUrlSource.fromString(def.url);
    const geometry = new Marzipano.EquirectGeometry([{ width }]);
    const limiter = Marzipano.RectilinearView.limit.traditional(Math.max(width, 1024), 120 * Math.PI / 180);
    const view = new Marzipano.RectilinearView(def.initialView || { yaw: 0, pitch: 0, fov: Math.PI / 2 }, limiter);
    const scene = viewer.createScene({ source, geometry, view, pinFirstLevel: true });
    const hotspots = [];
    for (const checkpoint of def.hotspots || []) {
      const node = document.createElement('button');
      node.className = 'pano-hotspot';
      node.textContent = checkpoint.label;
      node.type = 'button';
      node.addEventListener('click', () => {
        onCheckpoint(checkpoint.target);
        if (defs.has(checkpoint.target)) switchScene(checkpoint.target);
      });
      hotspots.push(scene.hotspotContainer().createHotspot(node, { yaw: checkpoint.yaw, pitch: checkpoint.pitch }));
    }
    return { scene, hotspots };
  }

  async function switchScene(id, { transitionDuration = 600 } = {}) {
    if (destroyed) return false;
    const def = defs.get(id);
    if (!def) {
      showError(new Error(`Unknown scene "${id}"`), id);
      return false;
    }
    const token = ++switchToken;
    try {
      if (!built.has(id)) built.set(id, await buildScene(def));
      if (destroyed || token !== switchToken) return false; // superseded or destroyed meanwhile
      errorBox.style.display = 'none';
      built.get(id).scene.switchTo({ transitionDuration: currentId ? transitionDuration : 0 });
      currentId = id;
      return true;
    } catch (err) {
      if (!destroyed && token === switchToken) showError(err, id);
      return false; // previous scene stays active
    }
  }

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    resizeObserver?.disconnect();
    for (const { scene } of built.values()) {
      try { viewer.destroyScene(scene); } catch (e) { /* already gone */ }
    }
    built.clear();
    defs.clear();
    viewer.destroy(); // releases the WebGL context
    errorBox.remove();
    currentId = null;
  }

  const firstId = initialSceneId || initialScenes[0]?.id;
  if (firstId) switchScene(firstId);

  return {
    viewer,
    get scene() { return currentId ? built.get(currentId)?.scene : null; },
    switchScene,
    addScene,
    getCurrentSceneId: () => currentId,
    resize: () => { if (!destroyed) viewer.updateSize(); },
    destroy,
  };
}
