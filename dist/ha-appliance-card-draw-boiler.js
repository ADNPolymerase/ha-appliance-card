// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The boiler drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// A thermostat's light and flame, and a valve's radiator giving off its heat.
const TH_CSS = `
        @keyframes th-pulse { 0%, 100% { opacity: 0.35; } 50% { opacity: 1; } }
        .th-heat .th-pulse { animation: th-pulse 2s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .th-flame { transform-box: fill-box; transform-origin: center bottom; }
        .th-heat .th-flame { animation: th-flick 0.9s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes th-flick { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.12); } }
        .th-wave { opacity: 0; }
        .th-heat .th-wave { animation: th-wave 2.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .th-heat .th-wave.w2 { animation-delay: calc(-0.8s + var(--anim-offset, 0s)); }
        .th-heat .th-wave.w3 { animation-delay: calc(-1.6s + var(--anim-offset, 0s)); }
        @keyframes th-wave { 0% { transform: translateY(4px); opacity: 0; } 30% { opacity: 0.9; } 100% { transform: translateY(-10px); opacity: 0; } }
        .th-svg text, .bl-svg text { font-family: inherit; }
`;

// Five appliances drawn in volume: a cooker with a clear jug, a Japanese rice
// cooker, a wall boiler (or one with a burner window), a bean-to-cup coffee
// machine (silver, or black and chrome) and a towel warmer (a white ladder, or
// flat anthracite panels). The ids carry a number of their own, as each card
// draws its gradients again; the words on their screens stay in HTML.
let drawN = 0;
const svgGrad = (id, stops, x2 = 1, y2 = 0) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" style="stop-color:${c}"/>`).join("")}</linearGradient>`;
// The body in the appliance's colour, white unless one is chosen.
const BODY_STOPS = [[0, "var(--ac-body-lo,#dfe4e9)"], [0.45, "var(--ac-body-hi,#ffffff)"], [0.75, "var(--ac-body,#f1f4f6)"], [1, "var(--ac-body-lo,#cdd3d8)"]];

// The boiler's installation, the same under both boilers: the flow and
// return to a radiator, and the hot water to a tap.
// A tube with its sheen: the coloured pipe, then a thin light line along it.
const blTube = (cls, d, w = 2.4) => `<path class="${cls}" d="${d}" fill="none" stroke-width="${w}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="${(w * 0.3).toFixed(2)}" stroke-linecap="round" transform="translate(-.4 -.4)"/>`;
function boilerPipes(g) {
  const tube = (d, color) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/><path d="${d}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".7" stroke-linecap="round" transform="translate(-.4 0)"/>`;
  return `${blTube("bl-tap", "M34 64 V80 Q34 84 30 84 H20")}
${blTube("bl-flow", "M62 64 V78 Q62 82 66 82 H72")}
${tube("M56 64 V93 Q56 97 60 97 H72", "#64b5f6")}
${[34, 56, 62].map((x) => `<rect x="${x - 2.4}" y="64.4" width="4.8" height="2.6" rx=".8" fill="#9aa3ad"/><path d="M${x - 2} 65 H${x + 2}" stroke="rgba(255,255,255,.6)" stroke-width=".5"/>`).join("")}
<path d="M14.4 84.8 H9.8 Q6.6 84.8 6.6 88 V89.6" fill="none" stroke="#9aa3ad" stroke-width="2.6" stroke-linecap="round"/><path d="M14 84.2 H9.8 Q6 84.2 6 88" fill="none" stroke="rgba(255,255,255,.65)" stroke-width=".7" stroke-linecap="round"/>
<rect x="5" y="89.2" width="3.2" height="1.6" rx=".6" fill="#7d868f"/>
<rect x="16.2" y="76.4" width="1.8" height="4" fill="#9aa3ad"/>
<path d="M12.4 76.2 H21" stroke="#aeb6bd" stroke-width="2.2" stroke-linecap="round"/><path d="M12.6 75.6 H20.6" stroke="rgba(255,255,255,.7)" stroke-width=".6" stroke-linecap="round"/>
<circle cx="21.4" cy="76.2" r="1.5" fill="#e53935"/>
<rect x="13.6" y="80" width="7" height="8.4" rx="2.4" fill="url(#${g}t)" stroke="rgba(0,0,0,.2)" stroke-width=".5"/>
<circle class="bl-drop d1" cx="6.6" cy="92.4" r="1.3"/><circle class="bl-drop d2" cx="6.6" cy="92.4" r="1.1"/><circle class="bl-drop d3" cx="6.6" cy="92.4" r="1.2"/>
<rect x="72.5" y="78.6" width="22" height="24" rx="2" fill="rgba(0,0,0,.08)"/>
<rect class="bl-rad" x="70" y="76" width="22" height="24" rx="2"/>
${[72.6, 77.8, 83, 88.2].map((x) => `<rect x="${x}" y="77" width="4.4" height="22" rx="2.2" fill="rgba(255,255,255,.28)"/><path d="M${x + 1.2} 78.4 V97.6" stroke="rgba(255,255,255,.7)" stroke-width=".7" stroke-linecap="round"/><path d="M${x + 4.4} 78 V98" stroke="rgba(0,0,0,.14)" stroke-width=".7"/>`).join("")}
${[74, 81, 88].map((x, i) => `<path class="bl-wave w${i + 1}" d="M${x} 72 c-2.5 -3 2.5 -5 0 -8 c-2.5 -3 2.5 -5 0 -8"/>`).join("")}`;
}
// A gas flame: blue at the root, paling towards a tip that fades out, with a
// lighter core. Each flicks on its own.
const blFlame = (g, x, base, w, h, n) => {
  const tear = (ww, hh) => `M${x - ww / 2} ${base} C${x - ww * 0.62} ${base - hh * 0.45} ${x - ww * 0.18} ${base - hh * 0.78} ${x} ${base - hh} C${x + ww * 0.18} ${base - hh * 0.78} ${x + ww * 0.62} ${base - hh * 0.45} ${x + ww / 2} ${base} Q${x} ${base + ww * 0.22} ${x - ww / 2} ${base} Z`;
  return `<path class="bl-flame f${n}" d="${tear(w, h)}" fill="url(#${g}f)"/><path class="bl-flame f${n}" d="${tear(w * 0.55, h * 0.55)}" fill="url(#${g}q)"/>`;
};
const blBurner = (g, l, r, y, n, w, h) => {
  const step = (r - l) / n;
  return `<ellipse class="bl-glow" cx="${(l + r) / 2}" cy="${y - h * 0.3}" rx="${(r - l) / 2 + 1}" ry="${h * 0.62}" fill="url(#${g}a)"/>${Array.from({ length: n }, (_, i) => blFlame(g, l + step * (i + 0.5), y, w, h * [1, 0.86, 0.94][i % 3], (i % 3) + 1)).join("")}<ellipse class="bl-glow" cx="${(l + r) / 2}" cy="${y}" rx="${(r - l) / 2}" ry="1.2" fill="rgba(170,225,255,.8)"/><rect x="${l - 1}" y="${y + 0.4}" width="${r - l + 2}" height="2.2" rx="1.1" fill="#5d6570"/>${Array.from({ length: n }, (_, i) => `<circle cx="${l + step * (i + 0.5)}" cy="${y + 1.5}" r=".5" fill="#2a2f35"/>`).join("")}`;
};
// The case hung on the wall: its shadow on the wall, its depth showing on the
// top and the right, then the front.
function blCase(g, l, t, r, b, rad) {
  const dx = 3.6, dy = -2.4;
  return `<rect x="${l + 2.6}" y="${t + 3.2}" width="${r - l + dx}" height="${b - t}" rx="${rad}" fill="rgba(0,0,0,.07)"/><rect x="${l + 1.4}" y="${t + 1.8}" width="${r - l + dx}" height="${b - t}" rx="${rad}" fill="rgba(0,0,0,.07)"/>
<path d="M${l + rad * 0.3} ${t + rad * 0.3} L${l + rad * 0.3 + dx} ${t + rad * 0.3 + dy} H${r - rad * 0.3 + dx} V${b - rad * 0.3 + dy} L${r - rad * 0.3} ${b - rad * 0.3} Z" fill="url(#${g}e)"/>
<rect x="${l + dx}" y="${t + dy}" width="${r - l}" height="${b - t}" rx="${rad}" fill="url(#${g}e)"/>`;
}
function boilerSvg(layout) {
  const g = `dw${drawN++}`;
  const defs = `<defs>${svgGrad(`${g}w`, BODY_STOPS)}${svgGrad(`${g}e`, [[0, "var(--ac-body-lo,#c3cad1)"], [1, "var(--ac-body-lo,#aeb6bd)"]])}${svgGrad(`${g}t`, [[0, "#8f98a2"], [0.35, "#f1f3f4"], [0.7, "#c3cad1"], [1, "#7d868f"]])}${svgGrad(`${g}f`, [[0, "rgba(255,160,50,0)"], [0.12, "rgba(255,140,40,.85)"], [0.3, "rgba(255,165,60,.85)"], [0.46, "rgba(255,200,110,.5)"], [0.6, "rgba(110,150,255,.65)"], [0.85, "#2b6cff"], [1, "#1438b8"]], 0, 1)}${svgGrad(`${g}q`, [[0, "rgba(200,245,255,.2)"], [0.5, "#9be4ff"], [1, "#e8fbff"]], 0, 1)}<radialGradient id="${g}a" cx=".5" cy=".75" r=".6"><stop offset="0" stop-color="#4fc3f7" stop-opacity=".35"/><stop offset="1" stop-color="#4fc3f7" stop-opacity="0"/></radialGradient><radialGradient id="${g}r" cx=".38" cy=".32"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cfd5da"/></radialGradient></defs>`;
  if (layout === "window") {
    return `<svg class="bl-svg" viewBox="0 0 96 108">${defs}${boilerPipes(g)}${blCase(g, 24, 6, 72, 64, 4)}
<path class="bl-box" d="M24 10 Q24 6 28 6 H68 Q72 6 72 10 V60 Q72 64 68 64 H28 Q24 64 24 60 Z" fill="url(#${g}w)" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>
<path d="M27 7.2 H69" stroke="rgba(255,255,255,.95)" stroke-width="1" stroke-linecap="round"/><path d="M25.2 10 V60" stroke="rgba(255,255,255,.8)" stroke-width=".9" stroke-linecap="round"/><path d="M27 62.9 H69" stroke="rgba(0,0,0,.14)" stroke-width="1" stroke-linecap="round"/>
<rect x="29" y="11" width="38" height="24" rx="3.6" fill="#aeb6bd"/>
<rect x="30" y="12" width="36" height="22" rx="3" fill="#1a1d21" stroke="#5d6570" stroke-width=".7"/>
<path d="M31 13 H65 L62 16 H34 Z" fill="rgba(0,0,0,.45)"/>
${blBurner(g, 33, 63, 30.2, 5, 6.4, 15)}
<path d="M36 33.4 L45 12.6 H50 L41 33.4 Z" fill="rgba(255,255,255,.07)"/>
<circle cx="48" cy="49" r="10.6" fill="#c3cad1"/><circle cx="48" cy="49" r="9.5" fill="#14161a" stroke="#5d6570" stroke-width=".8"/>
<path d="M41.4 44 Q45 40.4 50 40.6" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1" stroke-linecap="round"/>
<circle cx="34" cy="49" r="3" fill="url(#${g}r)" stroke="#8f98a2" stroke-width=".6"/><circle cx="62" cy="49" r="3" fill="url(#${g}r)" stroke="#8f98a2" stroke-width=".6"/></svg>`;
  }
  return `<svg class="bl-svg" viewBox="0 0 96 108">${defs}${boilerPipes(g)}${blCase(g, 26, 6, 70, 64, 5)}
<rect class="bl-box" x="26" y="6" width="44" height="58" rx="5" fill="url(#${g}w)" stroke="rgba(0,0,0,.2)" stroke-width=".8"/>
<path d="M29.4 7.2 H66.6" stroke="rgba(255,255,255,.95)" stroke-width="1" stroke-linecap="round"/><path d="M27.2 10.6 V59.4" stroke="rgba(255,255,255,.8)" stroke-width=".9" stroke-linecap="round"/><path d="M29.4 62.9 H66.6" stroke="rgba(0,0,0,.14)" stroke-width="1" stroke-linecap="round"/>
<path d="M28 12 H68" stroke="rgba(0,0,0,.06)" stroke-width=".8"/>
<rect x="29.2" y="43.2" width="37.6" height="17.6" rx="3.6" fill="rgba(0,0,0,.12)"/>
<rect x="30" y="44" width="36" height="16" rx="3" fill="#2a2f35"/>
<path d="M31.4 59.4 H64.6" stroke="rgba(255,255,255,.18)" stroke-width=".7"/>
<rect x="32.5" y="47" width="14.5" height="10" rx="2" fill="#14161a"/>
<path class="bl-ico bl-ico-ch" d="M49.2 48.6 h1.5 v6.6 h-1.5z M51.4 48.6 h1.5 v6.6 h-1.5z M53.6 48.6 h1.5 v6.6 h-1.5z M48.8 49.6 h6.7 v.9 h-6.7z M48.8 53.3 h6.7 v.9 h-6.7z M49.4 55.2 h1.1 v.9 h-1.1z M53.8 55.2 h1.1 v.9 h-1.1z"/>
<path class="bl-ico bl-ico-hw" d="M59.2 48 h3.4 v.9 h-1.25 v1.2 h-.9 v-1.2 h-1.25z M58.6 50 h4.4 v1.8 h-2.8 v1.2 h-1.6z M63 49.3 h.9 v3.2 h-.9z M59.4 53.6 c.85 1.1 1.3 1.75 1.3 2.3 a1.3 1.3 0 0 1 -2.6 0 c0 -.55 .45 -1.2 1.3 -2.3z"/>
<circle cx="40" cy="28" r="7" fill="#aeb6bd"/><circle cx="40" cy="28" r="6" fill="url(#${g}r)" stroke="#8f98a2" stroke-width=".7"/><path d="M36.5 31 h7" stroke="#aeb6bd" stroke-width=".5"/>
<path class="bl-needle" d="M40 28 L40 23.5" stroke="#e53935" stroke-width="1.1" stroke-linecap="round"/><circle cx="40" cy="28" r=".9" fill="#5d6570"/>
<rect x="50" y="17" width="12" height="16" rx="3" fill="#1a1d21" stroke="#5d6570" stroke-width=".6"/><path d="M51 18 H61 L59.4 20 H52.6 Z" fill="rgba(0,0,0,.5)"/>
${blBurner(g, 52, 60, 29.8, 2, 4.2, 10.5)}</svg>`;
}

// Washer, dryer, oven and microwave, drawn after real ones. They take the
// appliance colour through --ac-body, white by default for the laundry and a
// light frame for the cooking ones.
let apN = 0;
const apId = () => `ap${++apN}`;
const apSoft = (cx, cy, rx, ry, op = .22) => { const id = apId(); return `<filter id="${id}" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// Four thermostats, drawn in a 120 by 135 box and centred on (60, 55): a
// white square with a dark screen (Netatmo, tado, Bosch CT100, Homematic), a
// steel ring around black glass that turns orange while it heats (Nest,
// Honeywell), black glass with a light bar (ecobee, Bosch CT200), and a
// radiator valve seen close up, its head standing out from the radiator at a
// right angle with its screen on its side. A thermostat makes no heat: only
// the valve's radiator shows it.
const thFlame = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})"><path class="th-flame" d="M0 0 C-4 -3 -3 -7 0 -11 C.6 -8 2.4 -7 3.4 -8 C5 -5 4.4 -1.6 0 0 Z" fill="#ff7043"/></g>`;
const thLeaf = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M-4 3 C-4 -3 1 -6 5 -6 C5 -1 2 3 -4 3 Z M-4 3 L2 -3" fill="#26a69a" stroke="#26a69a" stroke-width=".6"/></g>`;
const thWall = (cx, cy, w, h, r) => `<rect x="${cx - w / 2 + 2}" y="${cy - h / 2 + 3}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,.08)"/><rect x="${cx - w / 2 + 1}" y="${cy - h / 2 + 1.5}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,.06)"/>`;
const thText = (x, y, size, fill, text, weight = 600) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="${weight}" fill="${fill}">${esc(text)}</text>`;
function thermoDevice(d) {
  const on = d.mode !== "off", heat = d.mode === "heat", cool = d.mode === "cool";
  const accent = heat ? "#ff7043" : cool ? "#4fc3f7" : "#90a4ae";
  const mark = (x, y, k) => (heat ? thFlame(x, y, k) : d.eco ? thLeaf(x, y - 3, k) : "");
  if (d.layout === "round") {
    const r = apId(), gl = apId(), hot = apId();
    const ang = (t) => (-220 + (Math.max(5, Math.min(30, t)) - 5) / 25 * 260) * Math.PI / 180;
    const num = (v) => parseFloat(String(v).replace(",", "."));
    const room = num(d.room), target = num(d.target);
    const ticks = on ? Array.from({ length: 53 }, (_, i) => {
      const tv = 5 + i * 25 / 52, a = ang(tv);
      const lit = heat && tv > room && tv < target;
      return `<path d="M${(60 + 29 * Math.cos(a)).toFixed(2)} ${(55 + 29 * Math.sin(a)).toFixed(2)} L${(60 + 31 * Math.cos(a)).toFixed(2)} ${(55 + 31 * Math.sin(a)).toFixed(2)}" stroke="rgba(255,255,255,${lit ? 0.95 : 0.28})" stroke-width=".6"/>`;
    }).join("") : "";
    const tick = (tv, c, w) => { if (!isFinite(tv)) return ""; const a = ang(tv); return `<path d="M${(60 + 27 * Math.cos(a)).toFixed(2)} ${(55 + 27 * Math.sin(a)).toFixed(2)} L${(60 + 31 * Math.cos(a)).toFixed(2)} ${(55 + 31 * Math.sin(a)).toFixed(2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`; };
    return `<defs><linearGradient id="${r}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5f6f7"/><stop offset=".35" stop-color="#9aa3ad"/><stop offset=".55" stop-color="#e9edf0"/><stop offset="1" stop-color="#6d7680"/></linearGradient>
<radialGradient id="${gl}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#2a2f35"/><stop offset="1" stop-color="#07080a"/></radialGradient>
<radialGradient id="${hot}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ff9e55"/><stop offset="1" stop-color="#e8590c"/></radialGradient></defs>
<circle cx="62" cy="58" r="41" fill="rgba(0,0,0,.09)"/><circle cx="60" cy="55" r="41" fill="url(#${r})"/><circle cx="60" cy="55" r="36" fill="#3a4047"/>
<circle class="th-screen" cx="60" cy="55" r="34.5" fill="url(#${heat ? hot : gl})"/>
<path d="M38 34 A30 30 0 0 1 72 26" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2.5" stroke-linecap="round"/>
${ticks}${on ? tick(target, "#fff", 1.8) + tick(room, heat ? "rgba(255,255,255,.6)" : "#90a4ae", 1.2) : ""}
${on ? `${thText(60, 63, 22, "#fff", d.target || d.room, 500)}${heat ? thText(60, 76, 6.5, "rgba(255,255,255,.8)", "\u25b2", 500) : d.eco ? thLeaf(60, 46, 0.9) : ""}` : thText(60, 60, 10, "#6d7680", "OFF", 500)}`;
  }
  if (d.layout === "glass") {
    const b = apId(), sh = apId();
    return `<defs><linearGradient id="${b}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2c3238"/><stop offset=".5" stop-color="#121417"/><stop offset="1" stop-color="#050607"/></linearGradient>
<linearGradient id="${sh}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
${thWall(60, 55, 72, 72, 16)}<rect x="24" y="19" width="72" height="72" rx="16" fill="url(#${b})" stroke="#3d434a" stroke-width=".8"/>
<path d="M28 23 H62 L40 87 H28 Q26 87 26 85 V27 Q26 23 28 23 Z" fill="url(#${sh})"/>
${on ? `${thText(60, 58, 23, "#fff", d.room, 300)}${heat || d.eco ? mark(53, 74, 0.85) : `<circle cx="53" cy="71" r="2" fill="${accent}"/>`}
${thText(64, 74, 7.5, heat ? "#ffab91" : "#b0bec5", d.target ? `${d.target}\u00b0` : "", 400)}
<rect class="${heat ? "th-pulse" : ""}" x="44" y="83" width="32" height="1.6" rx=".8" fill="${heat ? "#ff7043" : accent}"/>` : `<rect x="44" y="83" width="32" height="1.6" rx=".8" fill="#3d434a"/>`}`;
  }
  if (d.layout === "valve") {
    const rad = apId(), hot = apId(), head = apId(), sc = apId(), br = apId(), cap = apId();
    const waves = heat ? [0, 1, 2].map((i) => `<path class="th-wave w${i + 1}" d="M${6 + i * 11} 34 c-2.5 -3 2.5 -5 0 -8 c-2.5 -3 2.5 -5 0 -8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`).join("") : "";
    return `<defs><linearGradient id="${rad}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9d0d6"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#b3bcc4"/></linearGradient>
<linearGradient id="${hot}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffab91"/><stop offset=".5" stop-color="#ffe0d6"/><stop offset="1" stop-color="#ff8a65"/></linearGradient>
<linearGradient id="${head}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".45" style="stop-color: var(--ac-body, #f3f5f7)"/><stop offset=".8" style="stop-color: var(--ac-body-lo, #d3d9de)"/><stop offset="1" stop-color="#aab3bc"/></linearGradient>
<radialGradient id="${cap}" cx=".35" cy=".35" r=".8"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #c9d0d6)"/></radialGradient>
<linearGradient id="${sc}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a2f35"/><stop offset="1" stop-color="#0d0f12"/></linearGradient>
<linearGradient id="${br}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dc9c"/><stop offset=".5" stop-color="#d4a94f"/><stop offset="1" stop-color="#9c7630"/></linearGradient></defs>
${apSoft(62, 121, 54, 3, 0.2)}
${[-8, 15].map((x) => `<rect x="${x}" y="-9" width="21" height="103" rx="10" fill="url(#${heat ? hot : rad})" stroke="rgba(0,0,0,.18)" stroke-width=".7"/><path d="M${x + 5} -3 V88" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity="${heat ? 0.6 : 0.95}"/>`).join("")}
<rect x="-8" y="80" width="44" height="8" fill="rgba(0,0,0,.06)"/>${waves}
<path d="M43 76 V125" stroke="#c9d0d6" stroke-width="7"/><path d="M41.6 76 V125" stroke="#fff" stroke-width="1.4"/>
<rect x="33" y="61" width="8" height="14" rx="1.6" fill="url(#${br})" stroke="#8a6526" stroke-width=".5"/><path d="M34.5 63 V73 M37 63 V73 M39.5 63 V73" stroke="rgba(0,0,0,.18)" stroke-width=".6"/>
<path d="M40 60 H50 Q53 60 53 63 V76 Q53 79 50 79 H40 Z" fill="url(#${br})" stroke="#8a6526" stroke-width=".6"/><path d="M42 62 H50" stroke="rgba(255,255,255,.7)" stroke-width="1" stroke-linecap="round"/>
<rect x="51" y="58" width="9" height="22" rx="1.4" fill="#e9edf0" stroke="rgba(0,0,0,.2)" stroke-width=".5"/><path d="M51 61 H60 M51 77 H60" stroke="rgba(0,0,0,.08)" stroke-width=".8"/>
<path class="th-head" d="M66 46 H104 A9 24 0 0 1 104 94 H66 A9 24 0 0 1 66 46 Z" fill="url(#${head})" stroke="rgba(0,0,0,.2)" stroke-width=".7"/>
<path d="M66 47 A8 23 0 0 1 66 93" fill="none" stroke="rgba(0,0,0,.1)" stroke-width=".9"/><path d="M93 46.4 A9 23.6 0 0 1 93 93.6" fill="none" stroke="rgba(0,0,0,.16)" stroke-width=".9"/>
<ellipse cx="104" cy="70" rx="9" ry="24" fill="url(#${cap})" stroke="rgba(0,0,0,.18)" stroke-width=".7"/><ellipse cx="104" cy="70" rx="5" ry="15" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="1"/>
${[96.5, 100, 103.5].map((x) => `<path d="M${x} 47 A9 23 0 0 1 ${x} 93" fill="none" stroke="rgba(0,0,0,.07)" stroke-width="1.1"/>`).join("")}
<path d="M64 50 H101" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
<rect x="66" y="56" width="20" height="16" rx="3" fill="url(#${sc})"/><path d="M67.5 57.3 H84.5 L82 60 H70 Z" fill="rgba(255,255,255,.08)"/>
${on ? `${thText(76, 67.4, 9, "#fff", d.room)}${thText(heat || d.eco ? 79 : 76, 81, 5.5, heat ? "#ff7043" : "#90a4ae", d.target ? `${d.target}\u00b0` : "", 400)}${mark(72, 81.6, 0.55)}` : thText(76, 66.6, 5.5, "#6d7680", "OFF")}
<circle class="${heat ? "th-pulse" : ""}" cx="89" cy="80" r="1.4" fill="${on ? accent : "#cfd8dc"}"/>`;
  }
  const b = apId(), g = apId();
  return `<defs><linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".6" style="stop-color: var(--ac-body, #eef1f4)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #c3cad1)"/></linearGradient>
<linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#262b31"/><stop offset="1" stop-color="#0f1114"/></linearGradient></defs>
${thWall(60, 55, 74, 74, 12)}<rect x="23" y="18" width="74" height="74" rx="12" fill="url(#${b})" stroke="rgba(0,0,0,.18)" stroke-width=".8"/>
<path d="M30 19.6 H90" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
<rect x="31" y="26" width="58" height="50" rx="6" fill="url(#${g})"/><path d="M33 27.6 H87 L82 33 H38 Z" fill="rgba(255,255,255,.06)"/>
${on ? `${thText(60, 56, 21, "#fff", d.room)}${thText(heat || d.eco ? 64 : 60, 70, 8, heat ? "#ffab91" : "#b0bec5", d.target ? `${d.target}\u00b0` : "", 400)}${mark(51, 70, 0.8)}` : thText(60, 56, 11, "#6d7680", "OFF")}
<circle class="${heat ? "th-pulse" : ""}" cx="60" cy="84" r="1.8" fill="${on ? accent : "#cfd8dc"}"/>`;
}
// The boiler steps back to the left and down, a little smaller, and its room
// thermostat goes on the wall beside it, its top level with the boiler's.
function boilerWithThermo(svg, d) {
  apN = 0;
  const open = svg.indexOf(">") + 1, close = svg.lastIndexOf("</svg>");
  const device = `<svg x="57" y="24.5" width="39" height="39" viewBox="19 14 82 82"><g class="th-dev${d.mode === "heat" ? " th-heat" : ""}">${thermoDevice(d)}</g></svg>`;
  return `${svg.slice(0, open)}<g transform="translate(-4 26) scale(.78)">${svg.slice(open, close)}</g>${device}</svg>`;
}


return {
draw: (cls, ctx) => {
    const mode = ctx.boilerMode || "idle";
    const layout = ctx.boilerLayout === "window" ? "window" : "wall";
    // A burner waiting its turn is out, like one on standby.
    const flame = mode !== "idle" && mode !== "waiting";
    const lcd = ctx.display ? `<div class="bl-lcd">${esc(ctx.display)}</div>` : "";
    const svg = ctx.boilerThermo ? boilerWithThermo(boilerSvg(layout), ctx.boilerThermo) : boilerSvg(layout);
    return `
        <div class="machine ${cls} bl-l-${layout} mode-${mode} ${flame ? "flame" : ""} ${ctx.boilerThermo ? "bl-th" : ""}">${svg}${lcd}</div>`;
  },
css: () => `${TH_CSS}
        .bl-th.bl-l-wall .bl-lcd { transform-origin: 0 0; transform: translate(-11.15px, 15.66px) scale(0.78); }
        .bl-th.bl-l-window .bl-lcd { transform-origin: 0 0; transform: translate(-12.36px, 16.32px) scale(0.78); }
        svg.bl-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .bl-lcd {
          position: absolute; left: 33px; top: 47px; width: 18px; height: 10px; border-radius: 2px;
          color: #4fc3f7; text-align: center; overflow: hidden; white-space: nowrap;
          font: 600 6.5px/10px ui-monospace, "SF Mono", monospace;
        }
        .bl-l-wall .bl-lcd { left: 32.5px; width: 14.5px; }
        .bl-l-window .bl-lcd { left: 38px; top: 44px; width: 20px; height: 10px; line-height: 10px; border-radius: 4px; }
        .bl-glow { opacity: 0; transition: opacity 0.4s; }
        .machine.flame .bl-glow { opacity: 1; }
        .machine.flame .bl-lcd { color: #ff7043; }
        .bl-flame { opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; }
        .machine.flame .bl-flame { opacity: 1; animation: bl-flicker 0.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.flame .bl-flame.f2 { animation-duration: 0.5s; animation-delay: calc(-0.2s + var(--anim-offset, 0s)); }
        .machine.flame .bl-flame.f3 { animation-duration: 0.7s; animation-delay: calc(-0.4s + var(--anim-offset, 0s)); }
        /* Lighting: a small flame, still growing. */
        .machine.mode-starting .bl-flame { scale: 0.55; }
        @keyframes bl-flicker {
          0%, 100% { transform: scale(1, 1); }
          30% { transform: scale(0.92, 1.1); }
          60% { transform: scale(1.06, 0.9); }
        }
        .bl-needle { transform-box: view-box; transform-origin: 40px 28px; transform: rotate(-35deg); transition: transform 0.6s; }
        .machine.flame .bl-needle { transform: rotate(15deg); }
        .bl-ico { fill: #3d4550; }
        .machine.mode-space_heating .bl-ico-ch, .machine.mode-hot_water .bl-ico-hw { fill: #ff8a50; }
        /* The pipe that carries the heat turns red: to the tap for hot water,
           to the radiator for the heating. */
        .bl-tap, .bl-flow { stroke: #9aa3ad; }
        .machine.mode-hot_water .bl-tap, .machine.mode-space_heating .bl-flow { stroke: #ef5350; }
        .bl-drop { fill: #4fc3f7; opacity: 0; }
        .machine.mode-hot_water .bl-drop { animation: bl-drip 0.9s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-hot_water .bl-drop.d2 { animation-delay: calc(-0.3s + var(--anim-offset, 0s)); }
        .machine.mode-hot_water .bl-drop.d3 { animation-delay: calc(-0.6s + var(--anim-offset, 0s)); }
        @keyframes bl-drip {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(11px); opacity: 0; }
        }
        .bl-rad { fill: var(--ac-body-lo, #d5dbe0); }
        .machine.mode-space_heating .bl-rad { fill: #ffb08f; }
        .bl-wave { fill: none; stroke: #ff8a50; stroke-width: 1.6; stroke-linecap: round; opacity: 0; }
        .machine.mode-space_heating .bl-wave { animation: bl-rise 2.4s ease-in infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.mode-space_heating .bl-wave.w2 { animation-delay: calc(-0.8s + var(--anim-offset, 0s)); }
        .machine.mode-space_heating .bl-wave.w3 { animation-delay: calc(-1.6s + var(--anim-offset, 0s)); }
        @keyframes bl-rise {
          0% { transform: translateY(6px); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-10px); opacity: 0; }
        }
  `,
};
}
