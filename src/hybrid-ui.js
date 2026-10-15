// src/hybrid-ui.js
import { initFloorMap, refreshFloorMap, routeBetween } from './floorplans/floor-map.js';
import { createPanoramaViewer } from './panorama/viewer.js';

export function initHybridUI() {
  const $ = (id) => document.getElementById(id);
  const overlay = $('hybrid-view');
  const floor = $('floor-map');
  const tools = $('floor-tools');
  const pano = $('pano-view');
  const title = $('hybrid-title');
  const foot = $('hybrid-foot');
  const buttons = { campus: $('show-campus'), floor: $('show-floor'), pano: $('show-pano') };
  if (!overlay || !floor || !pano || !buttons.campus || !buttons.floor || !buttons.pano) return;

  let panoViewer = null;
  let current = 'campus';

  function destroyPano() {
    if (panoViewer) { panoViewer.destroy(); panoViewer = null; }
    pano.innerHTML = '';
  }

  function show(mode) {
    current = mode;
    Object.entries(buttons).forEach(([key, btn]) => btn.classList.toggle('on', key === mode));
    overlay.classList.toggle('active', mode !== 'campus');
    floor.hidden = mode !== 'floor';
    tools.style.display = mode === 'floor' ? 'flex' : 'none';
    pano.hidden = mode !== 'pano';

    if (mode !== 'pano') destroyPano();

    if (mode === 'floor') {
      title.textContent = 'Floor plan + route';
      foot.textContent = 'Illustrative demo layout — replace with verified campus data before relying on directions.';
      initFloorMap('floor-map', 'floor-tools');
      refreshFloorMap();
    } else if (mode === 'pano') {
      title.textContent = '360° Checkpoint Tour';
      foot.textContent = 'Interactive 360° Campus Navigation';
      if (!panoViewer) {
        try {
          panoViewer = createPanoramaViewer(pano, (target) => {
            window.dispatchEvent(new CustomEvent('checkpoint-selected', { detail: { id: target } }));
          });
        } catch (err) {
          console.error('[panorama] failed to start', err);
          pano.textContent = '360° view could not start on this device.';
        }
      }
    }
  }

  buttons.campus.addEventListener('click', () => show('campus'));
  buttons.floor.addEventListener('click', () => show('floor'));
  buttons.pano.addEventListener('click', () => show('pano'));
  $('close-hybrid')?.addEventListener('click', () => show('campus'));
  buttons.campus.classList.add('on');
  tools.style.display = 'none';

  return { show, routeBetween, get mode() { return current; } };
}