// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The lamp drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// The lamp, drawn in the light's colour: its halo, the cone it throws, and
// segments that change hue when an effect runs.
const lpHalo = (id) => `<radialGradient id="lp-${id}" cx=".5" cy=".5" r=".5"><stop offset="0" class="lp-stop"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>`;
const lpBeam = (id) => `<linearGradient id="lp-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>`;
const lpMetal = (id, a = "#6f7882", b = "#e8ecf0") => `<linearGradient id="lp-${id}" x1="0" x2="1"><stop offset="0" stop-color="${a}"/><stop offset=".45" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient>`;
const LAMP_SVGS = {
  bulb: () => `<defs>${lpHalo("bH")}
<radialGradient id="lp-bG" cx=".42" cy=".38" r=".62"><stop offset="0" stop-color="#fff"/><stop offset=".45" class="lp-stop"/><stop offset="1" class="lp-stop" stop-opacity=".75"/></radialGradient>${lpMetal("bM")}</defs>
<circle class="lp-halo" cx="48" cy="38" r="44" fill="url(#lp-bH)"/>
<path d="M48 12 C63 12 72 23 72 36 C72 46 65 51 61 58 Q59 61 59 64 H37 Q37 61 35 58 C31 51 24 46 24 36 C24 23 33 12 48 12 Z" fill="url(#lp-bG)" stroke="#c5ccd3" stroke-width=".7"/>
<path d="M36 22 Q40 17 46 16" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
<rect x="37" y="64" width="22" height="5" rx="1.2" fill="#e9edf0" stroke="#c5ccd3" stroke-width=".6"/>
<path d="M38 69 H58 L57 81 Q57 84 54 84 H42 Q39 84 39 81 Z" fill="url(#lp-bM)"/>
<path d="M38.4 72 L57.6 70.6 M38.6 75.4 L57.4 74 M38.8 78.8 L57.2 77.4" stroke="#7c858f" stroke-width="1"/>
<path d="M44 84 H52 L50.5 88 H45.5 Z" fill="#3a4047"/>`,
  bedside: () => `<defs>${lpHalo("cH")}${lpBeam("cB")}
<linearGradient id="lp-cS" x1="0" x2="1"><stop offset="0" stop-color="#d8cdbb"/><stop offset=".5" stop-color="#f7f1e6"/><stop offset="1" stop-color="#cfc3af"/></linearGradient>
<radialGradient id="lp-cL" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" class="lp-stop"/></radialGradient>
<linearGradient id="lp-cV" x1="0" x2="1"><stop offset="0" stop-color="#3f6f8f"/><stop offset=".45" stop-color="#7fb2cf"/><stop offset="1" stop-color="#2f5670"/></linearGradient></defs>
<circle class="lp-halo" cx="48" cy="34" r="42" fill="url(#lp-cH)"/>
<path class="lp-beam" d="M22 50 L8 86 H88 L74 50 Z" fill="url(#lp-cB)"/>
<path d="M14 86 H82" stroke="#8a6d52" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="48" cy="84" rx="13" ry="2" fill="#000" opacity=".18"/>
<path d="M41 56 C33 60 33 76 40 82 H56 C63 76 63 60 55 56 Z" fill="url(#lp-cV)"/>
<path d="M30 18 H66 L76 50 H20 Z" fill="url(#lp-cS)" stroke="#bdb09a" stroke-width=".7"/>
<path class="lp-wash" d="M30 18 H66 L76 50 H20 Z" fill="url(#lp-cL)"/>
<ellipse cx="48" cy="50" rx="28" ry="2.6" fill="#fff" opacity=".55"/>
<ellipse class="lp-lit" cx="48" cy="50" rx="24" ry="1.8" opacity=".9"/>
<rect x="46.4" y="51.2" width="3.2" height="5.8" fill="#b89a5e"/>`,
  floor: () => `<defs>${lpHalo("fH")}${lpBeam("fB")}${lpMetal("fM", "#8b949d", "#f4f6f8")}
<linearGradient id="lp-fD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b4148"/><stop offset="1" stop-color="#1e2226"/></linearGradient></defs>
<circle class="lp-halo" cx="70" cy="36" r="36" fill="url(#lp-fH)"/>
<path class="lp-beam" d="M60 34 L46 88 H94 L80 34 Z" fill="url(#lp-fB)"/>
<path d="M22 84 C18 40 30 10 60 12 C68 12.5 70 18 70 24" fill="none" stroke="url(#lp-fM)" stroke-width="2.6" stroke-linecap="round"/>
<ellipse cx="22" cy="87" rx="12" ry="3" fill="#000" opacity=".18"/>
<path d="M12 84 Q12 80 22 80 Q32 80 32 84 Q32 87 22 87 Q12 87 12 84 Z" fill="#2b3036"/>
<path d="M58 34 C58 25 63 22 70 22 C77 22 82 25 82 34 Z" fill="url(#lp-fD)"/>
<ellipse class="lp-lit" cx="70" cy="34" rx="12" ry="2.2"/>`,
  torch: () => `<defs>${lpHalo("tH")}
<linearGradient id="lp-tU" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>
${lpMetal("tM", "#8b949d", "#f4f6f8")}${lpMetal("tB", "#7c858f", "#e3e7eb")}</defs>
<path class="lp-beam" d="M35 16 L14 0 H82 L61 16 Z" fill="url(#lp-tU)"/>
<circle class="lp-halo" cx="48" cy="18" r="26" fill="url(#lp-tH)"/>
<rect x="46.8" y="22" width="2.4" height="62" rx="1.2" fill="url(#lp-tM)"/>
<rect x="45.4" y="52" width="5.2" height="7" rx="1.6" fill="#3a4047"/>
<circle cx="48" cy="55.5" r="1.3" fill="#8f98a2"/>
<ellipse cx="48" cy="88" rx="14" ry="2.6" fill="#000" opacity=".16"/>
<path d="M36 86 Q36 83 48 83 Q60 83 60 86 Q60 88.4 48 88.4 Q36 88.4 36 86 Z" fill="#2b3036"/>
<path d="M34 15 H62 L52 23 H44 Z" fill="url(#lp-tB)" stroke="#8f98a2" stroke-width=".6" stroke-linejoin="round"/>
<ellipse class="lp-lit" cx="48" cy="15" rx="14" ry="1.8"/>`,
  pendant: () => `<defs>${lpHalo("pH")}${lpBeam("pB")}
<linearGradient id="lp-pD" x1="0" x2="1"><stop offset="0" stop-color="#2f6b5a"/><stop offset=".45" stop-color="#5fa98f"/><stop offset="1" stop-color="#245446"/></linearGradient></defs>
<path d="M18 4 H78" stroke="#b9c1c9" stroke-width="3" stroke-linecap="round"/>
<rect x="42" y="4" width="12" height="3" rx="1" fill="#8f98a2"/>
<circle class="lp-halo" cx="48" cy="50" r="40" fill="url(#lp-pH)"/>
<path class="lp-beam" d="M28 50 L10 92 H86 L68 50 Z" fill="url(#lp-pB)"/>
<path d="M48 7 V26" stroke="#3a4047" stroke-width="1"/>
<rect x="45" y="26" width="6" height="5" rx="1" fill="#3a4047"/>
<path d="M45 31 C34 33 27 41 26 50 H70 C69 41 62 33 51 31 Z" fill="url(#lp-pD)"/>
<path d="M26 50 Q48 53.4 70 50" fill="none" class="lp-litS" stroke-width="1.2" opacity=".9"/>
<path d="M42.6 50.4 Q48 54 53.4 50.4 Z" class="lp-lit"/>
<path d="M45 51.2 Q48 52.6 51 51.2" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/>`,
  strip: () => `<defs>${lpBeam("sB")}
<linearGradient id="lp-sW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99a6b"/><stop offset="1" stop-color="#8d6640"/></linearGradient></defs>
<rect x="0" y="10" width="96" height="80" rx="3" class="lp-wall"/>
<path class="lp-beam" d="M10 46 L2 90 H94 L86 46 Z" fill="url(#lp-sB)"/>
<rect x="8" y="38" width="80" height="8" rx="1.5" fill="url(#lp-sW)"/>
<rect x="20" y="24" width="10" height="14" rx="1" fill="#7c858f"/><rect x="32" y="20" width="8" height="18" rx="1" fill="#a85a3a"/><rect x="62" y="28" width="16" height="10" rx="2" fill="#4f7a96"/>
<g>${Array.from({ length: 12 }, (_, i) => `<rect class="lp-seg lp-lit" x="${10 + i * 6.4}" y="46" width="5.4" height="2.2" rx="1"/>`).join("")}</g>
<g class="lp-wash">${Array.from({ length: 12 }, (_, i) => `<ellipse class="lp-seg lp-lit" cx="${(12.7 + i * 6.4).toFixed(1)}" cy="55" rx="5" ry="7" opacity=".35"/>`).join("")}</g>`,
  // One spot alone throws a wider cone, several share the ceiling.
  spot: (c) => {
    const n = LAMP_SPOTS.includes(c.spots) ? c.spots : 1;
    const gap = { 1: 0, 2: 32, 3: 27, 4: 22 }[n];
    const w = { 1: 26, 2: 17, 3: 15, 4: 12 }[n];
    const xs = Array.from({ length: n }, (_, i) => 48 + (i - (n - 1) / 2) * gap);
    return `<defs>${lpBeam("gB")}</defs>
<rect x="0" y="6" width="96" height="10" class="lp-ceiling"/>
<path d="M0 16 H96" stroke="#c5ccd3" stroke-width=".8"/>
${xs.map((x) => `<path class="lp-beam" d="M${x - 5} 16 L${x - w} 90 H${x + w} L${x + 5} 16 Z" fill="url(#lp-gB)"/>
<ellipse cx="${x}" cy="16" rx="7" ry="2.4" fill="#aab3bc"/>
<ellipse class="lp-lit" cx="${x}" cy="16.6" rx="4.4" ry="1.5"/>`).join("")}
<path d="M4 90 H92" stroke="#c5ccd3" stroke-width="1.4"/>`;
  },
  panels: () => `<defs>${lpHalo("nH")}</defs>
<circle class="lp-halo" cx="48" cy="48" r="46" fill="url(#lp-nH)"/>
${[["24,58 36,37 48,58", 0], ["36,37 48,58 60,37", 1], ["48,58 60,37 72,58", 2], ["36,37 48,16 60,37", 3], ["48,58 60,79 72,58", 4], ["24,58 36,79 48,58", 5]]
    .map(([p, i]) => `<polygon class="lp-seg lp-lit" points="${p}" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" style="filter:hue-rotate(${i * 14 - 35}deg)"/>`).join("")}`,
  desk: () => `<defs>${lpBeam("dB")}${lpMetal("dM", "#3a4047", "#7c858f")}</defs>
<path class="lp-beam" d="M61 37 L50 86 H92 L81 37 Z" fill="url(#lp-dB)"/>
<path d="M6 86 H92" stroke="#8a6d52" stroke-width="3" stroke-linecap="round"/>
<path d="M14 84 Q14 80 22 80 Q30 80 30 84 Z" fill="#2b3036"/>
<path d="M22 80 L34 46 L66 27" fill="none" stroke="url(#lp-dM)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="34" cy="46" r="2.6" fill="#3a4047"/>
<path d="M61 37 C61 29 65 24.5 71 24.5 C77 24.5 81 29 81 37 Z" fill="#2b3036"/>
<circle cx="66" cy="27" r="2.3" fill="#3a4047"/>
<ellipse class="lp-lit" cx="71" cy="37" rx="10" ry="1.8"/>`,
  wall: () => `<defs>${lpHalo("oH")}
<radialGradient id="lp-oG" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#fff"/><stop offset="1" class="lp-stop"/></radialGradient></defs>
<rect x="0" y="4" width="34" height="88" fill="#d7c6ad"/>
<path d="M0 22 H34 M0 40 H34 M0 58 H34 M0 76 H34 M14 4 V22 M24 22 V40 M10 40 V58 M22 58 V76 M12 76 V92" stroke="#c2ae92" stroke-width=".8"/>
<circle class="lp-halo" cx="56" cy="50" r="38" fill="url(#lp-oH)"/>
<path d="M34 40 H46" stroke="#2b3036" stroke-width="3"/>
<path d="M44 28 L56 20 L68 28 Z" fill="#2b3036"/>
<rect x="46" y="28" width="20" height="34" fill="url(#lp-oG)" stroke="#2b3036" stroke-width="2"/>
<path d="M56 28 V62 M46 45 H66" stroke="#2b3036" stroke-width="1.2"/>
<path d="M44 62 H68 L64 68 H48 Z" fill="#2b3036"/>`,
};
// A spotlight on its spike in the grass, washing a shrub from below.
LAMP_SVGS.garden_spot = () => `<defs>${lpHalo("zH")}
<linearGradient id="lp-zB" x1="0" y1="1" x2=".8" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>
<radialGradient id="lp-zW" cx=".35" cy=".85" r=".8"><stop offset="0" class="lp-stop" stop-opacity=".85"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>
<radialGradient id="lp-zG" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4f8a3a"/><stop offset="1" stop-color="#2c5a22"/></radialGradient>
${lpMetal("zM", "#2b3036", "#6f7882")}</defs>
<path d="M62 84 V58" stroke="#6b4a2e" stroke-width="3.4" stroke-linecap="round"/>
<path d="M62 70 L54 62 M62 66 L70 58" stroke="#6b4a2e" stroke-width="1.8" stroke-linecap="round"/>
<path d="M36 46 C30 32 40 14 56 14 C66 8 82 14 84 28 C94 34 92 54 80 60 C72 66 50 66 42 60 C34 58 32 52 36 46 Z" fill="url(#lp-zG)"/>
<path d="M44 30 q4 -6 10 -6 M66 22 q6 -2 10 4 M76 44 q6 2 6 8" fill="none" stroke="#6fae54" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
<path class="lp-wash" d="M36 46 C30 32 40 14 56 14 C66 8 82 14 84 28 C94 34 92 54 80 60 C72 66 50 66 42 60 C34 58 32 52 36 46 Z" fill="url(#lp-zW)"/>
<path class="lp-beam" d="M30 56 L38 64 L94 26 L60 2 Z" fill="url(#lp-zB)"/>
${lpGrass()}
<path d="M24.6 74 L24.6 90 L23.4 94 L22.2 90 L22.2 74 Z" fill="#2b3036"/>
<circle cx="23.4" cy="74" r="2.6" fill="#3a4047"/>
<g transform="rotate(42 23.4 72)"><rect x="17.4" y="56" width="12" height="16" rx="2.4" fill="url(#lp-zM)"/>
<path d="M17.4 59 H29.4 M17.4 62 H29.4 M17.4 65 H29.4" stroke="#1e2226" stroke-width=".6"/>
<ellipse cx="23.4" cy="56" rx="6.6" ry="2.2" fill="#1e2226"/>
<ellipse class="lp-lit" cx="23.4" cy="56" rx="5" ry="1.6"/></g>
<circle class="lp-halo" cx="34.4" cy="59.4" r="11" fill="url(#lp-zH)"/>`;
// String lights in two swags between three hooks, Twinkly style: the bulbs
// twinkle while on, and with an effect each takes its own hue.
LAMP_SVGS.string = () => {
  const swag = (x0, x1, sag) => (u) => {
    const x = x0 + (x1 - x0) * u;
    return [x, 18 + sag * 4 * u * (1 - u)];
  };
  const pts = [];
  for (const [x0, x1, sag] of [[6, 48, 50], [48, 90, 44]]) {
    const f = swag(x0, x1, sag);
    for (let i = 1; i < 8; i++) pts.push(f(i / 8));
  }
  const wire = (x0, x1, sag) => `M${x0} 18 Q${(x0 + x1) / 2} ${18 + sag * 2} ${x1} 18`;
  return `<defs>${lpHalo("wH")}</defs>
<rect x="0" y="4" width="96" height="88" rx="3" class="lp-wall"/>
<path d="${wire(6, 48, 50)} ${wire(48, 90, 44)}" fill="none" stroke="#2f3a2f" stroke-width="1"/>
${[6, 48, 90].map((x) => `<circle cx="${x}" cy="18" r="1.8" fill="#8f98a2"/>`).join("")}
<g>${pts.map(([x, y], i) => `<rect x="${(x - .9).toFixed(1)}" y="${(y - .4).toFixed(1)}" width="1.8" height="1.8" fill="#2f3a2f"/>${lpTwBulb(x, y, i, 2.3)}`).join("")}</g>`;
};
// A light curtain in a window: wires hanging from a rod.
LAMP_SVGS.curtain = () => {
  const xs = [14, 26, 38, 50, 62, 74, 86];
  let i = 0;
  return `<defs>${lpHalo("wH")}</defs>
<rect x="4" y="8" width="88" height="82" rx="2" fill="#2a3a4c" stroke="#d7dce1" stroke-width="2.4"/>
<path d="M48 8 V90 M4 49 H92" stroke="#d7dce1" stroke-width="1.6"/>
<path d="M4 12 H92" stroke="#8f98a2" stroke-width="2" stroke-linecap="round"/>
${xs.map((x) => `<path d="M${x} 12 V84" stroke="#3b4a3b" stroke-width=".6"/>`).join("")}
<g>${xs.map((x, k) => Array.from({ length: 8 }, (_, j) => lpTwBulb(x, 15 + j * 9 + (k % 2) * 4, i++, 1.5)).join("")).join("")}</g>`;
};
// Icicle lights under a gutter: drops of uneven lengths.
LAMP_SVGS.icicle = () => {
  const lens = [3, 5, 2, 4, 6, 3, 5, 2, 4, 3, 5];
  let i = 0;
  return `<defs>${lpHalo("wH")}</defs>
<rect x="0" y="14" width="96" height="80" class="lp-wall"/>
<path d="M-2 4 L48 -4 L98 4 V12 H-2 Z" fill="#8a4b38"/>
<rect x="0" y="11" width="96" height="4" rx="1.4" fill="#b9c1c9"/>
<path d="M2 16 H94" stroke="#2f3a2f" stroke-width=".9"/>
${lens.map((n, k) => { const x = 6 + k * 8.4; return `<path d="M${x.toFixed(1)} 16 V${16 + n * 8}" stroke="#2f3a2f" stroke-width=".6"/>`; }).join("")}
<g>${lens.map((n, k) => Array.from({ length: n }, (_, j) => lpTwBulb(6 + k * 8.4, 16 + j * 8, i++, 1.5)).join("")).join("")}</g>`;
};
// Festoon lights: big round bulbs on two swags, as over a terrace.
LAMP_SVGS.festoon = () => {
  const pts = [];
  for (const [x0, x1, sag] of [[4, 48, 34], [48, 92, 30]]) {
    for (let k = 1; k < 4; k++) { const u = k / 4; pts.push([x0 + (x1 - x0) * u, 12 + sag * 4 * u * (1 - u)]); }
  }
  return `<defs>${lpHalo("wH")}
<radialGradient id="lp-fG" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".5" class="lp-stop"/><stop offset="1" class="lp-stop" stop-opacity=".8"/></radialGradient></defs>
<path d="M4 12 Q26 80 48 12 Q70 72 92 12" fill="none" stroke="#2b3036" stroke-width="1.4"/>
${[4, 48, 92].map((x) => `<circle cx="${x}" cy="12" r="2.2" fill="#8f98a2"/>`).join("")}
<g>${pts.map(([x, y], i) => `<g class="lp-seg lp-tw" style="filter:hue-rotate(${(i * 47) % 360}deg)"><circle class="lp-halo" cx="${x.toFixed(1)}" cy="${(y + 12).toFixed(1)}" r="16" fill="url(#lp-wH)"/>
<rect x="${(x - 2.4).toFixed(1)}" y="${y.toFixed(1)}" width="4.8" height="5" rx=".9" fill="#2b3036"/>
<circle cx="${x.toFixed(1)}" cy="${(y + 11.4).toFixed(1)}" r="6.8" fill="url(#lp-fG)" stroke="#c5ccd3" stroke-width=".5"/>
<path d="M${(x - 3.2).toFixed(1)} ${(y + 8.4).toFixed(1)} q1.2 -2.2 3.6 -2.4" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".8"/></g>`).join("")}</g>`;
};
// Pixel squares on a wall, Twinkly Squares style: each pixel its own hue.
LAMP_SVGS.squares = () => {
  const tile = (tx, ty, k) => `<rect x="${tx}" y="${ty}" width="34" height="34" rx="2" fill="#1e2226"/>
${Array.from({ length: 36 }, (_, i) => { const c = i % 6, r = Math.floor(i / 6); return `<rect class="lp-seg lp-px lp-lit" x="${tx + 2.4 + c * 5}" y="${ty + 2.4 + r * 5}" width="4" height="4" rx=".6" style="filter:hue-rotate(${((c + r + k * 3) * 22) % 360}deg)"/>`; }).join("")}`;
  return `<defs>${lpHalo("qH")}</defs>
<rect x="0" y="4" width="96" height="88" rx="3" class="lp-wall"/>
<circle class="lp-halo" cx="48" cy="48" r="46" fill="url(#lp-qH)"/>
<g>${tile(12, 12, 0)}${tile(50, 12, 1)}</g><g>${tile(12, 50, 2)}${tile(50, 50, 3)}</g>`;
};
// A small garden post along a path: its glass head lights the stones.
LAMP_SVGS.bollard = () => `<defs>${lpHalo("yH")}
<radialGradient id="lp-yG" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fff"/><stop offset="1" class="lp-stop"/></radialGradient>
<radialGradient id="lp-yP" cx=".5" cy=".5" r=".5"><stop offset="0" class="lp-stop" stop-opacity=".8"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>
${lpMetal("yM", "#2b3036", "#5d6670")}</defs>
${lpGrass()}
<path d="M30 94 C38 88 58 88 66 94 Z" fill="#b8b2a6"/>
<ellipse cx="40" cy="91" rx="5" ry="1.6" fill="#cfc9bd"/><ellipse cx="54" cy="90.4" rx="4.4" ry="1.4" fill="#cfc9bd"/>
<ellipse class="lp-wash" cx="48" cy="88" rx="36" ry="7" fill="url(#lp-yP)"/>
<circle class="lp-halo" cx="48" cy="38" r="30" fill="url(#lp-yH)"/>
<ellipse cx="48" cy="87" rx="9" ry="2" fill="#000" opacity=".22"/>
<rect x="44" y="46" width="8" height="40" rx="1" fill="url(#lp-yM)"/>
<path d="M41 86 H55 L53 82 H43 Z" fill="#2b3036"/>
<rect x="41" y="44" width="14" height="3" rx="1" fill="#2b3036"/>
<rect x="40" y="29" width="16" height="15" rx="1.5" fill="url(#lp-yG)" stroke="#2b3036" stroke-width="1.4"/>
<path d="M44.6 29 V44 M51.4 29 V44" stroke="#2b3036" stroke-width=".9"/>
<path d="M36 29 Q48 20 60 29 Z" fill="#2b3036"/>
<rect x="46.6" y="20.4" width="2.8" height="3" rx="1" fill="#2b3036"/>`;
// A strip of lawn for the garden lights.
const lpGrass = () => `<path d="M0 84 Q48 80 96 84 V94 H0 Z" fill="#6f9e4a"/>
<path d="M0 86 Q48 82.4 96 86" fill="none" stroke="#8bbd5c" stroke-width="1"/>
${Array.from({ length: 16 }, (_, i) => `<path d="M${3 + i * 6} 85 l1.2 -3.6 l1.2 3.6" fill="none" stroke="#4f7d33" stroke-width=".9" stroke-linejoin="round"/>`).join("")}`;
// One small twinkling bulb on a wire, with its own hue for effects.
const lpTwBulb = (x, y, i, r = 1.8) => `<g class="lp-seg lp-tw" style="filter:hue-rotate(${(i * 47) % 360}deg)"><circle class="lp-halo" cx="${x.toFixed(1)}" cy="${(y + 3).toFixed(1)}" r="${(r * 3.2).toFixed(1)}" fill="url(#lp-wH)"/>
<ellipse class="lp-lit" cx="${x.toFixed(1)}" cy="${(y + 2.6).toFixed(1)}" rx="${r}" ry="${(r * 1.4).toFixed(1)}"/></g>`;
function lampHtml(cls, c) {
  const layout = LAMP_LAYOUTS.includes(c.layout) ? c.layout : "bulb";
  const flags = ["lp", `lp-l-${layout}`, `lp-m-${c.mode || "unav"}`, c.fx ? "lp-fx" : ""].filter(Boolean).join(" ");
  const rgb = Array.isArray(c.rgb) ? c.rgb : LAMP_WARM;
  // Dimmed down to a quarter, never out: a lamp at 1 % is still a lit lamp.
  const level = c.pct === null || c.pct === undefined ? 1 : 0.25 + 0.75 * Math.min(100, Math.max(0, c.pct)) / 100;
  return `
        <div class="machine ${cls} ${flags}" style="--lc:rgb(${rgb.join(",")});--lb:${level.toFixed(2)}"><svg class="lp-svg" viewBox="0 -6 96 108">${LAMP_SVGS[layout](c)}</svg></div>`;
}


return {
draw: (cls, ctx) => lampHtml(cls, ctx.lampDraw || {}),
css: () => `
        svg.lp-svg{position:absolute;left:0;top:0;width:96px;height:108px;overflow:hidden}
        .lp-halo{opacity:calc(var(--lb,1) * .85);transition:opacity .4s}
        .lp-beam{opacity:calc(var(--lb,1) * .55);transition:opacity .4s}
        .lp-wash{opacity:calc(var(--lb,1) * .5)}
        .lp-lit{fill:var(--lc)}
        .lp-litS{stroke:var(--lc)}
        .lp-stop{stop-color:var(--lc)}
        .lp-wall{fill:color-mix(in srgb,var(--primary-text-color,#212121) 6%,transparent)}
        .lp-ceiling{fill:color-mix(in srgb,var(--primary-text-color,#212121) 9%,transparent)}
        .lp-m-off .lp-halo,.lp-m-off .lp-beam,.lp-m-off .lp-wash,.lp-m-unav .lp-halo,.lp-m-unav .lp-beam,.lp-m-unav .lp-wash{opacity:0}
        .lp-m-off .lp-lit,.lp-m-unav .lp-lit{fill:#d9dee3}
        .lp-m-off .lp-litS,.lp-m-unav .lp-litS{stroke:#c5ccd3}
        .lp-m-off .lp-stop,.lp-m-unav .lp-stop{stop-color:#e3e7eb}
        .machine.lp-m-unav{opacity:.45;filter:grayscale(1)}
        .lp-fx .lp-seg{animation:lp-hue 3s linear infinite;animation-delay:var(--anim-offset,0s)}
        .lp-fx .lp-seg:nth-child(2n){animation-delay:-.6s}
        .lp-fx .lp-seg:nth-child(3n){animation-delay:-1.3s}
        .lp-fx .lp-seg:nth-child(5n){animation-delay:-2.1s}
        @keyframes lp-hue{to{filter:hue-rotate(360deg)}}
        .lp-m-on .lp-tw{animation:lp-tw 3s ease-in-out infinite}
        .lp-m-on .lp-tw:nth-child(2n){animation-delay:-.9s}
        .lp-m-on .lp-tw:nth-child(3n){animation-delay:-1.7s}
        .lp-m-on .lp-tw:nth-child(5n){animation-delay:-2.3s}
        .lp:not(.lp-fx) .lp-tw,.lp:not(.lp-fx) .lp-px{filter:none !important}
        .lp-fx.lp-m-on .lp-tw{animation:lp-tw 1.5s ease-in-out infinite,lp-hue 3s linear infinite}
        @keyframes lp-tw{0%,100%{opacity:1}50%{opacity:.45}}
        @media (prefers-reduced-motion: reduce) { .machine.lp * { animation-name: none !important; } }
  `,
};
}
