// src/panorama/viewer.js
import Marzipano from 'marzipano';
import { campusTourScenes } from '../data/panoramas.js';

export function createPanoramaViewer(containerElement, onCheckpointSelect) {
  if (!containerElement) return null;

  containerElement.innerHTML = '';

  // Container styling
  containerElement.style.position = 'relative';

  const viewerOpts = {
    controls: { mouseViewMode: 'drag', scrollZoom: true }
  };

  const viewer = new Marzipano.Viewer(containerElement, viewerOpts);

  const limiter = Marzipano.RectilinearView.limit.traditional(
    4096,
    (40 * Math.PI) / 180,
    (100 * Math.PI) / 180
  );

  const view = new Marzipano.RectilinearView(
    { yaw: 0, pitch: 0, fov: (75 * Math.PI) / 180 },
    limiter
  );

  const geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);

  // Add a handy Location Dropdown Selector overlay on top right
  const selector = document.createElement('select');
  selector.style.cssText = `
    position: absolute;
    top: 15px;
    right: 20px;
    z-index: 1000;
    background: #0f172a;
    color: #38bdf8;
    border: 1px solid #0284c7;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0,0,0,0.5);
    outline: none;
  `;

  Object.values(campusTourScenes).forEach(scene => {
    const opt = document.createElement('option');
    opt.value = scene.id;
    opt.textContent = scene.title;
    selector.appendChild(opt);
  });

  selector.addEventListener('change', (e) => {
    switchSceneById(e.target.value);
  });

  containerElement.appendChild(selector);

  function loadScene(sceneData) {
    if (!sceneData) return;
    const source = Marzipano.ImageUrlSource.fromString(sceneData.url);
    const scene = viewer.createScene({ source, geometry, view });

    if (sceneData.hotspots) {
      sceneData.hotspots.forEach(spot => {
        const element = document.createElement('div');
        element.style.cssText = `
          background: rgba(15, 23, 42, 0.85);
          color: #38bdf8;
          padding: 8px 14px;
          border-radius: 20px;
          border: 1px solid #38bdf8;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          user-select: none;
          transition: transform 0.2s ease, background 0.2s ease;
        `;
        element.innerHTML = `<span>➔</span> <span>${spot.label}</span>`;

        element.onmouseenter = () => { element.style.transform = 'scale(1.08)'; element.style.background = '#0284c7'; element.style.color = '#fff'; };
        element.onmouseleave = () => { element.style.transform = 'scale(1.0)'; element.style.background = 'rgba(15, 23, 42, 0.85)'; element.style.color = '#38bdf8'; };

        element.addEventListener('click', (e) => {
          e.stopPropagation();
          if (onCheckpointSelect) onCheckpointSelect(spot.target);
          switchSceneById(spot.target);
        });

        scene.hotspotContainer().createHotspot(element, { yaw: spot.yaw, pitch: spot.pitch });
      });
    }

    scene.switchTo({ transitionDuration: 600 });
    selector.value = sceneData.id;
  }

  function switchSceneById(id) {
    if (campusTourScenes[id]) {
      loadScene(campusTourScenes[id]);
    }
  }

  // Initial load
  loadScene(campusTourScenes['node_07']);

  return {
    destroy: () => viewer.destroy(),
    loadSceneById: switchSceneById
  };
}