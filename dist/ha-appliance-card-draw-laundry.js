// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The laundry drawing and its CSS, loaded by the card the first time it shows one.
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
const apCabinet = (id) => `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" style="stop-color: var(--ac-body, #eef1f4)"/><stop offset=".25" style="stop-color: var(--ac-body-hi, #ffffff)"/><stop offset=".85" style="stop-color: var(--ac-body, #eef1f4)"/><stop offset="1" style="stop-color: var(--ac-body-lo, #c9d0d7)"/></linearGradient>`;
const apChrome = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7f9fb"/><stop offset=".35" stop-color="#9aa4ae"/><stop offset=".6" stop-color="#eef1f4"/><stop offset="1" stop-color="#7d8792"/></linearGradient>`;
const apFeet = (x1, x2, y) => `<rect x="${x1}" y="${y}" width="7" height="3" rx="1" fill="#59616b"/><rect x="${x2}" y="${y}" width="7" height="3" rx="1" fill="#59616b"/>`;
const AP_CLOTHES = { washer: ["#e57373", "#64b5f6", "#fff176"], dryer: ["#ce93d8", "#90caf9", "#a5d6a7"] };

// A front loader, after the Bosch Serie 6: the drawer, the screen and the
// dial on the panel, a round door with a chrome ring on the drum. While it
// washes the laundry turns in water the colour of its state; spinning, it
// whirls without water; drying, the drum glows warm. Opened, the door hangs
// on its two hinges.
function laundrySvg(type, d) {
  apN = 0;
  const c = apId(), ch = apId(), gl = apId(), drum = apId(), clip = apId(), warm = apId();
  // Water only while it washes: a drum at rest is drained, it can be opened.
  const dryer = type === "dryer", dry = dryer || d.drying, water = d.turning && !dryer && !d.drying && !d.spinCycle;
  // Turning, the laundry is spread round the drum; stopped, it has fallen
  // to the bottom.
  const at = d.turning ? [0, 120, 240].map((a) => a + (dryer ? 30 : 0)) : [145, 180, 215];
  const clothes = (AP_CLOTHES[dryer ? "dryer" : "washer"]).map((col, i) => `<g transform="rotate(${at[i]} 60 68)"><path d="M52 52 q9 -4 16 1 q3 6 -2 10 q-8 3 -14 -1 q-4 -5 0 -10 Z" fill="${col}"/><path d="M54 55 q6 -2 11 1" stroke="#fff" stroke-width=".8" opacity=".5" fill="none"/></g>`).join("");
  const panel = dryer
    ? `<rect x="31" y="13" width="22" height="12" rx="2.5" fill="#e8ecf0" stroke="#bcc4cc" stroke-width=".5"/><rect x="33" y="19" width="18" height="4" rx="1" fill="#bfe3f7" opacity=".9"/><path d="M38 16 H46" stroke="#9aa4ae" stroke-width="1" stroke-linecap="round"/>${apLcd(57, 15, 18, 9, d.screen, 6)}`
    : `<rect x="31" y="14" width="18" height="10" rx="2" fill="#e8ecf0" stroke="#bcc4cc" stroke-width=".5"/><path d="M34 21 H46" stroke="#9aa4ae" stroke-width="1.1" stroke-linecap="round"/>${apLcd(53, 15, 20, 9, d.screen, 6.4)}`;
  const door = d.open ? `<circle cx="60" cy="68" r="21" fill="#1a2027"/><circle cx="60" cy="68" r="19" fill="url(#${drum})"/>
${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4; return `<circle cx="${(60 + Math.cos(a) * 12).toFixed(1)}" cy="${(68 + Math.sin(a) * 12).toFixed(1)}" r="1" fill="#2b333c"/>`; }).join("")}
<circle cx="60" cy="68" r="25.5" fill="none" stroke="#c4cbd2" stroke-width="2.4"/>
<rect x="29" y="58" width="7" height="4" rx="1.4" fill="#8e98a2"/><rect x="29" y="74" width="7" height="4" rx="1.4" fill="#8e98a2"/>
<g class="ap-door-open"><ellipse cx="23" cy="68" rx="9" ry="26.5" style="fill: var(--ac-body-lo, #d9dee3)"/>
<ellipse cx="23" cy="68" rx="8.2" ry="25.5" fill="${dryer ? "#f4f6f8" : `url(#${ch})`}"/>
<ellipse cx="22" cy="68" rx="5.6" ry="20" fill="#141a20"/><ellipse cx="22" cy="68" rx="5" ry="18.5" fill="url(#${gl})"/>
<path d="M19 54 Q20 50 22.5 49" stroke="#fff" stroke-width="1.4" opacity=".45" fill="none" stroke-linecap="round"/>
<rect x="13.5" y="62" width="3" height="12" rx="1.5" fill="url(#${ch})"/></g>`
    : `<circle cx="60" cy="68" r="27" style="fill: var(--ac-body-lo, #d9dee3)"/>
${dryer ? `<circle cx="60" cy="68" r="25.5" style="fill: var(--ac-body-hi, #f4f6f8)" stroke="#c4cbd2" stroke-width=".6"/>` : `<circle cx="60" cy="68" r="25.5" fill="url(#${ch})"/>`}
<circle cx="60" cy="68" r="21" fill="#141a20"/>
<g clip-path="url(#${clip})"><circle cx="60" cy="68" r="19" fill="url(#${drum})"/>
${dry ? `<circle class="ap-warm" cx="60" cy="68" r="19" fill="url(#${warm})"/>` : ""}
<g class="ap-load"><circle cx="60" cy="68" r="19" fill="none"/>${clothes}</g>
${water ? `<path class="ap-water" d="M36 76 Q49 71 60 76 T84 76 V92 H36 Z"/>` : ""}</g>
<circle cx="60" cy="68" r="19" fill="url(#${gl})"/>
<path d="M47 57 Q53 51 62 50" stroke="#fff" stroke-width="2.2" opacity=".35" fill="none" stroke-linecap="round"/>
<rect x="84" y="62" width="5" height="12" rx="2" fill="url(#${ch})"/>`;
  return `<svg class="ap-svg ap-${dryer ? "dryer" : "washer"}" viewBox="0 -10 120 135" aria-hidden="true"><defs>${apCabinet(c)}${apChrome(ch)}
<radialGradient id="${gl}" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#9fb4c6" stop-opacity=".18"/><stop offset=".75" stop-color="#1d2a36" stop-opacity=".35"/><stop offset="1" stop-color="#0c1218" stop-opacity=".7"/></radialGradient>
<radialGradient id="${drum}" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="${dryer ? "#b8c0c8" : "#9aa4ae"}"/><stop offset="1" stop-color="${dryer ? "#4a525b" : "#3a434c"}"/></radialGradient>
<radialGradient id="${warm}" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#ffb74d" stop-opacity=".5"/><stop offset="1" stop-color="#ff7043" stop-opacity="0"/></radialGradient>
<clipPath id="${clip}"><circle cx="60" cy="68" r="19"/></clipPath></defs>
${apSoft(60, 113, 34, 3.4)}${apFeet(30, 83, 109)}
<rect class="ap-body" x="26" y="8" width="68" height="102" rx="5" fill="url(#${c})" stroke="#c4cbd2" stroke-width=".5"/>
<path d="M28 10 H92" stroke="#fff" stroke-width="1.4" opacity=".9"/>
<rect x="26" y="8" width="68" height="25" rx="5" fill="#000" opacity=".03"/><path d="M26 33 H94" stroke="#c4cbd2" stroke-width=".6"/>
${panel}
<circle cx="${dryer ? 84 : 83}" cy="20" r="6.4" fill="url(#${ch})"/><circle cx="${dryer ? 84 : 83}" cy="20" r="4.6" fill="#eef1f4" stroke="#aab3bc" stroke-width=".4"/><path class="ap-dial" d="M${dryer ? 84 : 83} 20 l${dryer ? -3 : 3} -3" stroke-width="1.1" stroke-linecap="round"/>
${door}
</svg>`;
}


return {
draw: (cls, ctx, type) => {
    // A washer-dryer empties its drum before it dries, so while it dries it is
    // a dryer: clothes turning in a warm drum. A spin empties it too, and the
    // clothes show, whirling with no water.
    const flags = [ctx.spinning ? "spinning" : "", ctx.drying ? "drying" : "", ctx.spinCycle ? "spin-cycle" : "", ctx.doorOpen ? "open" : ""].filter(Boolean).join(" ");
    return `
        <div class="machine ${flags}">${laundrySvg(type, { screen: ctx.display || "", turning: !!ctx.spinning, drying: !!ctx.drying, spinCycle: !!ctx.spinCycle, open: !!ctx.doorOpen })}</div>`;
  },
css: (color) => `${AP_CSS}
        /* The water takes the colour of the state; the laundry turns with
           the drum, much faster on a spin, and a dryer's drum glows warm. */
        .ap-lcd { fill: #4fc3f7; }
        .machine.drying .ap-lcd { fill: #ffb74d; }
        .ap-dial { stroke: #4fc3f7; }
        .ap-water { fill: ${color}; opacity: 0.8; transform-box: fill-box; transform-origin: center; transition: fill 1s linear; }
        .ap-load { transform-box: fill-box; transform-origin: center; }
        .ap-warm { opacity: 0; }
        .machine.spinning .ap-load { animation: ap-tumble 2.6s linear infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning.spin-cycle .ap-load { animation-duration: 0.7s; }
        .machine.spinning .ap-water { animation: ap-slosh 1.4s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        .machine.spinning .ap-warm { animation: ap-glow 1.8s ease-in-out infinite; animation-delay: var(--anim-offset, 0s); }
        @keyframes ap-tumble { to { transform: rotate(360deg); } }
        @keyframes ap-slosh { 0%, 100% { transform: translateX(-2px) rotate(-3deg); } 50% { transform: translateX(2px) rotate(3deg); } }
  `,
};
}
