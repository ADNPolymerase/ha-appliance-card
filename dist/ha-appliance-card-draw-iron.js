// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The iron drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// Shared by the washer, the dryer, the oven and the microwave.
const AP_CSS = `
        svg.ap-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .ap-steam path { opacity: 0; transform-box: fill-box; transform-origin: center bottom; }
        @keyframes ap-glow { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes ap-steam { 0% { transform: translateY(0) scaleX(1); opacity: 0; } 30% { opacity: 0.6; } 100% { transform: translateY(-14px) scaleX(1.6); opacity: 0; } }
`;

// Washer, dryer, oven and microwave, drawn after real ones. They take the
// appliance colour through --ac-body, white by default for the laundry and a
// light frame for the cooking ones.
let apN = 0;
const apId = () => `ap${++apN}`;
const apSoft = (cx, cy, rx, ry, op = .22) => { const id = apId(); return `<filter id="${id}" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="2.2"/></filter><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// The colour of the line along the iron: orange, blue, or the iron's own.
const IRON_LINES = {
  orange: ["#f57c00", "#ffb74d"],
  blue: ["#1565c0", "#64b5f6"],
  body: ["var(--ac-body-lo, #aab3bc)", "var(--ac-body, #dfe5ec)"],
};
// A fixed scatter, so the steam looks random but stays put from one render to
// the next instead of jumping each time the state updates.
const irRnd = (n) => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
// Which of the eight clouds rise: three on a light draw, five on a fuller
// one, all eight at full power, two wisps when the iron is hot and waiting.
const IRON_STEAM = { 1: [1, 4, 6], 2: [0, 2, 3, 5, 7], 3: [0, 1, 2, 3, 4, 5, 6, 7], ready: [2, 5] };
// Where the soleplate burns when the iron has been left on.
const IRON_FIRE = [14, 27, 40, 53, 66, 79, 92, 104].map((x) => [x, 87]);
const irFlames = (x, y, s, i) => `<g class="ir-f${i % 3}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})">
<path class="ir-flick" d="M-16 0 Q-22 -14 -14 -22 Q-12 -14 -8 -12 Q-10 -24 0 -34 Q2 -22 8 -18 Q10 -26 16 -24 Q22 -12 14 0 Z" fill="#ff7043"/>
<path class="ir-flick" d="M-8 0 Q-12 -8 -6 -14 Q-4 -8 0 -8 Q0 -16 6 -20 Q8 -12 10 -8 Q14 -4 8 0 Z" fill="#ffca28"/></g>`;

// An iron in profile, nose to the left, after the classic steam irons: the
// steel soleplate, a shell in the appliance colour with a coloured line along
// it, the water tank at the front, the handle over the top with its two
// buttons, the temperature dial and the lamp. Heating, the soleplate turns
// red and steam billows from under it; left on, it burns and the steam turns
// to black smoke. The body alone, without its cord or shadow, is the one the
// steam generator carries.
function ironBody(d, opt = {}) {
  const { cord = true, shadow = true } = opt;
  const b = apId(), o = apId(), pl = apId(), hot = apId(), tk = apId(), hl = apId(), sm = apId();
  const heat = d.heating || d.leftOn;
  const [ln, lnHi] = IRON_LINES[d.line] || IRON_LINES.orange;
  const body = "M12 81 C24 67 37 58 49 52 C53 36 67 26 88 25 H100 Q110 25 110 35 V81 Z";
  const hole = "M65 50 C68 42 76 37 87 37 H94 Q98 37 98 41 V47 Q98 51 94 51 H67 Q64 51 65 50 Z";
  // The clouds along the soleplate: all eight left on, as many as the iron
  // draws hard while it heats, and two thin wisps once it is hot and ready.
  const keep = d.leftOn || (d.heating && d.level >= 3) ? IRON_STEAM[3] : d.heating ? IRON_STEAM[d.level] || IRON_STEAM[3] : d.ready ? IRON_STEAM.ready : [];
  const steam = keep.length ? `<g fill="url(#${sm})">${keep.map((i) => {
    const r = (k) => irRnd(i * 7 + k), x = 12 + i * 12.5 + (r(1) - 0.5) * 8, y = 90 + r(2) * 3, k = (4.5 + r(3) * 4) * (heat ? 1 : 0.7);
    const st = `animation-duration: ${((1.5 + r(4) * 1.6) * (heat ? 1 : 1.8)).toFixed(2)}s; animation-delay: calc(${(-r(5) * 3).toFixed(2)}s + var(--anim-offset, 0s)); --dx: ${((r(6) - 0.7) * 12).toFixed(1)}px; --dy: ${(3 + r(7) * 7).toFixed(1)}px; --sc: ${(1.2 + r(8) * 0.8).toFixed(2)}`;
    return `<g class="ir-vapo" style="${st}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${k.toFixed(1)}"/><circle cx="${(x + k * 0.7).toFixed(1)}" cy="${(y + 1).toFixed(1)}" r="${(k * 0.7).toFixed(1)}"/><circle cx="${(x - k * 0.6).toFixed(1)}" cy="${(y + 1.5).toFixed(1)}" r="${(k * 0.6).toFixed(1)}"/></g>`;
  }).join("")}</g>` : "";
  return `<defs><linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".6" style="stop-color: var(--ac-body, #e6eaee)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #b4bdc6)"/></linearGradient>
<linearGradient id="${o}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color: ${lnHi}"/><stop offset="1" style="stop-color: ${ln}"/></linearGradient>
<linearGradient id="${pl}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eceff1"/><stop offset=".45" stop-color="#b0bec5"/><stop offset="1" stop-color="#546e7a"/></linearGradient>
<linearGradient id="${hot}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7043"/><stop offset="1" stop-color="#d84315"/></linearGradient>
<linearGradient id="${tk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3f2fd" stop-opacity=".7"/><stop offset=".45" stop-color="#bbdefb" stop-opacity=".7"/><stop offset=".46" stop-color="#64b5f6" stop-opacity=".8"/><stop offset="1" stop-color="#1e88e5" stop-opacity=".85"/></linearGradient>
<linearGradient id="${hl}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="${sm}" cx=".45" cy=".4" r=".6">${d.leftOn ? `<stop offset="0" stop-color="#424242"/><stop offset=".55" stop-color="#212121" stop-opacity=".85"/><stop offset="1" stop-color="#000" stop-opacity="0"/>` : `<stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#dfe6ea"/><stop offset="1" stop-color="#b0bec5" stop-opacity="0"/>`}</radialGradient></defs>
${shadow ? apSoft(60, 95, 50, 3, 0.24) : ""}
${cord ? `<path d="M110 40 Q118 42 120 52" stroke="#78909c" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M107 36 h6 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-6 Z" fill="#90a4ae"/>` : ""}
<path class="ir-plate" d="M8 88 Q11 81 22 80 H110 V86 Q110 89 107 89 H10 Q7 89 8 88 Z" fill="url(#${heat ? hot : pl})" stroke="rgba(0,0,0,.25)" stroke-width=".5"/>
<path d="M14 83.5 H106" stroke="#fff" stroke-width=".8" opacity="${heat ? 0.35 : 0.7}"/>
<path class="ir-body" fill-rule="evenodd" d="${body} ${hole}" fill="url(#${b})" stroke="rgba(0,0,0,.22)" stroke-width=".6"/>
<path class="ir-line" d="M13 80.6 C25 69 39 63 58 61 H110 V70 H60 C44 71 30 75 18 80.6 Z" fill="url(#${o})"/>
<path d="M26 74 C38 67 50 64 66 63.5 H104" stroke="url(#${hl})" stroke-width="1.2" fill="none" stroke-linecap="round"/>
<path class="ir-tank" d="M22 72 C30 63 40 57 49 53 L53 60 C44 62 35 67 28 73 Z" fill="url(#${tk})" stroke="rgba(30,136,229,.4)" stroke-width=".4"/>
<path d="M56 34 C62 29 70 27 80 26.5" stroke="#fff" stroke-width="1.6" fill="none" opacity=".9" stroke-linecap="round"/>
<path d="${hole}" fill="none" stroke="#000" stroke-width=".6" opacity=".15"/>
<ellipse cx="58" cy="38" rx="3.6" ry="2.4" transform="rotate(-30 58 38)" style="fill: ${lnHi}" stroke="rgba(0,0,0,.2)" stroke-width=".4"/><ellipse cx="64" cy="33" rx="3" ry="2" transform="rotate(-20 64 33)" style="fill: ${ln}" stroke="rgba(0,0,0,.2)" stroke-width=".4"/>
<ellipse cx="82" cy="56" rx="7" ry="2.6" fill="#eceff1" stroke="rgba(0,0,0,.25)" stroke-width=".5"/><path d="M82 54.2 v2.4" style="stroke: ${ln}" stroke-width="1.2" stroke-linecap="round"/>
<circle cx="104" cy="56" r="1.7" fill="${heat ? "#ff5252" : "#b0bec5"}"/>${heat ? `<circle class="ir-glow" cx="104" cy="56" r="3.2" fill="#ff5252" opacity=".35"/>` : ""}
${steam}`;
}

function ironSvg(d) {
  apN = 0;
  return `<svg class="ap-svg ir-svg" viewBox="0 -10 120 135" aria-hidden="true">${ironBody(d)}${d.leftOn ? IRON_FIRE.map(([x, y], i) => irFlames(x, y, i % 2 ? 0.3 : 0.34, i)).join("") : ""}</svg>`;
}

// A steam generator, after the Calor Pro Express: a low cradle at the back
// and a tall water tank at the front, a slope between them where the iron
// lies when it is off, the lamp at the front and the hose looping from the
// back of the base to the heel of the iron. Heating, the iron lifts off the
// slope nose up, steam billows under it and runs along the hose.
function generatorSvg(d) {
  apN = 0;
  const b = apId(), tk = apId(), hz = apId(), glow = apId();
  const heat = d.heating || d.leftOn;
  // The iron, mirrored so its nose points right, scaled and turned nose up
  // along the slope; its heel sits on the cradle, lifted off it when it heats.
  const S = 0.74, deg = -37, A = deg * Math.PI / 180;
  const rs = ([x, y]) => { const u = (120 - x) * S, v = y * S; return [u * Math.cos(A) - v * Math.sin(A), u * Math.sin(A) + v * Math.cos(A)]; };
  const h0 = rs([108, 89]), lift = heat ? [-5, -13] : [0, 0], T = [30 + lift[0] - h0[0], 90.5 + lift[1] - h0[1]];
  const at = (pt) => { const [x, y] = rs(pt); return [T[0] + x, T[1] + y]; };
  const [hx, hy] = at([111, 41]);
  const hose = `M${hx.toFixed(1)} ${hy.toFixed(1)} C${(hx - 20).toFixed(1)} ${(hy - 2).toFixed(1)} -1 101 11 100.5`;
  return `<svg class="ap-svg ir-svg" viewBox="0 -10 120 135" aria-hidden="true"><defs><linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #f3f6fa)"/><stop offset=".6" style="stop-color: var(--ac-body, #dfe5ec)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #9fb0c2)"/></linearGradient>
<linearGradient id="${tk}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b3d4f5" stop-opacity=".55"/><stop offset=".42" stop-color="#90c2f0" stop-opacity=".6"/><stop offset=".43" stop-color="#2f7fd6" stop-opacity=".8"/><stop offset="1" stop-color="#15489a" stop-opacity=".9"/></linearGradient>
<radialGradient id="${glow}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="${heat ? "#ff8a65" : "#cfd8dc"}"/><stop offset="1" stop-color="${heat ? "#d84315" : "#78909c"}"/></radialGradient>
<linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#78909c"/><stop offset="1" stop-color="#455a64"/></linearGradient></defs>
${apSoft(60, 111, 54, 3.4, 0.22)}
<path class="gen-hose" d="${hose}" stroke="url(#${hz})" stroke-width="3.6" fill="none" stroke-linecap="round"/>
${heat ? `<path class="ir-flow" d="${hose}" stroke="#fff" stroke-width="1.1" stroke-dasharray="2 4" fill="none" stroke-linecap="round" opacity=".8"/>` : ""}
<path class="gen-base" d="M14 108 Q7 108 7 100 Q7 93 15 92 H30 L86 49.6 Q92 45 100 45.5 Q110 47 112 56 L114 101 Q114 108 107 108 Z" fill="url(#${b})" stroke="rgba(0,0,0,.25)" stroke-width=".6"/>
<path d="M15.5 94.2 H31 L86.5 52" stroke="#3a4a6b" stroke-width="2" fill="none" stroke-linecap="round" opacity=".75"/>
<path class="gen-tank" d="M56 96 L87.5 56 Q92 51 98.5 51.5 Q106 52.5 107.5 59 L108.5 96 Z" fill="url(#${tk})" stroke="rgba(21,72,154,.55)" stroke-width=".6"/>
<path d="M90 58 Q94 54.5 99.5 55" stroke="#fff" stroke-width="1.3" fill="none" opacity=".75" stroke-linecap="round"/>
<path d="M56 96 H108.5" stroke="#3a4a6b" stroke-width="1.6" opacity=".6"/>
<rect x="22" y="99" width="22" height="5" rx="2" fill="#000" opacity=".12"/>
<circle cx="13" cy="100" r="2" fill="#3a4a6b" opacity=".8"/>
${heat ? `<circle class="ir-glow" cx="80" cy="99" r="8" fill="#ff8a65" opacity=".35"/>` : ""}
<circle cx="80" cy="99" r="5" fill="url(#${glow})" stroke="rgba(0,0,0,.3)" stroke-width=".5"/>
<path d="M14 108 H107" stroke="#2b3037" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>
<g transform="translate(${T[0].toFixed(2)} ${T[1].toFixed(2)}) rotate(${deg}) scale(${S}) translate(120 0) scale(-1 1)">${ironBody(d, { cord: false, shadow: false })}</g>
${d.leftOn ? IRON_FIRE.map(at).map(([x, y], i) => irFlames(x, y, i % 2 ? 0.24 : 0.27, i)).join("") : ""}
</svg>`;
}


return {
draw: (cls, ctx) => {
    const ir = ctx.iron || { mode: ctx.heating ? "heating" : "off", level: 3 };
    const d = { heating: ir.mode === "heating", ready: ir.mode === "ready", level: ir.level || 3, leftOn: !!ctx.leftOn, line: ctx.ironLine };
    return `
        <div class="machine ${cls} ${ctx.ironLayout} ${ctx.leftOn ? "left-on" : ""} ${d.ready ? "ready" : ""}">${ctx.ironLayout === "generator" ? generatorSvg(d) : ironSvg(d)}</div>`;
  },
css: () => `${AP_CSS}
        .ir-vapo { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .machine.heating .ir-vapo, .machine.left-on .ir-vapo { animation: ir-vapo 2s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.ready .ir-vapo { animation: ir-vapo 3.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); opacity: 0; }
        .machine.ready:not(.left-on) .ir-vapo g, .machine.ready:not(.left-on) .ir-vapo circle { fill-opacity: 0.6; }
        @keyframes ir-vapo {
          0% { transform: translate(0, -3px) scale(0.35); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translate(var(--dx, -5px), var(--dy, 6px)) scale(var(--sc, 1.5)); opacity: 0; }
        }
        .ir-flick { transform-box: fill-box; transform-origin: center bottom; }
        .machine.left-on .ir-flick { animation: ir-flick 0.6s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.left-on .ir-f1 .ir-flick { animation-delay: calc(-0.25s + var(--anim-offset, 0s)); }
        .machine.left-on .ir-f2 .ir-flick { animation-delay: calc(-0.5s + var(--anim-offset, 0s)); }
        @keyframes ir-flick {
          0%, 100% { transform: scaleY(1) skewX(0deg); }
          33% { transform: scaleY(1.12) skewX(-4deg); }
          66% { transform: scaleY(0.92) skewX(4deg); }
        }
        .machine.heating .ir-glow { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ir-flow { animation: ir-flow 0.9s linear infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes ir-flow { to { stroke-dashoffset: 12; } }
  `,
};
}
