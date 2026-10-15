// src/legacy-app.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BUILDINGS } from './data/buildings.js';

export function startLegacyApp() {
  // Check common canvas/container IDs used across project
  const container = document.getElementById('three-canvas') || 
                    document.getElementById('canvas-container') || 
                    document.getElementById('app') || 
                    document.body;

  // 1. Scene Setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0f1d);
  scene.fog = new THREE.FogExp2(0x0a0f1d, 0.002);

  // 2. Camera Setup (Isometric High-Angle for Wide Campus Blueprint)
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(15, 175, 185);

  // 3. Renderer Setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // If container is a canvas element directly, reuse or append
  if (container.tagName === 'CANVAS') {
    container.replaceWith(renderer.domElement);
    renderer.domElement.id = container.id;
  } else {
    const existing = container.querySelector('canvas');
    if (existing) existing.remove();
    container.appendChild(renderer.domElement);
  }

  // 4. Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2.15;
  controls.minDistance = 40;
  controls.maxDistance = 380;
  controls.target.set(15, 0, 5);
  controls.update();

  // 5. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
  sunLight.position.set(80, 160, 60);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 400;
  sunLight.shadow.camera.left = -160;
  sunLight.shadow.camera.right = 160;
  sunLight.shadow.camera.top = 120;
  sunLight.shadow.camera.bottom = -120;
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
  fillLight.position.set(-100, 60, -80);
  scene.add(fillLight);

  // 6. Elongated Blueprint Campus Ground
  const groundGeo = new THREE.PlaneGeometry(330, 190);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.9,
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Campus Roads
  const roadMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
  
  // Left Highway (Ayodhya Road)
  const highwayGeo = new THREE.PlaneGeometry(16, 180);
  const highway = new THREE.Mesh(highwayGeo, roadMat);
  highway.rotation.x = -Math.PI / 2;
  highway.position.set(-110, 0.05, 0);
  highway.receiveShadow = true;
  scene.add(highway);

  // Main East-West Boulevard Spine
  const spineGeo = new THREE.PlaneGeometry(240, 9);
  const mainSpineRoad = new THREE.Mesh(spineGeo, roadMat);
  mainSpineRoad.rotation.x = -Math.PI / 2;
  mainSpineRoad.position.set(10, 0.06, 8);
  mainSpineRoad.receiveShadow = true;
  scene.add(mainSpineRoad);

  // 7. Interactive Buildings & Blueprint Landmarks
  const buildingMeshes = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  BUILDINGS.forEach(b => {
    let geom;
    let mesh;

    if (b.id === 'stadium') {
      // Circular Cricket Arena
      geom = new THREE.CylinderGeometry(b.w / 2, b.w / 2, b.h, 48);
      const stadiumMat = new THREE.MeshStandardMaterial({
        color: b.c,
        roughness: 0.5,
        metalness: 0.1
      });
      mesh = new THREE.Mesh(geom, stadiumMat);
      mesh.position.set(b.x, b.h / 2, b.z);

      // Outer Stadium Track Ring
      const ringGeo = new THREE.RingGeometry(b.w / 2 + 1, b.w / 2 + 5, 48);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xd97706, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(b.x, 0.1, b.z);
      scene.add(ring);
    } else {
      // Standard Architectural Blocks
      geom = new THREE.BoxGeometry(b.w, b.h, b.d);
      const mat = new THREE.MeshStandardMaterial({
        color: b.c,
        roughness: 0.45,
        metalness: 0.15
      });
      mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(b.x, b.h / 2, b.z);

      // Accent Edge
      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 })
      );
      mesh.add(line);
    }

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = b;
    scene.add(mesh);
    buildingMeshes.push(mesh);
  });

  // 8. Info Tooltip Setup
  let tooltip = document.getElementById('bldg-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'bldg-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      display: none;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid #38bdf8;
      color: #f8fafc;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 13px;
      pointer-events: none;
      z-index: 9999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      max-width: 260px;
    `;
    document.body.appendChild(tooltip);
  }

  let hoveredMesh = null;

  function onPointerMove(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(buildingMeshes);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hoveredMesh !== hit) {
        if (hoveredMesh && hoveredMesh.material.emissive) hoveredMesh.material.emissive.setHex(0x000000);
        hoveredMesh = hit;
        if (hoveredMesh.material.emissive) hoveredMesh.material.emissive.setHex(0x1e3a5f);
      }
      tooltip.style.display = 'block';
      tooltip.style.left = `${e.clientX + 16}px`;
      tooltip.style.top = `${e.clientY + 16}px`;
      tooltip.innerHTML = `
        <div style="font-weight:700; color:#38bdf8; margin-bottom:4px;">${hit.userData.n}</div>
        <div style="font-size:12px; color:#cbd5e1; line-height:1.4;">${hit.userData.i}</div>
      `;
      document.body.style.cursor = 'pointer';
    } else {
      if (hoveredMesh && hoveredMesh.material.emissive) {
        hoveredMesh.material.emissive.setHex(0x000000);
        hoveredMesh = null;
      }
      tooltip.style.display = 'none';
      document.body.style.cursor = 'default';
    }
  }

  window.addEventListener('pointermove', onPointerMove);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

  // 9. Animation Loop
  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  return {
    destroy: () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      if (tooltip) tooltip.remove();
    }
  };
}

// Alias for safety
export const init3DApp = startLegacyApp;