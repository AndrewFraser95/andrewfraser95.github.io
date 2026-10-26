// 3D coin toss for Corner Pot. Exposes window.tossCoin(pence).
// Real UK coin shapes and colours; denomination side plus a generic crowned side (no royal portrait).
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const TAU = Math.PI * 2;
const SPECS = {
  10: { label: "10", sub: "PENCE", d: 24.5, t: 1.85, shape: "round", reeded: true },
  20: { label: "20", sub: "PENCE", d: 21.4, t: 1.7, shape: "hept" },
  50: { label: "50", sub: "PENCE", d: 27.3, t: 1.78, shape: "hept" },
  100: { label: "£1", sub: "ONE POUND", d: 23.43, t: 2.8, shape: "dodeca", bimetal: true, inner: 0.68 },
};
const SILVER = { hi: "#e4e6e9", lo: "#a7abb0", mid: "#c6c9cd", edge: 0xc2c5c9 };
const GOLD = { hi: "#e8cf80", lo: "#b08a33", mid: "#cba84c", edge: 0xc9a54a };

// ---- outlines (mm, counter-clockwise) ----
function outline(spec) {
  const pts = [];
  if (spec.shape === "round") {
    for (let i = 0; i < 160; i++) pts.push({ x: (spec.d / 2) * Math.cos((i / 160) * TAU), y: (spec.d / 2) * Math.sin((i / 160) * TAU) });
  } else if (spec.shape === "hept") {
    // Reuleaux heptagon: constant-width, curved sides (UK 20p and 50p)
    const n = 7, w = spec.d, Rv = w / (2 * Math.sin((3 * Math.PI) / n));
    const v = [...Array(n)].map((_, k) => ({ x: Rv * Math.cos(Math.PI / 2 + (k * TAU) / n), y: Rv * Math.sin(Math.PI / 2 + (k * TAU) / n) }));
    for (let i = 0; i < n; i++) {
      const a = v[i], b = v[(i + 1) % n], c = v[(i + 4) % n];
      const a0 = Math.atan2(a.y - c.y, a.x - c.x);
      let d = Math.atan2(b.y - c.y, b.x - c.x) - a0;
      while (d > Math.PI) d -= TAU;
      while (d < -Math.PI) d += TAU;
      for (let s = 0; s < 28; s++) pts.push({ x: c.x + w * Math.cos(a0 + (d * s) / 28), y: c.y + w * Math.sin(a0 + (d * s) / 28) });
    }
  } else {
    // 12-sided with softly rounded corners (UK 1 pound)
    const n = 12, R = spec.d / 2, r = 1.0;
    const v = [...Array(n)].map((_, k) => ({ x: R * Math.cos(Math.PI / 12 + (k * TAU) / n), y: R * Math.sin(Math.PI / 12 + (k * TAU) / n) }));
    for (let k = 0; k < n; k++) {
      const P = v[(k + n - 1) % n], V = v[k], N = v[(k + 1) % n];
      const toward = (A, B) => { const dx = A.x - B.x, dy = A.y - B.y, l = Math.hypot(dx, dy); return { x: B.x + (dx / l) * r, y: B.y + (dy / l) * r }; };
      const a = toward(P, V), b = toward(N, V);
      for (let s = 0; s <= 8; s++) { const u = s / 8; pts.push({ x: (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * V.x + u * u * b.x, y: (1 - u) * (1 - u) * a.y + 2 * (1 - u) * u * V.y + u * u * b.y }); }
    }
  }
  return pts;
}

// ---- textures ----
const cv = n => { const c = document.createElement("canvas"); c.width = c.height = n; return c; };

function ringText(g, text, cx, cy, r, px, spacing) {
  const ch = [...text], w = ch.map(c => g.measureText(c).width);
  const total = w.reduce((a, b) => a + b, 0) + spacing * (ch.length - 1);
  let a = -Math.PI / 2 - total / r / 2;
  ch.forEach((c, i) => {
    const m = a + w[i] / 2 / r;
    g.save(); g.translate(cx + r * Math.cos(m), cy + r * Math.sin(m)); g.rotate(m + Math.PI / 2); g.fillText(c, 0, 0); g.restore();
    a += (w[i] + spacing) / r;
  });
}

function crown(g, cx, cy, w, h) {
  const x0 = cx - w / 2, top = cy - h / 2, base = cy + h / 2, band = h * 0.24;
  g.beginPath(); g.moveTo(x0, base - band);
  for (let k = 0; k < 5; k++) {
    g.lineTo(x0 + (w * k) / 4, top + (k % 2 ? h * 0.12 : 0));
    if (k < 4) g.lineTo(x0 + (w * (k + 0.5)) / 4, cy - h * 0.02);
  }
  g.lineTo(x0 + w, base - band); g.closePath(); g.fill();
  g.fillRect(x0, base - band, w, band);
  for (let k = 0; k < 5; k++) { g.beginPath(); g.arc(x0 + (w * k) / 4, top + (k % 2 ? h * 0.12 : 0) - w * 0.03, w * 0.032, 0, TAU); g.fill(); }
}

function design(g, spec, side, N, S, rin, fillFor) {
  const cx = N / 2, cy = N / 2;
  g.textAlign = "center"; g.textBaseline = "middle";
  const paint = (dx, dy, style) => {
    g.save(); g.translate(dx, dy); g.fillStyle = style;
    if (side === "front") {
      g.font = `700 ${N * (spec.label.length > 2 ? 0.3 : 0.36)}px Georgia, "Times New Roman", serif`;
      g.fillText(spec.label, cx, cy - N * 0.03);
      g.font = `700 ${N * (spec.sub.length > 5 ? 0.062 : 0.075)}px Georgia, serif`;
      g.fillText(spec.sub.split("").join(spec.sub.length > 5 ? " " : " "), cx, cy + N * 0.24);
    } else {
      const fp = Math.max(36, rin * S * 0.14);
      g.font = `700 ${fp}px Georgia, serif`;
      ringText(g, "CHARLES III · D · G · REG · F · D ·", cx, cy, rin * S - fp * 0.95 - 1.4 * S, fp, fp * 0.08);
      crown(g, cx, cy - N * 0.02, rin * S * 0.78, rin * S * 0.62);
      g.font = `700 ${N * 0.07}px Georgia, serif`;
      g.fillText("2026", cx, cy + rin * S * 0.5);
    }
    g.restore();
  };
  fillFor(paint);
}

function makeTextures(spec, side, pts, size, aniso) {
  const N = 1024, S = N / size, cx = N / 2;
  const toPx = p => [(p.x / size + 0.5) * N, (0.5 - p.y / size) * N];
  const path = g => { g.beginPath(); pts.forEach((p, i) => { const [x, y] = toPx(p); i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.closePath(); };
  const rin = Math.min(...pts.map(p => Math.hypot(p.x, p.y)));
  const rimW = 1.15 * S;

  // colour
  const c = cv(N), g = c.getContext("2d");
  const metal = pal => {
    const gr = g.createLinearGradient(0, 0, N, N); gr.addColorStop(0, pal.hi); gr.addColorStop(0.5, pal.lo); gr.addColorStop(1, pal.hi);
    g.fillStyle = gr; g.fillRect(0, 0, N, N);
    for (let i = 0; i < 280; i++) { // lathe-turned fine concentric lines
      g.strokeStyle = Math.random() < 0.5 ? `rgba(255,255,255,${Math.random() * 0.08})` : `rgba(0,0,0,${Math.random() * 0.08})`;
      g.lineWidth = 0.5 + Math.random() * 1.6; g.beginPath(); g.arc(cx, cx, Math.random() * N * 0.58, 0, TAU); g.stroke();
    }
  };
  g.save(); path(g); g.clip();
  if (spec.bimetal) { metal(GOLD); g.save(); g.beginPath(); g.arc(cx, cx, (spec.inner * spec.d / 2) * S, 0, TAU); g.clip(); metal(SILVER); g.restore(); }
  else metal(SILVER);
  g.restore();
  const img = g.getImageData(0, 0, N, N), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * 14; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  g.putImageData(img, 0, 0);
  const pal = spec.bimetal ? SILVER : SILVER;
  g.save(); path(g); g.clip();
  g.strokeStyle = "rgba(0,0,0,.28)"; g.lineWidth = rimW * 2 + 5; path(g); g.stroke();
  g.strokeStyle = "rgba(255,255,255,.28)"; g.lineWidth = rimW * 2 - 3; path(g); g.stroke();
  if (spec.bimetal) { g.strokeStyle = "rgba(0,0,0,.55)"; g.lineWidth = 5; g.beginPath(); g.arc(cx, cx, (spec.inner * spec.d / 2) * S, 0, TAU); g.stroke(); }
  g.restore();
  design(g, spec, side, N, S, rin, paint => {
    paint(5, 5, "rgba(40,40,46,.40)"); paint(-2, -2, "rgba(255,255,255,.65)"); paint(0, 0, spec.bimetal && side === "back" ? GOLD.mid : pal.mid);
  });

  // bump (height map: white = raised)
  const b = cv(N), h = b.getContext("2d");
  h.fillStyle = "#2c2c2c"; h.fillRect(0, 0, N, N);
  if (spec.bimetal) { h.save(); path(h); h.clip(); h.fillStyle = "#4a4a4a"; h.fillRect(0, 0, N, N); h.beginPath(); h.arc(cx, cx, (spec.inner * spec.d / 2) * S, 0, TAU); h.fillStyle = "#2c2c2c"; h.fill(); h.restore(); }
  h.save(); path(h); h.clip(); h.strokeStyle = "#fff"; h.lineWidth = rimW * 2; path(h); h.stroke(); h.restore();
  if (spec.reeded) { h.fillStyle = "#fff"; for (let i = 0; i < 72; i++) { const a = (i / 72) * TAU, r = (spec.d / 2 - 2.0) * S; h.beginPath(); h.arc(cx + r * Math.cos(a), cx + r * Math.sin(a), 0.42 * S, 0, TAU); h.fill(); } }
  h.shadowColor = "#fff"; h.shadowBlur = 5;
  design(h, spec, side, N, S, rin, paint => paint(0, 0, "#f0f0f0"));

  const map = new THREE.CanvasTexture(c); map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = aniso;
  const bump = new THREE.CanvasTexture(b); bump.anisotropy = aniso;
  return { map, bump };
}

function reedTexture() {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 8;
  const g = c.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, 1024, 8); g.fillStyle = "#fff";
  for (let i = 0; i < 128; i++) g.fillRect((i / 128) * 1024, 0, 4, 8);
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; return t;
}

// ---- geometry ----
function sideGeometry(pts, t) {
  const N = pts.length, pos = [], nor = [], uv = [], idx = [], L = [0];
  for (let i = 1; i <= N; i++) L[i] = L[i - 1] + Math.hypot(pts[i % N].x - pts[i - 1].x, pts[i % N].y - pts[i - 1].y);
  for (let i = 0; i <= N; i++) {
    const p = pts[i % N], pr = pts[(i - 1 + N) % N], pn = pts[(i + 1) % N];
    const tx = pn.x - pr.x, ty = pn.y - pr.y, l = Math.hypot(tx, ty), nx = ty / l, ny = -tx / l;
    pos.push(p.x, p.y, t / 2, p.x, p.y, -t / 2); nor.push(nx, ny, 0, nx, ny, 0);
    uv.push(L[i] / L[N], 1, L[i] / L[N], 0);
  }
  for (let i = 0; i < N; i++) { const a = 2 * i; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

function faceGeometry(pts, size, z, back) {
  const g = new THREE.ShapeGeometry(new THREE.Shape(pts.map(p => new THREE.Vector2(p.x, p.y))));
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / size + 0.5, pos.getY(i) / size + 0.5);
  if (back) g.rotateX(Math.PI);
  g.translate(0, 0, z);
  return g;
}

// ---- scene ----
let ready = null;
function init() {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
  const el = renderer.domElement;
  Object.assign(el.style, { position: "fixed", left: "0", top: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "4" });
  document.body.appendChild(el);
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-60, 90, 160); scene.add(key);
  const fill = new THREE.DirectionalLight(0xfff2e0, 1.1); fill.position.set(90, -50, 120); scene.add(fill);
  renderer.toneMappingExposure = 0.9;
  const camera = new THREE.PerspectiveCamera(30, 1, 10, 2000);
  const view = { visW: 90, visH: 180 };
  const layout = () => {
    const W = innerWidth, H = innerHeight;
    renderer.setSize(W, H); camera.aspect = W / H;
    view.visH = (view.visW * H) / W;
    camera.position.set(0, 0, view.visH / 2 / Math.tan((15 * Math.PI) / 180));
    camera.updateProjectionMatrix();
  };
  layout(); addEventListener("resize", layout);

  // soft contact shadow
  const sc = cv(128), sg = sc.getContext("2d"), gr = sg.createRadialGradient(64, 64, 4, 64, 64, 62);
  gr.addColorStop(0, "rgba(0,0,0,.75)"); gr.addColorStop(1, "rgba(0,0,0,0)"); sg.fillStyle = gr; sg.fillRect(0, 0, 128, 128);
  const shadowTex = new THREE.CanvasTexture(sc);

  const cache = {};
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const reed = reedTexture();
  const proto = stake => {
    if (cache[stake]) return cache[stake];
    const spec = SPECS[stake] || SPECS[20], pts = outline(spec), size = 2 * Math.max(...pts.map(p => Math.hypot(p.x, p.y)));
    const f = makeTextures(spec, "front", pts, size, aniso), b = makeTextures(spec, "back", pts, size, aniso);
    const mat = (t, extra = {}) => new THREE.MeshStandardMaterial({ map: t.map, bumpMap: t.bump, bumpScale: 2.6, metalness: 1, roughness: 0.44, envMapIntensity: 1.35, ...extra });
    const sideMat = new THREE.MeshStandardMaterial({ color: spec.bimetal ? GOLD.edge : SILVER.edge, metalness: 1, roughness: 0.5, envMapIntensity: 1.3, bumpMap: spec.reeded ? reed : null, bumpScale: 3 });
    return (cache[stake] = {
      spec, R: size / 2,
      side: sideGeometry(pts, spec.t), sideMat,
      front: faceGeometry(pts, size, spec.t / 2 + 0.01, false), frontMat: mat(f),
      back: faceGeometry(pts, size, -spec.t / 2 - 0.01, true), backMat: mat(b),
    });
  };

  return { renderer, scene, camera, view, proto, shadowTex };
}

// ---- animation ----
const X = new THREE.Vector3(1, 0, 0), Z = new THREE.Vector3(0, 0, 1);
const lerp = (a, b, u) => a + (b - a) * u;
const smooth = u => u * u * (3 - 2 * u);
const T1 = 0.85, T2 = 0.5, T3 = 0.85, T4 = 0.45;
export const DURATION = T1 + T2 + T3 + T4;

function makeCoin(env, stake, o = {}) {
  const p = env.proto(stake), grp = new THREE.Group();
  grp.add(new THREE.Mesh(p.side, p.sideMat), new THREE.Mesh(p.front, p.frontMat), new THREE.Mesh(p.back, p.backMat));
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(p.R * 2.6, p.R * 2.6), new THREE.MeshBasicMaterial({ map: env.shadowTex, transparent: true, depthWrite: false }));
  env.scene.add(grp, sh);
  const { visW, visH } = env.view;
  const xL = o.x ?? (Math.random() - 0.5) * visW * 0.3, yL = o.y ?? visH * 0.04;
  return {
    grp, sh, R: p.R, t0: performance.now(),
    xL, yL, x0: xL + (Math.random() - 0.5) * 30, y0: -visH / 2 - p.R * 2,
    flip: (3 + Math.floor(Math.random() * 3) + ((o.back ?? Math.random() < 0.5) ? 0.5 : 0)) * TAU, // whole or half turns
    zs: (Math.random() - 0.5) * 1.6, phi0: Math.random() * TAU, H: 52 + Math.random() * 14,
  };
}

function pose(env, c, t) {
  const { visH } = env.view;
  let x, y, z = 0, q = new THREE.Quaternion();
  const qZ = new THREE.Quaternion().setFromAxisAngle(Z, c.zs);
  const flatAng = c.flip % TAU;
  const qFlat = new THREE.Quaternion().setFromAxisAngle(X, flatAng);
  const A0 = 0.55;
  if (t < T1) {                                  // toss up and across
    const u = t / T1;
    x = lerp(c.x0, c.xL, u); y = lerp(c.y0, c.yL, 1 - (1 - u) * (1 - u)); z = c.H * 4 * u * (1 - u);
    q.setFromAxisAngle(X, c.flip * u).premultiply(new THREE.Quaternion().setFromAxisAngle(Z, c.zs * u));
  } else if (t < T1 + T2) {                      // lands and bounces
    const s = (t - T1) / T2;
    x = c.xL + s * 3; y = c.yL + s * 5;
    z = s < 0.58 ? 16 * 4 * (s / 0.58) * (1 - s / 0.58) : 5 * 4 * ((s - 0.58) / 0.42) * (1 - (s - 0.58) / 0.42);
    const A = A0 * smooth(Math.min(1, s / 0.3));
    q.setFromAxisAngle(new THREE.Vector3(Math.cos(c.phi0), Math.sin(c.phi0), 0), A).multiply(qZ).multiply(qFlat);
  } else if (t < T1 + T2 + T3) {                 // rattles and settles flat
    const u = (t - T1 - T2) / T3, A = A0 * Math.pow(1 - u, 1.7), phi = c.phi0 + TAU * (5 * u + 9 * u * u * u);
    x = c.xL + 3 + u * 2; y = c.yL + 5 + u * 3; z = c.R * Math.sin(A) * 0.55;
    q.setFromAxisAngle(new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0), A).multiply(qZ).multiply(qFlat);
  } else {                                       // swept off the top into the pot
    const u = Math.min(1, (t - T1 - T2 - T3) / T4);
    x = c.xL + 5 + u * 6; y = lerp(c.yL + 8, visH / 2 + c.R * 2.5, u * u); z = 0;
    q.setFromAxisAngle(Z, u * 3).multiply(qZ).multiply(qFlat);
  }
  c.grp.position.set(x, y, z); c.grp.quaternion.copy(q);
  c.sh.position.set(x + z * 0.35, y - z * 0.55, -c.R * 0.3 - 1);
  const k = 1 + z * 0.012; c.sh.scale.set(k, k, 1); c.sh.material.opacity = 0.4 / (1 + z * 0.05);
}

let env = null, coins = [], raf = 0;
function frame() {
  const now = performance.now();
  coins = coins.filter(c => {
    const t = (now - c.t0) / 1000;
    if (t > DURATION) { env.scene.remove(c.grp, c.sh); c.sh.geometry.dispose(); c.sh.material.dispose(); return false; }
    pose(env, c, t); return true;
  });
  env.renderer.render(env.scene, env.camera);
  raf = coins.length ? requestAnimationFrame(frame) : 0;
}

export function tossCoin(stake, freeze, o) {
  if (!env) env = init();
  if (coins.length > 5) { const o = coins.shift(); env.scene.remove(o.grp, o.sh); }
  const c = makeCoin(env, stake, o);
  coins.push(c);
  if (freeze != null) { pose(env, c, freeze); env.renderer.render(env.scene, env.camera); return c; }   // for testing
  if (!raf) raf = requestAnimationFrame(frame);
}

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.tossCoin = (stake, freeze, o) => { try { return tossCoin(stake, freeze, o); } catch (e) { console.warn("coin animation unavailable", e); window.tossCoin = null; } };
}
