import './styles/main.css';
import { startLegacyApp } from './legacy-app.js';
import { initHybridViews } from './hybrid.js';
import { initHybridApp } from './hybrid.js';

document.addEventListener('DOMContentLoaded', () => {
  initHybridApp();
  // ... other initialization code
});
import { initHybridUI } from './hybrid-ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Wires Campus 3D / Floor plan + route / 360° buttons (floor map is created lazily when shown)
  initHybridUI();
});

startLegacyApp();
initHybridViews();
