// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The towel_warmer drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing({ BATTERY_LAYOUTS, CAMERA_LAYOUTS, DIFFUSER_LAYOUTS, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NET_LAYOUTS, OVEN_DISHES, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, esc, ntFlake, t, zoneColumns }) {
// The unit's own screen shows the mode by a symbol next to the setpoint: the
// Material Design icons Home Assistant itself uses for them.
const AC_ICONS = {
  cool: "M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z",
  heat: "M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z",
  dry: "M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z",
  fan: "M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z",
  auto: "M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",
  sun: "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13",
  moon: "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95Z",
  rocket: "M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46Z",
  laundry: "M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21",
  shake: "M16,19H8V5H16M16.5,3H7.5A1.5,1.5 0 0,0 6,4.5V19.5A1.5,1.5 0 0,0 7.5,21H16.5A1.5,1.5 0 0,0 18,19.5V4.5A1.5,1.5 0 0,0 16.5,3M19,17H21V7H19M22,9V15H24V9M3,17H5V7H3M0,15H2V9H0V15Z",
  pause: "M14,19H18V5H14M6,19H10V5H6V19Z",
  check: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
  clock: "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z",
  warm: "M7.95,3L6.53,5.19L7.95,7.4H7.94L5.95,10.5L4.22,9.6L5.64,7.39L4.22,5.19L6.22,2.09L7.95,3M13.95,2.89L12.53,5.1L13.95,7.3L13.94,7.31L11.95,10.4L10.22,9.5L11.64,7.3L10.22,5.1L12.22,2L13.95,2.89M20,2.89L18.56,5.1L20,7.3V7.31L18,10.4L16.25,9.5L17.67,7.3L16.25,5.1L18.25,2L20,2.89M2,22V14A2,2 0 0,1 4,12H20A2,2 0 0,1 22,14V22H20V20H4V22H2Z",
};
// The small screen and the air lines the dehumidifier and the two heaters
// share. Warm air rises; the air a dehumidifier or a fan blows goes the other
// way along the same lines.
const MINI_LCD_CSS = `
        .mini-lcd {
          position: absolute; height: 9px; padding: 0 1.5px; border-radius: 1.5px;
          display: flex; align-items: center; justify-content: center; gap: 1px;
          background: rgba(10, 14, 18, 0.88); color: #7fdcff; text-shadow: 0 0 2px currentColor;
          font: 700 6.5px/9px ui-monospace, "SF Mono", Menlo, monospace;
        }
        .mini-lcd svg { width: 7px; height: 7px; flex: none; fill: currentColor; }
        .mini-lcd span:empty { display: none; }
        .machine.mode-off .mini-lcd { display: none; }
        .air-flow { position: absolute; display: none; overflow: visible; }
        .air-flow path {
          fill: none; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 4 5;
          animation: air-up 1.4s linear infinite; animation-delay: var(--anim-offset, 0s);
        }
        .air-flow path:nth-child(2) { animation-delay: calc(-0.45s + var(--anim-offset, 0s)); }
        .air-flow path:nth-child(3) { animation-delay: calc(-0.9s + var(--anim-offset, 0s)); }
        .air-flow.down path { animation-name: air-down; }
        @keyframes air-up { to { stroke-dashoffset: -18; } }
        @keyframes air-down { to { stroke-dashoffset: 18; } }
`;
function miniLcd(cls, icon, text) {
  const svg = AC_ICONS[icon] ? `<svg viewBox="0 0 24 24"><path d="${AC_ICONS[icon]}"/></svg>` : "";
  return `<div class="mini-lcd ${cls}">${svg}<span>${esc(text || "")}</span></div>`;
}
// Three wavy lines, drawn from the bottom up.
function airFlow(cls, w, h, down) {
  const line = (x) => `<path d="M${x} ${h} C${x - w * 0.1} ${h * 0.66} ${x + w * 0.1} ${h * 0.33} ${x} 0"/>`;
  return `<svg class="air-flow ${cls} ${down ? "down" : ""}" viewBox="0 0 ${w} ${h}">${line(w * 0.25)}${line(w * 0.5)}${line(w * 0.75)}</svg>`;
}

// Five appliances drawn in volume: a cooker with a clear jug, a Japanese rice
// cooker, a wall boiler (or one with a burner window), a bean-to-cup coffee
// machine (silver, or black and chrome) and a towel warmer (a white ladder, or
// flat anthracite panels). The ids carry a number of their own, as each card
// draws its gradients again; the words on their screens stay in HTML.
let drawN = 0;
const svgGrad = (id, stops, x2 = 1, y2 = 0) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" style="stop-color:${c}"/>`).join("")}</linearGradient>`;
// A towel over a bar: its shadow on the bars, the back half hanging a
// little lower and wider, the front flaring from the fold to a wavy hem, a
// woven band near the hem and a faint terry rib.
function twTowel(x, y, w, h, color, back) {
  const hem = (hy, r, l) => `C${r - w * 0.2} ${hy + 1.4} ${l + w * 0.55} ${hy - 1.6} ${l + w * 0.32} ${hy + 0.5} C${l + w * 0.15} ${hy + 1.1} ${l + 0.8} ${hy - 0.3} ${l} ${hy}`;
  const ribs = Array.from({ length: Math.floor(w / 3) }, (_, i) => `M${(3 + i * 3).toFixed(1)} 4.4 V${h - 9.5}`).join(" ");
  const vw = w + 3;
  return `<path d="M${x + 3.4} ${y + 3} H${x + w + 1.6} L${x + w + 3} ${y + h + 3.6} H${x + 2.4} Z" fill="rgba(0,0,0,.13)"/>
<svg class="tw-towel" x="${x}" y="${y}" width="${vw}" height="${h + 4}" viewBox="0 0 ${vw} ${h + 4}">
<path d="M3 3 H${w} L${w + 2.6} ${h + 1.6} ${hem(h + 1.6, w + 2.6, 1.6)} Z" fill="${back}"/>
<path d="M2.4 2.2 Q2.4 .3 5 .3 H${w - 2.4} Q${w} .3 ${w} 2.2 L${w + 1} ${h - 1} ${hem(h - 1, w + 1, 1.2)} Z" fill="${color}"/>
<path d="${ribs}" stroke="rgba(0,0,0,.05)" stroke-width="1"/>
<path d="M2.4 2.4 H${w} V5.4 Q${w / 2 + 1} 6.6 2.2 5.4 Z" fill="rgba(0,0,0,.14)"/><path d="M4.6 1.3 H${w - 2}" stroke="rgba(255,255,255,.6)" stroke-width=".8" stroke-linecap="round"/>
<path d="M1.6 ${h - 8.6} H${w + 0.8} M1.5 ${h - 6.4} H${w + 0.9}" stroke="rgba(255,255,255,.6)" stroke-width="1"/>
<path d="M3.4 7 L2.4 ${h - 3}" stroke="rgba(255,255,255,.38)" stroke-width="1.4" stroke-linecap="round"/><path d="M${w - 1.4} 7 L${w - 0.4} ${h - 3}" stroke="rgba(0,0,0,.13)" stroke-width="1.4" stroke-linecap="round"/></svg>`;
}
// A towel warmer: round bars in three groups between two uprights held off
// the wall by their brackets, a towel folded over one; or flat panels on one
// upright, a towel over the top one. The bars warm up in the colour of the
// mode. Both cast their shadow on the wall.
function towelSvg(layout) {
  const g = `dw${drawN++}`;
  const sheen = `<linearGradient id="${g}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>`;
  const box = (x, y, w, h, fill) => `<rect x="${x + 1.6}" y="${y + 2}" width="${w}" height="${h}" rx="2.5" fill="rgba(0,0,0,.1)"/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2.5" fill="${fill}" stroke="rgba(0,0,0,.18)" stroke-width=".7"/>
<path d="M${x + 2} ${y + 0.9} H${x + w - 2}" stroke="rgba(255,255,255,.6)" stroke-width=".7" stroke-linecap="round"/>
<path d="M${x + w / 2} ${y + h} V${y + h + 2.4} Q${x + w / 2} ${y + h + 4.6} ${x + w / 2 + 3} ${y + h + 4.6} H${x + w + 4}" fill="none" stroke="#9aa3ad" stroke-width="1.2" stroke-linecap="round"/>`;
  if (layout === "panel") {
    const ys = [16, 26, 36, 46, 56, 66, 76, 86];
    const shadow = ys.map((y) => `<rect x="25" y="${y + 2.6}" width="56" height="7" rx="1.5"/>`).join("");
    const slats = ys.map((y) => `<rect class="tw-bar" x="22" y="${y}" width="56" height="7" rx="1.5"/><rect x="22" y="${y}" width="56" height="7" rx="1.5" fill="url(#${g}g)"/><path d="M24 ${y + 0.7} H76" stroke="rgba(255,255,255,.35)" stroke-width=".6"/><path d="M23 ${y + 6.6} H77" stroke="rgba(0,0,0,.35)" stroke-width=".7"/><rect x="74" y="${y + 0.6}" width="3.4" height="5.8" rx="1.2" fill="rgba(0,0,0,.18)"/>`).join("");
    return `<svg class="tw-svg" viewBox="0 0 96 108"><defs>${sheen}${svgGrad(`${g}r`, [[0, "var(--ac-body-lo,#22262a)"], [0.5, "var(--ac-body-hi,#4a5158)"], [1, "var(--ac-body,#2b3036)"]])}</defs>
<g fill="rgba(0,0,0,.09)">${shadow}<rect x="23" y="16.6" width="5" height="86" rx="2"/></g>
<rect x="17.6" y="20" width="4" height="4" rx="1" fill="#7d868f"/><rect x="17.6" y="88" width="4" height="4" rx="1" fill="#7d868f"/>
${slats}
<rect class="tw-rail r1" x="20" y="14" width="5" height="86" rx="2" fill="url(#${g}r)"/><path d="M21.2 16 V98" stroke="rgba(255,255,255,.35)" stroke-width=".8" stroke-linecap="round"/>
${twTowel(40, 13, 26, 44, "#ef9a9a", "#d97f7f")}
${box(62, 93, 18, 10, `url(#${g}r)`)}</svg>`;
  }
  const ys = [18, 24, 30, 36, 48, 54, 60, 72, 78, 84];
  const shadow = ys.map((y) => `<rect x="23" y="${y + 2.6}" width="54" height="3.4" rx="1.7"/>`).join("");
  const bars = ys.map((y) => `<rect class="tw-bar" x="21" y="${y}" width="54" height="3.4" rx="1.7"/><rect x="21" y="${y}" width="54" height="3.4" rx="1.7" fill="url(#${g}g)"/>`).join("");
  const rail = (x, n) => `<rect class="tw-rail r${n}" x="${x}" y="12" width="6" height="86" rx="3" fill="url(#${g}r)"/><path d="M${x + 1.5} 14.4 V95.6" stroke="rgba(255,255,255,.85)" stroke-width=".9" stroke-linecap="round"/><ellipse cx="${x + 3}" cy="13.2" rx="2.4" ry=".9" fill="rgba(0,0,0,.12)"/>`;
  const collars = ys.map((y) => `<rect x="23.6" y="${y - 0.4}" width="1.4" height="4.2" rx=".6" fill="rgba(0,0,0,.1)"/><rect x="71" y="${y - 0.4}" width="1.4" height="4.2" rx=".6" fill="rgba(0,0,0,.1)"/>`).join("");
  return `<svg class="tw-svg" viewBox="0 0 96 108"><defs>${sheen}${svgGrad(`${g}r`, [[0, "var(--ac-body-lo,#c9d0d6)"], [0.4, "var(--ac-body-hi,#ffffff)"], [1, "var(--ac-body-lo,#b9c1c8)"]])}</defs>
<g fill="rgba(0,0,0,.08)">${shadow}<rect x="21" y="15" width="6" height="86" rx="3"/><rect x="75" y="15" width="6" height="86" rx="3"/></g>
${[[16, 22], [16, 90], [70, 22], [70, 90]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="3" rx="1.2" fill="#aeb6bd"/>`).join("")}
${bars}${collars}${rail(18, 1)}${rail(72, 2)}
${twTowel(33, 46.4, 30, 30, "#80cbc4", "#5fb3ab")}
${box(66, 90, 18, 12, `url(#${g}r)`)}</svg>`;
}


return {
draw: (cls, ctx) => {
    const w = ctx.towel || {};
    const layout = w.layout === "panel" ? "panel" : "ladder";
    return `
        <div class="machine ${cls} tw-l-${layout} mode-${w.mode || "off"}">
          ${airFlow("tw-air", 52, 14, false)}
          ${towelSvg(layout)}
          ${airFlow("tw-steam", 30, 22, false)}
          ${miniLcd("tw-lcd", w.icon, w.screen)}
        </div>`;
  },
css: () => `${MINI_LCD_CSS}
        .machine.mode-comfort .mini-lcd, .machine.mode-boost .mini-lcd, .machine.mode-drying .mini-lcd { color: #ffab76; }
        .machine.mode-eco .mini-lcd { color: #b39ddb; }
        .machine.mode-frost .mini-lcd { color: #81d4fa; }
        svg.tw-svg { position: absolute; left: 0; top: 0; width: 96px; height: 108px; overflow: visible; }
        .tw-bar { fill: var(--ac-body, #eef1f3); }
        .tw-l-panel .tw-bar { fill: var(--ac-body, #3a4047); }
        .machine.mode-comfort .tw-bar, .machine.mode-drying .tw-bar { fill: #ffab91; }
        .machine.mode-boost .tw-bar { fill: #ff5722; filter: drop-shadow(0 0 1.5px rgba(255, 87, 34, 0.8)); }
        .machine.mode-eco .tw-bar { fill: #ffccbc; }
        .tw-l-panel.mode-comfort .tw-bar, .tw-l-panel.mode-drying .tw-bar { fill: #8a4a3a; }
        .tw-l-panel.mode-boost .tw-bar { fill: #c0452a; }
        .tw-l-panel.mode-eco .tw-bar { fill: #5f4a45; }
        .tw-lcd { left: 68.5px; top: 92.5px; min-width: 13px; }
        .tw-l-panel .tw-lcd { left: 64px; top: 93.5px; }
        .tw-air { left: 22px; top: 0; width: 52px; height: 14px; }
        .machine.mode-comfort .tw-air, .machine.mode-boost .tw-air, .machine.mode-eco .tw-air { display: block; }
        .tw-air path, .tw-steam path { stroke: #ff8a65; }
        .machine.mode-eco .tw-air path { animation-duration: 2.6s; opacity: 0.6; }
        .machine.mode-boost .tw-air path { animation-duration: 0.7s; }
        .tw-steam { left: 33px; top: 24px; width: 30px; height: 22px; }
        .tw-l-panel .tw-steam { left: 40px; top: -6px; }
        .machine.mode-drying .tw-steam { display: block; }
  `,
};
}
