// Built by tools/build.mjs from the files of src/: edit those, not this file.
// The lamp drawing and its CSS, loaded by the card the first time it shows one.
export default function defineDrawing(deps) {
// A page still running the card of an earlier release: an arrow to reload.
if (!deps || deps.__v !== "4.54.0") return { draw: () => '<div class="machine" style="display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.5">\u21bb</div>', css: "" };
let { ARC_BUTTONS, ARC_COLORS, BATTERY_LAYOUTS, CAMERA_LAYOUTS, CO2_ALERT, CO2_COLORS, CO2_WARN, DIFFUSER_LAYOUTS, DOOR_TRANS_S, EV_FLOW_DEFAULT, FR3, HRV_LAYOUTS, LAMP_LAYOUTS, LAMP_SPOTS, LAMP_WARM, LAPTOP_COLORS, MAILBOX_LAYOUTS, MAILBOX_MAX_LETTERS, MB3_PAL, MW_DISHES, NETATMO_COLORS, NET_LAYOUTS, OVEN_DISHES, RACK_TRANS_S, ROBOT_FLOORS, ROBOT_LAYOUTS, SCREEN_LAYOUTS, SCREEN_LIT, SCREEN_TABLETS, SHELTER_COLORS, SOLAR_LAYOUTS, T, TOASTER_LAYOUTS, TREE_PALETTES, co2LevelOf, esc, ntFlake, ntTint, numberOrNull, shdBlur, t, thsColor, zoneColumns } = deps;
const softShadow = (cx, cy, rx, ry, op = .26, b = 1.6) => { const id = `shd-${cx}-${cy}-${rx}`.replace(/\./g, "_"); return `${shdBlur(id, b)}<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#${id})"/>`; };
// The lamp, drawn in the light's colour: its halo, the cone it throws, and
// segments that change hue when an effect runs.
const lpHalo = (id) => `<radialGradient id="lp-${id}" cx=".5" cy=".5" r=".5"><stop offset="0" class="lp-stop"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>`;
const lpBeam = (id) => `<linearGradient id="lp-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>`;
// Where n spots sit across the drawing, centred, `gap` apart for each count.
const lpSpotRow = (c, gap) => {
  const n = LAMP_SPOTS.includes(c.spots) ? c.spots : 1;
  return Array.from({ length: n }, (_, i) => 48 + (i - (n - 1) / 2) * gap[n]);
};
const lpMetal = (id, a = "#6f7882", b = "#e8ecf0") => `<linearGradient id="lp-${id}" x1="0" x2="1"><stop offset="0" stop-color="${a}"/><stop offset=".45" stop-color="${b}"/><stop offset="1" stop-color="${a}"/></linearGradient>`;
// A wine barrel turned into a bar (HACF #200): staves and black hoops, an
// arched opening. Its light on, the bar is open: the lit shelf with the
// glasses stored upside down, a carafe and a shaker above, bottles below.
// Off, a plain curtain hangs over the opening, in the colour chosen.
function lpBarrelBar(c) {
  const n = (v) => +v.toFixed(2);
  let N = 0;
  const id = () => `lp-bb${++N}`;
  const open = c.mode === "on", lit = c.mode === "on";
  const lc = `rgb(${(Array.isArray(c.rgb) ? c.rgb : LAMP_WARM).join(",")})`;
  const CUR = { grey: ["#6b7078", "#8a9099", "#565b62"], beige: ["#b9a888", "#d6c7a8", "#a08f70"], red: ["#7a1f27", "#9e2d36", "#5c151b"], blue: ["#2c3e66", "#3e5585", "#1f2d4d"], green: ["#3d5a3a", "#527a4e", "#2c432a"], black: ["#26282c", "#383b40", "#1b1c1f"] };
  const [cm, ch, cl] = CUR[c.curtain] || CUR.grey;
  const wood = id(), inside = id(), light = id(), soft = id(), curtain = id(), clip = id(), top = id();
  // The barrel's outline: bulging in the middle.
  const L = (y) => n(20 - 6 * Math.sin(Math.PI * (y - 4) / 116)), R = (y) => n(100 + 6 * Math.sin(Math.PI * (y - 4) / 116));
  const outline = `M${L(8)} 8 Q${L(8) - 6} 62 ${L(118)} 118 Q60 126 ${R(118)} 118 Q${R(8) + 6} 62 ${R(8)} 8 Z`;
  const hoop = (y, w = 4) => `<path d="M${n(L(y) - .4)} ${y} Q60 ${n(y + 7)} ${n(R(y) + .4)} ${y} V${n(y + w)} Q60 ${n(y + w + 7)} ${n(L(y) - .4)} ${n(y + w)} Z" fill="#1d1e21"/><path d="M${n(L(y) - .4)} ${y} Q60 ${n(y + 7)} ${n(R(y) + .4)} ${y}" stroke="#55585e" stroke-width=".5" fill="none"/>`;
  const staves = Array.from({ length: 9 }, (_, i) => { const x = 26 + i * 8.5; return `<path d="M${x} 9 Q${n(x + (x - 60) * .12)} 62 ${x} 119" stroke="#5a3a1c" stroke-width=".5" fill="none" opacity=".55"/>`; }).join("");
  // The opening: an arch cut through the front staves.
  const ox0 = 32, ox1 = 88, oy0 = 34, oy1 = 104;
  const arch = `M${ox0} ${oy1} V${oy0 + 6} Q${ox0} ${oy0} ${ox0 + 6} ${oy0} H${ox1 - 6} Q${ox1} ${oy0} ${ox1} ${oy0 + 6} V${oy1} Q60 ${oy1 + 5} ${ox0} ${oy1} Z`;
  // The top shelf as in the photo: cocktail glasses stored upside down, a
  // carafe, a shaker, tumblers.
  const martini = (x, y, sc = 1) => { const w = 3.6 * sc, h = 5 * sc, st = 4.6 * sc, f = 2.2 * sc;
    return `<path d="M${n(x - w)} ${y} L${x} ${n(y - h)} L${n(x + w)} ${y} Z" fill="#e8f1f8" fill-opacity=".35" stroke="#b9c6d0" stroke-width=".35"/><path d="M${n(x - w)} ${y} Q${x} ${n(y + .9 * sc)} ${n(x + w)} ${y}" fill="none" stroke="#d6e0e7" stroke-width=".35"/><path d="M${x} ${n(y - h)} V${n(y - h - st)}" stroke="#c9d4dc" stroke-width=".5"/><ellipse cx="${x}" cy="${n(y - h - st)}" rx="${f}" ry="${n(.7 * sc)}" fill="#e8f1f8" fill-opacity=".6" stroke="#b9c6d0" stroke-width=".3"/><path d="M${n(x - w + .8)} ${n(y - .6)} L${n(x - .6)} ${n(y - h + 1)}" stroke="#fff" stroke-width=".35" opacity=".7"/>`; };
  const glasses = [37, 45.5, 54].map((x) => martini(x, 63, 1)).join("")
    + `<path d="M60 63 V54.5 Q60 52.6 61.4 51.8 V49.8 H65.4 V51.8 Q66.8 52.6 66.8 54.5 V63 Z" fill="#e3edf5" fill-opacity=".45" stroke="#aebcc8" stroke-width=".35"/><rect x="61" y="56.4" width="4.8" height="3" fill="#e9d35a" opacity=".9"/><rect x="61.8" y="57.8" width="3.2" height="1.4" fill="#c62828"/>`
    + `<path d="M69.2 63 V53 L70 50 H74.6 L75.4 53 V63 Z" fill="#c4ccd4"/><path d="M70 50 Q72.3 47.4 74.6 50 Z" fill="#aeb7c0"/><rect x="70.6" y="47" width="3.4" height="1.6" rx=".6" fill="#9aa3ad"/><path d="M70.4 53.4 V62" stroke="#fff" stroke-width=".6" opacity=".55"/>`;
  const bottleCols = ["#7a3b1d", "#2e6b2e", "#c9a227", "#e8eef2", "#5a2a14", "#9b1d1d", "#2c5f2d", "#d97b1a", "#3b3b3b"];
  const bottles = bottleCols.map((col, i) => { const x = 37 + i * 5.6, h = 16 + ((i * 7) % 9), y = 99 - h;
    return `<rect x="${n(x - 2.1)}" y="${y + 5}" width="4.2" height="${h - 5}" rx="1" fill="${col}" opacity=".92"/><rect x="${n(x - .8)}" y="${y}" width="1.6" height="5.4" fill="${col}"/><rect x="${n(x - .9)}" y="${y - .9}" width="1.8" height="1.2" fill="#2a2a2a"/>${i % 2 ? `<rect x="${n(x - 1.6)}" y="${y + 9}" width="3.2" height="4" fill="#f3e6c4" opacity=".85"/>` : ""}<rect x="${n(x - 1.6)}" y="${y + 6}" width=".7" height="${h - 8}" fill="#fff" opacity=".25"/>`; }).join("");
  const interior = `<clipPath id="${clip}"><path d="${arch}"/></clipPath><g clip-path="url(#${clip})">
<rect x="${ox0}" y="${oy0}" width="${ox1 - ox0}" height="${oy1 - oy0 + 6}" fill="url(#${inside})"/>
<path d="M${ox0} 64 H${ox1} L${ox1 - 3} 67 H${ox0 + 3} Z" fill="#b98a52"/><rect x="${ox0}" y="63" width="${ox1 - ox0}" height="1.4" fill="#d8ad74"/>
${glasses}${bottles}
${lit ? `<rect x="${ox0 + 2}" y="${oy0}" width="${ox1 - ox0 - 4}" height="1.6" fill="#fff6d8"/><path d="M${ox0 + 4} ${oy0 + 1} H${ox1 - 4} L${ox1} ${oy1} H${ox0} Z" fill="url(#${light})"/><path d="M${ox0 + 4} 65 H${ox1 - 4} L${ox1} ${oy1} H${ox0} Z" fill="url(#${light})" opacity=".7"/>` : `<rect x="${ox0}" y="${oy0}" width="${ox1 - ox0}" height="${oy1 - oy0 + 6}" fill="#000" opacity=".45"/>`}
</g>`;
  // The curtain: dark cloth, gathered at the top, its white dot pattern.
  const folds = Array.from({ length: 7 }, (_, i) => { const x = ox0 + 2 + i * 8; return `<path d="M${x} ${oy0 - 2} Q${x + 2.5} 70 ${x - 1} ${oy1 + 4}" stroke="#000" stroke-width="1.4" opacity=".22" fill="none"/>`; }).join("");
  const _unused = Array.from({ length: 26 }, (_, i) => { const a = i * 0.21 - 2.6, r = 18 + (i % 4) * 7; return `<path d="M52 44 L${n(52 + Math.cos(a) * r)} ${n(44 + Math.sin(a) * r * 1.2 + 20)}" stroke="#fff" stroke-width=".25" opacity=".55"/><circle cx="${n(52 + Math.cos(a) * r)}" cy="${n(44 + Math.sin(a) * r * 1.2 + 20)}" r=".7" fill="#fff" opacity=".8"/>`; }).join("");
  const curt = `<g clip-path="url(#${clip}c)"><path d="M${ox0 - 2} ${oy0 - 3} H${ox1 + 2} V${oy1 + 4} Q${ox1 - 6} ${oy1 + 9} ${ox1 - 14} ${oy1 + 6} Q60 ${oy1 + 10} ${ox0 + 10} ${oy1 + 7} Q${ox0 + 2} ${oy1 + 9} ${ox0 - 2} ${oy1 + 4} Z" fill="url(#${curtain})"/>${folds}<path d="M${ox0 - 2} ${oy0 - 3} H${ox1 + 2} V${oy0} H${ox0 - 2} Z" fill="${cl}"/>${Array.from({ length: 10 }, (_, i) => `<circle cx="${n(ox0 + 1 + i * 6.1)}" cy="${oy0 - 1.5}" r=".9" fill="#c9ced6"/>`).join("")}</g>
<clipPath id="${clip}c"><path d="M${ox0 - 2} ${oy0 - 3} H${ox1 + 2} V${oy1 + 12} H${ox0 - 2} Z"/></clipPath>`;
  return `<defs><linearGradient id="${wood}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b4320"/><stop offset=".3" stop-color="#a87341"/><stop offset=".6" stop-color="#9a6838"/><stop offset="1" stop-color="#5a3818"/></linearGradient>
<linearGradient id="${inside}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2614"/><stop offset="1" stop-color="#1e140b"/></linearGradient>
<linearGradient id="${light}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lc}" stop-opacity=".55"/><stop offset="1" stop-color="${lc}" stop-opacity="0"/></linearGradient>
<linearGradient id="${curtain}" x1="0" y1="0" x2="1" y2="0">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `<stop offset="${n(i / 8)}" stop-color="${i % 2 ? ch : cm}"/>`).join("")}<stop offset="1" stop-color="${cl}"/></linearGradient>
<linearGradient id="${top}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4e27"/><stop offset=".5" stop-color="#b07c48"/><stop offset="1" stop-color="#6b4320"/></linearGradient>
<filter id="${soft}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2"/></filter></defs>
<ellipse cx="60" cy="122" rx="46" ry="3.4" fill="#000" opacity=".2" filter="url(#${soft})"/>
${lit && open ? `<ellipse cx="60" cy="116" rx="30" ry="5" fill="${lc}" opacity=".35" filter="url(#${soft})"/>` : ""}
<path d="${outline}" fill="url(#${wood})"/>${staves}
<ellipse cx="60" cy="8" rx="${n(R(8) - 60)}" ry="5.4" fill="url(#${top})" stroke="#3a2614" stroke-width=".6"/><ellipse cx="60" cy="8" rx="${n(R(8) - 63)}" ry="4" fill="none" stroke="#5a3a1c" stroke-width=".5"/>
${hoop(10, 3.6)}${hoop(22)}
<path d="${arch}" fill="none" stroke="#3a2614" stroke-width="2.4"/>
${open ? interior : `<path d="${arch}" fill="#1a1208"/>`}
${!open ? curt : ""}
${hoop(108)}${hoop(116, 3)}
${lit && open ? `<path d="${arch}" fill="none" stroke="#ffe7a0" stroke-width=".8" opacity=".6"/>` : ""}`;
}
const LAMP_SVGS = {
  barrel_bar: (c) => `<g transform="translate(0 2) scale(.8)">${lpBarrelBar(c)}</g>`,
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
${softShadow(48, 83.4, 10.4, 2.8, 0.32)}
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
${softShadow(22, 86.4, 9.6, 3.8, 0.32)}
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
${softShadow(48, 87.4, 11.2, 3.4, 0.29)}
<path d="M36 86 Q36 83 48 83 Q60 83 60 86 Q60 88.4 48 88.4 Q36 88.4 36 86 Z" fill="#2b3036"/>
<path d="M34 15 H62 L52 23 H44 Z" fill="url(#lp-tB)" stroke="#8f98a2" stroke-width=".6" stroke-linejoin="round"/>
<ellipse class="lp-lit" cx="48" cy="15" rx="14" ry="1.8"/>`,
  // A tree floor lamp: adjustable heads up one pole, turning side to side.
  floor_tree: (c) => {
    const n = LAMP_SPOTS.includes(c.spots) ? c.spots : 3;
    const step = { 1: 0, 2: 16, 3: 14, 4: 12, 5: 10.5 }[n];
    const k = { 1: 1, 2: 1, 3: 0.95, 4: 0.82, 5: 0.72 }[n];
    const heads = Array.from({ length: n }, (_, i) => [i % 2 ? -1 : 1, 14 + i * step]);
    return `<defs>${lpBeam("eB")}${lpHalo("eH")}${lpMetal("eM", "#1e2226", "#4a525b")}</defs>
${heads.map(([d, y]) => `<g transform="translate(${48 + d * 7} ${y}) rotate(${-d * 35})${k < 1 ? ` scale(${k})` : ""}">
<circle class="lp-halo" cy="13" r="11" fill="url(#lp-eH)"/>
<path class="lp-beam" d="M-5.5 13 L-11 38 H11 L5.5 13 Z" fill="url(#lp-eB)"/></g>`).join("")}
<rect x="46.8" y="8" width="2.4" height="76" rx="1.2" fill="#2b3036"/>
${softShadow(48, 87.4, 11.2, 3.4, 0.29)}
<path d="M36 86 Q36 83 48 83 Q60 83 60 86 Q60 88.4 48 88.4 Q36 88.4 36 86 Z" fill="#2b3036"/>
${heads.map(([d, y]) => `<path d="M48 ${y} H${48 + d * 7}" stroke="#c5ccd3" stroke-width="1.8"/>
<g transform="translate(${48 + d * 7} ${y}) rotate(${-d * 35})${k < 1 ? ` scale(${k})` : ""}">
<rect x="-2" y="-1" width="4" height="4" rx="1" fill="#2b3036"/>
<path d="M-3 3 C-3.4 6 -7 8.5 -7 13 H7 C7 8.5 3.4 6 3 3 Z" fill="url(#lp-eM)"/>
<ellipse cy="13" rx="7" ry="1.9" fill="#c9a24a"/>
<ellipse class="lp-lit" cy="13" rx="4.2" ry="1.2"/></g>`).join("")}`;
  },
  // One pendant, or as many as the spots count, smaller, side by side.
  pendant: (c) => {
    const xs = lpSpotRow(c, { 1: 0, 2: 42, 3: 30, 4: 23, 5: 18 });
    const k = { 1: 1, 2: 0.62, 3: 0.46, 4: 0.38, 5: 0.31 }[xs.length];
    return `<defs>${lpHalo("pH")}${lpBeam("pB")}
<linearGradient id="lp-pD" x1="0" x2="1"><stop offset="0" stop-color="#2f6b5a"/><stop offset=".45" stop-color="#5fa98f"/><stop offset="1" stop-color="#245446"/></linearGradient></defs>
<path d="M${xs.length > 1 ? 6 : 18} 4 H${xs.length > 1 ? 90 : 78}" stroke="#b9c1c9" stroke-width="3" stroke-linecap="round"/>
${xs.map((x) => `<rect x="${x - 6}" y="4" width="12" height="3" rx="1" fill="#8f98a2"/>
<circle class="lp-halo" cx="${x}" cy="50" r="${40 * k}" fill="url(#lp-pH)"/>
<path class="lp-beam" d="M${x - 20 * k} 50 L${x - 38 * k} 92 H${x + 38 * k} L${x + 20 * k} 50 Z" fill="url(#lp-pB)"/>
${k < 1 ? `<path d="M${x} 7 V${(50 - 24 * k).toFixed(1)}" stroke="#3a4047" stroke-width="1"/>\n` : ""}<g${k < 1 ? ` transform="translate(${(x - 48 * k).toFixed(1)} ${(50 - 50 * k).toFixed(1)}) scale(${k})"` : ""}>
<path d="M48 7 V26" stroke="#3a4047" stroke-width="1"/>
<rect x="45" y="26" width="6" height="5" rx="1" fill="#3a4047"/>
<path d="M45 31 C34 33 27 41 26 50 H70 C69 41 62 33 51 31 Z" fill="url(#lp-pD)"/>
<path d="M26 50 Q48 53.4 70 50" fill="none" class="lp-litS" stroke-width="1.2" opacity=".9"/>
<path d="M42.6 50.4 Q48 54 53.4 50.4 Z" class="lp-lit"/>
<path d="M45 51.2 Q48 52.6 51 51.2" fill="none" stroke="#fff" stroke-width=".8" opacity=".8"/></g>`).join("")}`;
  },
  strip: () => `<defs>${lpBeam("sB")}
<linearGradient id="lp-sW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c99a6b"/><stop offset="1" stop-color="#8d6640"/></linearGradient></defs>
<rect x="0" y="10" width="96" height="80" rx="3" class="lp-wall"/>
<path class="lp-beam" d="M10 46 L2 90 H94 L86 46 Z" fill="url(#lp-sB)"/>
<rect x="8" y="38" width="80" height="8" rx="1.5" fill="url(#lp-sW)"/>
<rect x="20" y="24" width="10" height="14" rx="1" fill="#7c858f"/><rect x="32" y="20" width="8" height="18" rx="1" fill="#a85a3a"/><rect x="62" y="28" width="16" height="10" rx="2" fill="#4f7a96"/>
<g>${Array.from({ length: 12 }, (_, i) => `<rect class="lp-seg lp-lit" x="${10 + i * 6.4}" y="46" width="5.4" height="2.2" rx="1"/>`).join("")}</g>
<g class="lp-wash">${Array.from({ length: 12 }, (_, i) => `<ellipse class="lp-seg lp-lit" cx="${(12.7 + i * 6.4).toFixed(1)}" cy="55" rx="5" ry="7" opacity=".35"/>`).join("")}</g>`,
  // A strip hidden on top of a bulkhead, washing the ceiling above it.
  strip_cove: () => `<defs><linearGradient id="lp-uU" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>
<linearGradient id="lp-uB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef1f4"/><stop offset="1" stop-color="#cfd6dd"/></linearGradient></defs>
<rect x="0" y="4" width="96" height="88" rx="3" class="lp-wall"/>
<rect x="0" y="4" width="96" height="30" rx="3" class="lp-ceiling"/>
<path class="lp-beam" d="M8 34 L0 6 H96 L88 34 Z" fill="url(#lp-uU)"/>
<g class="lp-wash">${Array.from({ length: 12 }, (_, i) => `<ellipse class="lp-seg lp-lit" cx="${(12.7 + i * 6.4).toFixed(1)}" cy="22" rx="5" ry="12" opacity=".35"/>`).join("")}</g>
<path d="M0 36 H96 V46 H0 Z" fill="url(#lp-uB)"/><path d="M0 36 H96" stroke="#b9c1c9" stroke-width=".8"/>
<g>${Array.from({ length: 12 }, (_, i) => `<rect class="lp-seg lp-lit" x="${10 + i * 6.4}" y="33.6" width="5.4" height="2.4" rx="1"/>`).join("")}</g>
${[24, 48, 72].map((x) => `<ellipse cx="${x}" cy="46.6" rx="3.4" ry="1" fill="#9aa3ad"/>`).join("")}
<rect x="30" y="56" width="36" height="22" rx="1.5" fill="#2b3036" stroke="#8f98a2" stroke-width=".8"/>
<rect x="22" y="84" width="52" height="6" rx="1.2" fill="#8d6640"/>`,
  // A strip along the floor at the foot of a wall, washing it upwards.
  strip_baseboard: () => `<defs><linearGradient id="lp-fU" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient></defs>
<rect x="0" y="4" width="96" height="80" rx="3" class="lp-wall"/>
<rect x="0" y="84" width="96" height="12" class="lp-ceiling"/>
<path class="lp-beam" d="M6 80 L0 14 H96 L90 80 Z" fill="url(#lp-fU)"/>
<g class="lp-wash">${Array.from({ length: 12 }, (_, i) => `<ellipse class="lp-seg lp-lit" cx="${(12.7 + i * 6.4).toFixed(1)}" cy="68" rx="5" ry="11" opacity=".3"/>`).join("")}</g>
<rect x="30" y="26" width="36" height="24" rx="1" fill="#8d6640"/><rect x="33" y="29" width="30" height="18" fill="#dfe6ec"/><path d="M33 47 L42 37 L48 43 L54 36 L63 47 Z" fill="#7fa58a"/>
<rect x="2" y="81" width="92" height="3.4" rx=".8" fill="#9aa3ad"/>
<g>${Array.from({ length: 13 }, (_, i) => `<rect class="lp-seg lp-lit" x="${6 + i * 6.6}" y="79.4" width="5.6" height="2" rx="1"/>`).join("")}</g>
<ellipse class="lp-wash lp-lit" cx="48" cy="86" rx="44" ry="2.6" opacity=".5"/>`,
  // A strip under a kitchen cabinet's kick, lighting the floor in front.
  strip_plinth: () => `<defs>${lpBeam("kB")}${lpHalo("kH")}
<linearGradient id="lp-kC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f3f5"/><stop offset="1" stop-color="#d5dbe1"/></linearGradient></defs>
<rect x="0" y="4" width="96" height="68" rx="3" class="lp-wall"/>
<rect x="0" y="72" width="96" height="24" class="lp-ceiling"/>
<rect x="6" y="14" width="84" height="5" rx="1" fill="#f7f8f9" stroke="#b9c1c9" stroke-width=".6"/>
<rect x="9" y="19" width="78" height="44" fill="url(#lp-kC)" stroke="#b9c1c9" stroke-width=".6"/>
<path d="M28.5 19 V63 M48 19 V63 M67.5 19 V63" stroke="#b9c1c9" stroke-width=".7"/>
${[19, 38, 58, 77].map((x) => `<rect x="${x - 4}" y="23" width="8" height="1.6" rx=".8" fill="#8f98a2"/>`).join("")}
<rect x="14" y="63" width="68" height="9" fill="#7c858f"/>
<ellipse class="lp-halo" cx="48" cy="80" rx="50" ry="12" fill="url(#lp-kH)"/>
<path class="lp-beam" d="M14 65 L0 96 H96 L82 65 Z" fill="url(#lp-kB)"/>
<g>${Array.from({ length: 11 }, (_, i) => `<rect class="lp-seg lp-lit" x="${14.2 + i * 6.2}" y="63" width="5.4" height="2" rx="1"/>`).join("")}</g>`,
  // Wooden slats on a wall, a strip running up behind each one's edge.
  strip_slats: () => `<defs><linearGradient id="lp-vG" x1="0" x2="1"><stop offset="0" class="lp-stop" stop-opacity="0"/><stop offset=".5" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>
<linearGradient id="lp-vW" x1="0" x2="1"><stop offset="0" stop-color="#b98757"/><stop offset=".5" stop-color="#d2a271"/><stop offset="1" stop-color="#8d6640"/></linearGradient></defs>
<rect x="0" y="4" width="96" height="88" rx="3" class="lp-wall"/>
${[[6, 14, 82], [24, 6, 74], [42, 18, 90], [60, 4, 70], [78, 12, 84]].map(([x, y0, y1]) => `<rect class="lp-halo" x="${x - 8}" y="${y0 - 4}" width="26" height="${y1 - y0 + 8}" rx="10" fill="url(#lp-vG)"/>`).join("")}
${[[6, 14, 82], [24, 6, 74], [42, 18, 90], [60, 4, 70], [78, 12, 84]].map(([x, y0, y1]) => `<rect x="${x}" y="${y0}" width="8" height="${y1 - y0}" rx=".8" fill="url(#lp-vW)"/><path d="M${x + 3} ${y0 + 4} V${y1 - 6}" stroke="#7a5534" stroke-width=".4" opacity=".6"/>`).join("")}
<g>${[[6, 14, 82], [24, 6, 74], [42, 18, 90], [60, 4, 70], [78, 12, 84]].flatMap(([x, y0, y1]) => Array.from({ length: Math.floor((y1 - y0 - 4) / 6.4) }, (_, i) => `<rect class="lp-seg lp-lit" x="${x + 8}" y="${(y0 + 2 + i * 6.4).toFixed(1)}" width="1.4" height="5.4" rx=".7"/>`)).join("")}</g>`,
  // One spot alone throws a wider cone, several share the ceiling.
  spot: (c) => {
    const xs = lpSpotRow(c, { 1: 0, 2: 32, 3: 27, 4: 22, 5: 18 });
    const w = { 1: 26, 2: 17, 3: 15, 4: 12, 5: 10 }[xs.length];
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
// A floodlight on the house wall, the common rectangular kind seen from the
// side: a slim black slab on its bracket, fins along its top, its glass
// facing the ground and a wide beam falling from it.
LAMP_SVGS.flood = () => `<defs>
<linearGradient id="lp-dB" x1="0" y1="0" x2=".2" y2="1"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity=".1"/></linearGradient>
<linearGradient id="lp-dM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a525b"/><stop offset="1" stop-color="#1e2226"/></linearGradient></defs>
<rect x="0" y="0" width="22" height="90" class="lp-wall"/>
<path d="M22 0 V90" stroke="#8a929b" stroke-width="1"/>
<path d="M22 90 H96" stroke="#c5ccd3" stroke-width="1.4"/>
<path class="lp-beam" d="M33.9 27.3 L69.8 10.2 L96 38 V90 H24 Z" fill="url(#lp-dB)"/>
<rect x="22" y="15" width="3" height="12" rx=".8" fill="#2b3036"/>
<path d="M25 21 H31" stroke="#2b3036" stroke-width="2.6"/>
<g transform="rotate(-20 31 22.4)">${Array.from({ length: 9 }, (_, i) => { const x = 31 + i * 4.6, y = 18.7 - i * .4; return `<path d="M${x} ${y} v-3.4" stroke="#2b3036" stroke-width="1.5" stroke-linecap="round"/>`; }).join("")}
<path d="M28 19 L71 15.4 L71 21.6 L28 25.4 Z" fill="url(#lp-dM)"/>
<path d="M28 25.4 L71 21.6 L72.6 24.6 L30.8 28.8 Z" fill="#1e2226"/>
<path class="lp-lit" d="M30.4 25.9 L70.4 22.3 L71.6 24.2 L32 28 Z"/></g>
<circle cx="31" cy="22.4" r="1.5" fill="#3a4047"/>`;
// A floodlight with its motion sensor (HACF #171), the common LED kind seen
// from the front: a flat slab of LEDs on its bracket, and under it the
// sensor's dome on its own small arm. A motion lights the dome red and sends
// waves out of it.
LAMP_SVGS.flood_pir = () => `<defs>
<linearGradient id="lp-fB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="lp-stop" stop-opacity=".9"/><stop offset="1" class="lp-stop" stop-opacity=".06"/></linearGradient>
<linearGradient id="lp-fM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a525b"/><stop offset="1" stop-color="#1e2226"/></linearGradient>
<radialGradient id="lp-fD" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d0d6"/></radialGradient>
<pattern id="lp-fL" width="3.4" height="3.4" patternUnits="userSpaceOnUse"><circle cx="1.7" cy="1.7" r=".75" fill="#fff8e1" opacity=".9"/></pattern></defs>
<path d="M0 90 H96" stroke="#c5ccd3" stroke-width="1.4"/>
<g transform="translate(-12 -4) scale(1.25)"><path class="lp-beam" d="M24 40 L72 40 L96 90 H0 Z" fill="url(#lp-fB)"/>
<rect x="44" y="4" width="8" height="5" rx="1" fill="#2b3036"/><path d="M48 9 V14" stroke="#2b3036" stroke-width="2.4"/>
<path d="M30 14 Q27 14 27 18 V22 M66 14 Q69 14 69 18 V22" stroke="#2b3036" stroke-width="2" fill="none"/>
<rect x="24" y="14" width="48" height="27" rx="2.4" fill="url(#lp-fM)"/>
<rect x="27.4" y="17" width="41.2" height="20.6" rx="1.2" class="lp-lit"/>
<rect x="27.4" y="17" width="41.2" height="20.6" rx="1.2" fill="url(#lp-fL)" opacity=".55"/>
<path d="M28 18 L46 18 L32 36 L28 36 Z" fill="#fff" opacity=".12"/>
<path d="M48 41 V45" stroke="#2b3036" stroke-width="2.2"/>
<rect x="41" y="45" width="14" height="9" rx="2" fill="url(#lp-fM)"/>
<path d="M43 54 A5 5 0 0 0 53 54 Z" fill="url(#lp-fD)" stroke="#8f979e" stroke-width=".5"/>
<path class="lp-pir" d="M43 54 A5 5 0 0 0 53 54 Z"/>
<g class="lp-pirw"><path d="M38 60 Q48 66 58 60" fill="none" stroke="#ff5252" stroke-width="1.4" stroke-linecap="round"/><path d="M34 65 Q48 73 62 65" fill="none" stroke="#ff5252" stroke-width="1.4" stroke-linecap="round" opacity=".6"/></g></g>`;
// A spotlight at the foot of a tree, lighting its trunk and its crown from
// below (HACF #171): the light climbs the bark and catches the leaves.
LAMP_SVGS.garden_tree = () => `<defs>
<linearGradient id="lp-tB" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient>
<radialGradient id="lp-tW" cx=".5" cy=".9" r=".75"><stop offset="0" class="lp-stop" stop-opacity=".9"/><stop offset="1" class="lp-stop" stop-opacity="0"/></radialGradient>
<radialGradient id="lp-tG" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#4a8236"/><stop offset="1" stop-color="#27511f"/></radialGradient>
<linearGradient id="lp-tK" x1="0" x2="1"><stop offset="0" stop-color="#4a3322"/><stop offset=".5" stop-color="#7a5636"/><stop offset="1" stop-color="#3c2a1c"/></linearGradient>
${lpMetal("tM", "#2b3036", "#6f7882")}</defs>
<path d="M14 34 C6 22 16 4 34 6 C42 -2 62 -2 68 6 C84 4 94 18 86 32 C94 42 84 56 70 52 C62 60 34 60 26 52 C12 54 6 42 14 34 Z" fill="url(#lp-tG)"/>
<path d="M24 20 q6 -6 12 -4 M56 10 q8 -2 12 4 M74 34 q6 2 6 8 M20 40 q2 6 8 8" fill="none" stroke="#6aa64f" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>
<path class="lp-wash" d="M14 34 C6 22 16 4 34 6 C42 -2 62 -2 68 6 C84 4 94 18 86 32 C94 42 84 56 70 52 C62 60 34 60 26 52 C12 54 6 42 14 34 Z" fill="url(#lp-tW)"/>
<path d="M44 86 C46 74 44 62 42 50 L36 40 M46 56 L58 42 M47 66 L56 58" stroke="url(#lp-tK)" stroke-width="2.6" fill="none" stroke-linecap="round"/>
<path d="M40 86 C43 72 42 60 40 48 L50 48 C50 60 50 72 54 86 Z" fill="url(#lp-tK)"/>
<path class="lp-wash" d="M40 86 C43 72 42 60 40 48 L50 48 C50 60 50 72 54 86 Z" fill="url(#lp-tB)"/>
<path class="lp-beam" d="M30.6 62.4 L36.4 65.4 L70 10 L38 3 Z" fill="url(#lp-tB)"/>
${lpGrass()}
<path d="M30 76 L30 90 L28.8 94 L27.6 90 L27.6 76 Z" fill="#2b3036"/>
<g transform="rotate(22 28.8 76)"><rect x="24" y="64" width="9.6" height="12" rx="2" fill="url(#lp-tM)"/>
<ellipse cx="28.8" cy="64" rx="5.4" ry="1.8" fill="#1e2226"/><ellipse class="lp-lit" cx="28.8" cy="64" rx="4" ry="1.3"/></g>`;
// Ceiling lights, the one fixed on most ceilings. A flush dome of opal glass.
LAMP_SVGS.ceiling = () => `<defs>${lpBeam("cB")}${lpHalo("cH")}
<radialGradient id="lp-cG" cx=".5" cy=".15" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".6" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<rect x="0" y="6" width="96" height="10" class="lp-ceiling"/>
<path d="M0 16 H96" stroke="#c5ccd3" stroke-width=".8"/>
<path d="M4 90 H92" stroke="#c5ccd3" stroke-width="1.4"/>
<path class="lp-beam" d="M28 26 L6 90 H90 L68 26 Z" fill="url(#lp-cB)"/>
<ellipse class="lp-halo" cx="48" cy="24" rx="30" ry="14" fill="url(#lp-cH)"/>
<rect x="24" y="16" width="48" height="3" rx="1" fill="#e8ecf0" stroke="#aab2bb" stroke-width=".6"/>
<path class="lp-lit" d="M26 19 Q26 33 48 33 Q70 33 70 19 Z"/>
<path d="M26 19 Q26 33 48 33 Q70 33 70 19 Z" fill="url(#lp-cG)"/>`;
// A flat LED panel, flush with the ceiling, lighting the room evenly.
LAMP_SVGS.ceiling_panel = () => `<defs>${lpBeam("nB")}</defs>
<rect x="0" y="6" width="96" height="10" class="lp-ceiling"/>
<path d="M0 16 H96" stroke="#c5ccd3" stroke-width=".8"/>
<path d="M4 90 H92" stroke="#c5ccd3" stroke-width="1.4"/>
<path class="lp-beam" d="M16 20 L2 90 H94 L80 20 Z" fill="url(#lp-nB)"/>
<rect x="14" y="16" width="68" height="3.4" rx=".8" fill="#e8ecf0" stroke="#aab2bb" stroke-width=".6"/>
<rect class="lp-lit" x="16" y="18.6" width="64" height="2.6" rx=".6"/>`;
// A ring: a slim LED halo hung on two wires, lighting down from its circle.
LAMP_SVGS.ceiling_ring = () => `<defs>${lpBeam("rB")}${lpHalo("rH")}</defs>
<rect x="0" y="6" width="96" height="10" class="lp-ceiling"/>
<path d="M0 16 H96" stroke="#c5ccd3" stroke-width=".8"/>
<path d="M4 90 H92" stroke="#c5ccd3" stroke-width="1.4"/>
<path class="lp-beam" d="M20 32 L4 90 H92 L76 32 Z" fill="url(#lp-rB)"/>
<ellipse class="lp-halo" cx="48" cy="30" rx="36" ry="12" fill="url(#lp-rH)"/>
<path d="M26 16 V29 M70 16 V29" stroke="#8a929b" stroke-width=".6"/>
<ellipse cx="48" cy="30" rx="28" ry="5.6" fill="none" stroke="#2b3036" stroke-width="3.4"/>
<ellipse class="lp-litS" cx="48" cy="31" rx="28" ry="5.6" fill="none" stroke-width="2"/>`;
// Spots on a track: heads hung from a rail, each aimed its own way.
LAMP_SVGS.spot_track = (c) => {
  const xs = lpSpotRow(c, { 1: 0, 2: 30, 3: 22, 4: 19, 5: 16 });
  const n = xs.length, tilt = { 1: 0, 2: 8, 3: 13.5, 4: 10, 5: 8 }[n], w = { 1: 16, 2: 13, 3: 13, 4: 10, 5: 8 }[n];
  const heads = xs.map((x, i) => [x, n > 1 ? (tilt * (1 - (2 * i) / (n - 1))).toFixed(1) : 0]);
  return `<defs>${lpBeam("kB")}${lpMetal("kM", "#1e2226", "#5a636d")}</defs>
<rect x="0" y="6" width="96" height="10" class="lp-ceiling"/>
<path d="M0 16 H96" stroke="#c5ccd3" stroke-width=".8"/>
<path d="M4 90 H92" stroke="#c5ccd3" stroke-width="1.4"/>
${heads.map(([x, a]) => `<g transform="rotate(${a} ${x} 23)">
<path class="lp-beam" d="M${x - 4} 37 L${x - w} 88 H${x + w} L${x + 4} 37 Z" fill="url(#lp-kB)"/></g>`).join("")}
<rect x="6" y="16" width="84" height="4" rx="1" fill="#2b3036"/>
${heads.map(([x, a]) => `<path d="M${x} 20 V23" stroke="#2b3036" stroke-width="2.2"/>
<g transform="rotate(${a} ${x} 23)"><circle cx="${x}" cy="23" r="1.8" fill="#3a4047"/>
<rect x="${x - 5}" y="24" width="10" height="13" rx="1.6" fill="url(#lp-kM)"/>
<ellipse class="lp-lit" cx="${x}" cy="37" rx="4" ry="1.3"/></g>`).join("")}`;
};
// Cans mounted on the ceiling.
LAMP_SVGS.spot_surface = (c) => {
  const xs = lpSpotRow(c, { 1: 0, 2: 36, 3: 28, 4: 22, 5: 18 });
  const w = { 1: 20, 2: 16, 3: 13, 4: 11, 5: 10 }[xs.length];
  return `<defs>${lpBeam("uB")}${lpMetal("uM", "#1e2226", "#5a636d")}</defs>
<rect x="0" y="6" width="96" height="10" class="lp-ceiling"/>
<path d="M0 16 H96" stroke="#c5ccd3" stroke-width=".8"/>
${xs.map((x) => `<path class="lp-beam" d="M${x - 5} 36 L${x - w} 90 H${x + w} L${x + 5} 36 Z" fill="url(#lp-uB)"/>`).join("")}
<path d="M4 90 H92" stroke="#c5ccd3" stroke-width="1.4"/>
${xs.map((x) => `<rect x="${x - 8}" y="16" width="16" height="2" fill="#1e2226"/>
<rect x="${x - 7}" y="18" width="14" height="18" fill="url(#lp-uM)"/>
<ellipse class="lp-lit" cx="${x}" cy="36" rx="5.4" ry="1.4"/>`).join("")}`;
};
// A cylinder on a wall, throwing one beam up and one down.
LAMP_SVGS.spot_updown = () => `<defs>${lpBeam("vB")}${lpMetal("vM", "#1e2226", "#5a636d")}
<linearGradient id="lp-vU" x1="0" y1="1" x2="0" y2="0"><stop offset="0" class="lp-stop" stop-opacity=".95"/><stop offset="1" class="lp-stop" stop-opacity="0"/></linearGradient></defs>
<rect x="0" y="0" width="96" height="94" rx="3" class="lp-wall"/>
<path class="lp-beam" d="M43 35 L30 0 H66 L53 35 Z" fill="url(#lp-vU)"/>
<path class="lp-beam" d="M43 61 L30 94 H66 L53 61 Z" fill="url(#lp-vB)"/>
<rect x="44" y="44" width="8" height="8" fill="#1e2226"/>
<rect x="41" y="35" width="14" height="26" rx="2" fill="url(#lp-vM)"/>
<ellipse class="lp-lit" cx="48" cy="35" rx="5.4" ry="1.3"/>
<ellipse class="lp-lit" cx="48" cy="61" rx="5.4" ry="1.3"/>`;
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
  const flags = ["lp", `lp-l-${layout}`, `lp-m-${c.mode || "unav"}`, c.fx ? "lp-fx" : "", c.motion ? "lp-motion" : ""].filter(Boolean).join(" ");
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
        .lp-pir{fill:#ff1744;opacity:0;transition:opacity .3s}
        .lp-pirw{opacity:0}
        .lp-motion .lp-pir{opacity:.55;animation:lp-pir 1.2s ease-in-out infinite;animation-delay:var(--anim-offset,0s)}
        .lp-motion .lp-pirw{animation:lp-pirw 1.2s ease-out infinite;animation-delay:var(--anim-offset,0s)}
        @keyframes lp-pir{50%{opacity:.15}}
        @keyframes lp-pirw{0%{opacity:0;transform:translateY(-3px)}40%{opacity:1}100%{opacity:0;transform:translateY(3px)}}
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
