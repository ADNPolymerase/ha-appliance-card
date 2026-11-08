// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The thermostat drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {
// Shared by the washer, the dryer, the oven and the microwave.
const AP_CSS = `
        svg.ap-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .ap-steam path { opacity: 0; transform-box: fill-box; transform-origin: center bottom; }
        @keyframes ap-glow { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes ap-steam { 0% { transform: translateY(0) scaleX(1); opacity: 0; } 30% { opacity: 0.6; } 100% { transform: translateY(-14px) scaleX(1.6); opacity: 0; } }
`;

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
function thermostatSvg(d) {
  apN = 0;
  return `<svg class="ap-svg th-svg" viewBox="0 -10 120 135" aria-hidden="true"><g class="th-dev${d.mode === "heat" ? " th-heat" : ""}">${thermoDevice(d)}</g></svg>`;
}

return {
draw: (cls, ctx) => {
    const d = ctx.thermo || { mode: "off", room: "", target: "", layout: "square" };
    return `
        <div class="machine ${cls} th-l-${d.layout} th-m-${d.mode}">${thermostatSvg(d)}</div>`;
  },
css: () => `${AP_CSS}${TH_CSS}`,
};
}
