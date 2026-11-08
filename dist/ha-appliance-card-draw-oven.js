// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The oven drawing and its CSS, loaded by the card the first time it shows one.
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

// A built-in oven, after the Bosch Serie 8: a black glass door with a window
// on the cavity, the racks and a dish inside, the steel band with the screen
// and two knobs, framed in the appliance colour. Heating, the cavity glows
// and the top element pulses; its light alone lights it warm white. Opened,
// the door lies down in front of it.
function ovenSvg(d) {
  apN = 0;
  const g = apId(), cav = apId(), ch = apId(), hot = apId(), clip = apId();
  const h = d.heating, lit = h || d.lit;
  const dish = (OVEN_DISHES[d.dish] || OVEN_DISHES[0])(h);
  const inside = `<g clip-path="url(#${clip})">
<path d="M34 52 H86 M34 68 H86" stroke="${h ? "#ffcc80" : lit ? "#c9b48f" : "#7d8792"}" stroke-width=".8" opacity=".8"/>
<path class="ap-elem" d="M34 47 H86" stroke="${h ? "#ff5722" : "#5d6773"}" stroke-width="1.4"/>
${dish}${h ? `<ellipse class="ap-glow" cx="60" cy="64" rx="26" ry="14" fill="url(#${hot})"/>` : ""}</g>`;
  return `<svg class="ap-svg" viewBox="0 -10 120 135" aria-hidden="true"><defs>${apChrome(ch)}
<linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a434c"/><stop offset=".5" stop-color="#14191e"/><stop offset="1" stop-color="#05070a"/></linearGradient>
<radialGradient id="${cav}" cx=".5" cy=".4" r=".75"><stop offset="0" stop-color="${h ? "#ffb74d" : lit ? "#fff3d6" : "#56606b"}"/><stop offset=".6" stop-color="${h ? "#e65100" : lit ? "#d9b77a" : "#2b333c"}"/><stop offset="1" stop-color="${h ? "#5d1f00" : lit ? "#6b5330" : "#14191e"}"/></radialGradient>
<radialGradient id="${hot}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9800" stop-opacity=".5"/><stop offset="1" stop-color="#ff9800" stop-opacity="0"/></radialGradient>
<clipPath id="${clip}"><rect x="34" y="44" width="52" height="40" rx="3"/></clipPath></defs>
<rect class="ap-body" x="14" y="6" width="92" height="108" rx="4" style="fill: var(--ac-body, #e3e7eb)" stroke="#c4cbd2" stroke-width=".6"/>
${apSoft(60, 107, 40, 2.4, .25)}
<rect x="20" y="12" width="80" height="17" rx="3" fill="url(#${ch})"/><rect x="20" y="25" width="80" height="4" fill="url(#${ch})"/>
<circle cx="32" cy="20.5" r="5.2" fill="#2b333c"/><circle cx="32" cy="20.5" r="4" fill="url(#${ch})"/><path d="M32 20.5 L32 17" stroke="#2b333c" stroke-width="1" stroke-linecap="round"/>
<circle cx="88" cy="20.5" r="5.2" fill="#2b333c"/><circle cx="88" cy="20.5" r="4" fill="url(#${ch})"/><path d="M88 20.5 L90.5 18" stroke="#2b333c" stroke-width="1" stroke-linecap="round"/>
${apLcd(45, 15.5, 30, 10, d.screen, 7)}
${d.open ? `<rect x="20" y="29" width="80" height="77" rx="2" fill="#0d1115"/>
<rect class="ap-cavity" x="34" y="44" width="52" height="40" rx="3" fill="url(#${cav})"/>
${inside}
<path class="ap-door-open" d="M18 106 H102 L110 118 H10 Z" fill="url(#${g})"/><path d="M14 118 H106" stroke="#000" stroke-width="1" opacity=".3"/><rect x="34" y="111" width="52" height="2.6" rx="1.3" fill="url(#${ch})"/>`
    : `<rect x="20" y="29" width="80" height="77" rx="3" fill="url(#${g})"/>
<rect x="26" y="33" width="68" height="3.6" rx="1.8" fill="url(#${ch})"/>
<rect class="ap-cavity" x="34" y="44" width="52" height="40" rx="3" fill="url(#${cav})"/>
${inside}
<rect x="34" y="44" width="52" height="40" rx="3" fill="none" stroke="#000" stroke-width="1.2" opacity=".5"/>
<path d="M36 46 L50 82" stroke="#fff" stroke-width="4" opacity=".06"/>
${h ? apSteam([48, 60, 72], 66, 2) : ""}`}
</svg>`;
}


return {
draw: (cls, ctx) => {
    return `
        <div class="machine ${cls}">${ovenSvg({ screen: ctx.display || "", heating: !!ctx.heating, lit: !!ctx.lit, open: !!ctx.doorOpen, dish: ctx.dish || 0 })}</div>`;
  },
css: () => `${AP_CSS}
        /* Heating: the cavity glows, the top element pulses and a little
           steam rises from the dish. */
        .ap-lcd { fill: #9aa4ae; }
        .machine.heating .ap-lcd { fill: #ff8a65; }
        .machine.heating .ap-elem { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ap-glow { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ap-steam path { animation: ap-steam 2.6s ease-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.heating .ap-steam .apd2 { animation-delay: calc(-0.87s + var(--anim-offset, 0s)); }
        .machine.heating .ap-steam .apd3 { animation-delay: calc(-1.73s + var(--anim-offset, 0s)); }
  `,
};
}
