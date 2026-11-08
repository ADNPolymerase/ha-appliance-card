// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The microwave drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, thsColor, zoneColumns }) {
const NT_FONT = `font-family="Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"`;
// The text of a display fits its width: a long reading is drawn smaller.
const ntFit = (text, width, fs) => Math.min(fs, (width - 3) / Math.max(1, String(text || "").length * .6));

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
// A small screen, its text fitted to its width.
const apLcd = (x, y, w, h, text, fs, cls = "ap-lcd") => {
  const size = ntFit(text, w, fs);
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.4" fill="#10161d"/><rect x="${x + .6}" y="${y + .6}" width="${w - 1.2}" height="${(h * .38).toFixed(2)}" rx="1" fill="#fff" opacity=".06"/>`
    + (text ? `<text class="${cls}" x="${x + w / 2}" y="${(y + h / 2 + size * .36).toFixed(2)}" font-size="${size.toFixed(2)}" font-weight="700" text-anchor="middle" ${NT_FONT}>${esc(text)}</text>` : "");
};
const apChrome = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f9fb"/><stop offset=".35" stop-color="#9aa4ae"/><stop offset=".6" stop-color="#eef1f4"/><stop offset="1" stop-color="#7d8792"/></linearGradient>`;
const apSteam = (xs, y, w) => `<g class="ap-steam">${xs.map((x, i) => `<path class="apd${i + 1}" d="M${x} ${y} q${w} -2.5 0 -5 q-${w} -2.5 0 -5" stroke="#fff3e0" stroke-width="1.6" fill="none" stroke-linecap="round"/>`).join("")}</g>`;

// A countertop microwave, after the Samsung and Whirlpool ones: a dark door
// with a window on the turntable, the keypad on the right. While it runs the
// inside is lit and the dish goes round the plate, an ellipse seen from the
// front. Opened, the door swings out on its left hinges.
function microwaveSvg(d) {
  apN = 0;
  const b = apId(), cav = apId(), ch = apId(), clip = apId(), mesh = apId();
  const run = d.running;
  const dish = (MW_DISHES[d.dish] || MW_DISHES[0])();
  const food = `<g clip-path="url(#${clip})"><ellipse cx="46" cy="76" rx="20" ry="4.6" fill="#cfd6dd" opacity=".8"/>
<g class="ap-ttx"><g class="ap-tty">${dish}${run ? apSteam([42, 50], 62, 1.6) : ""}</g></g>
${d.open ? "" : `<rect x="18" y="42" width="56" height="40" fill="url(#${mesh})"/>`}</g>`;
  return `<svg class="ap-svg" viewBox="0 -10 120 135" aria-hidden="true"><defs>${apChrome(ch)}
<linearGradient id="${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color: var(--ac-body-hi, #e9edf1)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #b8c0c8)"/></linearGradient>
<radialGradient id="${cav}" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="${run ? "#ffe082" : d.open ? "#fff3d6" : "#59636e"}"/><stop offset=".7" stop-color="${run ? "#ffb300" : d.open ? "#d9c7a3" : "#2b333c"}"/><stop offset="1" stop-color="${run ? "#8d5a00" : d.open ? "#7a6a4f" : "#141a20"}"/></radialGradient>
<pattern id="${mesh}" width="2.2" height="2.2" patternUnits="userSpaceOnUse"><circle cx="1.1" cy="1.1" r=".5" fill="#000" opacity=".45"/></pattern>
<clipPath id="${clip}"><rect x="18" y="42" width="56" height="40" rx="3"/></clipPath></defs>
${apSoft(58, 99, 50, 3.6)}
<rect class="ap-body" x="10" y="32" width="100" height="64" rx="6" fill="url(#${b})" stroke="#9aa4ae" stroke-width=".5"/>
<path d="M14 34 H106" stroke="#fff" stroke-width="1.2" opacity=".8"/>
${d.open ? `<rect x="13" y="36" width="70" height="56" rx="4" fill="#2b333c"/>` : `<rect x="13" y="36" width="70" height="56" rx="4" fill="#14191e"/>`}
<rect class="ap-cavity" x="18" y="42" width="56" height="40" rx="3" fill="url(#${cav})"/>
${food}
${d.open ? `<path class="ap-door-open" d="M13 36 L1 30 V98 L13 92 Z" fill="#14191e" stroke="#2b333c" stroke-width=".6"/><path d="M4 36 V92" stroke="#fff" stroke-width="1" opacity=".15"/>`
    : `<path d="M20 44 L36 80" stroke="#fff" stroke-width="5" opacity=".07"/><rect x="79" y="40" width="2.4" height="48" rx="1.2" fill="url(#${ch})"/>`}
<rect x="86" y="36" width="20" height="56" rx="3" fill="#1d232a"/>
${apLcd(88, 40, 16, 8.6, d.screen, 5.6)}
${[0, 1, 2, 3].map((r) => [0, 1, 2].map((k) => `<rect x="${88.6 + k * 5.2}" y="${53 + r * 6}" width="4" height="4.2" rx="1" fill="#3a434c"/>`).join("")).join("")}
<rect class="ap-start" x="88.6" y="78" width="14.4" height="9" rx="2"/>
<rect x="18" y="96" width="8" height="2.6" rx="1" fill="#59616b"/><rect x="94" y="96" width="8" height="2.6" rx="1" fill="#59616b"/>
</svg>`;
}


return {
draw: (cls, ctx) => {
    return `
        <div class="machine ${cls}">${microwaveSvg({ screen: ctx.display || "", running: !!ctx.spinning, open: !!ctx.doorOpen, dish: ctx.dish || 0 })}</div>`;
  },
css: () => `${AP_CSS}
        /* Running, the plate turns the dish round an ellipse, seen from the
           front: two eased swings a quarter turn apart, left to right and
           back to front, a touch smaller at the back. */
        .ap-lcd { fill: #9aa4ae; }
        .machine.spinning .ap-lcd { fill: #69f0ae; }
        .ap-start { fill: #2e7d32; }
        .machine.spinning .ap-start { fill: #43a047; }
        .machine.spinning .ap-ttx { animation: ap-ttx 3s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .ap-tty { transform-box: fill-box; transform-origin: center bottom; }
        .machine.spinning .ap-tty { animation: ap-tty 3s ease-in-out infinite alternate; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .ap-tty { animation-delay: calc(-1.5s + var(--anim-offset, 0s)); }
        .machine.spinning .ap-steam path { animation: ap-steam 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .ap-steam .apd2 { animation-delay: calc(-0.87s + var(--anim-offset, 0s)); }
        @keyframes ap-ttx { from { transform: translateX(-7px); } to { transform: translateX(7px); } }
        @keyframes ap-tty { from { transform: translateY(1.6px) scale(1.04); } to { transform: translateY(-1.6px) scale(0.9); } }
  `,
};
}
